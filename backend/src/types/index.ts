import { Document, Types } from "mongoose";

// ─── Job ──────────────────────────────────────────────────────────────────────

export interface IJob {
  title: string;
  description: string;
  department: string;
  createdAt?: Date;
}

export interface IJobDocument extends IJob, Document {}

// ─── Applicant ────────────────────────────────────────────────────────────────

export interface IApplicant {
  jobId: Types.ObjectId;
  name: string;
  skills: string[];
  experience: number; // years
  education: string;
  createdAt?: Date;
}

export interface IApplicantDocument extends IApplicant, Document {}

// ─── User ─────────────────────────────────────────────────────────────────────

export interface IUser {
  username: string;
  email: string;
  password: string;
  createdAt?: Date;
}

export interface IUserDocument extends IUser, Document {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// ─── AI Pipeline ──────────────────────────────────────────────────────────────

export interface IAIResult {
  id: string;
  name: string;
  matchScore: number; // 0–100
  reasoning: string;
  strengths: string[];
  gaps: string[];
}

// ─── API Response Shapes ──────────────────────────────────────────────────────

export interface IJobSearchResponse {
  job: IJob;
  applicantCount: number;
}

export interface IScreeningResponse {
  job: IJob;
  totalApplicants: number;
  top20: IAIResult[];
}
