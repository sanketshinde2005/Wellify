import React, { useState } from 'react';

const AppointmentsPage = () => {
  // User role - in a real app, this would come from authentication
  const [userRole, setUserRole] = useState("patient"); // "patient" or "doctor"

  // Sample user data
  const userData = {
    patient: { name: "John Doe", id: "P12345" },
    doctor: { name: "Dr. Smith", id: "D98765", specialty: "Cardiologist" }
  };

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientId: "P12345",
      patientName: "John Doe",
      title: "Tooth Pain",
      date: "2025-04-10",
      time: "10:00",
      doctor: "Dr. Smile",
      doctorId: "D54321",
      specialist: "Dentist",
      status: "Confirmed",
      notes: "Remember to bring previous dental records",
      statusHistory: [
        { status: "Pending", timestamp: "2025-04-01T10:00:00Z", by: "patient" },
        { status: "Confirmed", timestamp: "2025-04-02T14:30:00Z", by: "doctor" }
      ]
    },
    {
      id: 2,
      patientId: "P12345",
      patientName: "John Doe",
      title: "Chest Pain",
      date: "2025-04-15",
      time: "14:30",
      doctor: "Dr. Heart",
      doctorId: "D98765",
      specialist: "Cardiologist",
      status: "Pending",
      notes: "Fasting required before appointment",
      statusHistory: [
        { status: "Pending", timestamp: "2025-04-03T09:15:00Z", by: "patient" }
      ]
    },
    {
      id: 3,
      patientId: "P12345",
      patientName: "John Doe",
      title: "Annual Check-up",
      date: "2025-04-22",
      time: "09:15",
      doctor: "Dr. Well",
      doctorId: "D12345",
      specialist: "General Practitioner",
      status: "Rejected",
      notes: "Standard annual physical",
      statusHistory: [
        { status: "Pending", timestamp: "2025-04-02T15:30:00Z", by: "patient" },
        { status: "Rejected", timestamp: "2025-04-03T10:45:00Z", by: "doctor", reason: "Doctor unavailable on this date. Please reschedule." }
      ]
    },
  ]);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "status_change",
      appointmentId: 1,
      title: "Appointment Confirmed",
      message: "Your appointment for Tooth Pain on Apr 10 has been confirmed by Dr. Smile.",
      timestamp: "2025-04-02T14:30:00Z",
      read: false
    }
  ]);

  const [newAppointment, setNewAppointment] = useState({
    title: "",
    date: "",
    time: "",
    doctor: "",
    specialist: "",
    notes: "",
    status: "Pending",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment({ ...newAppointment, [name]: value });
  };

  const handleAddAppointment = () => {
    const currentDate = new Date().toISOString().split('T')[0];
    if (!newAppointment.title || !newAppointment.date || !newAppointment.time || !newAppointment.doctor) {
      alert("Please fill all fields");
      return;
    }
    if (newAppointment.date < currentDate) {
      alert("Date cannot be in the past");
      return;
    }

    setAppointments([
      ...appointments,
      {
        id: appointments.length + 1,
        ...newAppointment
      }
    ]);

    setNewAppointment({
      title: "",
      date: "",
      time: "",
      doctor: "",
      specialist: "",
      notes: "",
      status: "Pending",
    });

    setShowModal(false);
  };

  const handleDeleteAppointment = (id) => {
    if (confirm("Are you sure you want to delete this appointment?")) {
      setAppointments(appointments.filter((a) => a.id !== id));
      // Also remove any notifications related to this appointment
      setNotifications(notifications.filter(n => n.appointmentId !== id));
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setAppointments(appointments.map(appointment =>
      appointment.id === id ? { ...appointment, status: newStatus } : appointment
    ));
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Appointments</h1>

      {/* Add New Appointment */}
      <div className="card bg-base-100 shadow-xl p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Appointment</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            value={newAppointment.title}
            onChange={handleInputChange}
            placeholder="Appointment Title"
            className="input input-bordered w-full"
          />
          <input
            type="text"
            name="doctor"
            value={newAppointment.doctor}
            onChange={handleInputChange}
            placeholder="Doctor's Name"
            className="input input-bordered w-full"
          />
          <input
            type="date"
            name="date"
            value={newAppointment.date}
            onChange={handleInputChange}
            className="input input-bordered w-full"
          />
          <input
            type="time"
            name="time"
            value={newAppointment.time}
            onChange={handleInputChange}
            className="input input-bordered w-full"
          />
        </div>
        <button
          onClick={handleAddAppointment}
          className="btn btn-primary mt-4 w-full md:w-auto"
        >
          Add Appointment
        </button>
      </div>

      {/* Appointment List */}
      <div className="overflow-x-auto bg-base-100 rounded-lg shadow-lg">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Date & Time</th>
              <th>Doctor</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-6">
                  No appointments scheduled
                </td>
              </tr>
            ) : (
              appointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.title}</td>
                  <td>
                    {new Date(`${appointment.date}T${appointment.time}`).toLocaleString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric'
                    })}
                  </td>
                  <td>{appointment.doctor}</td>
                  <td>
                    <span className={`badge 
                                            ${appointment.status === 'Confirmed' ? 'badge-success' :
                        appointment.status === 'Cancelled' ? 'badge-error' : 'badge-warning'}`}>
                      {appointment.status}
                    </span>
                  </td>
                  <td>
                    <select
                      value={appointment.status}
                      onChange={(e) => handleStatusChange(appointment.id, e.target.value)}
                      className="select select-sm select-bordered mr-2"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                    <button
                      onClick={() => handleDeleteAppointment(appointment.id)}
                      className="btn btn-sm btn-error text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentsPage;
