import { Router } from "express";
import { searchJob } from "../controllers/job.controller.js";

const router = Router();

// GET /api/jobs/search?title=<query>
router.get("/search", searchJob);

export default router;
