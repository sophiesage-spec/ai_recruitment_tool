import cors from "cors";
import express, { Request, Response } from "express";
import userRouter from "./routes/user.routes.js";
import jobRouter from "./routes/job.routes.js";
import screenRouter from "./routes/screen.routes.js";

const app = express();

// --- UPDATED CORS CONFIGURATION ---
app.use(cors({
  origin: [
    "http://localhost:3000", 
    "https://ai-recruiter-frontend-wpuq.onrender.com" // Added your live frontend URL
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    service: "AI Talent Screener API",
    version: "2.0.0",
    status: "running",
    endpoints: {
      auth: "/api/v1/users",
      jobs: "/api/jobs",
      screen: "/api/screen",
    },
  });
});

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use("/api/v1/users", userRouter);    // Auth: register / login / logout
app.use("/api/jobs", jobRouter);         // Matches fetch(`${API_BASE_URL}/api/jobs`)
app.use("/api/screen", screenRouter);    // POST /api/screen/:jobId

// ─── 404 Handler ─────────────────────────────────────────────────────────────
app.use((_req: Request, res: Response) => {
  res.status(404).json({ success: false, message: "Route not found." });
});

export default app;