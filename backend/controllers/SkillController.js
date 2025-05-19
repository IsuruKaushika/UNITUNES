import { v2 as cloudinary } from "cloudinary";
import skillModel from "../models/skillModel.js";

// Add Skill
const addSkill = async (req, res) => {
  try {
    const { skillType, studentName, contact, moreDetails } = req.body;
    const image = req.files.image && req.files.image[0];
    const images = [image].filter((item) => item !== undefined);

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, { resource_type: "image" });
        return result.secure_url;
      })
    );

    const skillData = {
      skillType,
      studentName,
      contact,
      moreDetails,
      image: imagesUrl,
    };

    const skill = new skillModel(skillData);
    await skill.save();
    res.json({ success: true, message: "Skill shared successfully" });

  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// List all skills
const listSkills = async (req, res) => {
  try {
    const skills = await skillModel.find({});
    res.json({ success: true, skills });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Remove skill
const removeSkill = async (req, res) => {
  try {
    await skillModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Skill deleted successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Single skill details
const singleSkill = async (req, res) => {
  try {
    const { skillId } = req.body;
    const skill = await skillModel.findById(skillId);
    res.json({ success: true, skill });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { addSkill, listSkills, removeSkill, singleSkill };
