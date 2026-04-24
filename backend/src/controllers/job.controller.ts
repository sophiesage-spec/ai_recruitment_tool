import { Request, Response } from "express";
import { searchJobByTitle, countApplicants } from "../services/job.service.js";

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

    if (!title || title.trim() === "") {
      res.status(400).json({
        success: false,
        message: "Query parameter 'title' is required.",
      });
      return;
    }

    const job = await searchJobByTitle(title.trim());

    if (!job) {
      res.status(404).json({
        success: false,
        message: `No job found matching title: "${title}"`,
      });
      return;
    }

    const applicantCount = await countApplicants(
      (job._id as { toString(): string }).toString()
    );

    res.status(200).json({
      success: true,
      job,
      applicantCount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: (error as Error).message,
    });
  }
};
