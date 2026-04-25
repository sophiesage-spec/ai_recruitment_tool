import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "~/env";
import { type Job, type Candidate, type CandidateRaw } from "~/types";

const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);

export async function screenCandidates(
  job: Job,
  candidates: CandidateRaw[]
): Promise<Candidate[]> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
    const prompt = buildScreeningPrompt(job, candidates);
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Strip markdown fences if present
    const json = text.replace(/```json\s*|```\s*/g, "").trim();
    const parsed = JSON.parse(json) as Candidate[];

    if (!Array.isArray(parsed)) {
      throw new Error("Gemini returned a non-array response.");
    }

    // Sort by score descending (in case model order isn't guaranteed)
    return parsed.sort((a, b) => b.matchScore - a.matchScore).slice(0, 20);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unknown error contacting Gemini.";
    throw new Error(
      `AI screening failed: ${message}. Please check your GEMINI_API_KEY and try again.`
    );
  }
}

function buildScreeningPrompt(job: Job, candidates: CandidateRaw[]): string {
  return `
You are an expert technical recruiter. Evaluate each candidate against the job description below and return a ranked shortlist.

JOB TITLE: ${job.title}
DEPARTMENT: ${job.department}
JOB DESCRIPTION:
${job.description}

CANDIDATES:
${candidates
  .map(
    (c) => `ID: ${c.id}
Name: ${c.name}
Resume:
${c.resumeText}`
  )
  .join("\n\n---\n\n")}

Return ONLY a valid JSON array with this exact shape (no markdown, no explanation, no preamble):
[
  {
    "id": "candidate_id",
    "name": "Candidate Name",
    "matchScore": 85,
    "reasoning": "A clear 2–3 sentence paragraph explaining the score, referencing specific skills from the job description.",
    "strengths": ["strength 1 referencing a job requirement", "strength 2"],
    "gaps": ["gap 1 referencing a missing job requirement", "gap 2"]
  }
]

Rules:
- matchScore: integer 0–100
- Order candidates by matchScore descending (highest first)
- Return all candidates, max 20
- Be specific in strengths and gaps — reference actual requirements from the job description
- Each reasoning must be a full paragraph (2–3 sentences), not a single phrase
  `.trim();
}