import express from 'express';
import { addSkill, listSkills, removeSkill, singleSkill } from '../controllers/SkillController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const skillRouter = express.Router();

skillRouter.post('/add', adminAuth, upload.fields([{ name: 'image' }]), addSkill);
skillRouter.get('/list', listSkills);
skillRouter.post('/remove', adminAuth, removeSkill);
skillRouter.post('/single', singleSkill);

export default skillRouter;
