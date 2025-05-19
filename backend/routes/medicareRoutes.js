import express from "express";
import {
  addPharmacy,
  addMedicalCenter,
  listPharmacies,
  listMedicalCenters,
} from "../controllers/medicareController.js";

import upload from "../middleware/multer.js"; // If using image upload
import adminAuth from "../middleware/adminAuth.js"; // Optional

const router = express.Router();

// POST
router.post("/pharmacy", adminAuth, upload.single("image"), addPharmacy);
router.post("/medical-center", adminAuth, upload.single("image"), addMedicalCenter);

// GET
router.get("/pharmacy", listPharmacies);
router.get("/medical-center", listMedicalCenters);

export default router;
