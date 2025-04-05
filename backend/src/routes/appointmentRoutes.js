import express from "express";
import { getAllDoctors } from "../controllers/allUsersController.js";
import { protectroute } from "../middleware/auth.middleware.js";

const appoitmentRoute = express.Router();

// signup route
appoitmentRoute.post("/alldoctors", protectroute, getAllDoctors);

// appoitmentRoute.post("/", protectroute, getAllDoctors);

export default appoitmentRoute;