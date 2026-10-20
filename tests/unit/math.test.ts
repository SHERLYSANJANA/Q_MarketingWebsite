import { describe, it, expect } from "vitest";
import {
  clamp,
  smoothstep,
  lerp,
  pseudoRandom,
  calculateWellnessScore,
  formatINR,
} from "../../src/lib/math";

describe("Math Utilities", () => {
  it("clamps values correctly", () => {
    expect(clamp(0.5, 0, 1)).toBe(0.5);
    expect(clamp(-0.5, 0, 1)).toBe(0);
    expect(clamp(1.5, 0, 1)).toBe(1);
    expect(clamp(50, 10, 100)).toBe(50);
  });

  it("calculates smoothstep easing curve", () => {
    expect(smoothstep(0)).toBe(0);
    expect(smoothstep(1)).toBe(1);
    expect(smoothstep(0.5)).toBe(0.5);
    expect(smoothstep(-1)).toBe(0);
    expect(smoothstep(2)).toBe(1);
  });

  it("interpolates linearly", () => {
    expect(lerp(10, 20, 0)).toBe(10);
    expect(lerp(10, 20, 1)).toBe(20);
    expect(lerp(10, 20, 0.5)).toBe(15);
  });

  it("generates deterministic pseudo-random values between 0 and 1", () => {
    const val1 = pseudoRandom(1, 2);
    const val2 = pseudoRandom(1, 2);
    const val3 = pseudoRandom(2, 3);
    expect(val1).toBe(val2);
    expect(val1).toBeGreaterThanOrEqual(0);
    expect(val1).toBeLessThan(1);
    expect(val1).not.toBe(val3);
  });

  it("calculates baseline Q Wellness Score accurately", () => {
    // Baseline: Discipline 86, Impulse 72, Savings 91, Volatility 38 => Score 742
    const score = calculateWellnessScore(86, 72, 91, 38);
    expect(score).toBe(742);
  });

  it("formats Indian Rupee currency correctly", () => {
    expect(formatINR(1192)).toBe("₹1,192");
    expect(formatINR(18420)).toBe("₹18,420");
    expect(formatINR(2499)).toBe("₹2,499");
  });
});
