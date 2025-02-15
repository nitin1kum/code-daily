"use client";
import { Monaco } from "@monaco-editor/react";
import { DevelopmentState } from "@/types";
import { create } from "zustand";
import { DEVELOPMENT_CONFIG } from "@/app/(root)/_constants";

function getInitialValue() {
  if (typeof window === "undefined") {
    return {
      html: "",
      css: "",
      script: "",
    };
  }

  const html =
    localStorage.getItem("development-editor-html") ||
    DEVELOPMENT_CONFIG["html"];
  const css =
    localStorage.getItem("development-editor-css") || DEVELOPMENT_CONFIG["css"];
  const script =
    localStorage.getItem("development-editor-script") ||
    DEVELOPMENT_CONFIG["javascript"];

  return { html, css, script };
}

export const useDevelopmentState = create<DevelopmentState>((set, get) => {
  const initialValue = getInitialValue();
  return {
    language: "html",
    ...initialValue,
    logs: [],

    setLogs: (logs) => {
      set({ logs: logs });
    },

    updateHTML: (code: string) => {
      localStorage.setItem("development-editor-html", code);
      set({ html: code });
    },

    updateCSS: (code: string) => {
      localStorage.setItem("development-editor-css", code);
      set({ css: code });
    },
    updateJS: (code: string) => {
      localStorage.setItem("development-editor-javascript", code);
      set({ script: code });
    },

    setLanguage: (language: string) => {
      set({
        language,
      });
    },
  };
});
