import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  Send,
  CheckCircle,
  Users,
  Headphones,
  ChevronRight
} from 'lucide-react';

const ContactOption = ({ icon: Icon, title, description, color }) => {
  const bgColorClass = `bg-${color}-100`;
  const textColorClass = `text-${color}-600`;

  return (
    <div className="flex items-start p-6 rounded-lg bg-white shadow-md border-l-4 border-blue-500 hover:shadow-lg transition-shadow duration-300">
      <div className={`p-3 rounded-lg mr-4 ${bgColorClass} ${textColorClass}`}>
        <Icon size={24} strokeWidth={1.5} />
      </div>
      <div>
        <h3 className="font-bold text-lg mb-1">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    facility: 'hospital',
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    submitting: false,
    error: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus({ submitted: false, submitting: true, error: null });

    setTimeout(() => {
      setFormStatus({ submitted: true, submitting: false, error: null });
    }, 1500);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-white" id="contact">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Get In Touch</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Contact Us
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Have questions about our healthcare management platform? Our team is ready to assist you with any inquiries or schedule a personalized demo.
          </p>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <ContactOption icon={Phone} title="Call Us" description="(800) 123-4567" color="blue" />
          <ContactOption icon={Mail} title="Email Us" description="support@healthcaresystem.com" color="indigo" />
          <ContactOption icon={Clock} title="Working Hours" description="Mon - Fri: 8AM - 6PM" color="purple" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-3 bg-white p-8 rounded-xl shadow-lg">
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-2">Send us a Message</h3>
              <p className="text-gray-600">Fill out the form below and we'll get back to you as soon as possible.</p>
            </div>

            {formStatus.submitted ? (
              <div className="py-12">
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="text-green-500 mb-4">
                    <CheckCircle size={64} />
                  </div>
                  <h4 className="text-2xl font-bold mb-2">Thank You!</h4>
                  <p className="text-gray-600 mb-6">Your message has been received. We'll respond to your inquiry shortly.</p>
                  <button
                    onClick={() => setFormStatus({ submitted: false, submitting: false, error: null })}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="johndoe@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="(123) 456-7890"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Facility Type</label>
                    <select
                      name="facility"
                      value={formData.facility}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      <option value="hospital">Hospital</option>
                      <option value="clinic">Clinic</option>
                      <option value="laboratory">Laboratory</option>
                      <option value="pharmacy">Pharmacy</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="How can we help you?"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Please provide details about your inquiry..."
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={formStatus.submitting}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg flex items-center justify-center hover:from-blue-700 hover:to-purple-700 transition-all"
                  >
                    {formStatus.submitting ? 'Processing...' : (
                      <>
                        Send Message
                        <Send size={18} className="ml-2" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Info Panel */}
          <div className="lg:col-span-2 grid grid-rows-2 gap-8">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-xl text-white shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Support Options</h3>
              <p className="mb-6">Choose the support channel that works best for you.</p>

              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="bg-white bg-opacity-20 p-2 rounded-lg mr-3">
                    <MessageSquare size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold">Live Chat</h4>
                    <p className="text-blue-100 text-sm">Available 24/7</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="bg-white bg-opacity-20 p-2 rounded-lg mr-3">
                    <Headphones size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold">Technical Support</h4>
                    <p className="text-blue-100 text-sm">support@healthcaresystem.com</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="bg-white bg-opacity-20 p-2 rounded-lg mr-3">
                    <Users size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold">Sales Team</h4>
                    <p className="text-blue-100 text-sm">sales@healthcaresystem.com</p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <a
                  href="#"
                  className="inline-block px-6 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                >
                  Help Center
                </a>
              </div>
            </div>

            <div className="bg-blue-50 p-8 rounded-xl shadow-lg border border-blue-100">
              <h3 className="text-2xl font-bold mb-4">Visit Our Office</h3>
              <div className="flex items-start mb-4">
                <MapPin className="text-blue-600 mr-3 flex-shrink-0 mt-1" />
                <p className="text-gray-700">
                  Healthcare System Headquarters<br />
                  1234 Medical Drive, Suite 500<br />
                  San Francisco, CA 94107
                </p>
              </div>

              <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                <p className="text-gray-500 text-sm">Interactive map would be displayed here</p>
              </div>

              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-medium flex items-center hover:text-blue-800 transition-colors"
              >
                Get Directions
                <ChevronRight size={16} className="ml-1" />
              </a>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold">Frequently Asked Questions</h3>
            <p className="text-gray-600 mt-2">Find quick answers to common questions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                q: 'How long does implementation take?',
                a: 'Our standard implementation takes 4-6 weeks, but we offer accelerated options for facilities that need to go live sooner.',
              },
              {
                q: 'Is training included with the system?',
                a: 'Yes, comprehensive training is included for all staff members, with ongoing support and refresher sessions available.',
              },
              {
                q: 'Can you integrate with our existing systems?',
                a: 'Yes, our platform is designed to integrate with most major healthcare systems, billing software, and laboratory information systems.',
              },
              {
                q: 'Is the system HIPAA compliant?',
                a: 'Absolutely. Our entire platform is built with HIPAA compliance as a core requirement, with end-to-end encryption and audit trails.',
              },
            ].map((faq, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-bold text-lg mb-2">{faq.q}</h4>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <a href="#faq" className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
              View all FAQs
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
