import express from 'express';
import {addTaxi, removeTaxi, singleTaxi, listTaxi} from '../controllers/TaxiController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';
const taxiRouter = express.Router();

taxiRouter.post('/add',adminAuth,upload.fields([{name:'image'}]),addTaxi);
taxiRouter.post('/remove',adminAuth,removeTaxi);
taxiRouter.post('/single',singleTaxi);
taxiRouter.get('/list',listTaxi);

export default taxiRouter;