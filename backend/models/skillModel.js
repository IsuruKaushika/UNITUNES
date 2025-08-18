import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  skillType: { 
    type: String, 
    required: true,
    enum: ['Programming', 'Design', 'Music', 'Sports', 'Cooking', 'Language', 'Academic', 'Art', 'Photography', 'Other'],
    trim: true
  },
  studentName: { 
    type: String, 
    required: true,
    trim: true
  },
  contact: { 
    type: String, 
    required: true,
    trim: true
  },
  moreDetails: { 
    type: String, 
    required: true,
    trim: true
  },
  images: { 
    type: [String], // Array of image URLs
    validate: {
      validator: function(v) {
        return v.length <= 4; // Maximum 4 images
      },
      message: 'Maximum 4 images allowed'
    },
    default: []
  },
  isActive: {
    type: Boolean,
    default: true
  },
  experience: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
    default: 'Beginner'
  },
  location: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    min: 0,
    default: 0
  }
}, { 
  timestamps: true // This adds createdAt and updatedAt automatically
});

// Add indexes for better query performance
skillSchema.index({ skillType: 1 });
skillSchema.index({ isActive: 1 });
skillSchema.index({ createdAt: -1 });
skillSchema.index({ experience: 1 });

const skillModel = mongoose.models.skill || mongoose.model("skill", skillSchema);
export default skillModel;