import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { adminAPI, coursesAPI } from '../../services/api';
import './UpdateCourse.css';

const UpdateCourse = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    courseName: '',
    desc: '',
    fees: '',
    startDate: '',
    endDate: '',
    videoExpireDays: ''
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCourse();
  }, [courseId]);

  const fetchCourse = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getAllCourses();
      if (response.data.status === 'success') {
        const course = response.data.data.find(c => c.course_id === parseInt(courseId));
        if (course) {
          // Format dates for input fields (YYYY-MM-DD)
          const startDate = course.start_date ? new Date(course.start_date).toISOString().split('T')[0] : '';
          const endDate = course.end_date ? new Date(course.end_date).toISOString().split('T')[0] : '';
          
          setFormData({
            courseName: course.course_name || '',
            desc: course.description || '',
            fees: course.fees || '',
            startDate: startDate,
            endDate: endDate,
            videoExpireDays: course.video_expire_days || ''
          });
        } else {
          setError('Course not found');
        }
      }
    } catch (err) {
      setError('Error loading course');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const response = await adminAPI.updateCourse(
        parseInt(courseId),
        formData.courseName,
        formData.desc,
        parseFloat(formData.fees),
        formData.startDate,
        formData.endDate,
        parseInt(formData.videoExpireDays)
      );

      if (response.data.status === 'success') {
        navigate('/admin/courses');
      } else {
        setError(response.data.error || 'Failed to update course');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Error updating course');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="update-course-container">
        <div className="loading">Loading course...</div>
      </div>
    );
  }

  return (
    <div className="update-course-container">
      <h1 className="page-title">Update Course</h1>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="course-form">
        <div className="form-group">
          <label htmlFor="courseName">Course Name</label>
          <input
            type="text"
            id="courseName"
            name="courseName"
            value={formData.courseName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="desc">Description</label>
          <textarea
            id="desc"
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            required
            rows="4"
          />
        </div>

        <div className="form-group">
          <label htmlFor="fees">Fees</label>
          <input
            type="number"
            id="fees"
            name="fees"
            value={formData.fees}
            onChange={handleChange}
            required
            min="0"
          />
        </div>

        <div className="form-group">
          <label htmlFor="startDate">Start Date</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="endDate">End Date</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="videoExpireDays">Video Expire Days</label>
          <input
            type="number"
            id="videoExpireDays"
            name="videoExpireDays"
            value={formData.videoExpireDays}
            onChange={handleChange}
            required
            min="1"
          />
        </div>

        <button type="submit" disabled={submitting} className="submit-btn">
          {submitting ? 'Updating Course...' : 'Update Course'}
        </button>
      </form>
    </div>
  );
};

export default UpdateCourse;

