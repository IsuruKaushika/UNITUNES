import Pharmacy from "../models/pharmacyModel.js";
import MedicalCenter from "../models/medicalCenterModel.js";

// Add Pharmacy
export const addPharmacy = async (req, res) => {
  try {
    const { pharmacyName, address, contactNumber, description, openTime, closeTime, image } = req.body;
    const newPharmacy = new Pharmacy({ pharmacyName, address, contactNumber, description, openTime, closeTime, image });
    await newPharmacy.save();
    res.status(201).json(newPharmacy);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add Medical Center
export const addMedicalCenter = async (req, res) => {
  try {
    const { centerName, address, contactNumber, description, openTime, closeTime, image } = req.body;
    const newMedicalCenter = new MedicalCenter({ centerName, address, contactNumber, description, openTime, closeTime, image });
    await newMedicalCenter.save();
    res.status(201).json(newMedicalCenter);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
