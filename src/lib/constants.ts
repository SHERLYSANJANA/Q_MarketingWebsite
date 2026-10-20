import {
  CategorySummary,
  FAQItem,
  ForceMetric,
  MoodConfig,
  Persona,
  Transaction,
} from "./types";

export const ALPHA_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScmCpTVTtPm-iPd6ydDfGvCnTN23XXn-IyL7ZkaWOMUwWw7Og/viewform?usp=header";

export const TRANSACTIONS: Transaction[] = [
  { amount: "₹384", merchant: "Swiggy", time: "8:52 PM", categoryIndex: 0 },
  { amount: "₹1,192", merchant: "Amazon", time: "Sat 4:10 PM", categoryIndex: 2 },
  { amount: "₹499", merchant: "Zomato", time: "11:10 PM", categoryIndex: 3 },
  { amount: "₹189", merchant: "YouTube", time: "Monthly", categoryIndex: 1 },
  { amount: "₹220", merchant: "Uber", time: "11:40 PM", categoryIndex: 3 },
  { amount: "₹749", merchant: "Groceries", time: "Tue 7:15 PM", categoryIndex: 0 },
  { amount: "₹119", merchant: "Spotify", time: "Monthly", categoryIndex: 1 },
  { amount: "₹649", merchant: "Netflix", time: "Monthly", categoryIndex: 1 },
  { amount: "₹2,499", merchant: "Sneakers", time: "Sun 1:20 PM", categoryIndex: 2 },
];

export const CATEGORIES: CategorySummary[] = [
  { name: "Food", total: "₹1,133" },
  { name: "Subscriptions", total: "₹957" },
  { name: "Shopping", total: "₹3,691" },
  { name: "Late night", total: "₹719" },
];

export const FORCE_METRICS: ForceMetric[] = [
  { name: "Discipline", value: 86, variantClass: "v0", color: "#ecebe6" },
  { name: "Impulse", value: 72, variantClass: "v1", color: "#e0675a" },
  { name: "Savings", value: 91, variantClass: "v2", color: "#7fc79a" },
  { name: "Volatility", value: 38, variantClass: "v3", color: "#e0a84f" },
];

export const HARMONIC_KEYS = [2, 3, 4, 5, 6, 7, 8, 11, 12] as const;

export const PERSONAS: Persona[] = [
  {
    id: "stealth-saver",
    name: "The Stealth Saver",
    headline: "Quietly consistent. You spend intentionally and rarely chase impulse.",
    tag: "Impulse low",
    color: "var(--ok)",
    vertexCount: 5,
    description: "calm and symmetrical",
    chaosFactor: 0.1,
    harmonics: { 6: 0.08, 12: 0.05, 3: 0.03 },
  },
  {
    id: "midnight-impulser",
    name: "The Midnight Impulser",
    headline: "Your wallet wakes up after 10 PM.",
    tag: "Impulse high",
    color: "var(--rd)",
    vertexCount: 3,
    description: "irregular, pulled to the late hours",
    chaosFactor: 0.9,
    harmonics: { 5: 0.1, 7: 0.12, 11: 0.14, 2: 0.1 },
  },
  {
    id: "weekend-warrior",
    name: "The Weekend Warrior",
    headline: "Calm all week. All in by Saturday.",
    tag: "Volatile",
    color: "var(--wn)",
    vertexCount: 6,
    description: "spiky, with weekly peaks",
    chaosFactor: 0.6,
    harmonics: { 7: 0.16, 2: 0.08 },
  },
  {
    id: "strategic-spender",
    name: "The Strategic Spender",
    headline: "Every rupee has a reason.",
    tag: "Disciplined",
    color: "var(--ai)",
    vertexCount: 4,
    description: "organized and deliberate",
    chaosFactor: 0.0,
    harmonics: { 4: 0.1, 8: 0.06 },
  },
  {
    id: "silent-saver",
    name: "The Silent Saver",
    headline: "Low noise, steady growth.",
    tag: "Savings high",
    color: "var(--sil)",
    vertexCount: 7,
    description: "soft and steady",
    chaosFactor: 0.15,
    harmonics: { 3: 0.06, 8: 0.04 },
  },
];

export const MOOD_ACTS: MoodConfig[] = [
  {
    actIndex: 0,
    actRoman: "01",
    actTitle: "Act I · Chaos",
    jitter: 1,
    structure: 0,
    lattice: 0,
    rotationX: 74,
    gridAlpha: 0.05,
  },
  {
    actIndex: 1,
    actRoman: "02",
    actTitle: "Act II · Pattern",
    jitter: 0.6,
    structure: 0.6,
    lattice: 0,
    rotationX: 70,
    gridAlpha: 0.06,
  },
  {
    actIndex: 2,
    actRoman: "03",
    actTitle: "Act III · Behavior",
    jitter: 0.4,
    structure: 1,
    lattice: 0,
    rotationX: 66,
    gridAlpha: 0.07,
  },
  {
    actIndex: 3,
    actRoman: "04",
    actTitle: "Act IV · Intervention",
    jitter: 0.3,
    structure: 0.7,
    lattice: 0.5,
    rotationX: 60,
    gridAlpha: 0.06,
  },
  {
    actIndex: 4,
    actRoman: "05",
    actTitle: "Act V · Intelligence",
    jitter: 0.2,
    structure: 0.5,
    lattice: 1,
    rotationX: 50,
    gridAlpha: 0.07,
  },
  {
    actIndex: 5,
    actRoman: "06",
    actTitle: "Act VI · Trust",
    jitter: 0.1,
    structure: 0.6,
    lattice: 0.3,
    rotationX: 80,
    gridAlpha: 0.04,
  },
  {
    actIndex: 6,
    actRoman: "07",
    actTitle: "Act VII · Product",
    jitter: 0.1,
    structure: 0.9,
    lattice: 0.3,
    rotationX: 66,
    gridAlpha: 0.05,
  },
  {
    actIndex: 7,
    actRoman: "08",
    actTitle: "Act VIII · Action",
    jitter: 0,
    structure: 1,
    lattice: 0.6,
    rotationX: 62,
    gridAlpha: 0.06,
  },
];

export const FAQ_LIST: FAQItem[] = [
  {
    question: "Why does Q need my SMS?",
    answer:
      "Q reads bank transaction alerts so you never log an expense by hand. Access is required; there's no manual-entry fallback.",
  },
  {
    question: "Is my data actually private?",
    answer:
      "Only verified bank sender IDs are read. Personal texts and OTPs are never touched, and the AI Coach analyzes on your phone.",
  },
  {
    question: "Why Android only?",
    answer:
      "Automatic SMS reading relies on an Android permission iOS doesn't expose. iOS would need a bank-integration approach that isn't built yet.",
  },
  {
    question: "What happens after the free trial?",
    answer:
      "You're billed ₹99/month or ₹999/year from day 8, cancellable any time in your phone's subscription settings.",
  },
  {
    question: "When can I download it?",
    answer:
      "Q is in active development. Join the alpha and your feedback shapes what gets built next.",
  },
];

export const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
