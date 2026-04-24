import { Request, Response } from "express";
import { parseCVWithAI } from "../utils/cvParser.js";
import { Applicant } from "../models/applicant.model.js";

/**
 * POST /api/cv/upload/:jobId
 * Content-Type: multipart/form-data
 * Body: { cv: <PDF file> }
 *
 * CV Upload Pipeline:
 *  1. Validate jobId and uploaded file
 *  2. Extract raw text from the PDF buffer
 *  3. Send text to Gemini to parse into structured applicant data
 *  4. Save the applicant to the database
 *  5. Return the saved applicant
 */
export const uploadCV = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const jobId = req.params.jobId as string;

        // ── Step 1: Validate ───────────────────────────────────────────────────
        if (!jobId) {
            res.status(400).json({ success: false, message: "Job ID is required." });
            return;
        }

        if (!req.file) {
            res.status(400).json({ success: false, message: "No CV file uploaded. Send a PDF as 'cv'." });
            return;
        }

        if (req.file.mimetype !== "application/pdf") {
            res.status(400).json({ success: false, message: "Only PDF files are accepted." });
            return;
        }

        // ── Step 2: Verify job exists ──────────────────────────────────────────
        const { Job } = await import("../models/job.model.js");
        const job = await Job.findById(jobId);

        if (!job) {
            res.status(404).json({ success: false, message: `No job found with ID: ${jobId}` });
            return;
        }

        // ── Step 3: Parse CV with Gemini ───────────────────────────────────────
        console.log(`📄 Parsing CV for job: "${job.title}"...`);
        const parsed = await parseCVWithAI(req.file.buffer);

        // ── Step 4: Save applicant to DB ───────────────────────────────────────
        const applicant = await Applicant.create({
            jobId,
            name: parsed.name,
            skills: parsed.skills,
            experience: parsed.experienceYears,
            education: parsed.education,
        });

        console.log(`✅ Applicant "${applicant.name}" saved for job: "${job.title}"`);

        // ── Step 5: Return result ──────────────────────────────────────────────
        res.status(201).json({
            success: true,
            message: `CV uploaded and parsed successfully for job: "${job.title}"`,
            applicant,
        });
    } catch (error) {
        console.error("❌ CV upload error:", error);
        res.status(500).json({
            success: false,
            message: "CV upload failed.",
            error: (error as Error).message,
        });
    }
};