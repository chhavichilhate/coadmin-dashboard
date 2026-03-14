import React, { useState } from 'react';
import { COMPLAINTS } from '../data/mockData';

const P_COLORS = { Low:'#22c55e', Medium:'#f59e0b', High:'#ef4444', Critical:'#7c3aed' };
const S_COLORS  = { Open:'#ef4444', 'In Progress':'#f59e0b', Resolved:'#22c55e', Closed:'#94a3b8' };

export default function Complaints() {
  const [list, setList] = useState(() => {
    const s = localStorage.getItem('coadmin_complaints');
    return s ? JSON.parse(s) : COMPLAINTS;
  });
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title:'', name:'John Doe', priority:'High', desc:'' });
  const [toast, setToast] = useState({ msg:'', type:'success' });

  const save = (data) => localStorage.setItem('coadmin_complaints', JSON.stringify(data));
  const showToast = (msg, type='success') => { setToast({ msg, type }); setTimeout(() => setToast({ msg:'', type:'success' }), 3000); };

  const updateStatus = (i, status) => {
    const updated = list.map((c, idx) => idx === i ? { ...c, status, sc: S_COLORS[status] } : c);
    setList(updated); save(updated);
    showToast('Status updated to "' + status + '"!');
  };

  const submit = () => {
    if (!form.title.trim()) { showToast('Please enter a title', 'error'); return; }
    const newId = 'CMP-' + String(list.length + 1).padStart(3, '0');
    const today = new Date().toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' });
    const newItem = { id:newId, title:form.title, submitter:form.name, date:today, priority:form.priority, status:'Open', sc:'#ef4444', pc:P_COLORS[form.priority] };
    const updated = [newItem, ...list];
    setList(updated); save(updated);
    setShowModal(false);
    setForm({ title:'', name:'John Doe', priority:'High', desc:'' });
    showToast('Complaint submitted! 📢');
  };

  return (
    <div style={{ padding:'22px 24px 0' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20 }}>
        <div className="pg-name">Complaints</div>
        <button className="card-act" onClick={() => setShowModal(true)}>+ Submit Complaint</button>
      </div>

      <div className="card">
        <div className="card-head"><div className="card-title">All Complaints</div></div>
        <div className="tbl-wrap">
          <table className="tbl">
            <thead><tr><th>ID</th><th>Title</th><th>Submitted By</th><th>Date</th><th>Priority</th><th>Status</th></tr></thead>
            <tbody>
              {list.map((c, i) => (
                <tr key={i}>
                  <td style={{ fontWeight:600, color:'var(--muted)' }}>{c.id}</td>
                  <td style={{ fontWeight:600 }}>{c.title}</td>
                  <td>{c.submitter}</td>
                  <td>{c.date}</td>
                  <td><span className="pri" style={{ background:c.pc+'18', color:c.pc }}>{c.priority}</span></td>
                  <td>
                    <select
                      value={c.status}
                      onChange={e => updateStatus(i, e.target.value)}
                      style={{ border:'1.5px solid '+c.sc+'60', borderRadius:6, padding:'3px 8px', fontSize:11, background:c.sc+'12', color:c.sc, cursor:'pointer', outline:'none', fontWeight:600 }}
                    >
                      {['Open','In Progress','Resolved','Closed'].map(s => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.5)', zIndex:2000, display:'flex', alignItems:'center', justifyContent:'center', padding:20, backdropFilter:'blur(4px)' }}
          onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div style={{ background:'var(--card)', borderRadius:16, padding:28, width:'100%', maxWidth:440, border:'1px solid var(--border)' }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:20 }}>
              <div style={{ fontSize:15, fontWeight:800 }}>📢 Submit Complaint</div>
              <button onClick={() => setShowModal(false)} style={{ background:'none', border:'none', fontSize:20, cursor:'pointer', color:'var(--muted)' }}>✕</button>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              <div className="form-grp"><label className="form-lbl">Title *</label>
                <input className="form-inp" placeholder="Brief description" value={form.title} onChange={e => setForm({...form, title:e.target.value})} /></div>
              <div className="form-grp"><label className="form-lbl">Your Name</label>
                <input className="form-inp" value={form.name} onChange={e => setForm({...form, name:e.target.value})} /></div>
              <div className="form-grp"><label className="form-lbl">Priority</label>
                <select className="form-inp" value={form.priority} onChange={e => setForm({...form, priority:e.target.value})}>
                  {['Low','Medium','High','Critical'].map(p => <option key={p}>{p}</option>)}
                </select></div>
              <div className="form-grp"><label className="form-lbl">Description</label>
                <textarea className="form-inp" rows="3" placeholder="Detailed description..." value={form.desc} onChange={e => setForm({...form, desc:e.target.value})} style={{ resize:'vertical' }} /></div>
            </div>
            <div style={{ marginTop:20, display:'flex', gap:10 }}>
              <button className="save-btn" style={{ flex:1 }} onClick={submit}>Submit</button>
              <button className="card-act" style={{ flex:1, padding:11 }} onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {toast.msg && (
        <div style={{ position:'fixed', bottom:24, right:24, background: toast.type==='error'?'#ef4444':'#22c55e', color:'#fff', padding:'12px 20px', borderRadius:10, fontWeight:600, fontSize:13, zIndex:9999 }}>
          {toast.msg}
        </div>
      )}
    </div>
  );
}