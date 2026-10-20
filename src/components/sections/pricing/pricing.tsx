"use client";

import React, { useState } from "react";
import { ALPHA_FORM_URL } from "../../../lib/constants";
import { CTAButton } from "../../ui/cta-button";

const PILLS = [
  "Behavior scoring",
  "Financial Persona",
  "30-Day Map",
  "Discipline Streaks",
  "24-Hour Rule",
  "Leak Detection",
  "AI Coach",
  "Monthly Wrap",
];

export const Pricing: React.FC = () => {
  const [isYearly, setIsYearly] = useState<boolean>(false);

  return (
    <section data-cam="c" data-mood="7" className="sec" id="pricing">
      <h2 className="hd" style={{ textAlign: "center" }}>
        Q Pro.
      </h2>

      <div className="pass g g2">
        <small>Membership pass</small>
        <div className="seg" role="group" aria-label="Billing">
          <button
            id="bm"
            aria-pressed={!isYearly}
            onClick={() => setIsYearly(false)}
          >
            Monthly
          </button>
          <button
            id="by"
            aria-pressed={isYearly}
            onClick={() => setIsYearly(true)}
          >
            Yearly
          </button>
        </div>

        <div className="pr">
          <span id="pr">{isYearly ? "₹999" : "₹99"}</span>
          <small id="pu">{isYearly ? " / year" : " / month"}</small>
        </div>
        <p className="sm" id="pn" style={{ marginTop: 6 }}>
          {isYearly
            ? "About ₹83 a month. Save 16%."
            : "First 7 days free."}
        </p>

        <div className="pills">
          {PILLS.map((pill) => (
            <span key={pill}>{pill}</span>
          ))}
        </div>

        <CTAButton
          href={ALPHA_FORM_URL}
          magnetic
          style={{ width: "100%" }}
          target="_blank"
          rel="noopener noreferrer"
        >
          Join the Alpha
        </CTAButton>
      </div>
    </section>
  );
};
