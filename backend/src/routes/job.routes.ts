import { Router } from "express";
import { searchJob, deleteJob, getJobDetail } from "../controllers/job.controller.js";

const router = Router();

// GET /api/jobs/search?title=<query>
router.get("/", searchJob);
router.get("/search", searchJob);
router.get("/:id", getJobDetail);
router.delete("/:id", deleteJob);


export default router;
