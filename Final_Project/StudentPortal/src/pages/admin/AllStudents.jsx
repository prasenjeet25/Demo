import { useState, useEffect, useRef } from 'react';
import { adminAPI } from '../../services/api';
import './AllStudents.css';

const AllStudents = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const isInitialMount = useRef(true);

  useEffect(() => {
    const loadData = async () => {
      await fetchCourses();
      // Fetch all students on initial load
      await fetchAllStudents();
      isInitialMount.current = false;
    };
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Skip on initial mount - only handle filter changes
    if (isInitialMount.current) {
      return;
    }
    
    if (selectedCourseId) {
      fetchStudents(selectedCourseId);
    } else {
      // "All Courses" selected - fetch all students
      fetchAllStudents();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCourseId]);

  const fetchCourses = async () => {
    try {
      // Get ALL courses (not just active ones) for the filter dropdown
      const response = await adminAPI.getAllCourses();
      if (response.data.status === 'success') {
        setCourses(response.data.data || []);
      }
    } catch (err) {
      console.error('Error fetching courses:', err);
    }
  };

  const fetchStudents = async (courseId) => {
    try {
      setLoading(true);
      setError(''); // Clear previous errors
      const response = await adminAPI.getEnrolledStudents(courseId);
      console.log('Filtered students response:', response.data); // Debug log
      
      if (response.data.status === 'success') {
        const studentsData = response.data.data || [];
        setStudents(studentsData);
        if (studentsData.length === 0) {
          setError(''); // Clear error if no students found for this course
        }
      } else {
        setError(response.data.error || 'Failed to load students');
      }
    } catch (err) {
      console.error('Error fetching students:', err);
      console.error('Error response:', err.response?.data);
      setError(err.response?.data?.error || 'Error loading students. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchAllStudents = async () => {
    try {
      setLoading(true);
      setError(''); // Clear previous errors
      // Get all students without course filter
      const response = await adminAPI.getEnrolledStudents(null);
      console.log('All students response:', response.data); // Debug log
      
      if (response.data.status === 'success') {
        const studentsData = response.data.data || [];
        console.log('Students data:', studentsData); // Debug log
        setStudents(studentsData);
        if (studentsData.length === 0) {
          setError(''); // Clear error if no students found (this is valid)
        }
      } else {
        setError(response.data.error || 'Failed to load students');
      }
    } catch (err) {
      console.error('Error fetching all students:', err);
      console.error('Error response:', err.response?.data);
      setError(err.response?.data?.error || 'Error loading students. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getCourseName = (student) => {
    // Check if course_name is already in student object (from backend join)
    if (student.course_name) {
      return student.course_name;
    }
    if (!student.course_id) return 'N/A';
    const course = courses.find(c => c.course_id === student.course_id);
    return course ? course.course_name : 'N/A';
  };

  return (
    <div className="all-students-container">
      <h1 className="page-title">All Students</h1>
      <div className="filter-section">
        <label htmlFor="courseFilter">Filter by Course:</label>
        <select
          id="courseFilter"
          value={selectedCourseId}
          onChange={(e) => setSelectedCourseId(e.target.value)}
          className="course-filter"
          disabled={loading}
        >
          <option value="">All Courses</option>
          {courses.map((course) => (
            <option key={course.course_id} value={course.course_id}>
              {course.course_name}
            </option>
          ))}
        </select>
      </div>
      {error && <div className="error-message">{error}</div>}
      {loading && students.length === 0 ? (
        <div className="loading">Loading students...</div>
      ) : (
        <div className="table-container">
          <table className="students-table">
            <thead>
              <tr>
                <th>Reg No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Course</th>
                <th>Mobile No</th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td colSpan="5" className="no-data">No students found</td>
                </tr>
              ) : (
                students.map((student, index) => (
                  <tr key={student.id || index}>
                    <td>{student.id || index + 1}</td>
                    <td>{student.name || 'N/A'}</td>
                    <td>{student.email || 'N/A'}</td>
                    <td>{getCourseName(student)}</td>
                    <td>{student.mobile_no || 'N/A'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllStudents;

