import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { coursesAPI } from '../services/api';
import './CourseDetails.css';

const CourseDetails = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
      } else {
        setError('Failed to load course details');
      }
    } catch (err) {
      setError('Error loading course details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = () => {
    navigate(`/register/${courseId}`);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  if (loading) {
    return (
      <div className="course-details-container">
        <div className="loading">Loading course details...</div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="course-details-container">
        <div className="error-message">{error || 'Course not found'}</div>
        <button onClick={() => navigate('/home')} className="back-btn">
          Back to Courses
        </button>
      </div>
    );
  }

  return (
    <div className="course-details-container">
      <h1 className="course-title">{course.course_name}</h1>
      <div className="course-info">
        <p className="course-description">{course.description || 'No description available'}</p>
        <div className="course-meta">
          <div className="meta-item">
            <strong>Start Date:</strong> {formatDate(course.start_date)}
          </div>
          <div className="meta-item">
            <strong>End Date:</strong> {formatDate(course.end_date)}
          </div>
          <div className="meta-item">
            <strong>Fees:</strong> ₹{course.fees || 'N/A'}
          </div>
        </div>
        <button onClick={handleRegister} className="register-btn">
          Register to Course
        </button>
      </div>
    </div>
  );
};

export default CourseDetails;

