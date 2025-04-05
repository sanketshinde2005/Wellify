import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema(
    {
        mobilenum: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        profilePic: {
            type: String,
            default: "",
        }
    },
    { timestamps: true }
)

const User = mongoose.model("Doctor", DoctorSchema);

export default User;