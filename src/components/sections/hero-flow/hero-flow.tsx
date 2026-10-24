"use client";

import React, { useEffect, useRef } from "react";
import {
  TRANSACTIONS,
  CATEGORIES,
  FORCE_METRICS,
  ALPHA_FORM_URL,
} from "../../../lib/constants";
import { clamp, smoothstep, lerp, pseudoRandom } from "../../../lib/math";
import { useReducedMotion } from "../../../hooks/use-reduced-motion";
import { CTAButton } from "../../ui/cta-button";
import { QOrb } from "../../ui/q-orb";

export const HeroFlow: React.FC = () => {
  const flowRef = useRef<HTMLDivElement | null>(null);
  const worldRef = useRef<HTMLDivElement | null>(null);
  const hsRef = useRef<HTMLDivElement | null>(null);
  const titleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reducedMotion = useReducedMotion();

  // Kinetic letters for "Q knows why."
  const kineticText = "Q knows why.";

  useEffect(() => {
    // Add "go" class to document body to trigger title animations
    const timer = setTimeout(() => {
      document.body.classList.add("go");
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const flow = flowRef.current;
    const world = worldRef.current;
    const hs = hsRef.current;
    if (!flow || !world || !hs || reducedMotion) return;

    let animId: number;
    let currentT = 0;

    const cards = world.querySelectorAll<HTMLElement>(".wc");
    const glCards = world.querySelectorAll<HTMLElement>(".gl");
    const mcCards = world.querySelectorAll<HTMLElement>(".mc");
    const orbEl = world.querySelector<HTMLElement>(".orb");

    const categoryIndices = TRANSACTIONS.map((t) => t.categoryIndex);
    const categoryCounts = [0, 0, 0, 0];
    const categoryRanks = categoryIndices.map(
      (catIdx) => categoryCounts[catIdx]++,
    );

    const frame = (time: number) => {
      const rect = flow.getBoundingClientRect();
      const progress = clamp(
        -rect.top / (flow.offsetHeight - window.innerHeight),
      );
      const isMobile = window.innerWidth < 760;
      const width = world.clientWidth;
      const height = world.clientHeight;
      const ox = isMobile ? 0 : width * 0.16;

      // Phase calculation
      const keyPoints = [0, 0.36, 0.47, 0.53, 0.64, 0.72, 0.88, 1];
      const keyTargets = [0, 0, 1, 1, 2, 2, 3, 3];
      let targetT = 3;
      for (let i = 1; i < keyPoints.length; i++) {
        if (progress <= keyPoints[i]) {
          targetT = lerp(
            keyTargets[i - 1],
            keyTargets[i],
            (progress - keyPoints[i - 1]) / (keyPoints[i] - keyPoints[i - 1]) ||
              0,
          );
          break;
        }
      }

      currentT += (targetT - currentT) * 0.28;
      const tSec = time / 1000;

      // Positions layout matrices
      const A = isMobile
        ? [
            [-0.23, 0.08],
            [0.23, 0.08],
            [-0.23, 0.23],
            [0.23, 0.23],
          ]
        : [
            [-0.2, -0.14],
            [0.1, -0.14],
            [-0.2, 0.18],
            [0.1, 0.18],
          ];

      const F = isMobile
        ? [
            [-0.24, 0.27],
            [0.24, 0.27],
            [-0.24, 0.4],
            [0.24, 0.4],
          ]
        : [
            [-0.2, -0.2],
            [0.2, -0.2],
            [-0.2, 0.22],
            [0.2, 0.22],
          ];

      // Update 9 transaction cards
      cards.forEach((card, i) => {
        const cat = categoryIndices[i];
        const rk = categoryRanks[i];
        const fx = Math.sin(tSec * 0.5 + i * 1.7) * 10;
        const fy = Math.cos(tSec * 0.4 + i * 2.1) * 12;
        const z0 = (pseudoRandom(i, 3) - 0.5) * (isMobile ? 420 : 760);

        const initialPos = [
          ox + (pseudoRandom(i, 1) - 0.5) * width * 0.92 + fx,
          (pseudoRandom(i, 2) - 0.5) * height * 0.86 + fy,
          z0,
          (pseudoRandom(i, 4) - 0.5) * 26,
        ];

        const targetGroupX = ox + A[cat][0] * width + rk * 8 - 8;
        const targetGroupY = A[cat][1] * height + rk * (isMobile ? 20 : 26);
        const groupPos = [targetGroupX, targetGroupY, rk * 30, (rk - 1) * 3];

        const aStep = smoothstep(
          clamp((currentT - pseudoRandom(i, 7) * 0.3) / 0.7),
        );
        const collapseStep = smoothstep(clamp(currentT - 1));

        const posX = lerp(
          lerp(initialPos[0], groupPos[0], aStep),
          ox + A[cat][0] * width,
          collapseStep,
        );
        const posY = lerp(
          lerp(initialPos[1], groupPos[1], aStep),
          A[cat][1] * height,
          collapseStep,
        );
        const posZ = lerp(
          lerp(initialPos[2], groupPos[2], aStep),
          0,
          collapseStep,
        );
        const rotZ = lerp(initialPos[3], groupPos[3], aStep);
        const scale = lerp(1, 0.35, collapseStep);

        const opacity =
          (1 - smoothstep(clamp((currentT - 1.1) / 0.6))) *
          (0.55 + 0.45 * smoothstep(clamp((posZ + 380) / 760)));

        card.style.transform = `translate3d(${posX}px, ${posY}px, ${posZ}px) rotateZ(${rotZ}deg) scale(${scale})`;
        card.style.opacity = `${opacity}`;
      });

      // Update 4 category label cards
      glCards.forEach((gl, i) => {
        const opacity =
          smoothstep(clamp((currentT - 0.6) / 0.4)) *
          (1 - smoothstep(clamp((currentT - 1.2) / 0.5)));
        gl.style.opacity = `${opacity}`;
        gl.style.transform = `translate3d(${ox + A[i][0] * width}px, ${A[i][1] * height - 52}px, 40px)`;
      });

      // Update 4 force metric cards
      mcCards.forEach((mc, i) => {
        const o = smoothstep(clamp((currentT - 1.5) / 0.5));
        const f = smoothstep(clamp(currentT - 2.3));
        const posX = lerp(ox + A[i][0] * width, ox + F[i][0] * width, f);
        const posY = lerp(A[i][1] * height, F[i][1] * height, f);
        const scale = lerp(0.6, 1, o) * lerp(1, 0.92, f);
        mc.style.transform = `translate3d(${posX}px, ${posY}px, ${lerp(-60, 0, o)}px) scale(${scale})`;
        mc.style.opacity = `${o}`;
      });

      // Update Q Core Orb
      if (orbEl) {
        const orbOpacity = smoothstep(clamp((currentT - 2.1) / 0.6));
        const orbScale = lerp(0.6, 1, orbOpacity);
        orbEl.style.transform = `translate3d(${ox}px, ${isMobile ? -0.06 * height : -0.04 * height}px, ${lerp(-200, 0, orbOpacity)}px) scale(${orbScale})`;
        orbEl.style.opacity = `${orbOpacity}`;
      }

      // Update Title Text Stages
      titleRefs.current.forEach((el) => {
        if (!el) return;
        const a = Number(el.dataset.a);
        const b = Number(el.dataset.b);
        const fadeIn = smoothstep(clamp((progress - a) / 0.035));
        const fadeOut = 1 - smoothstep(clamp((progress - b + 0.035) / 0.035));
        const op = Math.min(fadeIn, fadeOut);
        const yOffset = (1 - fadeIn) * 36 - (1 - fadeOut) * 30;

        el.style.opacity = `${op}`;
        el.style.translate = isMobile
          ? `0 ${yOffset}px`
          : `0 calc(-50% + ${yOffset}px)`;
        el.style.pointerEvents = op > 0.5 ? "auto" : "none";
      });

      // Update Floating Hero Card (#hs)
      const k = smoothstep(clamp(progress / 0.12));
      hs.style.transform = `translate3d(0, ${-k * 90}px, ${-k * 120}px) rotateX(${k * 20}deg)`;
      hs.style.opacity = `${1 - k}`;
      hs.style.pointerEvents = k > 0.8 ? "none" : "auto";

      animId = requestAnimationFrame(frame);
    };

    animId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(animId);
  }, [reducedMotion]);

  return (
    <div ref={flowRef} id="flow" data-mood="0">
      <div className="sticky">
        <div ref={worldRef} className="world" id="w1">
          {TRANSACTIONS.map((tx, i) => (
            <div key={i} className="wc g g2">
              <small>{tx.merchant}</small>
              <b>{tx.amount}</b>
              <span>{tx.time}</span>
            </div>
          ))}

          {CATEGORIES.map((cat, i) => (
            <div key={i} className="gl">
              {cat.name}
              <small>{cat.total}</small>
            </div>
          ))}

          {FORCE_METRICS.map((metric, i) => (
            <div key={i} className="mc g g3">
              <small>{metric.name}</small>
              <b>{metric.value}</b>
              <div className={`vz ${metric.variantClass}`}>
                {metric.variantClass === "v3" ? (
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
            </div>
          ))}

          <QOrb values={[86, 72, 91, 38]} score={742} status="analyzing" />
        </div>

        {/* Hero title block */}
        <div
          ref={(el) => {
            titleRefs.current[0] = el;
          }}
          className="t"
          data-a="-1"
          data-b=".17"
          data-h="1"
        >
          <div className="qi" data-a="is reading the noise">
            <i />
            <span>is reading the noise</span>
          </div>
          <h1>
            <span className="l1">
              Your bank statement knows what you spent.
            </span>
            <span className="l2" id="qk" aria-label="Q knows why.">
              {kineticText.split("").map((char, i) => (
                <span key={i} style={{ transitionDelay: `${0.3 + i * 0.04}s` }}>
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </span>
          </h1>
          <p>
            Q reads your bank SMS on your phone and turns every transaction into
            scores, streaks, a persona and an AI coach.
          </p>
          <div className="row">
            <CTAButton
              href={ALPHA_FORM_URL}
              magnetic
              target="_blank"
              rel="noopener noreferrer"
            >
              Join the Alpha
            </CTAButton>
            <CTAButton href="#product" variant="outline" magnetic>
              Explore Q
            </CTAButton>
          </div>
        </div>

        {/* Floating Mini Summary Card */}
        <div ref={hsRef} className="hs g g4" id="hs">
          <div className="hlg" aria-hidden="true">
            <div style={{ "--d": ".3s" } as React.CSSProperties}>
              <span>Amazon</span>
              <b>−₹1,192</b>
            </div>
            <div style={{ "--d": ".6s" } as React.CSSProperties}>
              <span>Swiggy</span>
              <b>−₹384</b>
            </div>
            <div style={{ "--d": ".9s" } as React.CSSProperties}>
              <span>Uber</span>
              <b>−₹220</b>
            </div>
            <div style={{ "--d": "1.2s" } as React.CSSProperties}>
              <span>Netflix</span>
              <b>−₹649</b>
            </div>
          </div>
          <small
            className="sm"
            style={{
              display: "block",
              margin: "8px 0 6px",
              paddingTop: "8px",
              borderTop: "1px solid rgba(255,255,255,.1)",
            }}
          >
            Q analysis · 214 transactions
          </small>
          <div>
            <div>
              <small>Financial Wellness</small>
              <b className="n">742</b>
            </div>
            <span className="sm" style={{ textAlign: "right" }}>
              Pattern found:
              <br />
              late-night spending
            </span>
          </div>
          <div className="mb">
            <span>Discipline</span>
            <i style={{ "--w": "86%" } as React.CSSProperties} />
            <b>86</b>
          </div>
          <div className="mb">
            <span>Impulse</span>
            <i
              style={
                { "--w": "72%", "--c": "var(--rd)" } as React.CSSProperties
              }
            />
            <b>72</b>
          </div>
          <div className="mb">
            <span>Savings</span>
            <i
              style={
                { "--w": "91%", "--c": "var(--ok)" } as React.CSSProperties
              }
            />
            <b>91</b>
          </div>
        </div>

        {/* Narrative text beats */}
        <div
          ref={(el) => {
            titleRefs.current[1] = el;
          }}
          className="t"
          data-a=".16"
          data-b=".30"
        >
          <h2>Your spending looks random.</h2>
        </div>
        <div
          ref={(el) => {
            titleRefs.current[2] = el;
          }}
          className="t"
          data-a=".35"
          data-b=".53"
        >
          <h2>
            Until you see <em>the pattern.</em>
          </h2>
        </div>
        <div
          ref={(el) => {
            titleRefs.current[3] = el;
          }}
          className="t"
          data-a=".53"
          data-b=".72"
        >
          <h2>
            Q doesn&apos;t just track your money.{" "}
            <em>It studies your behavior.</em>
          </h2>
        </div>
        <div
          ref={(el) => {
            titleRefs.current[4] = el;
          }}
          className="t"
          data-a=".72"
          data-b="1.1"
        >
          <h2>
            And turns behavior into <em>something you can change.</em>
          </h2>
        </div>
      </div>
    </div>
  );
};
