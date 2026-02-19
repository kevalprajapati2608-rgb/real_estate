import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";
import adminRoutes from "./routes/admin.route.js";

dotenv.config();
const app = express();

// Enable CORS for React frontend
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Serve uploaded files
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);
app.use("/api/admin", adminRoutes);



// MongoDB
mongoose.connect(process.env.MONGO)
  .then(() => {
    console.log("✅ MongoDB CONNECTED");
    console.log("DB NAME:", mongoose.connection.name);

    app.listen(3000, () => {
      console.log("🚀 Server running on port 3000");
    });

  })
  .catch((err) => {
    console.log("❌ MongoDB ERROR:", err);
  });
