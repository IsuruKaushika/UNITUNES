const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async () => {
  try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB Connected to ${mongoose.connection.host}`.bgGreen.white);
  } catch (error) {
        console.log(`Error: ${error.message}`.red.underline.bold);
  }
};

module.exports = connectDB;