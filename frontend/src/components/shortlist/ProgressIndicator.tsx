"use client";

import { useEffect, useState } from "react";
import { Check, SpinnerGap } from "@phosphor-icons/react";
import { cn } from "~/lib/utils";

const STEPS = [
  "Sending to AI...",
  "Evaluating candidates...",
  "Building shortlist..."
];

export function ProgressIndicator() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev < STEPS.length - 1 ? prev + 1 : prev));
    }, 1500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-300">
      <div className="relative w-64 h-2 bg-slate-200 rounded-full mb-12 overflow-hidden shadow-inner">
        <div 
          className="absolute inset-y-0 left-0 bg-emerald-500 transition-all duration-1000 ease-in-out shadow-[0_0_10px_rgba(16,185,129,0.5)]"
          style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
        />
      </div>

      <div className="space-y-6 w-full max-w-xs">
        {STEPS.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;

          return (
            <div 
              key={step}
              className={cn(
                "flex items-center gap-4 transition-all duration-500",
                isCompleted || isActive ? "opacity-100" : "opacity-30"
              )}
            >
              <div className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all duration-500",
                isCompleted ? "bg-emerald-500 border-emerald-500 text-white" : 
                isActive ? "border-emerald-500 text-emerald-500 animate-pulse" : "border-slate-300"
              )}>
                {isCompleted ? (
                  <Check size={16} weight="bold" />
                ) : isActive ? (
                  <SpinnerGap size={18} weight="bold" className="animate-spin" />
                ) : (
                  <div className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                )}
              </div>
              <span className={cn(
                "font-bold text-sm tracking-tight",
                isActive ? "text-emerald-700" : isCompleted ? "text-slate-600" : "text-slate-400"
              )}>
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
