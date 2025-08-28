import express from "express";
import {
  addUserBoarding,
  listUserBoardings,
  deleteUserBoarding,
} from "../controllers/UserBoardingController.js";
import upload from "../middleware/multer.js";

const userBoardingRouter = express.Router();

// Add new boarding by user
userBoardingRouter.post(
  "/add",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addUserBoarding
);

// Get all boardings of a user
userBoardingRouter.get("/list/:userId", listUserBoardings);

// Delete a boarding by ID
userBoardingRouter.delete("/delete/:id", deleteUserBoarding);

export default userBoardingRouter;
