import { useState } from 'react';
import { adminAPI } from '../../services/api';
import './ChangePassword.css';

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const response = await adminAPI.changePassword(
        formData.newPassword,
        formData.confirmPassword
      );

      if (response.data.status === 'success') {
        setSuccess('Password changed successfully');
        setFormData({ newPassword: '', confirmPassword: '' });
      } else {
        setError(response.data.error || 'Failed to change password');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Error changing password');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="change-password-container">
      <h1 className="page-title">Change Password</h1>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <form onSubmit={handleSubmit} className="password-form">
        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            required
            placeholder="Enter new password"
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            placeholder="Confirm new password"
          />
        </div>

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Changing Password...' : 'Change Password'}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;

