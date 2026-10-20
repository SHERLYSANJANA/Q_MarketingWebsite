import React from "react";

export const ExpenseComparison: React.FC = () => {
  return (
    <section data-cam="a" data-mood="6" className="sec">
      <h2 className="hd">
        Not another <em>expense tracker.</em>
      </h2>

      <div className="cmp reveal in" id="cmp">
        <div className="old">
          <small>Traditional expense tracker</small>
          <p>You spent ₹500.</p>
        </div>
        <div className="nq">
          <small>Q</small>
          <p>You spent ₹500 at 9:42 PM.</p>
          <p>That&apos;s your third late-night food purchase this week.</p>
          <p>Your average is ₹320.</p>
          <p className="hl">Q detected a recurring pattern.</p>
        </div>
      </div>

      <p className="big">
        <span className="d rv in" id="s1">
          One records what happened.&nbsp;
        </span>
        <span className="rv in" id="s2">
          Q helps explain why.&nbsp;
        </span>
      </p>
    </section>
  );
};
