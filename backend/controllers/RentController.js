import {v2 as cloudinary} from "cloudinary"
import Rent from "../models/rentingModel.js"

//add rent item
const addRent = async(req, res) => {
    try {
        const { rentType, itemName, ownerName, contact, price, description } = req.body;

        const image = req.files.itemImage && req.files.itemImage[0]
        
        let imageUrl = "";
        
        // Upload image to cloudinary if provided
        if (image) {
            const result = await cloudinary.uploader.upload(image.path, {
                resource_type: 'image'
            });
            imageUrl = result.secure_url;
        }

        const rentData = {
            rentType,
            itemName,
            ownerName,
            contact,
            price: Number(price),
            description,
            itemImage: imageUrl,
            isAvailable: true
        }

        console.log(rentData)

        const rent = new Rent(rentData)
        await rent.save()

        res.json({success: true, message: "Rent Item Added Successfully"})

    } catch(error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

//list rent items
const listRent = async(req, res) => {
    try {
        const rentItems = await Rent.find({})
        res.json({success: true, rentItems})
    } catch(error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

//list available rent items only
const listAvailableRent = async(req, res) => {
    try {
        const rentItems = await Rent.find({isAvailable: true})
        res.json({success: true, rentItems})
    } catch(error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

//list rent items by category
const listRentByCategory = async(req, res) => {
    try {
        const { category } = req.params;
        const rentItems = await Rent.find({
            rentType: category,
            isAvailable: true
        })
        res.json({success: true, rentItems})
    } catch(error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

//remove rent item
const removeRent = async(req, res) => {
    try {
        await Rent.findByIdAndDelete(req.body.id)
        res.json({success: true, message: "Rent Item Deleted Successfully"})
        
    } catch(error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

//single rent item info
const singleRent = async(req, res) => {
    try {
        const { rentId } = req.body
        const rentItem = await Rent.findById(rentId)
        
        if (!rentItem) {
            return res.json({success: false, message: "Rent item not found"})
        }
        
        res.json({success: true, rentItem})
    } catch(error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

//update rent item availability
const updateAvailability = async(req, res) => {
    try {
        const { id, isAvailable } = req.body
        
        await Rent.findByIdAndUpdate(id, {
            isAvailable: isAvailable
        })
        
        res.json({success: true, message: "Availability Updated Successfully"})
        
    } catch(error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

//update rent item
const updateRent = async(req, res) => {
    try {
        const { id, rentType, itemName, ownerName, contact, price, description } = req.body;
        
        let updateData = {
            rentType,
            itemName,
            ownerName,
            contact,
            price: Number(price),
            description
        }

        // Handle image update if new image is provided
        const image = req.files.itemImage && req.files.itemImage[0]
        
        if (image) {
            const result = await cloudinary.uploader.upload(image.path, {
                resource_type: 'image'
            });
            updateData.itemImage = result.secure_url;
        }

        const updatedRent = await Rent.findByIdAndUpdate(id, updateData, {new: true})
        
        if (!updatedRent) {
            return res.json({success: false, message: "Rent item not found"})
        }
        
        res.json({success: true, message: "Rent Item Updated Successfully", rentItem: updatedRent})
        
    } catch(error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

export { 
    addRent, 
    listRent, 
    listAvailableRent, 
    listRentByCategory, 
    removeRent, 
    singleRent, 
    updateAvailability, 
    updateRent 
}