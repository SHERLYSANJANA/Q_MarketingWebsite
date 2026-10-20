"use client";

import React, { useEffect, useRef, useState } from "react";
import { clamp, smoothstep, lerp } from "../../../lib/math";
import { useReducedMotion } from "../../../hooks/use-reduced-motion";

const SIGNAL_LABELS = [
  "₹1,192 Amazon",
  "₹384 Swiggy",
  "11:40 PM",
  "₹220 Uber",
  "₹649 Netflix",
  "₹2,499",
];

const STEPS = ["Raw", "Pattern", "Behavior", "Insight", "Action"];
const STEP_MAPPING = [0, 1, 2, 3, 4, 4]; // Maps 6 screens to 5 step indices

export const PhoneExperience: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const phoneRef = useRef<HTMLDivElement | null>(null);
  const signalsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const finalRevealRef = useRef<HTMLDivElement | null>(null);

  const [activeScreenIndex, setActiveScreenIndex] = useState<number>(0);
  const reducedMotion = useReducedMotion();

  // 40-dot cluster for Behavior screen
  const dotClusterIndices = [10, 11, 12, 18, 19, 20, 21, 27, 28];

  useEffect(() => {
    const sec = sectionRef.current;
    const phone = phoneRef.current;
    if (!sec || !phone || reducedMotion) return;

    let animId: number;

    const frame = (time: number) => {
      const rect = sec.getBoundingClientRect();
      const progress = clamp(-rect.top / (rect.height - window.innerHeight));

      const em = smoothstep(clamp(progress / 0.14));
      const sv = smoothstep(clamp(progress / 0.92));
      const st =
        progress < 0.12
          ? 0
          : clamp(Math.floor(((progress - 0.12) / 0.66) * 6), 0, 5);

      setActiveScreenIndex(st);

      // 3D Phone transform
      const yaw = lerp(-64, -6, sv);
      const pitch = lerp(16, 0, clamp(progress * 3));
      const zPos = lerp(-1000, 0, em);
      const scale = lerp(0.8, 1, em);

      phone.style.transform = `translate3d(0,0,${zPos}px) rotateX(${pitch}deg) rotateY(${yaw}deg) scale(${scale})`;
      phone.style.setProperty("--rf", `${yaw * 1.5}deg`);
      phone.style.opacity = `${clamp(progress / 0.08)}`;

      // Ambient signals floating
      const W = window.innerWidth;
      const H = window.innerHeight;
      const radiusScale = lerp(1, 0.6, sv);
      const fade =
        (1 - smoothstep(clamp((progress - 0.6) / 0.2))) *
        clamp(progress / 0.08) *
        0.6;
      const drift = progress < 0.6 ? 1 : 0;

      signalsRef.current.forEach((span, i) => {
        if (!span) return;
        const angle =
          (i / 6) * Math.PI * 2 +
          0.6 +
          (drift ? Math.sin(time * 0.0004 + i) * 0.08 : 0);
        const x = W / 2 + Math.cos(angle) * radiusScale * W * 0.46;
        const y = H * 0.5 + Math.sin(angle) * radiusScale * H * 0.34;
        span.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
        span.style.opacity = `${fade}`;
      });

      // Final reveal
      const o = smoothstep(clamp((progress - 0.8) / 0.12));
      if (finalRevealRef.current) {
        finalRevealRef.current.style.opacity = `${o}`;
        finalRevealRef.current.style.translate = `0 ${(1 - o) * 24}px`;
      }

      animId = requestAnimationFrame(frame);
    };

    animId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(animId);
  }, [reducedMotion]);

  const activeStep = STEP_MAPPING[activeScreenIndex];

  return (
    <section
      ref={sectionRef}
      className="phone-sec"
      id="phone"
      data-mood="3"
      aria-label="Q turns patterns into decisions"
    >
      <div className="pstick">
        <div className="qfar" aria-hidden="true" />
        <p className="pk">Q turns patterns into decisions.</p>

        {/* Ambient floating signals */}
        <div className="psig" id="psig" aria-hidden="true">
          {SIGNAL_LABELS.map((label, i) => (
            <span
              key={i}
              ref={(el) => { signalsRef.current[i] = el; }}
            >
              {label}
            </span>
          ))}
        </div>

        {/* 3D Phone Mock */}
        <div className="pscene">
          <div
            ref={phoneRef}
            className="phone3"
            id="ph3"
            role="img"
            aria-label="The Q app: a raw transaction becomes a pattern, a behavior, an insight and an action"
          >
            <i className="pe e1" />
            <i className="pe e2" />
            <i className="pe e3" />
            <div className="pbody">
              <div className="pscr" id="pscr">
                {/* Screen 0: Raw */}
                <div className={`ps ${activeScreenIndex === 0 ? "on" : ""}`}>
                  <small>Today</small>
                  <b className="pa">Amazon</b>
                  <b className="pn">−₹1,192</b>
                  <div className="pr">
                    <span>Swiggy</span>
                    <span>−₹384</span>
                  </div>
                  <div className="pr">
                    <span>Uber</span>
                    <span>−₹220</span>
                  </div>
                </div>

                {/* Screen 1: Pattern */}
                <div className={`ps ${activeScreenIndex === 1 ? "on" : ""}`}>
                  <small>This week</small>
                  <b className="pa">3 purchases</b>
                  <div className="pr hi">
                    <span>Tue 11:12 PM</span>
                    <span>₹1,192</span>
                  </div>
                  <div className="pr hi">
                    <span>Thu 11:40 PM</span>
                    <span>₹499</span>
                  </div>
                  <div className="pr hi">
                    <span>Sat 10:58 PM</span>
                    <span>₹749</span>
                  </div>
                </div>

                {/* Screen 2: Behavior */}
                <div className={`ps ${activeScreenIndex === 2 ? "on" : ""}`}>
                  <small>Behavior</small>
                  <b className="pa">Impulse cluster detected</b>
                  <div className="dg">
                    {Array.from({ length: 40 }, (_, idx) => (
                      <i
                        key={idx}
                        className={dotClusterIndices.includes(idx) ? "r" : ""}
                      />
                    ))}
                  </div>
                  <div className="pr">
                    <span>Impulse</span>
                    <span style={{ color: "var(--rd)" }}>72</span>
                  </div>
                </div>

                {/* Screen 3: Insight */}
                <div className={`ps ${activeScreenIndex === 3 ? "on" : ""}`}>
                  <small>Q insight</small>
                  <b className="pa">Late-night shopping pattern</b>
                  <div className="bs">
                    {Array.from({ length: 24 }, (_, h) => (
                      <i
                        key={h}
                        className={h >= 21 ? "h" : ""}
                        style={{
                          height: `${
                            h >= 21 ? 90 : 12 + Math.abs(Math.sin(h * 2.3)) * 40
                          }%`,
                        }}
                      />
                    ))}
                  </div>
                  <div className="pr">
                    <span>After 9 PM</span>
                    <span style={{ color: "var(--wn)" }}>+31%</span>
                  </div>
                </div>

                {/* Screen 4: Action */}
                <div className={`ps ${activeScreenIndex === 4 ? "on" : ""}`}>
                  <div className="qc" data-s="insight" />
                  <b className="pa mid">Q recommends the 24-hour rule</b>
                  <div className="pb">Hold ₹2,499</div>
                </div>

                {/* Screen 5: Action Result */}
                <div className={`ps ${activeScreenIndex === 5 ? "on" : ""}`}>
                  <div className="qc" data-s="success" />
                  <b className="pa mid" style={{ color: "var(--ok)" }}>
                    ₹2,499 held instead of spent
                  </b>
                  <small className="mid">Decide again tomorrow.</small>
                </div>
              </div>
              <b className="pisl" />
            </div>
          </div>
        </div>

        {/* Step indicator */}
        <ol className="pst" id="pst" aria-hidden="true">
          {STEPS.map((step, i) => (
            <li key={step} className={i <= activeStep ? "on" : ""}>
              {step}
            </li>
          ))}
        </ol>

        {/* Final reveal */}
        <div ref={finalRevealRef} className="mo pfin" id="pfin">
          <small>Q doesn&apos;t only observe. Q helps you</small>
          <b
            className={`rv ${activeScreenIndex >= 4 ? "in" : ""}`}
            id="chg"
            style={{ fontSize: "clamp(56px, 17vw, 170px)" }}
          >
            change it.
          </b>
        </div>
      </div>
    </section>
  );
};
