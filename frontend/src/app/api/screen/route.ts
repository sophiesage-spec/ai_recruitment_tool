import { NextResponse, type NextRequest } from "next/server";
import { screenCandidates } from "~/lib/gemini";
import { mockJobs, mockCandidates } from "~/mock/data";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { jobId?: string };
    const { jobId } = body;

    if (!jobId) {
      return NextResponse.json({ error: "jobId is required" }, { status: 400 });
    }

    const job = mockJobs.find((j) => j.id === jobId);
    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    const candidates = mockCandidates[jobId];
    if (!candidates || candidates.length === 0) {
      return NextResponse.json(
        { error: "No candidates found for this job" },
        { status: 404 }
      );
    }

    const shortlist = await screenCandidates(job, candidates);
    return NextResponse.json({ shortlist });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "An unexpected error occurred.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
