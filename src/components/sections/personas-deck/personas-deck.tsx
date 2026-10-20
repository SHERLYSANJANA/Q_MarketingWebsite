"use client";

import React, { useState } from "react";
import { PERSONAS } from "../../../lib/constants";

interface PersonasDeckProps {
  activePersonaIndex: number;
  onSelectPersona: (index: number) => void;
}

export const PersonasDeck: React.FC<PersonasDeckProps> = ({
  activePersonaIndex,
  onSelectPersona,
}) => {
  const [dragOffset, setDragOffset] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStartX, setDragStartX] = useState<number | null>(null);

  const total = PERSONAS.length;

  const handlePrev = () => {
    onSelectPersona((activePersonaIndex - 1 + total) % total);
  };

  const handleNext = () => {
    onSelectPersona((activePersonaIndex + 1) % total);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setDragStartX(e.clientX);
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartX === null) return;
    setDragOffset(e.clientX - dragStartX);
  };

  const handlePointerUp = () => {
    if (dragStartX === null) return;
    if (Math.abs(dragOffset) > 80) {
      if (dragOffset > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    }
    setDragStartX(null);
    setIsDragging(false);
    setDragOffset(0);
  };

  // Helper to render geometric signature SVG
  const renderSignature = (vertexCount: number) => {
    return (
      <svg viewBox="0 0 100 100">
        {[0, 1, 2, 3].map((k) => {
          const points = Array.from(
            { length: vertexCount + (k % 2) },
            (_, j) => {
              const angle =
                (j / (vertexCount + (k % 2))) * Math.PI * 2 + k * 0.3;
              const radius = 44 - k * 10;
              const x = (50 + Math.cos(angle) * radius).toFixed(1);
              const y = (50 + Math.sin(angle) * radius).toFixed(1);
              return `${x},${y}`;
            }
          ).join(" ");

          return (
            <polygon
              key={k}
              points={points}
              fill="none"
              stroke="currentColor"
              strokeOpacity={0.9 - k * 0.2}
            />
          );
        })}
      </svg>
    );
  };

  return (
    <section data-cam="s" data-mood="2" className="sec" id="how">
      <h2 className="hd">
        Collectible identities. <em>Built from what you actually do.</em>
      </h2>

      <div
        className="deckw"
        id="deck"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {PERSONAS.map((p, i) => {
          const diff = ((i - activePersonaIndex + 7) % 5) - 2;
          const absDiff = Math.abs(diff);
          const dx = diff === 0 ? dragOffset : 0;

          const transform = `translate3d(${diff * 58 + dx}px, ${absDiff * -8}px, ${-absDiff * 110}px) rotateY(${-diff * 12 + dx * 0.06}deg) rotateZ(${dx * 0.04}deg) scale(${1 + Math.min(Math.abs(dx), 240) * 0.0007}, ${1 - Math.min(Math.abs(dx), 240) * 0.0003})`;
          const opacity = absDiff > 2 ? 0 : 1 - absDiff * 0.28;
          const zIndex = 10 - absDiff;
          const filter = absDiff === 0 ? "" : `blur(${absDiff * 1.1}px)`;

          return (
            <div
              key={p.id}
              className={`pcd g g3 ${absDiff > 0 ? "bk" : ""} ${isDragging && diff === 0 ? "dr" : ""}`}
              style={{
                color: p.color,
                transform,
                opacity,
                zIndex,
                filter,
                pointerEvents: absDiff > 2 ? "none" : "auto",
              }}
              onClick={() => {
                if (Math.abs(dragOffset) < 8) {
                  onSelectPersona(i);
                }
              }}
            >
              {renderSignature(p.vertexCount)}
              <div>
                <span className="tag">{p.tag}</span>
                <h3 style={{ color: "var(--ink)", marginTop: 10 }}>{p.name}</h3>
                <p
                  className="sm"
                  style={{
                    marginTop: 6,
                    color: "var(--sil)",
                    fontSize: 14,
                  }}
                >
                  {p.headline}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="dk">
        <button id="pp" aria-label="Previous persona" onClick={handlePrev}>
          ‹
        </button>
        <span
          id="pi"
          className="sm"
          style={{ minWidth: 170, textAlign: "center" }}
          aria-live="polite"
        >
          {activePersonaIndex + 1} / {total} · {PERSONAS[activePersonaIndex].name}
        </span>
        <button id="pn" aria-label="Next persona" onClick={handleNext}>
          ›
        </button>
      </div>
    </section>
  );
};
