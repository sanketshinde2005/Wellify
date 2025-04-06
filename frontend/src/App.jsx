import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
// import SignUpPage from './components/SignUpPage';
import LoginPage from "./components/LoginPage";
import HomePage from "./pages/HomePage";
import Sidebar from "./pages/Sidebar";
import BookAppointment from "./components/BookAppointment";
import { UpcomingAppointments } from "./components/upcomingAppointments";
import { useAuthstore } from "./store/useAuthstore";
import WelcomePage from "./components/welcomePage";
import { Toaster } from "react-hot-toast";
import PredictDisease from "./components/PredictDisease";
import ProfilePage from "./pages/ProfilePage";
import SignUpPage from "./components/SignUpPage";
import WellnessTips from "./pages/WellnessTips";
import Emergency from "./pages/EmergencyPage";
import FindDoctors from "./pages/FindDoctors";
import SettingsPage from "./pages/SettingsPage";
import { useThemeStore } from "./store/useThemeStore";
import ContactUs from "./pages/ContactUs";
import ReportAnalyzer from "./components/ReportAnalyzer";

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

  const { theme } = useThemeStore();

  return (
    <div className="flex min-h-screen bg-base-100" data-theme={theme}>
      <Toaster position="top-center" reverseOrder={false} />

      <Sidebar isLoggedIn={!!authUser} onToggle={handleSidebarToggle} />

      <main
        className={`
          flex-1 transition-all duration-300 ease-in-out
          ${isSidebarCollapsed ? "ml-20" : "ml-72"}
        `}
      >
        <div className="py-2 max-w-7xl mx-auto min-h-screen flex flex-col justify-center items-center">
          <Routes>
            <Route
              path="/"
              element={authUser ? <HomePage /> : <WelcomePage />}
            />
            <Route path="/signup" element={<SignUpPage />} />
            <Route
              path="/login"
              element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
            />
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/predict" element={<PredictDisease />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route
              path="/appoint"
              element={authUser ? <BookAppointment /> : <Navigate to="/" />}
            />
            <Route
              path="/UpcomingAppointments"
              element={
                authUser ? <UpcomingAppointments /> : <Navigate to="/" />
              }
            />
            <Route
              path="/wellnesstips"
              element={authUser ? <WellnessTips /> : <Navigate to="/" />}
            />
            <Route
              path="/emergency"
              element={authUser ? <Emergency /> : <Navigate to="/" />}
            />
            <Route path="/findDoctor" element={<FindDoctors />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route
              path="/report-analyzer"
              element={
                authUser?.proffession === "doctor" ? (
                  <ReportAnalyzer userRole={authUser.proffession} />
                ) : (
                  <Navigate to="/report-analyzer" />
                )
              }
            />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
