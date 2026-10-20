"use client";

import React, { useState } from "react";
import { PersonasDeck } from "./personas-deck/personas-deck";
import { BehavioralFingerprint } from "./behavioral-fingerprint/behavioral-fingerprint";

export const PersonasSection: React.FC = () => {
  const [activePersonaIndex, setActivePersonaIndex] = useState<number>(0);

  return (
    <>
      <PersonasDeck
        activePersonaIndex={activePersonaIndex}
        onSelectPersona={setActivePersonaIndex}
      />
      <BehavioralFingerprint
        activePersonaIndex={activePersonaIndex}
        onSelectPersona={setActivePersonaIndex}
      />
    </>
  );
};
