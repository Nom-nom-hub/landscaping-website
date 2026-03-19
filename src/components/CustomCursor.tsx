"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let cursorX = 0;
    let cursorY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const animate = () => {
      cursorX += (targetX - cursorX) * 0.1;
      cursorY += (targetY - cursorY) * 0.1;
      
      if (cursor) {
        cursor.style.left = cursorX - 12 + "px";
        cursor.style.top = cursorY - 12 + "px";
      }
      
      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed w-6 h-6 border-2 border-primary-500 rounded-full pointer-events-none z-[9999] mix-blend-difference transition-transform duration-75 hidden md:block"
    />
  );
}
