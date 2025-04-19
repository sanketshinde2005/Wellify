import { generateToken } from "../lib/utils.js";
import Appointment from "../models/AppointmentModel.js"; // Assuming you have an Appointment model
import User from "../models/UserModel.js";

// Get all appointments for the logged-in user
export const getAppointments = async (req, res) => {
  try {
    const loggedUserId = req.user?.id; // Patient's ID
    // console.log('Patient ID:', patientId);
    console.log('Request body:', req.body);
    if (!loggedUserId) {
      console.error("Logged user ID not found in request:", req.User);
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const appointments = await Appointment.find();

    if (!appointments || appointments.length === 0) {
      return res.status(404).json({ message: "No appointments found" });
    }

    res.status(200).json(appointments);
  } catch (error) {

    console.error("Error in getAppointments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Add a new appointment
export const addAppointment = async (req, res) => {
  try {
    const loggedUserId = req.User?.id; // Patient's ID from auth middleware

    if (!loggedUserId) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const { doctorId, date, time, reason, subject, type } = req.body;

    if (!doctorId || !date || !time || !subject) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create new appointment with consistent field names
    const newAppointment = new Appointment({
      patientId: loggedUserId,  // From auth middleware
      doctorId: doctorId,       // From request body
      date,
      time,
      reason: reason || "",     // Optional with default
      subject,
      type: type || "in-person", // Optional with default
      status: "scheduled",
    });

    await newAppointment.save();

    // Update user references
    await User.findByIdAndUpdate(loggedUserId, {
      $push: { appointmentsAsPatient: newAppointment._id },
    });

    await User.findByIdAndUpdate(doctorId, {
      $push: { appointmentsAsDoctor: newAppointment._id },
    });

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment: newAppointment
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
      console.error("Logged user ID not found in request:", req.User);
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const { appointmentId } = req.params;
    const updates = req.body;

    const appointment = await Appointment.findOneAndUpdate(
      { _id: appointmentId, userId: loggedUserId },
      updates,
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json({ message: "Appointment updated successfully", appointment });
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
      console.error("Logged user ID not found in request:", req.User);
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

export const getDoctorAppointments = async (req, res) => {
  try {
    const loggedUserId = req.User?.id; // Doctor's ID

    if (!loggedUserId) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const appointments = await Appointment.find({ doctorId: loggedUserId })
      .populate("patient", "fullName email") // Populate patient details
      .sort({ date: 1, time: 1 }); // Sort by date and time

    if (!appointments || appointments.length === 0) {
      return res.status(404).json({ message: "No appointments found" });
    }

    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error in getDoctorAppointments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all appointments for a specific patient
export const getPatientAppointments = async (req, res) => {
  try {
    const loggedUserId = req.User?.id; // Patient's ID

    if (!loggedUserId) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const appointments = await Appointment.find({ patientId: loggedUserId })
      .populate("doctorId", "fullName email specialization") // Populate doctor details
      .sort({ date: 1, time: 1 }); // Sort by upcoming

    // if (!appointments || appointments.length === 0) {
    //   return res.status(404).json({ message: "No appointments found" });
    // }

    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error in getPatientAppointments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
