import express from "express";
import { 
    addSkill, 
    listSkill, 
    listActiveSkill, 
    listSkillByCategory, 
    listSkillByExperience,
    removeSkill, 
    singleSkill, 
    updateSkillStatus, 
    updateSkill 
} from "../controllers/SkillController.js";
import upload from "../middleware/multer.js";

const skillRouter = express.Router();

// Add new skill (with up to 4 images)
skillRouter.post('/add', upload.fields([
    {name: 'image1', maxCount: 1},
    {name: 'image2', maxCount: 1},
    {name: 'image3', maxCount: 1},
    {name: 'image4', maxCount: 1}
]), addSkill);

// Get all skills
skillRouter.get('/list', listSkill);

// Get only active skills
skillRouter.get('/list-active', listActiveSkill);

// Get skills by category
skillRouter.get('/category/:category', listSkillByCategory);

// Get skills by experience level
skillRouter.get('/experience/:level', listSkillByExperience);

// Get single skill details
skillRouter.post('/single', singleSkill);

// Remove skill
skillRouter.post('/remove', removeSkill);

// Update skill status (active/inactive)
skillRouter.post('/status', updateSkillStatus);

// Update skill (with optional image upload)
skillRouter.post('/update', upload.fields([
    {name: 'image1', maxCount: 1},
    {name: 'image2', maxCount: 1},
    {name: 'image3', maxCount: 1},
    {name: 'image4', maxCount: 1}
]), updateSkill);

export default skillRouter;