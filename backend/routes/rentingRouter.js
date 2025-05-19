import express from "express";
import { addRenting, listRenting, removeRenting, singleRenting } from "./controllers/rentingController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const rentingRouter = express.Router();

rentingRouter.post('/add', adminAuth, upload.fields([{ name: 'image' }]), addRenting);
rentingRouter.get('/list', listRenting);
rentingRouter.post('/remove', adminAuth, removeRenting);
rentingRouter.post('/single', singleRenting);

export default rentingRouter;
