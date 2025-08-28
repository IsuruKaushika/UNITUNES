import mongoose from "mongoose";

const userBoardingSchema = new mongoose.Schema({
    Title: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // link to User
    price: { type: Number, required: true },
    image: { type: Array, required: true },
    Rooms: { type: String, required: true },
    bathRooms: { type: String, required: true },
    gender: { type: Array, required: true },
    date: { type: Number, required: true },
    address: { type: String, required: true },
    description: { type: String, required: true },
    contact: { type: String, required: true },
});

const UserBoardingModel =
  mongoose.models.UserBoarding || mongoose.model("UserBoarding", userBoardingSchema);

export default UserBoardingModel;
