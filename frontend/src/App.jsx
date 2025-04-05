import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
// import './App.css';
import RegisterPage from './components/SignUpPage';
import LoginPage from './components/LoginPage';
import HomePage from './pages/HomePage';
import Sidebar from './pages/Sidebar';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const location = useLocation();

  // Check for login status when component mounts or route changes
  useEffect(() => {
    // This is where you would normally check for an auth token or session
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    // Add any additional logout logic here
  };

  // Function to toggle sidebar state
  const handleSidebarToggle = (collapsed) => {
    setIsSidebarCollapsed(collapsed);
  };

  return (
<<<<<<< HEAD
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
=======
    <div className="App">

      <NavBar/>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/homepage" element={<HomePage />} />


      </Routes>
>>>>>>> ac74d3029b1c5bf6c843c3ea08ee210803e633d2
    </div>
  );
}

export default App;