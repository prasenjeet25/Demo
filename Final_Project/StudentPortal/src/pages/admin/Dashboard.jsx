import { useState, useEffect } from 'react';
import { coursesAPI } from '../../services/api';
import CourseCard from '../../components/CourseCard';
import './Dashboard.css';

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await coursesAPI.getAllActiveCourses();
      if (response.data.status === 'success') {
        setCourses(response.data.data || []);
      } else {
        setError('Failed to load courses');
      }
    } catch (err) {
      setError('Error loading courses. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading">Loading courses...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <h1 className="page-title">Available Courses</h1>
      {error && <div className="error-message">{error}</div>}
      <div className="courses-grid">
        {courses.length === 0 ? (
          <div className="no-courses">No courses available at the moment.</div>
        ) : (
          courses.map((course) => (
            <CourseCard
              key={course.course_id}
              course={course}
              onViewMore={() => {}}
              formatDate={formatDate}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;

