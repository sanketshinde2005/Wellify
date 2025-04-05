import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, User, Lock, Mail, Shield } from 'lucide-react';
import { useAuthstore } from '../store/useAuthstore';
// import { useAuthstore } from '../store/useAuthStore.js'; // Adjust path as needed

const SignUpPage = () => {
  const navigate = useNavigate();
  const { signup, isLoggingIn } = useAuthstore();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobilenum: '',
    proffession: 'patient',
    agreeTerms: false,
  });

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
      setError('Invalid email address');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.password || !formData.confirmPassword || !formData.mobilenum) {
      setError('Please fill in all fields');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
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
    if (step === 1 && validateStep1()) setStep(2);
  };

  const prevStep = () => {
    setError('');
    setStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateStep2()) return;
    if (!formData.agreeTerms) {
      setError('You must agree to the Terms and Privacy Policy');
      return;
    }

    const { fullName, email, password, mobilenum, proffession } = formData;
    await signup({ fullName, email, password, mobilenum, proffession });

    // Optional: Redirect after success
    navigate('/dashboard'); // adjust route as needed
  };

  return (
    <div className="max-h-screen min-w-[50vw] flex items-center justify-center bg-gradient-to-br from-base-100 to-base-200">
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
                    <label className="block text-sm font-medium mb-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 text-base-content/50 z-20" size={18} />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="input input-bordered w-full pl-10"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 text-base-content/50 z-10" size={18} />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="input input-bordered w-full pl-10"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <p className="block text-sm font-medium mb-2">Registering as:</p>
                    <div className="grid grid-cols-2 gap-3">
                      {['patient', 'doctor'].map((role) => (
                        <label
                          key={role}
                          className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-colors ${formData.proffession === role
                            ? 'bg-primary/10 border-primary text-primary'
                            : 'border-base-300 hover:bg-base-200'
                            }`}
                        >
                          <input
                            type="radio"
                            name="proffession"
                            value={role}
                            checked={formData.proffession === role}
                            onChange={handleChange}
                            className="sr-only"
                          />
                          {role === 'patient' ? <User size={18} className="mr-2" /> : <Shield size={18} className="mr-2" />}
                          <span>{role.charAt(0).toUpperCase() + role.slice(1)}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button type="button" onClick={nextStep} className="btn btn-primary w-full mt-4">
                    Next
                  </button>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-1">Mobile Number</label>
                    <input
                      type="text"
                      name="mobilenum"
                      value={formData.mobilenum}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                      placeholder="9876543210"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                      placeholder="********"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Confirm Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                      placeholder="********"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label cursor-pointer justify-start gap-2">
                      <input
                        type="checkbox"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleChange}
                        className="checkbox checkbox-primary"
                      />
                      <span className="label-text">
                        I agree to the <Link to="#" className="link link-primary">Terms</Link> and <Link to="#" className="link link-primary">Privacy Policy</Link>
                      </span>
                    </label>
                  </div>

                  <div className="flex gap-2">
                    <button type="button" onClick={prevStep} className="btn btn-outline w-1/2">
                      Back
                    </button>
                    <button type="submit" disabled={isLoggingIn} className="btn btn-primary w-1/2">
                      {isLoggingIn ? 'Creating...' : 'Create Account'}
                    </button>
                  </div>
                </>
              )}
            </form>

            <p className="text-sm text-center mt-4">
              Already have an account? <Link to="/login" className="link link-primary">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
