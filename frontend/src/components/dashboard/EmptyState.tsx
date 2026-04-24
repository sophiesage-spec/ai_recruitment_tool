"use client";

import { Ghost, MagnifyingGlass } from "@phosphor-icons/react";
import { Button } from "~/components/ui/button";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "~/store/slices/jobSlice";

export function EmptyState() {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-24 h-24 mb-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-300">
        <Ghost size={48} weight="duotone" />
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">No jobs found</h3>
      <p className="text-slate-500 mb-8 max-w-sm">
        We couldn&apos;t find any jobs matching your search criteria. Try a different title or department.
      </p>
      <Button
        variant="outline"
        onClick={() => dispatch(setSearchQuery(""))}
        className="rounded-xl border-slate-200 hover:bg-slate-50 font-semibold gap-2"
      >
        Clear Search
      </Button>
    </div>
  );
}
