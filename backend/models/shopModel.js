import mongoose from "mongoose";

const shopSchema=new mongoose.Schema({
   
    name:{type:String},
    image:{type:Array},
    Category:{type:String,required:true},
    address:{type:String,required:true},
    description:{type:String,required:true},
    contact:{type:String,required:true},
   
})

const shopModel =mongoose.models.shop || mongoose.model('shop',shopSchema)

export default shopModel;