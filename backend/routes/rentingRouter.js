import express from "express";
import {
  addRentItem,
  getAllRentItems,
  getRentItemsByType,
} from "../controllers/rentingController.js";

import upload from "../middleware/multer.js"; // for file uploads
import adminAuth from "../middleware/adminAuth.js"; // optional

const router = express.Router();

router.post("/add", adminAuth, upload.single("image"), addRentItem);
router.get("/all", getAllRentItems);
router.get("/category/:type", getRentItemsByType);

export default router;
