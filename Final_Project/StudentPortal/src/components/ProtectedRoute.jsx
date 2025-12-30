import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from './Header';
import AdminHeader from './AdminHeader';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to={`/login?returnTo=${location.pathname}`} replace />;
  }

  const isAdmin = user?.role?.toLowerCase() === 'admin';
  
  console.log('ProtectedRoute - User:', user, 'Role:', user?.role, 'IsAdmin:', isAdmin); // Debug log

  return (
    <>
      {isAdmin ? <AdminHeader /> : <Header />}
      {children}
    </>
  );
};

export default ProtectedRoute;

