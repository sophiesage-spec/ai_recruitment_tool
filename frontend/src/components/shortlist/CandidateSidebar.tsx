"use client";

import { useDispatch, useSelector } from "react-redux";
import { 
  selectSelectedCandidate, 
  setSelectedCandidate 
} from "~/store/slices/shortlistSlice";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle 
} from "~/components/ui/sheet";
import { AvatarInitials } from "~/components/ui/AvatarInitials";
import { ScoreBadge } from "~/components/ui/ScoreBadge";
import { CheckCircle, XCircle, Info } from "@phosphor-icons/react";

export function CandidateSidebar() {
  const dispatch = useDispatch();
  const candidate = useSelector(selectSelectedCandidate);
  const isOpen = !!candidate;

  if (!candidate) return null;

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && dispatch(setSelectedCandidate(null))}>
      <SheetContent className="w-full sm:max-w-lg p-0 border-l border-slate-200 overflow-y-auto">
        {/* Header section with cover color */}
        <div className="h-32 bg-slate-900 relative">
          <div className="absolute -bottom-10 left-8 border-4 border-white rounded-full">
            <AvatarInitials name={candidate.name} size="lg" />
          </div>
        </div>

        <div className="px-8 pt-16 pb-8 space-y-10">
          <SheetHeader className="space-y-4">
            <div>
              <SheetTitle className="text-3xl font-black text-slate-900 leading-tight">
                {candidate.name}
              </SheetTitle>
              <div className="mt-2">
                <ScoreBadge score={candidate.matchScore} className="px-3 py-1 text-sm" />
              </div>
            </div>
          </SheetHeader>

          {/* Reasoning Section */}
          <section className="space-y-3">
            <h5 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-400">
              <Info size={18} weight="fill" />
              AI Reasoning
            </h5>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 italic text-slate-700 leading-relaxed">
              &quot;{candidate.reasoning}&quot;
            </div>
          </section>

          {/* Strengths Section */}
          <section className="space-y-3">
            <h5 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-emerald-600">
              <CheckCircle size={18} weight="fill" />
              Key Strengths
            </h5>
            <ul className="space-y-2">
              {candidate.strengths.map((strength, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-700 text-sm font-medium">
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                  {strength}
                </li>
              ))}
            </ul>
          </section>

          {/* Gaps Section */}
          <section className="space-y-3">
            <h5 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-rose-500">
              <XCircle size={18} weight="fill" />
              Identified Gaps
            </h5>
            <ul className="space-y-2">
              {candidate.gaps.map((gap, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-700 text-sm font-medium">
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-rose-400 shrink-0" />
                  {gap}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
}
