import { v2 as cloudinary } from "cloudinary";
import rentingModel from "../models/rentingModel.js";

// Add renting item
const addRenting = async (req, res) => {
  try {
    const { owner, price, Category, address, description, contact } = req.body;
    const image = req.files.image && req.files.image[0];
    const images = [image].filter(item => item !== undefined);

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
        return result.secure_url;
      })
    );

    const rentingData = {
      owner,
      address,
      contact,
      description,
      price: Number(price),
      Category,
      image: imagesUrl,
      date: Date.now(),
    };

    const renting = new rentingModel(rentingData);
    await renting.save();

    res.json({ success: true, message: "Renting Item Added Successfully" });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// List all renting items
const listRenting = async (req, res) => {
  try {
    const items = await rentingModel.find({});
    res.json({ success: true, products: items });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Remove a renting item
const removeRenting = async (req, res) => {
  try {
    await rentingModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Renting Item Deleted Successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Single renting item details
const singleRenting = async (req, res) => {
  try {
    const { rentingId } = req.body;
    const item = await rentingModel.findById(rentingId);
    res.json({ success: true, renting: item });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { addRenting, listRenting, removeRenting, singleRenting };
