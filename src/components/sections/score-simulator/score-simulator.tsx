"use client";

import React, { useState } from "react";
import { FORCE_METRICS } from "../../../lib/constants";
import { calculateWellnessScore } from "../../../lib/math";
import { QOrb } from "../../ui/q-orb";

export const ScoreSimulator: React.FC = () => {
  const [values, setValues] = useState<[number, number, number, number]>([
    86, 72, 91, 38,
  ]);
  const [score, setScore] = useState<number>(742);
  const [activeEffect, setActiveEffect] = useState<
    "fx-in" | "fx-rd" | "fx-ok" | "fx-wn" | null
  >(null);
  const [orbStatus, setOrbStatus] = useState<
    "idle" | "insight" | "warning" | "success" | "analyzing"
  >("idle");

  const effects = ["fx-in", "fx-rd", "fx-ok", "fx-wn"] as const;
  const statuses = ["insight", "warning", "success", "analyzing"] as const;

  const handleChipClick = (index: number) => {
    const nextValues = [...values] as [number, number, number, number];
    const currentVal = nextValues[index];
    nextValues[index] = currentVal >= 100 ? 10 : Math.min(100, currentVal + 10);

    setValues(nextValues);
    const newScore = calculateWellnessScore(
      nextValues[0],
      nextValues[1],
      nextValues[2],
      nextValues[3]
    );
    setScore(newScore);

    setActiveEffect(effects[index]);
    setOrbStatus(statuses[index]);

    setTimeout(() => {
      setOrbStatus("idle");
    }, 2400);
  };

  return (
    <section data-cam="c" data-mood="2" className="sec" id="product">
      <h2 className="hd">
        One score. <em>Four forces behind it.</em>
      </h2>
      <p className="lede">Tap a metric to see how your Financial Score reacts.</p>

      <div className="scorebox">
        <div id="sorb">
          <QOrb
            values={values}
            score={score}
            status={orbStatus}
            activeEffect={activeEffect}
          />
        </div>
      </div>

      <div className="chips" id="chips">
        {FORCE_METRICS.map((metric, i) => (
          <button
            key={metric.name}
            className="chip g g2"
            data-k={i}
            onClick={() => handleChipClick(i)}
          >
            <span>{metric.name}</span>
            <div className={`vz v${i}`}>
              {i === 3 ? (
                <svg viewBox="0 0 240 20">
                  <path
                    d="M0 10Q15 0 30 10T60 10T90 10T120 10T150 10T180 10T210 10T240 10"
                    fill="none"
                    stroke="#e0a84f"
                    strokeWidth="1.5"
                  />
                </svg>
              ) : (
                <i />
              )}
            </div>
            <b style={{ color: metric.color }}>{values[i]}</b>
          </button>
        ))}
      </div>
    </section>
  );
};
