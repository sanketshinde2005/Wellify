import bcrypt from "bcryptjs"
import cloudinary from "../config/cloudinary.js"
import { generateToken } from "../lib/utils.js";
import User from "../models/UserModel.js"
import Doctor from "../models/Doctor.js"

export const signup = async (req, res) => {
    // res.send("signup route");

    const { fullName, email, password, mobilenum } = req.body

    try {
        if (!fullName || !email || !password || !mobilenum) {
            return res.status(400).json({
                message: "All Fields are Required"
            })
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 charachters " });
        }

        // checking if user exist elready
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // hashing password here
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            mobilenum,
            fullName,
            email,
            password: hashedPassword
        })

        if (newUser) {
            // generate jwt token here main function in utils.js
            generateToken(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                mobilenum: newUser.mobilenum,
                profilePic: newUser.profilePic,
            });
        }

        else {
            res.status(400).json({ message: "Invalid existingUser data" })
        }
    } catch (error) {
        console.log("error in signup controller function", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Invalid Credentials"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({
                message: "Invalid Credentials"
            });
        }

        generateToken(user._id, res);

        const { password: _, ...userWithoutPassword } = user.toObject();
        res.status(200).json(userWithoutPassword);

    } catch (error) {
        console.log("Error in login controller function:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


export const logout = (req, res) => {
    // res.send("logout route");
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged Out Successfully" });
    } catch (error) {
        console.log("Error in Logout Controller")
        res.status(500).json({ message: "Internal Server Error " });
    }
};


export const updateProfile = async (req, res) => {
    try {
        const userId = req.User._id;
        if (!userId) {
            return res.status(400).json({ message: "User not found" });
        }

        // Extract fields from request
        const { fullName, currentPassword, newPassword, email } = req.body;

        // 
        const curr_user = await User.findById(userId);
        let updatedFields = [];
        if (fullName) updatedFields.fullName = fullName;
        if (mobilenumber) updatedFields.mobilenum = mobilenumber;
        if (email) updatedFields.email = email;

        if (currentPassword && newPassword && currentPassword !== newPassword) {
            const isMatch = await bcrypt.compare(currentPassword, curr_user.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Current password is incorrect" });
            }
            const salt = await bcrypt.genSalt(10);
            updatedFields.password = await bcrypt.hash(newPassword, salt);
        }
        // Update user only with provided fields
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: updatedFields },
            { new: true }
        );

        res.status(200).json(updatedUser);
    } catch (error) {
        console.log("Error in Update Profile Controller:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


export const checkAuth = (req, res) => {
    try {
        // console.log(req.User)
        if (!req.User) {
            return res.status(401).json({ message: "Unauthorized: No user data found" });
        }
        res.status(200).json(req.User);
    } catch (error) {
        console.error("Error in checkAuth controller:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const deleteSrJruser = async (req, res) => {
    try {
        // const { email } = req.body

        const userId = req.User.id;
        const deletedUser = await User.findByIdAndDelete(userId)

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });

    } catch (error) {
        console.error("Error in deleting user:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
