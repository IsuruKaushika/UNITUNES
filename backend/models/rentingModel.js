import mongoose from "mongoose";

const rentSchema = new mongoose.Schema({
  rentType: { 
    type: String, 
    required: true,
    enum: ['Electronics', 'Furniture', 'Tools', 'Books']
  },
  itemName: { 
    type: String, 
    required: true,
    trim: true
  },
  ownerName: { 
    type: String, 
    required: true,
    trim: true
  },
  contact: { 
    type: String, 
    required: true,
    trim: true
  },
  price: { 
    type: Number, 
    required: true,
    min: 0
  },
  description: { 
    type: String, 
    required: true,
    trim: true
  },
  itemImage: { 
    type: String,
    default: ""
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // Make optional if you don't have user authentication
  }
}, { 
  timestamps: true 
});

// Add indexes for better query performance
rentSchema.index({ rentType: 1 });
rentSchema.index({ isAvailable: 1 });
rentSchema.index({ createdAt: -1 });

const Rent = mongoose.models.Rent || mongoose.model("Rent", rentSchema);
export default Rent;