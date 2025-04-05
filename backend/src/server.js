import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoute.js';
import cookeyParser from 'cookie-parser';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
app.use(cookeyParser());
app.use(express.json());
connectDB(); app.use(cors({
    // origin: [
    //     process.env.FRONTEND_URL || "http://localhost:5173",
    //     `http://${IP_ADDRESS}:5173`,  // Fix the incorrect `/`
    // ],
    // credentials: true, // Allow cookies & authentication
}));

// Routes

app.use('/api/auth', authRouter);
app.get('/', (req, res) => {
    res.send('🔥 BOSS, your Wellify server is alive and connected!');
});

// Start Server
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    // connectDB();
});
