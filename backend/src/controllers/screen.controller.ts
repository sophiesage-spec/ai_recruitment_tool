import { Request, Response } from "express";
import { searchJobByTitle } from "../services/job.service.js";
import { getApplicantsByJob } from "../services/applicant.service.js";
import {
  preparePrompt,
  runAI,
  formatResults,
} from "../utils/aiPipeline.js";

/**
 * POST /api/screen/:jobId
 *
 * Orchestrates the full AI recruitment screening pipeline:
 *  1. Fetch the job by ID
 *  2. Fetch all applicants for that job
 *  3. Guard against empty applicant lists
 *  4. Build the AI prompt (no DB access in AI layer)
 *  5. Send to Gemini, receive ranked results
 *  6. Return top 20 candidates with scores and reasoning
 */
export const screenCandidates = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { jobId } = req.params;

    if (!jobId) {
      res.status(400).json({
        success: false,
        message: "Job ID is required.",
      });
      return;
    }

    // ── Step 1: Fetch job ──────────────────────────────────────────────────
    const { Job } = await import("../models/job.model.js");
    const job = await Job.findById(jobId);

    if (!job) {
      res.status(404).json({
        success: false,
        message: `No job found with ID: ${jobId}`,
      });
      return;
    }

    // ── Step 2: Fetch applicants ───────────────────────────────────────────
    const applicants = await getApplicantsByJob(jobId);

    if (applicants.length === 0) {
      res.status(200).json({
        success: true,
        message: "No applicants have applied for this job yet.",
        job,
        totalApplicants: 0,
        top20: [],
      });
      return;
    }

    // ── Step 3: Build prompt (pure function — no DB) ───────────────────────
    const prompt = preparePrompt(job.description, applicants);

    // ── Step 4: Call Gemini AI ─────────────────────────────────────────────
    console.log(
      `🤖 Sending ${applicants.length} applicants to AI for job: "${job.title}"...`
    );
    const rawResponse = await runAI(prompt);

    // ── Step 5: Parse and validate AI output ──────────────────────────────
    const top20 = formatResults(rawResponse);

    // ── Step 6: Return results ─────────────────────────────────────────────
    res.status(200).json({
      success: true,
      job,
      totalApplicants: applicants.length,
      top20,
    });
  } catch (error) {
    console.error("❌ Screening error:", error);
    res.status(500).json({
      success: false,
      message: "Screening failed. Please check your AI configuration.",
      error: (error as Error).message,
    });
  }
};
