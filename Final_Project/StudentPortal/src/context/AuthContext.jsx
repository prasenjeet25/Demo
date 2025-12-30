import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Helper function to decode JWT and get user info
const decodeToken = (token) => {
  try {
    if (!token || typeof token !== 'string') {
      console.error('Invalid token format - not a string:', typeof token);
      return null;
    }
    
    // Remove any whitespace
    const cleanToken = token.trim();
    
    if (cleanToken.length === 0) {
      console.error('Invalid token - empty string');
      return null;
    }
    
    // Check if token has the correct format (3 parts separated by dots)
    const parts = cleanToken.split('.');
    if (parts.length !== 3) {
      console.error('Invalid token format - should have 3 parts, got:', parts.length);
      console.error('Token preview:', cleanToken.substring(0, 50) + '...');
      return null;
    }
    
    // Try to decode the token
    let decoded;
    try {
      decoded = jwtDecode(cleanToken);
    } catch (decodeError) {
      console.error('jwtDecode failed:', decodeError);
      console.error('Error message:', decodeError.message);
      console.error('Token preview:', cleanToken.substring(0, 50) + '...');
      return null;
    }
    
    console.log('Full decoded token:', decoded); // Debug log
    
    if (!decoded) {
      console.error('Decoded token is null or undefined');
      return null;
    }
    
    if (!decoded.email) {
      console.error('Token missing email field. Decoded:', decoded);
      return null;
    }
    
    const result = {
      email: decoded.email,
      role: decoded.role ? decoded.role.toLowerCase() : 'student' // Normalize to lowercase, default to student
    };
    
    console.log('Token decoded successfully:', result);
    return result;
  } catch (error) {
    console.error('Unexpected error in decodeToken:', error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = decodeToken(token);
      if (decoded) {
        setUser({ 
          email: decoded.email, 
          token,
          role: decoded.role
        });
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authAPI.login(email, password);
      
      // Check if response has data
      if (!response || !response.data) {
        console.error('Invalid response from server:', response);
        return { success: false, error: 'Invalid response from server' };
      }
      
      console.log('Login response:', response.data); // Debug log
      
      // Check response status - backend returns status: "success" or "failure"
      if (response.data.status === 'success') {
        const responseData = response.data.data;
        
        if (!responseData) {
          console.error('No data in response:', response.data);
          return { success: false, error: 'Invalid response format from server' };
        }
        
        const userEmail = responseData.email || email;
        const token = responseData.token;
        
        if (!token) {
          console.error('No token received from server');
          return { success: false, error: 'No authentication token received' };
        }
        
        console.log('Token received, length:', token.length); // Debug log
        
        // Store token first
        localStorage.setItem('token', token);
        
        // Decode token
        const decoded = decodeToken(token);
        console.log('Decoded token:', decoded); // Debug log
        
        if (!decoded) {
          // Clear invalid token
          localStorage.removeItem('token');
          return { success: false, error: 'Failed to decode authentication token. Please try logging in again.' };
        }
        
        const userData = {
          email: userEmail || decoded.email,
          token,
          role: decoded.role || 'student' // Normalize role, default to student
        };
        
        console.log('User data set:', userData); // Debug log
        console.log('Is admin?', userData.role === 'admin'); // Debug log
        
        setUser(userData);
        return { success: true, userData };
      } else {
        // Backend returned an error (status: "failure")
        const errorMessage = response.data.error || 'Login failed';
        console.error('Login failed:', errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      console.error('Login error:', error); // Debug log
      console.error('Error response:', error.response?.data); // Debug log
      
      // Handle network errors
      if (error.response) {
        // Server responded with error
        const errorMessage = error.response.data?.error || error.response.data?.data || 'Login failed';
        return { success: false, error: errorMessage };
      } else if (error.request) {
        // Request made but no response
        return { success: false, error: 'Unable to connect to server. Please check your connection.' };
      } else {
        // Something else happened
        return { success: false, error: error.message || 'An unexpected error occurred' };
      }
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

