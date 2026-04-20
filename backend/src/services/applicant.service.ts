import { Applicant } from "../models/applicant.model.js";
import { IApplicantDocument } from "../types/index.js";

/**
 * Retrieve all applicants for a given job ID.
 * Returns a lean array for AI processing efficiency.
 */
export const getApplicantsByJob = async (
  jobId: string
): Promise<IApplicantDocument[]> => {
  return Applicant.find({ jobId }).sort({ createdAt: -1 });
};
