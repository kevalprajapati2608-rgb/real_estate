import Rating from "../models/rating.model.js";

export const createRating = async (req,res,next)=>{
try{

const rating = new Rating({
rating:req.body.rating,
userId:req.user.id
});

await rating.save();

res.status(200).json(rating);

}catch(err){
next(err);
}
};