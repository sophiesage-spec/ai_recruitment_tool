import { Job } from "../models/job.model.js";
import { Applicant } from "../models/applicant.model.js";
import { IJobDocument } from "../types/index.js";

/**
 * Search for a job by a case-insensitive partial title match.
 * Returns the first matching job or null if none found.
 */
export const searchJobByTitle = async (
  title: string
): Promise<IJobDocument | null> => {
  return Job.findOne({
    title: { $regex: title, $options: "i" },
  });
};

/**
 * Count how many applicants have applied to a specific job.
 */
export const countApplicants = async (jobId: string): Promise<number> => {
  return Applicant.countDocuments({ jobId });
};
