"use client";

import { useEffect, useState } from "react";
import { QualityLevel } from "../lib/types";

export function useQualityLevel(reducedMotion: boolean): QualityLevel {
  const [level, setLevel] = useState<QualityLevel>(1);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (reducedMotion) {
      setLevel(0);
      return;
    }

    const cores = navigator.hardwareConcurrency || 4;
    // @ts-expect-error deviceMemory is supported in Chromium
    const memory = navigator.deviceMemory || 4;
    const isMobile = window.innerWidth < 760;

    let initialLevel: QualityLevel = 1;
    if (isMobile) {
      initialLevel = cores >= 6 && memory >= 4 ? 1 : 0;
    } else {
      initialLevel = cores >= 8 ? 2 : 1;
    }

    setLevel(initialLevel);
  }, [reducedMotion]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement.classList;
    root.remove("q-low", "q-med", "q-high");
    const classNames = ["q-low", "q-med", "q-high"] as const;
    root.add(classNames[level]);
  }, [level]);

  return level;
}
