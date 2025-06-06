import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

export const protectroute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No Token Provided" });
        }
        // console.log("Token:", token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // console.log("Token:", process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized - Invalid Token" });
        }

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }

        req.User = user;
        next();
    } catch (error) {
        console.log("Error in ProtectRoute middleware:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
