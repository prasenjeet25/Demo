import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminAPI, coursesAPI } from '../../services/api';
import './AddVideo.css';

const AddVideo = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    courseId: '',
    title: '',
    desc: '',
    youtubeURL: ''
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getAllCourses();
      if (response.data.status === 'success') {
        setCourses(response.data.data || []);
      }
    } catch (err) {
      console.error('Error fetching courses:', err);
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
      const response = await adminAPI.addVideo(
        parseInt(formData.courseId),
        formData.title,
        formData.desc,
        formData.youtubeURL
      );

      if (response.data.status === 'success') {
        navigate('/admin/videos');
      } else {
        setError(response.data.error || 'Failed to add video');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Error adding video');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="add-video-container">
        <div className="loading">Loading courses...</div>
      </div>
    );
  }

  return (
    <div className="add-video-container">
      <h1 className="page-title">Add New Video</h1>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="video-form">
        <div className="form-group">
          <label htmlFor="courseId">Course</label>
          <select
            id="courseId"
            name="courseId"
            value={formData.courseId}
            onChange={handleChange}
            required
            className="form-select"
          >
            <option value="">Select a course</option>
            {courses.map((course) => (
              <option key={course.course_id} value={course.course_id}>
                {course.course_name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="title">Video Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter video title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="youtubeURL">YouTube URL</label>
          <input
            type="url"
            id="youtubeURL"
            name="youtubeURL"
            value={formData.youtubeURL}
            onChange={handleChange}
            required
            placeholder="Enter YouTube URL"
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
            placeholder="Enter description"
            rows="4"
          />
        </div>

        <button type="submit" disabled={submitting} className="submit-btn">
          {submitting ? 'Adding Video...' : 'Add Video'}
        </button>
      </form>
    </div>
  );
};

export default AddVideo;

