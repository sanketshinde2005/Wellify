import React, { useState } from 'react';

const Appointments = () => {
  const [appointments, setAppointments] = useState([
    { id: 1, title: "Annual Checkup", date: "2025-04-10", time: "10:00", doctor: "Dr. Smith", status: "Confirmed" },
    { id: 2, title: "Dental Cleaning", date: "2025-04-15", time: "14:30", doctor: "Dr. Johnson", status: "Pending" },
    { id: 3, title: "Eye Examination", date: "2025-04-20", time: "09:15", doctor: "Dr. Williams", status: "Confirmed" }
  ]);

  const [newAppointment, setNewAppointment] = useState({
    title: "",
    date: "",
    time: "",
    doctor: "",
    status: "Pending"
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment({
      ...newAppointment,
      [name]: value
    });
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
      status: "Pending"
    });
  };

  const handleDeleteAppointment = (id) => {
    setAppointments(appointments.filter(appointment => appointment.id !== id));
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

export default Appointments;
