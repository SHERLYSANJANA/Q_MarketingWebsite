"use client";

import React, { useMemo, useState } from "react";
import { DAY_NAMES } from "../../../lib/constants";
import { formatINR } from "../../../lib/math";
import { SkylineDay, SkylineDisciplineLevel } from "../../../lib/types";

const COLORS = {
  n: [200, 199, 192], // neutral
  r: [224, 103, 90], // red impulse
  w: [224, 168, 79], // amber watch
  g: [95, 211, 162], // green disciplined
};

const toRgb = (c: number[], factor: number) =>
  `rgb(${c.map((v) => Math.round(v * factor)).join(",")})`;

export const SpendingSkyline: React.FC = () => {
  const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(null);

  // Generate 30 days of data
  const days: SkylineDay[] = useMemo(() => {
    const disciplineLevels: SkylineDisciplineLevel[] = ["Low", "Medium", "High"];

    const list = Array.from({ length: 30 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - 29 + i);
      const v = Math.abs(Math.sin(i * 3.1 + 1));
      const im = Math.abs(Math.sin(i * 1.7));
      const amt = Math.round(200 + v * 2800);
      const discLevelIndex = 2 - Math.floor(v * 2.99);

      return {
        index: i,
        row: Math.floor(i / 10),
        col: i % 10,
        spendRatio: v,
        impulseRatio: im,
        amount: amt,
        dayName: DAY_NAMES[d.getDay()],
        dateString: d
          .toLocaleDateString("en-US", { month: "short", day: "numeric" })
          .toUpperCase(),
        isHighest: false,
        disciplineLevel: disciplineLevels[discLevelIndex] || "Medium",
      };
    });

    const maxIndex = list.reduce(
      (bestIdx, d) => (d.amount > list[bestIdx].amount ? d.index : bestIdx),
      0
    );
    list[maxIndex].isHighest = true;
    return list;
  }, []);

  const S = 44;
  const hw = S * 0.88;
  const hh = S * 0.44;

  const activeDay =
    selectedDayIndex !== null ? days[selectedDayIndex] : null;

  // Zoom transform when day is picked
  const transform = useMemo(() => {
    if (activeDay === null) return "scale(1)";
    const x = 190 + (activeDay.col - activeDay.row) * S;
    const y = 200 + (activeDay.col + activeDay.row) * S * 0.5;
    const z = 1.22;
    const tx = (x * (1 - z)).toFixed(1);
    const ty = (y * (1 - z)).toFixed(1);
    return `translate(${tx} ${ty}) scale(${z})`;
  }, [activeDay, S]);

  return (
    <section data-cam="a" data-mood="2" className="sec">
      <div className="qi" data-f="mapped the last 30 days">
        <i />
        <span>mapped the last 30 days</span>
      </div>
      <h2 className="hd">
        Thirty days, <em>as a skyline.</em>
      </h2>
      <p className="lede">Drag to explore, tap a building.</p>
      <p className="flow">
        <span>Height = spend</span>
        <i>·</i>
        <span>
          Colour = signal: red impulse, amber watch, green disciplined
        </span>
        <i>·</i>
        <span>Left to right = time</span>
      </p>

      <div className="mapw" id="mapw">
        <svg
          id="map"
          viewBox="0 0 600 460"
          role="img"
          aria-label="30-day spending skyline"
        >
          <g
            style={{
              transform,
              transition: "transform 0.4s cubic-bezier(0.5, 0, 0.2, 1)",
            }}
          >
            {[...days]
              .sort((a, b) => a.col + a.row - (b.col + b.row))
              .map((d) => {
                const x = 190 + (d.col - d.row) * S;
                const y = 200 + (d.col + d.row) * S * 0.5;
                const h = 6 + d.spendRatio * 120;
                const C =
                  d.impulseRatio > 0.66
                    ? COLORS.r
                    : d.impulseRatio > 0.33
                      ? COLORS.w
                      : d.spendRatio < 0.25
                        ? COLORS.g
                        : COLORS.n;

                const isSelected = selectedDayIndex === d.index;

                return (
                  <g
                    key={d.index}
                    data-i={d.index}
                    tabIndex={0}
                    role="button"
                    aria-label={`${d.dayName}, ₹${d.amount} spent`}
                    style={{ cursor: "pointer" }}
                    onClick={() => setSelectedDayIndex(d.index)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        setSelectedDayIndex(d.index);
                      }
                    }}
                  >
                    {(d.impulseRatio > 0.33 || d.spendRatio < 0.25) && (
                      <ellipse
                        cx={x}
                        cy={y}
                        rx={hw * 1.3}
                        ry={hh * 1.4}
                        fill={toRgb(C, 1)}
                        opacity={d.spendRatio < 0.25 ? 0.22 : 0.2}
                      />
                    )}

                    {/* Left Face */}
                    <polygon
                      points={`${x - hw},${y - h} ${x},${y - h + hh} ${x},${y + hh} ${x - hw},${y}`}
                      fill={toRgb(C, 0.5)}
                    />

                    {/* Right Face */}
                    <polygon
                      points={`${x + hw},${y - h} ${x},${y - h + hh} ${x},${y + hh} ${x + hw},${y}`}
                      fill={toRgb(C, 0.32)}
                    />

                    {/* Roof */}
                    <polygon
                      points={`${x},${y - h - hh} ${x + hw},${y - h} ${x},${y - h + hh} ${x - hw},${y - h}`}
                      fill={toRgb(C, isSelected ? 1.25 : 0.95)}
                    />

                    {/* Windows */}
                    {d.impulseRatio > 0.5 &&
                      h > 40 &&
                      [0, 1, 2].map((j) => {
                        const f = 0.3 + j * 0.2;
                        const yy = y - h + hh * f + 10 + j * 14;
                        if (yy < y - 6) {
                          return (
                            <rect
                              key={j}
                              x={x - hw + f * hw - 1.5}
                              y={yy}
                              width={3}
                              height={5}
                              fill="#ffd98a"
                              opacity={0.6}
                            />
                          );
                        }
                        return null;
                      })}

                    {/* Antenna for subscription day */}
                    {d.col === 4 && (
                      <path
                        d={`M${x} ${y - h - hh}v-16M${x - 6} ${y - h - hh - 6}h12M${x - 4} ${y - h - hh - 11}h8`}
                        stroke={toRgb(COLORS.n, 0.9)}
                        strokeWidth="1.5"
                        fill="none"
                      />
                    )}
                  </g>
                );
              })}
          </g>
        </svg>
      </div>

      <div className="tip" id="tip" aria-live="polite">
        {activeDay ? (
          <>
            <small>{activeDay.dateString}</small>
            <b className="tm2">{formatINR(activeDay.amount)}</b>
            <div className="rds">
              <span>
                {activeDay.isHighest ? "Highest spending day" : activeDay.dayName}
              </span>
              <span>
                {Math.round(activeDay.impulseRatio * 4)} impulse purchases
              </span>
              <span>Discipline {activeDay.disciplineLevel}</span>
            </div>
            <div className="rdl">
              {activeDay.col === 4 ? "Subscriptions renew on this day. " : ""}
              {activeDay.impulseRatio > 0.66
                ? "Feeds your Impulse Index."
                : "A steady day for your score."}
            </div>
          </>
        ) : (
          <span className="sm">Tap a day.</span>
        )}
      </div>
    </section>
  );
};
