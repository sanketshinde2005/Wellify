import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  LogIn, 
  UserPlus, 
  Info, 
  Phone, 
  Activity, 
  Heart, 
  Calendar, 
  User, 
  LogOut,
  Menu,
  Settings,
  X
} from 'lucide-react';

const Sidebar = ({ isLoggedIn, onLogout }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Close sidebar when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const NavItem = ({ to, icon, label }) => {
    const Icon = icon;
    return (
      <Link 
        to={to} 
        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
          isActive(to) 
            ? 'bg-blue-700 text-white' 
            : 'text-blue-50 hover:bg-blue-600'
        }`}
      >
        <Icon size={20} />
        <span>{label}</span>
      </Link>
    );
  };

  return (
    <>
      {/* Menu Toggle Button - Always visible */}
      <button 
        className="fixed top-4 left-4 z-50 bg-blue-500 text-white p-2 rounded-lg shadow-md hover:bg-blue-600 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay - when sidebar is open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        ></div>
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo and Brand */}
        <div className="p-6">
          <div className="flex items-center space-x-3">
            <Heart className="h-8 w-8 text-white" fill="white" strokeWidth={1.5} />
            <h1 className="text-2xl font-bold text-white">MediCare+</h1>
          </div>
          <p className="text-xs text-blue-100 mt-1">Healthcare Solutions</p>
        </div>

        {/* Close button inside sidebar */}
        <button 
          className="absolute top-6 right-4 text-blue-100 hover:text-white transition-colors"
           onClick={() => setIsOpen(false)}
          aria-label="Close sidebar"
        >
          <X size={20} />
        </button>
        
        {/* Navigation */}
        <nav className="mt-4 px-3 space-y-1 overflow-y-auto max-h-[calc(100vh-200px)]">
          {/* Public Navigation */}
          {!isLoggedIn && (
            <>
              <NavItem to="/homepage" icon={Home} label="Home" />
              <NavItem to="/about" icon={Info} label="About Us" />
              <NavItem to="/services" icon={Activity} label="Services" />
              <NavItem to="/contact" icon={Phone} label="Contact Us" />
              <div className="border-t border-blue-400 my-4"></div>
              <NavItem to="/login" icon={LogIn} label="Login" />
              <NavItem to="/signup" icon={UserPlus} label="Sign Up" />
            </>
          )}

          {/* Logged-in Navigation */}
          {isLoggedIn && (
            <>
              <NavItem to="/dashboard" icon={Home} label="Dashboard" />
              <NavItem to="/appointments" icon={Calendar} label="Appointments" />
              <NavItem to="/health-records" icon={Activity} label="Health Records" />
              <NavItem to="/profile" icon={User} label="Profile" />
              <NavItem to="/settings" icon={Settings} label="Settings" />
              <div className="border-t border-blue-400 my-4"></div>
              <button 
                onClick={() => {
                  setIsOpen(false);
                  onLogout();
                }} 
                className="flex items-center space-x-3 px-4 py-3 rounded-lg w-full text-blue-50 hover:bg-blue-600 transition-colors"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </>
          )}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="border-t border-blue-400 pt-4 text-xs text-blue-100 text-center">
            © 2025 MediCare+ | All Rights Reserved
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
