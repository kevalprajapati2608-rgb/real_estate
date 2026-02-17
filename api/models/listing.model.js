import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    address: { type: String, required: true },
    bedrooms: { type: Number },
    bathrooms: { type: Number },
    regularPrice: { type: Number },
    discountPrice: { type: Number },
    sale: { type: Boolean, default: false },
    rent: { type: Boolean, default: false },
    parking: { type: Boolean, default: false },
    furnished: { type: Boolean, default: false },
    offer: { type: Boolean, default: false },
    images: { type: [String], required: true },
     userRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
   
  { timestamps: true }
);

export default mongoose.model("Listing", listingSchema);
