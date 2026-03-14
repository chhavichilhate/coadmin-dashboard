import React, { useState } from 'react';
import DashboardSection from '../components/coadmin/DashboardSection';
import ProjectsSection from '../components/coadmin/ProjectsSection';
import AnalyticsSection from '../components/coadmin/AnalyticsSection';

const TABS = [
  { id:'dashboard', label:'Dashboard' },
  { id:'projects',  label:'Projects'  },
  { id:'analytics', label:'Analytics' },
];

export default function CoAdmin() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div style={{ padding:'22px 24px 0' }}>

      {/* Title + Tabs — SIDE BY SIDE, same row, no space-between */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,              /* gap between "Dashboard" text and tab pills */
        marginBottom: 22,
        flexWrap: 'wrap',
      }}>
        {/* Title */}
        <div style={{
          fontSize: 22,
          fontWeight: 800,
          color: 'var(--text)',
          letterSpacing: '-.5px',
          flexShrink: 0,
        }}>
          Dashboard
        </div>

        {/* Pill Tabs — directly beside the title */}
        <div className="tab-nav">
          {TABS.map(tab => (
            <button
              key={tab.id}
              className={'tab-btn' + (activeTab === tab.id ? ' active' : '')}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Active Section with fade animation */}
      <div className="tab-anim" key={activeTab}>
        {activeTab === 'dashboard' && <DashboardSection />}
        {activeTab === 'projects'  && <ProjectsSection />}
        {activeTab === 'analytics' && <AnalyticsSection />}
      </div>

    </div>
  );
}