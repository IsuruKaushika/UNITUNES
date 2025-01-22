const JWT = require('jsonwebtoken');
const userModel = require('../models/userModel');
const {hashPassword, comparePassword} = require('../helpers/authHelper');






const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, userType, identificationNumber } = req.body;
        //validation
        if(!name){
            return res.status(400).send({
                success: false,
                message: "Name is required"
            })

        }
        if(!email){
            return res.status(400).send({
                success: false,
                message: "Email is required"
            })
        }
        if(!password || password.length < 6){
            return res.status(400).send({
                success: false,
                message: "Password is required"
            })
        }   
        if(!phone){
            return res.status(400).send({
                success: false,
                message: "Phone is required"
            })
        }
        if(!address){
            return res.status(400).send({
                success: false,
                message: "Address is required"
            })
        }
      
        if(!userType){
            return res.status(400).send({
                success: false,
                message: "User type is required"
            })
        }
        if(!identificationNumber || (identificationNumber.length !==10 && identificationNumber.length !==12) ){
            return res.status(400).send({
                success: false,
                message: "Identification number is required"
            })
        }

        const existingUser = await userModel.findOne({
            $or: [{ email }, { identificationNumber }]
        });
        
        if (existingUser) {
            return res.status(400).send({
                success: false,
                message: "User with the same email or identification number already exists"
            });
        }
        //hashed password
        const hashedPassword = await hashPassword(password);
        

        //save user
       const user = await userModel({
            name,
            email,
            password: hashedPassword,
            phone,
            address,
            userType,
            identificationNumber
        }).save();


        return res.status(201).send({
            success: true,
            message: "User registered successfully"
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Internal server error",
            error,
        })
    }
};
//login
const loginController =async(req,res) => {

    try{
        const {email, password,userType} = req.body;

        //validation
        if(!email || !password){
            return res.status(500).send({
                success: false,
                message: "Email and password are required"
            })
        }
        //find user
        const user = await userModel.findOne({email});
        
        if(!user){
            return res.status(400).send({
                success: false,
                message: "User not found"
            })
        }
     
     
        //match password

        const match = await comparePassword(password, user.password);

        if(!match){
            return res.status(500).send({
                success: false,
                message: "Invalid credentials"
            })
        }
        //generate token
        const token=await JWT.sign({_id:user._id},process.env.JWT_SECRET,{
            expiresIn: '7d'
        });
        //undefined password
        user.password = undefined;
        res.status(200).send({
            success: true,
            message: "Login successful",
            token,
            user,
            
        })

    }catch(error){
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error in Login API",
            error,
        })
    }
};




module.exports = { registerController, loginController };