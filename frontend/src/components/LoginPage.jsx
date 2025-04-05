import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LogIn, User, Lock, UserCircle, Shield } from "lucide-react";

const LoginPage = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate API call
    setTimeout(() => {
      if (!email || !password) {
        setError("Please enter both email and password");
        setIsLoading(false);
        return;
      }

      console.log("Login attempt:", { email, password, role });
      onLoginSuccess();
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen min-w-[50vw] items-center justify-center bg-gradient-to-br from-base-200 to-base-300 px-4 py-12">
      <div className="relative w-full max-w-xl">
        {/* Background Decorations */}
        <div className="absolute top-0 -left-10 w-40 h-40 bg-primary opacity-20 rounded-full blur-lg"></div>
        <div className="absolute bottom-10 -right-10 w-32 h-32 bg-secondary opacity-20 rounded-full blur-lg"></div>

        {/* Login Card */}
        <div className="card shadow-xl bg-base-100 rounded-xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-primary to-secondary text-white text-center py-10">
            <UserCircle size={48} className="mx-auto mb-3 z-50" />
            <h2 className="text-3xl font-bold">Welcome Back</h2>
            <p className="text-sm text-white/80">Sign in to access your dashboard</p>
          </div>

          {/* Form Section */}
          <div className="p-8 space-y-6">
            {error && (
              <div className="alert alert-error shadow-sm">
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-base-content mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 h-5 w-5 text-base-content/60 z-10" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input input-bordered w-full pl-10"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-base-content mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 h-5 w-5 text-base-content/60 z-10" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input input-bordered w-full pl-10"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <div className="text-right mt-2">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-primary hover:text-secondary"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              {/* Role Selection */}
              <div>
                <p className="text-sm font-medium text-base-content mb-2">I am a:</p>
                <div className="grid grid-cols-2 gap-4">
                  <label
                    className={`flex items-center justify-center p-4 border rounded-lg cursor-pointer transition-all ${
                      role === "patient"
                        ? "bg-primary/10 border-primary text-primary"
                        : "border-base-300 hover:bg-base-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value="patient"
                      checked={role === "patient"}
                      onChange={() => setRole("patient")}
                      className="sr-only"
                    />
                    <User size={20} className="mr-2" />
                    <span>Patient</span>
                  </label>
                  <label
                    className={`flex items-center justify-center p-4 border rounded-lg cursor-pointer transition-all ${
                      role === "doctor"
                        ? "bg-primary/10 border-primary text-primary"
                        : "border-base-300 hover:bg-base-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value="doctor"
                      checked={role === "doctor"}
                      onChange={() => setRole("doctor")}
                      className="sr-only"
                    />
                    <Shield size={20} className="mr-2" />
                    <span>Doctor</span>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`btn btn-primary w-full ${
                  isLoading ? "loading" : ""
                }`}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </button>
            </form>

            {/* Redirect to Signup */}
            <div className="mt-4 text-center">
              <p className="text-sm text-base-content">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-primary hover:text-secondary font-medium"
                >
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
