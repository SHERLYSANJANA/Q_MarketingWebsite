"use client";

import React, { useEffect, useState } from "react";
import { MOOD_ACTS } from "../../lib/constants";

export const ActHud: React.FC = () => {
  const [currentAct, setCurrentAct] = useState<{ index: string; title: string }>({
    index: "01",
    title: "Chaos",
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateMood = () => {
      const moodSections = document.querySelectorAll("[data-mood]");
      let activeMood = 0;
      moodSections.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.5) {
          activeMood = Number((el as HTMLElement).dataset.mood) || 0;
        }
      });

      const actConfig = MOOD_ACTS[activeMood] || MOOD_ACTS[0];
      const titleWithoutPrefix = actConfig.actTitle.replace(/Act [IVX]+ · /, "");
      setCurrentAct({
        index: actConfig.actRoman,
        title: titleWithoutPrefix,
      });
    };

    window.addEventListener("scroll", updateMood, { passive: true });
    updateMood();

    return () => window.removeEventListener("scroll", updateMood);
  }, []);

  return (
    <div className="hud2" aria-hidden="true">
      <span id="mi">{currentAct.index}</span>
      <b id="mn2">{currentAct.title}</b>
    </div>
  );
};
