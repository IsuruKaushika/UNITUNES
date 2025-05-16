import express from 'express';
import { addRenting, listRenting, removeRenting, singleRenting } from '../controllers/RentingController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const rentingRouter = express.Router();

rentingRouter.post('/add', adminAuth, upload.fields([{ name: 'image' }]), addRenting);
rentingRouter.post('/remove', adminAuth, removeRenting);
rentingRouter.post('/single', singleRenting);
rentingRouter.get('/list', listRenting);

export default rentingRouter;
