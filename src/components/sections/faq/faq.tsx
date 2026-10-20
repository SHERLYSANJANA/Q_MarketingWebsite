import React from "react";
import { FAQ_LIST } from "../../../lib/constants";

export const FAQ: React.FC = () => {
  return (
    <section data-cam="f" data-mood="7" className="sec" id="faq">
      <h2 className="hd">FAQ</h2>
      <div style={{ marginTop: 24 }}>
        {FAQ_LIST.map((item, idx) => (
          <details key={idx}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
};
