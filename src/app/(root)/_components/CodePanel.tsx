"use client";

import React, { useEffect } from "react";
import { defineMonacoThemes, LANGUAGE_CONFIG } from "../_constants";
import { Editor } from "@monaco-editor/react";
import { useCodeEditorState } from "@/store/CodeEditorState";

function CodePanel() {
  const { theme, language, setCode, fontSize, code } = useCodeEditorState();

  useEffect(() => {
    const savedCode =
      localStorage.getItem(`code-editor-${language}`) ||
      LANGUAGE_CONFIG[language].defaultCode;

    setCode(savedCode);
  }, [language]);

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
      localStorage.setItem(`code-editor-${language}`, value);
    }
  };

  return (
    <div className="relative group rounded-xl overflow-hidden ring-1 ring-white/[0.05] min-h-[400px] md:min-h-[600px]">
      <Editor
        className="h-[400px] md:h-[600px]"
        language={LANGUAGE_CONFIG[language].monacoLanguage}
        onChange={handleEditorChange}
        theme={theme}
        value={code}
        beforeMount={defineMonacoThemes}
        options={{
          minimap: { enabled: false },
          fontSize,
          automaticLayout: true,
          scrollBeyondLastLine: false,
          padding: { top: 16, bottom: 16 },
          renderWhiteSpace: "selection",
          fontFamily: '"Fira Code","Cascadia Code",Consolas,monospace',
          fontLigature: true,
          cursorBlinking: "smooth",
          smoothScrolling: true,
          contextmenu: true,
          renderLineHighlight: "all",
          lineHeight: 1.6,
          letterSpacing: 0.5,
          roundedSelection: true,
          scrollbar: {
            verticalScrollbarSize: 8,
            horizontalScrollbarSize: 8,
          },
        }}
      />
    </div>
  );
}

export default CodePanel;
