import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, User, Lock, Mail, Shield, CheckCircle } from 'lucide-react';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'patient',
    agreeTerms: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const validateStep1 = () => {
    if (!formData.fullName || !formData.email) {
      setError('Please fill in all required fields');
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.password || !formData.confirmPassword) {
      setError('Please fill in all required fields');
      return false;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const nextStep = () => {
    setError('');
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const prevStep = () => {
    setError('');
    setStep(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!validateStep2()) {
      return;
    }

    if (!formData.agreeTerms) {
      setError('You must agree to the Terms and Privacy Policy');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Registration data:', formData);
      setIsLoading(false);
      // Redirect or show success message
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-blue-50 p-4">
      <div className="relative w-full max-w-md">
        {/* Decorative elements */}
        <div className="absolute -top-16 -right-16 w-32 h-32 bg-teal-400 rounded-full opacity-20"></div>
        <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-blue-400 rounded-full opacity-20"></div>
        
        {/* Card */}
        <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden z-10">
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-500 to-blue-500 px-6 py-8 text-white text-center">
            <UserPlus size={48} className="mx-auto mb-2" />
            <h2 className="text-2xl font-bold">Create Account</h2>
            <p className="text-blue-100">Join our healthcare platform</p>
            
            {/* Step indicator */}
            <div className="flex items-center justify-center mt-4">
              <div className={`w-3 h-3 rounded-full ${step >= 1 ? 'bg-white' : 'bg-blue-200'}`}></div>
              <div className={`w-16 h-1 ${step >= 2 ? 'bg-white' : 'bg-blue-200'}`}></div>
              <div className={`w-3 h-3 rounded-full ${step >= 2 ? 'bg-white' : 'bg-blue-200'}`}></div>
            </div>
          </div>

          {/* Form */}
          <div className="p-6">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-5">
              {step === 1 ? (
                // Step 1: Personal Information
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                        <User size={18} />
                      </div>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                        <Mail size={18} />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <p className="block text-sm font-medium text-gray-700 mb-2">I am registering as:</p>
                    <div className="grid grid-cols-2 gap-3">
                      <label className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-colors ${formData.role === 'patient' ? 'bg-teal-50 border-teal-500 text-teal-700' : 'border-gray-300 hover:bg-gray-50'}`}>
                        <input
                          type="radio"
                          name="role"
                          value="patient"
                          checked={formData.role === 'patient'}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <User size={18} className="mr-2" />
                        <span>Patient</span>
                      </label>
                      <label className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-colors ${formData.role === 'doctor' ? 'bg-teal-50 border-teal-500 text-teal-700' : 'border-gray-300 hover:bg-gray-50'}`}>
                        <input
                          type="radio"
                          name="role"
                          value="doctor"
                          checked={formData.role === 'doctor'}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <Shield size={18} className="mr-2" />
                        <span>Doctor</span>
                      </label>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={nextStep}
                    className="w-full py-2 px-4 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white font-medium rounded-lg transition duration-300"
                  >
                    Continue
                  </button>
                </>
              ) : (
                // Step 2: Password and Terms
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                        <Lock size={18} />
                      </div>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                        <Lock size={18} />
                      </div>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        name="agreeTerms"
                        type="checkbox"
                        checked={formData.agreeTerms}
                        onChange={handleChange}
                        className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="terms" className="text-gray-600">
                        I agree to the{' '}
                        <Link to="/terms" className="text-teal-600 hover:text-teal-800">
                          Terms of Service
                        </Link>
                        {' '}and{' '}
                        <Link to="/privacy" className="text-teal-600 hover:text-teal-800">
                          Privacy Policy
                        </Link>
                      </label>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="w-1/3 py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition duration-300"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`w-2/3 flex items-center justify-center py-2 px-4 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white font-medium rounded-lg transition duration-300 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {isLoading ? (
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        <>
                          <CheckCircle size={18} className="mr-2" />
                          <span>Create Account</span>
                        </>
                      )}
                    </button>
                  </div>
                </>
              )}
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-teal-600 hover:text-teal-800 font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;