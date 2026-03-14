import React, { useState, useEffect, useRef } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';

const NAV_ITEMS = [
  { path:'/',           label:'Dashboard',          icon:'⊞', exact:true },
  { path:'/chat',       label:'Chat',               icon:'💬', badge:4   },
  { path:'/meetings',   label:'Meetings',           icon:'📅'            },
  { path:'/documents',  label:'Documents & Report', icon:'📄'            },
  { path:'/complaints', label:'Complaints',         icon:'📢', badge:2   },
  { path:'/notices',    label:'Notice',             icon:'🔔'            },
  { path:'/attendance', label:'Attendance & Leave', icon:'🗓️'            },
  { path:'/settings',   label:'Settings',           icon:'⚙️'            },
];

const NOTIFICATIONS = [
  { icon:'🔴', title:'API Dependency Failure',    desc:'Payment gateway blocked by external team', time:'2m ago',  unread:true  },
  { icon:'⚠️', title:'QA Environment Latency',    desc:'Response time 3x normal — check server',  time:'15m ago', unread:true  },
  { icon:'✅', title:'Sprint 20 Kickoff Ready',   desc:'All tasks assigned successfully',          time:'1h ago',  unread:true  },
  { icon:'📢', title:'New Complaint Submitted',   desc:'CMP-006 marked as Critical priority',      time:'2h ago',  unread:false },
  { icon:'📅', title:'Meeting Reminder',          desc:'Design Review today at 2:00 PM',           time:'3h ago',  unread:false },
  { icon:'📄', title:'Report Ready',              desc:'Q1 Performance Report is available',       time:'5h ago',  unread:false },
  { icon:'👥', title:'New Team Member',           desc:'Emma Wilson joined the Design team',       time:'1d ago',  unread:false },
];

