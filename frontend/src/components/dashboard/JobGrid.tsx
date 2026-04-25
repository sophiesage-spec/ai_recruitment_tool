"use client";

import { API_BASE_URL } from "src/config/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { mockJobs } from "~/mock/data";
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
    const fetchJobsFromBackend = async () => {
      dispatch(setLoading(true));
      try {
  const response = await fetch('${API_BASE_URL}/api/jobs/search?title=');
  
  if (!response.ok) {
    throw new Error('Backend did not respond correctly');
  }

  const data = await response.json();
  
  if (data.success && Array.isArray(data.jobs)) {
    // 1. THE SANITIZATION: Map over the jobs to ensure they have an 'id' property
    const sanitizedJobs = data.jobs.map((job: any) => ({
      ...job,
      id: job._id || job.id, // Ensures 'id' exists even if DB uses '_id'
    }));

    // 2. Dispatch the cleaned list to Redux
    dispatch(setJobs(sanitizedJobs)); 
  } else {
    dispatch(setJobs([]));
  }
} catch (error) {
  console.error("Failed to fetch jobs:", error);
  dispatch(setJobs([]));
} finally {
        dispatch(setLoading(false));
      }
    };

    fetchJobsFromBackend();
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
