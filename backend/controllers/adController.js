import {v2 as cloudinary} from "cloudinary"
import adModel from "../models/adModel.js"

//add product
const addAd =async(req,res)=>{
    try{
       const{name,address,description} =req.body;

        const image = req.files.image && req.files.image[0]
    

        const images = [image].filter((item)=> item !==undefined)

        let imagesUrl =await Promise.all(
            images.map(async (item)=>{
                let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'});
                return result.secure_url;

            })
        )
       

        const adData = {
            name,
            address,
            description,
            image:imagesUrl,
            date:Date.now(),
        }
        console.log(adData)

        const ad =new adModel(adData)
        await ad.save()

        res.json({success:true,message:"Ad Added Successfully"})


    }
    catch(error){
        
        
        res.json({success:false,message:error.message})
    }

}

//list product
const listAds =async(req,res)=>{
    try{
        const products =await adModel.find({})
        res.json({success:true,products})
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }

}

//function remove Product
const removeAd =async(req,res)=>{
    try{
        await  adModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Ad Deleted Successfully"})

    }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }

}

//single product info
const singleAd =async(req,res)=>{
    try{
        const {adId} =req.body
        const ad =await adModel.findById(adId)
        res.json({success:true,ad})
    }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }

}

export{singleAd,removeAd,listAds,addAd}