// src/pages/Documents.jsx
import React, { useState } from 'react';
import { DOCS } from '../data/mockData';

export default function Documents() {
  const [downloading, setDownloading] = useState({});

  const download = (name, i) => {
    setDownloading(p => ({ ...p, [i]: 'loading' }));
    setTimeout(() => {
      setDownloading(p => ({ ...p, [i]: 'done' }));
      setTimeout(() => setDownloading(p => ({ ...p, [i]: null })), 2500);
    }, 1200);
  };

  return (
    <div style={{ padding:'22px 24px 0' }}>
      <div className="pg-name" style={{ marginBottom:20 }}>Documents &amp; Reports</div>
      <div className="card">
        <div className="card-head">
          <div className="card-title">All Documents</div>
          <button className="card-act">+ Upload</button>
        </div>
        <div id="docList">
          {DOCS.map((d, i) => (
            <div key={i} className="doc-item">
              <div className="doc-ico-wrap" style={{ background: d.color + '18' }}>{d.icon}</div>
              <div style={{ flex:1 }}>
                <div className="doc-name">{d.name}</div>
                <div className="doc-meta">{d.size} · Updated {d.date}</div>
              </div>
              <button
                className="doc-dl"
                onClick={() => download(d.name, i)}
                style={downloading[i] === 'done' ? { background:'var(--green-l)', color:'var(--green)' } : {}}
              >
                {downloading[i] === 'loading' ? '⏳ Preparing...' : downloading[i] === 'done' ? '✅ Downloaded!' : '⬇ Download'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}