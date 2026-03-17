import React, { useState } from 'react';

const ACTIVITY = [
  { text:'Complaint #1101 has been resolved',         time:'2 hours ago' },
  { text:'New notice posted: Final Exam Schedule',    time:'5 hours ago' },
  { text:'Admin replied to ticket #1019',             time:'1 day ago'   },
  { text:'New member added to Engineering team',      time:'2 days ago'  },
  { text:'System maintenance completed successfully', time:'3 days ago'  },
  { text:'Budget report Q3 has been approved',        time:'4 days ago'  },
];

const INIT_NOTICES = [
  { id:1, tag:'GENERAL',  title:'New Member recruited in the Team',    date:'2023-05-07', tagC:'#3b82f6', tagBg:'#eff6ff', icon:'📄', iconBg:'#fee2e2', body:'A new member has joined our Engineering team. Please welcome them and help them onboard.' },
  { id:2, tag:'ACADEMIC', title:'Final Exam Schedule Update',           date:'2023-12-13', tagC:'#a855f7', tagBg:'#faf5ff', icon:'📄', iconBg:'#ede9fe', body:'The final examination schedule has been updated. Please check the academic portal for your timetable.' },
  { id:3, tag:'GENERAL',  title:'Holiday Announcement: Winter Break',   date:'2023-12-10', tagC:'#3b82f6', tagBg:'#eff6ff', icon:'📄', iconBg:'#dbeafe', body:'The office will be closed from Dec 25 to Jan 1 for the Winter Break. Happy Holidays!' },
  { id:4, tag:'TECHNICAL',title:'System Maintenance Schedule',          date:'2023-12-02', tagC:'#f59e0b', tagBg:'#fffbeb', icon:'📄', iconBg:'#fef3c7', body:'Scheduled maintenance on Saturday from 2:00 AM - 6:00 AM. All services will be unavailable.' },
  { id:5, tag:'HR',       title:'Q1 Performance Reviews Start',         date:'2023-11-28', tagC:'#22c55e', tagBg:'#f0fdf4', icon:'📄', iconBg:'#dcfce7', body:'Q1 performance reviews will begin on March 1. Please prepare your self-assessment.' },
  { id:6, tag:'GENERAL',  title:'Office Relocation Notice',             date:'2023-11-20', tagC:'#3b82f6', tagBg:'#eff6ff', icon:'📄', iconBg:'#fee2e2', body:'Our office will be relocating to the new building on 5th Avenue starting January 15.' },
];

