import mongoose from "mongoose";

const userBoardingSchema = new mongoose.Schema(
  {
    Title: String,
    address: String,
    contact: String,
    description: String,
    Rooms: String,
    bathRooms: String,
    price: Number,
    gender: [String],
    userId: { type: String, required: true }, // link to the user
    images: [String],
  },
  { timestamps: true }
);

export default mongoose.model("UserBoarding", userBoardingSchema);
