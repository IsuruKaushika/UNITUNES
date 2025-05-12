import {v2 as cloudinary} from "cloudinary"
import shopModel from "../models/shopModel.js"

//add product
const addShop =async(req,res)=>{
    try{
       const{name,Category,address,description,contact} =req.body;

        const image = req.files.image && req.files.image[0]
    

        const images = [image].filter((item)=> item !==undefined)

        let imagesUrl =await Promise.all(
            images.map(async (item)=>{
                let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'});
                return result.secure_url;

            })
        )
       

        const shopData = {
            name,
            address,
            contact,
            description,
            Category,
            image:imagesUrl,
            date:Date.now(),
        }
        console.log(shopData)

        const shop =new shopModel(shopData)
        await shop.save()

        res.json({success:true,message:"Shop Added Successfully"})


    }
    catch(error){
        
        
        res.json({success:false,message:error.message})
    }

}

//list product
const listShop =async(req,res)=>{
    try{
        const products =await shopModel.find({})
        res.json({success:true,products})
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }

}

//function remove Product
const removeShop =async(req,res)=>{
    try{
        await  shopModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"shop Deleted Successfully"})
        
    }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }

}

//single product info
const singleShop =async(req,res)=>{
    try{
        const {shopId} =req.body
        const shop =await shopModel.findById(shopId)
        res.json({success:true,shop})
    }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }

}

export{singleShop,removeShop,listShop,addShop}