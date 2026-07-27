import React from 'react';
import { Shield, Phone, ArrowLeft, AlertTriangle, Info, CheckCircle, HelpCircle } from 'lucide-react';
import SupportedBrands from './SupportedBrands.jsx';
import './index.css';

const Disclaimer = () => {
  return (
    <div className="layout-container" style={{ backgroundColor: 'var(--bg-deep)', minHeight: '100vh', color: 'var(--text-primary)' }}>
      {/* Top Bar */}
      <div className="top-bar">
        <div className="top-bar-info">
          Expert IT consultations & Support - Available 24/7
        </div>
        <div className="top-bar-actions">
          <a href="tel:+18555344116" className="phone-outline-btn">
            <Phone size={14} />
            <span>+1 (855) 534-4116</span>
          </a>
        </div>
      </div>

      <header style={{ padding: '12px 5%', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--bg-navy-dark)' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-cyan)', fontWeight: '600', fontSize: '0.95rem' }}>
          <ArrowLeft size={18} />
          <span>Back to Home</span>
        </a>
        <a href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img src="/logo.png" alt="Wired Wizards LLC Logo" style={{ height: '75px', objectFit: 'contain' }} />
        </a>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '900px', margin: '40px auto', padding: '0 5% 60px 5%' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="reviews-badge">Important Notice</span>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '16px', color: '#ffffff' }}>Legal & Technical Disclaimer</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
            Transparency regarding our independent IT service status and third-party trademarks.
          </p>
        </div>

        <div style={{ background: 'var(--bg-navy-card)', borderRadius: '12px', border: '1px solid var(--border-light)', padding: '36px', boxShadow: 'var(--shadow-premium)', lineHeight: '1.7' }}>
          
          {/* High visibility callout box */}
          <div style={{ backgroundColor: 'rgba(251, 191, 36, 0.12)', borderLeft: '4px solid var(--accent-gold)', padding: '20px', borderRadius: '8px', marginBottom: '32px' }}>
            <h3 style={{ color: 'var(--accent-gold)', fontSize: '1.2rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertTriangle size={22} />
              Independent Service Provider Notice
            </h3>
            <p style={{ color: '#ffffff', fontSize: '0.95rem', margin: 0, lineHeight: '1.6' }}>
              <strong>Wired Wizards is an independent technical support resource and service provider.</strong> We are not directly affiliated, associated, authorized, endorsed by, or in any way officially connected with any third-party hardware or software manufacturers (such as HP, Canon, Epson, Brother, Dell, Microsoft, Apple, or Cisco) unless explicitly specified in writing.
            </p>
          </div>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.4rem', color: 'var(--primary-cyan)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Info size={20} />
              1. Trademark & Brand Ownership
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '12px' }}>
              All product names, logos, trademarks, service marks, and brands mentioned on this website are the property of their respective owners. The use of any third-party names, trademarks, or brand identifiers on our web pages, diagnostic guides, or search tools is for descriptive and identification purposes only and does not imply any official endorsement, sponsorship, or partnership with the trademark holder.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.4rem', color: 'var(--primary-cyan)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CheckCircle size={20} />
              2. Manufacturer Warranty & Free Services
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '12px' }}>
              We wish to inform all visitors and prospective clients that technical support, driver downloads, device documentation, and warranty services may be available free of charge directly from the original manufacturer's official website or customer support channels.
            </p>
            <p style={{ color: 'var(--text-secondary)' }}>
              By choosing Wired Wizards, you elect to hire independent IT professionals for immediate on-demand assistance, customized remote troubleshooting, and multi-device network configuration without waiting for manufacturer queue times.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.4rem', color: 'var(--primary-cyan)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              3. Generic Configuration Overviews
            </h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              The printer setup steps, Wi-Fi connectivity articles, and troubleshooting overviews provided in our search portal and knowledge base are intended as general technical guidance. While our technicians strive to keep all diagnostic guides accurate and current, specific hardware models and operating system updates may alter installation steps. Wired Wizards assumes no liability for errors or omissions in generic informational guides.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.4rem', color: 'var(--primary-cyan)', marginBottom: '12px' }}>
              4. Questions or Verification
            </h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              If you have questions concerning our independent status or wish to speak with an IT coordinator before proceeding with a service consultation, please contact our support team at <strong>+1 (855) 534-4116</strong> or email <strong>wiredwizards.server@gmail.com</strong>.
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
          <a href="/terms" className="footer-nav-link">Terms of Service</a>
          <span>|</span>
          <a href="/disclaimer" className="footer-nav-link" style={{ color: 'white' }}>Disclaimer</a>
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

export default Disclaimer;