export default function Notices() {
  const [notices,     setNotices]     = useState(INIT_NOTICES);
  const [search,      setSearch]      = useState('');
  const [showActivity,setShowActivity]= useState(true);
  const [showAllAct,  setShowAllAct]  = useState(false);
  const [showModal,   setShowModal]   = useState(false);
  const [viewNotice,  setViewNotice]  = useState(null);
  const [form,        setForm]        = useState({ title:'', tag:'GENERAL', body:'' });
  const [toast,       setToast]       = useState('');

  const toast_ = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const filtered = notices.filter(n =>
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    n.tag.toLowerCase().includes(search.toLowerCase())
  );

  // ── Download ──
  const downloadNotice = (notice) => {
    const content = `NOTICE\n======\nTitle: ${notice.title}\nDate: ${notice.date}\nCategory: ${notice.tag}\n\n${notice.body}`;
    const blob = new Blob([content], { type:'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = notice.title.replace(/\s+/g,'_') + '.txt';
    a.click();
    URL.revokeObjectURL(url);
    toast_('✅ Downloaded: ' + notice.title);
  };

  // ── Add Notice ──
  const addNotice = () => {
    if (!form.title.trim()) { toast_('Please enter title'); return; }
    const today = new Date().toISOString().split('T')[0];
    const tagColors = { GENERAL:{ tagC:'#3b82f6', tagBg:'#eff6ff' }, ACADEMIC:{ tagC:'#a855f7', tagBg:'#faf5ff' }, TECHNICAL:{ tagC:'#f59e0b', tagBg:'#fffbeb' }, HR:{ tagC:'#22c55e', tagBg:'#f0fdf4' } };
    const tc = tagColors[form.tag] || tagColors.GENERAL;
    setNotices(prev => [{ id:Date.now(), tag:form.tag, title:form.title, date:today, ...tc, icon:'📄', iconBg:'#fee2e2', body:form.body || 'No details provided.' }, ...prev]);
    setShowModal(false);
    setForm({ title:'', tag:'GENERAL', body:'' });
    toast_('✅ Notice posted!');
  };

  const activityToShow = showAllAct ? ACTIVITY : ACTIVITY.slice(0, 3);

  return (
    <div style={{ padding:'22px 24px 40px', overflowX:'hidden', maxWidth:'100%' }}>

      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:24 }}>
        <div className="pg-name">Notice Board Management</div>
        <div style={{ display:'flex', gap:10 }}>
          <button style={{ padding:'8px 14px', borderRadius:9, border:'1px solid var(--border)', background:'var(--bg)', fontSize:12.5, color:'var(--text2)', cursor:'pointer', display:'flex', alignItems:'center', gap:5 }}>⚙ Filter</button>
          <div style={{ position:'relative' }}>
            <span style={{ position:'absolute', left:10, top:'50%', transform:'translateY(-50%)', fontSize:13, color:'var(--muted)' }}>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search"
              style={{ padding:'8px 14px 8px 32px', borderRadius:9, border:'1px solid var(--border)', background:'var(--bg)', fontSize:12.5, color:'var(--text)', outline:'none', width:200 }} />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card mb">
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom: showActivity ? 14 : 0 }}>
          <div style={{ fontSize:15, fontWeight:800, color:'var(--text)' }}>Recent Activity</div>
          <div style={{ display:'flex', gap:10, alignItems:'center' }}>
            {/* ── View All button ── */}
            <button
              onClick={() => { setShowAllAct(s => !s); if(!showActivity) setShowActivity(true); }}
              style={{ padding:'6px 16px', borderRadius:8, background:'var(--red-l)', color:'var(--red)', border:'none', fontSize:12, fontWeight:600, cursor:'pointer', transition:'all .2s' }}
            >
              {showAllAct ? 'Show Less' : 'View All'}
            </button>
            <button onClick={() => setShowActivity(s => !s)}
              style={{ background:'none', border:'none', cursor:'pointer', fontSize:18, color:'var(--muted)', transform: showActivity?'rotate(180deg)':'rotate(0)', transition:'transform .2s' }}>⌄</button>
          </div>
        </div>
        {showActivity && (
          <div style={{ border:'1px solid var(--border)', borderRadius:10, overflow:'hidden' }}>
            {activityToShow.map((a,i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'13px 16px', borderBottom: i<activityToShow.length-1?'1px solid var(--border)':'none', background:i===0?'var(--hover)':'transparent', transition:'background .15s' }}>
                <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                  <div style={{ width:8, height:8, borderRadius:'50%', background:'#22c55e', flexShrink:0 }} />
                  <span style={{ fontSize:13, color:'var(--text)' }}>{a.text}</span>
                </div>
                <span style={{ fontSize:11.5, color:'var(--muted)', whiteSpace:'nowrap', marginLeft:20 }}>{a.time}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Latest Updates */}
      <div style={{ fontSize:16, fontWeight:800, color:'var(--text)', marginBottom:14 }}>Latest Updates</div>
      <div className="card" style={{ padding:0, overflow:'hidden', overflowX:'auto' }}>
        <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13, minWidth:480 }}>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={5} style={{ padding:'40px', textAlign:'center', color:'var(--muted)' }}>No notices found</td></tr>
            ) : filtered.map((n,i) => (
              <tr key={i} style={{ borderBottom:'1px solid var(--border)', transition:'background .15s' }}>
                <td style={{ padding:'16px 20px', width:50 }}>
                  <div style={{ width:36, height:36, borderRadius:8, background:n.iconBg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:17 }}>{n.icon}</div>
                </td>
                <td style={{ padding:'16px 10px', width:110 }}>
                  <span style={{ padding:'3px 10px', borderRadius:6, background:n.tagBg, color:n.tagC, fontSize:11, fontWeight:700 }}>{n.tag}</span>
                </td>
                <td style={{ padding:'16px 10px', fontWeight:600, color:'var(--text)' }}>{n.title}</td>
                <td style={{ padding:'16px 10px', color:'var(--muted)', fontSize:12.5, whiteSpace:'nowrap' }}>
                  <span style={{ fontSize:13, marginRight:5 }}>📅</span>{n.date}
                </td>
                <td style={{ padding:'16px 20px' }}>
                  <div style={{ display:'flex', gap:8 }}>
                    {/* ── View button ── */}
                    <button
                      onClick={() => setViewNotice(n)}
                      style={{ display:'flex', alignItems:'center', gap:5, padding:'6px 14px', borderRadius:8, border:'1px solid var(--border)', background:'var(--bg)', fontSize:12, fontWeight:600, color:'var(--text2)', cursor:'pointer', transition:'all .2s' }}
                    >👁 View</button>
                    {/* ── Download button ── */}
                    <button
                      onClick={() => downloadNotice(n)}
                      style={{ display:'flex', alignItems:'center', gap:5, padding:'6px 14px', borderRadius:8, border:'1px solid var(--border)', background:'var(--bg)', fontSize:12, fontWeight:600, color:'var(--text2)', cursor:'pointer', transition:'all .2s' }}
                    >⬇ Download</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* New Notice FAB */}
      <button onClick={() => setShowModal(true)} style={{ position:'fixed', bottom:24, right:90, padding:'13px 22px', borderRadius:30, background:'#3b82f6', color:'#fff', border:'none', fontSize:13.5, fontWeight:700, cursor:'pointer', boxShadow:'0 4px 20px rgba(59,130,246,.5)', display:'flex', alignItems:'center', gap:8, zIndex:100 }}>
        + New Notice
      </button>

      {/* ── View Notice Modal ── */}
      {viewNotice && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.5)', zIndex:2000, display:'flex', alignItems:'center', justifyContent:'center', padding:20, backdropFilter:'blur(4px)' }}
          onClick={e => e.target===e.currentTarget && setViewNotice(null)}>
          <div style={{ background:'var(--card)', borderRadius:18, width:'100%', maxWidth:520, border:'1px solid var(--border)', boxShadow:'var(--shadow-lg)' }}>
            <div style={{ display:'flex', justifyContent:'space-between', padding:'20px 24px', borderBottom:'1px solid var(--border)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                <span style={{ padding:'3px 10px', borderRadius:6, background:viewNotice.tagBg, color:viewNotice.tagC, fontSize:11, fontWeight:700 }}>{viewNotice.tag}</span>
                <div style={{ fontSize:15, fontWeight:800, color:'var(--text)' }}>{viewNotice.title}</div>
              </div>
              <button onClick={() => setViewNotice(null)} style={{ background:'none', border:'none', fontSize:20, cursor:'pointer', color:'var(--muted)' }}>✕</button>
            </div>
            <div style={{ padding:'20px 24px' }}>
              <div style={{ fontSize:12, color:'var(--muted)', marginBottom:14 }}>📅 {viewNotice.date}</div>
              <div style={{ fontSize:13.5, color:'var(--text)', lineHeight:1.8, background:'var(--bg)', padding:16, borderRadius:10, border:'1px solid var(--border)' }}>
                {viewNotice.body}
              </div>
            </div>
            <div style={{ display:'flex', gap:12, padding:'16px 24px', borderTop:'1px solid var(--border)' }}>
              <button onClick={() => { downloadNotice(viewNotice); setViewNotice(null); }} className="save-btn" style={{ flex:1 }}>⬇ Download</button>
              <button onClick={() => setViewNotice(null)} className="card-act" style={{ flex:1, padding:11 }}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Add Notice Modal ── */}
      {showModal && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.5)', zIndex:2000, display:'flex', alignItems:'center', justifyContent:'center', padding:20, backdropFilter:'blur(4px)' }}
          onClick={e => e.target===e.currentTarget && setShowModal(false)}>
          <div style={{ background:'var(--card)', borderRadius:18, width:'100%', maxWidth:480, border:'1px solid var(--border)', boxShadow:'var(--shadow-lg)' }}>
            <div style={{ display:'flex', justifyContent:'space-between', padding:'20px 24px', borderBottom:'1px solid var(--border)' }}>
              <div style={{ fontSize:16, fontWeight:800 }}>🔔 New Notice</div>
              <button onClick={() => setShowModal(false)} style={{ background:'none', border:'none', fontSize:20, cursor:'pointer', color:'var(--muted)' }}>✕</button>
            </div>
            <div style={{ padding:'20px 24px', display:'flex', flexDirection:'column', gap:14 }}>
              <div className="form-grp"><label className="form-lbl">Title *</label><input className="form-inp" placeholder="Notice title" value={form.title} onChange={e => setForm({...form, title:e.target.value})} /></div>
              <div className="form-grp"><label className="form-lbl">Category</label>
                <select className="form-inp" value={form.tag} onChange={e => setForm({...form, tag:e.target.value})}>
                  <option>GENERAL</option><option>ACADEMIC</option><option>TECHNICAL</option><option>HR</option>
                </select>
              </div>
              <div className="form-grp"><label className="form-lbl">Content</label>
                <textarea className="form-inp" rows="3" placeholder="Notice details..." value={form.body} onChange={e => setForm({...form, body:e.target.value})} style={{ resize:'vertical' }} />
              </div>
            </div>
            <div style={{ display:'flex', gap:12, padding:'16px 24px', borderTop:'1px solid var(--border)' }}>
              <button onClick={() => setShowModal(false)} className="card-act" style={{ flex:1, padding:11 }}>Cancel</button>
              <button onClick={addNotice} className="save-btn" style={{ flex:2 }}>Post Notice</button>
            </div>
          </div>
        </div>
      )}

      {toast && <div style={{ position:'fixed', bottom:24, left:'50%', transform:'translateX(-50%)', background:'#22c55e', color:'#fff', padding:'12px 24px', borderRadius:10, fontWeight:600, fontSize:13, zIndex:9999 }}>{toast}</div>}
    </div>
  );
}