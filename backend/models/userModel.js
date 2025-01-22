const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({ 
    name: {
        type: String,
        required: [true, "Please enter your name"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        min: 6,
        max: 64,
    },
    phone: {
        type: String,
        required: [true, "Please enter your phone number"],
    },
    address: {
        type: String,
        required: true
    },
 
    role: {
        type: Number,
        default: 0 // 0 for regular users, 1 for admin, etc.
    },
    userType: {
        type: String,
        enum: ['Student', 'BoardingOwner'], // Define allowed user types
        required: [true, "Please specify the user type"]
    },
    identificationNumber: {
        type: String,
        required: [true, "Please enter an ID number or student ID"],
        validate: {
            validator: function(value) {
                // Validation logic based on userType
                if (this.userType === 'Student') {
                    return value.length ==10 ; // Example: Student IDs must be  10 characters
                }
                if (this.userType === 'BoardingOwner') {
                    return value.length === 10 || value.length === 12; // Boarding owner IDs must be 10 or 12 characters
                }
                return false; // If userType is neither 'Student' nor 'BoardingOwner', validation fails
            },
            message: "Invalid identification number format for the specified user type"
        }
    }
    
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
