import mongoose from "mongoose";

const boardingSchema=new mongoose.Schema({
    Title:{type:String,required:true},
    owner:{type:String,required:true},
    price:{type:Number,required:true},
    image:{type:Array,required:true},
    Rooms:{type:String,required:true},
    bathRooms:{type:String,required:true},
    gender:{type:Array,required:true},
    date:{type:Number,required:true},
    address:{type:String,required:true},
    description:{type:String,required:true},
   
})

const boardingModel =mongoose.models.boarding || mongoose.model('boarding',boardingSchema)

export default boardingModel;