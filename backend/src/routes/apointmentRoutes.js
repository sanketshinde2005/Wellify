import express from "express";
import { signup, login, updateProfile, logout, checkAuth, deleteUser } from "../controllers/authController.js";
import { protectroute } from "../middleware/auth.middleware.js";
