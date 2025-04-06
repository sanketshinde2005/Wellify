import Appointment from "../models/AppointmentModel.js";
import User from "../models/UserModel.js";

// Get all appointments for the logged-in patient


// Add a new appointment
export const addAppointment = async (req, res) => {
    try {
        const loggedUserId = req.User?.id;

        if (!loggedUserId) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        const { doctorId, date, time, reason, notes, duration, meetingLink } = req.body;

        if (!doctorId || !date || !time || !reason) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newAppointment = new Appointment({
            patientId: loggedUserId,
            doctorId,
            date,
            time,
            reason,
            notes,
            duration,
            meetingLink,
            status: "scheduled",
        });

        await newAppointment.save();

        // Optionally push reference to users (if needed for history)
        await User.findByIdAndUpdate(loggedUserId, {
            $push: { appointmentsAsPatient: newAppointment._id },
        });

        await User.findByIdAndUpdate(doctorId, {
            $push: { appointmentsAsDoctor: newAppointment._id },
        });

        res.status(201).json({
            message: "Appointment booked successfully",
            appointment: newAppointment,
        });
    } catch (error) {
        console.error("Error in addAppointment:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Update an appointment
export const updateAppointment = async (req, res) => {
    try {
        const loggedUserId = req.User?.id;

        if (!loggedUserId) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        const { appointmentId } = req.params;
        const updates = req.body;

        const appointment = await Appointment.findOneAndUpdate(
            { _id: appointmentId, patientId: loggedUserId },
            updates,
            { new: true }
        );

        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        res
            .status(200)
            .json({ message: "Appointment updated successfully", appointment });
    } catch (error) {
        console.error("Error in updateAppointment:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Delete an appointment
export const deleteAppointment = async (req, res) => {
    try {
        const loggedUserId = req.User?.id;

        if (!loggedUserId) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        const { appointmentId } = req.params;

        const appointment = await Appointment.findOneAndDelete({
            _id: appointmentId,
            patientId: loggedUserId,
        });

        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        res.status(200).json({ message: "Appointment deleted successfully" });
    } catch (error) {
        console.error("Error in deleteAppointment:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get appointments for the logged-in doctor
export const getDoctorAppointments = async (req, res) => {
    try {
        const loggedUserId = req.User?.id;

        if (!loggedUserId) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        const appointments = await Appointment.find({ doctorId: loggedUserId })
            .populate("patientId", "fullName email gender age")
            .sort({ date: 1, time: 1 });

        if (!appointments || appointments.length === 0) {
            return res.status(404).json({ message: "No appointments found" });
        }

        res.status(200).json(appointments);
    } catch (error) {
        console.error("Error in getDoctorAppointments:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const getAppointmentsForPatient = async (req, res) => {
    try {
        const loggedUserId = req.User?.id;

        if (!loggedUserId) {
            console.error("Logged user ID not found in request:", req.User);
            return res.status(401).json({ message: "Unauthorized access" });
        }

        const appointments = await Appointment.find({ patientId: loggedUserId })
            .populate("doctorId", "fullName email proffession")
            .sort({ date: 1, time: 1 });

        if (!appointments || appointments.length === 0) {
            return res.status(404).json({ message: "No appointments found" });
        }

        res.status(200).json(appointments);
    } catch (error) {
        console.error("Error in getAppointmentsForPatient:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};