export default function Layout() {
  const [collapsed,  setCollapsed]  = useState(false);
  const [dark,       setDark]       = useState(() => localStorage.getItem('coadmin_theme') === 'dark');
  const [time,       setTime]       = useState('');
  const [showNotif,  setShowNotif]  = useState(false);
  const [showAllNotif, setShowAllNotif] = useState(false);
  const [notifs,     setNotifs]     = useState(NOTIFICATIONS);
  const notifRef = useRef(null);
  const navigate = useNavigate();

  /* Theme */
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    localStorage.setItem('coadmin_theme', dark ? 'dark' : 'light');
    // Dispatch event so Settings page can sync
    window.dispatchEvent(new CustomEvent('themeChanged', { detail: dark }));
  }, [dark]);

  /* Clock */
  useEffect(() => {
    const tick = () => {
      const n = new Date();
      const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
      const mons = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      setTime(`${days[n.getDay()]}, ${mons[n.getMonth()]} ${n.getDate()} ${n.getFullYear()}  ${String(n.getHours()).padStart(2,'0')}:${String(n.getMinutes()).padStart(2,'0')}:${String(n.getSeconds()).padStart(2,'0')}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  /* Close dropdown on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotif(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const logout = () => { sessionStorage.removeItem('coadmin_auth'); navigate('/login'); };
  const markAllRead = () => setNotifs(notifs.map(n => ({ ...n, unread: false })));
  const markOne = (i) => { const u = [...notifs]; u[i] = { ...u[i], unread:false }; setNotifs(u); };
  const unreadCount = notifs.filter(n => n.unread).length;

  const profile = JSON.parse(localStorage.getItem('coadmin_profile') || '{"setName":"John Doe","setRole":"Co-Admin"}');
  const initials = profile.setName.split(' ').map(p => p[0]).join('').toUpperCase().slice(0,2);

  return (
    <div className="app">

      {/* SIDEBAR */}
      <aside className={'sidebar' + (collapsed ? ' collapsed' : '')}>
        <div className="sb-logo">
          <div className="sb-logo-icon">CA</div>
          <div>
            <div className="sb-logo-name">CoAdmin</div>
            <div className="sb-logo-tag">Project Suite</div>
          </div>
        </div>
        <div className="sb-section">Main</div>
        <nav className="sb-nav">
          {NAV_ITEMS.map((item, i) => (
            <NavLink key={i} to={item.path} end={item.exact}
              className={({ isActive }) => 'nav-item' + (isActive ? ' active' : '')}>
              <div className="nav-ico">{item.icon}</div>
              <span className="nav-lbl">{item.label}</span>
              {item.badge && <span className="nav-badge">{item.badge}</span>}
            </NavLink>
          ))}
        </nav>
        <div className="sb-footer">
          <div className="nav-item" onClick={logout} style={{ cursor:'pointer', color:'var(--red)' }}>
            <div className="nav-ico">🚪</div>
            <span className="nav-lbl">Log Out</span>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <div className="main">

        {/* TOPBAR */}
        <header className="topbar">

          {/* LEFT */}
          <div style={{ display:'flex', alignItems:'center', gap:14 }}>
            <button className="ham-btn" onClick={() => setCollapsed(c => !c)}>
              <span /><span /><span />
            </button>
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              <div className="user-av">{initials}</div>
              <div>
                <div className="user-name">{profile.setName}</div>
                <div className="user-role">{profile.setRole || 'Co-Admin'}</div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div style={{ display:'flex', alignItems:'center', gap:14 }}>

            {/* Clock */}
            <div className="hdr-clock">{time}</div>

            {/* Bell */}
            <div style={{ position:'relative' }} ref={notifRef}>
              <button
                className="icon-btn"
                onClick={() => { setShowNotif(s => !s); setShowAllNotif(false); }}
                style={showNotif ? { background:'var(--active)', borderColor:'var(--blue)' } : {}}
              >
                🔔
                {unreadCount > 0 && (
                  <span style={{
                    position:'absolute', top:-4, right:-4,
                    width:17, height:17, borderRadius:'50%',
                    background:'#ef4444', color:'#fff',
                    fontSize:9, fontWeight:700,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    border:'2px solid var(--card)', fontFamily:'var(--font)'
                  }}>{unreadCount}</span>
                )}
              </button>

              {/* DROPDOWN */}
              {showNotif && (
                <div style={{
                  position:'absolute', top:'calc(100% + 10px)', right:0,
                  width: showAllNotif ? 360 : 320,
                  background:'var(--card)',
                  border:'1px solid var(--border)',
                  borderRadius:14, boxShadow:'var(--shadow-lg)',
                  zIndex:1000, overflow:'hidden',
                  animation:'scaleIn .18s ease both',
                  transformOrigin:'top right'
                }}>

                  {/* Dropdown Header */}
                  <div style={{
                    display:'flex', alignItems:'center', justifyContent:'space-between',
                    padding:'14px 16px', borderBottom:'1px solid var(--border)'
                  }}>
                    <div style={{ fontSize:13, fontWeight:800, color:'var(--text)', display:'flex', alignItems:'center', gap:8 }}>
                      {showAllNotif ? 'All Notifications' : 'Notifications'}
                      {unreadCount > 0 && !showAllNotif && (
                        <span style={{ background:'var(--blue)', color:'#fff', fontSize:9, fontWeight:700, padding:'2px 7px', borderRadius:10 }}>
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                    <div style={{ display:'flex', gap:8, alignItems:'center' }}>
                      {unreadCount > 0 && (
                        <button onClick={markAllRead} style={{ background:'none', border:'none', cursor:'pointer', fontSize:11, color:'var(--blue)', fontWeight:600, fontFamily:'var(--font)' }}>
                          Mark all read
                        </button>
                      )}
                      {showAllNotif && (
                        <button onClick={() => setShowAllNotif(false)} style={{ background:'none', border:'none', cursor:'pointer', fontSize:11, color:'var(--muted)', fontWeight:600, fontFamily:'var(--font)' }}>
                          ← Back
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Notif List */}
                  <div style={{ maxHeight: showAllNotif ? 460 : 300, overflowY:'auto' }}>
                    {(showAllNotif ? notifs : notifs.slice(0,5)).map((n, i) => (
                      <div
                        key={i}
                        onClick={() => markOne(i)}
                        style={{
                          display:'flex', alignItems:'flex-start', gap:11,
                          padding:'12px 16px',
                          background: n.unread ? 'var(--hover)' : 'transparent',
                          borderBottom:'1px solid var(--border)',
                          cursor:'pointer', transition:'background .15s'
                        }}
                      >
                        <div style={{
                          width:34, height:34, borderRadius:9,
                          background: n.unread ? 'var(--active)' : 'var(--bg)',
                          display:'flex', alignItems:'center', justifyContent:'center',
                          fontSize:14, flexShrink:0, border:'1px solid var(--border)'
                        }}>{n.icon}</div>

                        <div style={{ flex:1, minWidth:0 }}>
                          <div style={{ fontSize:12, fontWeight: n.unread ? 700 : 600, color:'var(--text)', marginBottom:2 }}>
                            {n.title}
                          </div>
                          <div style={{ fontSize:11, color:'var(--muted)', fontFamily:'var(--font-b)', marginBottom:3 }}>
                            {n.desc}
                          </div>
                          <div style={{ fontSize:10, color:'var(--muted)', fontFamily:'var(--font-b)' }}>
                            🕐 {n.time}
                          </div>
                        </div>

                        {n.unread && (
                          <div style={{ width:7, height:7, borderRadius:'50%', background:'var(--blue)', flexShrink:0, marginTop:6 }} />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  {!showAllNotif && (
                    <div style={{ padding:'10px 16px', borderTop:'1px solid var(--border)', textAlign:'center' }}>
                      <button
                        onClick={() => setShowAllNotif(true)}
                        style={{
                          background:'var(--blue-l)', border:'none', cursor:'pointer',
                          fontSize:12, color:'var(--blue)', fontWeight:600,
                          fontFamily:'var(--font)', padding:'7px 20px',
                          borderRadius:8, width:'100%', transition:'all .2s'
                        }}
                      >
                        View all {notifs.length} notifications →
                      </button>
                    </div>
                  )}

                </div>
              )}
            </div>

            {/* Dark Mode */}
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <span style={{ fontSize:15 }}>{dark ? '🌙' : '☀️'}</span>
              <div
                className={'toggle-track' + (dark ? ' on' : '')}
                onClick={() => setDark(d => !d)}
                title={dark ? 'Switch to Light' : 'Switch to Dark'}
              >
                <div className="toggle-thumb" />
              </div>
            </div>

          </div>
        </header>

        {/* Content */}
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}