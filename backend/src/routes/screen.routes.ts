import { Router } from "express";
import { screenCandidates } from "../controllers/screen.controller.js";

const router = Router();

// POST /api/screen/:jobId
router.post("/:jobId", screenCandidates);

export default router;
