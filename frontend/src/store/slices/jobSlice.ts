import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type Job, type JobState } from "~/types";
import { type RootState } from "../index";

const initialState: JobState = {
  jobs: [],
  searchQuery: "",
  selectedJobId: null,
  isLoading: true,
};

export const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setJobs: (state, action: PayloadAction<Job[]>) => {
      state.jobs = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedJob: (state, action: PayloadAction<string | null>) => {
      state.selectedJobId = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setJobs, setSearchQuery, setSelectedJob, setLoading } =
  jobSlice.actions;

// Selectors
export const selectAllJobs = (state: RootState) => state.jobs.jobs;
export const selectSearchQuery = (state: RootState) => state.jobs.searchQuery;
export const selectIsLoading = (state: RootState) => state.jobs.isLoading;
export const selectSelectedJobId = (state: RootState) =>
  state.jobs.selectedJobId;

export const selectFilteredJobs = (state: RootState) => {
  const query = state.jobs.searchQuery.toLowerCase().trim();
  if (!query) return state.jobs.jobs;
  return state.jobs.jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(query) ||
      job.department.toLowerCase().includes(query)
  );
};

export const selectSelectedJob = (state: RootState) =>
  state.jobs.jobs.find((j) => j.id === state.jobs.selectedJobId) ?? null;

export default jobSlice.reducer;
