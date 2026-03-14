import React, { useState } from 'react';
import { NOTICES } from '../data/mockData';

export default function Notices() {
  const [read, setRead] = useState(() => {
    const s = localStorage.getItem('coadmin_read_notices');
    return s ? JSON.parse(s) : [];
  });
  const [toast, setToast] = useState('');

  const markRead = (i) => {
    const updated = read.includes(i) ? read : [...read, i];
    setRead(updated);
    localStorage.setItem('coadmin_read_notices', JSON.stringify(updated));
    setToast('Notice marked as read ✓');
    setTimeout(() => setToast(''), 3000);
  };

  return (
    <div style={{ padding:'22px 24px 0' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20 }}>
        <div className="pg-name">Notice Board</div>
        <span style={{ fontSize:12, color:'var(--muted)' }}>{NOTICES.length - read.length} unread</span>
      </div>

      <div id="noticeList">
        {NOTICES.map((n, i) => (
          <div key={i} className="card mb" style={{ borderLeft:'3px solid ' + (read.includes(i) ? 'var(--border)' : n.color), opacity: read.includes(i) ? 0.75 : 1, transition:'all .3s' }}>
            <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:12, marginBottom:10 }}>
              <div>
                <div style={{ fontSize:13.5, fontWeight: read.includes(i)?600:800, color:'var(--text)', marginBottom:4, display:'flex', alignItems:'center', gap:8 }}>
                  {!read.includes(i) && <span style={{ width:8, height:8, borderRadius:'50%', background:n.color, display:'inline-block', flexShrink:0 }} />}
                  {n.title}
                </div>
                <div style={{ fontSize:11, color:'var(--muted)' }}>📅 {n.date}</div>
              </div>
              <div style={{ display:'flex', gap:8, alignItems:'center', flexShrink:0 }}>
                <span className="pri" style={{ background:n.color+'18', color:n.color }}>{n.type}</span>
                {!read.includes(i)
                  ? <button onClick={() => markRead(i)} className="card-act" style={{ fontSize:10, whiteSpace:'nowrap' }}>✓ Mark Read</button>
                  : <span style={{ fontSize:10, color:'var(--muted)', fontWeight:600 }}>✓ Read</span>
                }
              </div>
            </div>
            <div style={{ fontSize:12.5, color:'var(--text2)', lineHeight:1.7 }}>{n.body}</div>
          </div>
        ))}
      </div>

      {toast && (
        <div style={{ position:'fixed', bottom:24, right:24, background:'#3b82f6', color:'#fff', padding:'12px 20px', borderRadius:10, fontWeight:600, fontSize:13, zIndex:9999 }}>
          {toast}
        </div>
      )}
    </div>
  );
}