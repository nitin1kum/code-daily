"use client";

import React, { useEffect } from "react";
import { defineMonacoThemes, LANGUAGE_CONFIG } from "../_constants";
import { Editor } from "@monaco-editor/react";
import { useCodeEditorState } from "@/store/CodeEditorState";

function CodePanel() {
  const { theme, language, setEditor, fontSize, editor } = useCodeEditorState();
  const handleEditorChange = (value: string | undefined) => {
    if (value) localStorage.setItem(`code-editor-${language}`, value);
  };

  useEffect(() => {
    const savedCode = localStorage.getItem(`code-editor-${language}`);
    const newCode = savedCode || LANGUAGE_CONFIG[language].defaultCode;
    if (editor) editor.setValue(newCode);
  }, [language, editor]);
  
  return (
    <div className="relative group rounded-xl overflow-hidden ring-1 ring-white/[0.05] min-h-[400px] md:min-h-[600px]">
      <Editor
        className="h-[400px] md:h-[600px]"
        language={LANGUAGE_CONFIG[language].monacoLanguage}
        onChange={handleEditorChange}
        theme={theme}
        beforeMount={defineMonacoThemes}
        onMount={(editor) => {
          setEditor(editor);
        }}
        options={{
          minimap: { enabled: false },
          fontSize,
          automaticLayout: true,
          scrollBeyondLastLine: false,
          padding: { top: 16, bottom: 16 },
          renderWhiteSpace: "selection",
          fontFamily: '"Fira Code","Cascadia Code",Consolas,monospace',
          fontLigature: true,
          cursorBlinking: "smooth",
          smoothScrolling: true,
          contextmenu: true,
          renderLineHighlight: "all",
          lineHeight: 1.6,
          letterSpacing: 0.5,
          roundedSelection: true,
          scrollbar: {
            verticalScrollbarSize: 8,
            horizontalScrollbarSize: 8,
          },
        }}
      />
    </div>
  );
}

export default CodePanel;
