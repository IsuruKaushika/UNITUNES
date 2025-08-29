import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true,unique:true },
  password: { type: String, required: true },
  cartData: { type: Object, default: {} },
 
})

const studentModel = mongoose.models.student || mongoose.model('Student',studentSchema)

export default studentModel;