import React, { useState } from 'react';

const INIT_COMPLAINTS = [
  { id:'#1023', subject:'SLOW WIFI IN LIBRARY',     category:'Network',     date:'18 NOV 2024', status:'Open',        sc:'#ef4444', sbg:'#fff5f5' },
  { id:'#1019', subject:'CANNOT ACCESS PORTAL',     category:'Login',       date:'16 NOV 2024', status:'In Progress', sc:'#f59e0b', sbg:'#fffbeb' },
  { id:'#1011', subject:'ID CARD MALFUNCTION',      category:'Access',      date:'12 NOV 2024', status:'Resolved',    sc:'#22c55e', sbg:'#f0fdf4' },
  { id:'#1005', subject:'AC LEAKING IN ROOM 302',   category:'Facilities',  date:'01 NOV 2024', status:'Resolved',    sc:'#22c55e', sbg:'#f0fdf4' },
  { id:'#1042', subject:'PORTAL ACCESS ATTEMPT',    category:'IT Security', date:'21 OCT 2024', status:'Open',        sc:'#ef4444', sbg:'#fff5f5' },
  { id:'#1016', subject:'CCTV NOT WORKING',         category:'Security',    date:'14 SEPT 2024',status:'Resolved',    sc:'#22c55e', sbg:'#f0fdf4' },
  { id:'#1008', subject:'PRINTER NOT RESPONDING',   category:'IT Support',  date:'08 SEPT 2024',status:'In Progress', sc:'#f59e0b', sbg:'#fffbeb' },
  { id:'#1003', subject:'BROKEN CHAIR IN LAB',      category:'Facilities',  date:'02 SEPT 2024',status:'Resolved',    sc:'#22c55e', sbg:'#f0fdf4' },
];

