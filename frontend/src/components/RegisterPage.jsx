import React, { useState } from 'react';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password || !role) {
      alert('All fields are required!');
      return;
    }

    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Role:', role);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-green-300 via-blue-300 to-purple-400">
      <div className="bg-white/30 backdrop-blur-lg shadow-2xl rounded-2xl p-10 w-full max-w-md border border-white/30">
        <h2 className="text-3xl font-bold text-center mb-8 text-white drop-shadow-lg">📝 Register</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-white mb-1">Email ID</label>
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-lg bg-white/80 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-white mb-1">Password</label>
            <input
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded-lg bg-white/80 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <p className="block text-sm font-semibold text-white mb-2">Select Role</p>
            <div className="flex gap-6 text-white">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="doctor"
                  checked={role === 'doctor'}
                  onChange={(e) => setRole(e.target.value)}
                  required
                />
                Doctor
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="patient"
                  checked={role === 'patient'}
                  onChange={(e) => setRole(e.target.value)}
                />
                Patient
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 hover:opacity-90 text-white font-bold rounded-lg transition duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}