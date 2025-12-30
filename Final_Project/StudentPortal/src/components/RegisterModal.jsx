import { useState } from 'react';
import { coursesAPI } from '../services/api';
import './RegisterModal.css';

const RegisterModal = ({ course, userEmail, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: userEmail || '',
    mobileNo: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await coursesAPI.registerToCourse(
        course.course_id,
        formData.email,
        formData.name,
        formData.mobileNo
      );

      if (response.data.status === 'success') {
        setSuccess(true);
        setTimeout(() => {
          onSuccess();
        }, 1500);
      } else {
        setError(response.data.error || 'Registration failed');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Error registering for course');
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

  if (success) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="success-message">
            <h2>✅ Registration Successful!</h2>
            <p>You have been registered for {course.course_name}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Register for {course.course_name}</h2>
        <div className="course-details">
          <p><strong>Description:</strong> {course.description || 'N/A'}</p>
          <p><strong>Start Date:</strong> {formatDate(course.start_date)}</p>
          <p><strong>End Date:</strong> {formatDate(course.end_date)}</p>
          <p><strong>Fees:</strong> ₹{course.fees || 'N/A'}</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="mobileNo">Mobile Number *</label>
            <input
              type="tel"
              id="mobileNo"
              name="mobileNo"
              value={formData.mobileNo}
              onChange={handleChange}
              required
              placeholder="Enter your mobile number"
              pattern="[0-9]{10}"
              maxLength="10"
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;

