import User from "../models/UserModel.js";

export const getAllDoctors = async (req, res) => {
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

    const allDoctors = await User.find({
      _id: { $ne: loggedUserId },
      proffession: "doctor",
    }).select("-password");

    if (!allDoctors || allDoctors.length === 0) {
      return res.status(404).json({ message: "No doctors found" });
    }

    res.status(200).json(allDoctors);
  } catch (error) {
    console.error("Error in getAllDoctors:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
