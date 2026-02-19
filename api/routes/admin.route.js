import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { verifyAdmin } from "../utils/verifyAdmin.js";
import {
  deleteUserAdmin,
  deleteListingAdmin,
  getAllUsers,
  getAllListings,
} from "../controllers/admin.controller.js";

const router = express.Router();

// admin data
router.get("/users", verifyToken, verifyAdmin, getAllUsers);
router.get("/listings", verifyToken, verifyAdmin, getAllListings);

// delete
router.delete("/user/:id", verifyToken, verifyAdmin, deleteUserAdmin);
router.delete("/listing/:id", verifyToken, verifyAdmin, deleteListingAdmin);

export default router;
