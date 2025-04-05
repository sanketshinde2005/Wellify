import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className="App">

      
      <nav style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
      </nav>

      <Routes>

        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/homepage" element={<HomePage />} />

      </Routes>
    </div>
  );
}

export default App;