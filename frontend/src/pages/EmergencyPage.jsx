import React from 'react';

export default function Emergency() {
    const emergencyContacts = [
        { type: "Emergency Hotline", number: "911", available: "24/7" },
        { type: "Poison Control", number: "1-800-222-1222", available: "24/7" },
        { type: "Nurse Advice Line", number: "1-800-756-7751", available: "24/7" },
        { type: "Mental Health Crisis", number: "988", available: "24/7" },
    ];

    const emergencyServices = [
        {
            title: "Urgent Care",
            description: "Non-life-threatening issues needing prompt attention.",
            icon: "🏥",
            color: "bg-primary/10 border-l-4 border-primary"
        },
        {
            title: "Emergency Room",
            description: "Severe or life-threatening medical emergencies.",
            icon: "🚑",
            color: "bg-error/10 border-l-4 border-error"
        },
        {
            title: "Telehealth",
            description: "Virtual care for minor health concerns.",
            icon: "📱",
            color: "bg-success/10 border-l-4 border-success"
        },
        {
            title: "First Aid",
            description: "Basic self-care steps before professional help.",
            icon: "🩹",
            color: "bg-warning/10 border-l-4 border-warning"
        }
    ];

    return (
        <div className="min-h-screen bg-base-100 px-4 py-6">
            {/* Hero Section */}
            <section className="text-center bg-error/10 p-6 rounded-xl shadow-md mb-10">
                <h1 className="text-4xl font-bold text-error mb-3">Emergency Services</h1>
                <p className="text-base-content/70 max-w-xl mx-auto mb-4">
                    Immediate access to emergency healthcare information and services.
                    If someone is in danger or needs urgent help, call 911 now.
                </p>
                <button className="btn btn-error btn-lg text-white gap-2 shadow-md hover:scale-105 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call 911
                </button>
            </section>

            {/* Services */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-5 text-base-content">Types of Emergency Services</h2>
                <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    {emergencyServices.map((service, idx) => (
                        <div key={idx} className={`rounded-xl shadow-md p-5 transition hover:shadow-xl ${service.color}`}>
                            <div className="text-4xl mb-2">{service.icon}</div>
                            <h3 className="text-lg font-semibold mb-1 text-base-content">{service.title}</h3>
                            <p className="text-sm text-base-content/70">{service.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Contacts */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-5 text-base-content">Important Contacts</h2>
                <div className="overflow-x-auto rounded-lg border border-base-200 shadow-sm">
                    <table className="table w-full">
                        <thead className="bg-primary text-primary-content">
                            <tr>
                                <th>Service</th>
                                <th>Number</th>
                                <th>Availability</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {emergencyContacts.map((contact, idx) => (
                                <tr key={idx} className="hover:bg-base-200">
                                    <td>{contact.type}</td>
                                    <td className="font-semibold">{contact.number}</td>
                                    <td>{contact.available}</td>
                                    <td>
                                        <a href={`tel:${contact.number}`} className="btn btn-sm btn-primary">Call</a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Guidelines */}
            <section className="mb-12 grid gap-6 md:grid-cols-2">
                <div className="card bg-warning/10 border border-warning shadow-sm">
                    <div className="card-body">
                        <h3 className="card-title text-warning">When to Call 911</h3>
                        <ul className="list-disc ml-5 text-sm text-base-content/70">
                            <li>Severe breathing difficulty or chest pain</li>
                            <li>Fainting, seizures, or loss of consciousness</li>
                            <li>Severe bleeding or burns</li>
                            <li>Sudden confusion or slurred speech</li>
                            <li>Overdose, suicide thoughts, or violence</li>
                        </ul>
                    </div>
                </div>
                <div className="card bg-info/10 border border-info shadow-sm">
                    <div className="card-body">
                        <h3 className="card-title text-info">What to Tell the Operator</h3>
                        <ul className="list-disc ml-5 text-sm text-base-content/70">
                            <li>Exact location and address</li>
                            <li>Nature of the emergency</li>
                            <li>Patient's current condition</li>
                            <li>Allergies or medications</li>
                            <li>Stay calm and don’t hang up</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Preparedness */}
            <section className="card bg-base-100 border border-base-300 shadow-md p-6">
                <h2 className="text-2xl font-bold text-primary mb-3">Emergency Preparedness</h2>
                <p className="text-base-content/70 text-sm mb-4">
                    Always keep a list of medications, allergies, and emergency contacts. Have a first-aid kit and know basic steps to handle emergencies until professional help arrives.
                </p>
                <div className="flex flex-wrap gap-4">
                    <button className="btn btn-outline btn-primary">Create Emergency Plan</button>
                    <button className="btn btn-primary">Download Emergency Guide</button>
                </div>
            </section>
        </div>
    );
};
