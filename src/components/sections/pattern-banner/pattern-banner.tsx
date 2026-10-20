"use client";

import React, { useMemo } from "react";

export const PatternBanner: React.FC = () => {
  const paths = useMemo(() => {
    return [1, 0.8, 0.6].map((scale, layerIndex) => {
      let pathData = "";
      for (let j = 0; j <= 120; j++) {
        const theta = (j / 120) * Math.PI * 2;
        const radius =
          (1 +
            0.1 * Math.sin(5 * theta + layerIndex) +
            0.06 * Math.sin(8 * theta + 1 + layerIndex) +
            0.04 * Math.sin(3 * theta + 2)) *
          scale *
          92;
        const x = (Math.cos(theta) * radius).toFixed(1);
        const y = (Math.sin(theta) * radius).toFixed(1);
        pathData += `${j ? "L" : "M"}${x} ${y}`;
      }
      return {
        d: `${pathData}Z`,
        delay: `${layerIndex * 0.5}s`,
      };
    });
  }, []);

  return (
    <section
      data-mood="2"
      className="sec found"
      style={{ padding: "26svh 22px" }}
    >
      <svg
        className="patbg"
        id="patbg"
        viewBox="-110 -110 220 220"
        aria-hidden="true"
      >
        {paths.map((p, i) => (
          <path
            key={i}
            d={p.d}
            pathLength="1"
            style={{ transitionDelay: p.delay }}
          />
        ))}
      </svg>
      <div className="mo">
        <small>Your money</small>
        <b
          className="rv in"
          id="pat"
          style={{ fontSize: "clamp(46px, 15vw, 170px)" }}
        >
          has a pattern.
        </b>
        <small>Q finds it.</small>
      </div>
    </section>
  );
};
