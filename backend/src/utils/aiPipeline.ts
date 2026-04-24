import { GoogleGenerativeAI } from "@google/generative-ai";
import { IApplicantDocument, IAIResult } from "../types/index.js";
import { MAX_SCREENED_CANDIDATES } from "../config/constants.js";

// ─── 1. Prepare Prompt ────────────────────────────────────────────────────────

/**
 * Builds a structured prompt for the Gemini model.
 * The AI receives pure JSON data — no DB access, no side effects.
 *
 * @param jobDescription  - The full text description of the job
 * @param applicants      - Array of applicant documents from the database
 * @param recruiterPrompt - Optional custom instructions written by the recruiter
 * @returns               - A formatted string prompt ready to send to Gemini
 */
export const preparePrompt = (
  jobDescription: string,
  applicants: IApplicantDocument[],
  recruiterPrompt?: string
): string => {
  const applicantPayload = applicants.map((a) => ({
    id: (a._id as { toString(): string }).toString(),
    name: a.name,
    skills: a.skills,
    experienceYears: a.experience,
    education: a.education,
  }));

  // Only include the recruiter section if they actually wrote something
  const recruiterSection = recruiterPrompt?.trim()
    ? `\n## Recruiter's Custom Instructions\n${recruiterPrompt.trim()}\nApply these instructions in addition to the job description above when scoring candidates.\n`
    : "";

  return `
You are an expert AI recruitment assistant. Your task is to evaluate and rank job applicants for a specific role.

## Job Description
${jobDescription}
${recruiterSection}
## Applicants
${JSON.stringify(applicantPayload, null, 2)}

## Task
Evaluate each applicant against the job description. Rank all applicants and return the top ${MAX_SCREENED_CANDIDATES} candidates.

## Output Requirements
- Return ONLY a valid JSON array — no markdown, no explanation, no code fences.
- Each item in the array must follow this exact schema:
{
  "id": "<applicant _id string>",
  "name": "<applicant name>",
  "matchScore": <integer 0-100>,
  "reasoning": "<specific 2-3 sentence explanation of why this candidate fits or doesn't fit>",
  "strengths": ["<strength 1>", "<strength 2>", ...],
  "gaps": ["<gap 1>", "<gap 2>", ...]
}

## Scoring Guidelines
- 90–100: Exceptional match — exceeds requirements in most areas
- 70–89:  Strong match — meets core requirements with minor gaps
- 50–69:  Moderate match — meets some requirements
- 30–49:  Weak match — significant skill or experience gaps
- 0–29:   Poor match — does not meet core requirements

Be specific. Reference actual skills and experience from the data.
Return exactly ${MAX_SCREENED_CANDIDATES} results, sorted by matchScore descending.
`.trim();
};

// ─── 2. Run AI ────────────────────────────────────────────────────────────────

/**
 * Sends the prompt to Gemini and returns the raw text response.
 * All AI communication is isolated here — no DB, no business logic.
 *
 * @param prompt - The prompt string built by preparePrompt()
 * @returns      - Raw text response from the Gemini model
 */
export const runAI = async (prompt: string): Promise<string> => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set in environment variables.");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent(prompt);
  const response = result.response;
  return response.text();
};

// ─── 3. Format Results ────────────────────────────────────────────────────────

/**
 * Parses and validates the AI's raw JSON response.
 * Strips markdown fences if present, validates scores, then returns top N.
 *
 * @param rawResponse - The raw text string from runAI()
 * @returns           - A typed, validated array of IAIResult
 */
export const formatResults = (rawResponse: string): IAIResult[] => {
  // Strip markdown code fences if Gemini wraps output in them
  const cleaned = rawResponse
    .replace(/```json\s*/gi, "")
    .replace(/```\s*/gi, "")
    .trim();

  let parsed: IAIResult[];
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    throw new Error(
      `AI returned invalid JSON. Raw response:\n${rawResponse.substring(0, 300)}`
    );
  }

  if (!Array.isArray(parsed)) {
    throw new Error("AI response was not a JSON array.");
  }

  // Validate and clamp scores, ensure required fields exist
  const validated: IAIResult[] = parsed
    .filter(
      (item) =>
        item.id &&
        item.name &&
        typeof item.matchScore === "number" &&
        item.reasoning &&
        Array.isArray(item.strengths) &&
        Array.isArray(item.gaps)
    )
    .map((item) => ({
      ...item,
      matchScore: Math.min(100, Math.max(0, Math.round(item.matchScore))),
    }));

  // Sort descending and slice to top N
  return validated
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, MAX_SCREENED_CANDIDATES);
};