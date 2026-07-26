import React, { useState, useEffect } from 'react';
import { Trash2, Plus, LogOut, Lock, User } from 'lucide-react';
import './AdminPanel.css';

const AdminPanel = () => {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const [token, setToken] = useState(localStorage.getItem('adminToken') || null);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    initials: '',
    name: '',
    location: '',
    service: '',
    text: '',
    rating: 5
  });

  const fetchReviews = async () => {
    try {
      const res = await fetch(`${API_URL}/api/reviews`);
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      console.error('Error fetching reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Login handlers
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({ ...prev, [name]: value }));
    setLoginError('');
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm)
      });
      const data = await res.json();
      if (res.ok && data.token) {
        setToken(data.token);
        localStorage.setItem('adminToken', data.token);
        setLoginForm({ username: '', password: '' });
      } else {
        setLoginError(data.message || 'Login failed');
      }
    } catch (err) {
      setLoginError('Server error. Could not connect.');
    }
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('adminToken');
  };

  // Form handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setFormData({ initials: '', name: '', location: '', service: '', text: '', rating: 5 });
        fetchReviews(); // Refresh the list
      } else if (res.status === 401 || res.status === 403) {
        alert('Session expired. Please log in again.');
        handleLogout();
      } else {
        const errData = await res.json();
        alert(errData.message || 'Failed to add review');
      }
    } catch (err) {
      console.error('Error adding review:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;
    try {
      const res = await fetch(`${API_URL}/api/reviews/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        fetchReviews();
      } else if (res.status === 401 || res.status === 403) {
        alert('Session expired. Please log in again.');
        handleLogout();
      } else {
        alert('Failed to delete review');
      }
    } catch (err) {
      console.error('Error deleting review:', err);
    }
  };

  // If not logged in, render Login Screen
  if (!token) {
    return (
      <div className="admin-container login-wrapper">
        <div className="login-box">
          <div className="login-header">
            <Lock size={32} className="login-icon" />
            <h1>Admin Login</h1>
            <p>Enter your secure credentials to manage reviews</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="login-form">
            {loginError && <div className="login-error-alert">{loginError}</div>}
            
            <div className="form-group">
              <label><User size={14} style={{ display: 'inline', marginRight: '6px' }} /> Username</label>
              <input 
                type="text" 
                name="username" 
                value={loginForm.username} 
                onChange={handleLoginChange} 
                placeholder="Enter admin username" 
                required 
              />
            </div>
            
            <div className="form-group">
              <label><Lock size={14} style={{ display: 'inline', marginRight: '6px' }} /> Password</label>
              <input 
                type="password" 
                name="password" 
                value={loginForm.password} 
                onChange={handleLoginChange} 
                placeholder="Enter admin password" 
                required 
              />
            </div>

            <button type="submit" className="admin-submit-btn">
              Sign In to Admin Panel
            </button>

            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <a href="/" className="back-link">← Return to Website</a>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Logged in Dashboard View
  return (
    <div className="admin-container">
      <div className="admin-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <h1>Review Management Dashboard</h1>
          <span className="secure-badge">🔒 JWT Secured</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button onClick={handleLogout} className="logout-btn">
            <LogOut size={16} /> Logout
          </button>
          <a href="/" className="back-link">← Back to Site</a>
        </div>
      </div>

      <div className="admin-grid">
        {/* Left Column: Form */}
        <div className="admin-card">
          <h2>Add New Review</h2>
          <form onSubmit={handleSubmit} className="admin-form">
            <div className="form-group">
              <label>Initials (e.g. JD)</label>
              <input type="text" name="initials" value={formData.initials} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Location</label>
              <input type="text" name="location" value={formData.location} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Service Provided</label>
              <input type="text" name="service" value={formData.service} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Rating (1-5)</label>
              <input type="number" name="rating" min="1" max="5" value={formData.rating} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Review Text</label>
              <textarea name="text" rows="4" value={formData.text} onChange={handleInputChange} required></textarea>
            </div>
            <button type="submit" className="admin-submit-btn">
              <Plus size={16} /> Add Review
            </button>
          </form>
        </div>

        {/* Right Column: List */}
        <div className="admin-card">
          <h2>Manage Existing Reviews</h2>
          {loading ? (
            <p>Loading reviews...</p>
          ) : (
            <div className="admin-list">
              {reviews.length === 0 ? (
                <p>No reviews found.</p>
              ) : (
                reviews.map(review => (
                  <div key={review._id} className="admin-list-item">
                    <div className="review-info">
                      <strong>{review.name}</strong> - {review.location}
                      <p className="review-service">Service: {review.service}</p>
                      <p className="review-text-preview">"{review.text}"</p>
                    </div>
                    <button onClick={() => handleDelete(review._id)} className="delete-btn" aria-label="Delete review">
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
