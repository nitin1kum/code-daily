"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BiChevronDown, BiCode } from "react-icons/bi";
import { useModeSlector } from "@/store/ModeSelector";
import { MdDeveloperMode } from "react-icons/md";

function DevelopmentSelector() {
    const {mode,changeMode} = useModeSlector();
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted,setIsMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    setIsMounted(true);
    return ()=> {setIsMounted(false)}
  })

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={(e) => setIsOpen(!isOpen)}
        className="px-3 group py-1 flex gap-2 items-center w-40 bg-[#1e1e2e]/80 rounded-md hover:bg-[#262636] transition-all duration-200 border-gray-800/50 border-2 hover:border-gray-700"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className="size-6 flex items-center justify-center rounded-md overflow-hidden bg-gray-800/50 group-hover:scale-110 transition-transform">
          {mode === "Code" ? (<BiCode className="size-4"/>) : (<MdDeveloperMode className="size-4"/>)}
        </div>
        <span className="text-sm w-60 flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-gray-300 text-left group-hover:text-white transition-colors">
          {isMounted ? mode : "Code"}
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
            className={`absolute top-full -left-[100px] md:left-0 mt-2 overflow-y-scroll w-full min-w-[200px] md:min-w-[240px] bg-[#1e1e2e]/95 backdrop-blur-xl rounded-xl border border-[#313244] sbadow-2xl py-2 z-50`}
          >
            <div className="px-2 pb-2 mb-2 border-b border-gray-800/50">
              <p className="text-xs font-medium text-gray-400 px-2">
                Select Mode
              </p>
            </div>

            {["Code","Development"].map((md, index) => {
              return (
                <motion.button
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative group w-full flex items-center gap-3 px-3 py-2 hover:bg-[#262636]  rounded-xl duration-200 text-gray-400 ${md === mode && "bg-blue-500/10 text-blue-400 border border-blue-400"}`}
                  onClick={() => changeMode(md)}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity`}
                  />
                  <div
                    className={`size-6 flex items-center justify-center rounded-md overflow-hidden bg-gray-800/50 transition-transform ${ "group-hover:scale-110"}`}
                  >
                    {md === "Code" ? (<BiCode className="size-4"/>) : (<MdDeveloperMode className="size-4"/>)}
                  </div>
                  <span
                    className={`flex-1 text-left transition-colors group-hover:text-white`}
                  >
                    {md}
                  </span>
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default DevelopmentSelector;
