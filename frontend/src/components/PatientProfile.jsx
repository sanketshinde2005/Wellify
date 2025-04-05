import { useState } from "react";
import { Edit2, Save, X, User, HeartPulse } from "lucide-react";

export default function PatientProfile({ userData }) {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: userData?.fullName || "Prathamesh Jadhav",
    proffession: userData?.proffession || "Software Engineer",
    mobilenum: userData?.mobilenum || "+91 9876543210",
    email: userData?.email || "prathamesh@wellify.com",
    profilePic: userData?.profilePic || "https://i.pravatar.cc/150?img=11",
    Medicaldetails: {
      height: userData?.Medicaldetails?.height || 175,
      weight: userData?.Medicaldetails?.weight || 68,
      bloodGroup: userData?.Medicaldetails?.bloodGroup || "O+",
    },
    medicalHistory: userData?.medicalHistory || "Allergy, Migraine",
    age: userData?.age || 23,
    gender: userData?.gender || "Male",
    address: userData?.address || "456, Wellness Nagar, Nashik",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = () => {
    console.log("Saved:", formData);
    setEditing(false);
  };

  const handleCancel = () => {
    setEditing(false);
  };

  return (
    <div className="min-h-screen bg-blue-50 py-10 px-4">
      <div className="max-w-6xl mx-auto card bg-white shadow-xl rounded-2xl overflow-hidden border border-blue-200">
        {/* Header */}
        <div className="bg-blue-200 text-blue-900 py-8 px-6 flex flex-col md:flex-row items-center gap-6">
          <div className="avatar">
            <div className="w-28 rounded-full ring ring-white ring-offset-blue-100 ring-offset-2">
              <img src={formData.profilePic} />
            </div>
          </div>
          <div className="flex-1">
            {editing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  name="fullName"
                  className="input input-bordered w-full"
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
                <input
                  name="proffession"
                  className="input input-bordered w-full"
                  value={formData.proffession}
                  onChange={handleInputChange}
                />
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold">{formData.fullName}</h2>
                <p className="text-md">{formData.proffession}</p>
                <p className="text-sm opacity-80">
                  Age: {formData.age} • {formData.gender}
                </p>
              </>
            )}
          </div>
          <div className="flex gap-2">
            {editing ? (
              <>
                <button onClick={handleSave} className="btn btn-success btn-sm">
                  <Save size={18} /> Save
                </button>
                <button onClick={handleCancel} className="btn btn-outline btn-sm">
                  <X size={18} /> Cancel
                </button>
              </>
            ) : (
              <button onClick={() => setEditing(true)} className="btn btn-primary btn-sm">
                <Edit2 size={18} /> Edit
              </button>
            )}
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid md:grid-cols-2 gap-6 p-6 text-blue-900">
          {/* Personal Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2 text-blue-700">
              <User size={20} /> Personal Information
            </h3>
            {[
              ["email", "Email"],
              ["mobilenum", "Mobile Number"],
              ["address", "Address"],
              ["age", "Age"],
            ].map(([name, label]) => (
              <div key={name}>
                <label className="label text-sm">{label}</label>
                {editing ? (
                  name === "address" ? (
                    <textarea
                      name={name}
                      className="textarea textarea-bordered w-full"
                      value={formData[name]}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <input
                      name={name}
                      className="input input-bordered w-full"
                      value={formData[name]}
                      onChange={handleInputChange}
                    />
                  )
                ) : (
                  <p>{formData[name]}</p>
                )}
              </div>
            ))}
            {/* Gender select */}
            <div>
              <label className="label text-sm">Gender</label>
              {editing ? (
                <select
                  name="gender"
                  className="select select-bordered w-full"
                  value={formData.gender}
                  onChange={handleInputChange}
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              ) : (
                <p>{formData.gender}</p>
              )}
            </div>
          </div>

          {/* Medical Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2 text-blue-700">
              <HeartPulse size={20} /> Medical Information
            </h3>
            {[
              ["Medicaldetails.height", "Height (cm)"],
              ["Medicaldetails.weight", "Weight (kg)"],
              ["Medicaldetails.bloodGroup", "Blood Group"],
            ].map(([name, label]) => (
              <div key={name}>
                <label className="label text-sm">{label}</label>
                {editing ? (
                  <input
                    name={name}
                    className="input input-bordered w-full"
                    value={formData.Medicaldetails[name.split(".")[1]]}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p>{formData.Medicaldetails[name.split(".")[1]]}</p>
                )}
              </div>
            ))}

            {/* Medical History */}
            <div>
              <label className="label text-sm">Medical History</label>
              {editing ? (
                <textarea
                  name="medicalHistory"
                  className="textarea textarea-bordered w-full"
                  value={formData.medicalHistory}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{formData.medicalHistory}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}