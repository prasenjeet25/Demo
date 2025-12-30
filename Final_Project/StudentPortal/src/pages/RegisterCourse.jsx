import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { coursesAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './RegisterCourse.css';

const RegisterCourse = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: user?.email || '',
    mobileNo: '',
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchCourseDetails();
  }, [courseId]);

  const fetchCourseDetails = async () => {
    try {
      setLoading(true);
      const response = await coursesAPI.getAllActiveCourses();
      if (response.data.status === 'success') {
        const foundCourse = response.data.data.find(c => c.course_id === parseInt(courseId));
        if (foundCourse) {
          setCourse(foundCourse);
        } else {
          setError('Course not found');
        }
      }
    } catch (err) {
      setError('Error loading course details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const response = await coursesAPI.registerToCourse(
        parseInt(courseId),
        formData.email,
        formData.name,
        formData.mobileNo
      );

      if (response.data.status === 'success') {
        setSuccess(true);
        // Show success message for 2 seconds, then navigate
        setTimeout(() => {
          navigate('/my-courses', { state: { refreshCourses: true } });
        }, 2000);
      } else {
        setError(response.data.error || 'Registration failed');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Error registering for course');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="register-course-container">
        <div className="loading">Loading course details...</div>
      </div>
    );
  }

  if (error && !course) {
    return (
      <div className="register-course-container">
        <div className="error-message">{error}</div>
        <button onClick={() => navigate('/home')} className="back-btn">
          Back to Courses
        </button>
      </div>
    );
  }

  return (
    <div className="register-course-container">
      <h1 className="page-title">Register to Course</h1>
      {course && (
        <div className="course-summary">
          <table className="summary-table">
            <tbody>
              <tr>
                <td><strong>Course Name</strong></td>
                <td>{course.course_name}</td>
              </tr>
              <tr>
                <td><strong>Fees (₹)</strong></td>
                <td>{course.fees || 'N/A'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter your name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobileNo">Mobile Number</label>
          <input
            type="tel"
            id="mobileNo"
            name="mobileNo"
            value={formData.mobileNo}
            onChange={handleChange}
            required
            placeholder="Enter your mobile number"
            pattern="[0-9]{10}"
            maxLength="10"
          />
        </div>
        {success && (
          <div className="success-message">
            ✅ Registration Successful! Redirecting to My Courses...
          </div>
        )}
        {error && <div className="error-message">{error}</div>}
        <button type="submit" disabled={submitting || success} className="submit-btn">
          {submitting ? 'Registering...' : success ? 'Registration Successful!' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default RegisterCourse;

