import React, { useState } from 'react';

const PROJECTS = [
  { id:1, name:'Q4 Marketing Campaign', dept:'Marketing Dept.', status:'Critical', statusC:'#ef4444', statusBg:'#fff5f5', progress:45, team:['#ef4444','#3b82f6'], dueDate:'Dec 15', done:false },
  { id:2, name:'Internal Audit System', dept:'Finance Dept.',   status:'On Hold',  statusC:'#94a3b8', statusBg:'#f8fafc', progress:100, team:['#22c55e','#f59e0b'], dueDate:'Nov 20', done:true },
  { id:3, name:'Product Redesign v2',   dept:'Design Team',     status:'Ongoing',  statusC:'#3b82f6', statusBg:'#eff6ff', progress:60,  team:['#a855f7','#3b82f6','#ef4444'], dueDate:'Dec 15', done:false, extra:2 },
  { id:4, name:'API Integration Hub',  dept:'Engineering',      status:'Ongoing',  statusC:'#3b82f6', statusBg:'#eff6ff', progress:33,  team:['#f59e0b'], dueDate:'Nov 20', done:false },
  { id:5, name:'Security Audit 2025',  dept:'IT Department',    status:'Completed',statusC:'#22c55e', statusBg:'#f0fdf4', progress:100, team:['#22c55e','#3b82f6'], dueDate:'Oct 30', done:true },
  { id:6, name:'Mobile App Redesign',  dept:'Design Team',      status:'Ongoing',  statusC:'#3b82f6', statusBg:'#eff6ff', progress:72,  team:['#ef4444','#a855f7','#3b82f6'], dueDate:'Jan 10', done:false, extra:1 },
];

