import React, { useState } from 'react';

const ALL_DOCS = [
  { name:'Q4_Financial_Report',   type:'PDF', version:'v3.2', modified:'2023-07-25', status:'Final',   sc:'#22c55e', sbg:'#f0fdf4', icon:'📄', iconBg:'#fee2e2', shared:true,  recent:true  },
  { name:'Project_Alpha_budget',  type:'XLS', version:'v1.5', modified:'2023-12-13', status:'Draft',   sc:'#f59e0b', sbg:'#fffbeb', icon:'📊', iconBg:'#ede9fe', shared:false, recent:true  },
  { name:'Board_meeting_minutes', type:'DOC', version:'v2.1', modified:'2023-12-10', status:'Revised', sc:'#3b82f6', sbg:'#eff6ff', icon:'📝', iconBg:'#dbeafe', shared:true,  recent:true  },
  { name:'Safety_protocol_2025',  type:'PDF', version:'v1.0', modified:'2023-12-08', status:'Final',   sc:'#22c55e', sbg:'#f0fdf4', icon:'📄', iconBg:'#fee2e2', shared:false, recent:false },
  { name:'Marketing_Asset_Q1',    type:'ZIP', version:'v1.0', modified:'2023-12-05', status:'Final',   sc:'#22c55e', sbg:'#f0fdf4', icon:'🗜️', iconBg:'#fef3c7', shared:true,  recent:false },
  { name:'HR_Policy_Update_2024', type:'DOC', version:'v2.3', modified:'2023-11-28', status:'Draft',   sc:'#f59e0b', sbg:'#fffbeb', icon:'📝', iconBg:'#dbeafe', shared:false, recent:false },
  { name:'Sprint_20_Planning',    type:'PDF', version:'v1.1', modified:'2023-11-20', status:'Final',   sc:'#22c55e', sbg:'#f0fdf4', icon:'📄', iconBg:'#fee2e2', shared:false, recent:false, archived:true },
  { name:'Old_Budget_2022',       type:'XLS', version:'v4.0', modified:'2022-06-10', status:'Final',   sc:'#94a3b8', sbg:'#f8fafc', icon:'📊', iconBg:'#ede9fe', shared:false, recent:false, archived:true },
];

const TABS = ['All Files','Recent','Shared with me','Archived'];

