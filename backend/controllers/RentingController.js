import Renting from "../models/rentingModel.js";

// Add Rent Item
export const addRentItem = async (req, res) => {
  try {
    const { rentType, itemName, ownerName, contactNumber, price, description } = req.body;
    const image = req.file?.path || "";

    const newItem = new Renting({
      rentType,
      itemName,
      ownerName,
      contactNumber,
      price,
      description,
      image,
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Rent Items
export const getAllRentItems = async (req, res) => {
  try {
    const items = await Renting.find().sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get by Rent Type
export const getRentItemsByType = async (req, res) => {
  try {
    const { type } = req.params;
    const items = await Renting.find({ rentType: type });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
