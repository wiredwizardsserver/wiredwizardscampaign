import React from 'react';
import { Shield, CheckCircle2 } from 'lucide-react';
import './index.css';

const SupportedBrands = () => {
  const brands = [
    { name: 'Google', category: 'Cloud & Workspace', file: 'google.svg' },
    { name: 'Microsoft', category: 'Windows & Office 365', file: 'microsoft.svg' },
    { name: 'HP', category: 'Printers & Desktops', file: 'hp.svg' },
    { name: 'Canon', category: 'Imaging & Peripherals', file: 'canon.svg' },
    { name: 'DELL', category: 'Enterprise Hardware', file: 'dell.svg' },
    { name: 'Brother', category: 'Office Printers', file: 'brother.svg' },
    { name: 'Meta', category: 'Connectivity & Platforms', file: 'meta.svg' }
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
                padding: '10px 16px', 
                borderRadius: '8px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                minWidth: '90px',
                height: '48px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
              }}>
                <img 
                  src={`/brands/${brand.file}`} 
                  alt={`${brand.name} Official Logo`} 
                  style={{ height: '30px', maxWidth: '85px', objectFit: 'contain' }} 
                />
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
