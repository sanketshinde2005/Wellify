import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LogIn, User, Lock, UserCircle, Shield } from 'lucide-react';

const LoginPage = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('patient');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call with timeout
    setTimeout(() => {
      // Validation could go here
      if (!email || !password) {
        setError('Please enter both email and password');
        setIsLoading(false);
        return;
      }

      console.log('Login attempt:', { email, password, role });
      onLoginSuccess();
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="relative w-full max-w-md">
        {/* Decorative elements */}
        <div className="absolute -top-16 -left-16 w-32 h-32 bg-blue-400 rounded-full opacity-20"></div>
        <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-teal-400 rounded-full opacity-20"></div>
        
        {/* Card */}
        <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden z-10">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-teal-400 px-6 py-8 text-white text-center">
            <UserCircle size={48} className="mx-auto mb-2" />
            <h2 className="text-2xl font-bold">Welcome Back</h2>
            <p className="text-blue-100">Sign in to access your health dashboard</p>
          </div>

          {/* Form */}
          <div className="p-6">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    <User size={18} />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    <Lock size={18} />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <div className="text-right mt-1">
                  <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800">
                    Forgot password?
                  </Link>
                </div>
              </div>

              <div>
                <p className="block text-sm font-medium text-gray-700 mb-2">I am a:</p>
                <div className="grid grid-cols-2 gap-3">
                  <label className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-colors ${role === 'patient' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'border-gray-300 hover:bg-gray-50'}`}>
                    <input
                      type="radio"
                      name="role"
                      value="patient"
                      checked={role === 'patient'}
                      onChange={() => setRole('patient')}
                      className="sr-only"
                    />
                    <User size={18} className="mr-2" />
                    <span>Patient</span>
                  </label>
                  <label className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-colors ${role === 'doctor' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'border-gray-300 hover:bg-gray-50'}`}>
                    <input
                      type="radio"
                      name="role"
                      value="doctor"
                      checked={role === 'doctor'}
                      onChange={() => setRole('doctor')}
                      className="sr-only"
                    />
                    <Shield size={18} className="mr-2" />
                    <span>Doctor</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex items-center justify-center py-2 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg transition duration-300 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <>
                    <LogIn size={18} className="mr-2" />
                    <span>Sign In</span>
                  </>
                )}
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/signup" className="text-blue-600 hover:text-blue-800 font-medium">
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;