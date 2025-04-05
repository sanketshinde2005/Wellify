import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, User, Lock, Mail, Shield, CheckCircle } from 'lucide-react';

const SignUpPage = () => {
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

    if (!validateStep2()) return;

    if (!formData.agreeTerms) {
      setError('You must agree to the Terms and Privacy Policy');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      console.log('Registration data:', formData);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="max-h-[] min-w-[50vw] flex items-center justify-center bg-gradient-to-br from-base-100 to-base-200 ">
      <div className="relative w-full max-w-md">
        <div className="absolute -top-16 -right-16 w-32 h-32 bg-primary rounded-full opacity-20"></div>
        <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-secondary rounded-full opacity-20"></div>

        <div className="relative bg-base-100 rounded-2xl shadow-xl overflow-hidden z-10">
          <div className="bg-gradient-to-r from-primary to-secondary px-6 py-8 text-primary-content text-center">
            <UserPlus size={48} className="mx-auto mb-2" />
            <h2 className="text-2xl font-bold">Create Account</h2>
            <p className="text-secondary-content">Join our healthcare platform</p>

            <div className="flex items-center justify-center mt-4">
              <div className={`w-3 h-3 rounded-full ${step >= 1 ? 'bg-white' : 'bg-secondary'}`}></div>
              <div className={`w-16 h-1 ${step >= 2 ? 'bg-white' : 'bg-secondary'}`}></div>
              <div className={`w-3 h-3 rounded-full ${step >= 2 ? 'bg-white' : 'bg-secondary'}`}></div>
            </div>
          </div>

          <div className="p-6">
            {error && (
              <div className="bg-error/10 text-error p-3 rounded-lg text-sm mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {step === 1 ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-base-content mb-1">Full Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-base-content/50">
                        <User size={18} className='z-10'/>
                      </div>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="input input-bordered w-full pl-10"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-base-content mb-1">Email Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-base-content/50">
                        <Mail size={18} className='z-10'/>
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="input input-bordered w-full pl-10"
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <p className="block text-sm font-medium text-base-content mb-2">I am registering as:</p>
                    <div className="grid grid-cols-2 gap-3">
                      <label className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-colors ${formData.role === 'patient' ? 'bg-primary/10 border-primary text-primary' : 'border-base-300 hover:bg-base-200'}`}>
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
                      <label className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-colors ${formData.role === 'doctor' ? 'bg-primary/10 border-primary text-primary' : 'border-base-300 hover:bg-base-200'}`}>
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
                    className="btn btn-primary w-full"
                  >
                    Continue
                  </button>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-base-content mb-1">Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-base-content/50">
                        <Lock size={18} className='z-10'/>
                      </div>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="input input-bordered w-full pl-10"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                    <p className="text-xs text-base-content/60 mt-1">Must be at least 8 characters</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-base-content mb-1">Confirm Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-base-content/50">
                        <Lock size={18} className='z-10' />
                      </div>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="input input-bordered w-full pl-10"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-start">
                    <input
                      id="terms"
                      name="agreeTerms"
                      type="checkbox"
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                      className="checkbox checkbox-primary mt-1"
                    />
                    <div className="ml-3 text-sm">
                      <label htmlFor="terms" className="text-base-content">
                        I agree to the{' '}
                        <Link to="/terms" className="text-primary hover:text-primary-focus">
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link to="/privacy" className="text-primary hover:text-primary-focus">
                          Privacy Policy
                        </Link>
                      </label>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="btn w-1/3 bg-base-200 text-base-content hover:bg-base-300"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`btn btn-primary w-2/3 flex items-center justify-center ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {isLoading ? (
                        <span className="loading loading-spinner"></span>
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
              <p className="text-sm text-base-content">
                Already have an account?{' '}
                <Link to="/login" className="text-primary hover:text-primary-focus font-medium">
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

export default SignUpPage;
