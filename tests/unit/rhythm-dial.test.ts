import { describe, it, expect } from "vitest";

describe("Rhythm Dial Arithmetic", () => {
  const getAngle = (h: number) => (h / 24) * 2 * Math.PI - Math.PI / 2;
  const getPoint = (h: number, r: number) => [
    Number((Math.cos(getAngle(h)) * r).toFixed(1)),
    Number((Math.sin(getAngle(h)) * r).toFixed(1)),
  ];

  it("calculates cardinal compass coordinates accurately", () => {
    // 0h (12 AM) points straight UP: (0, -r)
    const pt0 = getPoint(0, 100);
    expect(pt0[0]).toBeCloseTo(0, 0);
    expect(pt0[1]).toBe(-100);

    // 6h (6 AM) points straight RIGHT: (r, 0)
    const pt6 = getPoint(6, 100);
    expect(pt6[0]).toBe(100);
    expect(pt6[1]).toBeCloseTo(0, 0);

    // 12h (12 PM) points straight DOWN: (0, r)
    const pt12 = getPoint(12, 100);
    expect(pt12[0]).toBeCloseTo(0, 0);
    expect(pt12[1]).toBe(100);

    // 18h (6 PM) points straight LEFT: (-r, 0)
    const pt18 = getPoint(18, 100);
    expect(pt18[0]).toBe(-100);
    expect(pt18[1]).toBeCloseTo(0, 0);
  });

  it("handles circular wrap-around distance for time filtering", () => {
    const timeDiff = (t1: number, t2: number) => {
      const diff = Math.abs(t1 - t2);
      return Math.min(diff, 24 - diff);
    };

    // 23:30 (11:30 PM) and 00:30 (12:30 AM) are 1 hour apart across midnight
    expect(timeDiff(23.5, 0.5)).toBe(1);
    // 22:00 and 21:00 are 1 hour apart
    expect(timeDiff(22, 21)).toBe(1);
    // Opposite hours (12 hours apart)
    expect(timeDiff(6, 18)).toBe(12);
  });
});
