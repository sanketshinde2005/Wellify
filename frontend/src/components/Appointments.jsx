import React, { useState } from "react";
import { UserCircle, CalendarDays, Clock, Search, Filter, ChevronDown, Bell, Plus, Calendar, X, Check } from "lucide-react";

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      title: "Tooth Pain",
      date: "2025-04-10",
      time: "10:00",
      doctor: "Dr. Smile",
      specialist: "Dentist",
      status: "Confirmed",
      notes: "Remember to bring previous dental records",
    },
    {
      id: 2,
      title: "Chest Pain",
      date: "2025-04-15",
      time: "14:30",
      doctor: "Dr. Heart",
      specialist: "Cardiologist",
      status: "Pending",
      notes: "Fasting required before appointment",
    },
    {
      id: 3,
      title: "Annual Check-up",
      date: "2025-04-22",
      time: "09:15",
      doctor: "Dr. Well",
      specialist: "General Practitioner",
      status: "Confirmed",
      notes: "",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  
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
    const { title, date, time, doctor, specialist } = newAppointment;
    if (!title || !date || !time || !doctor || !specialist) {
      alert("Please fill in all required fields");
      return;
    }

    setAppointments([
      ...appointments,
      {
        id: Date.now(),
        ...newAppointment,
      },
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
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setAppointments(
      appointments.map((a) =>
        a.id === id ? { ...a, status: newStatus } : a
      )
    );
  };
  
  const filteredAppointments = appointments
    .filter(a => {
      // Filter by search term
      if (searchTerm && !a.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !a.doctor.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !a.specialist.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      // Filter by status
      if (filterStatus !== "all" && a.status !== filterStatus) {
        return false;
      }
      
      // Filter by tab
      const today = new Date();
      const appDate = new Date(a.date);
      if (activeTab === "upcoming" && appDate < today) {
        return false;
      }
      if (activeTab === "past" && appDate >= today) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-[#6552D0]">MediCare</h1>
              <nav className="ml-10 hidden md:flex space-x-8">
                <a href="#" className="text-gray-500 hover:text-gray-900">Dashboard</a>
                <a href="#" className="text-[#6552D0] font-medium border-b-2 border-[#6552D0]">Appointments</a>
                <a href="#" className="text-gray-500 hover:text-gray-900">Records</a>
                <a href="#" className="text-gray-500 hover:text-gray-900">Messages</a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-1">
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="absolute top-0 right-0 block w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center">
                <span className="text-gray-600 mr-2 hidden sm:inline">John Doe</span>
                <UserCircle className="w-8 h-8 text-[#6552D0]" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Page Header with Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">My Appointments</h2>
            <button 
              onClick={() => setShowModal(true)}
              className="flex items-center bg-[#6552D0] text-white px-4 py-2 rounded-lg hover:bg-[#5642b3] transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              New Appointment
            </button>
          </div>
          
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search appointments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full"
              />
            </div>
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-4 pr-10 py-2 border border-gray-300 rounded-lg appearance-none"
              >
                <option value="all">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "upcoming"
                  ? "border-[#6552D0] text-[#6552D0]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setActiveTab("past")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "past"
                  ? "border-[#6552D0] text-[#6552D0]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Past Appointments
            </button>
          </nav>
        </div>

        {/* Appointment Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((a) => (
              <div
                key={a.id}
                className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">{a.title}</h3>
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium
                      ${a.status === "Confirmed"
                        ? "bg-green-100 text-green-800"
                        : a.status === "Cancelled"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-800"}`}
                  >
                    {a.status}
                  </span>
                </div>

                <div className="flex items-center text-sm text-gray-600 mb-3">
                  <Calendar className="w-4 h-4 mr-2 text-[#6552D0]" />
                  <span>{formatDate(a.date)} • {a.time}</span>
                </div>

                <div className="mb-4 pb-4 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-800 mb-1">
                    {a.doctor}
                  </p>
                  <p className="text-xs text-gray-500">
                    {a.specialist}
                  </p>
                </div>

                {a.notes && (
                  <div className="mb-4 text-sm text-gray-600">
                    <p className="text-xs uppercase font-medium text-gray-400 mb-1">Notes</p>
                    <p>{a.notes}</p>
                  </div>
                )}

                <div className="flex justify-between items-center mt-2">
                  <select
                    value={a.status}
                    onChange={(e) => handleStatusChange(a.id, e.target.value)}
                    className="border rounded px-2 py-1 text-sm text-gray-700"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                  <button
                    onClick={() => handleDeleteAppointment(a.id)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-gray-500">
              <Calendar className="w-12 h-12 mb-4 text-gray-300" />
              <p className="text-lg font-medium mb-1">No appointments found</p>
              <p className="text-sm">Try adjusting your search or add a new appointment</p>
            </div>
          )}
        </div>
      </main>

      {/* Add Appointment Modal */}
      {showModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 text-center">
            <div 
              className="fixed inset-0 bg-black bg-opacity-30 transition-opacity"
              onClick={() => setShowModal(false)}
            ></div>

            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Book New Appointment</h3>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-500">
                  <X size={20} />
                </button>
              </div>
              
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Issue/Reason *</label>
                  <input
                    type="text"
                    name="title"
                    value={newAppointment.title}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                    placeholder="e.g., Annual Check-up, Back Pain"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                    <input
                      type="date"
                      name="date"
                      value={newAppointment.date}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-md px-3 py-2 w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time *</label>
                    <input
                      type="time"
                      name="time"
                      value={newAppointment.time}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-md px-3 py-2 w-full"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Doctor Name *</label>
                  <input
                    type="text"
                    name="doctor"
                    value={newAppointment.doctor}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                    placeholder="e.g., Dr. Smith"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Specialist Type *</label>
                  <select
                    name="specialist"
                    value={newAppointment.specialist}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                  >
                    <option value="">Select Specialist</option>
                    <option value="General Practitioner">General Practitioner</option>
                    <option value="Dentist">Dentist</option>
                    <option value="Cardiologist">Cardiologist</option>
                    <option value="Dermatologist">Dermatologist</option>
                    <option value="Neurologist">Neurologist</option>
                    <option value="Pediatrician">Pediatrician</option>
                    <option value="Psychiatrist">Psychiatrist</option>
                    <option value="Orthopedist">Orthopedist</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
                  <textarea
                    name="notes"
                    value={newAppointment.notes}
                    onChange={handleInputChange}
                    rows="3"
                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                    placeholder="Any special instructions or preparation needed?"
                  ></textarea>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 border border-gray-300 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddAppointment}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#6552D0] hover:bg-[#5642b3] rounded-md flex items-center"
                >
                  <Check size={16} className="mr-2" />
                  Book Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentsPage;