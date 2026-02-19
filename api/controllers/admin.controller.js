import User from "../models/user.model.js";
import Listing from "../models/listing.model.js";

/* ================= GET ALL ================= */

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

export const getAllListings = async (req, res, next) => {
  try {
    const listings = await Listing.find();
    res.status(200).json(listings);
  } catch (err) {
    next(err);
  }
};

/* ================= DELETE USER ================= */

export const deleteUserAdmin = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    next(err);
  }
};

/* ================= DELETE LISTING ================= */

export const deleteListingAdmin = async (req, res, next) => {
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Listing deleted" });
  } catch (err) {
    next(err);
  }
};
