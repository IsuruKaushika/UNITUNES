import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  skillType: { type: String, required: true },
  studentName: { type: String, required: true },
  contact: { type: String, required: true },
  moreDetails: { type: String, required: true },
  image: { type: Array },
  date: { type: Date, default: Date.now }
});

const skillModel = mongoose.models.skill || mongoose.model("skill", skillSchema);
export default skillModel;