export default function Complaints() {
  const [complaints, setComplaints] = useState(() => {
    try { const s = localStorage.getItem('coadmin_complaints_v2'); return s ? JSON.parse(s) : INIT_COMPLAINTS; }
    catch { return INIT_COMPLAINTS; }
  });
  const [search,    setSearch]    = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form,      setForm]      = useState({ subject:'', category:'', priority:'Medium' });
  const [toast,     setToast]     = useState('');

  const save  = (data) => { try { localStorage.setItem('coadmin_complaints_v2', JSON.stringify(data)); } catch{} };
  const toast_ = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const filtered = complaints.filter(c =>
    c.subject.toLowerCase().includes(search.toLowerCase()) ||
    c.category.toLowerCase().includes(search.toLowerCase())
  );

  const submit = () => {
    if (!form.subject.trim()) { toast_('Please enter subject'); return; }
    const newId = '#' + (1000 + complaints.length + 1);
    const today = new Date().toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' }).toUpperCase();
    const newC = { id:newId, subject:form.subject.toUpperCase(), category:form.category||'General', date:today, status:'Open', sc:'#ef4444', sbg:'#fff5f5' };
    const updated = [newC, ...complaints];
    setComplaints(updated); save(updated);
    setShowModal(false);
    setForm({ subject:'', category:'', priority:'Medium' });
    toast_('✅ Complaint submitted!');
  };

  const updateStatus = (i, status) => {
    const colors = { Open:{ sc:'#ef4444', sbg:'#fff5f5' }, 'In Progress':{ sc:'#f59e0b', sbg:'#fffbeb' }, Resolved:{ sc:'#22c55e', sbg:'#f0fdf4' }, Closed:{ sc:'#94a3b8', sbg:'#f8fafc' } };
    const updated = complaints.map((c,j) => j===i ? { ...c, status, ...colors[status] } : c);
    setComplaints(updated); save(updated);
    toast_('Status updated!');
  };

  return (
    <div style={{ padding:'22px 24px 40px', overflowX:'hidden', maxWidth:'100%' }}>

      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:24, flexWrap:'wrap', gap:10 }}>
        <div className="pg-name">Complaints Management</div>
        <div style={{ display:'flex', gap:10 }}>
          <button style={{ display:'flex', alignItems:'center', gap:6, padding:'8px 16px', borderRadius:9, border:'1px solid var(--border)', background:'var(--bg)', fontSize:12.5, fontWeight:600, color:'var(--text2)', cursor:'pointer' }}>
            ⚙ Filter
          </button>
          <div style={{ position:'relative' }}>
            <span style={{ position:'absolute', left:10, top:'50%', transform:'translateY(-50%)', fontSize:13, color:'var(--muted)' }}>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search"
              style={{ padding:'8px 14px 8px 32px', borderRadius:9, border:'1px solid var(--border)', background:'var(--bg)', fontSize:12.5, color:'var(--text)', outline:'none', width:200 }} />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card" style={{ padding:0, overflow:'hidden', overflowX:'auto' }}>
        <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
          <thead>
            <tr style={{ background:'var(--bg)' }}>
              {['COMPLAINT ID','SUBJECT / CATEGORY','DATE','STATUS','ACTIONS'].map((h,i) => (
                <th key={i} style={{ padding:'14px 20px', textAlign: i===4?'center':'left', fontSize:11.5, fontWeight:700, color:'var(--muted)', letterSpacing:'.6px', borderBottom:'1px solid var(--border)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((c,i) => (
              <tr key={i} style={{ borderBottom:'1px solid var(--border)', transition:'background .15s' }}>
                <td style={{ padding:'16px 20px', fontWeight:700, color:'var(--text2)', fontSize:13 }}>{c.id}</td>
                <td style={{ padding:'16px 20px' }}>
                  <div style={{ fontWeight:700, color:'var(--text)', marginBottom:3 }}>{c.subject}</div>
                  <div style={{ fontSize:11.5, color:'var(--muted)' }}>{c.category}</div>
                </td>
                <td style={{ padding:'16px 20px', color:'var(--text2)', fontSize:12.5 }}>{c.date}</td>
                <td style={{ padding:'16px 20px' }}>
                  <span style={{
                    display:'inline-flex', alignItems:'center', gap:6,
                    padding:'5px 12px', borderRadius:20,
                    background:c.sbg, color:c.sc,
                    fontSize:12, fontWeight:700
                  }}>
                    {c.status === 'Resolved' ? '✅' : c.status === 'In Progress' ? '⏳' : '🔴'}
                    {c.status}
                  </span>
                </td>
                <td style={{ padding:'16px 20px', textAlign:'center' }}>
                  <button
                    onClick={() => {
                      const next = { Open:'In Progress', 'In Progress':'Resolved', Resolved:'Closed', Closed:'Open' }[c.status];
                      updateStatus(i, next);
                    }}
                    style={{ background:'none', border:'none', cursor:'pointer', fontSize:18, color:'var(--muted)', transition:'color .2s' }}
                    title="Click to update status"
                  >👁</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* New Complaint FAB */}
      <button
        onClick={() => setShowModal(true)}
        style={{
          position:'fixed', bottom:24, right:90,
          padding:'13px 22px', borderRadius:30,
          background:'#3b82f6', color:'#fff',
          border:'none', fontSize:13.5, fontWeight:700,
          cursor:'pointer', boxShadow:'0 4px 20px rgba(59,130,246,.5)',
          display:'flex', alignItems:'center', gap:8,
          transition:'all .2s', zIndex:100
        }}
      >+ New Complaint</button>

      {/* Modal */}
      {showModal && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.5)', zIndex:2000, display:'flex', alignItems:'center', justifyContent:'center', padding:20, backdropFilter:'blur(4px)' }}
          onClick={e => e.target===e.currentTarget && setShowModal(false)}>
          <div style={{ background:'var(--card)', borderRadius:18, width:'100%', maxWidth:480, border:'1px solid var(--border)', boxShadow:'var(--shadow-lg)', animation:'scaleIn .2s ease both' }}>
            <div style={{ display:'flex', justifyContent:'space-between', padding:'20px 24px', borderBottom:'1px solid var(--border)' }}>
              <div style={{ fontSize:16, fontWeight:800, color:'var(--text)' }}>📢 New Complaint</div>
              <button onClick={() => setShowModal(false)} style={{ background:'none', border:'none', fontSize:20, cursor:'pointer', color:'var(--muted)' }}>✕</button>
            </div>
            <div style={{ padding:'20px 24px', display:'flex', flexDirection:'column', gap:14 }}>
              <div className="form-grp">
                <label className="form-lbl">Subject *</label>
                <input className="form-inp" placeholder="Brief description of issue" value={form.subject} onChange={e => setForm({...form, subject:e.target.value})} />
              </div>
              <div className="form-grp">
                <label className="form-lbl">Category</label>
                <select className="form-inp" value={form.category} onChange={e => setForm({...form, category:e.target.value})}>
                  <option value="">Select category</option>
                  <option>Network</option><option>Login</option><option>Access</option>
                  <option>Facilities</option><option>IT Security</option><option>IT Support</option>
                </select>
              </div>
              <div className="form-grp">
                <label className="form-lbl">Priority</label>
                <div style={{ display:'flex', gap:8 }}>
                  {['Low','Medium','High','Critical'].map(p => (
                    <button key={p} onClick={() => setForm({...form, priority:p})} style={{ flex:1, padding:'8px', borderRadius:8, border: form.priority===p?'2px solid #3b82f6':'1px solid var(--border)', background: form.priority===p?'var(--active)':'var(--bg)', color: form.priority===p?'#3b82f6':'var(--text2)', fontSize:12, fontWeight:600, cursor:'pointer' }}>{p}</button>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ display:'flex', gap:12, padding:'16px 24px', borderTop:'1px solid var(--border)' }}>
              <button onClick={() => setShowModal(false)} className="card-act" style={{ flex:1, padding:11, fontSize:13 }}>Cancel</button>
              <button onClick={submit} className="save-btn" style={{ flex:2 }}>Submit Complaint</button>
            </div>
          </div>
        </div>
      )}

      {toast && <div style={{ position:'fixed', bottom:24, left:'50%', transform:'translateX(-50%)', background:'#22c55e', color:'#fff', padding:'12px 24px', borderRadius:10, fontWeight:600, fontSize:13, zIndex:9999 }}>{toast}</div>}
    </div>
  );
}