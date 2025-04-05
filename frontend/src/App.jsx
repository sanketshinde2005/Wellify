import { Routes, Route, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
// import './App.css';
import RegisterPage from "./components/SignUpPage";
import LoginPage from "./components/LoginPage";
import HomePage from "../src/pages/HomePage";
import Sidebar from "./pages/Sidebar";
import BookAppointment from "./components/Appointments";
import PredictDisease from "./components/PredictDisease";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const location = useLocation();

  // Check for login status when component mounts or route changes
  useEffect(() => {
    // This is where you would normally check for an auth token or session
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    // Add any additional logout logic here
  };

  // Function to toggle sidebar state
  const handleSidebarToggle = (collapsed) => {
    setIsSidebarCollapsed(collapsed);
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
      <main
        className={`
        flex-1 transition-all duration-300 ease-in-out
        ${isSidebarCollapsed ? "ml-20" : "ml-72"}
      `}
      >
        {/* Content container with padding */}
        <div className="py-2 max-w-7xl mx-auto min-h-screen flex flex-col justify-center items-center">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/services" element={<PredictDisease />} />
            {/* Add your other routes here */}
            {/* <Route path="/about" element={<div>About Us Page</div>} />
            <Route path="/services" element={<div>Our Services Page</div>} /> */}
            <Route path="/home" element={<BookAppointment />} />
            {/* <Route path="/appointments" element={<div>Appointments Page</div>} /> */}
            {/* <Route path="/notifications" element={<div>Notifications Page</div>} />
            <Route path="/messages" element={<div>Messages Page</div>} /> */}
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
