import express from "express";
import {
  addMedicalCenter,
  listMedicalCenters,
  removeMedicalCenter,
  singleMedicalCenter,
} from "../controllers/medicareController.js";

import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const Medicalrouter = express.Router();

// POST - Fixed: Changed from "image" to "doctorImage" to match frontend
Medicalrouter.post("/add", adminAuth, upload.single("doctorImage"), addMedicalCenter);
Medicalrouter.post("/remove", adminAuth, removeMedicalCenter);
Medicalrouter.post("/single", singleMedicalCenter);

// GET
Medicalrouter.get("/list", listMedicalCenters);

export default Medicalrouter;