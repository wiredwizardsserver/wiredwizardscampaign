import React from 'react';
import { Shield, CheckCircle2, Cpu, Globe, Monitor, Printer, HardDrive, Wifi } from 'lucide-react';
import './index.css';

const SupportedBrands = () => {
  const brands = [
    { name: 'Google', category: 'Cloud & Workspace', icon: <Globe size={20} color="#38bdf8" /> },
    { name: 'Microsoft', category: 'Windows & Office 365', icon: <Monitor size={20} color="#60a5fa" /> },
    { name: 'HP', category: 'Printers & Desktops', icon: <Printer size={20} color="#00d2f3" /> },
    { name: 'Canon', category: 'Imaging & Peripherals', icon: <Printer size={20} color="#a855f7" /> },
    { name: 'DELL', category: 'Enterprise Hardware', icon: <Cpu size={20} color="#3b82f6" /> },
    { name: 'Brother', category: 'Office Printers', icon: <Printer size={20} color="#2dd4bf" /> },
    { name: 'Meta', category: 'Connectivity & Platforms', icon: <Wifi size={20} color="#06b6d4" /> }
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
                gap: '8px',
                boxShadow: 'var(--shadow-light)',
                transition: 'all 0.25s ease',
                cursor: 'default'
              }}
            >
              <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '10px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {brand.icon}
              </div>
              <span style={{ color: '#ffffff', fontWeight: '700', fontSize: '1.05rem', letterSpacing: '0.03em' }}>
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
