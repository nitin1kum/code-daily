"use client";
import { useCodeEditorState } from "@/store/CodeEditorState";
import React, { useState } from "react";
import { BiCheckCircle, BiCopy, BiTerminal } from "react-icons/bi";
import RunningCodeSkelton from "./RunningCodeSkelton";
import { FiAlertTriangle } from "react-icons/fi";
import { FaClock } from "react-icons/fa";

function CodeOutputPanel() {
  const { output, error, error_name, isRunning,setInput } = useCodeEditorState();
  const [isCopied, setIsCopied] = useState(false);

  const hasContent = error || output || "";

  const handleCopy = async () => {
    if (!hasContent) return;

    await navigator.clipboard.writeText(hasContent);
    setIsCopied(true);

    setTimeout(() => setIsCopied(false), 2000);
  };

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
        {hasContent && (
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-gray-400 hover:text-gray-300 bg-[#1e1e2e] rounded-lg ring-1 ring-gray-800/50 hover:ring-gray-700/50 transition-all"
          >
            {isCopied ? (
              <>
                <BiCheckCircle className="w-3.5 h-3.5" />
                Copied!
              </>
            ) : (
              <>
                <BiCopy className="w-3.5 h-3.5" />
                Copy
              </>
            )}
          </button>
        )}
      </div>

      {/* CodeOutputPanel */}

      <div className="relative">
        <div className="relative bg-[#1e1e2e]/50 backdrop-blur-sm border border-[#313244] rounded-xl p-4 h-[400px] md:h-[600px] overflow-auto font-mono text-sm">
        <textarea
                onChange={(e) => {setInput(e.target.value)}}
                name="input"
                id="input"
                className="bg-transparent h-24 mb-1 border-white/[0.05] border p-1 rounded-lg w-full resize-none outline-none text-gray-400"
                placeholder="Input if any..."
              ></textarea>
          {isRunning ? (
            <RunningCodeSkelton />
          ) : error ? (
            <div className="flex items-start gap-3 text-red-400">
              <FiAlertTriangle className="size-5 flex-shrink-0 mt-1" />
              <div className="space-y-1">
                <div className="font-medium">
                  {error_name || "Execution Error"}
                </div>
                <pre className="whitespace-pre-wrap text-red-400/80">
                  {error}
                </pre>
              </div>
            </div>
          ) : output ? (
            <div className="space-y-2">
              <div className="flex items-start gap-2 text-emerald-400 mb-3">
                <BiCheckCircle className="size-5" />
                <div className="space-y-1">
                  <div className="font-medium">Execution Successful</div>
                  <pre className="whitespace-pre-wrap text-white/80">
                    {output}
                  </pre>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-[calc(100%_-_100px)] flex flex-col items-center justify-center text-gray-500">
              <div className="flex items-center justify-center size-12 rounded-xl bg-gray-800/50 ring-1 ring-gray-700/50 mb-4">
                <FaClock className="size-6" />
              </div>
              <p className="text-center">
                Run your code to see the ouput here...
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CodeOutputPanel;
