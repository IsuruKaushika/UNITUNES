const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const colors  = require('colors');
const morgan = require('morgan');
const connectDB = require('./config/db');
userRoutes = require('./routes/userRoutes');

dotenv.config();

connectDB();

const app= express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1/auth', require('./routes/userRoutes'));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.bgCyan.white);
});