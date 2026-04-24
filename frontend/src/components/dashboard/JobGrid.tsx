"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mockJobs } from "~/mock/data";
import { 
  selectFilteredJobs, 
  selectIsLoading, 
  setJobs, 
  setLoading 
} from "~/store/slices/jobSlice";
import { JobCard } from "./JobCard";
import { CardSkeleton } from "./CardSkeleton";
import { EmptyState } from "./EmptyState";

export function JobGrid() {
  const dispatch = useDispatch();
  const filteredJobs = useSelector(selectFilteredJobs);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    // Simulate initial fetch delay
    dispatch(setLoading(true));
    dispatch(setJobs(mockJobs));
    
    const timer = setTimeout(() => {
      dispatch(setLoading(false));
    }, 1200);

    return () => clearTimeout(timer);
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(4)].map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (filteredJobs.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-stagger-fade-in">
      {filteredJobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}
