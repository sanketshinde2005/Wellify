import React, { useState, useEffect } from 'react';

const HomePage = ({ user }) => {
  const [loading, setLoading] = useState(true);
  const [patientData, setPatientData] = useState([]);
  const [healthHistory, setHealthHistory] = useState([]);

  useEffect(() => {
    // Simulate fetching data
    const fetchData = async () => {
      setLoading(true);
      try {
        if (user.role === 'doctor') {
          // Fetch patients data for doctor
          // In a real app, this would be an API call
          const mockPatients = [
            { id: 1, name: 'John Doe', age: 45, lastVisit: '2025-03-28', condition: 'Hypertension' },
            { id: 2, name: 'Sarah Smith', age: 32, lastVisit: '2025-04-01', condition: 'Diabetes' },
            { id: 3, name: 'Mike Johnson', age: 58, lastVisit: '2025-03-15', condition: 'Arthritis' }
          ];
          setPatientData(mockPatients);
        } else if (user.role === 'patient') {
          // Fetch health history for patient
          const mockHealthHistory = [
            { id: 1, date: '2025-03-28', doctor: 'Dr. Williams', diagnosis: 'Common Cold', prescription: 'Paracetamol' },
            { id: 2, date: '2025-02-15', doctor: 'Dr. Johnson', diagnosis: 'Seasonal Allergy', prescription: 'Cetirizine' },
            { id: 3, date: '2024-12-10', doctor: 'Dr. Williams', diagnosis: 'Annual Checkup', prescription: 'None' }
          ];
          setHealthHistory(mockHealthHistory);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user.role]);

  const renderProfileSection = () => (
    <div className="bg-white rounded-lg shadow-md p-6 h-full">
      <div className="flex items-center mb-6">
        <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mr-4">
          {user.profileImage ? (
            <img src={user.profileImage} alt="Profile" className="w-full h-full rounded-full" />
          ) : (
            <span className="text-blue-500 text-2xl font-bold">
              {user.name.charAt(0)}
            </span>
          )}
        </div>
        <div>
          <h2 className="text-xl font-bold">{user.name}</h2>
          <p className="text-gray-600 capitalize">{user.role}</p>
          {user.role === 'doctor' && <p className="text-gray-600">{user.specialization}</p>}
          {user.role === 'patient' && <p className="text-gray-600">ID: {user.patientId}</p>}
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="mb-2">
          <span className="font-medium text-gray-700">Email:</span> {user.email}
        </div>
        <div className="mb-2">
          <span className="font-medium text-gray-700">Phone:</span> {user.phone}
        </div>
        {user.role === 'doctor' && (
          <>
            <div className="mb-2">
              <span className="font-medium text-gray-700">License No:</span> {user.licenseNo}
            </div>
            <div className="mb-2">
              <span className="font-medium text-gray-700">Experience:</span> {user.experience} years
            </div>
          </>
        )}
        {user.role === 'patient' && (
          <>
            <div className="mb-2">
              <span className="font-medium text-gray-700">Age:</span> {user.age} years
            </div>
            <div className="mb-2">
              <span className="font-medium text-gray-700">Blood Group:</span> {user.bloodGroup}
            </div>
          </>
        )}
      </div>
      
      <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition">
        Edit Profile
      </button>
    </div>
  );

  const renderDoctorView = () => (
    <div className="bg-white rounded-lg shadow-md p-6 h-full">
      <h2 className="text-xl font-bold mb-4">My Patients</h2>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p>Loading patient data...</p>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search patients..."
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          
          {patientData.length > 0 ? (
            <div className="overflow-y-auto max-h-96">
              {patientData.map(patient => (
                <div key={patient.id} className="border-b py-3 last:border-none">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{patient.name}</h3>
                      <p className="text-sm text-gray-600">Age: {patient.age} • Last Visit: {patient.lastVisit}</p>
                      <p className="text-sm text-gray-600">Condition: {patient.condition}</p>
                    </div>
                    <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 py-1 px-3 rounded-md text-sm transition">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No patients found</p>
            </div>
          )}
          
          <button className="mt-6 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition w-full">
            Schedule Appointment
          </button>
        </>
      )}
    </div>
  );

  const renderPatientView = () => (
    <div className="bg-white rounded-lg shadow-md p-6 h-full">
      <h2 className="text-xl font-bold mb-4">My Health History</h2>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p>Loading health history...</p>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-2">
              <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 py-1 px-3 rounded-md text-sm transition">
                All Records
              </button>
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-1 px-3 rounded-md text-sm transition">
                Prescriptions
              </button>
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-1 px-3 rounded-md text-sm transition">
                Lab Results
              </button>
            </div>
          </div>
          
          {healthHistory.length > 0 ? (
            <div className="overflow-y-auto max-h-96">
              {healthHistory.map(record => (
                <div key={record.id} className="border-b py-3 last:border-none">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center">
                        <span className="font-semibold">{record.diagnosis}</span>
                        <span className="ml-2 text-sm text-gray-500">{record.date}</span>
                      </div>
                      <p className="text-sm text-gray-600">Doctor: {record.doctor}</p>
                      <p className="text-sm text-gray-600">Prescription: {record.prescription}</p>
                    </div>
                    <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 py-1 px-3 rounded-md text-sm transition">
                      Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No health records found</p>
            </div>
          )}
          
          <div className="mt-6 flex space-x-3">
            <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition flex-1">
              Book Appointment
            </button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition flex-1">
              Request Prescription
            </button>
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Healthcare Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left side - User Profile (common for both roles) */}
        <div className="md:col-span-1">
          {renderProfileSection()}
        </div>
        
        {/* Right side - Role specific content */}
        <div className="md:col-span-2">
          {user.role === 'doctor' ? renderDoctorView() : renderPatientView()}
        </div>
      </div>
    </div>
  );
};

export default HomePage;