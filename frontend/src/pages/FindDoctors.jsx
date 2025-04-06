import React, { useState, useMemo, useEffect } from "react";
import {
    Instagram,
    Linkedin,
    MessageCircle,
    FlipHorizontal,
    Search,
    X,
    Star,
    Moon,
    Sun,
    Award,
    Flame
} from "lucide-react";
import useDoctorsStore from "../store/useDoctorsStore.js";

const FindDoctors = () => {
    const { doctors, fetchAllDoctors } = useDoctorsStore();

    useEffect(() => {
        fetchAllDoctors();
    }, []);

    const [search, setSearch] = useState("");
    const [flippedCards, setFlippedCards] = useState({});
    const [specialtyFilter, setSpecialtyFilter] = useState("all");
    const [sortBy, setSortBy] = useState("name");

    // WhatsApp Redirect Utility
    const WhatsAppRedirect = (phoneNumber) => {
        if (!phoneNumber) return "#";
        const cleanedNumber = phoneNumber.replace(/\D/g, '');
        const defaultCountryCode = "91";
        let formattedNumber = cleanedNumber.length === 10
            ? defaultCountryCode + cleanedNumber
            : cleanedNumber;
        return formattedNumber.length >= 11 && formattedNumber.length <= 15
            ? `https://wa.me/${formattedNumber}`
            : "/";
    };

    const toggleFlip = (id) => {
        setFlippedCards((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    // Format AllDocs data to match component requirements
    // console.log("All Doctors:", doctors);
    const AllDocs = useMemo(() => {
        return doctors?.map(doctor => ({
            id: doctor._id,
            fullName: doctor.fullName,
            specialization: doctor.specialdegree || "General Practice",
            mobileNo: doctor.mobilenum,
            profilePicture: doctor.profilePic || "https://randomuser.me/api/portraits/men/10.jpg",
            education: doctor.qualification || `${doctor.specialdegree !== "none" ? doctor.specialdegree : "MBBS"}`,
            description: doctor.about || "Medical professional",
            rating: (Math.random() * (5 - 4) + 4).toFixed(1), // Generate a random rating between 4.0-5.0
            experience: doctor.experience || 0,
            PlatformLinks: {
                instagram: "#",
                linkedin: "#",
            },
        })) || [];
    }, [doctors]);

    // Get unique specialties for filter
    const specialties = useMemo(() => {
        const allSpecialties = AllDocs.map(doc => doc.specialization);
        return ["all", ...new Set(allSpecialties.filter(Boolean))];
    }, [AllDocs]);

    const filteredDoctors = useMemo(() => {
        let result = AllDocs.filter((doctor) => {
            const searchQuery = search.toLowerCase();

            // Comprehensive search
            const matchesSearch = doctor.fullName?.toLowerCase().includes(searchQuery) ||
                doctor.specialization?.toLowerCase().includes(searchQuery) ||
                doctor.education?.toLowerCase().includes(searchQuery);

            // Category filtering
            const matchesSpecialty = specialtyFilter === "all" || doctor.specialization === specialtyFilter;

            return matchesSearch && matchesSpecialty;
        });

        // Sorting logic
        return result.sort((a, b) => {
            switch (sortBy) {
                case "name":
                    return a.fullName.localeCompare(b.fullName);
                case "specialization":
                    return a.specialization.localeCompare(b.specialization);
                case "rating":
                    return b.rating - a.rating;
                case "experience":
                    return b.experience - a.experience;
                default:
                    return 0;
            }
        });
    }, [AllDocs, search, specialtyFilter, sortBy]);

    const clearSearch = () => {
        setSearch("");
        setSpecialtyFilter("all");
        setSortBy("name");
    };

    return (
        <div className="container mx-auto px-4 pt-2 h-screen flex flex-col bg-base-200 transition-all duration-300">
            <div className="mb-4 sm:mb-6 space-y-2 sm:space-y-4">
                <div className="flex flex-col md:flex-row justify-center items-center space-y-3 md:space-y-0 md:space-x-4">
                    {/* Search Input */}
                    <div className="relative w-full max-w-md">
                        <input
                            type="text"
                            placeholder="Search AllDocs..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="input input-bordered input-primary w-full pl-10 pr-10"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50" />
                        {search && (
                            <button
                                onClick={clearSearch}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/50 hover:text-primary"
                            >
                                <X />
                            </button>
                        )}
                    </div>

                    {/* Specialty Dropdown */}
                    <select
                        value={specialtyFilter}
                        onChange={(e) => setSpecialtyFilter(e.target.value)}
                        className="select select-bordered select-primary w-full max-w-xs"
                    >
                        <option value="all">All Specialties</option>
                        {specialties.filter(s => s !== "all").map(specialty => (
                            <option key={specialty} value={specialty}>{specialty}</option>
                        ))}
                    </select>

                    {/* Sort Dropdown */}
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="select select-bordered select-primary w-full max-w-xs"
                    >
                        <option value="name">Sort by Name</option>
                        <option value="specialization">Sort by Specialty</option>
                        <option value="rating">Sort by Rating</option>
                        <option value="experience">Sort by Experience</option>
                    </select>
                </div>
            </div>

            <div className="flex-grow overflow-hidden bg-base-100 rounded-box shadow-lg">
                <div className="p-2 pt-4 h-full overflow-y-auto pr-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pb-6">
                    {filteredDoctors.length > 0 ? (
                        filteredDoctors.map((doctor) => (
                            <div
                                key={doctor.id}
                                className="flip-card h-72 transition-all duration-300 hover:scale-105"
                            >
                                <div
                                    className={`flip-card-inner h-full ${flippedCards[doctor.id] ? "flipped" : ""}`}
                                >
                                    {/* Front Side */}
                                    <div className="flip-card-front h-full bg-base-100 shadow-lg rounded-xl p-5 flex flex-col items-center border-2 border-base-300 hover:border-primary transition-all">
                                        <div className="relative">
                                            <img
                                                className="w-28 h-28 rounded-full border-3 border-primary/30 object-cover shadow-md"
                                                src={doctor.profilePicture}
                                                alt={doctor.fullName}
                                                onError={(e) => {
                                                    e.target.src = "https://randomuser.me/api/portraits/lego/1.jpg";
                                                }}
                                            />
                                            {doctor.rating >= 4.8 && (
                                                <div className="absolute bottom-0 right-0 bg-warning text-warning-content rounded-full p-1">
                                                    <Star className="w-4 h-4" />
                                                </div>
                                            )}
                                        </div>
                                        <h2 className="mt-4 text-lg font-bold text-primary text-center line-clamp-2">
                                            {doctor.fullName}
                                        </h2>
                                        <div className="flex items-center text-base-content/70 mt-2">
                                            <Flame className="w-4 h-4 mr-2" />
                                            <p className="text-sm">{doctor.specialization}</p>
                                        </div>
                                        <button
                                            className="mt-4 btn btn-primary btn-outline"
                                            onClick={() => toggleFlip(doctor.id)}
                                        >
                                            Connect
                                        </button>
                                    </div>

                                    {/* Back Side */}
                                    <div className="flip-card-back h-full bg-gradient-to-br from-primary to-primary-focus text-primary-content shadow-lg rounded-xl p-5 flex flex-col items-center justify-center">
                                        <h2 className="text-lg font-bold mb-1 text-center line-clamp-2">
                                            {doctor.fullName}
                                        </h2>
                                        <p className="text-sm font-light mb-3 flex items-center">
                                            <Award className="w-4 h-4 mr-2" />
                                            {doctor.education}
                                        </p>

                                        <div className="flex items-center mt-1 mb-3">
                                            <Star className="w-4 h-4 text-warning fill-warning" />
                                            <span className="ml-1">{doctor.rating}</span>
                                            {doctor.experience > 0 && (
                                                <span className="ml-3">{doctor.experience} yrs exp.</span>
                                            )}
                                        </div>

                                        {doctor.about && doctor.about !== "Nothing Added" && (
                                            <p className="text-xs text-center mb-3 line-clamp-2">
                                                {doctor.about}
                                            </p>
                                        )}

                                        <p className="mt-2 text-lg font-medium">Contact</p>

                                        {/* Social Icons */}
                                        <div className="flex space-x-4 mt-3">
                                            {doctor.PlatformLinks?.instagram && (
                                                <a
                                                    href={doctor.PlatformLinks.instagram}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center justify-center h-10 w-10 border-2 border-base-100 rounded-full hover:bg-base-100 hover:text-primary transition duration-300"
                                                >
                                                    <Instagram />
                                                </a>
                                            )}

                                            {doctor.mobileNo && (
                                                <a
                                                    href={WhatsAppRedirect(doctor.mobileNo)}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center justify-center h-10 w-10 border-2 border-base-100 rounded-full hover:bg-base-100 hover:text-primary transition duration-300"
                                                >
                                                    <MessageCircle />
                                                </a>
                                            )}

                                            {doctor.PlatformLinks?.linkedin && (
                                                <a
                                                    href={doctor.PlatformLinks.linkedin}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center justify-center h-10 w-10 border-2 border-base-100 rounded-full hover:bg-base-100 hover:text-primary transition duration-300"
                                                >
                                                    <Linkedin />
                                                </a>
                                            )}
                                        </div>

                                        {/* Back to Front Button */}
                                        <button
                                            className="mt-4 cursor-pointer btn btn-ghost text-base-100 hover:bg-base-100/20 flex flex-row items-center justify-center"
                                            onClick={() => toggleFlip(doctor.id)}
                                        >
                                            <FlipHorizontal className="mr-1" />Flip
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full flex flex-col items-center justify-center space-y-4 p-10">
                            <div className="alert alert-warning">
                                <X className="w-6 h-6" />
                                <span>No AllDocs found matching your criteria</span>
                            </div>
                            <button onClick={clearSearch} className="btn btn-primary">
                                Reset Filters
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Flip Card Styles */}
            <style >{`
                .flip-card {
                    perspective: 1000px;
                }
                .flip-card-inner {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    transition: transform 0.8s;
                    transform-style: preserve-3d;
                }
                .flip-card-inner.flipped {
                    transform: rotateY(180deg);
                }
                .flip-card-front,
                .flip-card-back {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    backface-visibility: hidden;
                    border-radius: 0.75rem;
                }
                .flip-card-back {
                    transform: rotateY(180deg);
                }
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                /* Custom Scrollbar */
                .overflow-y-auto::-webkit-scrollbar {
                    width: 8px;
                }
                .overflow-y-auto::-webkit-scrollbar-track {
                    background: hsl(var(--b2));
                    border-radius: 10px;
                }
                .overflow-y-auto::-webkit-scrollbar-thumb {
                    background: hsl(var(--p));
                    border-radius: 10px;
                }
                .overflow-y-auto::-webkit-scrollbar-thumb:hover {
                    background: hsl(var(--p-focus));
                }
            `}</style>
        </div>
    );
};

export default FindDoctors;