/* "use client";

import { MagnifyingGlass } from "@phosphor-icons/react";
import { useDispatch, useSelector } from "react-redux";
import { selectSearchQuery, setSearchQuery } from "~/store/slices/jobSlice";

export function SearchBar() {
  const dispatch = useDispatch();
  const query = useSelector(selectSearchQuery);

  return (
    <div className="relative group w-full max-w-2xl mx-auto">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-slate-900 transition-colors">
        <MagnifyingGlass size={20} weight="bold" />
      </div>
      <input
        type="text"
        placeholder="Search job title or department..."
        value={query}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        className="w-full h-14 pl-12 pr-4 rounded-2xl border border-slate-200 bg-white shadow-sm outline-none ring-slate-900/5 transition-all focus:border-slate-900 focus:ring-4 focus:shadow-md text-lg"
        aria-label="Search job titles"
      />
    </div>
  );
}
*/