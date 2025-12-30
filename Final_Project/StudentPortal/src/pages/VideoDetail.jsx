import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { coursesAPI } from '../services/api';
import './VideoDetail.css';

const VideoDetail = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if video data was passed via navigation state
    if (location.state?.video) {
      setVideo(location.state.video);
      setLoading(false);
    } else {
      fetchVideoDetails();
    }
  }, [videoId, location.state]);

  const fetchVideoDetails = async () => {
    try {
      setLoading(true);
      // Get all courses with videos to find the specific video
      const response = await coursesAPI.getMyCoursesWithVideos();
      if (response.data.status === 'success') {
        const data = response.data.data || [];
        // Find video by video_id
        const foundVideo = data.find(v => v.video_id && v.video_id === parseInt(videoId));
        if (foundVideo) {
          setVideo({
            video_id: foundVideo.video_id,
            title: foundVideo.title,
            description: foundVideo.description,
            added_at: foundVideo.added_at,
            youtube_url: foundVideo.youtube_url,
            course_name: foundVideo.course_name
          });
        } else {
          setError('Video not found');
        }
      }
    } catch (err) {
      setError('Error loading video details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
  };

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return '';
    // Handle different YouTube URL formats
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    } else if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    } else if (url.includes('youtube.com/embed/')) {
      return url;
    }
    return url;
  };

  if (loading) {
    return (
      <div className="video-detail-container">
        <div className="loading">Loading video details...</div>
      </div>
    );
  }

  if (error || !video) {
    return (
      <div className="video-detail-container">
        <div className="error-message">{error || 'Video not found'}</div>
        <button onClick={() => navigate('/my-courses')} className="back-btn">
          ← Back to Courses
        </button>
      </div>
    );
  }

  return (
    <div className="video-detail-container">
      <button onClick={() => navigate('/my-courses')} className="back-btn">
        ← Back to Courses
      </button>
      <h1 className="video-title">{video.title}</h1>
      <div className="video-info">
        <p className="video-description">{video.description || 'No description available'}</p>
        <div className="video-meta">
          <p className="added-date">Added: {formatDateTime(video.added_at)}</p>
        </div>
        {video.youtube_url && (
          <div className="video-player">
            <iframe
              width="100%"
              height="500"
              src={getYouTubeEmbedUrl(video.youtube_url)}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoDetail;

