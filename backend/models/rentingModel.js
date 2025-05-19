import mongoose from "mongoose";

const rentingSchema = new mongoose.Schema({
  rentType: {
    type: String,
    enum: ["electronics", "books", "furniture", "tools"],
    required: true,
  },
  itemName: { type: String, required: true },
  ownerName: { type: String, required: true },
  contactNumber: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  image: { type: String },
}, { timestamps: true });

const Renting = mongoose.models.Renting || mongoose.model("Renting", rentingSchema);
export default Renting;
