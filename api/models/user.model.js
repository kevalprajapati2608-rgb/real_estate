import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: false,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "https://tse4.mm.bing.net/th/id/OIP.hGSCbXlcOjL_9mmzerqAbQHaHa?pid=Api&P=0&h=180",
    },
    wishlist: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Listing",
  },
],
isAdmin: {
  type: Boolean,
  default: false,
},


  },
  { timestamps: true }
);

const User = mongoose.model("User",userSchema);

export default User;

