import express from "express";
import {
  addPharmacy,
  listPharmacies,
  removePharmacy,
  singlePharmacy,
} from "../controllers/medicareController.js";

import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const Pharmacyrouter = express.Router();

// POST - Fixed: Changed from "image" to "doctorImage" to match frontend
Pharmacyrouter.post("/add", adminAuth, upload.single("doctorImage"), addPharmacy);
Pharmacyrouter.post("/remove", adminAuth, removePharmacy);
Pharmacyrouter.post("/single", singlePharmacy);

// GET
Pharmacyrouter.get("/list", listPharmacies);

export default Pharmacyrouter;