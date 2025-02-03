import { useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

function CodeBlock({ code, language }: { code: string; language: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const lines = code.split('\n');
  const displayCode = isExpanded ? code : lines.slice(0,6).join("\n");
  return (
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
        <button onClick={() => setIsExpanded(!isExpanded)} className="absolute bottom-2 right-2 px-2 py-1 bg-blue-400 rounded text-xs flex items-center gap-1 hover:bg-blue-500/30 transition-colors">
            {isExpanded ? (
                <>
                    Show Less <BiChevronUp className="size-3"/>
                </>
            ) : (
                <>
                    Show More <BiChevronDown className="size-3"/>
                </>
            )}
        </button>
      )}
    </div>
  );
}

export default CodeBlock;
