import express from "express";
import { test, updateUser, deleteUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
import { getUserListings } from "../controllers/user.controller.js";
import { updateListing } from "../controllers/listing.controller.js";
import { toggleWishlist, getWishlist } from "../controllers/user.controller.js";
import { contactOwner } from "../controllers/user.controller.js";






const router = express.Router();

router.get("/test", test);
router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
router.get("/listings/:id", getUserListings);
router.get("/get/:id", verifyToken, getUserListings);
router.put("/update/:id", verifyToken, updateListing);
router.get("/wishlist", verifyToken, getWishlist);
router.put("/wishlist/:listingId", verifyToken, toggleWishlist);
router.post("/contact/:listingId", verifyToken, contactOwner);


export default router;
