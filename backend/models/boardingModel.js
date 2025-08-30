import mongoose from "mongoose";

const boardingSchema = new mongoose.Schema({
    Title: { type: String, required: true },
    owner: { type: String, required: true },
    ownerId: { type: String }, // ID of the user who created this (optional for backward compatibility)
    ownerType: { 
        type: String, 
        enum: ['admin', 'student', 'service_provider'],
        default: 'admin' // Default to admin for existing records
    }, // Type of user who created this
    price: { type: Number, required: true },
    image: { type: Array, required: true },
    Rooms: { type: String, required: true },
    bathRooms: { type: String, required: true },
    gender: { type: Array, required: true },
    date: { type: Number, default: Date.now },
    address: { type: String, required: true },
    description: { type: String, required: true },
    contact: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const boardingModel = mongoose.models.boarding || mongoose.model('boarding', boardingSchema);

export default boardingModel;