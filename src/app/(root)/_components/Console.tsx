import { useDevelopmentState } from "@/store/DevelopmentState";
import React, { useEffect, useRef } from "react";

function Console() {
  const { logs } = useDevelopmentState();
  const containerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if(containerRef.current){
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs])
  
  return (
    <div className="relative">
      <ul ref={containerRef} className="relative list-none bg-[#1e1e2e]/50 backdrop-blur-sm border border-[#313244] rounded-b-xl p-4 h-[400px] md:h-[576px] overflow-auto font-mono text-sm">
        {logs.map((log, idx) => (
          <li key={idx}>
            {log.error ? (
              <div className="flex items-start gap-2 border-b border-b-white/10">
                <div className="">{idx}.</div>
                <pre className="whitespace-pre-wrap text-red-400/80">
                  {log.error}
                </pre>
              </div>
            ) : log.warning ? (
              <div className="flex items-start gap-2 text-yellow-400 border-b border-b-white/10">
                <div className="">{idx}</div>
                <pre className="whitespace-pre-wrap text-yellow-400/80">
                  {log.warning}
                </pre>
              </div>
            ) : (
              log.message ? (
                <div className="flex items-start gap-2 text-white-400 border-b border-b-white/10">
                  <div className="">{idx}</div>
                  <pre className="whitespace-pre-wrap bg-gray-800/50 w-full text-white-400/80">
                    {log.message}
                  </pre>
                </div>
              ) : (
                <div className="flex items-start gap-2 text-white-400 border-b border-b-white/10">
                  <div className="">{idx}</div>
                  <pre className="whitespace-pre-wrap bg-gray-800/50 w-full text-white-400/80">
                    undefined
                  </pre>
                </div>
              )
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Console;
