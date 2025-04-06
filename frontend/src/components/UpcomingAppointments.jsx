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
    <div className="bg-base-200 p-6 rounded-xl shadow-lg w-full max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-primary">
          Upcoming Appointments
        </h2>
        <p className="text-base-content/70">
          Managing your wellness journey with personalized care
        </p>
      </div>

      <div className="space-y-4">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="bg-base-100 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all"
          >
            {/* Main appointment card content */}
            <div 
              className="p-4 cursor-pointer"
              onClick={() => toggleAppointmentDetails(appointment.id)}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`px-3 py-1 text-xs font-medium rounded-full ${
                  appointment.type === "video" 
                    ? "bg-info/20 text-info" 
                    : "bg-secondary/20 text-secondary"
                }`}>
                  {appointment.type === "video" ? "Telehealth" : "In-person"}
                </div>
                <div className={`px-3 py-1 text-xs font-medium rounded-full ${
                  appointment.status === "confirmed" 
                    ? "bg-success/20 text-success" 
                    : "bg-warning/20 text-warning"
                }`}>
                  {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                {/* Doctor Info */}
                <div className="flex items-center gap-3 md:w-1/3">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br from-primary to-secondary text-base-100 font-bold text-lg shadow-md border-2 border-base-100">
                      {appointment.doctor.initials}
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-primary text-primary-content text-xs rounded-full px-1.5 py-0.5 border border-base-100">
                      {appointment.doctor.rating}
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-base-content">
                      {appointment.doctor.name}
                    </p>
                    <p className="text-sm text-base-content/70">
                      {appointment.doctor.specialty}
                    </p>
                  </div>
                </div>

                {/* Appointment Details */}
                <div className="flex flex-1 flex-col gap-2 md:w-2/3">
                  <div className="text-primary font-medium mb-1">
                    {appointment.subject}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="inline-flex items-center gap-2">
                      <div className="p-1.5 bg-primary/10 rounded-full">
                        <CalendarDays className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm text-base-content/80">{appointment.date}</span>
                    </div>
                    <div className="inline-flex items-center gap-2">
                      <div className="p-1.5 bg-primary/10 rounded-full">
                        <Clock className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm text-base-content/80">{appointment.time}</span>
                    </div>
                    {appointment.type === "in-person" && (
                      <div className="inline-flex items-center gap-2 md:col-span-2">
                        <div className="p-1.5 bg-primary/10 rounded-full">
                          <MapPin className="h-4 w-4 text-primary" />
                        </div>
                        <span className="text-sm text-base-content/80">
                          {appointment.doctor.location}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Expand indicator */}
                <div className="flex justify-end">
                  <ChevronRight 
                    className={`h-5 w-5 text-base-content/50 transform transition-transform ${
                      expandedAppointment === appointment.id ? "rotate-90" : ""
                    }`} 
                  />
                </div>
              </div>
            </div>

            {/* Expanded details section */}
            {expandedAppointment === appointment.id && (
              <div className="px-4 pb-4 pt-2 border-t border-base-200">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-base-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2 text-base-content">
                      <Clipboard className="h-4 w-4 text-primary" />
                      <span className="font-medium">Appointment Notes</span>
                    </div>
                    <p className="text-sm text-base-content/70">{appointment.notes}</p>
                  </div>
                  
                  <div className="bg-base-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2 text-base-content">
                      <Shield className="h-4 w-4 text-primary" />
                      <span className="font-medium">Preparation</span>
                    </div>
                    <p className="text-sm text-base-content/70">{appointment.preparation}</p>
                  </div>
                </div>
                
                <div className="flex justify-end gap-3 mt-4">
                  <button className="btn btn-sm btn-ghost">
                    Reschedule
                  </button>
                  <button className="btn btn-sm btn-error btn-outline">
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}