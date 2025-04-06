import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

const useAppointmentStore = create((set) => ({
  doctorAppointments: [],
  patientAppointments: [],
  loading: false,
  error: null,

  // 🔁 Fetch Appointments for Patient
  fetchPatientAppointments: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get("/appointments/patientappointments");
      set({ patientAppointments: response.data, loading: false });
    } catch (err) {
      console.error("Fetch Patient Appointments Error:", err);
      toast.error(err.response?.data?.message || "Failed to fetch patient appointments");
      set({ error: err.response?.data?.message || "Error", loading: false });
    }
  },

  // 🩺 Fetch Appointments for Doctor
  fetchDoctorAppointments: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get("/appointments/doctorsappointments");
      set({ doctorAppointments: response.data, loading: false });
    } catch (err) {
      console.error("Fetch Doctor Appointments Error:", err);
      toast.error(err.response?.data?.message || "Failed to fetch doctor appointments");
      set({ error: err.response?.data?.message || "Error", loading: false });
    }
  },

  // ➕ Add Appointment
  addAppointment: async (appointmentData, isDoctor = false) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post("/appointments/add", appointmentData);
      const newAppointment = response.data.appointment;

      set((state) => ({
        doctorAppointments: isDoctor
          ? [...state.doctorAppointments, newAppointment]
          : state.doctorAppointments,
        patientAppointments: !isDoctor
          ? [...state.patientAppointments, newAppointment]
          : state.patientAppointments,
        loading: false,
      }));
      

      toast.success("Appointment booked successfully");
    } catch (err) {
      console.error("Add Appointment Error:", err);
      toast.error(err.response?.data?.message || "Failed to book appointment");
      set({ error: err.response?.data?.message || "Error", loading: false });
    }
  },

  // ✏️ Update Appointment (update both lists just in case)
  updateAppointment: async (appointmentId, updatedData) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.put(`/appointments/${appointmentId}`, updatedData);
      const updated = response.data.appointment;

      set((state) => ({
        doctorAppointments: state.doctorAppointments.map((appt) =>
          appt._id === appointmentId ? updated : appt
        ),
        patientAppointments: state.patientAppointments.map((appt) =>
          appt._id === appointmentId ? updated : appt
        ),
        loading: false,
      }));

      toast.success("Appointment updated successfully");
    } catch (err) {
      console.error("Update Appointment Error:", err);
      toast.error(err.response?.data?.message || "Failed to update appointment");
      set({ error: err.response?.data?.message || "Error", loading: false });
    }
  },

  // 🗑️ Delete Appointment (from both lists)
  deleteAppointment: async (appointmentId) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.delete(`/appointments/${appointmentId}`);
      set((state) => ({
        doctorAppointments: state.doctorAppointments.filter((appt) => appt._id !== appointmentId),
        patientAppointments: state.patientAppointments.filter((appt) => appt._id !== appointmentId),
        loading: false,
      }));
      toast.success("Appointment deleted successfully");
    } catch (err) {
      console.error("Delete Appointment Error:", err);
      toast.error(err.response?.data?.message || "Failed to delete appointment");
      set({ error: err.response?.data?.message || "Error", loading: false });
    }
  },
}));

export default useAppointmentStore;
