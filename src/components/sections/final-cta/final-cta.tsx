"use client";

import React, { useEffect, useRef } from "react";
import { ALPHA_FORM_URL, TRANSACTIONS } from "../../../lib/constants";
import { useReducedMotion } from "../../../hooks/use-reduced-motion";
import { CTAButton } from "../../ui/cta-button";
import { QOrb } from "../../ui/q-orb";

const EXTRA_CARDS = [
  "Score 742",
  "Stealth Saver",
  "24h rule · ₹2,499 saved",
  "Leak found · ₹18,420",
  "Q diagnostics",
  "Rhythm · after 9 PM",
];

export const FinalCTA: React.FC = () => {
  const worldRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const world = worldRef.current;
    if (!world || reducedMotion) return;

    let animId: number;
    const cards = world.querySelectorAll<HTMLElement>(".wc");
    const totalCards = cards.length;

    const frame = (time: number) => {
      const tSec = time / 1000;
      const width = world.clientWidth;
      const height = world.clientHeight;
      const isMobile = width < 760;

      const rx = isMobile ? width * 0.38 : width * 0.3;
      const ry = isMobile ? height * 0.3 : height * 0.34;

      cards.forEach((card, i) => {
        const angle = (i / totalCards) * Math.PI * 2 + tSec * 0.18;
        const sinA = Math.sin(angle);
        const cosA = Math.cos(angle);

        const x = cosA * rx;
        const y = sinA * ry * 0.8;
        const z = sinA * 160;
        const rotZ = cosA * -6;
        const scale = 0.82 + 0.18 * sinA;
        const opacity = 0.45 + 0.5 * (sinA * 0.5 + 0.5);

        card.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotateZ(${rotZ}deg) scale(${scale})`;
        card.style.opacity = `${opacity}`;
      });

      animId = requestAnimationFrame(frame);
    };

    animId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(animId);
  }, [reducedMotion]);

  return (
    <section data-mood="7" id="final">
      <div ref={worldRef} className="world" id="w2">
        <QOrb
          values={[86, 72, 91, 38]}
          coreContent={<b>Q</b>}
          status="success"
        />

        {TRANSACTIONS.map((tx, i) => (
          <div key={`tx-${i}`} className="wc g g2">
            <small>{tx.merchant}</small>
            <b>{tx.amount}</b>
            <span>{tx.time}</span>
          </div>
        ))}

        {EXTRA_CARDS.map((text, i) => (
          <div key={`extra-${i}`} className="wc g g3">
            <small>Q</small>
            <b style={{ fontSize: 14, letterSpacing: "-.01em" }}>{text}</b>
          </div>
        ))}
      </div>

      <div className="ft">
        <h2>
          <span className="rv in" id="f1">
            Know where your money goes.&nbsp;
          </span>
          <em className="rv in" id="f2">
            Understand why.
          </em>
        </h2>

        <div
          className="row late in"
          style={{ justifyContent: "center", marginTop: 30 }}
        >
          <CTAButton
            href={ALPHA_FORM_URL}
            magnetic
            style={{ minHeight: 60, padding: "0 44px", fontSize: 17 }}
            target="_blank"
            rel="noopener noreferrer"
          >
            Join the Q Alpha
          </CTAButton>
        </div>

        <p className="sm" style={{ marginTop: 18 }}>
          Q is currently in development.
        </p>
      </div>
    </section>
  );
};
