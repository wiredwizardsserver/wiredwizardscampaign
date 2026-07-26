import React, { useState } from 'react';
import { Shield, Phone, ArrowLeft, Mail, MapPin, Clock, Send, CheckCircle, HelpCircle } from 'lucide-react';
import './index.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    deviceModel: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Reset form after submission
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', deviceModel: '', message: '' });
    }, 500);
  };

  return (
    <div className="layout-container" style={{ backgroundColor: 'var(--bg-deep)', minHeight: '100vh', color: 'var(--text-primary)' }}>
      {/* Top Bar */}
      <div className="top-bar">
        <div className="top-bar-info">
          Expert IT consultations & Support - Available 24/7
        </div>
        <div className="top-bar-actions">
          <a href="tel:+18889081218" className="phone-outline-btn">
            <Phone size={14} />
            <span>+1 (888) 908-1218</span>
          </a>
        </div>
      </div>

      {/* Navigation Header */}
      <header style={{ padding: '20px 5%', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--bg-navy-dark)' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-cyan)', fontWeight: '600', fontSize: '0.95rem' }}>
          <ArrowLeft size={18} />
          <span>Back to Home</span>
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Shield className="tick-icon" size={20} />
          <span style={{ fontWeight: '700', fontSize: '1.2rem', fontFamily: 'var(--font-heading)' }}>TechSupport Pro</span>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 5% 60px 5%' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span className="reviews-badge">We Are Here To Help</span>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '16px', color: '#ffffff' }}>Contact Our Support Team</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
            Need immediate printer setup help, driver diagnostics, or network troubleshooting? Reach out via phone or send us a support ticket below.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
          
          {/* Left Column: Direct Contact Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ background: 'linear-gradient(135deg, var(--secondary-blue) 0%, var(--bg-navy-card) 100%)', borderRadius: '12px', border: '1px solid var(--border-cyan)', padding: '30px', boxShadow: 'var(--shadow-cyan)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                <div style={{ background: 'var(--primary-cyan)', color: 'var(--bg-deep)', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700' }}>
                  <Phone size={24} />
                </div>
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '700' }}>24/7 Live Helpline</span>
                  <h3 style={{ fontSize: '1.5rem', color: 'white', margin: 0 }}>+1 (888) 908-1218</h3>
                </div>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.95rem', marginBottom: '20px', lineHeight: '1.6' }}>
                Speak directly with an independent IT technician. No waiting in long queues—instant remote assistance for all peripheral brands.
              </p>
              <a href="tel:+18889081218" className="cta-button" style={{ display: 'flex', justifyContent: 'center', width: '100%', textDecoration: 'none' }}>
                <Phone size={18} />
                <span>Call Technician Now</span>
              </a>
            </div>

            <div style={{ background: 'var(--bg-navy-card)', borderRadius: '12px', border: '1px solid var(--border-light)', padding: '28px', boxShadow: 'var(--shadow-premium)' }}>
              <h3 style={{ fontSize: '1.2rem', color: 'white', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={20} color="var(--primary-cyan)" />
                Administrative & Email Support
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <Mail size={18} color="var(--text-muted)" style={{ marginTop: '3px' }} />
                  <div>
                    <strong style={{ color: 'white', display: 'block' }}>Email Assistance</strong>
                    <span>support@techsupportpro.com</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <Clock size={18} color="var(--text-muted)" style={{ marginTop: '3px' }} />
                  <div>
                    <strong style={{ color: 'white', display: 'block' }}>Operating Hours</strong>
                    <span>24 Hours a Day / 7 Days a Week / 365 Days a Year</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <MapPin size={18} color="var(--text-muted)" style={{ marginTop: '3px' }} />
                  <div>
                    <strong style={{ color: 'white', display: 'block' }}>Service Scope</strong>
                    <span>Nationwide Remote Assistance & Consultation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Support Form */}
          <div style={{ background: 'var(--bg-navy-card)', borderRadius: '12px', border: '1px solid var(--border-light)', padding: '32px', boxShadow: 'var(--shadow-premium)' }}>
            <h3 style={{ fontSize: '1.4rem', color: 'white', marginBottom: '8px' }}>Send a Support Ticket</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px' }}>
              Fill out your issue details below and a senior technician will review your diagnostics.
            </p>

            {submitted ? (
              <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', border: '1px solid var(--accent-green)', borderRadius: '8px', padding: '30px', textAlign: 'center' }}>
                <CheckCircle size={48} color="var(--accent-green)" style={{ margin: '0 auto 16px auto' }} />
                <h4 style={{ color: 'white', fontSize: '1.3rem', marginBottom: '8px' }}>Ticket Received!</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '20px' }}>
                  Thank you, {formData.name || 'Customer'}. We have logged your request. For immediate assistance without waiting for email reply, dial our helpline now:
                </p>
                <a href="tel:+18889081218" className="phone-outline-btn" style={{ display: 'inline-flex', justifyContent: 'center', backgroundColor: 'var(--primary-cyan)', color: 'var(--bg-deep)' }}>
                  <Phone size={16} />
                  <span>Call +1 (888) 908-1218 Now</span>
                </a>
                <button 
                  onClick={() => setSubmitted(false)}
                  style={{ display: 'block', margin: '20px auto 0 auto', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', textDecoration: 'underline', fontSize: '0.85rem' }}
                >
                  Send Another Ticket
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px' }}>Your Name *</label>
                  <input 
                    type="text" 
                    name="name" 
                    required 
                    value={formData.name} 
                    onChange={handleChange}
                    placeholder="e.g. John Doe"
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.3)', color: 'white', fontSize: '0.95rem', outline: 'none' }} 
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px' }}>Email Address *</label>
                    <input 
                      type="email" 
                      name="email" 
                      required 
                      value={formData.email} 
                      onChange={handleChange}
                      placeholder="john@example.com"
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.3)', color: 'white', fontSize: '0.95rem', outline: 'none' }} 
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px' }}>Phone Number *</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      required 
                      value={formData.phone} 
                      onChange={handleChange}
                      placeholder="(555) 000-0000"
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.3)', color: 'white', fontSize: '0.95rem', outline: 'none' }} 
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px' }}>Printer / Device Model</label>
                  <input 
                    type="text" 
                    name="deviceModel" 
                    value={formData.deviceModel} 
                    onChange={handleChange}
                    placeholder="e.g. HP DeskJet 3755 / OfficeJet Pro"
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.3)', color: 'white', fontSize: '0.95rem', outline: 'none' }} 
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px' }}>Issue Description *</label>
                  <textarea 
                    name="message" 
                    required 
                    rows={4}
                    value={formData.message} 
                    onChange={handleChange}
                    placeholder="Describe the issue (e.g. Printer offline, driver installation failing, wireless error)..."
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.3)', color: 'white', fontSize: '0.95rem', outline: 'none', resize: 'vertical' }} 
                  />
                </div>

                <button 
                  type="submit" 
                  className="cta-button"
                  style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginTop: '8px' }}
                >
                  <Send size={18} />
                  <span>Submit Technical Request</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="site-footer" style={{ marginTop: 'auto' }}>
        <div className="footer-nav-links">
          <a href="/privacy" className="footer-nav-link">Privacy Policy</a>
          <span>|</span>
          <a href="/terms" className="footer-nav-link">Terms of Service</a>
          <span>|</span>
          <a href="/disclaimer" className="footer-nav-link">Disclaimer</a>
          <span>|</span>
          <a href="/contact" className="footer-nav-link" style={{ color: 'white' }}>Contact Us</a>
        </div>
        <p className="footer-copy">
          &copy; {new Date().getFullYear()} TechSupport Pro. We are an independent technical resource providing generic configuration overviews. All product names, logos, and brands are property of their respective owners.
        </p>
      </footer>
    </div>
  );
};

export default ContactUs;
