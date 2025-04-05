<<<<<<< HEAD
import React, { useState } from 'react';

const Appointments = () => {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      title: "Annual Checkup",
      date: "2025-04-10",
      time: "10:00",
      doctor: "Dr. Smith",
      status: "Confirmed",
    },
    {
      id: 2,
      title: "Dental Cleaning",
      date: "2025-04-15",
      time: "14:30",
      doctor: "Dr. Johnson",
      status: "Pending",
    },
    {
      id: 3,
      title: "Eye Examination",
      date: "2025-04-20",
      time: "09:15",
      doctor: "Dr. Williams",
      status: "Confirmed",
    },
  ]);

  const [newAppointment, setNewAppointment] = useState({
    title: "",
    date: "",
    time: "",
    doctor: "",
    status: "Pending",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment({
      ...newAppointment,
      [name]: value,
    });
  };

  const handleAddAppointment = () => {
    if (!newAppointment.title || !newAppointment.date || !newAppointment.time || !newAppointment.doctor) {
      alert("Please fill all fields");
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
      appointment.id === id ? {...appointment, status: newStatus} : appointment
    ));
  };
  
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Appointments</h1>
      
      {/* Add New Appointment Form */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Add New Appointment</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={newAppointment.title}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Appointment reason"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Doctor</label>
            <input
              type="text"
              name="doctor"
              value={newAppointment.doctor}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Doctor name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={newAppointment.date}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
            <input
              type="time"
              name="time"
              value={newAppointment.time}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </div>
        <button 
          onClick={handleAddAppointment}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add Appointment
        </button>
      </div>
      
      {/* Appointments List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <h2 className="text-lg font-semibold p-4 border-b">Your Appointments</h2>
        {appointments.length === 0 ? (
          <p className="p-4 text-center text-gray-500">No appointments scheduled</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date & Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Doctor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {appointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{appointment.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(${appointment.date}T${appointment.time}).toLocaleString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{appointment.doctor}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium 
                        ${appointment.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 
                          appointment.status === 'Cancelled' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`
                      }>
                        {appointment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select 
                        value={appointment.status}
                        onChange={(e) => handleStatusChange(appointment.id, e.target.value)}
                        className="mr-2 text-sm border rounded px-2 py-1"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                      <button 
                        onClick={() => handleDeleteAppointment(appointment.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

=======
import React, { useState } from 'react';
import { CalendarDays, Clock, User, ChevronRight, Clipboard, Shield, MapPin, Plus, Trash2, Check, X, AlertCircle } from "lucide-react";

const Appointments = () => {
  const [appointments, setAppointments] = useState([
    { id: 1, title: "Annual Checkup", date: "2025-04-10", time: "10:00", doctor: "Dr. Smith", status: "Confirmed", type: "in-person", notes: "Regular checkup", preparation: "No food 8 hours before" },
    { id: 2, title: "Dental Cleaning", date: "2025-04-15", time: "14:30", doctor: "Dr. Johnson", status: "Pending", type: "in-person", notes: "Routine cleaning", preparation: "Brush before appointment" },
    { id: 3, title: "Eye Examination", date: "2025-04-20", time: "09:15", doctor: "Dr. Williams", status: "Confirmed", type: "video", notes: "Annual vision test", preparation: "Have insurance card ready" }
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
    setFormError("");
  };
  
  const validateStep = (step) => {
    if (step === 1) {
      if (!newAppointment.title) {
        setFormError("Please enter appointment title");
        return false;
      }
      if (!newAppointment.doctor) {
        setFormError("Please enter doctor name");
        return false;
      }
    } else if (step === 2) {
      if (!newAppointment.date) {
        setFormError("Please select appointment date");
        return false;
      }
      if (!newAppointment.time) {
        setFormError("Please select appointment time");
        return false;
      }
    }
    return true;
  };
  
  const nextStep = () => {
    if (validateStep(formStep)) {
      setFormStep(formStep + 1);
      setFormError("");
    }
  };
  
  const prevStep = () => {
    setFormStep(formStep - 1);
    setFormError("");
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
      status: "Pending",
      type: "in-person",
      notes: "",
      preparation: ""
    });
    
    setFormStep(1);
    setActiveTab('appointments');
    
    // Show success notification (in a real app)
    alert("Appointment added successfully!");
  };
  
  const handleDeleteAppointment = (id) => {
    setAppointments(appointments.filter(appointment => appointment.id !== id));
  };
  
  const handleStatusChange = (id, newStatus) => {
    setAppointments(appointments.map(appointment => 
      appointment.id === id ? {...appointment, status: newStatus} : appointment
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