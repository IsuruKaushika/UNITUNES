import UserBoarding from "../models/UserBoarding.js";

// Add a new boarding by user
export const addUserBoarding = async (req, res) => {
  try {
    const { Title, address, contact, description, Rooms, bathRooms, price, gender, userId } = req.body;

    const images = [];
    ["image1", "image2", "image3", "image4"].forEach((key) => {
      if (req.files[key]) images.push(req.files[key][0].filename);
    });

    const newBoarding = new UserBoarding({
      Title,
      address,
      contact,
      description,
      Rooms,
      bathRooms,
      price,
      gender: JSON.parse(gender),
      userId,
      images,
    });

    await newBoarding.save();
    res.json({ success: true, message: "Boarding added", boarding: newBoarding });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get all boardings of a specific user
export const listUserBoardings = async (req, res) => {
  try {
    const { userId } = req.params;
    const boardings = await UserBoarding.find({ userId });
    res.json({ success: true, boardings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Delete one boarding by ID
export const deleteUserBoarding = async (req, res) => {
  try {
    await UserBoarding.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Boarding deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
