"use client";

import React, { useEffect } from "react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log error to monitoring service
    console.error("App Error:", error);
  }, [error]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <div className="hud2" style={{ position: "static", marginBottom: 20 }}>
        <span>ERR</span>
        <b>Diagnostic Interrupted</b>
      </div>
      <h2 style={{ fontSize: "clamp(28px, 5vw, 48px)", marginBottom: 16 }}>
        Something went wrong.
      </h2>
      <p style={{ color: "var(--sil)", maxWidth: 480, marginBottom: 28 }}>
        An unexpected error occurred while analyzing this view.
      </p>
      <button className="cta mag" onClick={() => reset()}>
        Try Again
      </button>
    </div>
  );
}
