import Listing from "../models/listing.model.js";
import fs from "fs";
import path from "path";
import { errorHandler } from "../utils/error.js";

/* ================= CREATE LISTING ================= */
export const createListing = async (req, res, next) => {
  try {
    const imageNames = req.files.map((file) => file.filename);

    const newListing = new Listing({
      ...req.body,
      images: imageNames,
      userRef: req.body.userRef,
    });

    await newListing.save();

    res.status(201).json({ success: true, listing: newListing });

  } catch (error) {
    next(error);
  }
};


// GET USER LISTINGS
export const getUserListings = async (req, res, next) => {
  try {
    const listings = await Listing.find({ userRef: req.user.id });
    res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};


export const deleteListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) return res.status(404).json({ success: false, message: "Listing not found" });

    // Only owner can delete
    if (listing.userRef.toString() !== req.user.id) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    await Listing.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: "Listing deleted successfully" });
  } catch (err) {
    next(err);
  }
};
//edite functionality...
export const updateListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    // Owner check
    if (listing.userRef.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // 🔹 Update text fields
    Object.keys(req.body).forEach((key) => {
      if (key !== "images") {
        listing[key] = req.body[key];
      }
    });

    // 🔹 Handle old images (JSON string)
    if (req.body.images) {
      listing.images = JSON.parse(req.body.images);
    }

    // 🔹 Handle new uploaded images
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map((file) => file.filename);
      listing.images = [...listing.images, ...newImages];
    }

    await listing.save();

    res.status(200).json({
      success: true,
      listing,
    });

  } catch (error) {
    next(error);
  }
};


