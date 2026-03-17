import React, { useState, useEffect } from 'react';
import DashboardSection from '../components/coadmin/DashboardSection';
import ProjectsSection  from '../components/coadmin/ProjectsSection';
import AnalyticsSection from '../components/coadmin/AnalyticsSection';

export default function CoAdmin() {
  const [tab, setTab] = useState('dashboard');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  const TABS = [
    { id:'dashboard', label:'Dashboard' },
    { id:'projects',  label:'Projects'  },
    { id:'analytics', label:'Analytics' },
  ];

  const tabButtons = (
    <div style={{
      display:'inline-flex',
      gap:2,
      background:'var(--bg2)',
      borderRadius:8,
      padding:3,
      border:'1px solid var(--border)',
    }}>
      {TABS.map(t => (
        <button
          key={t.id}
          onClick={() => setTab(t.id)}
          style={{
            padding: isMobile ? '5px 10px' : '6px 16px',
            fontSize: isMobile ? 11.5 : 13,
            fontWeight: tab===t.id ? 700 : 500,
            color: tab===t.id ? '#3b82f6' : '#94a3b8',
            cursor:'pointer',
            fontFamily:'var(--font)',
            border:'none',
            borderRadius:6,
            background: tab===t.id ? 'var(--card)' : 'transparent',
            boxShadow: tab===t.id ? '0 1px 4px rgba(0,0,0,.08)' : 'none',
            transition:'all .2s',
            whiteSpace:'nowrap',
            flexShrink:0,
          }}
        >
          {t.label}
        </button>
      ))}
    </div>
  );

  return (
    <div style={{ padding:'22px 24px 0' }}>

      {isMobile ? (
        /* Mobile: title on top, tabs below full width */
        <div style={{ marginBottom:20 }}>
          <div style={{ fontSize:18, fontWeight:800, color:'var(--text)', marginBottom:12 }}>
            DashBoard
          </div>
          <div style={{ overflowX:'auto', WebkitOverflowScrolling:'touch' }}>
            {tabButtons}
          </div>
        </div>
      ) : (
        /* Laptop: title and tabs same row */
        <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:20 }}>
          <div style={{ fontSize:20, fontWeight:800, color:'var(--text)', flexShrink:0 }}>
            DashBoard
          </div>
          {tabButtons}
        </div>
      )}

      <div key={tab} style={{ animation:'fadeUp .2s ease both' }}>
        {tab==='dashboard' && <DashboardSection />}
        {tab==='projects'  && <ProjectsSection  />}
        {tab==='analytics' && <AnalyticsSection />}
      </div>
    </div>
  );
}