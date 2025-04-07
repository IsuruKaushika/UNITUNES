import express from 'express';
import {addBoarding, removeBoarding, singleBoarding, listBoarding} from '../controllers/BoardingController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';
const boardingRouter = express.Router();

boardingRouter.post('/add',adminAuth,upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]),addBoarding);
boardingRouter.post('/remove',adminAuth,removeBoarding);
boardingRouter.post('/single',singleBoarding);
boardingRouter.get('/list',listBoarding);

export default boardingRouter;