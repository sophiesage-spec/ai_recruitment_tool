"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// 1. Ensure these paths match your store exactly
import { 
  runScreening, 
  selectShortlist, 
  selectScreeningStatus, 
  selectScreeningError,
  clearShortlist,
} from "~/store/slices/shortlistSlice";
import { type Job } from "~/types";
import { type AppDispatch } from "~/store";

// 2. Component Imports
import { ShortlistHeader } from "./ShortlistHeader";
import { ProgressIndicator } from "./ProgressIndicator";
import { SummaryBar } from "./SummaryBar";
import { CandidateRow } from "./CandidateRow";
import {CandidateSidebar} from "./CandidateSidebar";
import { Warning, ArrowClockwise } from "@phosphor-icons/react";
import { Button } from "~/components/ui/button";

interface ShortlistClientProps {
  jobId: string;
}

export function ShortlistClient({ jobId }: ShortlistClientProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [job, setJob] = useState<Job | null>(null);
  
  // These are the variables that were "red-lined"
  const candidates = useSelector(selectShortlist);
  const status = useSelector(selectScreeningStatus);
  const error = useSelector(selectScreeningError);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/jobs/${jobId}`);
        const data = await res.json();
        setJob(data);
      } catch (err) {
        console.error("Failed to load job details", err);
      }
    };

    if (jobId) {
      fetchJobDetails();
      dispatch(runScreening(jobId));
    }

    return () => {
      dispatch(clearShortlist());
    };
  }, [dispatch, jobId]);

  if (!job) return <div className="p-20 text-center font-bold">Loading Job Details...</div>;

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <ShortlistHeader job={job} />
      
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {status === "loading" && (
          <div className="mt-12">
            <ProgressIndicator />
          </div>
        )}

        {status === "failed" && (
          <FailedState
            error={error}
            onRetry={() => dispatch(runScreening(jobId))}
          />
        )}

        {status === "succeeded" && (
          <div className="space-y-6">
            <SummaryBar />
            
            <div className="space-y-4">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">
                  AI Ranked Shortlist
                </h3>
                <span className="text-xs font-bold text-slate-400">
                  Showing top {candidates?.length || 0} candidates
                </span>
              </div>
              
              <div className="space-y-3">
                {candidates?.map((candidate: any, i: number) => (
                  <CandidateRow 
                    key={candidate.id || candidate._id} 
                    candidate={candidate} 
                    rank={i + 1} 
                    index={i}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <CandidateSidebar />
    </div>
  );
}

// 3. Re-adding the missing FailedState component
function FailedState({ error, onRetry }: { error: string | null; onRetry: () => void }) {
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const handleRetry = () => {
    setCooldown(30);
    onRetry();
  };

  return (
    <div className="mt-12 p-8 bg-white rounded-3xl border border-slate-200 shadow-sm text-center">
      <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600 mb-6">
        <Warning size={32} weight="bold" />
      </div>
      <h2 className="text-2xl font-black text-slate-900 mb-2">Screening Failed</h2>
      <p className="text-slate-600 mb-8 max-w-md mx-auto">{error}</p>
      
      <Button
        onClick={handleRetry}
        disabled={cooldown > 0}
        className="bg-slate-900 text-white rounded-xl gap-2 font-bold h-12 px-6 min-w-[160px] transition-all disabled:opacity-50 disabled:bg-slate-400"
      >
        {cooldown > 0 ? (
          <span>Retry in {cooldown}s</span>
        ) : (
          <>
            <ArrowClockwise size={20} weight="bold" />
            Try Again
          </>
        )}
      </Button>
    </div>
  );
}