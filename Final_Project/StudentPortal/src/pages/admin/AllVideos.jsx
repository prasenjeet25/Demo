import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminAPI, coursesAPI } from '../../services/api';
import './AllVideos.css';

const AllVideos = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      await fetchCourses();
      // Fetch all videos on initial load
      await fetchVideos(null);
    };
    loadData();
  }, []);

  useEffect(() => {
    // Only trigger when course filter changes (not on initial mount)
    if (selectedCourseId !== undefined) {
      fetchVideos(selectedCourseId || null);
    }
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

  const fetchVideos = async (courseId) => {
    try {
      setLoading(true);
      setError(''); // Clear previous errors
      // Pass null to get all videos, or courseId to filter
      const response = await adminAPI.getAllVideos(courseId || null);
      console.log('Videos response:', response.data); // Debug log
      
      if (response.data.status === 'success') {
        const videosData = response.data.data || [];
        setVideos(videosData);
        if (videosData.length === 0) {
          setError(''); // Clear error if no videos found (this is valid)
        }
      } else {
        setError(response.data.error || 'Failed to load videos');
      }
    } catch (err) {
      console.error('Error fetching videos:', err);
      console.error('Error response:', err.response?.data);
      setError(err.response?.data?.error || 'Error loading videos. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (videoId) => {
    navigate(`/admin/videos/edit/${videoId}`);
  };

  const handleDelete = async (videoId) => {
    if (window.confirm('Are you sure you want to delete this video?')) {
      try {
        const response = await adminAPI.deleteVideo(videoId);
        if (response.data.status === 'success') {
          fetchVideos(selectedCourseId || null);
        } else {
          alert('Failed to delete video');
        }
      } catch (err) {
        alert('Error deleting video');
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

  const getCourseName = (video) => {
    // Check if course_name is already in video object (from backend join)
    if (video.course_name) {
      return video.course_name;
    }
    const course = courses.find(c => c.course_id === video.course_id);
    return course ? course.course_name : 'N/A';
  };

  if (loading && videos.length === 0) {
    return (
      <div className="all-videos-container">
        <div className="loading">Loading videos...</div>
      </div>
    );
  }

  return (
    <div className="all-videos-container">
      <h1 className="page-title">All Videos</h1>
      <div className="filter-section">
        <label htmlFor="courseFilter">Filter by Course:</label>
        <select
          id="courseFilter"
          value={selectedCourseId}
          onChange={(e) => setSelectedCourseId(e.target.value)}
          className="course-filter"
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
      <div className="table-container">
        <table className="videos-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Course</th>
              <th>Title</th>
              <th>Description</th>
              <th>Youtube URL</th>
              <th>Added At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {videos.length === 0 ? (
              <tr>
                <td colSpan="7" className="no-data">No videos found</td>
              </tr>
            ) : (
              videos.map((video) => (
                <tr key={video.video_id}>
                  <td>{video.video_id}</td>
                  <td>{getCourseName(video)}</td>
                  <td>{video.title}</td>
                  <td>{video.description || 'N/A'}</td>
                  <td>
                    {video.youtube_url ? (
                      <a href={video.youtube_url} target="_blank" rel="noopener noreferrer">
                        {video.youtube_url}
                      </a>
                    ) : (
                      'N/A'
                    )}
                  </td>
                  <td>{formatDate(video.added_at)}</td>
                  <td className="actions-cell">
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(video.video_id)}
                      title="Edit"
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(video.video_id)}
                      title="Delete"
                    >
                      Delete
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

export default AllVideos;

