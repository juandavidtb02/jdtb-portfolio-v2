"use client";

import { useEffect, useRef, useState } from "react";

interface Trail {
  x: number;
  y: number;
  alpha: number;
  id: number;
}

export function RetroCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trails, setTrails] = useState<Trail[]>([]);
  const trailIdRef = useRef(0);
  const frameRef = useRef<number>();

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      setPos({ x, y });
      setTrails((prev) => [
        ...prev.slice(-12),
        { x, y, alpha: 1, id: trailIdRef.current++ },
      ]);
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  // Fade out trail dots
  useEffect(() => {
    const tick = () => {
      setTrails((prev) => {
        const next = prev
          .map((t) => ({ ...t, alpha: t.alpha - 0.08 }))
          .filter((t) => t.alpha > 0);
        return next;
      });
      frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <>
      {/* Trail dots */}
      {trails.map((t) => (
        <div
          key={t.id}
          className="fixed pointer-events-none z-[9999]"
          style={{
            left: t.x - 2,
            top: t.y - 2,
            width: 4,
            height: 4,
            backgroundColor: "#00ffff",
            opacity: t.alpha * 0.6,
            imageRendering: "pixelated",
          }}
        />
      ))}

      {/* Crosshair cursor */}
      <div
        className="fixed pointer-events-none z-[9999]"
        style={{ left: pos.x, top: pos.y, transform: "translate(-50%, -50%)" }}
      >
        {/* Horizontal bar */}
        <div
          className="absolute"
          style={{
            left: -10,
            top: -1,
            width: 20,
            height: 2,
            backgroundColor: "#00ffff",
            boxShadow: "0 0 6px #00ffff",
          }}
        />
        {/* Gap in center (horizontal) */}
        <div
          className="absolute"
          style={{
            left: -2,
            top: -1,
            width: 4,
            height: 2,
            backgroundColor: "transparent",
            boxShadow: "none",
          }}
        />
        {/* Vertical bar */}
        <div
          className="absolute"
          style={{
            left: -1,
            top: -10,
            width: 2,
            height: 20,
            backgroundColor: "#00ffff",
            boxShadow: "0 0 6px #00ffff",
          }}
        />
        {/* Gap in center (vertical) */}
        <div
          className="absolute"
          style={{
            left: -1,
            top: -2,
            width: 2,
            height: 4,
            backgroundColor: "transparent",
            boxShadow: "none",
          }}
        />
        {/* Center dot */}
        <div
          className="absolute"
          style={{
            left: -1,
            top: -1,
            width: 2,
            height: 2,
            backgroundColor: "#ff00ff",
            boxShadow: "0 0 4px #ff00ff",
          }}
        />
      </div>
    </>
  );
}
