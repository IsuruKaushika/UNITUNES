import mongoose from "mongoose";

const boardingSchema = new mongoose.Schema({
    Title: { type: String, required: true },
    owner: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', // Reference to User model
        required: true 
    },
    ownerName: { type: String, required: true }, // Store owner's name for quick access
    price: { type: Number, required: true },
    image: { type: Array, required: true },
    Rooms: { type: String, required: true },
    bathRooms: { type: String, required: true },
    gender: { type: Array, required: true },
    date: { type: Number, required: true },
    address: { type: String, required: true },
    description: { type: String, required: true },
    contact: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const boardingModel = mongoose.models.boarding || mongoose.model('boarding', boardingSchema);

export default boardingModel;