import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import Listing from "../models/listing.model.js";

export const  test = (req, res) => {
    res.send("Test route being called !!!");
};

export const updateUser = async (req, res, next) => {
    if(req.user.id !== req.params.id) return next(errorHandler(401, "You can only update your own account"));
    try {
        if (req.body.password){
            req.body.password = bcrypt.hashSync(req.body.password, 10);
        }

        const updateUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password
                },
            },
            { new: true }   
        );

        const { password, ...rest } = updateUser._doc;

        res.status(200).json(rest);
 
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) return next(errorHandler(401, "You can only delete your own account!"));

    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token');
        res.status(200).json("User has been deleted...");

    } catch (error) {
        next(error);
    }
};

export const getUserListings = async (req, res, next) => {
  try {
    const listings = await Listing.find({ userRef: req.params.id });

    res.status(200).json(listings);
  } catch (err) {
    next(err);
  }
};


export const toggleWishlist = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const listingId = req.params.listingId;

    const exists = user.wishlist.some(
      (id) => id.toString() === listingId
    );

    if (exists) {
      user.wishlist = user.wishlist.filter(
        (id) => id.toString() !== listingId
      );
    } else {
      user.wishlist.push(listingId);
    }

    await user.save();

    // ✅ return updated wishlist
    res.status(200).json(user.wishlist);

  } catch (err) {
    next(err);
  }
};



export const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("wishlist");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ ALWAYS send array directly
    res.status(200).json(user.wishlist);

  } catch (error) {
    console.log("WISHLIST ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

export const contactOwner = async (req, res, next) => {
  try {
    const { message, phone } = req.body;

    const listing = await Listing.findById(req.params.listingId).populate("userRef");

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    // 🔥 For now we just return success
    // later you can send email / save to DB

    res.status(200).json({
      success: true,
      ownerEmail: listing.userRef.email,
      message: "Message sent to owner",
    });

  } catch (error) {
    next(error);
  }
};



