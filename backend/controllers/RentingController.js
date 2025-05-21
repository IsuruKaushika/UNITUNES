import { v2 as cloudinary } from "cloudinary";
import rentingModel from "../models/rentingModel.js";

// Add renting item
const addRenting = async (req, res) => {
    try {
        const { rentType, itemName, ownerName, contactNumber, price, description } = req.body;

        const image = req.files.image && req.files.image[0];
        const images = [image].filter((item) => item !== undefined);

        const imageUrls = await Promise.all(
            images.map(async (item) => {
                const result = await cloudinary.uploader.upload(item.path, {
                    resource_type: "image"
                });
                return result.secure_url;
            })
        );

        const rentingData = {
            rentType,
            itemName,
            ownerName,
            contactNumber,
            price,
            description,
            image: imageUrls
        };

        const renting = new rentingModel(rentingData);
        await renting.save();

        res.json({ success: true, message: "Renting item added successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// List all renting items
const listRenting = async (req, res) => {
    try {
        const items = await rentingModel.find({});
        res.json({ success: true, items });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Delete a renting item
const removeRenting = async (req, res) => {
    try {
        await rentingModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Renting item deleted successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Get single renting item details
const singleRenting = async (req, res) => {
    try {
        const { rentId } = req.body;
        const rent = await rentingModel.findById(rentId);
        res.json({ success: true, rent });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export { addRenting, listRenting, removeRenting, singleRenting };
