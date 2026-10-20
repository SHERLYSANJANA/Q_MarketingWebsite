/**
 * Clamps value v between a and b.
 */
export function clamp(v: number, min = 0, max = 1): number {
  return Math.min(max, Math.max(min, v));
}

/**
 * Standard smoothstep polynomial: 3x^2 - 2x^3
 */
export function smoothstep(x: number): number {
  const c = clamp(x, 0, 1);
  return c * c * (3 - 2 * c);
}

/**
 * Linear interpolation between a and b by t.
 */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/**
 * Deterministic pseudo-random float [0, 1) based on two seeds.
 */
export function pseudoRandom(i: number, k: number): number {
  const s = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453;
  return s - Math.floor(s);
}

/**
 * Q Financial Wellness score algorithm.
 */
export function calculateWellnessScore(
  discipline: number,
  impulse: number,
  savings: number,
  volatility: number
): number {
  return Math.round(
    537.2 + discipline * 1.9 + savings * 1.5 - impulse * 0.9 - volatility * 0.8
  );
}

/**
 * Format Indian Rupee currency.
 */
export function formatINR(amount: number): string {
  return "₹" + amount.toLocaleString("en-IN");
}
