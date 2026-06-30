"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;
    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      }
      ringX += (mouseX - ringX) * 0.1;
      ringY += (mouseY - ringY) * 0.1;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px)`;
      }
      rafId = requestAnimationFrame(animate);
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const interactive =
        el.tagName === "A" ||
        el.tagName === "BUTTON" ||
        el.tagName === "INPUT" ||
        el.tagName === "TEXTAREA" ||
        el.closest("a") ||
        el.closest("button");
      if (interactive) {
        dotRef.current?.classList.add("cursor-hover");
        ringRef.current?.classList.add("cursor-hover");
      } else {
        dotRef.current?.classList.remove("cursor-hover");
        ringRef.current?.classList.remove("cursor-hover");
      }
    };

    const onClick = () => {
      dotRef.current?.classList.add("cursor-click");
      ringRef.current?.classList.add("cursor-click");
      setTimeout(() => {
        dotRef.current?.classList.remove("cursor-click");
        ringRef.current?.classList.remove("cursor-click");
      }, 300);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("click", onClick, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("click", onClick);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
