import React, { useState } from 'react';

const LEAVE_DATA = [
  { range:'Dec 15, 2025-Dec 18, 2025', type:'Casual', reason:'Semester Exams', status:'Approved', sc:'#22c55e', sbg:'#f0fdf4' },
  { range:'Oct 01, 2025-Oct 02, 2025', type:'Sick',   reason:'High Fever',     status:'Pending',  sc:'#f59e0b', sbg:'#fffbeb' },
  { range:'Sep 15, 2025-Sep 16, 2025', type:'Casual', reason:'Family Event',   status:'Approved', sc:'#22c55e', sbg:'#f0fdf4' },
  { range:'Aug 10, 2025-Aug 11, 2025', type:'Sick',   reason:'Medical Visit',  status:'Approved', sc:'#22c55e', sbg:'#f0fdf4' },
  { range:'Jul 20, 2025-Jul 21, 2025', type:'Casual', reason:'Personal Work',  status:'Pending',  sc:'#f59e0b', sbg:'#fffbeb' },
];

export default function Attendance() {
  const [leaves,    setLeaves]    = useState(() => {
    try { const s = localStorage.getItem('coadmin_leaves_v2'); return s ? JSON.parse(s) : LEAVE_DATA; }
    catch { return LEAVE_DATA; }
  });
  const [search,    setSearch]    = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form,      setForm]      = useState({ from:'', to:'', type:'Casual', reason:'' });
  const [toast,     setToast]     = useState('');
  const [markIn,    setMarkIn]    = useState(null);
  const [markOut,   setMarkOut]   = useState(null);

  const save   = (data) => { try { localStorage.setItem('coadmin_leaves_v2', JSON.stringify(data)); } catch{} };
  const toast_ = (msg)  => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const markPresence = (type) => {
    const now = new Date().toLocaleTimeString('en-US', { hour:'2-digit', minute:'2-digit' });
    if (type === 'in')  { setMarkIn(now);  toast_('✅ Marked In at ' + now); }
    else                { setMarkOut(now); toast_('✅ Marked Out at ' + now); }
  };

  const applyLeave = () => {
    if (!form.from || !form.to || !form.reason) { toast_('Please fill all fields'); return; }
    const newLeave = { range:`${form.from}-${form.to}`, type:form.type, reason:form.reason, status:'Pending', sc:'#f59e0b', sbg:'#fffbeb' };
    const updated = [newLeave, ...leaves];
    setLeaves(updated); save(updated);
    setShowModal(false);
    setForm({ from:'', to:'', type:'Casual', reason:'' });
    toast_('✅ Leave application submitted!');
  };

  const filtered = leaves.filter(l =>
    l.reason.toLowerCase().includes(search.toLowerCase()) ||
    l.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding:'22px 24px 40px' }}>

      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:24 }}>
        <div className="pg-name">Attendance And Leave Management</div>
        <div style={{ display:'flex', gap:10 }}>
          <button style={{ padding:'8px 14px', borderRadius:9, border:'1px solid var(--border)', background:'var(--bg)', fontSize:12.5, color:'var(--text2)', cursor:'pointer', display:'flex', alignItems:'center', gap:5 }}>⚙ Filter</button>
          <div style={{ position:'relative' }}>
            <span style={{ position:'absolute', left:10, top:'50%', transform:'translateY(-50%)', fontSize:13, color:'var(--muted)' }}>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search"
              style={{ padding:'8px 14px 8px 32px', borderRadius:9, border:'1px solid var(--border)', background:'var(--bg)', fontSize:12.5, color:'var(--text)', outline:'none', width:200 }} />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:16, marginBottom:20 }}>
        {[
          { label:'Present Days', value:13, sub:'This Month', icon:'✅', iconBg:'#f0fdf4', iconC:'#22c55e' },
          { label:'Absent Days',  value:2,  sub:'This Month', icon:'❌', iconBg:'#fff5f5', iconC:'#ef4444' },
          { label:'Leave Taken',  value:4,  sub:'This Month', icon:'📅', iconBg:'#fffbeb', iconC:'#f59e0b' },
        ].map((s,i) => (
          <div key={i} className="card" style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:'var(--text)', marginBottom:6 }}>{s.label}</div>
              <div style={{ fontSize:28, fontWeight:800, color:'var(--text)', letterSpacing:'-1px', marginBottom:4 }}>{s.value}</div>
              <div style={{ fontSize:11.5, color:'var(--muted)' }}>{s.sub}</div>
            </div>
            <div style={{ width:44, height:44, borderRadius:12, background:s.iconBg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20 }}>{s.icon}</div>
          </div>
        ))}
      </div>

      {/* Mark Presence */}
      <div className="card mb">
        <div style={{ fontSize:15, fontWeight:800, color:'#ef4444', marginBottom:16 }}>Mark the Presence</div>
        <div style={{ display:'flex', gap:40, alignItems:'center' }}>
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            <div style={{ fontSize:12, color:'var(--muted)', fontWeight:600 }}>In :-</div>
            <div style={{ fontSize:16, fontWeight:700, color:'var(--text)', minWidth:80 }}>
              {markIn || '-'}
            </div>
            <button
              onClick={() => markPresence('in')}
              style={{ padding:'8px 20px', borderRadius:9, background:'#22c55e', color:'#fff', border:'none', fontSize:12.5, fontWeight:700, cursor:'pointer', transition:'all .2s' }}
            >Mark In</button>
          </div>
          <div style={{ width:1, height:60, background:'var(--border)' }} />
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            <div style={{ fontSize:12, color:'var(--muted)', fontWeight:600 }}>Out :-</div>
            <div style={{ fontSize:16, fontWeight:700, color:'var(--text)', minWidth:80 }}>
              {markOut || '-'}
            </div>
            <button
              onClick={() => markPresence('out')}
              style={{ padding:'8px 20px', borderRadius:9, background:'#ef4444', color:'#fff', border:'none', fontSize:12.5, fontWeight:700, cursor:'pointer', transition:'all .2s' }}
            >Mark Out</button>
          </div>
          {(markIn || markOut) && (
            <div style={{ marginLeft:'auto', padding:'12px 20px', background:'var(--green-l)', borderRadius:12, border:'1px solid #86efac' }}>
              <div style={{ fontSize:12, fontWeight:600, color:'var(--green)', marginBottom:4 }}>Today's Status</div>
              {markIn  && <div style={{ fontSize:11.5, color:'var(--text2)' }}>In:  {markIn}</div>}
              {markOut && <div style={{ fontSize:11.5, color:'var(--text2)' }}>Out: {markOut}</div>}
            </div>
          )}
        </div>
      </div>

      {/* Leave Table */}
      <div className="card" style={{ padding:0, overflow:'hidden' }}>
        <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
          <thead>
            <tr style={{ background:'var(--bg)' }}>
              {['DATE RANGE','TYPE','REASON','STATUS','ACTIONS'].map((h,i) => (
                <th key={i} style={{ padding:'14px 20px', textAlign:'left', fontSize:11.5, fontWeight:700, color:'var(--muted)', letterSpacing:'.5px', borderBottom:'1px solid var(--border)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((l,i) => (
              <tr key={i} style={{ borderBottom:'1px solid var(--border)', background: i===0?'rgba(59,130,246,.03)':'transparent', transition:'background .15s' }}>
                <td style={{ padding:'16px 20px', color:'var(--text)', fontWeight:600 }}>{l.range}</td>
                <td style={{ padding:'16px 20px', color:'var(--text2)' }}>{l.type}</td>
                <td style={{ padding:'16px 20px', color:'var(--text2)' }}>{l.reason}</td>
                <td style={{ padding:'16px 20px' }}>
                  <span style={{ display:'inline-flex', alignItems:'center', gap:5, padding:'5px 12px', borderRadius:20, background:l.sbg, color:l.sc, fontSize:12, fontWeight:700 }}>
                    {l.status==='Approved'?'✅':'⏳'} {l.status}
                  </span>
                </td>
                <td style={{ padding:'16px 20px' }}>
                  <button style={{ background:'none', border:'none', cursor:'pointer', fontSize:18, color:'var(--muted)' }}>👁</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Apply Leave FAB */}
      <button onClick={() => setShowModal(true)} style={{ position:'fixed', bottom:24, right:90, padding:'13px 22px', borderRadius:30, background:'#3b82f6', color:'#fff', border:'none', fontSize:13.5, fontWeight:700, cursor:'pointer', boxShadow:'0 4px 20px rgba(59,130,246,.5)', display:'flex', alignItems:'center', gap:8, zIndex:100 }}>
        Apply Leave
      </button>

      {/* Modal */}
      {showModal && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.5)', zIndex:2000, display:'flex', alignItems:'center', justifyContent:'center', padding:20, backdropFilter:'blur(4px)' }}
          onClick={e => e.target===e.currentTarget && setShowModal(false)}>
          <div style={{ background:'var(--card)', borderRadius:18, width:'100%', maxWidth:460, border:'1px solid var(--border)', boxShadow:'var(--shadow-lg)' }}>
            <div style={{ display:'flex', justifyContent:'space-between', padding:'20px 24px', borderBottom:'1px solid var(--border)' }}>
              <div style={{ fontSize:16, fontWeight:800 }}>🗓️ Apply for Leave</div>
              <button onClick={() => setShowModal(false)} style={{ background:'none', border:'none', fontSize:20, cursor:'pointer', color:'var(--muted)' }}>✕</button>
            </div>
            <div style={{ padding:'20px 24px', display:'flex', flexDirection:'column', gap:14 }}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                <div className="form-grp"><label className="form-lbl">From Date *</label><input className="form-inp" type="date" value={form.from} onChange={e => setForm({...form, from:e.target.value})} /></div>
                <div className="form-grp"><label className="form-lbl">To Date *</label><input className="form-inp" type="date" value={form.to} onChange={e => setForm({...form, to:e.target.value})} /></div>
              </div>
              <div className="form-grp"><label className="form-lbl">Leave Type</label>
                <select className="form-inp" value={form.type} onChange={e => setForm({...form, type:e.target.value})}>
                  <option>Casual</option><option>Sick</option><option>Annual</option><option>Medical</option>
                </select>
              </div>
              <div className="form-grp"><label className="form-lbl">Reason *</label>
                <textarea className="form-inp" rows="3" placeholder="Reason for leave..." value={form.reason} onChange={e => setForm({...form, reason:e.target.value})} style={{ resize:'vertical' }} />
              </div>
            </div>
            <div style={{ display:'flex', gap:12, padding:'16px 24px', borderTop:'1px solid var(--border)' }}>
              <button onClick={() => setShowModal(false)} className="card-act" style={{ flex:1, padding:11, fontSize:13 }}>Cancel</button>
              <button onClick={applyLeave} className="save-btn" style={{ flex:2 }}>Apply Leave</button>
            </div>
          </div>
        </div>
      )}

      {toast && <div style={{ position:'fixed', bottom:24, left:'50%', transform:'translateX(-50%)', background:'#22c55e', color:'#fff', padding:'12px 24px', borderRadius:10, fontWeight:600, fontSize:13, zIndex:9999 }}>{toast}</div>}
    </div>
  );
}