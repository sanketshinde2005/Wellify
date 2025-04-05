import React from 'react';
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
  Settings
} from 'lucide-react';

const Sidebar = ({ isLoggedIn, onLogout }) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

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
      {/* Mobile menu button */}
      <button 
        className="fixed top-4 left-4 z-50 lg:hidden bg-blue-500 text-white p-2 rounded-lg"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-xl z-40 transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
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

        {/* Navigation */}
        <nav className="mt-4 px-3 space-y-1">
          {/* Public Navigation */}
          {!isLoggedIn && (
            <>
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
                onClick={onLogout} 
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