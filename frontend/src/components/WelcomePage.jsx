import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Users, Clock, Shield, ChevronRight, Award } from 'lucide-react';

const WelcomePage = () => {
  return (
    <div className="bg-base-100 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-secondary text-white py-16 md:py-24">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                Better Healthcare for a Better Life
              </h1>
              <p className="text-xl md:text-2xl text-base-100 mb-8">
                Your trusted partner for accessible, personalized healthcare services.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup" className="btn btn-primary">
                  Get Started
                  <ChevronRight size={18} className="ml-2" />
                </Link>
                <Link to="/services" className="btn btn-secondary">
                  Our Services
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="bg-white p-2 rounded-2xl shadow-xl w-full max-w-md">
                <img
                  src="/logo.jpg"
                  alt="Doctor with patient"
                  className="w-full h-auto rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Decorative shapes */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary opacity-20 rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary opacity-20 rounded-full transform -translate-x-1/3 translate-y-1/3"></div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-base-200">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-base-content mb-4">Why Choose MediCare+</h2>
            <p className="text-lg text-neutral-content max-w-2xl mx-auto">
              We're committed to providing exceptional healthcare services with a focus on quality, accessibility, and patient-centered care.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="card bg-white shadow-md hover:shadow-lg transition-shadow">
              <div className="card-body items-center text-center">
                <div className="bg-primary p-3 rounded-full mb-4">
                  <Award className="text-white" size={24} />
                </div>
                <h3 className="card-title text-base-content">Expert Doctors</h3>
                <p className="text-neutral-content">
                  Our team consists of highly qualified healthcare professionals dedicated to providing the best care.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="card bg-white shadow-md hover:shadow-lg transition-shadow">
              <div className="card-body items-center text-center">
                <div className="bg-green-500 p-3 rounded-full mb-4">
                  <Activity className="text-white" size={24} />
                </div>
                <h3 className="card-title text-base-content">Quality Care</h3>
                <p className="text-neutral-content">
                  We maintain the highest standards of healthcare with state-of-the-art facilities and treatments.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="card bg-white shadow-md hover:shadow-lg transition-shadow">
              <div className="card-body items-center text-center">
                <div className="bg-purple-500 p-3 rounded-full mb-4">
                  <Clock className="text-white" size={24} />
                </div>
                <h3 className="card-title text-base-content">24/7 Service</h3>
                <p className="text-neutral-content">
                  Healthcare needs don't wait, and neither do we. Our services are available around the clock.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="card bg-white shadow-md hover:shadow-lg transition-shadow">
              <div className="card-body items-center text-center">
                <div className="bg-yellow-500 p-3 rounded-full mb-4">
                  <Shield className="text-white" size={24} />
                </div>
                <h3 className="card-title text-base-content">Privacy Protected</h3>
                <p className="text-neutral-content">
                  Your health information is secure with our advanced encryption and privacy protocols.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <img
                src="/logo.jpg"
                alt="Medical team"
                className="rounded-xl shadow-lg w-full h-auto"
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-base-content mb-4">About MediCare+</h2>
              <p className="text-lg text-neutral-content mb-6">
                Founded in 2010, MediCare+ has been at the forefront of revolutionizing healthcare delivery. Our mission is to make quality healthcare accessible to everyone through innovative technology and compassionate service.
              </p>
              <p className="text-lg text-neutral-content mb-6">
                With a team of over 200 specialists across multiple disciplines, we offer comprehensive care tailored to each patient's unique needs.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center">
                  <div className="bg-primary p-2 rounded-full mr-3">
                    <Users size={18} className="text-white" />
                  </div>
                  <span className="text-base-content">10,000+ Patients</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-primary p-2 rounded-full mr-3">
                    <Award size={18} className="text-white" />
                  </div>
                  <span className="text-base-content">200+ Specialists</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WelcomePage;
