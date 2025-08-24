import mongoose from "mongoose";

const medicalCenterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  contact: { type: String, required: true },
  doctorName: { type: String, required: true },
  description: { type: String },
  availableTime: { type: String },
  specialties: { type: Array },
  image: { type: Array, required: true },
  date: { type: Number, required: true },
}, { timestamps: true });

const MedicalCenter = mongoose.models.MedicalCenter || mongoose.model("MedicalCenter", medicalCenterSchema);
export default MedicalCenter;