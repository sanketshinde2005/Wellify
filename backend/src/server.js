import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/mongodb.js';
import cookieParser from 'cookie-parser';

import authRouter from './routes/authRoute.js'; // ✅ now it's included
import allUsersRoute from './routes/allUsersRoute.js';
import appointmentRoute from './routes/appointmentRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
}));

// Routes
app.use('/api/auth', authRouter);
app.use('/api/users', allUsersRoute);
app.use('/api/appointments', appointmentRoute);

// Start Server
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
