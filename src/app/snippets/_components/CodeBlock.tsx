"use client";

import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import CopyButton from "./CopyButton";
import { useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

function CodeBlock({ language, code }: { language: string; code: string }) {
  const trimmedCode = code
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n");
  const [isExpanded, setIsExpanded] = useState(false);
  const lines = trimmedCode.split("\n");
  const displayCode = isExpanded ? code : lines.slice(0, 6).join("\n");
  return (
    <div className="mt-4 bg-[#0a0a0f] rounded-lg overflow-hidden border border-[#ffffff0a]">
      {/* header bar showing language and copy button */}
      <div className="flex items-center justify-between px-2 sm:px-4 py-2 bg-[#ffffff08]">
        {/* language indicator with icon */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">
            {language || "plaintext"}
          </span>
        </div>
        {/* Button to copy code to clipboard */}
        <CopyButton code={trimmedCode} />
      </div>

      {/* code block with syntax highlighter */}
      <div className="relative">
        <SyntaxHighlighter
          language={language || "plaintext"}
          style={atomOneDark}
          customStyle={{
            padding: "1rem",
            background: "transparent",
            margin: 0,
          }}
          showLineNumbers={true}
          wrapLines={true}
        >
          {displayCode}
        </SyntaxHighlighter>
        {lines.length > 6 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="absolute bottom-2 right-2 px-2 py-1 bg-blue-400 rounded text-xs flex items-center gap-1 hover:bg-blue-500/30 transition-colors"
          >
            {isExpanded ? (
              <>
                Show Less <BiChevronUp className="size-3" />
              </>
            ) : (
              <>
                Show More <BiChevronDown className="size-3" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default CodeBlock;
