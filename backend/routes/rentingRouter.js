import express from "express";
import { 
    addRent, 
    listRent, 
    listAvailableRent, 
    listRentByCategory, 
    removeRent, 
    singleRent, 
    updateAvailability, 
    updateRent 
} from "../controllers/RentController.js";
import upload from "../middleware/multer.js";

const rentRouter = express.Router();

// Add new rent item (with image upload)
rentRouter.post('/add', upload.fields([{name: 'itemImage', maxCount: 1}]), addRent);

// Get all rent items
rentRouter.get('/list', listRent);

// Get only available rent items
rentRouter.get('/available', listAvailableRent);

// Get rent items by category
rentRouter.get('/category/:category', listRentByCategory);

// Get single rent item details
rentRouter.post('/single', singleRent);

// Remove rent item
rentRouter.post('/remove', removeRent);

// Update rent item availability
rentRouter.post('/availability', updateAvailability);

// Update rent item (with optional image upload)
rentRouter.post('/update', upload.fields([{name: 'itemImage', maxCount: 1}]), updateRent);

export default rentRouter;