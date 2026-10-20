export type CategoryIndex = 0 | 1 | 2 | 3;

export interface Transaction {
  amount: string;
  merchant: string;
  time: string;
  categoryIndex: CategoryIndex;
}

export interface CategorySummary {
  name: string;
  total: string;
}

export interface ForceMetric {
  name: string;
  value: number;
  variantClass: "v0" | "v1" | "v2" | "v3";
  color: string;
}

export interface Persona {
  id: string;
  name: string;
  headline: string;
  tag: string;
  color: string;
  vertexCount: number;
  description: string;
  chaosFactor: number;
  harmonics: Record<number, number>;
}

export type SkylineDisciplineLevel = "Low" | "Medium" | "High";

export interface SkylineDay {
  index: number;
  row: number;
  col: number;
  spendRatio: number;
  impulseRatio: number;
  amount: number;
  dayName: string;
  dateString: string;
  isHighest: boolean;
  disciplineLevel: SkylineDisciplineLevel;
}

export interface RhythmPurchase {
  timeHour: number;
  amount: number;
  impulseScore: number;
}

export interface PhoneStage {
  stepIndex: number;
  title: string;
  subtitle: string;
  content: string;
}

export interface SubscriptionItem {
  id: string;
  name: string;
  amount: string;
  period: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export type BillingFrequency = "monthly" | "yearly";

export interface PricingPlan {
  frequency: BillingFrequency;
  price: string;
  periodLabel: string;
  note: string;
  features: string[];
  ctaUrl: string;
}

export type QualityLevel = 0 | 1 | 2; // 0: low, 1: medium, 2: high

export interface MoodConfig {
  actIndex: number;
  actRoman: string;
  actTitle: string;
  jitter: number;
  structure: number;
  lattice: number;
  rotationX: number;
  gridAlpha: number;
}
