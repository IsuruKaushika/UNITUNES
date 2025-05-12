import mongoose from "mongoose";

const taxiSchema=new mongoose.Schema({
   
    owner:{type:String},
    price:{type:Number,required:true},
    image:{type:Array},
    Category:{type:String,required:true},
    address:{type:String,required:true},
    description:{type:String,required:true},
    contact:{type:String,required:true},
    vehicleNo:{type:String,required:true},
   
})

const taxiModel =mongoose.models.taxi || mongoose.model('taxi',taxiSchema)

export default taxiModel;