import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/mongodb.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('🔥 BOSS, your Wellify server is alive and connected!');
});

// Start Server
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    // connectDB();
});
