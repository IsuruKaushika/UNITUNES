import {v2 as cloudinary} from "cloudinary"
import skillModel from "../models/skillModel.js"

//add skill
const addSkill = async(req, res) => {
    try {
        const { skillType, studentName, contact, moreDetails, experience, location, price } = req.body;

        // Handle multiple images (up to 4)
        const images = [];
        
        // Check for images in req.files
        if (req.files) {
            // Get images from different possible field names
            const imageFields = ['image1', 'image2', 'image3', 'image4'];
            
            imageFields.forEach(field => {
                if (req.files[field] && req.files[field][0]) {
                    images.push(req.files[field][0]);
                }
            });
        }

        // Upload images to cloudinary
        let imagesUrl = [];
        if (images.length > 0) {
            imagesUrl = await Promise.all(
                images.map(async (item) => {
                    let result = await cloudinary.uploader.upload(item.path, {
                        resource_type: 'image'
                    });
                    return result.secure_url;
                })
            );
        }

        const skillData = {
            skillType,
            studentName,
            contact,
            moreDetails,
            experience: experience || 'Beginner',
            location: location || '',
            price: Number(price) || 0,
            images: imagesUrl,
            isActive: true
        }

        console.log(skillData)

        const skill = new skillModel(skillData)
        await skill.save()

        res.json({success: true, message: "Skill Added Successfully"})

    } catch(error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

//list all skills
const listSkill = async(req, res) => {
    try {
        const skills = await skillModel.find({})
        res.json({success: true, skills})
    } catch(error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

//list active skills only
const listActiveSkill = async(req, res) => {
    try {
        const skills = await skillModel.find({isActive: true})
        res.json({success: true, skills})
    } catch(error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

//list skills by category
const listSkillByCategory = async(req, res) => {
    try {
        const { category } = req.params;
        const skills = await skillModel.find({
            skillType: category,
            isActive: true
        })
        res.json({success: true, skills})
    } catch(error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

//list skills by experience level
const listSkillByExperience = async(req, res) => {
    try {
        const { level } = req.params;
        const skills = await skillModel.find({
            experience: level,
            isActive: true
        })
        res.json({success: true, skills})
    } catch(error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

//remove skill
const removeSkill = async(req, res) => {
    try {
        await skillModel.findByIdAndDelete(req.body.id)
        res.json({success: true, message: "Skill Deleted Successfully"})
        
    } catch(error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

//single skill info
const singleSkill = async(req, res) => {
    try {
        const { skillId } = req.body
        const skill = await skillModel.findById(skillId)
        
        if (!skill) {
            return res.json({success: false, message: "Skill not found"})
        }
        
        res.json({success: true, skill})
    } catch(error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

//update skill status
const updateSkillStatus = async(req, res) => {
    try {
        const { id, isActive } = req.body
        
        await skillModel.findByIdAndUpdate(id, {
            isActive: isActive
        })
        
        res.json({success: true, message: "Skill Status Updated Successfully"})
        
    } catch(error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

//update skill
const updateSkill = async(req, res) => {
    try {
        const { id, skillType, studentName, contact, moreDetails, experience, location, price } = req.body;
        
        let updateData = {
            skillType,
            studentName,
            contact,
            moreDetails,
            experience: experience || 'Beginner',
            location: location || '',
            price: Number(price) || 0
        }

        // Handle image updates if new images are provided
        const images = [];
        
        if (req.files) {
            const imageFields = ['image1', 'image2', 'image3', 'image4'];
            
            imageFields.forEach(field => {
                if (req.files[field] && req.files[field][0]) {
                    images.push(req.files[field][0]);
                }
            });
        }

        // Upload new images to cloudinary if provided
        if (images.length > 0) {
            const imagesUrl = await Promise.all(
                images.map(async (item) => {
                    let result = await cloudinary.uploader.upload(item.path, {
                        resource_type: 'image'
                    });
                    return result.secure_url;
                })
            );
            updateData.images = imagesUrl;
        }

        const updatedSkill = await skillModel.findByIdAndUpdate(id, updateData, {new: true})
        
        if (!updatedSkill) {
            return res.json({success: false, message: "Skill not found"})
        }
        
        res.json({success: true, message: "Skill Updated Successfully", skill: updatedSkill})
        
    } catch(error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

export { 
    addSkill, 
    listSkill, 
    listActiveSkill, 
    listSkillByCategory, 
    listSkillByExperience,
    removeSkill, 
    singleSkill, 
    updateSkillStatus, 
    updateSkill 
}