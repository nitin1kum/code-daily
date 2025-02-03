"use client";

import React, {
  ReactHTMLElement,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { THEMES } from "../_constants";
import { useCodeEditorState } from "@/store/CodeEditorState";
import { AnimatePresence, motion } from "framer-motion";
import { MdOutlinePalette, MdOutlineWbSunny } from "react-icons/md";
import {
  FaRegCircle,
  FaRegLightbulb,
  FaRegMoon,
  FaWater,
} from "react-icons/fa";
import { IoFlashlightOutline } from "react-icons/io5";

const THEME_ICONS: Record<string, React.ReactNode> = {
  "vs-dark": <FaRegMoon className="size-4" />,
  "vs-light": <MdOutlineWbSunny className="size-4" />,
  "mid-night-ocean": <FaWater className="size-4" />,
  "solarized-light": <FaRegLightbulb className="size-4" />,
  "cyberpunk-glow": <IoFlashlightOutline className="size-4" />,
};

function ThemeSelector() {
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useCodeEditorState();
  const currentTheme = useMemo(() => {
    return THEMES.find((n) => n.id === theme) || THEMES[0];
  }, [theme]);
  const dropDownRef = useRef<HTMLDivElement>(null);

  useEffect(()=>{
      setIsMounted(true);
      return ()=> {setIsMounted(false)}
    })

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside, true);
    return () => window.removeEventListener("click", handleClickOutside, true);
  }, []);

  
  return (
    <div className="relative" ref={dropDownRef}>
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={(e) => setIsOpen(!isOpen)}
        className="px-3 group py-1 md:py-2 flex gap-2 items-center md:w-40 lg:w-48 bg-[#1e1e2e]/80 rounded-full md:rounded-md hover:bg-[#262636] transition-all duration-200 border-gray-800/50 border-2 hover:border-gray-700"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

        <MdOutlinePalette className="size-6 text-gray-400 group-hover:text-gray-300 transition-colors" />
        <span className="hidden md:block text-sm w-20 overflow-hidden text-ellipsis whitespace-nowrap lg:min-w-[80px] flex-1 text-gray-300 text-left group-hover:text-white transition-colors">
          {isMounted ? currentTheme?.label : "VS Dark"}
        </span>

        <div
          style={{ backgroundColor: isMounted ? currentTheme?.color : "transparent" }}
          className="w-3 h-3 rounded-full ring-1 ring-gray-400"
        />
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full -left-[50px] translate-x-full md:left-0 mt-2 w-full min-w-[220px] md:min-w-[240px] bg-[#1e1e2e]/95 backdrop-blur-xl rounded-xl border border-[#313244] sbadow-2xl py-2 z-50"
          >
            <div className="px-2 pb-2 mb-2 border-b border-gray-800/50">
              <p className="text-xs font-medium text-gray-400 px-2">
                Select Theme
              </p>
            </div>

            {THEMES.map((t, index) => {
              return (
                <motion.button
                  key={t.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative group w-full flex items-center gap-3 px-3 py-1 md:py-2 hover:bg-[#262636] rounded-xl duration-200 ${t.id == theme ? "bg-blue-500/10 text-blue-400 border border-blue-400" : "text-gray-300"}`}
                  onClick={() => setTheme(t.id)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div
                    className={`h-8 w-8 rounded-md ${t.id === theme ? "bg-gray-600/30" : "bg-gray-800/50"} group-hover:bg-gray-600/30 flex justify-center items-center`}
                  >
                    {THEME_ICONS[t.id] || <FaRegCircle className="size-4" />}
                  </div>
                  <span className="flex-1 text-left group-hover:text-white transition-colors ">
                    {t.label}
                  </span>

                  {/* color indicatior */}
                  <div
                    className="relative size-4 rounded-full border border-gray-600 group-hover:border-gray-500 transition-colors"
                    style={{ background: t.color }}
                  >
                    {theme == t.id && (
                      <motion.div
                        className="absolute inset-0 border-2 border-blue-500/30 rounded-lg"
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                      />
                    )}
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ThemeSelector;
