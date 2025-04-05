import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import RegisterPage from './components/SignUpPage';
import LoginPage from './components/LoginPage';
import HomePage from './pages/HomePage';
import Sidebar from './pages/Sidebar';
import BookAppointment from './components/BookAppointment';
import { UpcomingAppointments } from './components/upcomingAppointments';
import { useAuthstore } from './store/useAuthstore';
import WelcomePage from './components/welcomePage';
import { Toaster } from 'react-hot-toast';

function App() {
  const { authUser, checkAuth } = useAuthstore();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const location = useLocation();

  useEffect(() => {
    checkAuth();
  }, [location]);

  const handleSidebarToggle = (collapsed) => {
    setIsSidebarCollapsed(collapsed);
  };

  return (
    <div className="flex min-h-screen bg-base-100">
      <Toaster position="top-center" reverseOrder={false} />

      <Sidebar
        isLoggedIn={!!authUser}
        onToggle={handleSidebarToggle}
      />

      <main
        className={`
          flex-1 transition-all duration-300 ease-in-out
          ${isSidebarCollapsed ? 'ml-20' : 'ml-72'}
        `}
      >
        <div className="py-2 max-w-7xl mx-auto min-h-screen flex flex-col justify-center items-center">
          <Routes>
            <Route path="/" element={authUser ? <HomePage /> : <WelcomePage />} />
            <Route path="/signup" element={<RegisterPage />} />
            <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to={"/"} />} />
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/appoint" element={authUser ? <BookAppointment /> : <Navigate to="/welcome" />} />
            <Route path="/UpcomingAppointments" element={authUser ? <UpcomingAppointments /> : <Navigate to="/welcome" />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
