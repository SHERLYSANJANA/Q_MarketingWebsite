"use client";

import React, { CSSProperties } from "react";
import { cn } from "../../lib/utils";

export interface QOrbProps {
  values?: [number, number, number, number];
  score?: number | string;
  status?: "idle" | "analyzing" | "insight" | "warning" | "success";
  coreContent?: React.ReactNode;
  activeEffect?: "fx-in" | "fx-rd" | "fx-ok" | "fx-wn" | null;
  chaosFactor?: number;
  className?: string;
  tilt?: boolean;
}

const RING_CONFIGS = [
  { inset: -8, tiltDeg: 68, color: "var(--ink)", duration: 26 },
  { inset: -16, tiltDeg: 52, color: "var(--rd)", duration: 34 },
  { inset: -24, tiltDeg: 78, color: "var(--ok)", duration: 22 },
  { inset: -32, tiltDeg: 40, color: "var(--wn)", duration: 40 },
];

export const QOrb: React.FC<QOrbProps> = ({
  values = [86, 72, 91, 38],
  score = 742,
  status = "idle",
  coreContent,
  activeEffect,
  chaosFactor,
  className,
  tilt = true,
}) => {
  const style: CSSProperties & Record<string, string | number> = {};
  if (chaosFactor != null) {
    style["--ch"] = chaosFactor;
  }

  return (
    <div
      className={cn("orb g g4", activeEffect, className)}
      data-s={status}
      data-tilt={tilt ? "" : undefined}
      style={style}
    >
      {RING_CONFIGS.map((ring, i) => (
        <i
          key={i}
          className="r"
          style={
            {
              "--i": `${ring.inset}%`,
              "--tx": `${ring.tiltDeg}deg`,
              "--c": ring.color,
              "--v": values[i] ?? 50,
              "--d": `${ring.duration}s`,
            } as CSSProperties
          }
        />
      ))}
      <i className="pt" style={{ "--pd": "16s" } as CSSProperties} />
      <i
        className="pt"
        style={{ "--pd": "23s", rotate: "120deg" } as CSSProperties}
      />
      <i
        className="pt"
        style={{ "--pd": "31s", rotate: "240deg" } as CSSProperties}
      />
      <div className="oc">
        {coreContent ? (
          coreContent
        ) : (
          <>
            <b>{score}</b>
            <small>Financial Wellness</small>
          </>
        )}
      </div>
    </div>
  );
};
