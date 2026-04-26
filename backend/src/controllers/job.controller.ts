import { Request, Response } from "express";
import { searchJobByTitle, countApplicants, getAllJobs, deleteJobById, getJobById} from "../services/job.service.js";

/**
 * GET /api/jobs/search?title=<query>
 * Search for a job by title and return it along with the applicant count.
 */
export const searchJob = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
  const { title } = req.query as { title?: string };
  let rawJobs;

  if (!title || title.trim() === "") {
    rawJobs = await getAllJobs();
  } else {
    const result = await searchJobByTitle(title.trim());
    rawJobs = result ? [result] : [];
  }

  // --- NEW LOGIC STARTS HERE ---
  // We loop through each job and "attach" the applicant count
  const jobsWithCounts = await Promise.all(
    rawJobs.map(async (job: any) => {
      // Use the service function that already exists in your project
      const count = await countApplicants(job._id.toString());
      
      return {
        ...job.toObject(), // This cleans the data for the frontend
        applicantCount: count,
      };
    })
  );
  // --- NEW LOGIC ENDS HERE ---

  res.status(200).json({
    success: true,
    jobs: jobsWithCounts, // Now sending jobs + their counts!
  });
} catch (error) {
  res.status(500).json({ success: false, message: "Error fetching enhanced jobs" });
}
};
//logic to get job details for screening
export const getJobDetail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const job = await getJobById(id);

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    // Following your "Enhanced Jobs" pattern
    const count = await countApplicants(job._id.toString());
    
    res.status(200).json({
      success: true,
      job: {
        ...job.toObject(),
        applicantCount: count,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching job details" });
  }
};

export const deleteJob = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const deletedJob = await deleteJobById(id as string);

    if (!deletedJob) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    res.status(200).json({ success: true, message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};