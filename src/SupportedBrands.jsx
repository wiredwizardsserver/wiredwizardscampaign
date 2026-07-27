import React from 'react';
import { Shield, CheckCircle2 } from 'lucide-react';
import './index.css';

// Custom SVG Brand Logos for High-Fidelity Professional Look
const GoogleLogo = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
  </svg>
);

const MicrosoftLogo = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="10.5" height="10.5" fill="#F25022"/>
    <rect x="12.5" y="1" width="10.5" height="10.5" fill="#7FBA00"/>
    <rect x="1" y="12.5" width="10.5" height="10.5" fill="#00A4EF"/>
    <rect x="12.5" y="12.5" width="10.5" height="10.5" fill="#FFB900"/>
  </svg>
);

const HPLogo = () => (
  <svg width="28" height="28" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="18" stroke="#0096D6" strokeWidth="3" fill="rgba(0, 150, 214, 0.1)"/>
    <path d="M13.5 13L10.5 27H13.5L14.7 21.5H18C20.5 21.5 22 20 22.5 17.5C23 15 21.8 13.5 19.5 13.5H13.5V13ZM15.3 18.8L16.2 15.8H18.5C19.8 15.8 20.3 16.5 20 17.5C19.7 18.5 19 18.8 17.8 18.8H15.3Z" fill="#0096D6"/>
    <path d="M22 13L19 27H22L23.2 21.5H26.5C29 21.5 30.5 20 31 17.5C31.5 15 30.3 13.5 28 13.5H22V13ZM23.8 18.8L24.7 15.8H27C28.3 15.8 28.8 16.5 28.5 17.5C28.2 18.5 27.5 18.8 26.3 18.8H23.8Z" fill="#0096D6"/>
  </svg>
);

const CanonLogo = () => (
  <svg width="56" height="22" viewBox="0 0 100 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="0" y="22" fill="#CC0000" fontFamily="serif" fontWeight="900" fontSize="26" letterSpacing="2">Canon</text>
  </svg>
);

const DellLogo = () => (
  <svg width="28" height="28" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="18" stroke="#007DB8" strokeWidth="2.5" fill="rgba(0, 125, 184, 0.1)"/>
    <text x="6" y="24" fill="#007DB8" fontFamily="sans-serif" fontWeight="900" fontSize="11" letterSpacing="0.5">D</text>
    <g transform="rotate(-20 19 20)">
      <text x="13.5" y="24" fill="#007DB8" fontFamily="sans-serif" fontWeight="900" fontSize="11">E</text>
    </g>
    <text x="21" y="24" fill="#007DB8" fontFamily="sans-serif" fontWeight="900" fontSize="11">L</text>
    <text x="27.5" y="24" fill="#007DB8" fontFamily="sans-serif" fontWeight="900" fontSize="11">L</text>
  </svg>
);

const BrotherLogo = () => (
  <svg width="58" height="22" viewBox="0 0 100 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="0" y="21" fill="#004B87" fontFamily="sans-serif" fontWeight="900" fontSize="20" letterSpacing="1">brother</text>
  </svg>
);

