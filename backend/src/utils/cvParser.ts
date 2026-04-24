import { GoogleGenerativeAI } from "@google/generative-ai";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface IParsedCV {
    name: string;
    skills: string[];
    experienceYears: number;
    education: string;
}

// ─── 1. Extract text from PDF ─────────────────────────────────────────────────

/**
 * Converts a PDF buffer to a base64 string so Gemini can read it directly.
 * Gemini Vision supports PDF as an inline document — no external parser needed.
 *
 * @param pdfBuffer - The raw PDF file buffer from multer
 * @returns         - Base64 encoded string of the PDF
 */
const bufferToBase64 = (pdfBuffer: Buffer): string => {
    return pdfBuffer.toString("base64");
};

// ─── 2. Parse CV with Gemini ──────────────────────────────────────────────────

/**
 * Sends the PDF to Gemini and asks it to extract structured applicant data.
 * Returns a typed IParsedCV object ready to save to the database.
 *
 * @param pdfBuffer - The raw PDF file buffer from multer
 * @returns         - Structured applicant data extracted from the CV
 */
export const parseCVWithAI = async (pdfBuffer: Buffer): Promise<IParsedCV> => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        throw new Error("GEMINI_API_KEY is not set in environment variables.");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const base64PDF = bufferToBase64(pdfBuffer);

    const prompt = `
You are an expert CV/resume parser. Extract the following information from this CV and return it as a JSON object.

## Output Requirements
- Return ONLY a valid JSON object — no markdown, no explanation, no code fences.
- The object must follow this exact schema:
{
  "name": "<full name of the applicant>",
  "skills": ["<skill 1>", "<skill 2>", ...],
  "experienceYears": <total years of professional experience as an integer>,
  "education": "<highest qualification, e.g. BSc Computer Science, University of Rwanda>"
}

## Rules
- skills: list every technical skill, tool, language, or framework mentioned. Be thorough.
- experienceYears: calculate from work history. If unclear, make a best estimate based on graduation year.
- education: include the degree name and institution. If multiple, pick the highest.
- If any field is truly missing from the CV, use: "" for strings, 0 for numbers, [] for arrays.
- Never return null. Always return valid values.
`.trim();

    const result = await model.generateContent([
        {
            inlineData: {
                mimeType: "application/pdf",
                data: base64PDF,
            },
        },
        { text: prompt },
    ]);

    const rawResponse = result.response.text();

    // Strip markdown fences if Gemini wraps the output
    const cleaned = rawResponse
        .replace(/```json\s*/gi, "")
        .replace(/```\s*/gi, "")
        .trim();

    let parsed: IParsedCV;
    try {
        parsed = JSON.parse(cleaned);
    } catch {
        throw new Error(
            `Gemini returned invalid JSON when parsing CV. Raw response:\n${rawResponse.substring(0, 300)}`
        );
    }

    // Validate required fields
    if (!parsed.name || !Array.isArray(parsed.skills)) {
        throw new Error("Gemini could not extract required fields (name, skills) from the CV.");
    }

    // Sanitize
    return {
        name: parsed.name.trim(),
        skills: parsed.skills.map((s: string) => s.trim()).filter(Boolean),
        experienceYears: Math.max(0, Math.round(parsed.experienceYears ?? 0)),
        education: (parsed.education ?? "").trim(),
    };
};