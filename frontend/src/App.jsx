import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
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
    <div className="App">

      <Sidebar/>
     
      <Routes>
        <Route path="/" element={<AboutPage/>} /> 
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/homepage" element={<HomePage user = {user}/>} /> */}
        <Route path="/signup" element={<SignUpPage/>} />
        <Route path="/contact" element={<ContactUs/>} />
        <Route path="/about" element={<AboutPage/>} />
        <Route path="/services" element={<Services/>} />
        {/* <Route path="/homepage" element={<HomePage user ={user}/>} /> */}
        <Route path="/homepage" element={<HomePage user={user}/>} />

      </Routes>
    </div>
  );
}

export default App;