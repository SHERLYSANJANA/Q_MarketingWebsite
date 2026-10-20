"use client";

import React, { useEffect, useState } from "react";
import { useInView } from "../../../hooks/use-in-view";

const LEAK_STEPS = ["Leak", "Detected", "Stopped", "Returned"];

export const SubscriptionLeak: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [disabledSubs, setDisabledSubs] = useState<boolean[]>([false, false, false]);
  const [isFrozen, setIsFrozen] = useState<boolean>(false);
  const [savingsCounter, setSavingsCounter] = useState<number>(0);

  const { ref: containerRef, isInView } = useInView<HTMLDivElement>(
    { threshold: 0.5 },
    true
  );

  useEffect(() => {
    if (!isInView) return;

    // Trigger sequential subscription deactivation
    const t1 = setTimeout(() => {
      setDisabledSubs([true, false, false]);
      setActiveStep(1);
    }, 2000);

    const t2 = setTimeout(() => {
      setDisabledSubs([true, true, false]);
      setActiveStep(1);
    }, 2800);

    const t3 = setTimeout(() => {
      setDisabledSubs([true, true, true]);
      setActiveStep(2);
    }, 3600);

    const t4 = setTimeout(() => {
      setIsFrozen(true);
      setActiveStep(3);

      // Animate annual counter up to 18,420
      const startTime = performance.now();
      const target = 18420;
      const duration = 1600;

      const animateCount = (time: number) => {
        const elapsed = time - startTime;
        const progress = Math.min(1, elapsed / duration);
        const current = Math.round(target * (1 - Math.pow(1 - progress, 3)));
        setSavingsCounter(current);

        if (progress < 1) {
          requestAnimationFrame(animateCount);
        } else {
          setSavingsCounter(target);
        }
      };

      requestAnimationFrame(animateCount);
    }, 4500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [isInView]);

  return (
    <section data-cam="s" data-mood="3" className="sec">
      <div ref={containerRef} className="stage two">
        <div>
          <div className="qi" data-f="found a leak">
            <i />
            <span>found a leak</span>
          </div>
          <h2 className="hd">
            Small leaks <em>sink budgets.</em>
          </h2>
          <p className="lede">
            Subscriptions drain your balance quietly, a little every month.
          </p>
        </div>

        <div id="lk" className={`${isInView ? "go" : ""} ${isFrozen ? "frz" : ""}`}>
          <div className="sbs">
            <div className={`g g2 ${disabledSubs[0] ? "off" : ""}`}>
              Netflix
              <br />
              <b>₹649</b>
            </div>
            <div className={`g g2 ${disabledSubs[1] ? "off" : ""}`}>
              Spotify
              <br />
              <b>₹119</b>
            </div>
            <div className={`g g2 ${disabledSubs[2] ? "off" : ""}`}>
              YouTube
              <br />
              <b>₹189</b>
            </div>
          </div>

          <div className="stp" id="stl" style={{ justifyContent: "flex-start" }}>
            {LEAK_STEPS.map((step, idx) => (
              <span key={step} className={idx <= activeStep ? "on" : ""}>
                {step}
              </span>
            ))}
          </div>

          <div className="tank g g3">
            <div className="lq" />
            <div className="found g g4">
              <small>Q found a leak</small>
              <b>
                ₹{savingsCounter.toLocaleString("en-IN")} / year
              </b>
              <span className="sm">
                in unused subscriptions, back in your balance
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
