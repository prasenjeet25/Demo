import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { adminAPI, coursesAPI } from '../../services/api';
import './EditVideo.css';

const EditVideo = () => {
  const { videoId } = useParams();
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
    fetchVideo();
  }, [videoId]);

  const fetchCourses = async () => {
    try {
      const response = await adminAPI.getAllCourses();
      if (response.data.status === 'success') {
        setCourses(response.data.data || []);
      }
    } catch (err) {
      console.error('Error fetching courses:', err);
    }
  };

  const fetchVideo = async () => {
    try {
      setLoading(true);
      // Get all videos to find the one we need
      const response = await adminAPI.getAllVideos(null);
      if (response.data.status === 'success') {
        const video = response.data.data.find(v => v.video_id === parseInt(videoId));
        if (video) {
          setFormData({
            courseId: video.course_id.toString(),
            title: video.title || '',
            desc: video.description || '',
            youtubeURL: video.youtube_url || ''
          });
        } else {
          setError('Video not found');
        }
      }
    } catch (err) {
      setError('Error loading video');
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
      const response = await adminAPI.updateVideo(
        parseInt(videoId),
        parseInt(formData.courseId),
        formData.title,
        formData.desc,
        formData.youtubeURL
      );

      if (response.data.status === 'success') {
        navigate('/admin/videos');
      } else {
        setError(response.data.error || 'Failed to update video');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Error updating video');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="edit-video-container">
        <div className="loading">Loading video...</div>
      </div>
    );
  }

  return (
    <div className="edit-video-container">
      <h1 className="page-title">Edit Video</h1>
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

        <button type="submit" disabled={submitting} className="submit-btn">
          {submitting ? 'Updating Video...' : 'Update Video'}
        </button>
      </form>
    </div>
  );
};

export default EditVideo;

