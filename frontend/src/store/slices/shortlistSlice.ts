import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { type Candidate, type ShortlistState, type ScreeningStatus } from "~/types";
import { type RootState } from "../index";

const initialState: ShortlistState = {
  candidates: [],
  status: "idle",
  error: null,
  selectedCandidateId: null,
};

export const runScreening = createAsyncThunk(
  "shortlist/runScreening",
  async (jobId: string, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/screen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId }),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.error || "Failed to screen candidates");
      }

      return data.shortlist as Candidate[];
    } catch (err) {
      return rejectWithValue("An error occurred while connecting to the server.");
    }
  }
);

export const shortlistSlice = createSlice({
  name: "shortlist",
  initialState,
  reducers: {
    setSelectedCandidate: (state, action: PayloadAction<string | null>) => {
      state.selectedCandidateId = action.payload;
    },
    clearShortlist: (state) => {
      state.candidates = [];
      state.status = "idle";
      state.error = null;
      state.selectedCandidateId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(runScreening.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(runScreening.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.candidates = action.payload;
      })
      .addCase(runScreening.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedCandidate, clearShortlist } = shortlistSlice.actions;

// Selectors
export const selectShortlist = (state: RootState) => state.shortlist.candidates;
export const selectScreeningStatus = (state: RootState) => state.shortlist.status;
export const selectScreeningError = (state: RootState) => state.shortlist.error;
export const selectSelectedCandidateId = (state: RootState) => state.shortlist.selectedCandidateId;

export const selectSelectedCandidate = (state: RootState) =>
  state.shortlist.candidates.find((c) => c.id === state.shortlist.selectedCandidateId) ?? null;

export default shortlistSlice.reducer;
