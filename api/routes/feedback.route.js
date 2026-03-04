import express from "express";
import { createFeedback } from "../controllers/feedback.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createFeedback);

export default router;