import { notFound } from "next/navigation";
import { mockJobs } from "~/mock/data";
import { ShortlistClient } from "~/components/shortlist/ShortlistClient";

interface PageProps {
  params: Promise<{ jobId: string }>;
}

export default async function ShortlistPage({ params }: PageProps) {
  const { jobId } = await params;
  const job = mockJobs.find((j) => j.id === jobId);

  if (!job) {
    notFound();
  }

  return <ShortlistClient job={job} />;
}

export async function generateStaticParams() {
  return mockJobs.map((job) => ({
    jobId: job.id,
  }));
}
