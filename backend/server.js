import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';

// Routers
import userRouter from './routes/userRoutes.js';
import boardingRouter from './routes/boardingRoute.js';
import taxiRouter from './routes/taxiRoute.js';
import shopRouter from './routes/shopRoute.js';
import skillRouter from './routes/skillRoutes.js';
import Medicalrouter from './routes/medicareRoute.js';
import adRouter from './routes/adRoute.js';
import Pharmacyrouter from './routes/pharmacyRoute.js';
import rentingRouter from './routes/rentingRouter.js';
import rentRouter from './routes/rentingRouter.js'; // Same as rentingRouter
import userBoardingRouter from './routes/userBoardingRoutes.js'; // ✅ New user boarding routes

const app = express();
const port = process.env.PORT || 4000;

// Connect to DB and Cloudinary
connectDB();
connectCloudinary();

app.use(express.json());
app.use(cors());

// API endpoints
app.use('/api/user', userRouter);
app.use('/api/boarding', boardingRouter); // Admin boarding
app.use('/api/user-boarding', userBoardingRouter); // ✅ User boarding
app.use('/api/taxi', taxiRouter);
app.use('/api/shop', shopRouter);
app.use('/api/rent', rentRouter); // New rent router
app.use('/api/renting', rentingRouter); // Keep existing renting router if needed
app.use('/api/skillshare', skillRouter);
app.use('/api/medicare', Medicalrouter);
app.use('/api/pharmacy', Pharmacyrouter);
app.use('/api/ad', adRouter);

// Root endpoint
app.get('/', (req, res) => {
  res.send('API Working');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
