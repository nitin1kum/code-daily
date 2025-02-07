"use client";

import { useModeSlector } from "@/store/ModeSelector";
import CodeOutputPanel from "./CodeOutputPanel";
import DevelopmentOutputPanel from "./DevelopmentOutputPanel";

function OutputPanel({ width, overlay }: { width: number; overlay: boolean }) {
  const { mode } = useModeSlector();
  return (
    <div
      style={{ width: width + "%" }}
      className={`relative bg-[#181825] rounded-xl p-3 sm:p-6 ring-1 ring-white/[0.05] flex-grow w-[50%]`}
    >
      <div
        className={`absolute z-10 inset-0 ${overlay ? "block" : "hidden"}`}
      />
      {mode === "Code" ? <CodeOutputPanel /> : <DevelopmentOutputPanel />}
    </div>
  );
}

export default OutputPanel;
