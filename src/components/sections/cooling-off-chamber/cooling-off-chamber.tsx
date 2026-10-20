"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView } from "../../../hooks/use-in-view";

const CHAMBER_STEPS = ["Want", "Wait 24h", "Decide", "Saved"];

export const CoolingOffChamber: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [timerDisplay, setTimerDisplay] = useState<string>("24:00");
  const [decisionPhase, setDecisionPhase] = useState<"countdown" | "prompt" | "yes" | "no">("countdown");
  const [isChamberOpen, setIsChamberOpen] = useState<boolean>(false);
  const [isVaultFilled, setIsVaultFilled] = useState<boolean>(false);

  const { ref: containerRef, isInView } = useInView<HTMLDivElement>(
    { threshold: 0.5 },
    true
  );

  const animRef = useRef<number | null>(null);

  const startCountdown = () => {
    setActiveStep(1);
    setDecisionPhase("countdown");
    setIsChamberOpen(false);
    setIsVaultFilled(false);

    const startTime = performance.now();
    const duration = 6000; // 6s animated demo

    const tick = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(1, elapsed / duration);
      const remainingMinutes = Math.round(1440 * (1 - Math.pow(progress, 2.2)));

      const hours = String(Math.floor(remainingMinutes / 60)).padStart(2, "0");
      const minutes = String(remainingMinutes % 60).padStart(2, "0");
      setTimerDisplay(`${hours}:${minutes}`);

      if (progress < 1) {
        animRef.current = requestAnimationFrame(tick);
      } else {
        setTimerDisplay("00:00");
        setActiveStep(2);
        setDecisionPhase("prompt");
      }
    };

    animRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    if (isInView) {
      startCountdown();
    }
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isInView]);

  const handleDecision = (want: boolean) => {
    if (want) {
      setDecisionPhase("yes");
    } else {
      setDecisionPhase("no");
      setIsChamberOpen(true);
      setActiveStep(3);
      setTimerDisplay("");
      setIsVaultFilled(true);
    }
  };

  return (
    <section data-cam="i" data-mood="3" className="sec">
      <div ref={containerRef} className="stage two">
        <div>
          <h2 className="hd">The 24-hour rule.</h2>
          <p className="lede">
            Lock a want inside the Cooling Off Chamber. If it still matters
            tomorrow, it&apos;s yours.
          </p>
        </div>

        <div id="ch">
          <div className="stp" id="stp">
            {CHAMBER_STEPS.map((step, idx) => (
              <span key={step} className={idx <= activeStep ? "on" : ""}>
                {step}
              </span>
            ))}
          </div>

          <div
            className={`cham g g3 ${isChamberOpen ? "open" : ""} ${
              decisionPhase === "prompt" ? "lo" : ""
            }`}
            id="cham"
          >
            <div className="lid" />
            <div className="item g g4">
              <small>Sneakers</small>
              <b>₹2,499</b>
            </div>
            <div className="tm" id="ct">
              {timerDisplay}
            </div>
          </div>

          <div className="res" id="res">
            {decisionPhase === "prompt" && (
              <>
                <small>00:00</small>
                <br />
                <b>Still want it?</b>
                <div
                  className="row"
                  style={{ justifyContent: "center", marginTop: 14 }}
                >
                  <button
                    className="cta o"
                    onClick={() => handleDecision(true)}
                  >
                    Yes
                  </button>
                  <button
                    className="cta"
                    onClick={() => handleDecision(false)}
                  >
                    No
                  </button>
                </div>
              </>
            )}

            {decisionPhase === "yes" && (
              <>
                <b>Bought, on purpose.</b>
                <br />
                <button
                  className="cta o"
                  style={{ marginTop: 12 }}
                  onClick={startCountdown}
                >
                  Replay
                </button>
              </>
            )}

            {decisionPhase === "no" && (
              <>
                <b style={{ color: "var(--ok)" }}>₹2,499 stayed yours.</b>
                <br />
                <small>Q helped you not spend.</small>
                <br />
                <button
                  className="cta o"
                  style={{ marginTop: 12 }}
                  onClick={startCountdown}
                >
                  Replay
                </button>
              </>
            )}
          </div>

          <div className="vault" id="vault" aria-label="Savings">
            <i style={{ width: isVaultFilled ? "100%" : "0" }} />
          </div>
        </div>
      </div>
    </section>
  );
};
