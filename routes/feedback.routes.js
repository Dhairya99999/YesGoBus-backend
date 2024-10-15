import express from "express";
const router = express.Router();

import { add_feedback, get_feedback } from "../controllers/feedback.controller.js";
import {authenticateToken} from "../middleware/cabdriverAuth.js";
// /api/feedback/add_feedback
router.post("/add_feedback", authenticateToken, add_feedback);
// /api/feedback/get_feedback
router.get("/get_feedback", get_feedback)

export default router;