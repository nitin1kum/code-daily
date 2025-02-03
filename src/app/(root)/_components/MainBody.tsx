"use client";

import React, { useEffect, useRef, useState } from "react";
import EditorPanel from "./EditorPanel";
import OutputPanel from "./OutputPanel";

function MainBody() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [left, setLeft] = useState(50);
  const [size, setSize] = useState(window ? window.innerWidth : 1440);
  const [right, setRight] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [overlay, setOverlay] = useState(false);

  useEffect(() => {
    const handleResize = () =>{
      setSize(window.innerWidth);
    }
    window.addEventListener("resize",handleResize);
    return () => {
      window.removeEventListener("resize",handleResize);
    }
  }, [])
  

  function handleMouseDown(e: React.MouseEvent) {
    e.preventDefault();
    if (!containerRef.current || !sliderRef.current) return;
    setOverlay(true);
    const startX = e.clientX;
    const containerWidth = containerRef.current.offsetWidth;

    document.body.style.cursor = "ew-resize";
    sliderRef.current.children[0].classList.add("bg-blue-600");

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const newLeft =
        ((left * containerWidth) / 100 + deltaX) / containerWidth * 100;

      if (newLeft > 25 && newLeft < 75) {
        setLeft(newLeft);
        setRight(100 - newLeft);
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);

      document.body.style.cursor = "default";
      if(sliderRef.current)
        sliderRef.current.children[0].classList.remove("bg-blue-600");
      setOverlay(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }

  return (
    <div className="relative flex-col lg:flex-row gap-2 flex lg:gap-0 mt-2 w-full" ref={containerRef}>
      <EditorPanel width={size > 1100 ? left : 100} />
      <div
        className="relative group w-2 md:flex items-center justify-center hover:cursor-ew-resize hidden"
        ref={sliderRef}
        onMouseDown={handleMouseDown}
      >
        <div className="hidden lg:block h-full min-h-[400px] w-[2px] group-hover:bg-blue-600" />
      </div>
      <OutputPanel width={size > 1100 ? right : 100} overlay={overlay}/>
    </div>
  );
}

export default MainBody;
