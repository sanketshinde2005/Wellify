import React from 'react';

export default function HomePage() {
  return (
    <div className="min-h-[95vh] bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center px-4 rounded-3xl">
      <div className="bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row items-center justify-between w-full max-w-6xl p-8 md:p-12 transition-all duration-500">

        {/* Left Content */}
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Welcome to <span className="text-blue-600">ZeeCare Medical Institute</span>
          </h1>
          <h2 className="text-2xl font-semibold text-gray-700">
            Your Trusted Healthcare Provider
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            ZeeCare is a state-of-the-art medical facility offering compassionate, expert care.
            Our professionals deliver personalized treatment tailored to your needs — ensuring
            a smooth and healthy journey toward wellness.
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-full shadow hover:bg-blue-700 transition">
            Book Appointment
          </button>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <img
            src="/logo.jpg"
            alt="Doctor Illustration"
            className="w-72 md:w-96 drop-shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}
