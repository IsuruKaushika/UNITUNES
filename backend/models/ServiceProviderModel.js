import mongoose from "mongoose";

const serviceProviderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true,unique:true },
  password: { type: String, required: true },
  
 
})

const serviceProviderModel = mongoose.models.serviceProvider || mongoose.model('ServiceProvider',serviceProviderSchema)

export default serviceProviderModel;