export default function Projects() {
  const [filter,     setFilter]     = useState('All Projects');
  const [showModal,  setShowModal]  = useState(false);
  const [search,     setSearch]     = useState('');
  const [projects,   setProjects]   = useState(PROJECTS);
  const [form,       setForm]       = useState({
    name:'', desc:'', dept:'', status:'Ongoing',
    priority:'Low', startDate:'', endDate:'', members:'', owner:''
  });
  const [toast, setToast] = useState('');

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const tabs = [
    { label:'All Projects', count:24 },
    { label:'Ongoing',      count:12 },
    { label:'Completed',    count:8  },
    { label:'On Hold',      count:4  },
  ];

  const filtered = projects.filter(p => {
    if (filter === 'Ongoing')   return p.status === 'Ongoing';
    if (filter === 'Completed') return p.status === 'Completed';
    if (filter === 'On Hold')   return p.status === 'On Hold';
    return true;
  }).filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  const createProject = () => {
    if (!form.name.trim()) { showToast('Project name is required'); return; }
    const newProject = {
      id: Date.now(), name: form.name,
      dept: form.dept || 'General',
      status: form.status, statusC:'#3b82f6', statusBg:'#eff6ff',
      progress: 0, team:['#3b82f6'],
      dueDate: form.endDate || 'TBD', done:false
    };
    setProjects([newProject, ...projects]);
    setShowModal(false);
    setForm({ name:'', desc:'', dept:'', status:'Ongoing', priority:'Low', startDate:'', endDate:'', members:'', owner:'' });
    showToast('✅ Project created!');
  };

  const progressColor = (pct) => pct === 100 ? '#22c55e' : pct > 60 ? '#3b82f6' : pct > 30 ? '#f59e0b' : '#ef4444';

  return (
    <div style={{ padding:'22px 24px 40px', overflowX:'hidden', maxWidth:'100%' }}>

      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20 }}>
        <div className="pg-name">Projects</div>
        <button onClick={() => setShowModal(true)} className="save-btn" style={{ display:'flex', alignItems:'center', gap:6 }}>
          + New Project
        </button>
      </div>

      {/* Filter Tabs */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20, flexWrap:'wrap', gap:10 }}>
        <div className="projects-tabs" style={{ display:'flex', gap:4 }}>
          {tabs.map(t => (
            <button key={t.label} onClick={() => setFilter(t.label)} style={{
              padding:'7px 16px', borderRadius:8,
              border: filter === t.label ? '2px solid var(--blue)' : '1px solid var(--border)',
              background: filter === t.label ? 'var(--active)' : 'var(--bg)',
              color: filter === t.label ? 'var(--blue)' : 'var(--text2)',
              fontSize:12.5, fontWeight:600, cursor:'pointer',
              display:'flex', alignItems:'center', gap:6, transition:'all .2s'
            }}>
              {t.label}
              <span style={{
                background: filter === t.label ? 'var(--blue)' : 'var(--border)',
                color: filter === t.label ? '#fff' : 'var(--text2)',
                borderRadius:10, fontSize:10, padding:'1px 7px', fontWeight:700
              }}>{t.count}</span>
            </button>
          ))}
        </div>

        <div style={{ display:'flex', gap:10, alignItems:'center' }}>
          <button style={{ padding:'8px 14px', borderRadius:9, border:'1px solid var(--border)', background:'var(--bg)', fontSize:12, color:'var(--text2)', cursor:'pointer', display:'flex', alignItems:'center', gap:5 }}>
            ⚙ Filters
          </button>
          <div style={{ position:'relative' }}>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search Project"
              style={{ padding:'8px 14px 8px 34px', borderRadius:9, border:'1px solid var(--border)', background:'var(--bg)', fontSize:12, color:'var(--text)', outline:'none', width:200 }}
            />
            <span style={{ position:'absolute', left:10, top:'50%', transform:'translateY(-50%)', fontSize:13 }}>🔍</span>
          </div>
        </div>
      </div>

      {/* Date Range */}
      <div style={{ display:'flex', gap:12, marginBottom:20, alignItems:'center', flexWrap:'wrap' }}>
        <div>
          <div style={{ fontSize:11, fontWeight:600, color:'var(--muted)', marginBottom:5, textTransform:'uppercase', letterSpacing:'.5px' }}>DATE RANGE</div>
          <div style={{ display:'flex', gap:8 }}>
            <input type="date" className="form-inp" style={{ padding:'7px 12px', fontSize:12, width:140 }} />
            <input type="date" className="form-inp" style={{ padding:'7px 12px', fontSize:12, width:140 }} />
          </div>
        </div>
        <button className="save-btn" style={{ marginTop:20, padding:'9px 18px', fontSize:12 }}>
          Apply Filters
        </button>
      </div>

      {/* Project Cards Grid */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(min(280px, 100%), 1fr))', gap:16 }}>
        {filtered.map((p,i) => (
          <div key={i} style={{
            background:'var(--card)', borderRadius:14,
            border:'1px solid var(--border)', padding:'18px 20px',
            boxShadow:'var(--shadow-sm)', transition:'all .2s',
            animation:'fadeUp .3s ease both',
            animationDelay: i * 0.05 + 's'
          }}>
            {/* Status Badge + Menu */}
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
              <span style={{
                background: p.statusBg, color: p.statusC,
                fontSize:11, fontWeight:700,
                padding:'3px 10px', borderRadius:20
              }}>{p.status}</span>
              <button style={{ background:'none', border:'none', cursor:'pointer', fontSize:16, color:'var(--muted)' }}>⋯</button>
            </div>

            {/* Project Name */}
            <div style={{ fontSize:14, fontWeight:800, color:'var(--text)', marginBottom:4 }}>{p.name}</div>
            <div style={{ fontSize:11.5, color:'var(--muted)', marginBottom:14 }}>{p.dept}</div>

            {/* Progress */}
            <div style={{ marginBottom:14 }}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
                <span style={{ fontSize:11, fontWeight:600, color:'var(--text2)' }}>Progress</span>
                <span style={{ fontSize:11.5, fontWeight:700, color: progressColor(p.progress) }}>{p.progress}%</span>
              </div>
              <div style={{ height:5, background:'var(--bg2)', borderRadius:10, overflow:'hidden' }}>
                <div style={{ height:'100%', width:p.progress+'%', background: progressColor(p.progress), borderRadius:10 }} />
              </div>
            </div>

            {/* Team + Due Date */}
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <div style={{ display:'flex', alignItems:'center' }}>
                {p.team.map((c,j) => (
                  <div key={j} style={{
                    width:26, height:26, borderRadius:'50%',
                    background:c, border:'2px solid var(--card)',
                    marginLeft: j > 0 ? -8 : 0,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:9, fontWeight:700, color:'#fff'
                  }}>
                    {['J','K','L','R','A'][j % 5]}
                  </div>
                ))}
                {p.extra > 0 && (
                  <div style={{
                    width:26, height:26, borderRadius:'50%',
                    background:'var(--bg2)', border:'2px solid var(--card)',
                    marginLeft:-8, display:'flex', alignItems:'center',
                    justifyContent:'center', fontSize:9, fontWeight:700, color:'var(--text2)'
                  }}>+{p.extra}</div>
                )}
              </div>

              <div style={{ display:'flex', alignItems:'center', gap:5, fontSize:11.5, color:'var(--muted)' }}>
                {p.done
                  ? <span style={{ color:'#22c55e', fontWeight:700, display:'flex', alignItems:'center', gap:4 }}>✅ Done</span>
                  : <><span>📅</span><span>{p.dueDate}</span></>
                }
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New Project Modal */}
      {showModal && (
        <div style={{
          position:'fixed', inset:0,
          background:'rgba(0,0,0,.5)', zIndex:2000,
          display:'flex', alignItems:'center', justifyContent:'center',
          padding:20, backdropFilter:'blur(4px)'
        }} onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div style={{
            background:'var(--card)', borderRadius:18,
            width:'100%', maxWidth:560,
            border:'1px solid var(--border)',
            boxShadow:'var(--shadow-lg)',
            maxHeight:'90vh', overflowY:'auto',
            animation:'scaleIn .2s ease both'
          }}>
            {/* Header */}
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'20px 24px', borderBottom:'1px solid var(--border)' }}>
              <div style={{ fontSize:16, fontWeight:800, color:'var(--text)' }}>New Project</div>
              <button onClick={() => setShowModal(false)} style={{ background:'none', border:'none', fontSize:20, cursor:'pointer', color:'var(--muted)' }}>✕</button>
            </div>

            {/* Body */}
            <div style={{ padding:'20px 24px', display:'flex', flexDirection:'column', gap:14 }}>

              <div className="form-grp">
                <label className="form-lbl">Project Name</label>
                <input className="form-inp" placeholder="eg: Website Redesign" value={form.name} onChange={e => setForm({...form, name:e.target.value})} />
              </div>

              <div className="form-grp">
                <label className="form-lbl">Project Description</label>
                <textarea className="form-inp" rows="3" placeholder="briefly explain the project" value={form.desc} onChange={e => setForm({...form, desc:e.target.value})} style={{ resize:'vertical' }} />
              </div>

              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
                <div className="form-grp">
                  <label className="form-lbl">Department / Team</label>
                  <select className="form-inp" value={form.dept} onChange={e => setForm({...form, dept:e.target.value})}>
                    <option value="">Select team..</option>
                    <option>Engineering</option>
                    <option>Design</option>
                    <option>Marketing</option>
                    <option>Finance</option>
                    <option>HR</option>
                  </select>
                </div>
                <div className="form-grp">
                  <label className="form-lbl">Project Status</label>
                  <select className="form-inp" value={form.status} onChange={e => setForm({...form, status:e.target.value})}>
                    <option>Ongoing</option>
                    <option>Completed</option>
                    <option>On Hold</option>
                    <option>Critical</option>
                  </select>
                </div>
              </div>

              {/* Priority Buttons */}
              <div className="form-grp">
                <label className="form-lbl">Priority</label>
                <div style={{ display:'flex', gap:0, borderRadius:9, overflow:'hidden', border:'1px solid var(--border)' }}>
                  {['Low','Medium','High','Critical'].map(p => (
                    <button key={p} onClick={() => setForm({...form, priority:p})} style={{
                      flex:1, padding:'9px', border:'none',
                      background: form.priority===p ? 'var(--blue)' : 'var(--bg)',
                      color: form.priority===p ? '#fff' : 'var(--text2)',
                      fontSize:12, fontWeight:600, cursor:'pointer',
                      borderRight:'1px solid var(--border)', transition:'all .2s'
                    }}>{p}</button>
                  ))}
                </div>
              </div>

              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
                <div className="form-grp">
                  <label className="form-lbl">Start Date</label>
                  <input className="form-inp" type="date" value={form.startDate} onChange={e => setForm({...form, startDate:e.target.value})} />
                </div>
                <div className="form-grp">
                  <label className="form-lbl">End Date</label>
                  <input className="form-inp" type="date" value={form.endDate} onChange={e => setForm({...form, endDate:e.target.value})} />
                </div>
              </div>

              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
                <div className="form-grp">
                  <label className="form-lbl">Assigned Members</label>
                  <select className="form-inp">
                    <option>Add members..</option>
                    <option>Alice Kim</option>
                    <option>Bob Chen</option>
                    <option>Carol Davis</option>
                  </select>
                </div>
                <div className="form-grp">
                  <label className="form-lbl">Project Owner</label>
                  <select className="form-inp">
                    <option>Select member..</option>
                    <option>Alice Kim</option>
                    <option>Bob Chen</option>
                  </select>
                </div>
              </div>

            </div>

            {/* Footer */}
            <div style={{ display:'flex', gap:12, padding:'16px 24px', borderTop:'1px solid var(--border)' }}>
              <button onClick={() => setShowModal(false)} className="card-act" style={{ flex:1, padding:11, fontSize:13 }}>Cancel</button>
              <button onClick={createProject} className="save-btn" style={{ flex:2 }}>Create Project</button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div style={{ position:'fixed', bottom:24, right:24, background:'#22c55e', color:'#fff', padding:'12px 20px', borderRadius:10, fontWeight:600, fontSize:13, zIndex:9999 }}>
          {toast}
        </div>
      )}
    </div>
  );
}