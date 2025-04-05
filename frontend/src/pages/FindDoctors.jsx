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

const FindDoctors = () => {
    // Hardcoded data with more doctors
    const doctors = [
        {
            id: 1,
            fullName: "Dr. John Doe",
            specialization: "Cardiology",
            mobileNo: "9876543210",
            profilePicture: "https://randomuser.me/api/portraits/men/10.jpg",
            education: "MBBS, MD (Cardiology)",
            description: "Expert in heart surgeries and cardiac care with 15+ years of experience.",
            rating: 4.9,
            PlatformLinks: {
                instagram: "https://instagram.com/dr.johndoe",
                linkedin: "https://linkedin.com/in/drjohndoe",
            },
        },
        {
            id: 2,
            fullName: "Dr. Sarah Lee",
            specialization: "Dermatology",
            mobileNo: "9876543211",
            profilePicture: "https://randomuser.me/api/portraits/women/21.jpg",
            education: "MBBS, MD (Dermatology)",
            description: "Specialist in skin care and acne treatment with 10+ years of experience.",
            rating: 4.7,
            PlatformLinks: {
                instagram: "https://instagram.com/dr.sarahlee",
                linkedin: "https://linkedin.com/in/drsarahlee",
            },
        },
        {
            id: 3,
            fullName: "Dr. Emily Brown",
            specialization: "Orthopedics",
            mobileNo: "9876543212",
            profilePicture: "https://randomuser.me/api/portraits/women/33.jpg",
            education: "MBBS, MS (Orthopedics)",
            description: "Experienced in bone fractures and joint replacement surgeries.",
            rating: 4.5,
            PlatformLinks: {
                instagram: "https://instagram.com/dr.emilybrown",
                linkedin: "https://linkedin.com/in/dremilybrown",
            },
        },
        {
            id: 4,
            fullName: "Dr. Raj Mehta",
            specialization: "Neurology",
            mobileNo: "9876543213",
            profilePicture: "https://randomuser.me/api/portraits/men/52.jpg",
            education: "MBBS, DM (Neurology)",
            description: "Specialist in brain and spinal disorders with 12+ years of experience.",
            rating: 4.8,
            PlatformLinks: {
                instagram: "https://instagram.com/dr.rajmehta",
                linkedin: "https://linkedin.com/in/drrajmehta",
            },
        },
        {
            id: 5,
            fullName: "Dr. Ayesha Khan",
            specialization: "Gynecology",
            mobileNo: "9876543214",
            profilePicture: "https://randomuser.me/api/portraits/women/47.jpg",
            education: "MBBS, MS (Gynecology)",
            description: "Experienced in women's health, fertility, and childbirth.",
            rating: 4.6,
            PlatformLinks: {
                instagram: "https://instagram.com/dr.ayeshakhan",
                linkedin: "https://linkedin.com/in/drayeshakhan",
            },
        },
        {
            id: 6,
            fullName: "Dr. Mike Tyson",
            specialization: "Pediatrics",
            mobileNo: "9876543215",
            profilePicture: "https://randomuser.me/api/portraits/men/64.jpg",
            education: "MBBS, MD (Pediatrics)",
            description: "Child healthcare expert with friendly and supportive approach.",
            rating: 4.7,
            PlatformLinks: {
                instagram: "https://instagram.com/dr.miketyson",
                linkedin: "https://linkedin.com/in/drmiketyson",
            },
        },
        {
            id: 7,
            fullName: "Dr. Priya Singh",
            specialization: "Psychiatry",
            mobileNo: "9876543216",
            profilePicture: "https://randomuser.me/api/portraits/women/56.jpg",
            education: "MBBS, MD (Psychiatry)",
            description: "Focused on mental health, therapy and emotional wellbeing.",
            rating: 4.9,
            PlatformLinks: {
                instagram: "https://instagram.com/dr.priyasingh",
                linkedin: "https://linkedin.com/in/drpriyasingh",
            },
        },
        {
            id: 8,
            fullName: "Dr. Rahul Verma",
            specialization: "Urology",
            mobileNo: "9876543217",
            profilePicture: "https://randomuser.me/api/portraits/men/31.jpg",
            education: "MBBS, MCh (Urology)",
            description: "Renowned for kidney surgeries and urinary tract care.",
            rating: 4.6,
            PlatformLinks: {
                instagram: "https://instagram.com/dr.rahulverma",
                linkedin: "https://linkedin.com/in/drrahulverma",
            },
        },
        {
            id: 9,
            fullName: "Dr. Neha Desai",
            specialization: "Ophthalmology",
            mobileNo: "9876543218",
            profilePicture: "https://randomuser.me/api/portraits/women/29.jpg",
            education: "MBBS, MS (Ophthalmology)",
            description: "Specialist in eye care, LASIK, and cataract surgeries.",
            rating: 4.8,
            PlatformLinks: {
                instagram: "https://instagram.com/dr.nehadesai",
                linkedin: "https://linkedin.com/in/drnehadesai",
            },
        },
        {
            id: 10,
            fullName: "Dr. Arjun Kapoor",
            specialization: "Gastroenterology",
            mobileNo: "9876543219",
            profilePicture: "https://randomuser.me/api/portraits/men/87.jpg",
            education: "MBBS, DM (Gastroenterology)",
            description: "Expert in digestive disorders and endoscopy procedures.",
            rating: 4.7,
            PlatformLinks: {
                instagram: "https://instagram.com/dr.arjunkapoor",
                linkedin: "https://linkedin.com/in/drarjunkapoor",
            },
        },
    ];

    // Available DaisyUI themes
    const themes = [
        { name: "light", icon: <Sun className="w-4 h-4" /> },
        { name: "dark", icon: <Moon className="w-4 h-4" /> },
        { name: "cupcake", label: "Cupcake" },
        { name: "bumblebee", label: "Bumblebee" },
        { name: "emerald", label: "Emerald" },
        { name: "corporate", label: "Corporate" },
        { name: "synthwave", label: "Synthwave" },
        { name: "retro", label: "Retro" },
        { name: "cyberpunk", label: "Cyberpunk" },
        { name: "valentine", label: "Valentine" },
        { name: "halloween", label: "Halloween" },
        { name: "garden", label: "Garden" },
        { name: "forest", label: "Forest" },
        { name: "aqua", label: "Aqua" },
        { name: "lofi", label: "Lo-Fi" },
        { name: "pastel", label: "Pastel" },
        { name: "fantasy", label: "Fantasy" },
        { name: "wireframe", label: "Wireframe" },
        { name: "black", label: "Black" },
        { name: "luxury", label: "Luxury" },
        { name: "dracula", label: "Dracula" },
        { name: "cmyk", label: "CMYK" },
        { name: "autumn", label: "Autumn" },
        { name: "business", label: "Business" },
        { name: "acid", label: "Acid" },
        { name: "lemonade", label: "Lemonade" },
        { name: "night", label: "Night" },
        { name: "coffee", label: "Coffee" },
        { name: "winter", label: "Winter" }
    ];

    const [search, setSearch] = useState("");
    const [flippedCards, setFlippedCards] = useState({});
    const [specialtyFilter, setSpecialtyFilter] = useState("all");
    const [theme, setTheme] = useState("light");
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

    // Set theme in localStorage and HTML data attribute
    useEffect(() => {
        localStorage.setItem("theme", theme);
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    const toggleFlip = (id) => {
        setFlippedCards((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    // Get unique specialties for filter
    const specialties = ["all", ...new Set(doctors.map(doc => doc.specialization))];

    const filteredDoctors = useMemo(() => {
        let result = doctors.filter((doctor) => {
            const searchQuery = search.toLowerCase();

            // Comprehensive search
            const matchesSearch = doctor.fullName.toLowerCase().includes(searchQuery) ||
                doctor.specialization.toLowerCase().includes(searchQuery) ||
                doctor.education.toLowerCase().includes(searchQuery);

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
                default:
                    return 0;
            }
        });
    }, [search, specialtyFilter, sortBy]);

    const clearSearch = () => {
        setSearch("");
        setSpecialtyFilter("all");
        setSortBy("name");
    };

    return (
        <div className="container mx-auto px-4 pt-2 h-screen flex flex-col bg-base-200 transition-all duration-300">
            <div className="text-center mb-4">
                {/* <div className="flex justify-between items-center px-2">
                    <h1 className="text-2xl sm:text-3xl font-bold text-primary">Our Medical Team</h1>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-sm m-1">
                            Theme
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                        </div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 max-h-96 overflow-y-auto">
                            {themes.map((themeOption) => (
                                <li key={themeOption.name}>
                                    <button onClick={() => setTheme(themeOption.name)} className={theme === themeOption.name ? "active" : ""}>
                                        {themeOption.icon || themeOption.label || themeOption.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div> */}
                <p className="text-base-content/70">Meet our expert healthcare professionals</p>
            </div>

            <div className="mb-4 sm:mb-6 space-y-2 sm:space-y-4">
                <div className="flex flex-col md:flex-row justify-center items-center space-y-3 md:space-y-0 md:space-x-4">
                    {/* Search Input */}
                    <div className="relative w-full max-w-md">
                        <input
                            type="text"
                            placeholder="Search doctors..."
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
                                        </div>

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
                                <span>No doctors found matching your criteria</span>
                            </div>
                            <button onClick={clearSearch} className="btn btn-primary">
                                Reset Filters
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Flip Card Styles */}
            <style jsx={true}>{`
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