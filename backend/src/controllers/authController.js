import bcrypt from "bcryptjs"
// import cloudinary from "../config/cloudinary.js"
import { generateToken } from "../lib/utils.js";
import User from "../models/UserModel.js"

export const signup = async (req, res) => {
    // res.send("signup route");

    const { fullName, email, password, mobilenum, proffession } = req.body

    try {
        if (!fullName || !email || !password || !mobilenum || !proffession) {
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
            proffession,
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
                proffession: newUser.proffession,
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

        const {
            fullName,
            mobilenum,
            email,
            profilePic,
            clinicAddress,
            qualification,
            specialdegree,
            specialization,
            about,
            experience,
            patientsTreated,
            Medicaldetails,
            currentPassword,
            newPassword,
            age,
            HomeAddress,
        } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found in DB" });
        }

        // Start building update fields
        const updatedFields = {};

        if (fullName) updatedFields.fullName = fullName;
        if (mobilenum) updatedFields.mobilenum = mobilenum;
        if (email) updatedFields.email = email;
        if (profilePic) updatedFields.profilePic = profilePic;
        if (clinicAddress) updatedFields.clinicAddress = clinicAddress;
        if (qualification) updatedFields.qualification = qualification;
        if (specialdegree) updatedFields.specialdegree = specialdegree;
        if (specialization) updatedFields.specialization = specialization;
        if (about) updatedFields.about = about;
        if (experience) updatedFields.experience = experience;
        if (patientsTreated) updatedFields.patientsTreated = patientsTreated;
        if (HomeAddress) updatedFields.HomeAddress = HomeAddress;
        if (age) updatedFields.Medicaldetails = { ...user.Medicaldetails, age };

        // Handle nested medical details
        if (Medicaldetails) {
            updatedFields.Medicaldetails = {
                ...user.Medicaldetails,
                ...Medicaldetails,
            };
        }

        // Handle password change
        if (currentPassword && newPassword) {
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Current password is incorrect" });
            }
            const salt = await bcrypt.genSalt(10);
            updatedFields.password = await bcrypt.hash(newPassword, salt);
        }

        // Update user document
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: updatedFields },
            { new: true }
        );

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error in updateProfile:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};



export const checkAuth = (req, res) => {
    try {
        if (!req.User) {
            return res.status(401).json({ message: "Unauthorized: No user data found" });
        }
        res.status(200).json(req.User);
    } catch (error) {
        console.error("Error in checkAuth controller:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const userId = req.User._id;

        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });

    } catch (error) {
        console.error("Error in deleting user:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


