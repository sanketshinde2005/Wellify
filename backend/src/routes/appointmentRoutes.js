import express from "express";
import { getAllUsers } from "../controllers/allUsersController.js";
import { protectroute } from "../middleware/auth.middleware.js";

const appoitmentRoute = express.Router();

// signup route
appoitmentRoute.post("/allusers", protectroute, getAllUsers);

export default appoitmentRoute;