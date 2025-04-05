import express from "express";
import { signup, login, updateProfile, logout, checkAuth, deleteUser } from "../controllers/authController.js";
import { protectroute } from "../middleware/auth.middleware.js";

const authRouter = express.Router();

// signup route
authRouter.post("/signup", signup);

// Login route
authRouter.post("/login", login);

// Logout route
authRouter.post("/logout", logout);

// Profile route
authRouter.get("/check", protectroute, checkAuth);

authRouter.delete("/delete", protectroute, deleteUser);

// Update profile route
authRouter.put("/update", protectroute, updateProfile);


export default authRouter;