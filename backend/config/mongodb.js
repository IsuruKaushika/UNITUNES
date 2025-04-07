import mongoose from "mongoose";
import dotenv from 'dotenv'


const connectDB =async () => {
    mongoose.connection.on('connected', () => {
        console.log('Connected to MongoDB')
    })

    await mongoose.connect(`${process.env.MONGODB_URI}/unitunes`)

}

export default connectDB;