import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminAPI, coursesAPI } from '../../services/api';
import './AllCourses.css';

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllCourses();
  }, []);

  const fetchAllCourses = async () => {
    try {
      setLoading(true);
      setError(''); // Clear previous errors
      // Get all courses without date filter
      const response = await adminAPI.getAllCourses();
      console.log('All courses response:', response.data); // Debug log
      
      if (response.data.status === 'success') {
        const coursesData = response.data.data || [];
        setCourses(coursesData);
        if (coursesData.length === 0) {
          setError(''); // Clear error if no courses found (this is valid)
        }
      } else {
        setError(response.data.error || 'Failed to load courses');
      }
    } catch (err) {
      console.error('Error fetching courses:', err);
      console.error('Error response:', err.response?.data);
      setError(err.response?.data?.error || 'Error loading courses. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (courseId) => {
    navigate(`/admin/courses/update/${courseId}`);
  };

  const handleDelete = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        const response = await adminAPI.deleteCourse(courseId);
        if (response.data.status === 'success') {
          fetchAllCourses();
        } else {
          alert('Failed to delete course');
        }
      } catch (err) {
        alert('Error deleting course');
        console.error(err);
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="all-courses-container">
        <div className="loading">Loading courses...</div>
      </div>
    );
  }

  return (
    <div className="all-courses-container">
      <h1 className="page-title">All Courses</h1>
      {error && <div className="error-message">{error}</div>}
      <div className="table-container">
        <table className="courses-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Course Name</th>
              <th>Description</th>
              <th>Fees</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Expire Days</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.length === 0 ? (
              <tr>
                <td colSpan="8" className="no-data">No courses found</td>
              </tr>
            ) : (
              courses.map((course) => (
                <tr key={course.course_id}>
                  <td>{course.course_id}</td>
                  <td>{course.course_name}</td>
                  <td>{course.description || 'N/A'}</td>
                  <td>₹{course.fees || 'N/A'}</td>
                  <td>{formatDate(course.start_date)}</td>
                  <td>{formatDate(course.end_date)}</td>
                  <td>{course.video_expire_days || 'N/A'}</td>
                  <td className="actions-cell">
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(course.course_id)}
                      title="Edit"
                    >
                      ☑
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(course.course_id)}
                      title="Delete"
                    >
                      ☐
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllCourses;

