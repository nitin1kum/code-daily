"use client";

import { useCodeEditorState } from "@/store/CodeEditorState";
import React, { useEffect, useRef, useState } from "react";
import { defineMonacoThemes, LANGUAGE_CONFIG } from "../_constants";
import Image from "next/image";
import { BsType } from "react-icons/bs";
import { motion } from "framer-motion";
import { FiRotateCcw } from "react-icons/fi";
import { BiShare } from "react-icons/bi";
import { Editor } from "@monaco-editor/react";
import { ClerkLoaded, useClerk, useUser } from "@clerk/nextjs";
import { CodePanelSkelton } from "./CodeEditorSkelton";
import ShareSnippetDialog from "./ShareSnippetDialog";

function EditorPanel() {
  const [isShareDialogOpen, setIsShareDialogOpen] = useState<boolean>(false);
  const[isMounted,setIsMounted] = useState(false);
  const { loaded } = useClerk();
  const {
    language,
    fontSize,
    theme,
    isRunning,
    editor,
    setFontSize,
    setEditor,
  } = useCodeEditorState();

  useEffect(()=>{
      setIsMounted(true);
      return ()=> {setIsMounted(false)}
    })

  useEffect(() => {
    const savedCode = localStorage.getItem(`code-editor-${language}`);
    const newCode = savedCode || LANGUAGE_CONFIG[language].defaultCode;
    if (editor) editor.setValue(newCode);
  }, [language, editor]);

  useEffect(() => {
    const savedFontSize = localStorage.getItem("editor-fontSize");
    if (savedFontSize) setFontSize(parseInt(savedFontSize));
  }, [setFontSize]);

  const handleRefresh = () => {
    const defaultCode = LANGUAGE_CONFIG[language].defaultCode;
    if(editor) editor.setValue(defaultCode);
    localStorage.removeItem(`code-editor-${language}`);
  };

  const handleEditorChange = (value : string | undefined) => {
    if(value) localStorage.setItem(`code-editor-${language}`,value);
  };

  const handleFontSizeChange = (size: number) => {
    const newSize = Math.min(Math.max(size,12),24);
    setFontSize(newSize);
  };

  return (
    <div className="relative">
      <div className="relative bg-[#12121a]/90 backdrop-blur rounded-xl border border-white/[0.05] p-6">
        {/* Header */}

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center justify-center h-8 w-8 overflow-hidden rounded-lg bg-[#1e1e2e] ring-1">
              <Image
                src={isMounted ? "/" + language + ".png" : "/javascript.png"}
                alt="logo"
                width={32}
                height={32}
              />
            </div>
            <div>
              <h2 className="text-sm font-medium text-white">Code Editor</h2>
              <p className="text-xs text-gray-500 ">
                Write and Execute your code
              </p>
            </div>
          </div>


          <div className="flex items-center gap-3">

            {/* Font Size Slider */}

            {isMounted && <div className="flex items-center gap-3 px-3 py-2 bg-[#1e1e2e] rounded-lg ring-1 ring-white/5">
              <BsType className="size-4 text-gray-400" />
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={12}
                  max={24}
                  value={fontSize}
                  onChange={(e) =>
                    handleFontSizeChange(parseInt(e.target.value))
                  }
                  className="w-20 h-1 bg-gray-600 rounded-lg cursor-pointer"
                />
                <span className="text-sm font-medium text-gray-400 min-w-[2rem] text-center ">
                  {fontSize}
                </span>
              </div>
            </div>}

            {/* Refresh button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRefresh}
              className="p-2 bg-[#1e1e2e] hover:bg-[#2a2a3a] rounded-lg ring-1 ring-white/5 transition-colors"
            >
              <FiRotateCcw className="size-4 text-gray-400" />
            </motion.button>
            {/* Share button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => setIsShareDialogOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg overflow-hidden bg-gradient-to-r from-blue-500 to-blue-600 opacity-90 hover:opacit-100 transition-opacity"
            >
              <BiShare className="size-4 text-gray-400" />
              <span className="text-sm font-medium text-white">Share</span>
            </motion.button>
          </div>
        </div>

        {/* Editor */}

        <div className="relative group rounded-xl overflow-hidden ring-1 ring-white/[0.05] min-h-[600px]">
          {loaded && (
            <Editor
              height="600px"
              language={LANGUAGE_CONFIG[language].monacoLanguage}
              onChange={handleEditorChange}
              theme={theme}
              beforeMount={defineMonacoThemes}
              onMount={(editor) => {setEditor(editor)}}
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
          )}

          {!loaded && <CodePanelSkelton />}
        </div>
      </div>
      {isShareDialogOpen && <ShareSnippetDialog onClose={()=>setIsShareDialogOpen(false)}/>}
    </div>
  );
}

export default EditorPanel;
