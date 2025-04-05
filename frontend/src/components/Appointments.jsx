import React, { useState, useEffect } from "react";
import { UserCircle, CalendarDays, Clock, Search, Filter, ChevronDown, Bell, Plus, Calendar, X, Check, AlertCircle, CheckCircle, XCircle } from "lucide-react";

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

  const [showModal, setShowModal] = useState(false);
  const [showNotificationsPanel, setShowNotificationsPanel] = useState(false);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(1);
  
  const [newAppointment, setNewAppointment] = useState({
    title: "",
    date: "",
    time: "",
    doctor: "",
    specialist: "",
    notes: "",
    status: "Pending",
  });

  // Calculate unread notifications
  useEffect(() => {
    const count = notifications.filter(n => !n.read).length;
    setUnreadNotificationsCount(count);
  }, [notifications]);

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

    // Create new appointment
    const newAppointmentObj = {
      id: Date.now(),
      patientId: userData.patient.id,
      patientName: userData.patient.name,
      doctorId: "D" + Math.floor(10000 + Math.random() * 90000), // Simulated doctor ID
      ...newAppointment,
      status: "Pending",
      statusHistory: [
        { status: "Pending", timestamp: new Date().toISOString(), by: "patient" }
      ]
    };

    setAppointments([...appointments, newAppointmentObj]);

    // Add notification for the doctor (in a real app, this would be sent to the doctor)
    if (userRole === "doctor") {
      addNotification({
        type: "new_appointment",
        appointmentId: newAppointmentObj.id,
        title: "New Appointment Request",
        message: `${userData.patient.name} has requested an appointment for ${title} on ${formatDate(date)}.`,
        timestamp: new Date().toISOString()
      });
    }

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

  const handleStatusChange = (id, newStatus, reason = "") => {
    // Find the appointment
    const appointment = appointments.find(a => a.id === id);
    if (!appointment) return;
    
    // Create status history entry
    const statusEntry = {
      status: newStatus,
      timestamp: new Date().toISOString(),
      by: userRole
    };
    
    if (reason) statusEntry.reason = reason;
    
    // Update appointment
    const updatedAppointments = appointments.map(a => 
      a.id === id 
        ? { 
            ...a, 
            status: newStatus, 
            statusHistory: [...a.statusHistory, statusEntry]
          } 
        : a
    );
    
    setAppointments(updatedAppointments);
    
    // Create notification for the other party
    const notificationRecipient = userRole === "patient" ? "doctor" : "patient";
    const statusMessages = {
      Confirmed: `Appointment for ${appointment.title} on ${formatDate(appointment.date)} has been confirmed.`,
      Rejected: `Appointment for ${appointment.title} on ${formatDate(appointment.date)} has been rejected${reason ? `: ${reason}` : '.'}`,
      Rescheduled: `Appointment for ${appointment.title} needs to be rescheduled.`,
      Cancelled: `Appointment for ${appointment.title} on ${formatDate(appointment.date)} has been cancelled.`
    };
    
    // Add notification
    if (statusMessages[newStatus]) {
      addNotification({
        type: "status_change",
        appointmentId: id,
        title: `Appointment ${newStatus}`,
        message: statusMessages[newStatus],
        timestamp: new Date().toISOString()
      });
    }
  };
  
  const handleRejectWithReason = (id) => {
    const reason = prompt("Please provide a reason for rejecting this appointment:");
    if (reason !== null) {
      handleStatusChange(id, "Rejected", reason);
    }
  };

  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      read: false,
      ...notification
    };
    setNotifications(prevNotifications => [newNotification, ...prevNotifications]);
  };

  const markNotificationAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? {...n, read: true} : n
    ));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(notifications.map(n => ({...n, read: true})));
  };
  
  const filteredAppointments = appointments
    .filter(a => {
      // For doctors, only show appointments assigned to them
      if (userRole === "doctor" && a.doctorId !== userData.doctor.id) {
        return false;
      }
      
      // For patients, only show their own appointments
      if (userRole === "patient" && a.patientId !== userData.patient.id) {
        return false;
      }
      
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

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  // For demo purposes - toggle between patient and doctor views
  const toggleUserRole = () => {
    setUserRole(userRole === "patient" ? "doctor" : "patient");
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
              {/* Toggle role button (for demo only) */}
              <button 
                onClick={toggleUserRole}
                className="text-xs px-2 py-1 bg-gray-200 rounded-md text-gray-700"
              >
                View as: {userRole === "patient" ? "Patient" : "Doctor"}
              </button>
              
              {/* Notifications */}
              <div className="relative">
                <button 
                  className="relative p-1"
                  onClick={() => setShowNotificationsPanel(!showNotificationsPanel)}
                >
                  <Bell className="w-6 h-6 text-gray-600" />
                  {unreadNotificationsCount > 0 && (
                    <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs rounded-full">
                      {unreadNotificationsCount}
                    </span>
                  )}
                </button>
                
                {/* Notifications Panel */}
                {showNotificationsPanel && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-lg shadow-lg z-20 max-h-96 overflow-y-auto">
                    <div className="p-4 border-b flex justify-between items-center">
                      <h3 className="font-medium">Notifications</h3>
                      {unreadNotificationsCount > 0 && (
                        <button 
                          onClick={markAllNotificationsAsRead}
                          className="text-xs text-[#6552D0] hover:underline"
                        >
                          Mark all as read
                        </button>
                      )}
                    </div>
                    
                    <div className="divide-y divide-gray-100">
                      {notifications.length > 0 ? (
                        notifications.map(notification => (
                          <div 
                            key={notification.id}
                            className={`p-4 hover:bg-gray-50 cursor-pointer ${!notification.read ? 'bg-blue-50' : ''}`}
                            onClick={() => markNotificationAsRead(notification.id)}
                          >
                            <div className="flex items-start">
                              <div className="flex-shrink-0 mr-3">
                                {notification.type === "status_change" && notification.title.includes("Confirmed") && (
                                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                  </div>
                                )}
                                {notification.type === "status_change" && notification.title.includes("Rejected") && (
                                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                                    <XCircle className="w-5 h-5 text-red-600" />
                                  </div>
                                )}
                                {notification.type === "new_appointment" && (
                                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                    <Calendar className="w-5 h-5 text-blue-600" />
                                  </div>
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="flex justify-between items-start mb-1">
                                  <h4 className="text-sm font-medium">{notification.title}</h4>
                                  {!notification.read && <span className="w-2 h-2 bg-blue-600 rounded-full"></span>}
                                </div>
                                <p className="text-sm text-gray-600">{notification.message}</p>
                                <p className="text-xs text-gray-500 mt-1">{formatTimestamp(notification.timestamp)}</p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 text-center text-gray-500">
                          <p>No notifications</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex items-center">
                <span className="text-gray-600 mr-2 hidden sm:inline">
                  {userRole === "patient" ? userData.patient.name : userData.doctor.name}
                </span>
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
            <h2 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">
              {userRole === "patient" ? "My Appointments" : "Appointment Requests"}
            </h2>
            {userRole === "patient" && (
              <button 
                onClick={() => setShowModal(true)}
                className="flex items-center bg-[#6552D0] text-white px-4 py-2 rounded-lg hover:bg-[#5642b3] transition-colors"
              >
                <Plus className="w-5 h-5 mr-2" />
                New Appointment
              </button>
            )}
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
                <option value="Rejected">Rejected</option>
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
                        : a.status === "Rejected" || a.status === "Cancelled"
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
                  {userRole === "patient" ? (
                    <p className="text-sm font-medium text-gray-800 mb-1">
                      {a.doctor}
                    </p>
                  ) : (
                    <p className="text-sm font-medium text-gray-800 mb-1">
                      {a.patientName}
                    </p>
                  )}
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

                {/* Status history */}
                {a.statusHistory && a.statusHistory.length > 1 && (
                  <div className="mb-4">
                    <p className="text-xs uppercase font-medium text-gray-400 mb-1">Status History</p>
                    <div className="text-xs text-gray-600">
                      {a.statusHistory.slice(-3).reverse().map((history, idx) => (
                        <div key={idx} className="flex justify-between mb-1">
                          <span>{history.status}{history.reason ? `: ${history.reason}` : ''}</span>
                          <span className="text-gray-400">{new Date(history.timestamp).toLocaleDateString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex justify-between items-center mt-2">
                  {userRole === "doctor" && a.status === "Pending" ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleStatusChange(a.id, "Confirmed")}
                        className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => handleRejectWithReason(a.id)}
                        className="text-xs px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200"
                      >
                        Reject
                      </button>
                    </div>
                  ) : userRole === "patient" && a.status !== "Cancelled" && a.status !== "Rejected" ? (
                    <button
                      onClick={() => handleStatusChange(a.id, "Cancelled")}
                      className="text-xs px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200"
                    >
                      Cancel
                    </button>
                  ) : (
                    <div className="text-xs text-gray-500">
                      {a.status === "Rejected" && a.statusHistory.find(h => h.status === "Rejected")?.reason ? 
                        "Reason: " + a.statusHistory.find(h => h.status === "Rejected").reason : 
                        a.status === "Confirmed" ? "Appointment confirmed" : ""}
                    </div>
                  )}
                  
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
