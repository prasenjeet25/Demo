import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Home from './pages/Home';
import MyCourses from './pages/MyCourses';
import About from './pages/About';
import CourseDetails from './pages/CourseDetails';
import RegisterCourse from './pages/RegisterCourse';
import VideoDetail from './pages/VideoDetail';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
// Admin pages
import Dashboard from './pages/admin/Dashboard';
import AllCourses from './pages/admin/AllCourses';
import AddCourse from './pages/admin/AddCourse';
import UpdateCourse from './pages/admin/UpdateCourse';
import AllVideos from './pages/admin/AllVideos';
import AddVideo from './pages/admin/AddVideo';
import EditVideo from './pages/admin/EditVideo';
import AllStudents from './pages/admin/AllStudents';
import EnrolledStudents from './pages/admin/EnrolledStudents';
import Profile from './pages/admin/Profile';
import ChangePassword from './pages/admin/ChangePassword';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/home"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/my-courses"
            element={
              <ProtectedRoute>
                <MyCourses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/about"
            element={
              <Layout>
                <About />
              </Layout>
            }
          />
          <Route
            path="/course/:courseId"
            element={
              <Layout>
                <CourseDetails />
              </Layout>
            }
          />
          <Route
            path="/register/:courseId"
            element={
              <ProtectedRoute>
                <RegisterCourse />
              </ProtectedRoute>
            }
          />
          <Route
            path="/video/:videoId"
            element={
              <ProtectedRoute>
                <VideoDetail />
              </ProtectedRoute>
            }
          />
          {/* Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/courses"
            element={
              <ProtectedRoute>
                <AllCourses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/courses/add"
            element={
              <ProtectedRoute>
                <AddCourse />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/courses/update/:courseId"
            element={
              <ProtectedRoute>
                <UpdateCourse />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/videos"
            element={
              <ProtectedRoute>
                <AllVideos />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/videos/add"
            element={
              <ProtectedRoute>
                <AddVideo />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/videos/edit/:videoId"
            element={
              <ProtectedRoute>
                <EditVideo />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/students"
            element={
              <ProtectedRoute>
                <AllStudents />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/enrolled-students"
            element={
              <ProtectedRoute>
                <EnrolledStudents />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/change-password"
            element={
              <ProtectedRoute>
                <ChangePassword />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/home" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
