import React from 'react'; 
import { Link } from 'react-router-dom'; 
import { Activity, Users, Clock, Shield, ChevronRight, Award } from 'lucide-react'; 

const AboutPage = () => { 
  return ( 
    <div className="bg-white min-h-screen"> 
      {/* Hero Section */} 
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 md:py-24"> 
        <div className="container mx-auto px-6 relative z-10"> 
          <div className="flex flex-col md:flex-row"> 
            <div className="md:w-1/2 mb-10 md:mb-0"> 
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4"> 
                Better Healthcare for a Better Life 
              </h1> 
              <p className="text-xl md:text-2xl text-blue-100 mb-8"> 
                Your trusted partner for accessible, personalized healthcare services. 
              </p> 
              <div className="flex flex-col sm:flex-row gap-4"> 
                <Link to="/signup" className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-700 font-medium rounded-lg hover:bg-blue-50 transition duration-300"> 
                  Get Started 
                  <ChevronRight size={18} className="ml-2" /> 
                </Link> 
                <Link to="/services" className="inline-flex items-center justify-center px-6 py-3 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-600 transition duration-300"> 
                  Our Services 
                </Link> 
              </div> 
            </div> 
            <div className="md:w-1/2 flex justify-center"> 
              <div className="bg-white p-2 rounded-2xl shadow-xl w-full max-w-md"> 
                <img 
                  src="/api/placeholder/500/375" 
                  alt="Doctor with patient" 
                  className="w-full h-auto rounded-xl" 
                /> 
              </div> 
            </div> 
          </div> 
        </div>
        
        {/* Decorative shapes */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 opacity-20 rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 opacity-20 rounded-full transform -translate-x-1/3 translate-y-1/3"></div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose MediCare+</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're committed to providing exceptional healthcare services with a focus on quality, accessibility, and patient-centered care.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Award className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Expert Doctors</h3>
              <p className="text-gray-600">
                Our team consists of highly qualified healthcare professionals dedicated to providing the best care.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-green-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Activity className="text-green-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Quality Care</h3>
              <p className="text-gray-600">
                We maintain the highest standards of healthcare with state-of-the-art facilities and treatments.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-purple-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Clock className="text-purple-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">24/7 Service</h3>
              <p className="text-gray-600">
                Healthcare needs don't wait, and neither do we. Our services are available around the clock.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-yellow-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Shield className="text-yellow-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Privacy Protected</h3>
              <p className="text-gray-600">
                Your health information is secure with our advanced encryption and privacy protocols.
              </p>
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
                src="/api/placeholder/600/400" 
                alt="Medical team" 
                className="rounded-xl shadow-lg w-full h-auto"
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">About MediCare+</h2>
              <p className="text-lg text-gray-600 mb-6">
                Founded in 2010, MediCare+ has been at the forefront of revolutionizing healthcare delivery. Our mission is to make quality healthcare accessible to everyone through innovative technology and compassionate service.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                With a team of over 200 specialists across multiple disciplines, we offer comprehensive care tailored to each patient's unique needs.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <Users size={18} className="text-blue-600" />
                  </div>
                  <span className="text-gray-700">10,000+ Patients</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <Award size={18} className="text-blue-600" />
                  </div>
                  <span className="text-gray-700">200+ Specialists</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <Shield size={18} className="text-blue-600" />
                  </div>
                  <span className="text-gray-700">100% Secure</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <Activity size={18} className="text-blue-600" />
                  </div>
                  <span className="text-gray-700">24/7 Support</span>
                </div>
              </div>
              <Link to="/contact" className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-300">
                Contact Us
                <ChevronRight size={18} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to experience better healthcare?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied patients who have transformed their healthcare experience with MediCare+.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/signup" className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-700 font-medium rounded-lg hover:bg-blue-50 transition duration-300">
              Create an Account
              <ChevronRight size={18} className="ml-2" />
            </Link>
            <Link to="/login" className="inline-flex items-center justify-center px-6 py-3 border border-white text-white font-medium rounded-lg hover:bg-blue-700 transition duration-300">
              Login
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between mb-8">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-4 text-white">MediCare+</h3>
              <p className="max-w-xs">
                Providing quality healthcare services for you and your family's well-being.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-white">Company</h4>
                <ul className="space-y-2">
                  <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                  <li><Link to="/services" className="hover:text-white">Services</Link></li>
                  <li><Link to="/doctors" className="hover:text-white">Our Doctors</Link></li>
                  <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4 text-white">Support</h4>
                <ul className="space-y-2">
                  <li><Link to="/faq" className="hover:text-white">FAQs</Link></li>
                  <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                  <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4 text-white">Contact</h4>
                <ul className="space-y-2">
                  <li>contact@medicare-plus.com</li>
                  <li>+1 (555) 123-4567</li>
                  <li>123 Healthcare Avenue, Medical District</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-6 text-center">
            <p>© 2025 MediCare+. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;