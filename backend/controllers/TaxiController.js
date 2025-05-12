import {v2 as cloudinary} from "cloudinary"
import taxiModel from "../models/taxiModel.js"

//add product
const addTaxi =async(req,res)=>{
    try{
       const{owner,price,Category,address,description,contact,vehicleNo} =req.body;

        const image = req.files.image && req.files.image[0]
    

        const images = [image].filter((item)=> item !==undefined)

        let imagesUrl =await Promise.all(
            images.map(async (item)=>{
                let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'});
                return result.secure_url;

            })
        )
       

        const taxiData = {
            owner,
            address,
            contact,
            description,
            price :Number(price),
            Category,
            image:imagesUrl,
            date:Date.now(),
            vehicleNo,
        }
        console.log(taxiData)

        const taxi =new taxiModel(taxiData)
        await taxi.save()

        res.json({success:true,message:"taxi Added Successfully"})


    }
    catch(error){
        
        
        res.json({success:false,message:error.message})
    }

}

//list product
const listTaxi =async(req,res)=>{
    try{
        const products =await taxiModel.find({})
        res.json({success:true,products})
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }

}

//function remove Product
const removeTaxi =async(req,res)=>{
    try{
        await  taxiModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Taxi Deleted Successfully"})
        
    }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }

}

//single product info
const singleTaxi =async(req,res)=>{
    try{
        const {taxiId} =req.body
        const taxi =await taxiModel.findById(taxiId)
        res.json({success:true,taxi})
    }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }

}

export{singleTaxi,removeTaxi,listTaxi,addTaxi}