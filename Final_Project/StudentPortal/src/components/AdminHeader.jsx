import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AdminHeader.css';

const AdminHeader = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);
  const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false);
  const [videosDropdownOpen, setVideosDropdownOpen] = useState(false);
  const [studentsDropdownOpen, setStudentsDropdownOpen] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
    setCoursesDropdownOpen(false);
    setVideosDropdownOpen(false);
    setStudentsDropdownOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/home');
    setAdminDropdownOpen(false);
  };

  const handleLogin = () => {
    navigate('/login');
    setAdminDropdownOpen(false);
  };

  return (
    <>
      <header className="admin-header-top">
        <div className="admin-header-top-content">
          <h1 className="admin-logo" onClick={() => handleNavigation('/home')}>
            Student Portal
          </h1>
          <nav className="admin-top-nav">
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
          </nav>
          <div className="admin-menu">
            <button
              className="admin-dropdown-btn"
              onClick={() => setAdminDropdownOpen(!adminDropdownOpen)}
            >
              admin
              <span className="dropdown-arrow">▼</span>
            </button>
            {adminDropdownOpen && (
              <div className="admin-dropdown-menu">
                <button onClick={() => { setAdminDropdownOpen(false); handleNavigation('/admin/profile'); }}>
                  Update Profile
                </button>
                <button onClick={() => { setAdminDropdownOpen(false); handleNavigation('/admin/change-password'); }}>
                  Change Password
                </button>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </div>
      </header>
      <nav className="admin-navbar">
        <div className="admin-navbar-content">
          <button
            className={location.pathname === '/admin/dashboard' || location.pathname === '/home' ? 'active' : ''}
            onClick={() => handleNavigation('/admin/dashboard')}
          >
            Dashboard
          </button>
          <div className="nav-dropdown">
            <button
              className={`nav-dropdown-btn ${coursesDropdownOpen ? 'active' : ''}`}
              onClick={() => {
                setCoursesDropdownOpen(!coursesDropdownOpen);
                setVideosDropdownOpen(false);
                setStudentsDropdownOpen(false);
              }}
            >
              Courses
              <span className="dropdown-arrow">▼</span>
            </button>
            {coursesDropdownOpen && (
              <div className="nav-dropdown-menu">
                <button 
                  onClick={() => handleNavigation('/admin/courses')}
                  className={location.pathname === '/admin/courses' ? 'active' : ''}
                >
                  All Courses
                </button>
                <button 
                  onClick={() => handleNavigation('/admin/courses/add')}
                  className={location.pathname === '/admin/courses/add' ? 'active' : ''}
                >
                  Add Course
                </button>
              </div>
            )}
          </div>
          <div className="nav-dropdown">
            <button
              className={`nav-dropdown-btn ${videosDropdownOpen ? 'active' : ''}`}
              onClick={() => {
                setVideosDropdownOpen(!videosDropdownOpen);
                setCoursesDropdownOpen(false);
                setStudentsDropdownOpen(false);
              }}
            >
              Videos
              <span className="dropdown-arrow">▼</span>
            </button>
            {videosDropdownOpen && (
              <div className="nav-dropdown-menu">
                <button 
                  onClick={() => handleNavigation('/admin/videos')}
                  className={location.pathname === '/admin/videos' ? 'active' : ''}
                >
                  All Videos
                </button>
                <button 
                  onClick={() => handleNavigation('/admin/videos/add')}
                  className={location.pathname === '/admin/videos/add' ? 'active' : ''}
                >
                  Add Video
                </button>
              </div>
            )}
          </div>
          <div className="nav-dropdown">
            <button
              className={`nav-dropdown-btn ${studentsDropdownOpen ? 'active' : ''}`}
              onClick={() => {
                setStudentsDropdownOpen(!studentsDropdownOpen);
                setCoursesDropdownOpen(false);
                setVideosDropdownOpen(false);
              }}
            >
              Students
              <span className="dropdown-arrow">▼</span>
            </button>
            {studentsDropdownOpen && (
              <div className="nav-dropdown-menu">
                <button 
                  onClick={() => handleNavigation('/admin/students')}
                  className={location.pathname === '/admin/students' ? 'active' : ''}
                >
                  All Students
                </button>
                <button 
                  onClick={() => handleNavigation('/admin/enrolled-students')}
                  className={location.pathname === '/admin/enrolled-students' ? 'active' : ''}
                >
                  Enrolled Students
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default AdminHeader;

