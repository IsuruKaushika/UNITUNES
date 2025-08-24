import { v2 as cloudinary } from "cloudinary"
import Pharmacy from "../models/pharmacyModel.js";
import MedicalCenter from "../models/medicalCenterModel.js";

// Add Pharmacy
const addPharmacy = async (req, res) => {
  try {
    const { pharmacyName, address, contactNumber, description, openTime, closeTime } = req.body;

    const image1 = req.files.image1 && req.files.image1[0]
    const image2 = req.files.image2 && req.files.image2[0]
    const image3 = req.files.image3 && req.files.image3[0]
    const image4 = req.files.image4 && req.files.image4[0]

    const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
        return result.secure_url;
      })
    )

    const pharmacyData = {
      pharmacyName,
      address,
      contactNumber,
      description,
      openTime,
      closeTime,
      image: imagesUrl,
      date: Date.now()
    }

    console.log(pharmacyData)

    const pharmacy = new Pharmacy(pharmacyData)
    await pharmacy.save()

    res.json({ success: true, message: "Pharmacy Added Successfully" })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
};

// Add Medical Center
const addMedicalCenter = async (req, res) => {
  try {
    console.log("=== ADD MEDICAL CENTER DEBUG ===");
    console.log("Body received:", req.body);
    console.log("Files received:", req.files);

    const { name, address, contact, description, doctorName, availableTime } = req.body;

    const image1 = req.files.image1 && req.files.image1[0]
    const image2 = req.files.image2 && req.files.image2[0]
    const image3 = req.files.image3 && req.files.image3[0]
    const image4 = req.files.image4 && req.files.image4[0]

    const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
        return result.secure_url;
      })
    )

    console.log("Extracted data:", { name, address, contact, description, doctorName, availableTime });

    // Validate required fields
    if (!name || !address || !contact || !doctorName) {
      return res.status(400).json({ 
        success: false, 
        message: "Missing required fields: name, address, contact, doctorName" 
      });
    }

    const medicalCenterData = {
      centerName: name,
      address,
      contactNumber: contact,
      description: description || "",
      doctorName,
      availableTime: availableTime || "",
      image: imagesUrl,
      date: Date.now()
    }

    console.log("Medical center data:", medicalCenterData);

    const medicalCenter = new MedicalCenter(medicalCenterData)
    await medicalCenter.save()
    
    res.json({ success: true, message: "Medical Center Added Successfully" })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
};

// List Pharmacies
const listPharmacies = async (req, res) => {
  try {
    const pharmacies = await Pharmacy.find({});
    res.json({ success: true, pharmacies });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// List Medical Centers
const listMedicalCenters = async (req, res) => {
  try {
    const centers = await MedicalCenter.find({});
    res.json({ success: true, centers });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Remove Medical Center
const removeMedicalCenter = async (req, res) => {
  try {
    await MedicalCenter.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Medical Center Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Single Medical Center
const singleMedicalCenter = async (req, res) => {
  try {
    const { medicalId } = req.body;
    const medicalCenter = await MedicalCenter.findById(medicalId);
    res.json({ success: true, medicalCenter });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Remove Pharmacy
const removePharmacy = async (req, res) => {
  try {
    await Pharmacy.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Pharmacy Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Single Pharmacy
const singlePharmacy = async (req, res) => {
  try {
    const { pharmacyId } = req.body;
    const pharmacy = await Pharmacy.findById(pharmacyId);
    res.json({ success: true, pharmacy });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { 
  addPharmacy, 
  addMedicalCenter, 
  listPharmacies, 
  listMedicalCenters, 
  removeMedicalCenter, 
  singleMedicalCenter, 
  removePharmacy, 
  singlePharmacy 
};