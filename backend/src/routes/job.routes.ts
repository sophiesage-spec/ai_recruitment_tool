import { Router } from "express";
import { searchJob, deleteJob } from "../controllers/job.controller.js";

const router = Router();

// GET /api/jobs/search?title=<query>
router.get("/", searchJob);
router.get("/search", searchJob);
router.delete("/:id", deleteJob);

export default router;
