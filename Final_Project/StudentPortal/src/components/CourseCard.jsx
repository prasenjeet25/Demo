import './CourseCard.css';

const CourseCard = ({ course, onViewMore, formatDate }) => {
  const getCourseIcon = (courseName) => {
    const name = courseName?.toLowerCase() || '';
    
    if (name.includes('mern') || name.includes('mongo') || name.includes('express') || name.includes('react') || name.includes('node')) {
      return 'mern';
    } else if (name.includes('python')) {
      return 'python';
    } else if (name.includes('android')) {
      return 'android';
    } else if (name.includes('ai') || name.includes('artificial')) {
      return 'ai';
    }
    return 'default';
  };

  const renderIcon = (iconType) => {
    switch (iconType) {
      case 'mern':
        return (
          <div className="course-icon mern-icon">
            <div className="mern-logos">
              <div className="mern-logo green">M</div>
              <div className="mern-logo red">E</div>
              <div className="mern-logo blue">R</div>
              <div className="mern-logo dark-green">N</div>
            </div>
            <div className="mern-text">M E R N</div>
          </div>
        );
      case 'python':
        return (
          <div className="course-icon python-icon">
            <div className="python-logo">🐍</div>
          </div>
        );
      case 'android':
        return (
          <div className="course-icon android-icon">
            <div className="android-logo">📱</div>
          </div>
        );
      case 'ai':
        return (
          <div className="course-icon ai-icon">
            <div className="ai-logo">🎓</div>
          </div>
        );
      default:
        return (
          <div className="course-icon default-icon">
            <div className="default-logo">📚</div>
          </div>
        );
    }
  };

  return (
    <div className="course-card">
      {renderIcon(getCourseIcon(course.course_name))}
      <div className="course-info">
        <h3 className="course-title">{course.course_name || 'Course'}</h3>
        <p className="course-date">
          Starts on: {formatDate(course.start_date) || 'TBA'}
        </p>
        <button className="view-more-btn" onClick={onViewMore}>
          View More
        </button>
      </div>
    </div>
  );
};

export default CourseCard;

