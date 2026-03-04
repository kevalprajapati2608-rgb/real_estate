import express from "express";
import { google, signin, signOut, signup } from "../controllers/auth.controller.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import User from "../models/user.model.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

// 🔥 GLOBAL TRANSPORTER (IMPORTANT FIX)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);
router.get("/signout", signOut);

// 📩 SEND VERIFICATION EMAIL
router.post("/send-verification", verifyToken, async (req, res) => {
  try {

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.otp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000;
    await user.save();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL?.trim(),
    pass: process.env.PASSWORD?.trim(),
  },
});
    await transporter.sendMail({
      to: user.email,   // 🔒 only login user email
      subject: "Your OTP Code",
      html: `<h2>Your OTP: ${otp}</h2>`,
    });

    res.json({ message: "OTP sent successfully" });

  } catch (err) {
    console.log("REAL ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});
// 🔗 VERIFY LINK → GENERATE OTP
// 🔢 VERIFY OTP
router.post("/verify-otp", verifyToken, async (req, res) => {
  const { otp } = req.body;

  const user = await User.findById(req.user.id);

  if (user.otp !== otp || user.otpExpires < Date.now()) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  user.isVerified = true;
  user.otp = null;
  user.otpExpires = null;
  user.verificationToken = null;

  await user.save();

  res.json({ success: true });
});

export default router;