import { describe, it, expect } from "vitest";
import {
  TRANSACTIONS,
  CATEGORIES,
  FORCE_METRICS,
  PERSONAS,
  MOOD_ACTS,
  FAQ_LIST,
  ALPHA_FORM_URL,
} from "../../src/lib/constants";

describe("Domain Constants Integrity", () => {
  it("contains all 9 canonical hero transactions", () => {
    expect(TRANSACTIONS).toHaveLength(9);
    expect(TRANSACTIONS.map((t) => t.merchant)).toEqual([
      "Swiggy",
      "Amazon",
      "Zomato",
      "YouTube",
      "Uber",
      "Groceries",
      "Spotify",
      "Netflix",
      "Sneakers",
    ]);
  });

  it("contains 4 valid force categories", () => {
    expect(CATEGORIES).toHaveLength(4);
    expect(CATEGORIES.map((c) => c.name)).toEqual([
      "Food",
      "Subscriptions",
      "Shopping",
      "Late night",
    ]);
  });

  it("contains the 4 primary force metrics with initial values", () => {
    expect(FORCE_METRICS).toHaveLength(4);
    const metricMap = Object.fromEntries(
      FORCE_METRICS.map((m) => [m.name, m.value])
    );
    expect(metricMap).toEqual({
      Discipline: 86,
      Impulse: 72,
      Savings: 91,
      Volatility: 38,
    });
  });

  it("defines the 5 collectible personas with required properties", () => {
    expect(PERSONAS).toHaveLength(5);
    PERSONAS.forEach((p) => {
      expect(p.id).toBeTruthy();
      expect(p.name).toMatch(/^The /);
      expect(p.tag).toBeTruthy();
      expect(p.vertexCount).toBeGreaterThanOrEqual(3);
      expect(p.chaosFactor).toBeGreaterThanOrEqual(0);
      expect(p.chaosFactor).toBeLessThanOrEqual(1);
    });
  });

  it("defines 8 narrative acts in sequential order", () => {
    expect(MOOD_ACTS).toHaveLength(8);
    MOOD_ACTS.forEach((act, idx) => {
      expect(act.actIndex).toBe(idx);
      expect(act.actRoman).toBe(`0${idx + 1}`);
      expect(act.actTitle).toContain(`Act`);
    });
  });

  it("contains valid FAQ entries", () => {
    expect(FAQ_LIST).toHaveLength(5);
    FAQ_LIST.forEach((item) => {
      expect(item.question.length).toBeGreaterThan(5);
      expect(item.answer.length).toBeGreaterThan(10);
    });
  });

  it("targets the verified Alpha Google Form URL", () => {
    expect(ALPHA_FORM_URL).toContain("docs.google.com/forms");
  });
});
