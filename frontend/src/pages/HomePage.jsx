import React from 'react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* 1. User Profile */}
        <div className="bg-white shadow-lg rounded-xl p-4">
          <h2 className="text-xl font-semibold mb-4 text-blue-600">User Profile</h2>
          <div className="flex flex-col items-center text-center">
            <img
              src="https://via.placeholder.com/100"
              alt="User"
              className="rounded-full w-24 h-24 mb-3"
            />
            <h3 className="text-lg font-medium">John Doe</h3>
            <p className="text-sm text-gray-500">john.doe@email.com</p>
            <p className="mt-2 text-sm text-gray-600">Role: Patient</p>
          </div>
        </div>

        {/* 2. Medicine Section */}
        <div className="bg-white shadow-lg rounded-xl p-4">
          <h2 className="text-xl font-semibold mb-4 text-green-600">Medicines</h2>
          <ul className="space-y-2">
            <li className="p-2 border rounded-lg bg-green-50">
              Paracetamol - 500mg
              <p className="text-xs text-gray-500">Take twice a day</p>
            </li>
            <li className="p-2 border rounded-lg bg-green-50">
              Vitamin C - 1000mg
              <p className="text-xs text-gray-500">Once daily</p>
            </li>
            <li className="p-2 border rounded-lg bg-green-50">
              Amoxicillin - 250mg
              <p className="text-xs text-gray-500">Before meals</p>
            </li>
          </ul>
        </div>

        {/* 3. AI Chatbot */}
        <div className="bg-white shadow-lg rounded-xl p-4 flex flex-col">
          <h2 className="text-xl font-semibold mb-4 text-purple-600">AI Chatbot</h2>
          <div className="flex-1 bg-gray-100 rounded-lg p-3 overflow-y-auto mb-3">
            <p className="text-sm text-gray-700">Bot: How can I help you today?</p>
            {/* Chat messages can be appended here */}
          </div>
          <div className="flex">
            <input
              type="text"
              placeholder="Type your question..."
              className="flex-1 px-3 py-2 rounded-l-lg border border-gray-300 focus:outline-none"
            />
            <button className="bg-purple-500 text-white px-4 py-2 rounded-r-lg hover:bg-purple-600">
              Send
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
