import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminAPI } from '../../services/api';
import './AddCourse.css';

const AddCourse = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    courseName: '',
    desc: '',
    fees: '',
    startDate: '',
    endDate: '',
    videoExpireDays: ''
  });
  const [loading, setLoading] =
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await adminAPI.addCourse(
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
        setError(response.data.error || 'Failed to add course');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Error adding course');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-course-container">
      <h1 className="page-title">Add New Course</h1>
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
            placeholder="Enter course name"
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

        <div className="form-group">
          <label htmlFor="fees">Fees</label>
          <input
            type="number"
            id="fees"
            name="fees"
            value={formData.fees}
            onChange={handleChange}
            required
            placeholder="Enter course fees"
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
            placeholder="Enter number of days"
            min="1"
          />
        </div>

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Adding Course...' : 'Add Course'}
        </button>
      </form>
    </div>
  );
};

export default AddCourse;

