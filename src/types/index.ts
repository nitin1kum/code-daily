import { Monaco } from "@monaco-editor/react";
import { Id } from "../../convex/_generated/dataModel";

export interface Theme {
  id: string;
  label: string;
  color: string;
}

export interface Language {
  id: string;
  label: string;
  logoPath: string;
  monacoLanguage: string;
  defaultCode: string;
  pistonRuntime: LanguageRuntime;
}

export interface LanguageRuntime {
  language: string;
  version: string;
  judgeId : number;
}

export interface ExecuteCodeResponse {
  compile?: {
    output: string;
  };
  run?: {
    output: string;
    stderr: string;
  };
}

export interface ExecutionResult {
  code: string;
  output: string;
  error: string | null;
}

export interface CodeEditorState {
  language: string;
  output: string;
  isRunning: boolean;
  error: string | null;
  error_name : string | null;
  theme: string;
  fontSize: number;
  editor: Monaco | null;
  input : string,
  executionResult: ExecutionResult | null;

  setEditor: (editor: Monaco) => void;
  getCode: () => string;
  setInput : (input : string) => void;
  setLanguage: (language: string) => void;
  setTheme: (theme: string) => void;
  setFontSize: (fontSize: number) => void;
  runCode: () => Promise<void>;
}

export interface DevelopmentState {
  html : string,
  css : string,
  script : string
  editor: Monaco | null;
  language : string,
  logs: Array<logs>,

  updateHTML : (html : string) => void,
  getCode: () => string;
  setLogs : (logs : Array<logs>) => void,
  setLanguage: (language: string) => void;
  setEditor: (editor: Monaco) => void;
  updateCSS : (css : string) => void,
  updateJS : (js : string) => void,
}

export interface logs {
  error : string,
  message : string,
  warning : string
}

export interface ModeSelector{
  mode : string,
  changeMode : (mode : string) => void
}

export interface Snippet {
  _id: Id<"snippets">;
  _creationTime: number;
  userId: string;
  language: string;
  code: string;
  title: string;
  userName: string;
}

export interface Pen {
  _id: Id<"codepens">;
  _creationTime: number;
  userId: string;
  html: string;
  css: string;
  script: string;
  title: string;
  userName: string;
}