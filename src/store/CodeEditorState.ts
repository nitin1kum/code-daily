import { LANGUAGE_CONFIG } from "@/app/(root)/_constants";
import {  Monaco } from "@monaco-editor/react";
import { CodeEditorState } from "@/types";
import { create } from "zustand";
import toast from "react-hot-toast";
import { input } from "framer-motion/client";

const getInitialState = () => {
  if (typeof window === "undefined") {
    return {
      language: "javascript",
      fontSize: 16,
      theme: "vs-dark",
    };
  }

  const language = localStorage.getItem("editor-language") || "javascript";
  const fontSize = parseInt(
    localStorage.getItem("editor-fontSize") || "16",
    10
  );
  const theme = localStorage.getItem("editor-theme") || "vs-dark";

  return {
    language,
    fontSize,
    theme,
  };
};

export const useCodeEditorState = create<CodeEditorState>((set, get) => {
  const initialState = getInitialState();

  return {
    ...initialState,
    output: "",
    isRunning: false,
    error: null,
    error_name : null,
    editor: null,
    input : "",
    executionResult: null,

    getCode: (): string => get().editor?.getValue() || "",

    setEditor: (editor: Monaco) => {
      const savedCode = localStorage.getItem(`code-editor-${get().language}`);
      if (savedCode && editor) {
        editor.setValue(savedCode); // Set the saved code in the editor
      }
      set({ editor });
    },

    setInput : (input : string) => {
      set({input : input})
    },

    setLanguage: (language: string) => {
      const currentCode = get().editor?.getValue();
      if (currentCode)
        localStorage.setItem(`code-editor-${get().language}`, currentCode);

      localStorage.setItem("editor-language", language);
      set({
        language,
        output: "",
      });
    },

    setTheme: (theme: string) => {
      localStorage.setItem("editor-theme", theme);
      set({ theme });
    },

    setFontSize: (fontSize: number) => {
      localStorage.setItem("editor-fontSize", `${fontSize}`);
      set({ fontSize });
    },

    runCode: async () => {
      const { language, getCode } = get();
      const code = getCode();

      if (!code) set({ error: "Please enter some code" });

      set({ isRunning: true });

      try {
        console.log(input)
        const runtime = LANGUAGE_CONFIG[language].pistonRuntime;
        const response = await fetch("https://emkc.org/api/v2/piston/execute", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            language: runtime.language,
            version: runtime.version,
            stdin: get().input,
            args: ["--timeout=40"],
            files: [{ content: code }],
          }),
        });

        if(!response.ok){
          console.log("Error while compiling code - ",response);
          toast.error("Some error occurred");
          set({
            error : "Some Unknown Error Occurred. Please try again later.",
            error_name : "Network Error",
            executionResult: {
              code,
              output: "",
              error : "Some Unknown Error Occurred. Please try again later.",
            },
          });
          return;
        }

        const data = await response.json();

        // console.log("data back from piston: ", data);

        if (data.message) {
          set({
            error: data.message,
            error_name : "Network Error",
            executionResult: { code, output: "", error: data.message },
          });
          return;
        }

        // Compilatiion error
        if (data.compile && data.compile.code !== 0) {
          const error = data.compile.stderr || data.compile.output;

          set({
            error,
            error_name : "Compilation error",
            executionResult: {
              code,
              output: "",
              error,
            },
          });
          return;
        }

        // Run time error
        if (data.run && data.run.code !== 0) {
          let error = data.run.stderr || data.run.output;
          if (data.run.code == null) error = "Time limit exceeded";

          set({
            error,
            error_name : "Run time error",
            executionResult: {
              code,
              output: "",
              error,
            },
          });
          return;
        }

        // code execution successful
        const output = data.run.output;

        set({
          output: output.trim(),
          error: null,
          executionResult: {
            error: null,
            code,
            output: output.trim(),
          },
        });
      } catch (error: any) {
        console.log("Error while running code: ", error);
        set({
          error: error,
          executionResult: { code, error: error, output: "" },
        });
      } finally {
        set({ isRunning: false });
      }
    },
  };
});

export const getExecutionResult = () =>
  useCodeEditorState.getState().executionResult;
