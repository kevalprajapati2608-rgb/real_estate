import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
{
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  listingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Listing"
  },

  amount: Number,

  paymentStatus: {
    type: String,
    default: "completed"
  }
},
{ timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);