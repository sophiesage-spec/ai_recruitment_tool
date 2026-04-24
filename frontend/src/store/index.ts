import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "./slices/jobSlice";
import shortlistReducer from "./slices/shortlistSlice";

export const store = configureStore({
  reducer: {
    jobs: jobReducer,
    shortlist: shortlistReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
