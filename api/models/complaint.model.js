import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
{
complaint:{
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

export default mongoose.model("Complaint",complaintSchema);