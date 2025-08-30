import { v2 as cloudinary } from "cloudinary";
import boardingModel from "../models/boardingModel.js";

// Add boarding - works for all user types
const addBoarding = async (req, res) => {
  try {
    const { Title, description, price, Rooms, bathRooms, owner, address, contact, gender } = req.body;

    // Handle images
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];
    const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, { resource_type: "image" });
        return result.secure_url;
      })
    );

    // Determine owner type and ID based on authenticated user
    let ownerId, ownerType;
    
    if (req.user?.role === 'admin') {
      ownerId = req.user.id || 'admin';
      ownerType = 'admin';
    } else if (req.user?.role === 'student') {
      ownerId = req.user.id;
      ownerType = 'student';
    } else if (req.body.serviceProviderId) { // From authServiceProvider middleware
      ownerId = req.body.serviceProviderId;
      ownerType = 'service_provider';
    } else {
      return res.json({ success: false, message: "Unable to determine user type" });
    }

    const boardingData = {
      Title,
      owner,
      ownerId,
      ownerType,
      address,
      contact,
      description,
      price: Number(price),
      Rooms,
      bathRooms,
      image: imagesUrl,
      gender,
      date: Date.now()
    };

    const boarding = new boardingModel(boardingData);
    await boarding.save();

    res.json({ success: true, message: "Boarding Added Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// List all boardings
const listBoarding = async (req, res) => {
  try {
    const products = await boardingModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// List boardings by owner (for users to see their own boardings)
const listMyBoardings = async (req, res) => {
  try {
    let ownerId, ownerType;
    
    if (req.user?.role === 'admin') {
      // Admin can see all boardings they created, including legacy ones
      const adminBoardings = await boardingModel.find({
        $or: [
          { ownerId: req.user.id || 'admin', ownerType: 'admin' },
          { ownerType: { $exists: false } }, // Legacy records without ownerType
          { ownerId: { $exists: false } } // Legacy records without ownerId
        ]
      });
      return res.json({ success: true, products: adminBoardings });
    } else if (req.user?.role === 'student') {
      ownerId = req.user.id;
      ownerType = 'student';
    } else if (req.body.serviceProviderId) {
      ownerId = req.body.serviceProviderId;
      ownerType = 'service_provider';
    } else {
      return res.json({ success: false, message: "Unable to determine user type" });
    }

    const products = await boardingModel.find({ ownerId, ownerType });
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Remove boarding with enhanced authorization (handles legacy records)
const removeBoarding = async (req, res) => {
  try {
    const boarding = await boardingModel.findById(req.body.id);

    if (!boarding) {
      return res.json({ success: false, message: "Boarding not found" });
    }

    // Admin can delete any boarding
    if (req.user?.role === "admin") {
      await boardingModel.findByIdAndDelete(req.body.id);
      return res.json({ success: true, message: "Boarding Deleted Successfully (admin)" });
    }

    // For legacy records (no ownerId or ownerType), only admin can delete
    if (!boarding.ownerId || !boarding.ownerType) {
      return res.json({ success: false, message: "Only admin can delete legacy boardings" });
    }

    // Students can only delete their own boardings
    if (req.user?.role === "student") {
      if (boarding.ownerId.toString() !== req.user.id || boarding.ownerType !== 'student') {
        return res.json({ success: false, message: "Not authorized to delete this boarding" });
      }
      await boardingModel.findByIdAndDelete(req.body.id);
      return res.json({ success: true, message: "Boarding Deleted Successfully" });
    }

    // Service providers can only delete their own boardings
    if (req.body.serviceProviderId) {
      if (boarding.ownerId.toString() !== req.body.serviceProviderId || boarding.ownerType !== 'service_provider') {
        return res.json({ success: false, message: "Not authorized to delete this boarding" });
      }
      await boardingModel.findByIdAndDelete(req.body.id);
      return res.json({ success: true, message: "Boarding Deleted Successfully" });
    }

    res.json({ success: false, message: "Unauthorized" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Single boarding info
const singleBoarding = async (req, res) => {
  try {
    const { boardingId } = req.body;
    const boarding = await boardingModel.findById(boardingId);
    res.json({ success: true, boarding });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Update boarding (only owner can update, handles legacy records)
const updateBoarding = async (req, res) => {
  try {
    const { id, Title, description, price, Rooms, bathRooms, owner, address, contact, gender } = req.body;
    
    const boarding = await boardingModel.findById(id);
    if (!boarding) {
      return res.json({ success: false, message: "Boarding not found" });
    }

    // Check ownership
    let canUpdate = false;
    if (req.user?.role === "admin") {
      canUpdate = true; // Admin can update any boarding
    } else if (!boarding.ownerId || !boarding.ownerType) {
      // Legacy records can only be updated by admin
      canUpdate = false;
    } else if (req.user?.role === "student" && boarding.ownerId.toString() === req.user.id && boarding.ownerType === 'student') {
      canUpdate = true;
    } else if (req.body.serviceProviderId && boarding.ownerId.toString() === req.body.serviceProviderId && boarding.ownerType === 'service_provider') {
      canUpdate = true;
    }

    if (!canUpdate) {
      return res.json({ success: false, message: "Not authorized to update this boarding" });
    }

    // Handle image updates if provided
    let imagesUrl = boarding.image; // Keep existing images by default
    if (req.files) {
      const image1 = req.files.image1 && req.files.image1[0];
      const image2 = req.files.image2 && req.files.image2[0];
      const image3 = req.files.image3 && req.files.image3[0];
      const image4 = req.files.image4 && req.files.image4[0];
      const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

      if (images.length > 0) {
        imagesUrl = await Promise.all(
          images.map(async (item) => {
            let result = await cloudinary.uploader.upload(item.path, { resource_type: "image" });
            return result.secure_url;
          })
        );
      }
    }

    const updateData = {
      Title: Title || boarding.Title,
      owner: owner || boarding.owner,
      address: address || boarding.address,
      contact: contact || boarding.contact,
      description: description || boarding.description,
      price: price ? Number(price) : boarding.price,
      Rooms: Rooms || boarding.Rooms,
      bathRooms: bathRooms || boarding.bathRooms,
      image: imagesUrl,
      gender: gender || boarding.gender,
      updatedAt: Date.now()
    };

    // If updating a legacy record as admin, add ownership info
    if (req.user?.role === "admin" && (!boarding.ownerId || !boarding.ownerType)) {
      updateData.ownerId = req.user.id || 'admin';
      updateData.ownerType = 'admin';
    }

    await boardingModel.findByIdAndUpdate(id, updateData);
    res.json({ success: true, message: "Boarding Updated Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { singleBoarding, removeBoarding, listBoarding, addBoarding, listMyBoardings, updateBoarding };