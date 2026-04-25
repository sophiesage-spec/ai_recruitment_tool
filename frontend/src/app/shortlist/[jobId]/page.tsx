import { ShortlistClient } from "~/components/shortlist/ShortlistClient";

interface PageProps {
  // Change params to a Promise
  params: Promise<{
    jobId: string;
  }>;
}

// 1. Add 'async' to the function
export default async function ShortlistPage({ params }: PageProps) {
  // 2. Add 'await' to the params
  const { jobId } = await params;

  return (
    <main className="min-h-screen bg-slate-50">
      <ShortlistClient jobId={jobId} />
    </main>
  );
}