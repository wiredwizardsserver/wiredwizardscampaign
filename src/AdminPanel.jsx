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
  const [tickets, setTickets] = useState([]);
  const [loadingTickets, setLoadingTickets] = useState(true);
  const [activeTab, setActiveTab] = useState('tickets');

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

  const fetchTickets = async () => {
    if (!token) return;
    try {
      const res = await fetch(`${API_URL}/api/tickets`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setTickets(data);
      }
    } catch (err) {
      console.error('Error fetching tickets:', err);
    } finally {
      setLoadingTickets(false);
    }
  };

  useEffect(() => {
    fetchReviews();
    if (token) {
      fetchTickets();
    }
  }, [token]);

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

  const handleDeleteTicket = async (id) => {
    if (!window.confirm('Are you sure you want to delete this support request?')) return;
    try {
      const res = await fetch(`${API_URL}/api/tickets/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        fetchTickets();
      } else if (res.status === 401 || res.status === 403) {
        alert('Session expired. Please log in again.');
        handleLogout();
      } else {
        alert('Failed to delete ticket');
      }
    } catch (err) {
      console.error('Error deleting ticket:', err);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`${API_URL}/api/tickets/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        fetchTickets();
      }
    } catch (err) {
      console.error('Error updating status:', err);
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
          <h1>Wired Wizards Admin Dashboard</h1>
          <span className="secure-badge">🔒 Protected</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button onClick={handleLogout} className="logout-btn">
            <LogOut size={16} /> Logout
          </button>
          <a href="/" className="back-link">← Back to Site</a>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="admin-tabs">
        <button 
          className={`tab-btn ${activeTab === 'tickets' ? 'active' : ''}`}
          onClick={() => setActiveTab('tickets')}
        >
          <span>📩 Support Requests (Tickets)</span>
          {tickets.length > 0 && <span style={{ background: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '12px', fontSize: '0.8rem' }}>{tickets.length}</span>}
        </button>
        <button 
          className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          <span>⭐ Manage Reviews</span>
        </button>
      </div>

      {activeTab === 'tickets' ? (
        <div className="admin-card">
          <h2>Submitted Technical Support Requests</h2>
          {loadingTickets ? (
            <p>Loading support tickets...</p>
          ) : (
            <div className="admin-list" style={{ maxHeight: '700px' }}>
              {tickets.length === 0 ? (
                <p style={{ color: 'var(--text-secondary)' }}>No support requests found.</p>
              ) : (
                tickets.map(ticket => (
                  <div key={ticket._id} className="admin-list-item" style={{ flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'flex-start' }}>
                      <div>
                        <strong style={{ fontSize: '1.15rem', color: '#ffffff' }}>{ticket.name}</strong>
                        <span className={`ticket-status status-${ticket.status ? ticket.status.replace(/\s+/g, '-') : 'Pending'}`}>
                          {ticket.status || 'Pending'}
                        </span>
                        <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '4px' }}>
                          📧 <a href={`mailto:${ticket.email}`} style={{ color: '#38bdf8', textDecoration: 'none', marginRight: '14px' }}>{ticket.email}</a>
                          📞 <a href={`tel:${ticket.phone}`} style={{ color: '#38bdf8', textDecoration: 'none' }}>{ticket.phone}</a>
                        </div>
                      </div>
                      <button onClick={() => handleDeleteTicket(ticket._id)} className="delete-btn" aria-label="Delete ticket">
                        <Trash2 size={18} />
                      </button>
                    </div>
                    
                    <div style={{ background: '#0f172a', padding: '12px', borderRadius: '8px', width: '100%', border: '1px solid #1e293b' }}>
                      <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '4px' }}>
                        <strong>Device Model:</strong> {ticket.deviceModel || 'Not specified'}
                      </div>
                      <p style={{ color: '#e2e8f0', margin: 0, fontSize: '0.95rem', lineHeight: '1.5' }}>
                        "{ticket.message}"
                      </p>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Update Status:</span>
                      <select 
                        value={ticket.status || 'Pending'} 
                        onChange={(e) => handleStatusChange(ticket._id, e.target.value)}
                        className="status-select"
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                      <span style={{ fontSize: '0.75rem', color: '#64748b', marginLeft: 'auto' }}>
                        Received: {new Date(ticket.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default AdminPanel;
