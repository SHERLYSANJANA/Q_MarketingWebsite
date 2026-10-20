"use client";

import React, { useMemo } from "react";
import { HARMONIC_KEYS, PERSONAS } from "../../../lib/constants";
import { pseudoRandom } from "../../../lib/math";

interface BehavioralFingerprintProps {
  activePersonaIndex: number;
  onSelectPersona: (index: number) => void;
}

export const BehavioralFingerprint: React.FC<BehavioralFingerprintProps> = ({
  activePersonaIndex,
  onSelectPersona,
}) => {
  const persona = PERSONAS[activePersonaIndex];

  // Calculate Fourier polygon contours for active persona
  const layers = useMemo(() => {
    return [0, 1, 2, 3].map((layerIndex) => {
      const scale = 1 - layerIndex * 0.18;
      const points: string[] = [];

      for (let j = 0; j <= 160; j++) {
        const theta = (j / 160) * Math.PI * 2;
        let radius = 1;

        HARMONIC_KEYS.forEach((harmonicKey) => {
          const amplitude = persona.harmonics[harmonicKey] || 0;
          const phase =
            pseudoRandom(harmonicKey, activePersonaIndex + 3) * Math.PI * 2;
          radius +=
            amplitude *
            Math.sin(harmonicKey * theta + phase + layerIndex * 0.5) *
            (1 + layerIndex * 0.3);
        });

        const x = (Math.cos(theta) * radius * scale * 80).toFixed(1);
        const y = (Math.sin(theta) * radius * scale * 80).toFixed(1);
        points.push(`${x},${y}`);
      }

      return {
        points: points.join(" "),
        strokeOpacity: 0.85 - layerIndex * 0.2,
        strokeWidth: 1 - layerIndex * 0.15,
      };
    });
  }, [activePersonaIndex, persona.harmonics]);

  return (
    <section data-cam="i" className="sec" id="fpr" data-mood="2">
      <div className="qi" data-f="found your behavioral signature">
        <i />
        <span>found your behavioral signature</span>
      </div>
      <div className="mo">
        <small>Your habits leave</small>
        <b>a signature.</b>
      </div>
      <p className="lede" id="fpl">
        {persona.name}: {persona.description}.
      </p>

      <svg
        className="fp"
        id="fp"
        viewBox="-110 -110 220 220"
        role="img"
        aria-label="Behavioral fingerprint"
      >
        {layers.map((layer, idx) => (
          <polygon
            key={idx}
            points={layer.points}
            fill="none"
            style={{ stroke: persona.color }}
            strokeOpacity={layer.strokeOpacity}
            strokeWidth={layer.strokeWidth}
          />
        ))}
        <circle r="2" style={{ fill: persona.color }} />
      </svg>

      <div className="pbtn" id="fpb">
        {PERSONAS.map((p, i) => (
          <button
            key={p.id}
            data-i={i}
            aria-pressed={i === activePersonaIndex}
            onClick={() => onSelectPersona(i)}
          >
            {p.name.replace("The ", "")}
          </button>
        ))}
      </div>
    </section>
  );
};
