"use client";

import { useEffect, useRef } from "react";
import { clamp } from "../lib/math";

export interface SmoothedPointer {
  raw: { x: number; y: number };
  smooth: { x: number; y: number };
}

export function useDevicePointer(reducedMotion: boolean) {
  const pointerRef = useRef<SmoothedPointer>({
    raw: { x: 0, y: 0 },
    smooth: { x: 0, y: 0 },
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const onPointerMove = (e: PointerEvent) => {
      pointerRef.current.raw.x = e.clientX / window.innerWidth - 0.5;
      pointerRef.current.raw.y = e.clientY / window.innerHeight - 0.5;
    };

    const onOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma != null && e.beta != null) {
        pointerRef.current.raw.x = clamp(e.gamma / 45, -0.5, 0.5);
        pointerRef.current.raw.y = clamp((e.beta - 50) / 70, -0.5, 0.5);
      }
    };

    const requestOrientationPermission = () => {
      // @ts-expect-error iOS Safari DeviceOrientationEvent permission
      if (typeof DeviceOrientationEvent !== "undefined" && typeof DeviceOrientationEvent.requestPermission === "function") {
        // @ts-expect-error iOS Safari DeviceOrientationEvent permission
        DeviceOrientationEvent.requestPermission().catch(() => {});
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("deviceorientation", onOrientation);
    window.addEventListener("click", requestOrientationPermission, { once: true });

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("deviceorientation", onOrientation);
      window.removeEventListener("click", requestOrientationPermission);
    };
  }, []);

  return pointerRef;
}
