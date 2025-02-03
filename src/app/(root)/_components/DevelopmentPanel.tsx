"use client";

import React, { useEffect, useState } from "react";
import { defineMonacoThemes, DEVELOPMENT_CONFIG, THEMES } from "../_constants";
import { Editor } from "@monaco-editor/react";
import { useCodeEditorState } from "@/store/CodeEditorState";
import { motion } from "framer-motion";
import Image from "next/image";
import { useDevelopmentState } from "@/store/DevelopmentState";
import { GiAnticlockwiseRotation } from "react-icons/gi";

const TABS = [
  {
    id: "html",
    label: "HTML",
    img: "/html.png",
  },
  {
    id: "css",
    label: "CSS",
    img: "/css.png",
  },
  {
    id: "javascript",
    label: "JS",
    img: "/js.png",
  },
];

function DevelopmentPanel() {
  const { theme, fontSize } = useCodeEditorState();
  const {
    language,
    setEditor,
    updateHTML,
    updateCSS,
    updateJS,
    setLanguage,
    editor,
  } = useDevelopmentState();
  const currentTheme = THEMES.find((q) => q.id === theme);
  const [activeTab, setActiveTab] = useState<"html" | "css" | "javascript">(
    "html"
  );

  const handleEditorChange = (value: string | undefined) => {
    if (activeTab === "html") {
      updateHTML(value || "");
    } else if (activeTab === "css") {
      updateCSS(value || "");
    } else {
      updateJS(value || "");
    }
  };

  useEffect(() => {
    const savedCode = localStorage.getItem(`development-editor-${activeTab}`);
    const newCode = savedCode || DEVELOPMENT_CONFIG[activeTab];
    if (editor) editor.setValue(newCode);
  }, [language, editor]);

  const handleRefresh = () => {
    const defaultCode = DEVELOPMENT_CONFIG[activeTab];
    if (editor) editor.setValue(defaultCode);
    localStorage.removeItem(`development-editor-${activeTab}`);
  };

  return (
    <div className="relative group overflow-hidden min-h-[400px] md:min-h-[600px]">
      {/* Develoment Panel Header */}
      <div
        className="border-b border-gray-800/50 flex items-center justify-between rounded-t-xl"
      >
        <div className="flex gap-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as "html" | "css" | "javascript");
                setLanguage(tab.id);
              }}
              className={`group flex items-center gap-1 w-24 px-3 py-2 hover:bg-gray-400/10 rounded-t-md transition-all duration-200 relative overflow-hidden ${activeTab === tab.id ? "text-blue-400" : "text-gray-400 hover:text-gray-300"}`}
            >
              {activeTab == tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-t-md"
                  style={{ backgroundColor: currentTheme?.color }}
                  transition={{
                    type: "spring",
                    bounce: 0.2,
                    duration: 0.6,
                  }}
                />
              )}
              <div className="size-6 relative rounded-lg z-10 overflow-hidden">
                <Image
                  src={tab.img}
                  alt={tab.label + "image"}
                  width={24}
                  height={24}
                  className="size-6 object-contain"
                ></Image>
              </div>
              <span className="text-sm font-medium relative z-10">
                {tab.label}
              </span>
            </button>
          ))}
        </div>
        <button
          className="size-8 flex items-center justify-center hover:scale-105 mr-2 rounded-md bg-[#12121a]/50"
          onClick={handleRefresh}
        >
          <GiAnticlockwiseRotation className="size-4 text-gray-500" />
        </button>
      </div>

      {/* Development Editor */}
      <div className="relative group rounded-b-xl overflow-hidden ring-1 ring-white/[0.05] min-h-[400px] md:min-h-[574px]">
        <Editor
          className="h-[400px] md:h-[574px]"
          language={language}
          onChange={handleEditorChange}
          theme={theme}
          beforeMount={defineMonacoThemes}
          onMount={(editor) => {
            setEditor(editor);
          }}
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
    </div>
  );
}

export default DevelopmentPanel;
