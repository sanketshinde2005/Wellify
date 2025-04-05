import React from "react";
import { CalendarDays, Clock, MapPin, Video } from "lucide-react";

export function UpcomingAppointments() {
  const appointments = [
    {
      id: 1,
      doctor: {
        name: "Dr. Emily Chen",
        specialty: "Cardiologist",
        initials: "EC",
      },
      date: "April 6, 2025",
      time: "10:00 AM",
      type: "video",
      status: "confirmed",
    },
    {
      id: 2,
      doctor: {
        name: "Dr. Michael Johnson",
        specialty: "Primary Care",
        initials: "MJ",
        location: "Wellify Medical Center",
      },
      date: "April 12, 2025",
      time: "2:30 PM",
      type: "in-person",
      status: "confirmed",
    },
    {
      id: 3,
      doctor: {
        name: "Dr. Sarah Williams",
        specialty: "Dermatologist",
        initials: "SW",
      },
      date: "April 18, 2025",
      time: "11:15 AM",
      type: "video",
      status: "pending",
    },
  ];

  return (
    <div className="card bg-base-100 shadow-xl w-full max-w-4xl mx-auto mt-8 border border-base-300 rounded-xl">
      <div className="card-body">
        <h2 className="card-title text-2xl font-bold text-base-content">
          Upcoming Appointments
        </h2>
        <p className="text-base-content mb-6">
          Stay on top of your healthcare schedule with your upcoming appointments.
        </p>
        <div className="space-y-6">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex flex-col gap-4 rounded-lg bg-base-200 hover:bg-base-300 transition-all p-4 md:flex-row md:items-center"
            >
              {/* Doctor Info */}
              <div className="flex items-center gap-4 md:w-1/3">
                <div className="avatar">
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-md">
                    <span className="font-bold text-lg">{appointment.doctor.initials}</span>
                  </div>
                </div>
                <div>
                  <p className="font-medium text-lg text-base-content">
                    {appointment.doctor.name}
                  </p>
                  <p className="text-sm text-muted-content">
                    {appointment.doctor.specialty}
                  </p>
                </div>
              </div>

              {/* Appointment Details */}
              <div className="flex flex-1 flex-col gap-2 md:w-1/3">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-5 w-5 text-primary" />
                  <span className="text-sm text-base-content">{appointment.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="text-sm text-base-content">{appointment.time}</span>
                </div>
                {appointment.type === "in-person" && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span className="text-sm text-base-content">
                      {appointment.doctor.location}
                    </span>
                  </div>
                )}
              </div>

              {/* Status and Action Buttons */}
              <div className="flex items-center justify-between gap-4 md:w-1/3 md:justify-end">
                <span
                  className={`badge ${
                    appointment.status === "confirmed"
                      ? "badge-success"
                      : "badge-warning"
                  } badge-lg`}
                >
                  {appointment.status.charAt(0).toUpperCase() +
                    appointment.status.slice(1)}
                </span>
                {appointment.type === "video" ? (
                  <button className="btn btn-sm btn-primary flex items-center gap-2">
                    <Video className="h-5 w-5" />
                    <span>Join</span>
                  </button>
                ) : (
                  <button className="btn btn-sm btn-outline">Details</button>
                )}
              </div>
            </div>
          ))}
        </div>
        {/* Footer Action */}
        <div className="mt-6 flex justify-center">
          <button className="btn btn-outline btn-lg">View All Appointments</button>
        </div>
      </div>
    </div>
  );
}
