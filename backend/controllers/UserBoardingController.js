import UserBoardingModel from "../models/UserBoardingModel.js";
import mongoose from "mongoose";

// Add Boarding
export const addUserBoarding = async (req, res) => {
  try {
    const { Title, price, Rooms, bathRooms, gender, address, description, contact } = req.body;
    const images = req.files ? Object.values(req.files).flat().map(file => file.path) : [];

    const boarding = new UserBoardingModel({
      Title,
      owner: req.body.userId, // make sure you send userId from frontend
      price,
      image: images,
      Rooms,
      bathRooms,
      gender: JSON.parse(gender),
      date: Date.now(),
      address,
      description,
      contact,
    });

    await boarding.save();
    res.status(201).json({ success: true, boarding });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to add boarding" });
  }
};

// List Boardings for User
export const listUserBoardings = async (req, res) => {
  try {
    const { userId } = req.params;
    const boardings = await UserBoardingModel.find({ owner: userId });
    res.status(200).json({ success: true, boardings });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch boardings" });
  }
};

// Delete Boarding
export const deleteUserBoarding = async (req, res) => {
  try {
    const { id } = req.params;
    await UserBoardingModel.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Boarding deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete boarding" });
  }
};
