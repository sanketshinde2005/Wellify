import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        proffession: {
            type: String,
            required: true,
            default: "",
        },
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
        },
        Medicaldetails: {
            height: {
                type: Number,
                default: 0,
            },
            weight: {
                type: Number,
                default: 0,
            },
            bloodGroup: {
                type: String,
                default: "",
            },

        },
        appointmentsAsPatient: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Appointment", // Reference to the Appointment model
            },
        ],
        appointmentsAsDoctor: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Appointment", // Reference to the Appointment model
            },
        ],
    },
    { timestamps: true }
)

const User = mongoose.model("User", userSchema);

export default User;