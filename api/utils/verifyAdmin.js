import { errorHandler } from "./error.js";
import User from "../models/user.model.js";

export const verifyAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user || !user.isAdmin) {
      return next(errorHandler(403, "Admin only access"));
    }

    next();
  } catch (err) {
    next(err);
  }
};
