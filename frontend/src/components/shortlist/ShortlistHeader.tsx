"use client";

import { ArrowLeft, CaretRight } from "@phosphor-icons/react";
import Link from "next/link";
import { type Job } from "~/types";
import { Badge } from "~/components/ui/badge";

interface ShortlistHeaderProps {
  job: Job;
}

export function ShortlistHeader({ job }: ShortlistHeaderProps) {
  return (
    <div className="bg-white border-b sticky top-0 z-40">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link 
              href="/" 
              className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-200 hover:bg-slate-50 transition-colors text-slate-600"
              aria-label="Back to Dashboard"
            >
              <ArrowLeft size={20} weight="bold" />
            </Link>
            
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                <span>Recruiter Dashboard</span>
                <CaretRight size={10} weight="bold" />
                <span>AI Screening</span>
              </div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                {job.title}
                <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-100 font-bold uppercase tracking-wider text-[10px] px-2 py-0.5">
                  {job.department}
                </Badge>
              </h1>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="px-4 py-2 bg-slate-900 rounded-xl text-white text-sm font-bold flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Gemini 1.5 Pro Active
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
