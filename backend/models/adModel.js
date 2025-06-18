import mongoose from "mongoose";

const adSchema=new mongoose.Schema({
   
    name:{type:String},
    image:{type:Array},
    address:{type:String,required:true},
    description:{type:String,required:true} 
})

const adModel =mongoose.models.ad || mongoose.model('ad',adSchema)


export default adModel;