import mongoose, { Schema } from "mongoose";
import { IApplicantDocument } from "../types/index.js";

const applicantSchema = new Schema<IApplicantDocument>(
  {
    jobId: {
      type: Schema.Types.ObjectId,
      ref: "Job",
      required: true,
      index: true, // efficient per-job queries
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    skills: {
      type: [String],
      required: true,
      default: [],
    },
    experience: {
      type: Number,
      required: true,
      min: 0,
    },
    education: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export const Applicant = mongoose.model<IApplicantDocument>(
  "Applicant",
  applicantSchema
);
