import Pharmacy from "../models/pharmacyModel.js";
import MedicalCenter from "../models/medicalCenterModel.js";

// -------------------- ADD PHARMACY --------------------
export const addPharmacy = async (req, res) => {
  try {
    const { pharmacyName, address, contactNumber, description, openTime, closeTime } = req.body;
    const image = req.file?.path || "";

    if (!pharmacyName || !address || !contactNumber) {
      return res.status(400).json({ success: false, message: "Required fields missing" });
    }

    const newPharmacy = new Pharmacy({
      pharmacyName,
      address,
      contactNumber,
      description: description || "",
      openTime: openTime || "",
      closeTime: closeTime || "",
      image,
    });

    await newPharmacy.save();
    res.status(201).json({ success: true, message: "Pharmacy added successfully", data: newPharmacy });
  } catch (error) {
    console.error("Add Pharmacy Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// -------------------- ADD MEDICAL CENTER --------------------
export const addMedicalCenter = async (req, res) => {
  try {
    const { name, address, contact, description, doctorName, availableTime } = req.body;
    const image = req.file?.path || "";

    if (!name || !address || !contact) {
      return res.status(400).json({ success: false, message: "Required fields missing" });
    }

    const newMedicalCenter = new MedicalCenter({
      centerName: name,
      address,
      contactNumber: contact,
      description: description || "",
      doctorName: doctorName || "",
      availableTime: availableTime || "",
      image,
    });

    await newMedicalCenter.save();
    res.status(201).json({ success: true, message: "Medical Center added successfully", data: newMedicalCenter });
  } catch (error) {
    console.error("Add Medical Center Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// -------------------- LIST ALL --------------------
export const listPharmacies = async (req, res) => {
  try {
    const pharmacies = await Pharmacy.find();
    res.status(200).json({ success: true, data: pharmacies });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const listMedicalCenters = async (req, res) => {
  try {
    const centers = await MedicalCenter.find();
    res.status(200).json({ success: true, data: centers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// -------------------- SINGLE ITEM --------------------
export const singlePharmacy = async (req, res) => {
  try {
    const { id } = req.params;   // use params instead of body
    const pharmacy = await Pharmacy.findById(id);
    if (!pharmacy) {
      return res.status(404).json({ success: false, message: "Pharmacy not found" });
    }
    res.json({ success: true, pharmacy });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const singleMedicalCenter = async (req, res) => {
  try {
    const { id } = req.params;
    const medicalCenter = await MedicalCenter.findById(id);
    if (!medicalCenter) {
      return res.status(404).json({ success: false, message: "Medical Center not found" });
    }
    res.json({ success: true, medicalCenter });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// -------------------- REMOVE --------------------
export const removePharmacy = async (req, res) => {
  try {
    const { id } = req.params;
    await Pharmacy.findByIdAndDelete(id);
    res.json({ success: true, message: "Pharmacy deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const removeMedicalCenter = async (req, res) => {
  try {
    const { id } = req.params;
    await MedicalCenter.findByIdAndDelete(id);
    res.json({ success: true, message: "Medical Center deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
