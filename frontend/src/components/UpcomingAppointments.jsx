import React, { useState } from "react";
import { CalendarDays, Clock, MapPin, ChevronRight, Clipboard, Shield, User } from "lucide-react";

export function UpcomingAppointments() {
  const appointments = [
    {
      id: 1,
      doctor: {
        name: "Dr. Emily Chen",
        specialty: "Cardiologist",
        initials: "EC",
        rating: 4.9,
      },
      subject: "Annual Cardiovascular Checkup",
      date: "April 6, 2025",
      time: "10:00 AM",
      type: "video",
      status: "confirmed",
      notes: "Annual heart checkup",
      preparation: "Fast for 8 hours before appointment"
    },
    {
      id: 2,
      doctor: {
        name: "Dr. Michael Johnson",
        specialty: "Primary Care",
        initials: "MJ",
        location: "Wellify Medical Center",
        rating: 4.7,
      },
      subject: "Quarterly Health Assessment",
      date: "April 12, 2025",
      time: "2:30 PM",
      type: "in-person",
      status: "confirmed",
      notes: "Routine physical examination",
      preparation: "Bring current medication list"
    },
    {
      id: 3,
      doctor: {
        name: "Dr. Sarah Williams",
        specialty: "Dermatologist",
        initials: "SW",
        rating: 4.8,
      },
      subject: "Skin Condition Consultation",
      date: "April 18, 2025",
      time: "11:15 AM",
      type: "video",
      status: "pending",
      notes: "Follow-up on skin condition",
      preparation: "Take photos of affected areas"
    },
  ];

  const [expandedAppointment, setExpandedAppointment] = useState(null);

  const toggleAppointmentDetails = (id) => {
    if (expandedAppointment === id) {
      setExpandedAppointment(null);
    } else {
      setExpandedAppointment(id);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl shadow-lg w-full max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          Upcoming Appointments
        </h2>
        <p className="text-gray-600">
          Managing your wellness journey with personalized care
        </p>
      </div>

      <div className="space-y-4">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all"
          >
            {/* Main appointment card content */}
            <div 
              className="p-4 cursor-pointer"
              onClick={() => toggleAppointmentDetails(appointment.id)}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`px-3 py-1 text-xs font-medium rounded-full ${
                  appointment.type === "video" 
                    ? "bg-blue-100 text-blue-700" 
                    : "bg-purple-100 text-purple-700"
                }`}>
                  {appointment.type === "video" ? "Telehealth" : "In-person"}
                </div>
                <div className={`px-3 py-1 text-xs font-medium rounded-full ${
                  appointment.status === "confirmed" 
                    ? "bg-green-100 text-green-700" 
                    : "bg-amber-100 text-amber-700"
                }`}>
                  {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                {/* Doctor Info */}
                <div className="flex items-center gap-3 md:w-1/3">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-lg shadow-md border-2 border-white">
                      {appointment.doctor.initials}
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-indigo-600 text-white text-xs rounded-full px-1.5 py-0.5 border border-white">
                      {appointment.doctor.rating}
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {appointment.doctor.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {appointment.doctor.specialty}
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
                      <span className="text-sm text-gray-700">{appointment.date}</span>
                    </div>
                    <div className="inline-flex items-center gap-2">
                      <div className="p-1.5 bg-indigo-100 rounded-full">
                        <Clock className="h-4 w-4 text-indigo-600" />
                      </div>
                      <span className="text-sm text-gray-700">{appointment.time}</span>
                    </div>
                    {appointment.type === "in-person" && (
                      <div className="inline-flex items-center gap-2 md:col-span-2">
                        <div className="p-1.5 bg-indigo-100 rounded-full">
                          <MapPin className="h-4 w-4 text-indigo-600" />
                        </div>
                        <span className="text-sm text-gray-700">
                          {appointment.doctor.location}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Expand indicator */}
                <div className="flex justify-end">
                  <ChevronRight 
                    className={`h-5 w-5 text-gray-400 transform transition-transform ${
                      expandedAppointment === appointment.id ? "rotate-90" : ""
                    }`} 
                  />
                </div>
              </div>
            </div>

            {/* Expanded details section */}
            {expandedAppointment === appointment.id && (
              <div className="px-4 pb-4 pt-2 border-t border-gray-100">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2 text-gray-800">
                      <Clipboard className="h-4 w-4 text-indigo-600" />
                      <span className="font-medium">Appointment Notes</span>
                    </div>
                    <p className="text-sm text-gray-600">{appointment.notes}</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2 text-gray-800">
                      <Shield className="h-4 w-4 text-indigo-600" />
                      <span className="font-medium">Preparation</span>
                    </div>
                    <p className="text-sm text-gray-600">{appointment.preparation}</p>
                  </div>
                </div>
                
                <div className="flex justify-end gap-3 mt-4">
                  <button className="btn btn-sm text-gray-700 border-gray-300 hover:bg-gray-100 bg-transparent">
                    Reschedule
                  </button>
                  <button className="btn btn-sm text-red-600 border-red-300 hover:bg-red-50 bg-transparent">
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer Actions */}
      <div className="mt-8 flex justify-center">
        <button className="btn px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 border-none text-white hover:shadow-lg shadow-md transition-all">
          Schedule New Appointment
        </button>
      </div>
    </div>
  );
}