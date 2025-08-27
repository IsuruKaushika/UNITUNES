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

// POST - Changed to handle multiple images like boarding
Medicalrouter.post('/add', adminAuth, upload.fields([
  {name: 'image1', maxCount: 1},
  {name: 'image2', maxCount: 1},
  {name: 'image3', maxCount: 1},
  {name: 'image4', maxCount: 1}
]), addMedicalCenter);

Medicalrouter.post("/remove", adminAuth, removeMedicalCenter);
Medicalrouter.post("/single", singleMedicalCenter);

// GET
Medicalrouter.get("/list", listMedicalCenters);

export default Medicalrouter;