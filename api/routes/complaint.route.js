import express from "express";
import { createComplaint } from "../controllers/complaint.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createComplaint);

export default router;