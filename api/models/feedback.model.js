import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
{
message:{
type:String,
required:true
},

userId:{
type:mongoose.Schema.Types.ObjectId,
ref:"User",
required:true
}

},
{timestamps:true}
);

export default mongoose.model("Feedback",feedbackSchema);