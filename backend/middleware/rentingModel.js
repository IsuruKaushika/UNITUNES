import mongoose from "mongoose";

const rentingSchema = new mongoose.Schema({
    rentType: { type: String, required: true }, // electronics, books, furniture, tools
    itemName: { type: String, required: true },
    ownerName: { type: String, required: true },
    contactNumber: { type: String, required: true },
    price: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: Array }, // array for flexibility
 
});

const rentingModel = mongoose.models.renting || mongoose.model('renting', rentingSchema);

export default rentingModel;
