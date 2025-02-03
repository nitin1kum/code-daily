import { ModeSelector } from "@/types";
import { create } from "zustand";

export const useModeSlector = create<ModeSelector>((set,get)=>{
    return{
        mode : "Code",
        changeMode : (mode) => {
            set({mode:mode})
        }
    }
})