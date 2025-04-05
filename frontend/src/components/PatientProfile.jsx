import { useState } from "react";
import { Edit2, Save, X, User, HeartPulse } from "lucide-react";
import { useAuthstore } from "../store/useAuthstore";
import { Loader2 } from "lucide-react";

export default function PatientProfile() {
  const { authUser, update, isUpdatingProfile } = useAuthstore();
  const [editing, setEditing] = useState(false);

  const [formData, setFormData] = useState({
    fullName: authUser?.fullName || "",
    proffession: authUser?.proffession || "",
    mobilenum: authUser?.mobilenum || "",
    email: authUser?.email || "",
    profilePic: authUser?.profilePic || "",
    HomeAddress: authUser?.HomeAddress || "",
    Medicaldetails: {
      age: authUser?.Medicaldetails?.age || 0,
      height: authUser?.Medicaldetails?.height || 0,
      weight: authUser?.Medicaldetails?.weight || 0,
      bloodGroup: authUser?.Medicaldetails?.bloodGroup || "",
    },
    medicalHistory: authUser?.medicalHistory || "",
    gender: authUser?.gender || "Other",
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

  const handleSave = async () => {
    await update(formData);
    setEditing(false);
  };

  const handleCancel = () => {
    setEditing(false);
    setFormData({
      fullName: authUser?.fullName || "",
      proffession: authUser?.proffession || "",
      mobilenum: authUser?.mobilenum || "",
      email: authUser?.email || "",
      profilePic: authUser?.profilePic || "",
      HomeAddress: authUser?.HomeAddress || "",
      Medicaldetails: {
        age: authUser?.Medicaldetails?.age || 0,
        height: authUser?.Medicaldetails?.height || 0,
        weight: authUser?.Medicaldetails?.weight || 0,
        bloodGroup: authUser?.Medicaldetails?.bloodGroup || "",
      },
      medicalHistory: authUser?.medicalHistory || "",
      gender: authUser?.gender || "Other",
    });
  };

  return (
    <div className="py-6 px-4 w-full max-w-4xl mx-auto">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body p-0">
          <div className="bg-primary/10 text-primary p-6 flex flex-col md:flex-row items-center gap-6">
            <div className="avatar">
              <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src={formData.profilePic || "https://i.pravatar.cc/150?img=11"}
                  alt="Profile"
                />
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
                    Age: {formData.Medicaldetails.age} • {formData.gender}
                  </p>
                </>
              )}
            </div>

            <div className="flex gap-2">
              {editing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="btn btn-success btn-sm"
                    disabled={isUpdatingProfile}
                  >
                    {isUpdatingProfile ? (
                      <Loader2 className="animate-spin" size={18} />
                    ) : (
                      <Save size={18} />
                    )}
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="btn btn-outline btn-sm"
                  >
                    <X size={18} /> Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setEditing(true)}
                  className="btn btn-primary btn-sm"
                >
                  <Edit2 size={18} /> Edit
                </button>
              )}
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid md:grid-cols-2 gap-6 p-6">
            {/* Personal Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold flex items-center gap-2 text-primary">
                <User size={20} /> Personal Information
              </h3>
              {[
                ["email", "Email"],
                ["mobilenum", "Mobile Number"],
                ["HomeAddress", "Home Address"],
              ].map(([name, label]) => (
                <div key={name}>
                  <label className="label text-sm font-medium">{label}</label>
                  {editing ? (
                    name === "HomeAddress" ? (
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
                    <p className="py-1">{formData[name]}</p>
                  )}
                </div>
              ))}

              <div>
                <label className="label text-sm font-medium">Age</label>
                {editing ? (
                  <input
                    name="Medicaldetails.age"
                    className="input input-bordered w-full"
                    value={formData.Medicaldetails.age}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p className="py-1">{formData.Medicaldetails.age}</p>
                )}
              </div>

              <div>
                <label className="label text-sm font-medium">Gender</label>
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
                  <p className="py-1">{formData.gender}</p>
                )}
              </div>
            </div>

            {/* Medical Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold flex items-center gap-2 text-primary">
                <HeartPulse size={20} /> Medical Information
              </h3>
              {[
                ["Medicaldetails.height", "Height (cm)"],
                ["Medicaldetails.weight", "Weight (kg)"],
                ["Medicaldetails.bloodGroup", "Blood Group"],
              ].map(([name, label]) => (
                <div key={name}>
                  <label className="label text-sm font-medium">{label}</label>
                  {editing ? (
                    <input
                      name={name}
                      className="input input-bordered w-full"
                      value={formData.Medicaldetails[name.split(".")[1]]}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p className="py-1">
                      {formData.Medicaldetails[name.split(".")[1]]}
                    </p>
                  )}
                </div>
              ))}
              <div>
                <label className="label text-sm font-medium">
                  Medical History
                </label>
                {editing ? (
                  <textarea
                    name="medicalHistory"
                    className="textarea textarea-bordered w-full"
                    value={formData.medicalHistory}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p className="py-1">{formData.medicalHistory}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
