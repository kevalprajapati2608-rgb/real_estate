import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { createListing, deleteListing, getUserListings, } from "../controllers/listing.controller.js";
import { upload } from "../utils/multer.js";
import { updateListing } from "../controllers/listing.controller.js";
import Listing from "../models/listing.model.js";

const router = express.Router();

// Multer middleware handles up to 6 images
router.post("/create", verifyToken, upload.array("images", 6), createListing);
router.get("/my-listings", verifyToken, getUserListings);
router.delete("/delete/:id", verifyToken, deleteListing);
router.put(
  "/update/:id",
  verifyToken,
  upload.array("images", 6),
  updateListing
);


router.get("/:id", async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ success: false, message: "Listing not found" });
    }

    res.status(200).json(listing);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
router.get("/", async (req, res) => {
  try {
    const {
      searchTerm,
      type,
      minPrice,
      maxPrice,
      sort = "createdAt",
      order = "desc",
    } = req.query;

    let query = {};

    if (searchTerm) {
      query.name = { $regex: searchTerm, $options: "i" };
    }

    if (type && type !== "all") {
      query.type = type;
    }

    if (minPrice || maxPrice) {
      query.regularPrice = {};
      if (minPrice) query.regularPrice.$gte = Number(minPrice);
      if (maxPrice) query.regularPrice.$lte = Number(maxPrice);
    }

    const listings = await Listing.find(query).sort({
      [sort]: order === "asc" ? 1 : -1,
    });

    res.status(200).json(listings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});




export default router;
