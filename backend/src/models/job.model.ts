import mongoose, { Schema } from "mongoose";
import { IJobDocument } from "../types/index.js";

const jobSchema = new Schema<IJobDocument>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      index: true, // fast title-based search
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    department: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export const Job = mongoose.model<IJobDocument>("Job", jobSchema);
