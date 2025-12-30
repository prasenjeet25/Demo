import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { coursesAPI } from '../services/api';
import './MyCourses.css';

const MyCourses = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedCourses, setExpandedCourses] = useState(new Set());
  const [successMessage, setSuccessMessage] = useState('');
  const hasHandledRefresh = useRef(false);

  const groupCoursesWithVideos = (data) => {
    const courseMap = new Map();

    data.forEach((row) => {
      const courseId = row.course_id;
      
      if (!courseMap.has(courseId)) {
        // First time seeing this course, add it
        courseMap.set(courseId, {
          course_id: row.course_id,
          course_name: row.course_name,
          description: row.description,
          start_date: row.start_date,
          end_date: row.end_date,
          fees: row.fees,
          video_expire_days: row.video_expire_days,
          videos: []
        });
      }

      // Add video if it exists (video fields might be null if course has no videos)
      // Check if video fields are present and not null
      if (row.title !== null && row.title !== undefined && row.youtube_url) {
        const course = courseMap.get(courseId);
        // Check if this video is not already added (avoid duplicates)
        const videoExists = course.videos.some(v => v.video_id === row.video_id);
        if (!videoExists && row.video_id) {
          course.videos.push({
            video_id: row.video_id,
            title: row.title,
            description: row.description || null,
            youtube_url: row.youtube_url,
            added_at: row.added_at,
            course_id: courseId
          });
        }
      }
    });

    return Array.from(courseMap.values());
  };

  const fetchMyCourses = useCallback(async () => {
    try {
      setLoading(true);
      const response = await coursesAPI.getMyCoursesWithVideos();
      if (response.data.status === 'success') {
        const data = response.data.data || [];
        // Group videos by course_id
        const groupedCourses = groupCoursesWithVideos(data);
        setCourses(groupedCourses);
        // Don't expand by default - show table view first
      } else {
        setError('Failed to load your courses');
      }
    } catch (err) {
      setError('Error loading courses. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const toggleCourse = (courseId) => {
    const newExpanded = new Set(expandedCourses);
    if (newExpanded.has(courseId)) {
      newExpanded.delete(courseId);
    } else {
      newExpanded.add(courseId);
    }
    setExpandedCourses(newExpanded);
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

  // Always fetch courses on mount or when location changes
  useEffect(() => {
    fetchMyCourses();
  }, [fetchMyCourses]);

  // Handle success message separately
  useEffect(() => {
    const refreshFlag = location.state?.refreshCourses;
    
    if (refreshFlag && !hasHandledRefresh.current) {
      hasHandledRefresh.current = true;
      setSuccessMessage('Registration successful! Your courses have been updated.');
      
      // Clear the state to prevent showing message on refresh
      navigate(location.pathname, { replace: true, state: {} });
      
      // Auto-hide success message after 5 seconds
      const timer = setTimeout(() => {
        setSuccessMessage('');
        hasHandledRefresh.current = false;
      }, 5000);
      
      return () => {
        clearTimeout(timer);
      };
    }
  }, [location.state, navigate]);

  if (loading) {
    return (
      <div className="my-courses-container">
        <div className="loading">Loading your courses...</div>
      </div>
    );
  }

  const handleVideoClick = (video) => {
    // Navigate to video detail page
    navigate(`/video/${video.video_id}`, {
      state: { video }
    });
  };

  return (
    <div className="my-courses-container">
      <h1 className="page-title">My Registered Courses</h1>
      {successMessage && (
        <div className="success-message" style={{ marginBottom: '20px' }}>
          {successMessage}
        </div>
      )}
      {error && <div className="error-message">{error}</div>}
      {courses.length === 0 ? (
        <div className="no-courses">
          <p>You haven't enrolled in any courses yet.</p>
          <p>Visit the Home page to browse available courses.</p>
        </div>
      ) : (
        <>
          {/* Table view when not expanded */}
          {expandedCourses.size === 0 && (
            <div className="courses-table-container">
              <table className="courses-table-view">
                <thead>
                  <tr>
                    <th>Course Name</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course) => (
                    <tr 
                      key={course.course_id}
                      onClick={() => toggleCourse(course.course_id)}
                      className="course-row"
                    >
                      <td>{course.course_name}— {course.description || ''}</td>
                      <td>✓</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {/* Expanded view */}
          {expandedCourses.size > 0 && (
            <div className="courses-list">
              {courses.map((course) => {
                const isExpanded = expandedCourses.has(course.course_id);
                if (!isExpanded) return null;
                
                return (
                  <div key={course.course_id} className="course-item">
                    <div 
                      className="course-item-header"
                      onClick={() => toggleCourse(course.course_id)}
                    >
                      <h3>{course.course_name}— {course.description || ''}</h3>
                      <span className={`expand-icon ${isExpanded ? 'expanded' : ''}`}>
                        {isExpanded ? '▲' : '▼'}
                      </span>
                    </div>
                    {isExpanded && (
                      <div className="course-item-body">
                        <div className="course-dates">
                          Start: {formatDate(course.start_date)} | End: {formatDate(course.end_date)}
                        </div>
                        {course.videos.length > 0 && (
                          <div className="videos-section">
                            <h4 className="videos-heading">Videos</h4>
                            <ul className="videos-list">
                              {course.videos.map((video, index) => (
                                <li key={index} className="video-item">
                                  <button
                                    className="video-link"
                                    onClick={() => handleVideoClick(video)}
                                  >
                                    - {video.title}
                                  </button>
                                  <div className="video-date">
                                    Added: {formatDate(video.added_at)}
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {course.videos.length === 0 && (
                          <div className="no-videos">No videos available yet.</div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyCourses;
