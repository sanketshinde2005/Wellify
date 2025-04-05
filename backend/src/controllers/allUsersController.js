import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";

export const getAllUsers = async (req, res) => {
  try {
    const loggedUserId = req.User?.id;

    if (!loggedUserId) {
        console.error("Logged user ID not found in request:", req.User);
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const loggedInUser = await User.findById(loggedUserId);
    if (!loggedInUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const allUsers = await User.find({ _id: { $ne: loggedUserId } }).select("-password");

    if (!allUsers || allUsers.length === 0) {
      return res.status(404).json({ message: "No colleagues found" });
    }

    res.status(200).json(allUsers);
  } catch (error) {
    console.error("Error in getAllUsers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
