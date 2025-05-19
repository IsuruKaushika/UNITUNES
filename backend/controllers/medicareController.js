import Pharmacy from "../models/pharmacyModel.js";
import MedicalCenter from "../models/medicalCenterModel.js";

// Add Pharmacy
export const addPharmacy = async (req, res) => {
  try {
    const { pharmacyName, address, contactNumber, description, openTime, closeTime } = req.body;
    const image = req.file?.path || "";

    const newPharmacy = new Pharmacy({
      pharmacyName,
      address,
      contactNumber,
      description,
      openTime,
      closeTime,
      image,
    });

    await newPharmacy.save();
    res.status(201).json(newPharmacy);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add Medical Center
export const addMedicalCenter = async (req, res) => {
  try {
    const { centerName, address, contactNumber, description, openTime, closeTime } = req.body;
    const image = req.file?.path || "";

    const newMedicalCenter = new MedicalCenter({
      centerName,
      address,
      contactNumber,
      description,
      openTime,
      closeTime,
      image,
    });

    await newMedicalCenter.save();
    res.status(201).json(newMedicalCenter);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// List Pharmacies
export const listPharmacies = async (req, res) => {
  try {
    const pharmacies = await Pharmacy.find();
    res.status(200).json(pharmacies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// List Medical Centers
export const listMedicalCenters = async (req, res) => {
  try {
    const centers = await MedicalCenter.find();
    res.status(200).json(centers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
