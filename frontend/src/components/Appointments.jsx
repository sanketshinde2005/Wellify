import React, { useEffect, useMemo, useState } from 'react';
import { CalendarDays, Clock, User, ChevronRight, Clipboard, Shield, Plus, Trash2, Check, X, AlertCircle } from "lucide-react";
import useDoctorsStore from '../store/useDoctorsStore';
import useAppointmentStore from '../store/useAppointmentStore';
import toast from 'react-hot-toast';

const Appointments = () => {
  const { doctors, fetchAllDoctors } = useDoctorsStore();
  const {
    patientAppointments,
    fetchPatientAppointments,
    addAppointment,
    deleteAppointment,
    updateAppointment
  } = useAppointmentStore();

  const [expandedAppointment, setExpandedAppointment] = useState(null);
  const [activeTab, setActiveTab] = useState('appointments');
  const [formStep, setFormStep] = useState(1);
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  const [newAppointment, setNewAppointment] = useState({
    subject: "",
    date: "",
    time: "",
    doctorId: "",
    status: "Pending",
    type: "in-person",
    reason: "",
  });

  // Fetch data on component mount
  useEffect(() => {
    fetchAllDoctors();
    fetchPatientAppointments();
  }, []);

  // Format doctors data for dropdown
  const formattedDoctors = useMemo(() => {
    return doctors?.map(doctor => ({
      id: doctor._id,
      fullName: doctor.fullName,
      specialization: doctor.specialdegree || "General Practice",
    })) || [];
  }, [doctors]);



  // Find doctor name by ID
  const getDoctorName = (doctorId) => {
    if (!doctorId) return "Unknown Doctor";

    // First try to find in formattedDoctors
    const formattedDoctor = formattedDoctors.find(doc => doc.id === doctorId);
    if (formattedDoctor) return formattedDoctor.fullName;

    // If not found, try in the raw doctors array
    const doctor = doctors.find(doc => doc._id === doctorId);
    if (doctor) return doctor.fullName;

    return "Unknown Doctor";
  };

  // Toggle appointment details
  const toggleAppointmentDetails = (id) => {
    setExpandedAppointment(expandedAppointment === id ? null : id);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment(prev => ({
      ...prev,
      [name]: value
    }));
    setFormError("");
  };

  // Form validation
  const validateStep = (step) => {
    if (step === 1) {
      if (!newAppointment.subject) {
        setFormError("Please enter appointment subject");
        return false;
      }
      if (!newAppointment.doctorId) {
        setFormError("Please select a doctor");
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

  // Form navigation
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

  // Handle appointment submission
  const handleAddAppointment = async () => {
    if (!validateStep(formStep)) return;

    setLoading(true);
    try {
      // if (!doctorId || !date || !time || !reason || !subject) {
      await addAppointment({
        doctorId: newAppointment.doctorId,
        subject: newAppointment.subject || "",
        reason: newAppointment.reason || "",
        time: newAppointment.time || "",
        date: newAppointment.date || "",
      });

      toast.success("Appointment booked successfully");

      // Reset form
      setNewAppointment({
        subject: "",
        date: "",
        time: "",
        doctorId: "",
        status: "Pending",
        type: "in-person",
        reason: "",
      });

      setFormStep(1);
      setActiveTab('appointments');
      fetchPatientAppointments(); // Refresh appointments list
    } catch (error) {
      toast.error("Failed to book appointment");
    } finally {
      setLoading(false);
    }
  };

  // Handle appointment deletion
  const handleDeleteAppointment = async (id) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      try {
        await deleteAppointment(id);
        toast.success("Appointment cancelled successfully");
        fetchPatientAppointments(); // Refresh appointments list
      } catch (error) {
        toast.error("Failed to cancel appointment");
      }
    }
  };

  // Handle status change
  const handleStatusChange = async (id, newStatus) => {
    try {
      // await updateAppointment(id, { status: newStatus });
      toast.success("Appointment status updated");
      fetchPatientAppointments(); // Refresh appointments list
    } catch (error) {
      toast.error("Failed to update appointment status");
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Format time for display
  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl shadow-lg w-full max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          Health Dashboard
        </h2>
        <p className="text-gray-600">
          Manage your wellness journey with personalized care
        </p>
      </div>

      {/* Tabs - Equal width */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`flex-1 py-3 font-medium text-sm text-center ${activeTab === 'appointments'
            ? 'text-indigo-600 border-b-2 border-indigo-600'
            : 'text-gray-500 hover:text-gray-700'
            }`}
          onClick={() => setActiveTab('appointments')}
        >
          Your Appointments
        </button>
        <button
          className={`flex-1 py-3 font-medium text-sm text-center ${activeTab === 'add'
            ? 'text-indigo-600 border-b-2 border-indigo-600'
            : 'text-gray-500 hover:text-gray-700'
            }`}
          onClick={() => setActiveTab('add')}
        >
          Book New Appointment
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left side: appointments list or add form depending on active tab */}
        <div className={`${activeTab === 'appointments' ? 'lg:w-3/4' : 'lg:w-full'}`}>
          {activeTab === 'appointments' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">Your Appointments</h3>
                <button
                  onClick={() => setActiveTab('add')}
                  className="inline-flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-md transition-all text-sm"
                >
                  <Plus className="h-4 w-4" />
                  Book Appointment
                </button>
              </div>

              {patientAppointments.length === 0 ? (
                <div className="bg-white rounded-xl p-8 text-center">
                  <div className="mb-4 flex justify-center">
                    <CalendarDays className="h-12 w-12 text-gray-300" />
                  </div>
                  <h4 className="text-lg font-medium text-gray-700 mb-2">No appointments scheduled</h4>
                  <p className="text-gray-500 mb-4">Book your first appointment to start your health journey</p>
                  <button
                    onClick={() => setActiveTab('add')}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    Book Now
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {patientAppointments.map((appointment) => (
                    <div
                      key={appointment._id}
                      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all"
                    >
                      {/* Main appointment card content */}
                      <div
                        className="p-4 cursor-pointer"
                        onClick={() => toggleAppointmentDetails(appointment._id)}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`px-3 py-1 text-xs font-medium rounded-full ${appointment.type === "video"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-purple-100 text-purple-700"
                            }`}>
                            {appointment.type === "video" ? "Telehealth" : "In-person"}
                          </div>
                          <div className={`px-3 py-1 text-xs font-medium rounded-full ${appointment.status === "Confirmed"
                            ? "bg-green-100 text-green-700"
                            : appointment.status === "Cancelled"
                              ? "bg-red-100 text-red-700"
                              : "bg-amber-100 text-amber-700"
                            }`}>
                            {appointment.status}
                          </div>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                          {/* Doctor Info */}
                          <div className="flex items-center gap-3 md:w-1/3">
                            <div className="w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-lg shadow-md border-2 border-white">
                              {getDoctorName(appointment.doctorId)?.split(' ').map(part => part[0]).join('')}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">
                                {getDoctorName(appointment.doctorId)}
                              </p>
                            </div>
                          </div>

                          {/* Appointment Details */}
                          <div className="flex flex-1 flex-col gap-2 md:w-2/3">
                            <div className="text-indigo-600 font-medium mb-1">
                              {appointment.subject}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              <div className="inline-flex items-center gap-2">
                                <div className="p-1.5 bg-indigo-100 rounded-full">
                                  <CalendarDays className="h-4 w-4 text-indigo-600" />
                                </div>
                                <span className="text-sm text-gray-700">{formatDate(appointment.date)}</span>
                              </div>
                              <div className="inline-flex items-center gap-2">
                                <div className="p-1.5 bg-indigo-100 rounded-full">
                                  <Clock className="h-4 w-4 text-indigo-600" />
                                </div>
                                <span className="text-sm text-gray-700">{formatTime(appointment.time)}</span>
                              </div>
                            </div>
                          </div>

                          {/* Expand indicator */}
                          <div className="flex justify-end">
                            <ChevronRight
                              className={`h-5 w-5 text-gray-400 transform transition-transform ${expandedAppointment === appointment._id ? "rotate-90" : ""
                                }`}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Expanded details section */}
                      {expandedAppointment === appointment._id && (
                        <div className="px-4 pb-4 pt-2 border-t border-gray-100">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-gray-50 rounded-lg p-3">
                              <div className="flex items-center gap-2 mb-2 text-gray-800">
                                <Clipboard className="h-4 w-4 text-indigo-600" />
                                <span className="font-medium">Appointment Reason</span>
                              </div>
                              <p className="text-sm text-gray-600">{appointment.reason || "No reason provided"}</p>
                            </div>
                          </div>

                          <div className="flex justify-end gap-3 mt-4">
                            <select
                              value={appointment.status}
                              onChange={(e) => handleStatusChange(appointment._id, e.target.value)}
                              className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Confirmed">Confirmed</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                            <button
                              onClick={() => handleDeleteAppointment(appointment._id)}
                              className="inline-flex items-center gap-1 px-3 py-1 border border-red-300 text-red-600 rounded-md hover:bg-red-50"
                              disabled={loading}
                            >
                              {loading ? (
                                <span className="loading loading-spinner"></span>
                              ) : (
                                <>
                                  <Trash2 className="h-4 w-4" />
                                  Cancel
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'add' && (
            <div className="bg-white rounded-xl overflow-hidden shadow-md p-6">
              <h3 className="text-xl font-semibold text-indigo-600 mb-6">Book a New Appointment</h3>

              {/* Multi-step form with progress indicator */}
              <div className="mb-8">
                <div className="relative mb-4">
                  <div className="overflow-hidden mx-auto flex w-full items-center">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${formStep >= 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'
                      }`}>
                      1
                    </div>
                    <div className={`flex-1 h-0.5 mx-2 ${formStep >= 2 ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${formStep >= 2 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'
                      }`}>
                      2
                    </div>
                    <div className={`flex-1 h-0.5 mx-2 ${formStep >= 3 ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${formStep >= 3 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'
                      }`}>
                      3
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-2 px-1">
                    <span>Purpose</span>
                    <span className="ml-4">Schedule</span>
                    <span>Details</span>
                  </div>
                </div>
              </div>

              {/* Error message */}
              {formError && (
                <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-4 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  {formError}
                </div>
              )}

              {/* Step 1: Purpose */}
              {formStep === 1 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Appointment Subject</label>
                      <input
                        type="text"
                        name="subject"
                        value={newAppointment.subject}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-all"
                        placeholder="e.g. Annual Checkup, Dental Cleaning"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Doctor</label>
                      <select
                        name="doctorId"
                        value={newAppointment.doctorId}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-all"
                      >
                        <option value="" disabled>Select a doctor</option>
                        {formattedDoctors.map((doctor) => (
                          <option key={doctor.id} value={doctor.id}>
                            {doctor.fullName} ({doctor.specialization})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Appointment Type</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div
                          className={`p-4 border rounded-lg flex items-center gap-3 cursor-pointer ${newAppointment.type === 'in-person' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'
                            }`}
                          onClick={() => setNewAppointment({ ...newAppointment, type: 'in-person' })}
                        >
                          <div className={`p-2 rounded-full ${newAppointment.type === 'in-person' ? 'bg-indigo-100' : 'bg-gray-100'
                            }`}>
                            <User className={`h-5 w-5 ${newAppointment.type === 'in-person' ? 'text-indigo-600' : 'text-gray-500'
                              }`} />
                          </div>
                          <div>
                            <div className={`font-medium ${newAppointment.type === 'in-person' ? 'text-indigo-600' : 'text-gray-700'
                              }`}>In-person</div>
                            <div className="text-xs text-gray-500">Visit the clinic</div>
                          </div>
                        </div>
                        <div
                          className={`p-4 border rounded-lg flex items-center gap-3 cursor-pointer ${newAppointment.type === 'video' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'
                            }`}
                          onClick={() => setNewAppointment({ ...newAppointment, type: 'video' })}
                        >
                          <div className={`p-2 rounded-full ${newAppointment.type === 'video' ? 'bg-indigo-100' : 'bg-gray-100'
                            }`}>
                            <svg className={`h-5 w-5 ${newAppointment.type === 'video' ? 'text-indigo-600' : 'text-gray-500'
                              }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                            </svg>
                          </div>
                          <div>
                            <div className={`font-medium ${newAppointment.type === 'video' ? 'text-indigo-600' : 'text-gray-700'
                              }`}>Telehealth</div>
                            <div className="text-xs text-gray-500">Video consultation</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={nextStep}
                      className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-md transition-all"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Schedule */}
              {formStep === 2 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                      <input
                        type="date"
                        name="date"
                        value={newAppointment.date}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                      <input
                        type="time"
                        name="time"
                        value={newAppointment.time}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-all"
                      />
                    </div>

                    {/* Time slots */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Available Time Slots</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'].map((slot) => (
                          <div
                            key={slot}
                            className={`py-2 px-3 text-center border rounded-md cursor-pointer text-sm ${newAppointment.time === `${slot}` ? 'bg-indigo-100 border-indigo-500 text-indigo-700' : 'hover:bg-gray-50'
                              }`}
                            onClick={() => setNewAppointment({ ...newAppointment, time: `${slot}` })}
                          >
                            {slot}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button
                      onClick={prevStep}
                      className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all"
                    >
                      Back
                    </button>
                    <button
                      onClick={nextStep}
                      className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-md transition-all"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Additional Details */}
              {formStep === 3 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Appointment Reason (Optional)</label>
                      <textarea
                        name="reason"
                        value={newAppointment.reason}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-all"
                        placeholder="Any specific concerns or symptoms"
                        rows="3"
                      ></textarea>
                    </div>
                  </div>

                  {/* Summary box */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-700 mb-2">Appointment Summary</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-500">Type:</span> {newAppointment.type === 'video' ? 'Telehealth' : 'In-person'}
                      </div>
                      <div>
                        <span className="text-gray-500">Doctor:</span> {newAppointment.doctorId ? getDoctorName(newAppointment.doctorId) : 'Not specified'}
                      </div>
                      <div>
                        <span className="text-gray-500">Date:</span> {newAppointment.date ? formatDate(newAppointment.date) : 'Not selected'}
                      </div>
                      <div>
                        <span className="text-gray-500">Time:</span> {newAppointment.time ? formatTime(newAppointment.time) : 'Not selected'}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button
                      onClick={prevStep}
                      className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleAddAppointment}
                      className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-md transition-all flex items-center gap-2"
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="loading loading-spinner"></span>
                      ) : (
                        <>
                          <Check className="h-4 w-4" />
                          Book Appointment
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right side: upcoming appointments quick view (only show when in appointments tab) */}
        {activeTab === 'appointments' && (
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-md p-4">
              <h3 className="font-semibold text-gray-800 mb-4">Upcoming</h3>

              {patientAppointments.length === 0 ? (
                <div className="text-center text-gray-500 py-4">
                  No upcoming appointments
                </div>
              ) : (
                <div className="space-y-3">
                  {patientAppointments
                    .filter(app => app.status !== 'Cancelled')
                    .slice(0, 3)
                    .map((appointment) => (
                      <div
                        key={appointment._id}
                        className="border-l-4 border-indigo-500 pl-3 py-2"
                      >
                        <div className="text-sm font-medium text-gray-800">{appointment.subject}</div>
                        <div className="text-xs text-gray-500 flex items-center gap-1">
                          <CalendarDays className="h-3 w-3" />
                          {formatDate(appointment.date)}
                        </div>
                        <div className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatTime(appointment.time)}
                        </div>
                      </div>
                    ))}

                  {patientAppointments.filter(app => app.status !== 'Cancelled').length > 3 && (
                    <div className="text-center pt-2">
                      <button
                        className="text-xs text-indigo-600 hover:text-indigo-800"
                        onClick={() => {
                          const appointmentsSection = document.querySelector('.space-y-4');
                          if (appointmentsSection) {
                            window.scrollTo({ top: appointmentsSection.offsetTop, behavior: 'smooth' });
                          }
                        }}
                      >
                        View all appointments
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments;