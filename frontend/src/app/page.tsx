import { Navbar } from "~/components/dashboard/Navbar";
import { SearchBar } from "~/components/dashboard/SearchBar";
import { JobGrid } from "~/components/dashboard/JobGrid";

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              Talent <span className="text-emerald-600 underline decoration-emerald-200 underline-offset-8">Screener</span>
            </h1>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              Effortlessly rank and screen candidates for any role using the power of Gemini AI.
            </p>
          </div>

          {/* Search Section */}
          <SearchBar />

          {/* Grid Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                Active Jobs
                <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              </h2>
            </div>
            <JobGrid />
          </div>
        </div>
      </main>

      <footer className="py-12 border-t mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-slate-400 font-medium">
            &copy; {new Date().getFullYear()} Umurava AI. Built for the Hackathon.
          </p>
        </div>
      </footer>
    </div>
  );
}
