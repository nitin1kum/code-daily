"use client"
import { getExecutionResult, useCodeEditorState } from "@/store/CodeEditorState";
import { useUser } from "@clerk/nextjs";
import React from "react";
import { BiLoader, BiPlay } from "react-icons/bi";
import { motion } from "framer-motion";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";

const RunButton = () => {
  const { user } = useUser();
  const { isRunning, runCode, language } =
    useCodeEditorState();
    const saveExecution = useMutation(api.codeExecution.saveExecution);

  const handleRun = async () => {
    await runCode();
    const result = getExecutionResult();

    if(user && result){
        await saveExecution({
            language,
            code : result.code,
            output : result.output || undefined,
            error : result.error || undefined
        })
    }
  };
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      disabled={isRunning}
      onClick={handleRun}
      className="group px-3 py-1 md:py-2 bg-blue-600 transition-all duration-150 disabled:cursor-not-allowed focus:outline-none hover:bg-blue-700 flex cursor-pointer items-center rounded-full md:rounded-md"
    >
        {
            isRunning ? (
                <div className=" flex gap-1 items-center">
                    <BiLoader className="size-6 animate-spin text-white/50"/>
                    <span className="hidden md:block text-sm font-medium transition-colors text-white/80 group-hover:text-white">Executing...</span>
                </div>
            ):(
                <div className="flex gap-1 items-center">
                    <BiPlay className="size-6" />
                    <span className="hidden md:block text-sm font-medium transition-colors text-white/80 group-hover:text-white">Run Code</span>
                </div>
            )
        }
    </motion.button>
  );
};

export default RunButton;
