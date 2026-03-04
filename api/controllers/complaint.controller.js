import Complaint from "../models/complaint.model.js";

export const createComplaint = async (req, res, next) => {
  try {

    const complaint = new Complaint({
      complaint: req.body.complaint,
      userId: req.user.id,
    });

    await complaint.save();

    res.status(200).json(complaint);

  } catch (error) {
    next(error);
  }
};