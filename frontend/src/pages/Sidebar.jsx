import React, { useState, useEffect } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
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
  Settings,
  FileText,
  AlertCircle,
  Bell,
  Brain,
  Apple,
  Award,
  Shield,
  ChevronLeft,
  ChevronRight,
  Zap,
  Package,
  PieChart,
  TrendingUp,
  Gift,
  MessageSquare,
  UserCircle,
  UserRoundSearch,
} from "lucide-react";
import { useAuthstore } from "../store/useAuthstore";

const Sidebar = ({ onToggle }) => {
  // Get authUser from the auth store
  const { authUser, logout } = useAuthstore();
  // Check if user is logged in based on authUser
  const isLoggedIn = !!authUser;

  const navigate = useNavigate();

  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hoveredSection, setHoveredSection] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (onToggle) onToggle(isCollapsed);
  }, [isCollapsed, onToggle]);

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    await logout(); // Call the logout function from auth store
    navigate("/");
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogoClick = () => {
    if (isCollapsed) {
      setIsCollapsed(false);
    }
  };

  const NavItem = ({ to, icon, label, badge, index }) => {
    const Icon = icon;
    const isActivePath = isActive(to);
    return (
      <li
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          mounted ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
        }`}
        style={{ transitionDelay: `${index * 50}ms` }}
      >
        <Link
          to={to}
          className={`
            group flex items-center h-12 rounded-xl transition-all duration-300
            ${
              isActivePath
                ? "bg-gradient-to-r from-primary/20 to-primary/10 text-primary border-l-4 border-primary"
                : "hover:bg-base-200 border-l-4 border-transparent"
            }
            ${isCollapsed ? "justify-center px-2" : "px-4"}
          `}
          title={isCollapsed ? label : ""}
        >
          <div
            className={`transition-colors duration-300 ${
              isActivePath
                ? "text-primary"
                : "text-base-content/70 group-hover:text-primary"
            }`}
          >
            {React.isValidElement(icon) ? icon : <Icon size={20} />}
          </div>
          {!isCollapsed && (
            <span
              className={`ml-3 font-medium transition-all duration-300 ${
                isActivePath
                  ? "text-primary"
                  : "text-base-content/80 group-hover:text-primary"
              }`}
            >
              {label}
            </span>
          )}
          {badge && (
            <span
              className={`badge badge-sm ${
                isActivePath ? "badge-primary" : "badge-secondary"
              } ${isCollapsed ? "absolute -top-1 -right-1" : "ml-auto"}`}
            >
              {badge}
            </span>
          )}
        </Link>
      </li>
    );
  };

  const NavSection = ({ title, icon, children, index = 0 }) => {
    const sectionIndex = index;
    const isHovered = hoveredSection === title;
    const IconComponent = icon;

    return (
      <div
        className="mb-6 relative"
        onMouseEnter={() => setHoveredSection(title)}
        onMouseLeave={() => setHoveredSection(null)}
      >
        {!isCollapsed && title && (
          <div
            className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-4 mb-2 ${
              isHovered ? "text-primary" : "text-base-content/50"
            } transition-colors duration-300`}
          >
            {icon && <IconComponent size={14} />}
            {title}
          </div>
        )}
        {isCollapsed && title && (
          <div className="w-full flex justify-center mb-2">
            <div className="w-8 border-t border-base-content/20"></div>
          </div>
        )}
        <ul className="menu menu-md gap-1">
          {React.Children.map(children, (child, i) =>
            React.cloneElement(child, { index: sectionIndex + i })
          )}
        </ul>
      </div>
    );
  };

  const UserProfile = () => (
    <div className="flex-none border-b border-base-300 p-4 animate-in fade-in slide-in-from-top duration-500">
      {!isCollapsed ? (
        <div className="flex items-center gap-3">
          <div className="avatar online">
            <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src="https://api.dicebear.com/7.x/personas/svg?seed=Felix"
                alt="User avatar"
              />
            </div>
          </div>
          <div>
            <h3 className="font-bold text-base-content">
              {authUser?.fullName || "User"}
            </h3>
            <p className="text-xs text-base-content/60">
              {authUser.proffession}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="avatar online">
            <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src="https://api.dicebear.com/7.x/personas/svg?seed=Felix"
                alt="User avatar"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-10 bg-base-100 border-r border-base-200 shadow-lg transition-all duration-300 ease-in-out flex flex-col ${
        isCollapsed ? "w-20" : "w-72"
      }`}
    >
      {/* Logo Header */}
      <div className="navbar bg-base-100 border-b border-base-200 px-4 py-6 flex justify-between items-center relative">
        {!isCollapsed ? (
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src="/logo.jpg"
                  alt="logo"
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center ring-1"
                />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Wellify
              </h1>
              <div className="text-xs text-base-content/60 flex items-center gap-1">
                <Shield size={10} />
                <span>Health Guardian</span>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="flex justify-center w-full cursor-pointer"
            onClick={handleLogoClick}
          >
            <div className="avatar">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <img
                  src="/logo.jpg"
                  alt="logo"
                  className="w-10 h-10 rounded-full"
                />
              </div>
            </div>
          </div>
        )}
        {/* Only show the toggle button when sidebar is expanded */}
        {!isCollapsed && (
          <button
            onClick={toggleSidebar}
            className="btn btn-circle btn-ghost btn-sm hover:bg-base-200 absolute transition-all duration-300 top-6 right-4"
            aria-label="Toggle sidebar width"
          >
            <ChevronLeft size={16} />
          </button>
        )}
      </div>

      {isLoggedIn && <UserProfile />}

      <div
        className={`flex-1 overflow-y-auto py-4 ${
          isCollapsed ? "px-2" : "px-3"
        }`}
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(156, 163, 175, 0.2) rgba(255, 255, 255, 0.5)",
        }}
      >
        {!isLoggedIn ? (
          <>
            <NavSection title="Main Menu" icon={Home} index={0}>
              <NavItem to="/" icon={Home} label="Dashboard" />
            </NavSection>
            <NavSection title="Health Center" icon={Heart} index={4}>
              <NavItem
                to="/emergency"
                icon={AlertCircle}
                label="Emergency Info"
              />
              <NavItem to="/contactus" icon={Phone} label="Contact Us" />
            </NavSection>
            <NavSection title="Analytics" icon={PieChart} index={9}>
              <NavItem to="/settings" icon={Settings} label="Settings" />
              <NavItem to="/signup" icon={UserPlus} label="SignUp" />
              <NavItem to="/login" icon={LogIn} label="Login" />
            </NavSection>
          </>
        ) : (
          <>
            <NavSection title="Discover" icon={Home} index={0}>
              <NavItem to="/" icon={Home} label="Home" />
              {authUser.proffession === "patient" ? (
                <NavItem to="/appoint" icon={Info} label="Book Appointment" />
              ) : (
                <></>
              )}
              {authUser.proffession === "doctor" ? (
                <NavItem
                  to="/predict"
                  icon={Activity}
                  label="Predict Disease"
                />
              ) : (
                <></>
              )}
              {authUser.proffession === "doctor" ? (
                <NavItem
                  to="/UpcomingAppointments"
                  icon={FileText}
                  label="Upcoming Appointments"
                />
              ) : (
                <></>
              )}
              {authUser.proffession === "doctor" ? (
                <NavItem
                  to="/report-analyzer"
                  icon={FileText}
                  label="Report Analyzer"
                />
              ) : (
                <></>
              )}
            </NavSection>
            <NavSection title="Resources" icon={Package} index={3}>
              <NavItem
                to="/emergency"
                icon={AlertCircle}
                label="Emergency Info"
              />
              <NavItem
                to="/findDoctor"
                icon={UserRoundSearch}
                label="Find Doctor"
              />
              <NavItem to="/contactus" icon={Phone} label="Contact Us" />
            </NavSection>
            <NavSection title="Account" icon={User} index={7}>
              <NavItem to="/settings" icon={Settings} label="Settings" />
              <NavItem to="/profile" icon={UserCircle} label="Profile" />
            </NavSection>
          </>
        )}
      </div>

      <div
        className={`flex-none border-t border-base-200 ${
          isCollapsed ? "px-2 py-4" : "p-4"
        } transition-all duration-300`}
      >
        {isLoggedIn && (
          <div className="mb-4">
            <button
              onClick={handleLogout}
              className={`
                  w-full transition-all duration-300
                  ${
                    isCollapsed
                      ? "btn btn-circle btn-error btn-outline"
                      : "btn btn-error btn-outline btn-sm flex items-center gap-2"
                  }
                `}
            >
              <LogOut size={isCollapsed ? 16 : 14} />
              {!isCollapsed && <span>Logout</span>}
            </button>
          </div>
        )}

        {!isCollapsed && (
          <div className="text-center text-xs text-base-content/50">
            © 2025 Wellify. All rights reserved.
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
