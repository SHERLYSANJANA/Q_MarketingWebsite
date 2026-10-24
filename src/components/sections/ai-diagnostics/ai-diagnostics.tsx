"use client";

import React, { useEffect, useState } from "react";
import { useInView } from "../../../hooks/use-in-view";

const LOG_ITEMS = [
  "214 transactions read",
  "Time analysis",
  "Category clustering",
  "Behavior vs 30-day average",
  "Pattern detected: late-night food delivery",
];

export const AIDiagnostics: React.FC = () => {
  const [visibleLogCount, setVisibleLogCount] = useState<number>(0);
  const [showBars, setShowBars] = useState<boolean>(false);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const { ref: containerRef, isInView } = useInView<HTMLDivElement>(
    { threshold: 0.4 },
    true,
  );

  useEffect(() => {
    if (!isInView) return;

    // Reveal logs sequentially
    LOG_ITEMS.forEach((_, index) => {
      setTimeout(
        () => {
          setVisibleLogCount((prev) => Math.max(prev, index + 1));
        },
        (index + 1) * 450,
      );
    });

    const barsTimer = setTimeout(
      () => {
        setShowBars(true);
      },
      LOG_ITEMS.length * 450 + 400,
    );

    const answerTimer = setTimeout(
      () => {
        setShowAnswer(true);
      },
      LOG_ITEMS.length * 450 + 1600,
    );

    return () => {
      clearTimeout(barsTimer);
      clearTimeout(answerTimer);
    };
  }, [isInView]);

  return (
    <section data-cam="f" data-mood="4" className="sec">
      <div ref={containerRef} className="stage two">
        <div>
          <div className="qi" data-f="found the cause">
            <i />
            <span>found the cause</span>
          </div>
          <h2 className="hd">
            Diagnostics, <em>not chat.</em>
          </h2>
          <p
            className="flow"
            style={{
              fontSize: "clamp(17px,4.6vw,26px)",
              letterSpacing: "-.03em",
              color: "var(--ink)",
            }}
          >
            Chatbots answer questions. Q investigates behavior.
          </p>
          <p className="lede">
            Q checks your own spending history first, then explains it.
          </p>
        </div>

        <div className="ai g g3" id="ai">
          <div style={{ marginBottom: 10 }}>
            Why did I spend so much this month?
          </div>

          {LOG_ITEMS.map((log, i) => (
            <div key={log} className={`lg2 ${i < visibleLogCount ? "on" : ""}`}>
              {log}
            </div>
          ))}

          <div className="bars" id="bars">
            {Array.from({ length: 24 }, (_, h) => {
              const isLateNight = h >= 21;
              const targetHeight = isLateNight
                ? 60 + h * 1
                : 10 + Math.abs(Math.sin(h * 2.3)) * 28;

              return (
                <i
                  key={h}
                  className={isLateNight ? "h" : ""}
                  style={{
                    height: showBars ? `${targetHeight}%` : "0%",
                    transition: `height 0.8s cubic-bezier(0.5,0,0.2,1) ${h * 0.02}s`,
                  }}
                />
              );
            })}
          </div>

          <small>Food delivery by hour</small>

          <div className={`ans ${showAnswer ? "on" : ""}`} id="ans">
            <small>DIAGNOSIS</small>
            <br />
            Most of the increase came from <em>
              late-night food delivery
            </em>: <em>31% more</em> than your 30-day average, mostly between 9
            PM and 12 AM.
          </div>
        </div>
      </div>
    </section>
  );
};
