"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BiTerminal, BiWindow } from "react-icons/bi";
import { GrConsole } from "react-icons/gr";
import DevelopmentOutputWindow from "./DevelopmentOutputWindow";
import { useDevelopmentState } from "@/store/DevelopmentState";
import Console from "./Console";
import { logs } from "@/types";

const TABS = [
  {
    id: "window",
    label: "Window",
    icon: BiWindow,
  },
  {
    id: "console",
    label: "Console",
    icon: GrConsole,
  },
];

function DevelopmentOutputPanel() {
  const logs : Array<logs> = [];
  const { setLogs } = useDevelopmentState();
  const [activeTab, setActiveTab] = useState<"window" | "console">("window");

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;

      const { type, message } = event.data;
      let obj;
      if(type === "error"){
        obj = {error : message,message : "",warning : ""};
      }
      else if(type === "warn"){
        obj = {error : "",message : "",warning : message};
      }
      else{
        obj = {error : "",message : message,warning : ""}
      }
      logs.push(obj);
      setLogs(logs);
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-4 h-[36px]">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center size-6 rounded-lg bg-[#1e1e2e] ring-1 ring-gray-800/50">
            <BiTerminal className="size-4 text-blue-400" />
          </div>
          <span className="text-sm font-medium text-gray-300">Output</span>
        </div>
      </div>
      <div className="relative group overflow-hidden min-h-[400px] md:min-h-[600px]">
        {/* Develoment Panel Header */}
        <div className="border-b border-gray-800/50 rounded-t-xl">
          <div className="flex gap-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as "window" | "console");
                }}
                className={`group flex items-center gap-1 w-24 px-3 py-2 hover:bg-gray-400/10 rounded-t-md transition-all duration-200 relative overflow-hidden ${activeTab === tab.id ? "text-blue-400" : "text-gray-400 hover:text-gray-300"}`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-blue-500/10 rounded-t-md"
                    transition={{
                      type: "spring",
                      bounce: 0.2,
                      duration: 0.6,
                    }}
                  />
                )}
                <tab.icon className="size-4 fill-gray-400" />
                <span className="text-sm font-medium relative z-10">
                  {tab.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Development Editor */}
        <div className="relative group rounded-b-xl overflow-hidden ring-1 ring-white/[0.05] min-h-[400px] md:min-h-[574px]">
          {activeTab === "window" ? (
            <DevelopmentOutputWindow />
          ) : (
            <div><Console/></div>
          )}
        </div>
      </div>
    </>
  );
}

export default DevelopmentOutputPanel;
