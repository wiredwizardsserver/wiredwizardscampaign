import React from 'react';
import { Shield, Phone, ArrowLeft, Lock, Eye, FileText, CheckCircle } from 'lucide-react';
import SupportedBrands from './SupportedBrands.jsx';
import './index.css';

const PrivacyPolicy = () => {
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
          <span style={{ fontWeight: '700', fontSize: '1.2rem', fontFamily: 'var(--font-heading)' }}>Wired Wizards</span>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '900px', margin: '40px auto', padding: '0 5% 60px 5%' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="reviews-badge">Legal Documentation</span>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '16px', color: '#ffffff' }}>Privacy Policy</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        <div style={{ background: 'var(--bg-navy-card)', borderRadius: '12px', border: '1px solid var(--border-light)', padding: '36px', boxShadow: 'var(--shadow-premium)', lineHeight: '1.7' }}>
          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.4rem', color: 'var(--primary-cyan)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Lock size={20} />
              1. Information We Collect
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '12px' }}>
              When you engage with Wired Wizards for remote technical assistance, diagnostics, or peripheral setup, we may collect certain necessary information to deliver our services effectively:
            </p>
            <ul style={{ listStyle: 'none', paddingLeft: '0', color: 'var(--text-secondary)' }}>
              <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <CheckCircle size={16} color="var(--accent-green)" style={{ marginTop: '4px', flexShrink: 0 }} />
                <span><strong>Personal Contact Details:</strong> Name, email address, phone number, and billing details provided during service registration.</span>
              </li>
              <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <CheckCircle size={16} color="var(--accent-green)" style={{ marginTop: '4px', flexShrink: 0 }} />
                <span><strong>Technical & Device Data:</strong> Operating system version, printer/peripheral model, network configuration details, error codes, and system diagnostic logs required for troubleshooting.</span>
              </li>
              <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <CheckCircle size={16} color="var(--accent-green)" style={{ marginTop: '4px', flexShrink: 0 }} />
                <span><strong>Remote Session Logs:</strong> With your explicit authorization, temporary session identifiers and diagnostic metadata from remote assistance software.</span>
              </li>
            </ul>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.4rem', color: 'var(--primary-cyan)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Eye size={20} />
              2. How We Use Your Information
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '12px' }}>
              We utilize collected data strictly for operational, support, and diagnostic purposes:
            </p>
            <p style={{ color: 'var(--text-secondary)' }}>
              Your technical details allow our independent IT technicians to accurately diagnose hardware communication failures, driver incompatibilities, and network dropouts. Contact information is used exclusively to send appointment reminders, service completion reports, and invoicing receipts. We never sell, rent, or trade customer information to third parties.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.4rem', color: 'var(--primary-cyan)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Shield size={20} />
              3. Remote Access Security Protocol
            </h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              During live remote assistance sessions, our technicians operate under strict security guidelines. We require your active, explicit consent before initiating any screen-sharing or diagnostic tool connection. Technicians do not access personal files, financial records, or private documentation unrelated to the specific technical issue reported. All remote sessions are encrypted using industry-standard TLS protocols and terminate immediately upon disconnection.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.4rem', color: 'var(--primary-cyan)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FileText size={20} />
              4. Data Retention & Security
            </h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              We implement robust administrative, technical, and physical security controls designed to protect your personal and diagnostic data against unauthorized access or disclosure. Diagnostic logs and temporary session tokens are purged routinely. You retain the right to request deletion of your account history or support records at any time by contacting our administrative team.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.4rem', color: 'var(--primary-cyan)', marginBottom: '12px' }}>
              5. Contact Us Regarding Privacy
            </h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data handling practices, please contact our compliance department at <strong>wiredwizards.server@gmail.com</strong> or call our toll-free assistance line at <strong>+1 (888) 908-1218</strong>.
            </p>
          </section>
        </div>
      </main>

      <SupportedBrands />

      {/* Footer */}
      <footer className="site-footer" style={{ marginTop: 'auto' }}>
        <div className="footer-nav-links">
          <a href="/privacy" className="footer-nav-link" style={{ color: 'white' }}>Privacy Policy</a>
          <span>|</span>
          <a href="/terms" className="footer-nav-link">Terms of Service</a>
          <span>|</span>
          <a href="/disclaimer" className="footer-nav-link">Disclaimer</a>
          <span>|</span>
          <a href="/contact" className="footer-nav-link">Contact Us</a>
        </div>
        <p className="footer-copy">
          &copy; {new Date().getFullYear()} Wired Wizards. We are an independent technical resource providing generic configuration overviews. All product names, logos, and brands are property of their respective owners.
        </p>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
