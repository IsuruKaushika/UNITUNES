import express from 'express';
import { addAd, removeAd, singleAd, listAds } from '../controllers/adController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';
const adRouter = express.Router();

adRouter.post('/add',adminAuth,upload.fields([{name:'image'}]),addAd);
adRouter.post('/remove',adminAuth,removeAd);
adRouter.post('/single',singleAd);
adRouter.get('/list',listAds);

export default adRouter;