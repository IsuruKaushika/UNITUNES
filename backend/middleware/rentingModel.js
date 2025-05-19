import mongoose from "mongoose";

const rentingSchema = new mongoose.Schema({
  owner: { type: String },
  price: { type: Number, required: true },
  image: { type: Array },
  Category: { type: String, required: true },
  address: { type: String, required: true },
  description: { type: String, required: true },
  contact: { type: String, required: true },
});

const rentingModel = mongoose.models.renting || mongoose.model('renting', rentingSchema);
export default rentingModel;
