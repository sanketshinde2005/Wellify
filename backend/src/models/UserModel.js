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
        clinicAddress: {
            type: String,
            default: "",
        },
        qualification: {
            type: String,
            default: "",
        },
        specialdegree: {
            type: String,
            default: "none",
        },
        specialization: [{
            type: String,
            default: "",
        }],
        about: {
            type: String,
            default: "Nothing Added",
        },
        experience: {
            type: Number,
            default: 0,
        },
        patientsTreated: {
            type: Number,
            default: 0,
        },
        HomeAddress: {
            type: String,
            default: "",
        },
        Medicaldetails: {
            age: {
                type: Number,
                default: 0,
            },
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

        }
    },
    { timestamps: true }
)

const User = mongoose.model("User", userSchema);

export default User;