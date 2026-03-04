import Booking from "../models/booking.model.js";
import Listing from "../models/listing.model.js";

export const payProperty = async (req, res) => {

  try {

    const { listingId, userId, amount } = req.body;

    const booking = new Booking({
      listingId,
      userId,
      amount,
    });

    await booking.save();

    await Listing.findByIdAndUpdate(listingId, {
      isLocked: true
    });

    res.status(200).json({
      success: true
    });

  } catch (error) {
    res.status(500).json(error);
  }

};