export default function Documents() {
  const [docs,      setDocs]      = useState(ALL_DOCS);
  const [activeTab, setActiveTab] = useState('All Files');
  const [search,    setSearch]    = useState('');
  const [editDoc,   setEditDoc]   = useState(null);
  const [editForm,  setEditForm]  = useState({});
  const [showModal, setShowModal] = useState(false);
  const [form,      setForm]      = useState({ name:'', type:'PDF', version:'v1.0' });
  const [toast,     setToast]     = useState('');

  const toast_ = (msg, type='success') => { setToast({ msg, type }); setTimeout(() => setToast(''), 3000); };

  // ── Tab Filter ──
  const tabFiltered = docs.filter(d => {
    if (activeTab === 'Recent')       return d.recent;
    if (activeTab === 'Shared with me') return d.shared;
    if (activeTab === 'Archived')     return d.archived;
    return !d.archived;
  });

  const filtered = tabFiltered.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  // ── Export All ──
  const exportAll = () => {
    const data = filtered.map(d => `${d.name} | ${d.type} | ${d.version} | ${d.modified} | ${d.status}`).join('\n');
    const blob = new Blob([data], { type:'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'documents_export.txt'; a.click();
    URL.revokeObjectURL(url);
    toast_('✅ Exported ' + filtered.length + ' documents!');
  };

  // ── Edit ──
  const openEdit = (doc, i) => { setEditDoc(i); setEditForm({ ...doc }); };

  const saveEdit = () => {
    setDocs(prev => prev.map((d, i) => i === editDoc ? { ...d, ...editForm } : d));
    setEditDoc(null);
    toast_('✅ Document updated!');
  };

  // ── Add New ──
  const addDoc = () => {
    if (!form.name.trim()) { toast_('Please enter document name', 'error'); return; }
    const today = new Date().toISOString().split('T')[0];
    setDocs(prev => [{ name:form.name, type:form.type, version:form.version, modified:today, status:'Draft', sc:'#f59e0b', sbg:'#fffbeb', icon:'📄', iconBg:'#fee2e2', shared:false, recent:true, archived:false }, ...prev]);
    setShowModal(false);
    setForm({ name:'', type:'PDF', version:'v1.0' });
    toast_('✅ Document added!');
  };

  return (
    <div style={{ padding:'22px 24px 40px', overflowX:'hidden', maxWidth:'100%' }}>

      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20 }}>
        <div className="pg-name">Documents and Report</div>
        <button onClick={exportAll} style={{ display:'flex', alignItems:'center', gap:7, padding:'9px 18px', borderRadius:9, border:'1px solid var(--border)', background:'var(--bg)', fontSize:13, fontWeight:600, color:'var(--text2)', cursor:'pointer', transition:'all .2s' }}>
          ⬇ Export All
        </button>
      </div>

      {/* Tabs + Search */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20, flexWrap:'wrap', gap:12 }}>
        <div style={{ display:'flex', gap:4, overflowX:'auto', flexWrap:'nowrap', WebkitOverflowScrolling:'touch', scrollbarWidth:'none' }}>
          {TABS.map(t => (
            <button key={t} onClick={() => setActiveTab(t)} style={{
              padding:'8px 18px', borderRadius:9,
              border: activeTab===t ? '2px solid var(--blue)' : '1px solid var(--border)',
              background: activeTab===t ? 'var(--active)' : 'var(--bg)',
              color: activeTab===t ? 'var(--blue)' : 'var(--text2)',
              fontSize:13, fontWeight:600, cursor:'pointer', transition:'all .2s'
            }}>{t}</button>
          ))}
        </div>
        <div style={{ display:'flex', gap:10 }}>
          <button style={{ padding:'8px 14px', borderRadius:9, border:'1px solid var(--border)', background:'var(--bg)', fontSize:12.5, color:'var(--text2)', cursor:'pointer' }}>⚙ Filter</button>
          <div style={{ position:'relative' }}>
            <span style={{ position:'absolute', left:10, top:'50%', transform:'translateY(-50%)', fontSize:13, color:'var(--muted)' }}>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search"
              style={{ padding:'8px 14px 8px 32px', borderRadius:9, border:'1px solid var(--border)', background:'var(--bg)', fontSize:12.5, color:'var(--text)', outline:'none', width:200 }} />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card" style={{ padding:0, overflow:'hidden', overflowX:'auto' }}>
        <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13, minWidth:520 }}>
          <thead>
            <tr style={{ background:'var(--bg)' }}>
              {['Name','Type','Version','Last Modified','Status',''].map((h,i) => (
                <th key={i} style={{ padding:'14px 20px', textAlign:'left', fontSize:11.5, fontWeight:700, color:'var(--muted)', letterSpacing:'.5px', borderBottom:'1px solid var(--border)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={6} style={{ padding:'40px', textAlign:'center', color:'var(--muted)' }}>No documents found in "{activeTab}"</td></tr>
            ) : filtered.map((d,i) => (
              <tr key={i} style={{ borderBottom:'1px solid var(--border)', transition:'background .15s' }}>
                <td style={{ padding:'16px 20px' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                    <div style={{ width:36, height:36, borderRadius:8, background:d.iconBg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:17, flexShrink:0 }}>{d.icon}</div>
                    <span style={{ fontWeight:600, color:'var(--text)' }}>{d.name}</span>
                  </div>
                </td>
                <td style={{ padding:'16px 20px', color:'var(--text2)', fontWeight:600 }}>{d.type}</td>
                <td style={{ padding:'16px 20px', color:'var(--text2)' }}>{d.version}</td>
                <td style={{ padding:'16px 20px', color:'var(--text2)' }}>{d.modified}</td>
                <td style={{ padding:'16px 20px' }}>
                  <span style={{ padding:'4px 14px', borderRadius:20, background:d.sbg, color:d.sc, fontSize:12, fontWeight:700 }}>{d.status}</span>
                </td>
                <td style={{ padding:'16px 20px' }}>
                  <button
                    onClick={() => openEdit(docs.indexOf(d), docs.indexOf(d))}
                    style={{ background:'none', border:'none', cursor:'pointer', fontSize:13, fontWeight:700, color:'var(--blue)', padding:'4px 8px', borderRadius:6, transition:'background .2s' }}
                    onMouseEnter={e => e.target.style.background='var(--blue-l)'}
                    onMouseLeave={e => e.target.style.background='none'}
                  >Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* New Report FAB */}
      <button onClick={() => setShowModal(true)} style={{ position:'fixed', bottom:24, right:90, padding:'13px 22px', borderRadius:30, background:'#3b82f6', color:'#fff', border:'none', fontSize:13.5, fontWeight:700, cursor:'pointer', boxShadow:'0 4px 20px rgba(59,130,246,.5)', display:'flex', alignItems:'center', gap:8, zIndex:100 }}>
        + New Report
      </button>

      {/* ── Edit Modal ── */}
      {editDoc !== null && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.5)', zIndex:2000, display:'flex', alignItems:'center', justifyContent:'center', padding:20, backdropFilter:'blur(4px)' }}
          onClick={e => e.target===e.currentTarget && setEditDoc(null)}>
          <div style={{ background:'var(--card)', borderRadius:18, width:'100%', maxWidth:440, border:'1px solid var(--border)', boxShadow:'var(--shadow-lg)' }}>
            <div style={{ display:'flex', justifyContent:'space-between', padding:'20px 24px', borderBottom:'1px solid var(--border)' }}>
              <div style={{ fontSize:16, fontWeight:800 }}>✏️ Edit Document</div>
              <button onClick={() => setEditDoc(null)} style={{ background:'none', border:'none', fontSize:20, cursor:'pointer', color:'var(--muted)' }}>✕</button>
            </div>
            <div style={{ padding:'20px 24px', display:'flex', flexDirection:'column', gap:14 }}>
              <div className="form-grp">
                <label className="form-lbl">Document Name</label>
                <input className="form-inp" value={editForm.name || ''} onChange={e => setEditForm({...editForm, name:e.target.value})} />
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                <div className="form-grp">
                  <label className="form-lbl">Version</label>
                  <input className="form-inp" value={editForm.version || ''} onChange={e => setEditForm({...editForm, version:e.target.value})} />
                </div>
                <div className="form-grp">
                  <label className="form-lbl">Status</label>
                  <select className="form-inp" value={editForm.status || 'Draft'} onChange={e => {
                    const colors = { Final:{ sc:'#22c55e', sbg:'#f0fdf4' }, Draft:{ sc:'#f59e0b', sbg:'#fffbeb' }, Revised:{ sc:'#3b82f6', sbg:'#eff6ff' } };
                    setEditForm({...editForm, status:e.target.value, ...colors[e.target.value]});
                  }}>
                    <option>Final</option><option>Draft</option><option>Revised</option>
                  </select>
                </div>
              </div>
            </div>
            <div style={{ display:'flex', gap:12, padding:'16px 24px', borderTop:'1px solid var(--border)' }}>
              <button onClick={() => setEditDoc(null)} className="card-act" style={{ flex:1, padding:11 }}>Cancel</button>
              <button onClick={saveEdit} className="save-btn" style={{ flex:2 }}>Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Add New Modal ── */}
      {showModal && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.5)', zIndex:2000, display:'flex', alignItems:'center', justifyContent:'center', padding:20, backdropFilter:'blur(4px)' }}
          onClick={e => e.target===e.currentTarget && setShowModal(false)}>
          <div style={{ background:'var(--card)', borderRadius:18, width:'100%', maxWidth:440, border:'1px solid var(--border)', boxShadow:'var(--shadow-lg)' }}>
            <div style={{ display:'flex', justifyContent:'space-between', padding:'20px 24px', borderBottom:'1px solid var(--border)' }}>
              <div style={{ fontSize:16, fontWeight:800 }}>📄 New Document</div>
              <button onClick={() => setShowModal(false)} style={{ background:'none', border:'none', fontSize:20, cursor:'pointer', color:'var(--muted)' }}>✕</button>
            </div>
            <div style={{ padding:'20px 24px', display:'flex', flexDirection:'column', gap:14 }}>
              <div className="form-grp"><label className="form-lbl">Document Name *</label><input className="form-inp" placeholder="eg: Q4_Report" value={form.name} onChange={e => setForm({...form, name:e.target.value})} /></div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                <div className="form-grp"><label className="form-lbl">Type</label>
                  <select className="form-inp" value={form.type} onChange={e => setForm({...form, type:e.target.value})}>
                    <option>PDF</option><option>DOC</option><option>XLS</option><option>ZIP</option><option>PPT</option>
                  </select>
                </div>
                <div className="form-grp"><label className="form-lbl">Version</label>
                  <input className="form-inp" placeholder="v1.0" value={form.version} onChange={e => setForm({...form, version:e.target.value})} />
                </div>
              </div>
            </div>
            <div style={{ display:'flex', gap:12, padding:'16px 24px', borderTop:'1px solid var(--border)' }}>
              <button onClick={() => setShowModal(false)} className="card-act" style={{ flex:1, padding:11 }}>Cancel</button>
              <button onClick={addDoc} className="save-btn" style={{ flex:2 }}>Add Document</button>
            </div>
          </div>
        </div>
      )}

      {toast?.msg && (
        <div style={{ position:'fixed', bottom:24, left:'50%', transform:'translateX(-50%)', background: toast.type==='error'?'#ef4444':'#22c55e', color:'#fff', padding:'12px 24px', borderRadius:10, fontWeight:600, fontSize:13, zIndex:9999 }}>
          {toast.msg}
        </div>
      )}
    </div>
  );
}