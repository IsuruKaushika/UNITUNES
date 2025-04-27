import {v2 as cloudinary} from "cloudinary"
import VehicleModel from "../models/vehicleModel.js"

//add product
const addVehicle =async(req,res)=>{
    try{
       const{Title,description,price,Rooms,bathRooms,owner,address,contact,gender} =req.body;

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1,image2,image3,image4].filter((item)=> item !==undefined)

        let imagesUrl =await Promise.all(
            images.map(async (item)=>{
                let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'});
                return result.secure_url;

            })
        )
       

        const boardingData = {
            Title,
            owner,
            address,
            contact,
            description,
            price :Number(price),
            Rooms,
            bathRooms,
            //gender:JSON.parse(sizes),
            image:imagesUrl,
            gender,
            date:Date.now()
        }
        console.log(boardingData)

        const boarding =new boardingModel(boardingData)
        await boarding.save()

        res.json({success:true,message:"Boarding Added Successfully"})


    }
    catch(error){
        
        
        res.json({success:false,message:error.message})
    }

}

//list product
const listBoarding =async(req,res)=>{
    try{
        const products =await boardingModel.find({})
        res.json({success:true,products})
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }

}

//function remove Product
const removeBoarding =async(req,res)=>{
    try{
        await  boardingModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Boarding Deleted Successfully"})
        
    }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }

}

//single product info
const singleBoarding =async(req,res)=>{
    try{
        const {boardingId} =req.body
        const boarding =await boardingModel.findById(boardingId)
        res.json({success:true,boarding})
    }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }

}

export{singleBoarding,removeBoarding,listBoarding,addBoarding}