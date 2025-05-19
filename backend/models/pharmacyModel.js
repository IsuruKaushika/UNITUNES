import mongoose from "mongoose";

const pharmacySchema = new mongoose.Schema({
  pharmacyName: { type: String, required: true },
  address: { type: String, required: true },
  contactNumber: { type: String, required: true },
  description: { type: String },
  openTime: { type: String },
  closeTime: { type: String },
  image: { type: String },
}, { timestamps: true });

const Pharmacy = mongoose.models.Pharmacy || mongoose.model("Pharmacy", pharmacySchema);
export default Pharmacy;
