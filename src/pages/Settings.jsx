import React, { useState, useEffect } from 'react';

const DEFAULT = {
  setName:'John Doe', setEmail:'admin@gmail.com',
  setRole:'Co-Admin',  setPhone:'+1 (555) 012-3456',
  setLoc:'San Francisco, CA', setTz:'PST (UTC-8)'
};

export default function Settings() {
  const [form, setForm] = useState(() => {
    const s = localStorage.getItem('coadmin_profile');
    return s ? JSON.parse(s) : DEFAULT;
  });

  // Dark mode — read from localStorage + listen for changes from Layout
  const [dark, setDark] = useState(() => localStorage.getItem('coadmin_theme') === 'dark');

  const [toast, setToast] = useState({ msg:'', type:'success' });

  // Sync when Layout changes the theme
  useEffect(() => {
    const handler = (e) => setDark(e.detail);
    window.addEventListener('themeChanged', handler);
    return () => window.removeEventListener('themeChanged', handler);
  }, []);

  const showToast = (msg, type='success') => {
    setToast({ msg, type });
    setTimeout(() => setToast({ msg:'', type:'success' }), 3000);
  };

  const saveProfile = () => {
    if (!form.setName.trim() || !form.setEmail.trim()) {
      showToast('Name and Email are required!', 'error'); return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.setEmail)) {
      showToast('Please enter a valid email!', 'error'); return;
    }
    localStorage.setItem('coadmin_profile', JSON.stringify(form));
    showToast('Profile saved successfully! 💾');
  };

  // Toggle dark mode — updates Layout too via localStorage + data-theme
  const toggleDark = () => {
    const newDark = !dark;
    setDark(newDark);
    localStorage.setItem('coadmin_theme', newDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', newDark ? 'dark' : 'light');
    window.dispatchEvent(new CustomEvent('themeChanged', { detail: newDark }));
  };

  const fields = [
    { id:'setName',  label:'Full Name *',     type:'text',  placeholder:'Your full name'    },
    { id:'setEmail', label:'Email Address *', type:'email', placeholder:'your@email.com'    },
    { id:'setRole',  label:'Role / Position', type:'text',  placeholder:'e.g. Co-Admin'     },
    { id:'setPhone', label:'Phone Number',    type:'text',  placeholder:'+1 (555) 000-0000' },
    { id:'setLoc',   label:'Location',        type:'text',  placeholder:'City, Country'     },
    { id:'setTz',    label:'Timezone',        type:'text',  placeholder:'e.g. PST (UTC-8)'  },
  ];

  return (
    <div style={{ padding:'22px 24px 40px' }}>
      <div className="pg-name" style={{ marginBottom:22 }}>Settings</div>

      {/* ── Profile Card ── */}
      <div className="card mb">
        <div className="card-head">
          <div className="card-title">👤 Profile Information</div>
        </div>

        {/* Avatar preview */}
        <div style={{
          display:'flex', alignItems:'center', gap:16,
          marginBottom:22, padding:16,
          background:'var(--bg)', borderRadius:12,
          border:'1px solid var(--border)'
        }}>
          <div style={{
            width:56, height:56, borderRadius:14,
            background:'linear-gradient(135deg,#3b82f6,#1d4ed8)',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:20, fontWeight:800, color:'#fff',
            boxShadow:'0 4px 12px rgba(59,130,246,.3)'
          }}>
            {form.setName.split(' ').map(p => p[0]).join('').toUpperCase().slice(0,2)}
          </div>
          <div>
            <div style={{ fontWeight:800, fontSize:15, color:'var(--text)' }}>{form.setName}</div>
            <div style={{ fontSize:12, color:'var(--muted)', marginTop:2 }}>{form.setRole} · {form.setEmail}</div>
          </div>
        </div>

        {/* Form Fields */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
          {fields.map(f => (
            <div className="form-grp" key={f.id}>
              <label className="form-lbl">{f.label}</label>
              <input
                className="form-inp"
                type={f.type}
                placeholder={f.placeholder}
                value={form[f.id]}
                onChange={e => setForm({ ...form, [f.id]: e.target.value })}
              />
            </div>
          ))}
        </div>

        <button className="save-btn" style={{ marginTop:20 }} onClick={saveProfile}>
          💾 Save Profile
        </button>
      </div>

      {/* ── Appearance Card ── */}
      <div className="card mb">
        <div className="card-head">
          <div className="card-title">🎨 Appearance</div>
        </div>

        {/* Dark Mode Row */}
        <div style={{
          display:'flex', alignItems:'center',
          justifyContent:'space-between',
          padding:'16px 0',
          borderBottom:'1px solid var(--border)'
        }}>
          <div style={{ display:'flex', alignItems:'center', gap:14 }}>
            <div style={{
              width:40, height:40, borderRadius:10,
              background: dark ? 'rgba(99,102,241,.15)' : 'rgba(245,158,11,.12)',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:18
            }}>
              {dark ? '🌙' : '☀️'}
            </div>
            <div>
              <div style={{ fontSize:13, fontWeight:700, color:'var(--text)' }}>
                {dark ? 'Dark Mode' : 'Light Mode'}
              </div>
              <div style={{ fontSize:11.5, color:'var(--muted)', marginTop:2 }}>
                {dark ? 'Currently using dark theme' : 'Currently using light theme'}
              </div>
            </div>
          </div>

          {/* Toggle */}
          <div
            className={'toggle-track' + (dark ? ' on' : '')}
            onClick={toggleDark}
            style={{ cursor:'pointer', flexShrink:0 }}
            title={dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            <div className="toggle-thumb" />
          </div>
        </div>

        {/* Theme preview boxes */}
        <div style={{ display:'flex', gap:12, marginTop:16 }}>
          {/* Light option */}
          <div
            onClick={() => { if(dark) toggleDark(); }}
            style={{
              flex:1, padding:14, borderRadius:10,
              border:`2px solid ${!dark ? 'var(--blue)' : 'var(--border)'}`,
              background:'#f8fafc', cursor:'pointer',
              transition:'all .2s'
            }}
          >
            <div style={{ display:'flex', gap:6, marginBottom:8 }}>
              {['#ef4444','#f59e0b','#22c55e'].map((c,i) => (
                <div key={i} style={{ width:8, height:8, borderRadius:'50%', background:c }} />
              ))}
            </div>
            <div style={{ height:6, borderRadius:3, background:'#e2e8f0', marginBottom:5 }} />
            <div style={{ height:6, borderRadius:3, background:'#e2e8f0', width:'70%' }} />
            <div style={{ marginTop:8, fontSize:11, fontWeight:700, color:'#64748b', display:'flex', alignItems:'center', gap:5 }}>
              {!dark && <span style={{ color:'#3b82f6' }}>✓</span>} ☀️ Light
            </div>
          </div>

          {/* Dark option */}
          <div
            onClick={() => { if(!dark) toggleDark(); }}
            style={{
              flex:1, padding:14, borderRadius:10,
              border:`2px solid ${dark ? 'var(--blue)' : 'var(--border)'}`,
              background:'#1e293b', cursor:'pointer',
              transition:'all .2s'
            }}
          >
            <div style={{ display:'flex', gap:6, marginBottom:8 }}>
              {['#ef4444','#f59e0b','#22c55e'].map((c,i) => (
                <div key={i} style={{ width:8, height:8, borderRadius:'50%', background:c }} />
              ))}
            </div>
            <div style={{ height:6, borderRadius:3, background:'#2d3748', marginBottom:5 }} />
            <div style={{ height:6, borderRadius:3, background:'#2d3748', width:'70%' }} />
            <div style={{ marginTop:8, fontSize:11, fontWeight:700, color:'#94a3b8', display:'flex', alignItems:'center', gap:5 }}>
              {dark && <span style={{ color:'#3b82f6' }}>✓</span>} 🌙 Dark
            </div>
          </div>
        </div>
      </div>

      {/* ── Account Card ── */}
      <div className="card mb">
        <div className="card-head">
          <div className="card-title">🔐 Account & Security</div>
        </div>

        {[
          { label:'Change Password',  desc:'Update your account password',           color:'var(--blue)',  btnTxt:'Change',  btnBg:'var(--blue-l)',  btnC:'var(--blue)'  },
          { label:'Two Factor Auth',  desc:'Add extra layer of security to account', color:'var(--green)', btnTxt:'Enable',  btnBg:'var(--green-l)', btnC:'var(--green)' },
          { label:'Delete Account',   desc:'Permanently delete your account',        color:'var(--red)',   btnTxt:'Delete',  btnBg:'var(--red-l)',   btnC:'var(--red)'   },
        ].map((item, i) => (
          <div key={i} style={{
            display:'flex', alignItems:'center', justifyContent:'space-between',
            padding:'14px 0',
            borderBottom: i < 2 ? '1px solid var(--border)' : 'none'
          }}>
            <div>
              <div style={{ fontSize:13, fontWeight:600, color: item.color }}>{item.label}</div>
              <div style={{ fontSize:11.5, color:'var(--muted)', marginTop:2 }}>{item.desc}</div>
            </div>
            <button
              onClick={() => showToast(item.label + ' clicked!', 'info')}
              style={{
                background: item.btnBg, color: item.btnC,
                border:'none', borderRadius:8,
                padding:'7px 16px', fontSize:12,
                fontWeight:700, cursor:'pointer',
                fontFamily:'var(--font)', transition:'all .2s'
              }}
            >
              {item.btnTxt}
            </button>
          </div>
        ))}
      </div>

      {/* Toast */}
      {toast.msg && (
        <div style={{
          position:'fixed', bottom:24, right:24,
          background: toast.type === 'error' ? '#ef4444' : toast.type === 'info' ? '#3b82f6' : '#22c55e',
          color:'#fff', padding:'12px 20px',
          borderRadius:10, fontWeight:600, fontSize:13,
          zIndex:9999, boxShadow:'0 4px 20px rgba(0,0,0,.2)',
          animation:'fadeUp .25s ease both'
        }}>
          {toast.msg}
        </div>
      )}
    </div>
  );
}