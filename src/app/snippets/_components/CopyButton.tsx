"use client";

import { useState } from "react";
import { BiCheckCircle, BiCopy } from "react-icons/bi";

function CopyButton({ code }: { code: string }) {
  const [isCopied, setIsCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };
  return (
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
  );
}

export default CopyButton;
