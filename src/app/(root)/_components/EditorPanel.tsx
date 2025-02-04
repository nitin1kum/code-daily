"use client";

import { useCodeEditorState } from "@/store/CodeEditorState";
import React, { useEffect, useRef, useState } from "react";
import {  DEVELOPMENT_CONFIG, LANGUAGE_CONFIG } from "../_constants";
import Image from "next/image";
import { BsThreeDots, BsType } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";
import { FiRotateCcw } from "react-icons/fi";
import { BiShare } from "react-icons/bi";
import { useClerk } from "@clerk/nextjs";
import { CodePanelSkelton } from "./CodeEditorSkelton";
import ShareSnippetDialog from "./ShareSnippetDialog";
import DevelopmentSelector from "./DevelopmentSelector";
import { useModeSlector } from "@/store/ModeSelector";
import CodePanel from "./CodePanel";
import DevelopmentPanel from "./DevelopmentPanel";

function EditorPanel({width} : {width : number}) {
  const [isShareDialogOpen, setIsShareDialogOpen] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState(false);
  const {mode} = useModeSlector();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { loaded } = useClerk();
  const menuBar = useRef<HTMLDivElement>(null);
  const { language, fontSize, editor, setFontSize } =
    useCodeEditorState();

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  });

  useEffect(() => {
    const savedFontSize = localStorage.getItem("editor-fontSize");
    if (savedFontSize) setFontSize(parseInt(savedFontSize));
  }, [setFontSize]);

  const handleRefresh = () => {
    const defaultCode = LANGUAGE_CONFIG[language].defaultCode;
    if (editor) editor.setValue(defaultCode);
    localStorage.removeItem(`code-editor-${language}`);
  };

  const handleFontSizeChange = (size: number) => {
    const newSize = Math.min(Math.max(size, 12), 24);
    setFontSize(newSize);
  };

  useEffect(() => {
    function handleClick(e : MouseEvent){
      if(menuBar.current && !menuBar.current.contains(e.target as Node)){
        setIsMenuOpen(false);
      }
    }
    window.addEventListener("click",handleClick);
    return () => {
      window.removeEventListener("click",handleClick);
    }
  }, [])
  

  if (!loaded || !isMounted) return <CodePanelSkelton />;

  return (
    <div style={{width : width + "%"}} className={`relative flex-grow w-full`}>
      <div className="relative bg-[#12121a]/90 backdrop-blur rounded-xl border border-white/[0.05] p-6">
        {/* Header */}

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center justify-center h-8 w-8 overflow-hidden rounded-lg bg-[#1e1e2e] ring-1">
              <Image
                src={"/" + language + ".png"}
                alt={language + "logo"}
                width={32}
                height={32}
              />
            </div>
            <div className={`${width > 35 ? "sm:block hidden" : "hidden"}`}>
              <h2 className="text-sm font-medium text-white">Code Editor</h2>
              <p className="text-xs text-gray-500 ">
                Write and Execute your code
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Developmet and code selector */}
            <DevelopmentSelector/>
            {/* Refresh button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRefresh}
              disabled = {mode === "development"}
              className={`p-2 bg-[#1e1e2e] hover:bg-[#2a2a3a] rounded-lg ring-1 ring-white/5 transition-colors ${mode === "Development" && "cursor-not-allowed"}`}
            >
              <FiRotateCcw className="size-4 text-gray-400" />
            </motion.button>
            {/* Menu button */}
            <div className="relative" ref={menuBar}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 bg-[#1e1e2e] hover:bg-[#2a2a3a] rounded-lg ring-1 ring-white/5 transition-colors"
              >
                <BsThreeDots />
              </motion.button>
              {/* Menu Bar */}
              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div
                    initial={{ y: 2, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 2, opacity: 0 }}
                    className="absolute top-full right-0 mt-2 w-fit min-w-[100px] bg-[#1e1e2e]/95 backdrop-blur-xl rounded-xl border border-[#313244] sbadow-2xl py-2 z-50"
                  >
                    <div className="p-2 flex flex-col gap-3">
                      {/* Font Size Slider */}

                      {isMounted && (
                        <div className="flex items-center gap-3 px-3 py-2 bg-[#1e1e2e] rounded-lg ring-1 ring-white/5">
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
                        </div>
                      )}
                      {/* Share Button */}

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => setIsShareDialogOpen(true)}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg overflow-hidden bg-gradient-to-r from-blue-500 to-blue-600 opacity-90 hover:opacit-100 transition-opacity"
                      >
                        <BiShare className="size-4 text-gray-400" />
                        <span className="text-sm font-medium text-white">
                          Share
                        </span>
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Editor */}
        {mode === "Code" ? (<CodePanel/>) : (<DevelopmentPanel/>)}
      </div>
      {isShareDialogOpen && (
        <ShareSnippetDialog onClose={() => setIsShareDialogOpen(false)} />
      )}
    </div>
  );
}

export default EditorPanel;
