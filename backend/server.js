import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoutes.js';
import boardingRouter from './routes/boardingRoute.js';
import taxiRouter from './routes/taxiRoute.js';
import shopRouter from './routes/shopRoute.js';
import skillRouter from './routes/skillRoutes.js';
import medicareRouter from './routes/medicareRoutes.js';
import adRouter from './routes/adRoute.js'; // Uncomment if you want to use ad routes


//import routes

const app = express();
const port = process.env.PORT || 4000;
connectDB()
connectCloudinary()

app.use(express.json())
app.use(cors())

//api endpoints
app.use('/api/user', userRouter)
app.use('/api/boarding', boardingRouter)
app.use('/api/taxi', taxiRouter)
app.use('/api/shop', shopRouter)
<<<<<<< Updated upstream
//app.use('/api/renting', rentingRouter)
=======
>>>>>>> Stashed changes
app.use('/api/skill', skillRouter);
app.use('/api/medicare', medicareRouter);
app.use('/api/ad', adRouter);

app.get('/', (req, res) => {
    res.send('API Working')

})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

