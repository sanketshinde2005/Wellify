import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import RegisterPage from './components/SignUpPage';
import LoginPage from './components/LoginPage';
import HomePage from './pages/HomePage';
import NavBar from './pages/SideBar';

function App() {
  return (
    <div className="App">

      <NavBar/>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/homepage" element={<HomePage />} />


      </Routes>
    </div>
  );
}

export default App;