import React from 'react';
import { Shield, Phone, ArrowLeft, CheckCircle, AlertTriangle, FileText, HelpCircle } from 'lucide-react';
import SupportedBrands from './SupportedBrands.jsx';
import './index.css';

const TermsOfService = () => {
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
      <main style={{ maxWidth: '900px', margin: '40px auto', padding: '0 5% 60px 5%' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="reviews-badge">Legal Documentation</span>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '16px', color: '#ffffff' }}>Terms of Service</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
            Please read these terms carefully before accessing our technical support services.
          </p>
        </div>

        <div style={{ background: 'var(--bg-navy-card)', borderRadius: '12px', border: '1px solid var(--border-light)', padding: '36px', boxShadow: 'var(--shadow-premium)', lineHeight: '1.7' }}>
          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.4rem', color: 'var(--primary-cyan)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FileText size={20} />
              1. Acceptance of Terms
            </h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              By accessing TechSupport Pro's website, using our online diagnostic tools, or engaging our technicians via phone or remote assistance, you agree to be bound by these Terms of Service. If you do not agree with any provision of these terms, please discontinue use of our services immediately.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.4rem', color: 'var(--primary-cyan)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <AlertTriangle size={20} />
              2. Independent Service Provider Status
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '12px' }}>
              <strong>TechSupport Pro is an independent third-party IT technical support and computer/peripheral troubleshooting resource.</strong> We are not directly affiliated, associated, authorized, endorsed by, or in any way officially connected with hardware or software manufacturers (such as HP, Canon, Epson, Brother, Dell, Microsoft, or Apple) unless explicitly stated.
            </p>
            <p style={{ color: 'var(--text-secondary)' }}>
              Services offered by TechSupport Pro may also be available for free or under warranty directly from the brand manufacturer. By utilizing our paid independent consultations or remote setups, you acknowledge that you have chosen our independent technical expertise for immediate, comprehensive assistance.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.4rem', color: 'var(--primary-cyan)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CheckCircle size={20} />
              3. Scope of Support Services
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '12px' }}>
              Our support scope includes remote network peripheral setup, printer driver installation, Wi-Fi connectivity diagnostics, computer performance optimization, and general IT troubleshooting.
            </p>
            <ul style={{ listStyle: 'none', paddingLeft: '0', color: 'var(--text-secondary)' }}>
              <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <CheckCircle size={16} color="var(--accent-green)" style={{ marginTop: '4px', flexShrink: 0 }} />
                <span><strong>User Responsibilities:</strong> You must have administrative access to your device, a stable high-speed internet connection, and proper licensing for any software installed.</span>
              </li>
              <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <CheckCircle size={16} color="var(--accent-green)" style={{ marginTop: '4px', flexShrink: 0 }} />
                <span><strong>Data Backup:</strong> Prior to initiating any system repair or driver reconfiguration, you are solely responsible for backing up all personal data, documents, and system images.</span>
              </li>
            </ul>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.4rem', color: 'var(--primary-cyan)', marginBottom: '12px' }}>
              4. Billing, Fees & Refund Guarantee
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '12px' }}>
              TechSupport Pro provides upfront pricing before initiating paid remote support sessions. We strive for 100% customer satisfaction:
            </p>
            <p style={{ color: 'var(--text-secondary)' }}>
              If our technicians are unable to resolve or diagnose your reported technical issue during the initial consultation session, you are eligible for a full refund under our satisfaction guarantee. Refund requests must be submitted within 30 days of service completion.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.4rem', color: 'var(--primary-cyan)', marginBottom: '12px' }}>
              5. Limitation of Liability
            </h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              To the fullest extent permitted by applicable law, TechSupport Pro shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or business interruption, arising out of or related to our remote troubleshooting services, even if advised of the possibility of such damages.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.4rem', color: 'var(--primary-cyan)', marginBottom: '12px' }}>
              6. Governing Law & Contact
            </h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              These Terms of Service shall be governed by the laws of the jurisdiction in which our corporate office operates, without regard to conflict of law principles. For questions regarding these terms, please contact <strong>support@techsupportpro.com</strong> or call <strong>+1 (888) 908-1218</strong>.
            </p>
          </section>
        </div>
      </main>

      <SupportedBrands />

      {/* Footer */}
      <footer className="site-footer" style={{ marginTop: 'auto' }}>
        <div className="footer-nav-links">
          <a href="/privacy" className="footer-nav-link">Privacy Policy</a>
          <span>|</span>
          <a href="/terms" className="footer-nav-link" style={{ color: 'white' }}>Terms of Service</a>
          <span>|</span>
          <a href="/disclaimer" className="footer-nav-link">Disclaimer</a>
          <span>|</span>
          <a href="/contact" className="footer-nav-link">Contact Us</a>
        </div>
        <p className="footer-copy">
          &copy; {new Date().getFullYear()} TechSupport Pro. We are an independent technical resource providing generic configuration overviews. All product names, logos, and brands are property of their respective owners.
        </p>
      </footer>
    </div>
  );
};

export default TermsOfService;
