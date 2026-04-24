// ─── Core Domain Types ─────────────────────────────────────────────────────

export interface Job {
  id: string;
  title: string;
  description: string;
  department: string;
  candidateCount: number;
}

export interface CandidateRaw {
  id: string;
  name: string;
  resumeText: string;
}

export interface Candidate {
  id: string;
  name: string;
  matchScore: number; // 0–100
  reasoning: string;
  strengths: string[];
  gaps: string[];
}

// ─── Score Utilities ────────────────────────────────────────────────────────

export type ScoreColor = "red" | "yellow" | "green";

export function getScoreColor(score: number): ScoreColor {
  if (score >= 70) return "green";
  if (score >= 40) return "yellow";
  return "red";
}

export function getScoreLabel(score: number): string {
  if (score >= 70) return "Strong Match";
  if (score >= 40) return "Partial Match";
  return "Low Match";
}

// ─── Redux State Types ──────────────────────────────────────────────────────

export type ScreeningStatus = "idle" | "loading" | "succeeded" | "failed";

export interface JobState {
  jobs: Job[];
  searchQuery: string;
  selectedJobId: string | null;
  isLoading: boolean;
}

export interface ShortlistState {
  candidates: Candidate[];
  status: ScreeningStatus;
  error: string | null;
  selectedCandidateId: string | null;
}