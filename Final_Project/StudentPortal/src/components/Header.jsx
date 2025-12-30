import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
    setDropdownOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/home');
    setDropdownOpen(false);
  };

  const handleLogin = () => {
    navigate('/login');
    setDropdownOpen(false);
  };

  const getUsername = () => {
    return user?.email?.split('@')[0] || 'student';
  };

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="logo" onClick={() => handleNavigation('/home')}>
          Student Portal
        </h1>
        <nav className="nav-links">
          <button
            className={location.pathname === '/home' ? 'active' : ''}
            onClick={() => handleNavigation('/home')}
          >
            Home
          </button>
          <button
            className={location.pathname === '/about' ? 'active' : ''}
            onClick={() => handleNavigation('/about')}
          >
            About
          </button>
          {user && (
            <button
              className={location.pathname === '/my-courses' ? 'active' : ''}
              onClick={() => handleNavigation('/my-courses')}
            >
              My Courses
            </button>
          )}
        </nav>
        <div className="user-menu">
          {user ? (
            <>
              <button
                className="user-dropdown-btn"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {getUsername()}
                <span className="dropdown-arrow">▼</span>
              </button>
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </>
          ) : (
            <button className="login-btn" onClick={handleLogin}>
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

