import { Router } from "express";
import multer from "multer";
import { uploadCV } from "../controllers/cv.controller.js";

// ─── Multer config ────────────────────────────────────────────────────────────
// Store file in memory (as a Buffer) so we can pass it directly to Gemini.
// No disk writes needed — cleaner and faster.

const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB max
    },
    fileFilter: (_req, file, cb) => {
        if (file.mimetype === "application/pdf") {
            cb(null, true);
        } else {
            cb(new Error("Only PDF files are accepted."));
        }
    },
});

// ─── Routes ───────────────────────────────────────────────────────────────────

const router = Router();

// POST /api/cv/upload/:jobId
// Field name must be "cv" in the form-data
router.post("/upload/:jobId", upload.single("cv"), uploadCV);

export default router;