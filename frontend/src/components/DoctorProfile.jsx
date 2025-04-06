import { useState } from "react";
import {
  Edit2, CalendarDays, FileText, Users, PhoneCall, GraduationCap,
  MapPin, Mail, Star, Award, Save, X
} from "lucide-react";
import { useAuthstore } from "../store/useAuthstore";

export default function DoctorProfile() {
  const { authUser, update } = useAuthstore();
  const [isEditing, setIsEditing] = useState(false);

  const [doctorData, setDoctorData] = useState({
    fullName: authUser.fullName,
    specialdegree: authUser.specialdegree,
    experience: "10+ Years",
    email: authUser.email,
    phone: authUser.mobilenum,
    clinicAddress: "123, Wellness Street, Pune",
    qualifications: "MBBS, MD (Cardiology)",
    bio: authUser?.about || "Nothing Added",
    profilePic: "https://i.pravatar.cc/150?img=12",
    stats: {
      patientsTreated: authUser?.patientsTreated || 0,
      yearsExperience: authUser.experience || 0,
      rating: 4.8,
    },
    specializations: authUser?.specialization || [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.includes('.')) {
      // Handle nested objects like stats.yearsExperience
      const [parent, child] = name.split('.');
      setDoctorData({
        ...doctorData,
        [parent]: {
          ...doctorData[parent],
          [child]: value
        }
      });
    } else {
      setDoctorData({
        ...doctorData,
        [name]: value
      });
    }
  };

  const handleSpecializationChange = (index, value) => {
    const updatedSpecializations = [...doctorData.specializations];
    updatedSpecializations[index] = value;
    setDoctorData({
      ...doctorData,
      specializations: updatedSpecializations
    });
  };

  const addSpecialization = () => {
    setDoctorData({
      ...doctorData,
      specializations: [...doctorData.specializations, ""]
    });
  };

  const removeSpecialization = (index) => {
    const updatedSpecializations = [...doctorData.specializations];
    updatedSpecializations.splice(index, 1);
    setDoctorData({
      ...doctorData,
      specializations: updatedSpecializations
    });
  };

  const handleSave = async () => {
    // Here you would typically send data to your backend
    console.log("Saving doctor data:", doctorData);
    // Filter out any empty specializations
    const filteredSpecializations = doctorData.specializations.filter(spec => spec.trim() !== "");
    setDoctorData({
      ...doctorData,
      specializations: filteredSpecializations
    });
    setIsEditing(false);
    await update({
      ...authUser,
      fullName: doctorData.fullName,
      specialdegree: doctorData.specialdegree,
      email: doctorData.email,
      mobilenum: doctorData.phone,
      about: doctorData.bio,
      specialization: doctorData.specializations,
      experience: doctorData.stats.yearsExperience,
      patientsTreated: doctorData.stats.patientsTreated,
      // Add any other fields your backend expects
    });

  };

  const handleCancel = () => {
    // Reset any changes by re-fetching data or reverting to original state
    setIsEditing(false);
  };

  return (
    <div className="w-full px-4 py-6">
      <div className="card w-full bg-base-100 shadow-xl">
        {/* Header with background gradient */}
        <div className="bg-primary text-primary-content p-4 rounded-t-box">
          <h1 className="text-2xl font-bold">Doctor Profile</h1>
          <p className="opacity-80 text-sm">Wellify Healthcare Network</p>
        </div>

        {/* Profile Header */}
        <div className="relative">
          <div className="h-32 bg-gradient-to-r from-primary to-secondary"></div>
          <div className="card-body pt-0">
            <div className="flex flex-col md:flex-row md:items-end">
              <div className="relative -mt-16 mb-3 md:mb-0">
                {isEditing ? (
                  <div className="avatar relative">
                    <div className="w-24 md:w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={doctorData.profilePic} alt="Doctor" />
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full">
                        <span className="text-white text-xs font-medium">Change Photo</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="avatar">
                    <div className="w-24 md:w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={doctorData.profilePic} alt="Doctor" />
                    </div>
                  </div>
                )}
                <div className="badge badge-primary absolute bottom-0 right-0">
                  <Award size={16} />
                </div>
              </div>

              <div className="flex-1 px-3 py-2">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    {isEditing ? (
                      <input
                        type="text"
                        name="fullName"
                        value={doctorData.fullName}
                        onChange={handleInputChange}
                        className="input input-bordered input-sm w-full max-w-xs mb-1"
                      />
                    ) : (
                      <h2 className="text-2xl font-bold">{doctorData.fullName}</h2>
                    )}

                    <div className="flex items-center mt-1">
                      {isEditing ? (
                        <input
                          type="text"
                          name="specialdegree"
                          value={doctorData.specialdegree}
                          onChange={handleInputChange}
                          className="input input-bordered input-xs w-full max-w-xs"
                        />
                      ) : (
                        <span className="badge badge-outline">{doctorData.specialdegree}</span>
                      )}

                      <div className="flex items-center ml-3 text-warning">
                        <Star size={14} fill="currentColor" />
                        {isEditing ? (
                          <input
                            type="number"
                            name="stats.rating"
                            value={doctorData.stats.rating}
                            onChange={handleInputChange}
                            min="0"
                            max="5"
                            step="0.1"
                            className="input input-bordered input-xs w-16 ml-1"
                          />
                        ) : (
                          <span className="ml-1 text-sm">{doctorData.stats.rating}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 md:mt-0 flex gap-2">
                    {isEditing ? (
                      <>
                        <button
                          onClick={handleSave}
                          className="btn btn-primary btn-sm gap-1"
                        >
                          <Save size={16} /> Save
                        </button>
                        <button
                          onClick={handleCancel}
                          className="btn btn-ghost btn-sm gap-1"
                        >
                          <X size={16} /> Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="btn btn-primary btn-sm gap-1"
                      >
                        <Edit2 size={16} /> Edit Profile
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="divider my-2"></div>

            {/* Content */}
            <div className="space-y-6">
              {/* Bio */}
              <div>
                <h3 className="text-lg font-semibold mb-2">About</h3>
                {isEditing ? (
                  <textarea
                    name="bio"
                    value={doctorData.bio}
                    onChange={handleInputChange}
                    rows="3"
                    className="textarea textarea-bordered w-full text-sm"
                  ></textarea>
                ) : (
                  <p className="text-sm opacity-80">{doctorData.bio}</p>
                )}
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <div className="mr-2 bg-base-200 p-2 rounded-full">
                      <PhoneCall size={18} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">Phone</p>
                      {isEditing ? (
                        <input
                          type="text"
                          name="phone"
                          value={doctorData.phone}
                          onChange={handleInputChange}
                          className="input input-bordered input-sm w-full"
                        />
                      ) : (
                        <p className="text-sm opacity-80">{doctorData.phone}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-2 bg-base-200 p-2 rounded-full">
                      <Mail size={18} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">Email</p>
                      {isEditing ? (
                        <input
                          type="email"
                          name="email"
                          value={doctorData.email}
                          onChange={handleInputChange}
                          className="input input-bordered input-sm w-full"
                        />
                      ) : (
                        <p className="text-sm opacity-80">{doctorData.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-2 bg-base-200 p-2 rounded-full">
                      <MapPin size={18} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">Clinic Address</p>
                      {isEditing ? (
                        <input
                          type="text"
                          name="clinicAddress"
                          value={doctorData.clinicAddress}
                          onChange={handleInputChange}
                          className="input input-bordered input-sm w-full"
                        />
                      ) : (
                        <p className="text-sm opacity-80">{doctorData.clinicAddress}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-2 bg-base-200 p-2 rounded-full">
                      <GraduationCap size={18} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">Qualifications</p>
                      {isEditing ? (
                        <input
                          type="text"
                          name="qualifications"
                          value={doctorData.qualifications}
                          onChange={handleInputChange}
                          className="input input-bordered input-sm w-full"
                        />
                      ) : (
                        <p className="text-sm opacity-80">{doctorData.qualifications}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Professional Overview</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <div className="stats shadow bg-base-100">
                    <div className="stat py-2 px-4">
                      <div className="stat-figure text-primary">
                        <Users size={20} />
                      </div>
                      <div className="stat-title text-xs">Patients Treated</div>
                      {isEditing ? (
                        <input
                          type="number"
                          name="stats.patientsTreated"
                          value={doctorData.stats.patientsTreated}
                          onChange={handleInputChange}
                          className="input input-bordered input-sm w-full"
                        />
                      ) : (
                        <div className="stat-value text-lg">{doctorData.stats.patientsTreated}</div>
                      )}
                    </div>
                  </div>

                  <div className="stats shadow bg-base-100">
                    <div className="stat py-2 px-4">
                      <div className="stat-figure text-primary">
                        <CalendarDays size={20} />
                      </div>
                      <div className="stat-title text-xs">Experience</div>
                      {isEditing ? (
                        <div className="flex items-center">
                          <input
                            type="number"
                            name="stats.yearsExperience"
                            value={doctorData.stats.yearsExperience}
                            onChange={handleInputChange}
                            className="input input-bordered input-sm w-16"
                          />
                          <span className="ml-1">yrs</span>
                        </div>
                      ) : (
                        <div className="stat-value text-lg">{doctorData.stats.yearsExperience} yrs</div>
                      )}
                    </div>
                  </div>

                  <div className="stats shadow bg-base-100">
                    <div className="stat py-2 px-4">
                      <div className="stat-figure text-warning">
                        <Star size={20} fill="currentColor" />
                      </div>
                      <div className="stat-title text-xs">Rating</div>
                      <div className="stat-value text-lg">{doctorData.stats.rating}/5.0</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Specializations */}
              <div>
                <h3 className="text-lg font-semibold mb-2 flex justify-between items-center">
                  <span>Specializations</span>
                  {isEditing && (
                    <button
                      onClick={addSpecialization}
                      className="btn btn-xs btn-outline btn-primary"
                    >
                      + Add
                    </button>
                  )}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {doctorData.specializations.map((spec, index) => (
                    <div key={index} className={`${isEditing ? 'flex items-center' : ''}`}>
                      {isEditing ? (
                        <>
                          <input
                            type="text"
                            value={spec}
                            onChange={(e) => handleSpecializationChange(index, e.target.value)}
                            className="input input-bordered input-xs w-full max-w-xs rounded-l-full"
                          />
                          <button
                            onClick={() => removeSpecialization(index)}
                            className="btn btn-xs btn-error btn-square rounded-r-full border-l-0"
                          >
                            <X size={14} />
                          </button>
                        </>
                      ) : (
                        <span className="badge badge-outline">{spec}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}