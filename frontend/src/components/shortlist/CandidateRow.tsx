"use client";

import { useDispatch } from "react-redux";
import { type Candidate } from "~/types";
import { AvatarInitials } from "~/components/ui/AvatarInitials";
import { ScoreBadge } from "~/components/ui/ScoreBadge";
import { setSelectedCandidate } from "~/store/slices/shortlistSlice";
import { CaretRight } from "@phosphor-icons/react";

interface CandidateRowProps {
  candidate: Candidate;
  rank: number;
  index: number;
}

export function CandidateRow({ candidate, rank, index }: CandidateRowProps) {
  const dispatch = useDispatch();

  return (
    <div
      onClick={() => dispatch(setSelectedCandidate(candidate.id))}
      className="group flex items-center gap-4 bg-white border border-slate-200 p-4 rounded-2xl cursor-pointer transition-all hover:border-slate-400 hover:shadow-md hover:bg-slate-50 animate-fade-in-up"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="flex items-center justify-center w-8 text-sm font-black text-slate-400 group-hover:text-slate-900 transition-colors">
        #{rank}
      </div>

      <AvatarInitials name={candidate.name} size="md" />

      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-slate-900 truncate">{candidate.name}</h4>
        <p className="text-sm text-slate-500 truncate italic">
          &quot;{candidate.reasoning}&quot;
        </p>
      </div>

      <div className="flex items-center gap-4">
        <ScoreBadge score={candidate.matchScore} animate={index < 5} />
        <div className="text-slate-300 group-hover:text-slate-900 transition-colors hidden sm:block">
          <CaretRight size={20} weight="bold" />
        </div>
      </div>
    </div>
  );
}
