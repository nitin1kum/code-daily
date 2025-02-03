"use client"
import { useDevelopmentState } from "@/store/DevelopmentState";
import React, { useEffect, useRef } from "react";

function DevelopmentOutputWindow() {
  const { html, css, script } = useDevelopmentState();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(()=>{
    const content = `<html>
        <head>
          <style>
            ${css}
          </style>
        </head>
        <body>
          ${html}
          <script>
            (function() {
              // Override console methods to send logs to the parent window
              const originalLog = console.log;
              const originalError = console.error;
              const originalWarn = console.warn;

              function sendToParent(message) {
                window.parent.postMessage(message, "*");
              }

              console.log = function(...args) {
                originalLog(...args);
                sendToParent({ type: 'log', message: args.join(' ') });
              };

              console.error = function(...args) {
                originalError(...args);
                sendToParent({ type: 'error', message: args.join(' ') });
              };

              console.warn = function(...args) {
                originalWarn(...args);
                sendToParent({ type: 'warn', message: args.join(' ') });
              };

              // Example custom script
              ${script}
            })();
          </script>
        </body>
      </html>`

    if(iframeRef.current){
        let frameDoc = iframeRef.current.contentDocument;
        if(iframeRef.current.contentWindow){
            frameDoc = iframeRef.current.contentWindow.document;
        }

        frameDoc?.open();
        frameDoc?.writeln(content);
        frameDoc?.close();
    }
  },[html,css,script])
  return (
    <div className="bg-white relative h-[400px] md:h-[574px] overflow-y-scroll">
      <iframe
        ref={iframeRef}
        className="w-full h-full p-0"
        height="100%" width="100%" src="about:blank" name="myiframe"
      ></iframe>
    </div>
  );
}

export default DevelopmentOutputWindow;
