"use client";

import { cn } from "~/lib/utils";
import { getScoreColor, getScoreLabel } from "~/types";

interface ScoreBadgeProps {
  score: number;
  className?: string;
  animate?: boolean;
}

export function ScoreBadge({ score, className, animate = true }: ScoreBadgeProps) {
  const color = getScoreColor(score);
  const label = getScoreLabel(score);

  const colorClasses = {
    green: "bg-emerald-100 text-emerald-700 border-emerald-200",
    yellow: "bg-amber-100 text-amber-700 border-amber-200",
    red: "bg-red-100 text-red-700 border-red-200",
  };

  return (
    <div
      aria-label={`Match score: ${score} percent. ${label}.`}
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border",
        colorClasses[color],
        animate && "animate-pulse-badge",
        className
      )}
    >
      <span className="tabular-nums font-bold">{score}%</span>
      <span className="hidden sm:inline opacity-80">•</span>
      <span className="hidden sm:inline uppercase tracking-wider text-[10px]">{label}</span>
    </div>
  );
}
