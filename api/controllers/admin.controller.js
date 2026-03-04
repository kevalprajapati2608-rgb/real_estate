import User from "../models/user.model.js";
import Listing from "../models/listing.model.js";
import Booking from "../models/booking.model.js";
import Rating from "../models/rating.model.js";
import Feedback from "../models/feedback.model.js";
import Complaint from "../models/complaint.model.js";

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


export const getTransactions = async (req, res) => {
  try {

    const transactions = await Booking.find()
      .populate("userId", "username email")
      .populate("listingId", "name regularPrice");

    res.status(200).json(transactions);

  } catch (error) {
    res.status(500).json(error);
  }
};

export const getAdminStats = async (req, res) => {
  try {
    const transactions = await Booking.find();

    const totalRevenue = transactions.reduce(
      (sum, t) => sum + (t.amount || 0),
      0
    );

    const soldProperties = transactions.length;

    const monthlySales = {};

    transactions.forEach((t) => {
      const month = new Date(t.createdAt).toLocaleString("default", {
        month: "short",
      });

      if (!monthlySales[month]) monthlySales[month] = 0;

      monthlySales[month] += t.amount;
    });

    res.status(200).json({
      totalRevenue,
      soldProperties,
      monthlySales,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
{/* Rating-feedback-complaint */}
export const getRatings = async (req,res,next)=>{
try{

const ratings = await Rating.find().populate("userId","username");

res.status(200).json(ratings);

}catch(err){
next(err);
}
};

export const getFeedbacks = async (req,res,next)=>{
try{

const feedbacks = await Feedback.find().populate("userId","username");

res.status(200).json(feedbacks);

}catch(err){
next(err);
}
};

export const getComplaints = async (req,res,next)=>{
try{

const complaints = await Complaint.find().populate("userId","username");

res.status(200).json(complaints);

}catch(err){
next(err);
}
};