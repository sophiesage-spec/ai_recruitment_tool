"use client";

import { useSelector } from "react-redux";
import { selectShortlist } from "~/store/slices/shortlistSlice";
import { getScoreColor } from "~/types";

export function SummaryBar() {
  const candidates = useSelector(selectShortlist);

  if (candidates.length === 0) return null;

  const avgScore = Math.round(
    candidates.reduce((sum, c) => sum + c.matchScore, 0) / candidates.length
  );

  const stats = {
    green: candidates.filter(c => getScoreColor(c.matchScore) === 'green').length,
    yellow: candidates.filter(c => getScoreColor(c.matchScore) === 'yellow').length,
    red: candidates.filter(c => getScoreColor(c.matchScore) === 'red').length,
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-white border rounded-2xl p-4 shadow-sm">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Screened</p>
        <p className="text-2xl font-black text-slate-900">{candidates.length}</p>
      </div>
      
      <div className="bg-white border rounded-2xl p-4 shadow-sm">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Avg. AI Score</p>
        <div className="flex items-end gap-2">
          <p className="text-2xl font-black text-slate-900">{avgScore}%</p>
          <div className="h-2 w-16 bg-slate-100 rounded-full mb-1.5 overflow-hidden">
            <div className="h-full bg-emerald-500" style={{ width: `${avgScore}%` }} />
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-2xl p-4 shadow-sm">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Strong Matches</p>
        <div className="flex items-center gap-2">
          <p className="text-2xl font-black text-emerald-600">{stats.green}</p>
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-600">70-100</span>
        </div>
      </div>

      <div className="bg-white border rounded-2xl p-4 shadow-sm">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Potential Matches</p>
        <div className="flex items-center gap-2">
          <p className="text-2xl font-black text-amber-500">{stats.yellow}</p>
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-50 text-amber-600">40-69</span>
        </div>
      </div>
    </div>
  );
}
