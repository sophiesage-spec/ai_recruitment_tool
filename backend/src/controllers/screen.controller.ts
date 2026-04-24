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
 * Body: { recruiterPrompt?: string }
 *
 * Orchestrates the full AI recruitment screening pipeline:
 *  1. Validate request — jobId from params, optional recruiterPrompt from body
 *  2. Fetch the job by ID
 *  3. Fetch all applicants for that job
 *  4. Guard against empty applicant lists
 *  5. Build the AI prompt (job description + applicants + recruiter instructions)
 *  6. Send to Gemini, receive ranked results
 *  7. Return top 20 candidates with scores and reasoning
 */
export const screenCandidates = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const jobId = req.params.jobId as string;

    // ── Step 1: Validate inputs ────────────────────────────────────────────
    if (!jobId) {
      res.status(400).json({
        success: false,
        message: "Job ID is required.",
      });
      return;
    }

    // recruiterPrompt is optional — if not provided, the job description alone is used
    const recruiterPrompt: string | undefined = req.body?.recruiterPrompt?.trim() || undefined;

    if (recruiterPrompt !== undefined && recruiterPrompt.length > 2000) {
      res.status(400).json({
        success: false,
        message: "recruiterPrompt must be 2000 characters or fewer.",
      });
      return;
    }

    // ── Step 2: Fetch job ──────────────────────────────────────────────────
    const { Job } = await import("../models/job.model.js");
    const job = await Job.findById(jobId);

    if (!job) {
      res.status(404).json({
        success: false,
        message: `No job found with ID: ${jobId}`,
      });
      return;
    }

    // ── Step 3: Fetch applicants ───────────────────────────────────────────
    const applicants = await getApplicantsByJob(jobId!);

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

    // ── Step 4: Build prompt (pure function — no DB) ───────────────────────
    // Passes the recruiter's custom instructions so Gemini applies them
    const prompt = preparePrompt(job.description, applicants, recruiterPrompt);

    // ── Step 5: Call Gemini AI ─────────────────────────────────────────────
    console.log(
      `🤖 Sending ${applicants.length} applicants to AI for job: "${job.title}"...`
    );
    if (recruiterPrompt) {
      console.log(`📝 Recruiter instructions included (${recruiterPrompt.length} chars)`);
    }
    const rawResponse = await runAI(prompt);

    // ── Step 6: Parse and validate AI output ──────────────────────────────
    const top20 = formatResults(rawResponse);

    // ── Step 7: Return results ─────────────────────────────────────────────
    res.status(200).json({
      success: true,
      job,
      totalApplicants: applicants.length,
      recruiterPromptUsed: recruiterPrompt ?? null,
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