const MetaLogo = () => (
  <svg width="30" height="24" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M33.15 4.38C30.56 2.38 27.65 2 24.87 2c-3.1 0-6.17 1.05-8.87 3.53C13.3 3.05 10.23 2 7.13 2 4.35 2 1.44 2.38-1.15 4.38-3.32 6.06-4.5 8.78-4.5 11.75c0 3.1 1.25 5.92 3.5 7.62 2.6 1.98 5.51 2.38 8.29 2.38 3.1 0 6.17-1.05 8.87-3.53 2.7 2.48 5.77 3.53 8.87 3.53 2.78 0 5.69-.4 8.29-2.38 2.25-1.7 3.5-4.52 3.5-7.62 0-2.97-1.18-5.69-3.35-7.37zM7.37 17.8c-2.35 0-4.73-.35-6.68-1.85-1.52-1.18-2.37-2.95-2.37-5.02 0-2.02.83-3.77 2.33-4.95 1.98-1.55 4.38-1.9 6.72-1.9 2.42 0 4.88.8 7.08 2.87l1.55 1.47-1.55 1.47c-2.2 2.07-4.66 2.87-7.08 2.87zm24.64-1.85c-1.95 1.5-4.33 1.85-6.68 1.85-2.42 0-4.88-.8-7.08-2.87l-1.55-1.47 1.55-1.47c2.2-2.07 4.66-2.87 7.08-2.87 2.35 0 4.75.35 6.72 1.9 1.5 1.18 2.33 2.93 2.33 4.95 0 2.07-.85 3.84-2.37 5.02z" fill="url(#metaGradient)" transform="translate(4, 0) scale(0.8)"/>
    <defs>
      <linearGradient id="metaGradient" x1="0" y1="0" x2="36" y2="24" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#0064E0" />
        <stop offset="100%" stopColor="#0081FB" />
      </linearGradient>
    </defs>
  </svg>
);

const SupportedBrands = () => {
  const brands = [
    { name: 'Google', category: 'Cloud & Workspace', logo: <GoogleLogo /> },
    { name: 'Microsoft', category: 'Windows & Office 365', logo: <MicrosoftLogo /> },
    { name: 'HP', category: 'Printers & Desktops', logo: <HPLogo /> },
    { name: 'Canon', category: 'Imaging & Peripherals', logo: <CanonLogo /> },
    { name: 'DELL', category: 'Enterprise Hardware', logo: <DellLogo /> },
    { name: 'Brother', category: 'Office Printers', logo: <BrotherLogo /> },
    { name: 'Meta', category: 'Connectivity & Platforms', logo: <MetaLogo /> }
  ];

  return (
    <section className="supported-brands-section" style={{
      padding: '50px 5%',
      backgroundColor: '#010712',
      borderTop: '1px solid var(--border-light)',
      borderBottom: '1px solid var(--border-light)',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Glow Effect */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '150px',
        background: 'radial-gradient(circle, rgba(0, 210, 243, 0.06) 0%, rgba(0,0,0,0) 70%)',
        pointerEvents: 'none'
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(0, 210, 243, 0.1)', color: 'var(--primary-cyan)', padding: '6px 14px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '14px' }}>
          <Shield size={14} />
          <span>Independent Technical Expertise</span>
        </div>

        <h3 style={{ fontSize: '1.6rem', color: '#ffffff', marginBottom: '8px', fontWeight: '700', fontFamily: 'var(--font-heading)' }}>
          Comprehensive Remote Support For Leading Ecosystems
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '650px', margin: '0 auto 32px auto' }}>
          Our certified IT technicians provide independent diagnostics, driver setup, and network troubleshooting across all major software and hardware platforms.
        </p>

        {/* Brands Grid / Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '16px',
          alignItems: 'stretch',
          justifyContent: 'center'
        }}>
          {brands.map((brand, index) => (
            <div 
              key={index} 
              className="hover-scale"
              style={{
                background: 'linear-gradient(135deg, var(--bg-navy-card) 0%, rgba(9, 30, 61, 0.6) 100%)',
                border: '1px solid var(--border-light)',
                borderRadius: '10px',
                padding: '18px 12px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                boxShadow: 'var(--shadow-light)',
                transition: 'all 0.25s ease',
                cursor: 'default'
              }}
            >
              <div style={{ 
                background: 'rgba(255, 255, 255, 0.95)', 
                padding: '8px 14px', 
                borderRadius: '8px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                minWidth: '80px',
                height: '44px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
              }}>
                {brand.logo}
              </div>
              <span style={{ color: '#ffffff', fontWeight: '700', fontSize: '1.05rem', letterSpacing: '0.03em', marginTop: '2px' }}>
                {brand.name}
              </span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: '500' }}>
                {brand.category}
              </span>
            </div>
          ))}
        </div>

        {/* Subtle Trust Notice */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '24px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
          <CheckCircle2 size={14} color="var(--accent-green)" />
          <span>Independent third-party troubleshooting. All brand names & logos are property of their respective trademark holders.</span>
        </div>
      </div>
    </section>
  );
};

export default SupportedBrands;
