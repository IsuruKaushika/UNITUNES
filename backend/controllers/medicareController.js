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
    res.status(201).json({ success: true, message: "Pharmacy added successfully", data: newPharmacy });
  } catch (error) {
    console.error("Add Pharmacy Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Add Medical Center - FIXED
export const addMedicalCenter = async (req, res) => {
  try {
    console.log("=== ADD MEDICAL CENTER DEBUG ===");
    console.log("Body received:", req.body);
    console.log("File received:", req.file);

    // Fixed: Match the field names from frontend
    const { name, address, contact, description, doctorName, availableTime } = req.body;
    const image = req.file?.path || "";

    console.log("Extracted data:", { name, address, contact, description, doctorName, availableTime });

    // Validate required fields
    if (!name || !address || !contact || !doctorName) {
      return res.status(400).json({ 
        success: false, 
        message: "Missing required fields: name, address, contact, doctorName" 
      });
    }

    const newMedicalCenter = new MedicalCenter({
      centerName: name, // Map 'name' to 'centerName' for your model
      address,
      contactNumber: contact, // Map 'contact' to 'contactNumber'
      description: description || "",
      doctorName,
      availableTime: availableTime || "",
      image,
    });

    console.log("Medical center to save:", newMedicalCenter);

    await newMedicalCenter.save();
    
    res.status(201).json({ 
      success: true, 
      message: "Medical Center added successfully", 
      data: newMedicalCenter 
    });
  } catch (error) {
    console.error("Add Medical Center Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// List Pharmacies
export const listPharmacies = async (req, res) => {
  try {
    const pharmacies = await Pharmacy.find();
    res.status(200).json({ success: true, data: pharmacies });
  } catch (error) {
    console.error("List Pharmacies Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// List Medical Centers
export const listMedicalCenters = async (req, res) => {
  try {
    const centers = await MedicalCenter.find();
    res.status(200).json({ success: true, data: centers });
  } catch (error) {
    console.error("List Medical Centers Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Remove Medical Center - FIXED
export const removeMedicalCenter = async (req, res) => {
  try {
    const { id } = req.body;
    
    if (!id) {
      return res.status(400).json({ success: false, message: "Medical Center ID is required" });
    }

    await MedicalCenter.findByIdAndDelete(id); // Fixed: Use correct import name
    res.json({ success: true, message: "Medical Center deleted successfully" });
        
  } catch (error) {
    console.error("Remove Medical Center Error:", error);
    res.json({ success: false, message: error.message });
  }
};

// Single Medical Center - FIXED
export const singleMedicalCenter = async (req, res) => {
  try {
    const { medicalId } = req.body;
    
    if (!medicalId) {
      return res.status(400).json({ success: false, message: "Medical Center ID is required" });
    }

    const medicalCenter = await MedicalCenter.findById(medicalId); // Fixed: Use correct import name
    
    if (!medicalCenter) {
      return res.status(404).json({ success: false, message: "Medical Center not found" });
    }

    res.json({ success: true, medicalCenter });
  } catch (error) {
    console.error("Single Medical Center Error:", error);
    res.json({ success: false, message: error.message });
  }
};

// Remove Pharmacy
export const removePharmacy = async (req, res) => {
  try {
    const { id } = req.body;
    
    if (!id) {
      return res.status(400).json({ success: false, message: "Pharmacy ID is required" });
    }

    await Pharmacy.findByIdAndDelete(id); // Fixed: Use correct import name
    res.json({ success: true, message: "Pharmacy deleted successfully" });
        
  } catch (error) {
    console.error("Remove Pharmacy Error:", error);
    res.json({ success: false, message: error.message });
  }
};

// Single Pharmacy - FIXED
export const singlePharmacy = async (req, res) => {
  try {
    const { pharmacyId } = req.body;
    
    if (!pharmacyId) {
      return res.status(400).json({ success: false, message: "Pharmacy ID is required" });
    }

    const pharmacy = await Pharmacy.findById(pharmacyId); // Fixed: Use correct import name
    
    if (!pharmacy) {
      return res.status(404).json({ success: false, message: "Pharmacy not found" });
    }

    res.json({ success: true, pharmacy });
  } catch (error) {
    console.error("Pharmacy Error:", error);
    res.json({ success: false, message: error.message });
  }
};