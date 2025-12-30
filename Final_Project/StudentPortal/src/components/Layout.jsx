import { useAuth } from '../context/AuthContext';
import Header from './Header';
import AdminHeader from './AdminHeader';

const Layout = ({ children }) => {
  const { user } = useAuth();
  const isAdmin = user?.role?.toLowerCase() === 'admin';
  
  console.log('Layout - User:', user, 'Role:', user?.role, 'IsAdmin:', isAdmin); // Debug log

  return (
    <>
      {isAdmin ? <AdminHeader /> : <Header />}
      {children}
    </>
  );
};

export default Layout;

