"use client";
import { useCodeEditorState } from "@/store/CodeEditorState";
import React, { useEffect, useRef, useState } from "react";
import { LANGUAGE_CONFIG } from "../_constants";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { LuLock } from "react-icons/lu";
import { BiChevronDown } from "react-icons/bi";

function LanguageSelector({ hasAccess }: { hasAccess: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted,setIsMounted] = useState(false);
  const { language, setLanguage } = useCodeEditorState();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentLangObj = LANGUAGE_CONFIG[language];

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(()=>{
    if(!hasAccess){
      setLanguage("javascript");
    }
  },[hasAccess])

  useEffect(()=>{
    setIsMounted(true);
    return ()=> {setIsMounted(false)}
  })

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 group py-1 md:py-2 flex gap-2 items-center  md:w-40 lg:w-48 bg-[#1e1e2e]/80 rounded-full md:rounded-md hover:bg-[#262636] transition-all duration-200 border-gray-800/50 border-2 hover:border-gray-700"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className="size-6 rounded-md overflow-hidden bg-gray-800/50 group-hover:scale-110 transition-transform">
          {isMounted && <Image
            src={currentLangObj?.logoPath}
            width={24}
            height={24}
            alt="programming language icon"
            className="size-6 w-full h-full object-cover relative z-10"
          />}
        </div>
        <span className="block sm:hidden md:block text-sm w-20 lg:min-w-[80px] flex-1 text-gray-300 text-left group-hover:text-white transition-colors">
          {isMounted ? currentLangObj?.label : "Language"}
        </span>

        <BiChevronDown
          className={`size-5 text-gray-400 transition-all duration-300 group-hover:text-gray-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
        />
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className={`absolute top-full right-0 sm:-left-[100px] md:left-0 mt-2 h-[300px] overflow-y-scroll w-full min-w-[200px] md:min-w-[240px] bg-[#1e1e2e]/95 backdrop-blur-xl rounded-xl border border-[#313244] sbadow-2xl py-2 z-50`}
          >
            <div className="px-2 pb-2 mb-2 border-b border-gray-800/50">
              <p className="text-xs font-medium text-gray-400 px-2">
                Select Language
              </p>
            </div>

            {Object.values(LANGUAGE_CONFIG).map((lang, index) => {
              const allow = hasAccess || lang.id == "javascript";

              return (
                <motion.button
                  key={lang.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative group w-full flex items-center gap-3 px-3 py-2 hover:bg-[#262636]  rounded-xl duration-200 ${lang.id === language && "bg-blue-500/10 text-blue-400 border border-blue-400"} ${allow ? "text-gray-400" : "cursor-not-allowed text-gray-200"}`}
                  onClick={() => (allow && setLanguage(lang.id))}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity ${hasAccess ? "" : "hidden"}`}
                  />
                  <div
                    className={`size-6 rounded-md overflow-hidden bg-gray-800/50 transition-transform ${allow && "group-hover:scale-110"}`}
                  >
                    <Image
                      src={lang.logoPath}
                      alt="programming language icon"
                      width={24}
                      height={24}
                      className="w-full h-full object-cover relative z-10"
                    />
                  </div>
                  <span
                    className={`flex-1 text-left transition-colors ${allow && "group-hover:text-white"}`}
                  >
                    {lang.label}
                  </span>

                  {/* pro indicatior */}
                  {allow ? (
                    <Image
                      src={"/sparkel.svg"}
                      alt="sparkle image"
                      width={14}
                      height={15}
                      className="fill-gray-400"
                    />
                  ) : (
                    <LuLock size={12} />
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default LanguageSelector;
