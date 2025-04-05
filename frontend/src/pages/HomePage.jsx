import React from "react";
import { Link } from "react-router-dom";
export default function HomePage() {
  return (
    <div className="min-h-[95vh] bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center px-6 rounded-3xl">
      <div className="bg-base-100 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between w-full max-w-6xl p-8 md:p-12 transition-all duration-500">

        {/* Left Content */}
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl text-accent md:text-5xl font-extrabold  leading-tight">
            Welcome to <span className="text-primary">WELLIFY</span>
          </h1>
          <h2 className="text-2xl font-semibold text-secondary">
            Your Trusted Healthcare Provider
          </h2>
          <p className="text-lg leading-relaxed text-neutral">
            WELLIFY is a state-of-the-art medical facility offering compassionate, expert care.
            Our professionals deliver personalized treatment tailored to your needs — ensuring
            a smooth and healthy journey toward wellness.
          </p>
          <Link className="btn btn-primary btn-lg" to={"/appoint"}>
            Book Appointment
          </Link >
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <div className="rounded-lg bg-primary/10 shadow-md p-4">
            <img
              src="/logo.jpg"
              alt="Doctor Illustration"
              className="w-72 md:w-96 drop-shadow-lg rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}