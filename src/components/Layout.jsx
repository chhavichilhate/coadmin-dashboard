import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { RiDashboardLine } from 'react-icons/ri';
import { FiFolder, FiMessageSquare, FiCalendar, FiFileText, FiAlertTriangle, FiVolume2, FiClock, FiSettings, FiLogOut } from 'react-icons/fi';

const NAV_ITEMS = [
  { path:'/',           label:'Dashboard',           Icon:RiDashboardLine, exact:true },
  { path:'/projects',   label:'Projects',            Icon:FiFolder                    },
  { path:'/chat',       label:'Chat',                Icon:FiMessageSquare, badge:10   },
  { path:'/meetings',   label:'Meetings',            Icon:FiCalendar,      badge:2    },
  { path:'/documents',  label:'Documents And Report',Icon:FiFileText                  },
  { path:'/complaints', label:'Complaints',          Icon:FiAlertTriangle             },
  { path:'/notices',    label:'Notice',              Icon:FiVolume2,       badge:3    },
  { path:'/attendance', label:'Attendance And Leave',Icon:FiClock                     },
  { path:'/settings',   label:'Settings',            Icon:FiSettings                  },
];

/* ── AI Assistant ── */
function AIAssistant() {
  const [open,  setOpen]  = useState(false);
  const [hover, setHover] = useState(false);
  const [input, setInput] = useState('');
  const [msgs,  setMsgs]  = useState([{ from:'ai', text:'Hi! How can I help you today? 😊' }]);
  const [loading,setLoading]=useState(false);

  const send = () => {
    if (!input.trim()) return;
    const text = input.trim(); setInput('');
    setMsgs(p => [...p, { from:'user', text }]);
    setLoading(true);
    setTimeout(() => {
      const r = ['Sure! Check the relevant section.','You can find that in Dashboard.','Let me assist you!','Check Settings for that feature.'][Math.floor(Math.random()*4)];
      setMsgs(p => [...p, { from:'ai', text:r }]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div style={{ position:'fixed', bottom:24, right:24, zIndex:9999 }}>
      {open && (
        <div style={{ position:'absolute', bottom:62, right:0, width:300, height:380, background:'var(--card)', border:'1px solid var(--border)', borderRadius:16, boxShadow:'var(--shadow-lg)', display:'flex', flexDirection:'column', overflow:'hidden', transformOrigin:'bottom right', animation:'scaleIn .2s ease both' }}>
          <div style={{ padding:'14px 16px', background:'#3b82f6', display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ width:32, height:32, borderRadius:'50%', background:'rgba(255,255,255,.2)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:16 }}>🤖</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:13, fontWeight:700, color:'#fff' }}>AI Assistant</div>
              <div style={{ fontSize:10, color:'rgba(255,255,255,.8)' }}>Always here to help!</div>
            </div>
            <button onClick={() => setOpen(false)} style={{ background:'none', border:'none', color:'#fff', fontSize:18, cursor:'pointer' }}>✕</button>
          </div>
          <div style={{ flex:1, overflowY:'auto', padding:12, display:'flex', flexDirection:'column', gap:10 }}>
            {msgs.map((m,i) => (
              <div key={i} style={{ display:'flex', justifyContent:m.from==='user'?'flex-end':'flex-start' }}>
                <div style={{ maxWidth:'80%', padding:'8px 12px', borderRadius:12, fontSize:12, lineHeight:1.5, background:m.from==='user'?'#3b82f6':'var(--bg)', color:m.from==='user'?'#fff':'var(--text)' }}>{m.text}</div>
              </div>
            ))}
            {loading && <div style={{ display:'flex', gap:4, padding:'8px 12px' }}>{[0,1,2].map(i=><div key={i} style={{ width:6,height:6,borderRadius:'50%',background:'#94a3b8' }}/>)}</div>}
          </div>
          <div style={{ padding:10, borderTop:'1px solid var(--border)', display:'flex', gap:8 }}>
            <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder="Type your question..." style={{ flex:1, padding:'8px 12px', borderRadius:20, border:'1.5px solid var(--border)', background:'var(--bg)', color:'var(--text)', fontSize:12, outline:'none' }}/>
            <button onClick={send} style={{ width:34,height:34,borderRadius:'50%',background:'#3b82f6',border:'none',color:'#fff',fontSize:14,cursor:'pointer' }}>➤</button>
          </div>
        </div>
      )}
      {hover && !open && (
        <div style={{ position:'absolute', bottom:58, right:0, background:'#3b82f6', color:'#fff', padding:'6px 14px', borderRadius:20, fontSize:12, fontWeight:600, whiteSpace:'nowrap', boxShadow:'var(--shadow)' }}>Need help? ask me!</div>
      )}
      <button onClick={()=>setOpen(o=>!o)} onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}
        style={{ width:50, height:50, borderRadius:'50%', background:'#3b82f6', border:'none', color:'#fff', fontSize:22, cursor:'pointer', boxShadow:'0 4px 20px rgba(59,130,246,.5)', display:'flex', alignItems:'center', justifyContent:'center', transition:'all .2s' }}>
        🤖
      </button>
    </div>
  );
}

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile,  setIsMobile]  = useState(() => window.innerWidth <= 768);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  const [dark,      setDark]      = useState(() => localStorage.getItem('coadmin_theme') === 'dark');
  const [day,       setDay]       = useState('');
  const [dateStr,   setDateStr]   = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    localStorage.setItem('coadmin_theme', dark ? 'dark' : 'light');
    window.dispatchEvent(new CustomEvent('themeChanged', { detail: dark }));
  }, [dark]);

  useEffect(() => {
    const tick = () => {
      const n = new Date();
      const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
      const mons = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      setDay(days[n.getDay()]);
      const dd = String(n.getDate()).padStart(2,'0');
      setDateStr(`${mons[n.getMonth()]} ${dd},${n.getFullYear()}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const logout  = () => { sessionStorage.removeItem('coadmin_auth'); navigate('/login'); };
  const profile = JSON.parse(localStorage.getItem('coadmin_profile') || '{"setName":"John Doe","setRole":"Co-Admin"}');
  const initials = profile.setName.split(' ').map(p=>p[0]).join('').toUpperCase().slice(0,2);

  return (
    <div className="app">

      {/* ── SIDEBAR ── */}
      {/* Mobile overlay */}
      {isMobile && collapsed && (
        <div className="sidebar-overlay show" onClick={() => setCollapsed(false)} />
      )}

      <aside className={
        'sidebar' +
        (isMobile
          ? (collapsed ? ' mobile-open' : '')
          : (collapsed ? ' collapsed' : ''))
      }>

        {/* Hamburger only  */}
        <div style={{ padding:'14px 12px', borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', flexShrink:0 }}>
          <button className="ham-btn" onClick={() => setCollapsed(c => !c)} style={{ flexShrink:0 }}>
            <span /><span /><span />
          </button>
        </div>

        {/* Nav */}
        <nav className="sb-nav" style={{ flex:1, paddingTop:6 }}>
          {NAV_ITEMS.map((item, i) => (
            <NavLink key={i} to={item.path} end={item.exact}
              className={({ isActive }) => 'nav-item' + (isActive ? ' active' : '')}>
              <div className="nav-ico">
                <item.Icon size={18} strokeWidth={1.8} />
              </div>
              <span className="nav-lbl">{item.label}</span>
              {item.badge && <span className="nav-badge">{item.badge}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Log Out */}
        <div style={{ padding:'10px', borderTop:'1px solid var(--border)', flexShrink:0 }}>
          <div className="nav-item" onClick={logout} style={{ cursor:'pointer', color:'var(--red)', fontWeight:700 }}>
            <div className="nav-ico" style={{ color:'var(--red)' }}>
              <FiLogOut size={18} strokeWidth={1.8} />
            </div>
            <span className="nav-lbl" style={{ color:'var(--red)', fontWeight:700 }}>Log Out</span>
          </div>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div className="main">

        {/* ── TOPBAR  */}
        <header className="topbar">

          {/* LEFT: Avatar + Hello John Doe + Co-Admin */}
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <div style={{ width:42, height:42, borderRadius:'50%', background:'linear-gradient(135deg,#ef4444,#dc2626)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:14, fontWeight:800, flexShrink:0, boxShadow:'0 2px 8px rgba(239,68,68,.3)' }}>{initials}</div>
            <div>
              <div style={{ fontSize:13, color:'var(--text)', lineHeight:1.2 }}>
                Hello! <strong style={{ fontWeight:800 }}>{profile.setName}</strong>
              </div>
              <div style={{ fontSize:11, color:'var(--muted)', fontFamily:'var(--font-b)' }}>
                {profile.setRole || 'Co-Admin'}
              </div>
            </div>
          </div>

          {/* RIGHT: Date + Toggle  */}
          <div style={{ display:'flex', alignItems:'center', gap:16 }}>

            {/* Date — "Friday | Dec 26,2025" */}
            <div className="topbar-date" style={{ fontSize:13, fontWeight:600, color:'var(--text)', whiteSpace:'nowrap' }}>
              {day} | {dateStr}
            </div>


            {/* Green toggle  */}
            <div
              className={'toggle-track' + (dark ? ' on' : '')}
              onClick={() => setDark(d => !d)}
              style={{ cursor:'pointer', flexShrink:0 }}
            >
              <div className="toggle-thumb" />
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="content">
          <Outlet />
        </div>
      </div>

      {/* AI Assistant */}
      <AIAssistant />
    </div>
  );
}