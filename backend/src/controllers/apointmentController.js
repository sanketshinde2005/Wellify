import { generateToken } from "../lib/utils.js";
import Appointment from "../models/AppointmentModel.js"; // Assuming you have an Appointment model
import User from "../models/UserModel.js";

// Get all appointments for the logged-in user
export const getAppointments = async (req, res) => {
  try {
    const loggedUserId = req.User?.id;

    if (!loggedUserId) {
      console.error("Logged user ID not found in request:", req.User);
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const appointments = await Appointment.find({ userId: loggedUserId });

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
    const loggedUserId = req.User?.id; // Patient's ID

    if (!loggedUserId) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const { doctorId, date, time, reason, subject } = req.body;

    if (!doctorId || !date || !time || !reason || !subject) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create a new appointment
    const newAppointment = new Appointment({
      patientid: loggedUserId,
      doctorid: doctorId,
      date,
      time,
      reason,
      subject,
      status: "scheduled",
    });

    await newAppointment.save();

    // Optionally, update the User schema to include the appointment reference
    await User.findByIdAndUpdate(loggedUserId, {
      $push: { appointmentsAsPatient: newAppointment._id },
    });

    await User.findByIdAndUpdate(doctorId, {
      $push: { appointmentsAsDoctor: newAppointment._id },
    });

    res.status(201).json({ message: "Appointment booked successfully", appointment: newAppointment });
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
      userId: loggedUserId,
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

    const appointments = await Appointment.find({ doctor: loggedUserId })
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

    const appointments = await Appointment.find({ patientid: loggedUserId })
      .populate("doctorid", "fullName email specialization") // Populate doctor details
      .sort({ date: 1, time: 1 }); // Sort by upcoming

    if (!appointments || appointments.length === 0) {
      return res.status(404).json({ message: "No appointments found" });
    }

    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error in getPatientAppointments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
