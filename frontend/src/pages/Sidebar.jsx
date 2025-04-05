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
  MessageSquare
} from 'lucide-react';

const Sidebar = ({ isLoggedIn, onLogout, onToggle }) => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hoveredSection, setHoveredSection] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Notify parent component when sidebar state changes
  useEffect(() => {
    if (onToggle) {
      onToggle(isCollapsed);
    }
  }, [isCollapsed, onToggle]);

  const isActive = (path) => {
    return location.pathname === path;
  };

  // Custom Heartbeat icon
  const Heartbeat = ({ size = 20 }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="group-hover:stroke-primary transition-colors duration-300"
    >
      <path d="M3 12h4l3-9 4 18 3-9h4" />
    </svg>
  );

  const NavItem = ({ to, icon, label, badge, index }) => {
    const Icon = icon;
    const isActivePath = isActive(to);

    return (
      <li
        className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${mounted ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}
        `}
        style={{ transitionDelay: `${index * 50}ms` }}
      >
        <Link
          to={to}
          className={`
            group flex items-center h-12 rounded-xl transition-all duration-300
            ${isActivePath
              ? 'bg-gradient-to-r from-primary/20 to-primary/10 text-primary border-l-4 border-primary'
              : 'hover:bg-base-200 border-l-4 border-transparent'}
            ${isCollapsed ? 'justify-center px-2' : 'px-4'}
          `}
          title={isCollapsed ? label : ""}
        >
          <div className={`
            ${isActivePath ? 'text-primary' : 'text-base-content/70 group-hover:text-primary'} 
            transition-colors duration-300
          `}>
            {React.isValidElement(icon) ? icon : <Icon size={20} />}
          </div>

          {!isCollapsed && (
            <span className={`
              ml-3 font-medium transition-all duration-300
              ${isActivePath ? 'text-primary' : 'text-base-content/80 group-hover:text-primary'}
            `}>
              {label}
            </span>
          )}

          {badge && (
            <span className={`
              badge badge-sm ${isActivePath ? 'badge-primary' : 'badge-secondary'} 
              ${isCollapsed ? 'absolute -top-1 -right-1' : 'ml-auto'}
            `}>
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
          <div className={`
            flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-4 mb-2
            ${isHovered ? 'text-primary' : 'text-base-content/50'}
            transition-colors duration-300
          `}>
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

  // Health Stats Component for logged-in users
  const HealthStats = () => (
    <div className={`animate-in fade-in slide-in-from-left duration-500 ${isCollapsed ? 'px-2' : 'px-4'} py-4 border-b border-base-300`}>
      {!isCollapsed ? (
        <div className="grid grid-cols-2 gap-3">
          <div className="stat bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-3 shadow-sm">
            <div className="stat-title text-xs font-medium text-base-content/70 flex items-center gap-1">
              <Heart size={12} className="text-primary" />
              Heart Rate
            </div>
            <div className="stat-value text-xl font-bold flex items-center text-primary">
              72 <span className="text-xs font-normal ml-1">BPM</span>
            </div>
            <div className="stat-desc text-xs flex items-center">
              <TrendingUp size={12} className="mr-1 text-success" />
              <span className="text-success">+3%</span> from yesterday
            </div>
          </div>
          <div className="stat bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-xl p-3 shadow-sm">
            <div className="stat-title text-xs font-medium text-base-content/70 flex items-center gap-1">
              <Activity size={12} className="text-secondary" />
              Steps
            </div>
            <div className="stat-value text-xl font-bold flex items-center text-secondary">
              6.2k <span className="text-xs font-normal ml-1">steps</span>
            </div>
            <div className="stat-desc text-xs flex items-center">
              <Zap size={12} className="mr-1 text-secondary" />
              78% of daily goal
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3">
          <div className="tooltip tooltip-right" data-tip="Heart Rate: 72 BPM">
            <div className="badge p-3 badge-primary">
              <Heart size={16} />
            </div>
          </div>
          <div className="tooltip tooltip-right" data-tip="Steps: 6.2k">
            <div className="badge p-3 badge-secondary">
              <Activity size={16} />
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // User Profile Section
  const UserProfile = () => (
    <div className="flex-none border-b border-base-300 p-4 animate-in fade-in slide-in-from-top duration-500">
      {!isCollapsed ? (
        <div className="flex items-center gap-3">
          <div className="avatar online">
            <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src="https://api.dicebear.com/7.x/personas/svg?seed=Felix" alt="User avatar" />
            </div>
          </div>
          <div>
            <h3 className="font-bold text-base-content">John Doe</h3>
            <p className="text-xs text-base-content/60">Premium Member</p>
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="avatar online">
            <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src="https://api.dicebear.com/7.x/personas/svg?seed=Felix" alt="User avatar" />
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <aside className={`
      fixed inset-y-0 left-0 z-10
      bg-base-100 border-r border-base-200 shadow-lg
      transition-all duration-300 ease-in-out
      flex flex-col
      ${isCollapsed ? 'w-20' : 'w-72'}
    `}>
      {/* Logo Header */}
      <div className="navbar bg-base-100 border-b border-base-200 px-4 py-6 flex justify-between items-center relative">
        {!isCollapsed ? (
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                {/* <Heart className="h-6 w-6 text-primary-content" fill="white" strokeWidth={1} /> */}
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
          <div className="flex justify-center w-full">
            <div className="avatar">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                {/* <Heart className="h-7 w-7 text-primary-content" fill="white" strokeWidth={1} /> */}
              </div>
            </div>
          </div>
        )}

        {/* Collapse Toggle */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`btn btn-circle btn-ghost btn-sm hover:bg-base-200 absolute transition-all duration-300 ${
            isCollapsed ? 'top-6 left-4' : 'top-6 right-4'
          }`}
          aria-label="Toggle sidebar width"
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* User Profile for logged in users */}
      {isLoggedIn && <UserProfile />}

      {/* Health Stats for logged in users */}
      {isLoggedIn && <HealthStats />}

      {/* Navigation Items */}
      <div className={`flex-1 overflow-y-auto py-4 ${isCollapsed ? 'px-2' : 'px-3'}`} style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(156, 163, 175, 0.2) rgba(255, 255, 255, 0.5)' }}>
        {!isLoggedIn ? (
          <>
            <NavSection title="Discover" icon={Home} index={0}>
              <NavItem to="/" icon={Home} label="Home" />
              <NavItem to="/appoint" icon={Info} label="Book Appointment" />
              <NavItem to="/services" icon={Activity} label="Predict Disease" />
              <NavItem to="/UpcomingAppointments" icon={FileText} label="upcoming appointments  " />
            </NavSection>

            <NavSection title="Resources" icon={Package} index={3}>
              <NavItem to="/wellness-tips" icon={Apple} label="Wellness Tips" />
              <NavItem to="/emergency" icon={AlertCircle} label="Emergency Info" />
              <NavItem to="/welcome" icon={Phone} label="Contact Us" />
            </NavSection>

            <NavSection title="Account" icon={User} index={7}>
              <NavItem to="/login" icon={LogIn} label="Login" />
              <NavItem to="/signup" icon={UserPlus} label="Sign Up" />
            </NavSection>
          </>
        ) : (
          <>
            <NavSection title="Main Menu" icon={Home} index={0}>
              <NavItem to="/dashboard" icon={Home} label="Dashboard" />
              <NavItem to="/appointments" icon={Calendar} label="Appointments" badge="2" />
              <NavItem to="/notifications" icon={Bell} label="Notifications" badge="3" />
              <NavItem to="/messages" icon={MessageSquare} label="Messages" badge="5" />
            </NavSection>

            <NavSection title="Health Center" icon={Heart} index={4}>
              <NavItem to="/vitals" icon={<Heartbeat />} label="Vital Metrics" />
              <NavItem
                to="/health-records"
                icon={FileText}
                label="Medical Records"
              />
              <NavItem to="/mental-health" icon={Brain} label="Mental Wellness" />
              <NavItem to="/fitness" icon={Activity} label="Fitness Tracker" />
              <NavItem to="/nutrition" icon={Apple} label="Nutrition Plan" />
            </NavSection>

            <NavSection title="Analytics" icon={PieChart} index={9}>
              <NavItem to="/health-insights" icon={PieChart} label="Health Insights" />
              <NavItem to="/progress" icon={TrendingUp} label="Progress Report" />
              <NavItem to="/achievements" icon={Award} label="Health Goals" />
            </NavSection>
          </>
        )}
      </div>

      {/* Footer with premium banner and logout */}
      <div className={`
        flex-none border-t border-base-200 
        ${isCollapsed ? 'px-2 py-4' : 'p-4'} 
        transition-all duration-300
      `}>
        {!isCollapsed && (
          <div className="mb-4 bg-gradient-to-r from-primary/20 to-secondary/20 p-3 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Gift size={16} className="text-primary" />
              <h4 className="font-semibold text-base-content">Premium Features</h4>
            </div>
            <p className="text-xs text-base-content/70 mb-2">
              Upgrade for AI health insights and personalized coaching.
            </p>
            <button className="btn btn-primary btn-sm w-full">Upgrade Now</button>
          </div>
        )}

        {isLoggedIn && (
          <div className="mb-4">
            <button
              onClick={onLogout}
              className={`
                w-full transition-all duration-300
                ${isCollapsed
                  ? 'btn btn-circle btn-error btn-outline'
                  : 'btn btn-error btn-outline btn-sm flex items-center gap-2'
                }
              `}
            >
              <LogOut size={isCollapsed ? 16 : 14} />
              {!isCollapsed && <span>Logout</span>}
            </button>
          </div>
        )}

        {!isCollapsed ? (
          <div className="text-center">
            <div className="flex justify-center space-x-2 mb-1">
              <Shield size={12} className="text-primary" />
              <Heart size={12} className="text-primary" />
              <Activity size={12} className="text-primary" />
            </div>
            <div className="text-xs opacity-70">
              © 2025 Wellify | Terms & Privacy
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="tooltip tooltip-right" data-tip="© 2025 Wellify">
              <Shield size={12} className="text-primary" />
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;