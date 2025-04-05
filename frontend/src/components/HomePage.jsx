import React, { useState, useEffect } from 'react';

const HomePage = () => {
  // Hardcoded user data
  const user = {
    name: "Dr. Alice Walker",
    email: "alice.walker@medicareplus.com",
    phone: "123-456-7890",
    role: "doctor",
    specialization: "Cardiology",
    experience: 12,
    licenseNo: "D12345",
    profileImage: null
  };

  const [loading, setLoading] = useState(true);
  const [patientData, setPatientData] = useState([]);

  useEffect(() => {
    // Simulate fetching patient data for doctors
    const fetchPatients = async () => {
      setLoading(true);
      const mockPatients = [
        { id: 1, name: "John Doe", age: 45, lastVisit: "2025-03-28", condition: "Hypertension" },
        { id: 2, name: "Sarah Smith", age: 32, lastVisit: "2025-04-01", condition: "Diabetes" },
        { id: 3, name: "Mike Johnson", age: 58, lastVisit: "2025-03-15", condition: "Arthritis" }
      ];
      setPatientData(mockPatients);
      setLoading(false);
    };

    if (user.role === "doctor") {
      fetchPatients();
    }
  }, []);

  const renderProfileSection = () => (
    <div className="card shadow-xl bg-base-100">
      <div className="card-body">
        <div className="flex items-center mb-6">
          <div className="avatar">
            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
              {user.profileImage ? (
                <img src={user.profileImage} alt="Profile" className="rounded-full" />
              ) : (
                <span className="text-blue-500 text-2xl font-bold">
                  {user.name.charAt(0)}
                </span>
              )}
            </div>
          </div>
          <div className="ml-4">
            <h2 className="card-title">{user.name}</h2>
            <p>{user.role}</p>
            {user.role === "doctor" && <p>{user.specialization}</p>}
          </div>
        </div>

        <div className="mt-4 border-t pt-4 text-sm space-y-2">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>License No:</strong> {user.licenseNo}</p>
          <p><strong>Experience:</strong> {user.experience} years</p>
        </div>

        <button className="btn btn-primary mt-4">Edit Profile</button>
      </div>
    </div>
  );

  const renderDoctorView = () => (
    <div className="card shadow-xl bg-base-100">
      <div className="card-body">
        <h2 className="card-title">My Patients</h2>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p>Loading patient data...</p>
          </div>
        ) : (
          <>
            {patientData.length > 0 ? (
              <div className="overflow-y-auto max-h-96">
                {patientData.map((patient) => (
                  <div key={patient.id} className="border-b py-3 last:border-none">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-bold">{patient.name}</h3>
                        <p className="text-sm">Age: {patient.age} • Last Visit: {patient.lastVisit}</p>
                        <p className="text-sm">Condition: {patient.condition}</p>
                      </div>
                      <button className="btn btn-sm btn-secondary">View Details</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 mt-6">No patients found</p>
            )}

            <button className="btn btn-success mt-6 w-full">Schedule Appointment</button>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Healthcare Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left side - Profile Section */}
        <div className="md:col-span-1">
          {renderProfileSection()}
        </div>

        {/* Right side - Patients Section */}
        <div className="md:col-span-2">
          {renderDoctorView()}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
