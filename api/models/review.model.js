import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
{
  userName: String,

  type: {
    type: String,
    enum: ["rating","feedback","complaint"]
  },

  rating: Number,

  message: String
},
{ timestamps:true }
);

export default mongoose.model("Review",reviewSchema);