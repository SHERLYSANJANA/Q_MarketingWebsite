"use client";

import React, { useEffect, useRef } from "react";
import { MOOD_ACTS } from "../../lib/constants";
import { useReducedMotion } from "../../hooks/use-reduced-motion";

export const AmbientGrid: React.FC = () => {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined" || reducedMotion) return;

    let animId: number;
    let lastScrollY = window.scrollY;
    let gridOffsetY = 0;
    const currentValues = { rx: 74, ga: 0.05 };

    const frame = () => {
      const scrollY = window.scrollY;
      const moodSections = document.querySelectorAll("[data-mood]");
      let activeMood = 0;
      moodSections.forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.5) {
          activeMood = Number((el as HTMLElement).dataset.mood) || 0;
        }
      });

      const actConfig = MOOD_ACTS[activeMood] || MOOD_ACTS[0];
      const targetRx = actConfig.rotationX;
      const targetGa = actConfig.gridAlpha;

      currentValues.rx += (targetRx - currentValues.rx) * 0.04;
      currentValues.ga += (targetGa - currentValues.ga) * 0.04;

      const dy = scrollY - lastScrollY;
      lastScrollY = scrollY;
      gridOffsetY = (gridOffsetY + dy * 0.7) % 64;

      if (gridRef.current) {
        gridRef.current.style.setProperty("--rx", `${currentValues.rx}deg`);
        gridRef.current.style.setProperty("--ga", currentValues.ga.toFixed(3));
        gridRef.current.style.backgroundPosition = `${Math.sin(scrollY / 900) * 64}px ${gridOffsetY}px`;
      }

      animId = requestAnimationFrame(frame);
    };

    animId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(animId);
  }, [reducedMotion]);

  return (
    <>
      <div className="leak" />
      <div className="qw" aria-hidden="true">
        <div ref={gridRef} className="grid" id="grid" />
      </div>
    </>
  );
};
