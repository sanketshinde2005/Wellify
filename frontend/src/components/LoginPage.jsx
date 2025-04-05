import React, { useState } from 'react';

export default function LoginPage() {
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-pink-300 via-purple-300 to-blue-400">
      <div className="bg-white/30 backdrop-blur-lg shadow-2xl rounded-2xl p-10 w-full max-w-md border border-white/30">
        <h2 className="text-3xl font-bold text-center mb-8 text-white drop-shadow-lg">🔐 Login Portal</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div>
            <label className="block text-sm font-semibold text-white mb-1">Email ID</label>
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-2 rounded-lg bg-white/80 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-white mb-1">Password</label>
            <input
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-lg bg-white/80 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-500"
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
            className="w-full py-2 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:opacity-90 text-white font-bold rounded-lg transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}