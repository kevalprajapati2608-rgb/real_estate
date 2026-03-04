import express from "express";
import { payProperty } from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/pay", payProperty);

export default router;