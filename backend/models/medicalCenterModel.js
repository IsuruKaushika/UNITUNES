import mongoose from "mongoose";

const medicalCenterSchema = new mongoose.Schema({
  centerName: { type: String, required: true },
  address: { type: String, required: true },
  contactNumber: { type: String, required: true },
  doctorName: { type: String, required: true },
  description: { type: String },
  availableTime: { type: String },
 
  image: { type: String },
}, { timestamps: true });

const MedicalCenter = mongoose.models.MedicalCenter || mongoose.model("MedicalCenter", medicalCenterSchema);
export default MedicalCenter;
