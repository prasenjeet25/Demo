import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Only redirect if user is already logged in when component mounts
    // (not from a fresh login - handleSubmit handles that)
    if (!authLoading && user && location.pathname === '/login') {
      const searchParams = new URLSearchParams(window.location.search);
      const returnTo = searchParams.get('returnTo');
      
      // Redirect based on user role
      if (user.role === 'admin') {
        navigate(returnTo || '/admin/dashboard');
      } else {
        navigate(returnTo || '/home');
      }
    }
  }, [user, authLoading, navigate, location.pathname]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(email, password);
      
      console.log('Login result:', result); // Debug log
      
      if (result && result.success) {
        const searchParams = new URLSearchParams(window.location.search);
        const returnTo = searchParams.get('returnTo');
        
        // Use the userData from result - it has the role decoded from token
        const currentUser = result.userData;
        const userRole = currentUser?.role?.toLowerCase();
        
        console.log('Current user after login:', currentUser); // Debug log
        console.log('User role (normalized):', userRole); // Debug log
        console.log('Is admin check:', userRole === 'admin'); // Debug log
        
        // Small delay to ensure state is updated
        setTimeout(() => {
          // Redirect immediately based on role (case-insensitive)
          if (userRole === 'admin') {
            console.log('Redirecting to admin dashboard');
            navigate(returnTo || '/admin/dashboard', { replace: true });
          } else {
            console.log('Redirecting to home');
            navigate(returnTo || '/home', { replace: true });
          }
        }, 100);
      } else {
        const errorMsg = result?.error || 'Login failed. Please check your credentials.';
        console.error('Login failed:', errorMsg);
        setError(errorMsg);
        setLoading(false);
      }
    } catch (err) {
      console.error('Login exception:', err);
      setError('An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="login-container">
        <div className="login-box">
          <div className="loading">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Student Portal</h1>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" disabled={loading} className="login-button">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

