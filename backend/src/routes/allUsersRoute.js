import express from "express";
// import { getAllDoctors } from "../controllers/allUsersController.js";
import { protectroute } from "../middleware/auth.middleware.js";
import User from "../models/UserModel.js";

const allUsersRoute = express.Router();

// signup route
// allUsersRoute.use(protectroute);
allUsersRoute.get("/doctors", async (req, res) => {
    try {
        // Find users with profession as "doctor"
        const doctors = await User.find({ proffession: "doctor" });
        // console.log(typeof doctors);
        
        res.status(200).json(doctors);
    } catch (error) {
        console.error("Error fetching doctors:", error);
        res.status(500).json({ message: "Failed to fetch doctors", error: error.message });
    }
});

// allUsersRoute.post("/", protectroute, getAllDoctors);

export default allUsersRoute;