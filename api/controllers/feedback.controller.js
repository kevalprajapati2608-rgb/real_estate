import Feedback from "../models/feedback.model.js";

export const createFeedback = async (req, res, next) => {
  try {

    const feedback = new Feedback({
      message: req.body.message,
      userId: req.user.id,
    });

    await feedback.save();

    res.status(200).json(feedback);

  } catch (error) {
    next(error);
  }
};