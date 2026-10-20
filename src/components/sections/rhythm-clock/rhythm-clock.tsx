"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { formatINR, pseudoRandom } from "../../../lib/math";
import { RhythmPurchase } from "../../../lib/types";

export const RhythmClock: React.FC = () => {
  const [handHour, setHandHour] = useState<number>(21.5);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const clockSvgRef = useRef<SVGSVGElement | null>(null);

  // Generate deterministic 34 transactions
  const purchases: RhythmPurchase[] = useMemo(() => {
    return Array.from({ length: 34 }, (_, i) => {
      const isLate = pseudoRandom(i, 9) < 0.4;
      const hour = isLate
        ? 21 + Math.floor(pseudoRandom(i, 10) * 4)
        : 7 + Math.floor(pseudoRandom(i, 11) * 13);
      return {
        timeHour: (hour + pseudoRandom(i, 12)) % 24,
        amount: Math.round(80 + pseudoRandom(i, 13) * 1400),
        impulseScore: isLate
          ? 0.6 + pseudoRandom(i, 14) * 0.4
          : pseudoRandom(i, 14) * 0.5,
      };
    });
  }, []);

  const nightPurchases = useMemo(
    () => purchases.filter((p) => p.timeHour >= 21 || p.timeHour < 1),
    [purchases]
  );
  const dayPurchases = useMemo(
    () => purchases.filter((p) => !(p.timeHour >= 21 || p.timeHour < 1)),
    [purchases]
  );

  const avgNight = useMemo(() => {
    return Math.round(
      nightPurchases.reduce((acc, p) => acc + p.amount, 0) /
        Math.max(1, nightPurchases.length)
    );
  }, [nightPurchases]);

  const avgDay = useMemo(() => {
    return Math.round(
      dayPurchases.reduce((acc, p) => acc + p.amount, 0) /
        Math.max(1, dayPurchases.length)
    );
  }, [dayPurchases]);

  // Coordinate math
  const getAngle = (h: number) => (h / 24) * 2 * Math.PI - Math.PI / 2;
  const getPoint = (h: number, r: number) => [
    Number((Math.cos(getAngle(h)) * r).toFixed(1)),
    Number((Math.sin(getAngle(h)) * r).toFixed(1)),
  ];

  const getArc = (startH: number, endH: number, r: number) => {
    const p1 = getPoint(startH, r);
    const p2 = getPoint(endH, r);
    return `M${p1[0]} ${p1[1]}A${r} ${r} 0 0 1 ${p2[0]} ${p2[1]}`;
  };

  const updateHandFromPointer = useCallback((e: PointerEvent | React.PointerEvent) => {
    if (!clockSvgRef.current) return;
    const rect = clockSvgRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const angle = Math.atan2(e.clientY - cy, e.clientX - cx);
    const hour = (((angle + Math.PI / 2) / (2 * Math.PI)) * 24 + 24) % 24;
    setHandHour(hour);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    setIsDragging(true);
    updateHandFromPointer(e);
  };

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (isDragging) updateHandFromPointer(e);
    };
    const handlePointerUp = () => setIsDragging(false);

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [isDragging, updateHandFromPointer]);

  const handleKeyDown = (e: React.KeyboardEvent<SVGSVGElement>) => {
    if (e.key === "ArrowRight") {
      setHandHour((prev) => (prev + 0.5) % 24);
    } else if (e.key === "ArrowLeft") {
      setHandHour((prev) => (prev - 0.5 + 24) % 24);
    }
  };

  // Filter purchases in window (+/- 1.5h)
  const windowPurchases = useMemo(() => {
    return purchases.filter((p) => {
      const diff = Math.min(
        Math.abs(p.timeHour - handHour),
        24 - Math.abs(p.timeHour - handHour)
      );
      return diff <= 1.5;
    });
  }, [purchases, handHour]);

  const windowImpulseCount = useMemo(
    () => windowPurchases.filter((p) => p.impulseScore > 0.55).length,
    [windowPurchases]
  );

  const windowTotalSpend = useMemo(
    () => windowPurchases.reduce((acc, p) => acc + p.amount, 0),
    [windowPurchases]
  );

  const impulseLevel = useMemo(() => {
    if (windowImpulseCount >= 3) return { label: "HIGH", color: "var(--rd)" };
    if (windowImpulseCount >= 1) return { label: "MEDIUM", color: "var(--wn)" };
    return { label: "LOW", color: "var(--ok)" };
  }, [windowImpulseCount]);

  const formatHourString = (h: number) => {
    const hh = Math.floor(h);
    const mm = Math.floor((h % 1) * 60);
    const displayHour = hh % 12 || 12;
    const period = hh < 12 ? " AM" : " PM";
    return `${displayHour}:${String(mm).padStart(2, "0")}${period}`;
  };

  const handPoint = getPoint(handHour, 100);

  return (
    <section data-cam="f" className="sec" id="rhythm" data-mood="2">
      <div className="qi" data-f="found a time pattern">
        <i />
        <span>found a time pattern</span>
      </div>
      <div className="mo">
        <small>Your money</small>
        <b>has a rhythm.</b>
      </div>
      <p className="lede">
        Each dot is a purchase, placed at the hour you made it. Drag around the
        dial.
      </p>

      <svg
        ref={clockSvgRef}
        className="clock"
        id="clock"
        viewBox="-130 -130 260 260"
        tabIndex={0}
        role="slider"
        aria-label="Hour of day"
        aria-valuemin={0}
        aria-valuemax={24}
        aria-valuenow={Number(handHour.toFixed(1))}
        onPointerDown={handlePointerDown}
        onKeyDown={handleKeyDown}
      >
        <circle r="52" fill="none" stroke="rgba(255,255,255,.1)" />
        <circle r="100" fill="none" stroke="rgba(255,255,255,.1)" />
        <path
          d={getArc(21, 23.99, 100)}
          fill="none"
          stroke="#e0675a"
          strokeWidth="3"
          opacity=".55"
        />

        {/* 24 hour ticks */}
        {Array.from({ length: 24 }, (_, h) => {
          const p1 = getPoint(h, h % 6 ? 96 : 92);
          const p2 = getPoint(h, 100);
          return (
            <path
              key={h}
              d={`M${p1[0]} ${p1[1]}L${p2[0]} ${p2[1]}`}
              stroke={`rgba(255,255,255,${h % 6 ? 0.15 : 0.4})`}
            />
          );
        })}

        {/* Cardinal hour labels */}
        {[
          [0, "12 AM"],
          [6, "6 AM"],
          [12, "12 PM"],
          [18, "6 PM"],
        ].map(([h, label]) => {
          const pt = getPoint(Number(h), 111);
          return (
            <text key={h} x={pt[0]} y={pt[1] + 2} textAnchor="middle">
              {label}
            </text>
          );
        })}

        {/* Purchases dots */}
        {purchases.map((p, i) => {
          const pt = getPoint(p.timeHour, 62 + (p.amount / 1480) * 30);
          const color =
            p.impulseScore > 0.55
              ? "#e0675a"
              : p.impulseScore > 0.3
                ? "#e0a84f"
                : "#b9b8b2";
          return (
            <circle
              key={i}
              className="ev"
              style={{ animationDelay: `${-i * 0.37}s` }}
              cx={pt[0]}
              cy={pt[1]}
              r={(2 + (p.amount / 1480) * 2.5).toFixed(1)}
              fill={color}
              opacity=".85"
            />
          );
        })}

        {/* Clock hand */}
        <path
          d={`M0 0L${handPoint[0]} ${handPoint[1]}`}
          stroke="#ecebe6"
          strokeWidth="1.2"
        />
        <circle cx={handPoint[0]} cy={handPoint[1]} r="4" fill="#ecebe6" />
        <circle r="3" fill="#ecebe6" />
      </svg>

      <div className="tip" id="rdo" aria-live="polite">
        <b className="tm2">{formatHourString(handHour)}</b>
        <div className="rds">
          <span>{windowPurchases.length} purchases</span>
          <span>{formatINR(windowTotalSpend)}</span>
          <span>
            Impulse activity{" "}
            <b style={{ color: impulseLevel.color }}>{impulseLevel.label}</b>
          </span>
        </div>
        <div className="rdl">
          {[...windowPurchases]
            .sort((a, b) => a.timeHour - b.timeHour)
            .slice(0, 3)
            .map((item, idx) => (
              <span key={idx}>
                {formatINR(item.amount)} · {formatHourString(item.timeHour)}
              </span>
            ))}
        </div>
      </div>

      <div className="qn" id="qn">
        <small>Q NOTICED</small>
        <b>Your spending changes after 9 PM.</b>
        <p>
          {nightPurchases.length} purchases after 9 PM this month.
          <br />
          Average {formatINR(avgNight)} at night, {formatINR(avgDay)} by day.
        </p>
        <button
          className="cta o"
          id="qx"
          onClick={() => {
            setHandHour(22);
            clockSvgRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }}
        >
          Explore pattern
        </button>
      </div>

      <div className="mo" style={{ marginTop: "12vh" }}>
        <small>Most of your impulse spending</small>
        <b className="rv in" id="after">
          happens after 9 PM.
        </b>
        <small>Q finds it.</small>
      </div>
    </section>
  );
};
