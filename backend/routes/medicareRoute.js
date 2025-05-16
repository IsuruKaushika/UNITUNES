import express from "express";
import { addPharmacy, addMedicalCenter } from "../controllers/medicareController.js";

const router = express.Router();

router.post("/pharmacy", addPharmacy);
router.post("/medical-center", addMedicalCenter);

export default router;
