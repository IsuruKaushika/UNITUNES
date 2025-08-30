import express from 'express';
import { 
  singleBoarding, 
  removeBoarding, 
  listBoarding, 
  addBoarding, 
  listMyBoardings, 
  updateBoarding 
} from '../controllers/BoardingController.js';
import adminAuth from '../middleware/adminAuth.js';
import authStudent from '../middleware/studentAuth.js';
import authServiceProvider from '../middleware/serviceProviderAuth.js';
import upload from '../middleware/multer.js'; // Assuming you have multer setup

const boardingRouter = express.Router();

// Public routes (no auth required)
boardingRouter.get('/list', listBoarding); // Get all boardings
boardingRouter.post('/single', singleBoarding); // Get single boarding details

// Admin routes (can handle both legacy and new records)
boardingRouter.post('/add', adminAuth, upload.fields([
  { name: 'image1', maxCount: 1 }, 
  { name: 'image2', maxCount: 1 }, 
  { name: 'image3', maxCount: 1 }, 
  { name: 'image4', maxCount: 1 }
]), addBoarding); // Keep original route for backward compatibility

boardingRouter.post('/remove', adminAuth, removeBoarding); // Keep original route for backward compatibility

boardingRouter.post('/add-admin', adminAuth, upload.fields([
  { name: 'image1', maxCount: 1 }, 
  { name: 'image2', maxCount: 1 }, 
  { name: 'image3', maxCount: 1 }, 
  { name: 'image4', maxCount: 1 }
]), addBoarding);

boardingRouter.post('/remove-admin', adminAuth, removeBoarding);
boardingRouter.post('/update-admin', adminAuth, upload.fields([
  { name: 'image1', maxCount: 1 }, 
  { name: 'image2', maxCount: 1 }, 
  { name: 'image3', maxCount: 1 }, 
  { name: 'image4', maxCount: 1 }
]), updateBoarding);
boardingRouter.get('/my-boardings-admin', adminAuth, listMyBoardings);

// Student routes
boardingRouter.post('/add-student', authStudent, upload.fields([
  { name: 'image1', maxCount: 1 }, 
  { name: 'image2', maxCount: 1 }, 
  { name: 'image3', maxCount: 1 }, 
  { name: 'image4', maxCount: 1 }
]), addBoarding);

boardingRouter.post('/remove-student', authStudent, removeBoarding);
boardingRouter.post('/update-student', authStudent, upload.fields([
  { name: 'image1', maxCount: 1 }, 
  { name: 'image2', maxCount: 1 }, 
  { name: 'image3', maxCount: 1 }, 
  { name: 'image4', maxCount: 1 }
]), updateBoarding);
boardingRouter.get('/my-boardings-student', authStudent, listMyBoardings);

// Service Provider routes
boardingRouter.post('/add-service-provider', authServiceProvider, upload.fields([
  { name: 'image1', maxCount: 1 }, 
  { name: 'image2', maxCount: 1 }, 
  { name: 'image3', maxCount: 1 }, 
  { name: 'image4', maxCount: 1 }
]), addBoarding);

boardingRouter.post('/remove-service-provider', authServiceProvider, removeBoarding);
boardingRouter.post('/update-service-provider', authServiceProvider, upload.fields([
  { name: 'image1', maxCount: 1 }, 
  { name: 'image2', maxCount: 1 }, 
  { name: 'image3', maxCount: 1 }, 
  { name: 'image4', maxCount: 1 }
]), updateBoarding);
boardingRouter.get('/my-boardings-service-provider', authServiceProvider, listMyBoardings);

export default boardingRouter;