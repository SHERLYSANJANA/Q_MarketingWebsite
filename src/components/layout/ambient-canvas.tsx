"use client";

import React, { useEffect, useRef } from "react";
import { pseudoRandom, clamp, lerp } from "../../lib/math";
import { useReducedMotion } from "../../hooks/use-reduced-motion";
import { useQualityLevel } from "../../hooks/use-quality-level";

interface Particle {
  x: number;
  y: number;
  z: number;
  phase: number;
}

const LABELS = ["₹340", "Food", "9:42 PM", "₹499", "Subs", "Habit"];

export const AmbientCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reducedMotion = useReducedMotion();
  const qualityLevel = useQualityLevel(reducedMotion);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reducedMotion || qualityLevel === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles: Particle[] = Array.from({ length: 52 }, (_, i) => ({
      x: pseudoRandom(i, 1),
      y: pseudoRandom(i, 2),
      z: 0.3 + pseudoRandom(i, 3) * 0.7,
      phase: pseudoRandom(i, 4) * Math.PI * 2,
    }));

    let isVisible = !document.hidden;
    let prevScrollY = window.scrollY;
    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth / 2;
      canvas.height = window.innerHeight / 2;
    };
    resize();

    window.addEventListener("resize", resize);
    const onVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    const particleCounts = [8, 14, 28];
    const activeCount = particleCounts[qualityLevel] || 14;

    const render = (time: number) => {
      animId = requestAnimationFrame(render);
      if (!isVisible) return;

      const width = canvas.width;
      const height = canvas.height;
      const scrollVelocity = clamp((window.scrollY - prevScrollY) / 40, -1, 1);
      prevScrollY = window.scrollY;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#ecebe6";
      ctx.font = "5px Manrope, sans-serif";

      const points: [number, number][] = [];

      for (let i = 0; i < activeCount; i++) {
        const p = particles[i];
        p.y -= 0.00006 * p.z + scrollVelocity * 0.002 * p.z;
        p.y = (p.y + 1) % 1;

        const px = p.x + Math.sin(time * 0.0004 + p.phase) * 0.012;
        const py = p.y + Math.cos(time * 0.0003 + p.phase) * 0.012;

        const screenX = px * width;
        const screenY = py * height;
        points.push([screenX, screenY]);

        ctx.globalAlpha = 0.15 + 0.35 * p.z;
        ctx.fillRect(screenX, screenY, p.z * 1.6, p.z * 1.6);

        if (i < 6 && qualityLevel > 0) {
          ctx.globalAlpha = 0.25;
          ctx.fillText(LABELS[i], screenX + 4, screenY - 3);
        }
      }

      if (qualityLevel > 1) {
        ctx.strokeStyle = "#ecebe6";
        ctx.lineWidth = 0.5;
        for (let i = 0; i < points.length; i++) {
          for (let j = i + 1; j < points.length; j++) {
            const dx = points[i][0] - points[j][0];
            const dy = points[i][1] - points[j][1];
            const distSq = dx * dx + dy * dy;
            if (distSq < 1800) {
              ctx.globalAlpha = (1 - distSq / 1800) * 0.15;
              ctx.beginPath();
              ctx.moveTo(points[i][0], points[i][1]);
              ctx.lineTo(points[j][0], points[j][1]);
              ctx.stroke();
            }
          }
        }
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [reducedMotion, qualityLevel]);

  return <canvas ref={canvasRef} id="dust" aria-hidden="true" />;
};
