import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
// import './App.css';
import RegisterPage from './components/SignUpPage';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import Sidebar from './components/Sidebar';
import SignUpPage from './components/SignUpPage';
import AboutPage from './components/LandingPage';
import Services from './components/Services';
import ContactUs from './components/ContactUs';
//import Appointments from './components/Appointments';

import HomePage1 from './components/HomePage1';

function App() {

  const user = {
    id: 1,
    name: 'Dr. Jane Smith',
    role: 'doctor', // Change to 'patient' to see the patient view
    email: 'jane.smith@healthcare.com',
    phone: '(555) 123-4567',
    specialization: 'Cardiology',
    licenseNo: 'MED123456',
    experience: 12
    // Add any other required user properties
  };


  return (
    <div className="flex min-h-screen bg-base-100">
      {/* Sidebar component with props including toggle handler */}
      <Sidebar
        isLoggedIn={isLoggedIn} 
        onLogout={handleLogout} 
        onToggle={handleSidebarToggle}
      />
      
      {/* Main content area that shifts based on sidebar state */}
      <main className={`
        flex-1 transition-all duration-300 ease-in-out
        ${isSidebarCollapsed ? 'ml-20' : 'ml-72'}
      `}>
        {/* Content container with padding */}
        <div className="py-2 max-w-7xl mx-auto min-h-screen flex flex-col justify-center items-center">
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/homepage" element={<HomePage />} />
            {/* Add your other routes here */}
            {/* <Route path="/about" element={<div>About Us Page</div>} />
            <Route path="/services" element={<div>Our Services Page</div>} />
            <Route path="/dashboard" element={<div>Dashboard Page</div>} />
            <Route path="/appointments" element={<div>Appointments Page</div>} />
            <Route path="/notifications" element={<div>Notifications Page</div>} />
            <Route path="/messages" element={<div>Messages Page</div>} /> */}
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;