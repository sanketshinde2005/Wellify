import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Activity, Users, Clock, Shield, ChevronRight, Award, 
  Heart, Phone, Mail, MapPin, CheckCircle, Calendar,
  User, Briefcase, PieChart, TrendingUp
} from 'lucide-react';

const HomePage1 = () => {
    
  // Sample data for appointments and patients
  const completedAppointments = 145;
  const totalAppointments = 168;
  const completionRate = Math.round((completedAppointments / totalAppointments) * 100);
  
  const recentPatients = [
    { id: 1, name: "Emma Johnson", date: "April 2, 2025", department: "Cardiology", status: "Completed", visited: "Yes" },
    { id: 2, name: "Michael Chen", date: "April 3, 2025", department: "Neurology", status: "Scheduled", visited: "No" },
    { id: 3, name: "Sophia Rodriguez", date: "April 3, 2025", department: "Pediatrics", status: "Completed", visited: "Yes" },
    { id: 4, name: "James Wilson", date: "April 4, 2025", department: "Orthopedics", status: "In Progress", visited: "Yes" },
    { id: 5, name: "Olivia Thompson", date: "April 5, 2025", department: "Dermatology", status: "Scheduled", visited: "No" },
  ];

  return (
    <div className="min-h-screen bg-base-100">
      {/* Header with Doctor Profile */}
      <header className="bg-base-200 shadow-lg">
        <div className="container mx-auto p-4">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <div className="flex items-center gap-4 mb-4 lg:mb-0">
              <div className="avatar placeholder">
                <div className="bg-primary text-primary-content rounded-full w-12">
                  <Heart size={24} />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold">MediCare+ Dashboard</h1>
                <p className="text-sm opacity-70">Welcome back, Dr. Wilson</p>
              </div>
            </div>
            
            {/* Doctor Profile Card */}
            <div className="card card-side bg-base-100 shadow-xl w-full lg:w-auto">
              <figure className="p-2">
                <div className="avatar">
                  <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src="/api/placeholder/150/150" alt="Dr. Sarah Wilson" />
                  </div>
                </div>
              </figure>
              <div className="card-body p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="card-title text-lg">Dr. Sarah Wilson</h2>
                    <p className="text-sm mb-1">Senior Cardiologist</p>
                    <div className="badge badge-primary">10+ Years Experience</div>
                  </div>
                  <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-xs">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
                    </div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                      <li><a>View Profile</a></li>
                      <li><a>Edit Profile</a></li>
                      <li><a>Settings</a></li>
                    </ul>
                  </div>
                </div>
                <p className="text-sm opacity-75">Specializing in cardiovascular health with expertise in preventive cardiology and advanced heart treatments.</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Appointment Stats */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Completed Appointments */}
            <div className="card bg-base-100 shadow-lg border border-base-300">
              <div className="card-body p-6">
                <div className="flex justify-between items-center">
                  <h3 className="card-title text-lg">Appointments</h3>
                  <div className="avatar placeholder">
                    <div className="bg-primary text-primary-content rounded-full w-12">
                      <Calendar size={20} />
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-3xl font-bold">{completedAppointments}</p>
                      <p className="text-sm opacity-70">of {totalAppointments} completed</p>
                    </div>
                    <div className="flex items-center gap-1 text-success">
                      <TrendingUp size={16} />
                      <span className="font-medium">{completionRate}%</span>
                    </div>
                  </div>
                  <progress 
                    className="progress progress-primary w-full mt-2" 
                    value={completedAppointments} 
                    max={totalAppointments}
                  ></progress>
                </div>
              </div>
            </div>
            
            {/* Patients */}
            <div className="card bg-base-100 shadow-lg border border-base-300">
              <div className="card-body p-6">
                <div className="flex justify-between items-center">
                  <h3 className="card-title text-lg">Patients</h3>
                  <div className="avatar placeholder">
                    <div className="bg-secondary text-secondary-content rounded-full w-12">
                      <Users size={20} />
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-3xl font-bold">284</p>
                  <p className="text-sm opacity-70">Total patients</p>
                  <div className="flex items-center gap-1 text-success mt-2">
                    <TrendingUp size={16} />
                    <span className="font-medium">+12 this week</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Department Performance */}
            <div className="card bg-base-100 shadow-lg border border-base-300">
              <div className="card-body p-6">
                <div className="flex justify-between items-center">
                  <h3 className="card-title text-lg">Department</h3>
                  <div className="avatar placeholder">
                    <div className="bg-accent text-accent-content rounded-full w-12">
                      <Briefcase size={20} />
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-3xl font-bold">94%</p>
                  <p className="text-sm opacity-70">Performance rating</p>
                  <div className="flex items-center gap-1 text-success mt-2">
                    <TrendingUp size={16} />
                    <span className="font-medium">Top performing</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Revenue */}
            <div className="card bg-base-100 shadow-lg border border-base-300">
              <div className="card-body p-6">
                <div className="flex justify-between items-center">
                  <h3 className="card-title text-lg">Revenue</h3>
                  <div className="avatar placeholder">
                    <div className="bg-info text-info-content rounded-full w-12">
                      <PieChart size={20} />
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-3xl font-bold">$48,750</p>
                  <p className="text-sm opacity-70">Monthly total</p>
                  <div className="flex items-center gap-1 text-success mt-2">
                    <TrendingUp size={16} />
                    <span className="font-medium">+8.2% from last month</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Patient Table */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="card-title text-2xl">Recent Patients</h2>
                <div className="flex gap-2">
                  <button className="btn btn-sm btn-outline">
                    View All
                  </button>
                  <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-sm btn-ghost">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
                    </div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                      <li><a>Filter</a></li>
                      <li><a>Export</a></li>
                      <li><a>Print</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  <thead>
                    <tr>
                      <th>Patient Name</th>
                      <th>Date</th>
                      <th>Doctor Department</th>
                      <th>Status</th>
                      <th>Visited</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentPatients.map(patient => (
                      <tr key={patient.id}>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar placeholder">
                              <div className="bg-neutral-focus text-neutral-content rounded-full w-10">
                                <span>{patient.name.charAt(0)}</span>
                              </div>
                            </div>
                            <div>
                              <div className="font-bold">{patient.name}</div>
                              <div className="text-sm opacity-50">Patient #{patient.id}</div>
                            </div>
                          </div>
                        </td>
                        <td>{patient.date}</td>
                        <td>{patient.department}</td>
                        <td>
                          <div className={`badge ${
                            patient.status === 'Completed' ? 'badge-success' : 
                            patient.status === 'In Progress' ? 'badge-warning' : 'badge-info'
                          } badge-outline`}>
                            {patient.status}
                          </div>
                        </td>
                        <td>
                          {patient.visited === 'Yes' ? (
                            <div className="flex items-center gap-1 text-success">
                              <CheckCircle size={16} />
                              <span>Yes</span>
                            </div>
                          ) : (
                            <span className="opacity-60">No</span>
                          )}
                        </td>
                        <td>
                          <div className="flex gap-2">
                            <button className="btn btn-sm btn-outline btn-primary">View</button>
                            <button className="btn btn-sm btn-ghost">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="flex justify-between items-center mt-4">
                <div className="text-sm opacity-70">
                  Showing 5 of 35 patients
                </div>
                <div className="join">
                  <button className="join-item btn btn-sm">«</button>
                  <button className="join-item btn btn-sm btn-active">1</button>
                  <button className="join-item btn btn-sm">2</button>
                  <button className="join-item btn btn-sm">3</button>
                  <button className="join-item btn btn-sm">»</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <Link to="/appointments" className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-primary">
              <div className="card-body items-center text-center p-6">
                <div className="avatar placeholder mb-3">
                  <div className="bg-primary text-primary-content rounded-full w-16 p-4">
                    <Calendar size={28} />
                  </div>
                </div>
                <h3 className="card-title">Schedule Appointment</h3>
              </div>
            </Link>
            
            <Link to="/patients/new" className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-secondary">
              <div className="card-body items-center text-center p-6">
                <div className="avatar placeholder mb-3">
                  <div className="bg-secondary text-secondary-content rounded-full w-16 p-4">
                    <User size={28} />
                  </div>
                </div>
                <h3 className="card-title">Add Patient</h3>
              </div>
            </Link>
            
            <Link to="/reports" className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-accent">
              <div className="card-body items-center text-center p-6">
                <div className="avatar placeholder mb-3">
                  <div className="bg-accent text-accent-content rounded-full w-16 p-4">
                    <Activity size={28} />
                  </div>
                </div>
                <h3 className="card-title">View Reports</h3>
              </div>
            </Link>
            
            <Link to="/messages" className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-info">
              <div className="card-body items-center text-center p-6">
                <div className="avatar placeholder mb-3">
                  <div className="bg-info text-info-content rounded-full w-16 p-4">
                    <Mail size={28} />
                  </div>
                </div>
                <h3 className="card-title">Messages</h3>
                <div className="badge badge-primary absolute top-2 right-2">3</div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer footer-center p-4 bg-base-300 text-base-content mt-12">
        <div>
          <p>© 2025 MediCare+ Dashboard. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage1;