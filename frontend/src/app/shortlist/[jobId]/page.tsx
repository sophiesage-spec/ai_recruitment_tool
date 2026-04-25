import { ShortlistClient } from "~/components/shortlist/ShortlistClient";

// 1. DELETE the mockJobs import line here

interface PageProps {
  params: {
    jobId: string;
  };
}

export default function ShortlistPage({ params }: PageProps) {
  const { jobId } = params;

  // 2. Ensure you aren't using mockJobs.find() here anymore
  return (
    <main className="min-h-screen bg-slate-50">
      <ShortlistClient jobId={jobId} />
    </main>
  );
}