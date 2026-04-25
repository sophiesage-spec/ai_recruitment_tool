"use client";

import { Users, Sparkle, Trash } from "@phosphor-icons/react";
import Link from "next/link";
import { type Job } from "~/types";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {

const handleDelete = async (e: React.MouseEvent) => {
    // This stops the click from accidentally triggering the Link/Button below
    e.preventDefault();
    e.stopPropagation();

    if (!window.confirm(`Are you sure you want to delete "${job.title}"?`)) return;

    try {
      const response = await fetch(`http://localhost:4000/api/jobs/${job.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        window.location.reload(); // Refresh to update the grid
      } else {
        alert("Could not delete job.");
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="group relative flex flex-col bg-white rounded-3xl border border-slate-200 p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:border-slate-300">
      <div className="flex justify-between items-start mb-4">
        <Badge variant="secondary" className="bg-slate-100 text-slate-600 border-none font-semibold">
          {job.department}
        </Badge>
        <div className="flex items-center gap-1.5 text-slate-500 text-sm font-medium bg-slate-50 px-2 py-1 rounded-lg">
          <Users size={16} weight="bold" />
          {job.applicantCount || job.candidateCount || 0}
        </div>
        <button 
      onClick={handleDelete}
      className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
      title="Delete Job"
    >
      <Trash size={18} weight="bold" />
    </button>
      </div>

      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
        {job.title}
      </h3>
      
      <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2">
        {job.description}
      </p>

      <div className="mt-auto">
        <Link href={`/shortlist/${job.id}`} passHref>
          <Button 
            className="w-full h-11 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold gap-2 active:scale-95 transition-all"
            aria-label={`Run AI Screening for ${job.title}`}
          >
            <Sparkle size={18} weight="fill" />
            Run AI Screening
          </Button>
        </Link>
      </div>
    </div>
  );
}
