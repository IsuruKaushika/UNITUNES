import express from 'express';
import { addShop, removeShop, singleShop, listShop } from '../controllers/ShopController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';
const shopRouter = express.Router();

shopRouter.post('/add',adminAuth,upload.fields([{name:'image'}]),addShop);
shopRouter.post('/remove',adminAuth,removeShop);
shopRouter.post('/single',singleShop);
shopRouter.get('/list',listShop);

export default shopRouter;