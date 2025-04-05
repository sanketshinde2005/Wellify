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
    return (
        <div className={`card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border-l-4 border-${color}`}>
            <div className="card-body">
                <div className="flex items-start">
                    <div className={`badge badge-${color} p-3 mr-4`}>
                        <Icon size={24} strokeWidth={1.5} />
                    </div>
                    <div>
                        <h3 className="card-title text-lg">{title}</h3>
                        <p className="text-base-content/70">{description}</p>
                    </div>
                </div>
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
        <section className="py-20 bg-gradient-to-b from-primary/5 to-base-100" id="contact">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="badge badge-primary badge-outline mb-2">Get In Touch</div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4">
                        Contact Us
                    </h2>
                    <div className="divider max-w-xs mx-auto"></div>
                    <p className="text-base-content/70 max-w-3xl mx-auto text-lg">
                        Have questions about our healthcare management platform? Our team is ready to assist you with any inquiries or schedule a personalized demo.
                    </p>
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                    <ContactOption icon={Phone} title="Call Us" description="(800) 123-4567" color="primary" />
                    <ContactOption icon={Mail} title="Email Us" description="support@healthcaresystem.com" color="secondary" />
                    <ContactOption icon={Clock} title="Working Hours" description="Mon - Fri: 8AM - 6PM" color="accent" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* Form Section */}
                    <div className="lg:col-span-3 card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <div className="mb-8">
                                <h3 className="card-title text-2xl mb-2">Send us a Message</h3>
                                <p className="text-base-content/70">Fill out the form below and we'll get back to you as soon as possible.</p>
                            </div>

                            {formStatus.submitted ? (
                                <div className="py-12">
                                    <div className="flex flex-col items-center justify-center text-center">
                                        <div className="text-success mb-4">
                                            <CheckCircle size={64} />
                                        </div>
                                        <h4 className="text-2xl font-bold mb-2">Thank You!</h4>
                                        <p className="text-base-content/70 mb-6">Your message has been received. We'll respond to your inquiry shortly.</p>
                                        <button
                                            onClick={() => setFormStatus({ submitted: false, submitting: false, error: null })}
                                            className="btn btn-primary"
                                        >
                                            Send Another Message
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="form-control w-full">
                                            <label className="label">
                                                <span className="label-text">Full Name</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="input input-bordered w-full"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div className="form-control w-full">
                                            <label className="label">
                                                <span className="label-text">Email Address</span>
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="input input-bordered w-full"
                                                placeholder="johndoe@example.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="form-control w-full">
                                            <label className="label">
                                                <span className="label-text">Phone Number</span>
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="input input-bordered w-full"
                                                placeholder="(123) 456-7890"
                                            />
                                        </div>
                                        <div className="form-control w-full">
                                            <label className="label">
                                                <span className="label-text">Facility Type</span>
                                            </label>
                                            <select
                                                name="facility"
                                                value={formData.facility}
                                                onChange={handleChange}
                                                className="select select-bordered w-full"
                                            >
                                                <option value="hospital">Hospital</option>
                                                <option value="clinic">Clinic</option>
                                                <option value="laboratory">Laboratory</option>
                                                <option value="pharmacy">Pharmacy</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="label-text">Subject</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            className="input input-bordered w-full"
                                            placeholder="How can we help you?"
                                        />
                                    </div>

                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="label-text">Message</span>
                                        </label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows="5"
                                            className="textarea textarea-bordered w-full resize-none"
                                            placeholder="Please provide details about your inquiry..."
                                        />
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            disabled={formStatus.submitting}
                                            className="btn btn-primary"
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
                    </div>

                    {/* Info Panel */}
                    <div className="lg:col-span-2 grid grid-rows-2 gap-8">
                        <div className="card bg-gradient-to-r from-primary to-secondary text-primary-content shadow-xl">
                            <div className="card-body">
                                <h3 className="card-title text-2xl mb-4">Support Options</h3>
                                <p className="mb-6">Choose the support channel that works best for you.</p>

                                <div className="space-y-4">
                                    <div className="flex items-center">
                                        <div className="badge badge-outline p-2 mr-3">
                                            <MessageSquare size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold">Live Chat</h4>
                                            <p className="opacity-80 text-sm">Available 24/7</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center">
                                        <div className="badge badge-outline p-2 mr-3">
                                            <Headphones size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold">Technical Support</h4>
                                            <p className="opacity-80 text-sm">support@healthcaresystem.com</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center">
                                        <div className="badge badge-outline p-2 mr-3">
                                            <Users size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold">Sales Team</h4>
                                            <p className="opacity-80 text-sm">sales@healthcaresystem.com</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="card-actions justify-start mt-6">
                                    <a
                                        href="#"
                                        className="btn btn-sm btn-outline btn-primary bg-base-100"
                                    >
                                        Help Center
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="card bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h3 className="card-title text-2xl mb-4">Visit Our Office</h3>
                                <div className="flex items-start mb-4">
                                    <MapPin className="text-primary mr-3 flex-shrink-0 mt-1" />
                                    <p className="text-base-content/70">
                                        Healthcare System Headquarters<br />
                                        1234 Medical Drive, Suite 500<br />
                                        San Francisco, CA 94107
                                    </p>
                                </div>

                                <div className="w-full h-48 bg-base-200 rounded-lg flex items-center justify-center mb-4">
                                    <p className="text-base-content/50 text-sm">Interactive map would be displayed here</p>
                                </div>

                                <div className="card-actions justify-start">
                                    <a
                                        href="https://maps.google.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-link text-primary p-0"
                                    >
                                        Get Directions
                                        <ChevronRight size={16} className="ml-1" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mt-20">
                    <div className="text-center mb-12">
                        <h3 className="text-2xl md:text-3xl font-bold">Frequently Asked Questions</h3>
                        <p className="text-base-content/70 mt-2">Find quick answers to common questions</p>
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
                            <div key={idx} className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
                                <div className="card-body">
                                    <h4 className="card-title text-lg">{faq.q}</h4>
                                    <p className="text-base-content/70">{faq.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-8">
                        <a href="#faq" className="btn btn-link text-primary">
                            View all FAQs
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;