import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { verifyAdmin } from "../utils/verifyAdmin.js";
import {
  deleteUserAdmin,
  deleteListingAdmin,
  getAllUsers,
  getAllListings,
  getTransactions,
  getAdminStats,
  getRatings,
  getFeedbacks,
  getComplaints,
} from "../controllers/admin.controller.js";

const router = express.Router();

// admin data
router.get("/users", verifyToken, verifyAdmin, getAllUsers);
router.get("/listings", verifyToken, verifyAdmin, getAllListings);
router.get("/transactions", getTransactions);
// delete
router.delete("/user/:id", verifyToken, verifyAdmin, deleteUserAdmin);
router.delete("/listing/:id", verifyToken, verifyAdmin, deleteListingAdmin);
router.get("/stats", getAdminStats);
router.get("/ratings",verifyToken,verifyAdmin,getRatings);
router.get("/feedbacks",verifyToken,verifyAdmin,getFeedbacks);
router.get("/complaints",verifyToken,verifyAdmin,getComplaints);

export default router;
