import React from "react";

export const PrivacyArchitecture: React.FC = () => {
  return (
    <section data-cam="i" data-mood="5" className="sec" id="privacy">
      <h2 className="hd">
        Your money is private. <em>Your data should be too.</em>
      </h2>
      <p className="flow">
        Your transactions<i>→</i>Q<i>→</i>Local analysis<i>→</i>Stays on your
        device
      </p>

      <div className="priv" style={{ marginTop: 30 }}>
        <div className="pvs">
          <div className="g g2" style={{ gridColumn: 1 }}>
            ✓ On device
          </div>
          <div className="g g2" style={{ gridColumn: 1 }}>
            ✓ Verified bank SMS
          </div>
          <div className="g g2" style={{ gridColumn: 3, gridRow: 1 }}>
            ✓ No OTP
          </div>
          <div className="g g2" style={{ gridColumn: 3, gridRow: 2 }}>
            ✓ No selling, no lending
          </div>
        </div>

        <div className="pv">
          <span className="cl">
            cloud <b>✕</b>
          </span>
          <div className="gp g g4">
            <i />
            <i />
            <i />
            <i className="x" />
            <i
              className="x"
              style={{ marginLeft: 22, animationDelay: "1.4s" }}
            />
            <small style={{ textAlign: "center" }}>
              analysis
              <br />
              stays here
            </small>
          </div>
        </div>

        <div
          className="g g2"
          style={
            {
              padding: 16,
              fontWeight: 700,
              "--r": "18px",
              justifySelf: "stretch",
            } as React.CSSProperties
          }
        >
          ✓ Offline AI
        </div>
      </div>
    </section>
  );
};
