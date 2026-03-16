import React, { useState } from 'react';
import DashboardSection from '../components/coadmin/DashboardSection';
import ProjectsSection  from '../components/coadmin/ProjectsSection';
import AnalyticsSection from '../components/coadmin/AnalyticsSection';

export default function CoAdmin() {
  const [tab, setTab] = useState('dashboard');
  const TABS = [
    { id:'dashboard', label:'Dashboard' },
    { id:'projects',  label:'Projects'  },
    { id:'analytics', label:'Analytics' },
  ];

  return (
    <div style={{ padding:'22px 24px 0' }}>

      {/* Title + Tabs row — Figma exact */}
      <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:22 }}>
        <div style={{ fontSize:20, fontWeight:800, color:'var(--text)', letterSpacing:'-.5px', flexShrink:0 }}>
          DashBoard
        </div>

        {/* Box around tabs like Figma */}
        <div style={{
          display:'flex', gap:2,
          background:'var(--bg2)',
          borderRadius:8, padding:3,
          border:'1px solid var(--border)'
        }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              padding:'5px 14px',
              fontSize:12.5,
              fontWeight: tab===t.id ? 700 : 500,
              color: tab===t.id ? '#3b82f6' : '#94a3b8',
              cursor:'pointer',
              fontFamily:'var(--font)',
              border:'none',
              borderRadius:6,
              background: tab===t.id ? 'var(--card)' : 'transparent',
              boxShadow: tab===t.id ? '0 1px 4px rgba(0,0,0,.08)' : 'none',
              transition:'all .2s',
            }}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div key={tab} style={{ animation:'fadeUp .2s ease both' }}>
        {tab==='dashboard' && <DashboardSection />}
        {tab==='projects'  && <ProjectsSection  />}
        {tab==='analytics' && <AnalyticsSection />}
      </div>
    </div>
  );
}