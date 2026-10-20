import React from "react";
import Link from "next/link";

export default function NotFound() {
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
        <span>404</span>
        <b>Pattern Not Found</b>
      </div>
      <h1 style={{ fontSize: "clamp(32px, 6vw, 64px)", marginBottom: 16 }}>
        Page not found
      </h1>
      <p style={{ color: "var(--sil)", maxWidth: 480, marginBottom: 28 }}>
        The page you are looking for doesn&apos;t exist or has moved. Return to
        the main experience to explore Q.
      </p>
      <Link href="/" className="cta mag">
        Back to Q
      </Link>
    </div>
  );
}
