import React, { useState, useEffect } from 'react';

const MEETINGS_DATA = [
  { id:1, title:'Weakly Team Standup',       date:'Today',       time:'10:00 AM – 11:30 AM', platform:'Zoom', status:'live',     participants:['#ef4444','#3b82f6','#22c55e','#f59e0b'], extra:2 },
  { id:2, title:'Q3 Product Roadmap Review', date:'Today',       time:'10:00 AM – 11:30 AM', platform:'Zoom', status:'live',     participants:['#a855f7','#3b82f6','#ef4444'],           extra:2 },
  { id:3, title:'Design System Sync',        date:'Today',       time:'2:00 PM – 3:00 PM',   platform:'Meet', status:'today',    participants:['#22c55e','#f59e0b'],                     extra:0 },
  { id:4, title:'Weekly All - Hands',        date:'Tomorrow',    time:'09:00 AM – 10:00 AM', platform:'Zoom', status:'upcoming', participants:['#ef4444','#3b82f6','#22c55e'],           extra:2 },
  { id:5, title:'Frontend Architecture',     date:'FRI, OCT 27', time:'11:00 AM – 12:00 PM', platform:'Meet', status:'upcoming', participants:['#a855f7'],                               extra:0, allBadge:true },
];

/* ── Meeting Room Component ── */
function MeetingRoom({ meeting, onLeave }) {
  const [muted,   setMuted]   = useState(false);
  const [videoOff,setVideoOff]= useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [showChat,setShowChat]= useState(false);
  const [chatMsg, setChatMsg] = useState('');
  const [messages,setMessages]= useState([{ from:'System', text:'Meeting started. You are now connected.', time:'Now' }]);

  const PARTICIPANTS = [
    { name:'John Dev', init:'J', color:'#ef4444' },{ name:'Karthik S.', init:'K', color:'#22c55e' },
    { name:'Louanya',  init:'L', color:'#f59e0b' },{ name:'Diya P.',    init:'D', color:'#6366f1' },
    { name:'Aaron M.', init:'A', color:'#a855f7' },{ name:'Rahul T.',   init:'R', color:'#06b6d4' },
    { name:'Sneha B.', init:'S', color:'#f43f5e' },{ name:'Vikram J.',  init:'V', color:'#8b5cf6' },
    { name:'Ananya L.',init:'A', color:'#0ea5e9' },{ name:'Aaron M.',   init:'A', color:'#d97706' },
    { name:'Priya K.', init:'P', color:'#ec4899' },{ name:'David C.',   init:'D', color:'#84cc16' },
  ];

  useEffect(() => {
    const id = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const fmt = (s) => `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;

  const sendChat = () => {
    if (!chatMsg.trim()) return;
    const now = new Date().toLocaleTimeString('en-US', { hour:'numeric', minute:'2-digit' });
    setMessages(prev => [...prev, { from:'You', text:chatMsg, time:now }]);
    setChatMsg('');
    setTimeout(() => {
      setMessages(prev => [...prev, { from:PARTICIPANTS[Math.floor(Math.random()*4)+1].name, text:['👍 Got it!','Sure!','On it!','Noted!'][Math.floor(Math.random()*4)], time:new Date().toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit'}) }]);
    }, 1000);
  };

  return (
    <div style={{ position:'fixed', inset:0, zIndex:3000, background:'#0f172a', display:'flex', flexDirection:'column', fontFamily:'var(--font)' }}>
      {/* Top */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 20px', background:'#1e293b', borderBottom:'1px solid #2d3748' }}>
        <div style={{ fontSize:13, fontWeight:600, color:'#94a3b8' }}>{meeting.title}</div>
        <div style={{ fontSize:12, color:'#94a3b8', fontFamily:'monospace' }}>{fmt(elapsed)} | {new Date().toLocaleTimeString()}</div>
      </div>

      <div style={{ flex:1, display:'flex', overflow:'hidden' }}>
        {/* Grid */}
        <div style={{ flex:1, padding:10, display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8 }}>
          {PARTICIPANTS.map((p,i) => (
            <div key={i} style={{ background:p.color, borderRadius:12, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight:100, position:'relative', cursor:'pointer' }}>
              <div style={{ fontSize:28, fontWeight:800, color:'#fff' }}>{p.init}</div>
              <div style={{ position:'absolute', bottom:6, fontSize:9.5, color:'rgba(255,255,255,.9)', background:'rgba(0,0,0,.3)', padding:'1px 8px', borderRadius:20 }}>{p.name}</div>
              <div style={{ position:'absolute', top:5, right:8, background:'rgba(0,0,0,.4)', borderRadius:20, padding:'1px 6px', fontSize:9.5, color:'#fff' }}>$ 5</div>
            </div>
          ))}
        </div>

        {/* Chat Panel */}
        {showChat && (
          <div style={{ width:260, background:'#1e293b', borderLeft:'1px solid #2d3748', display:'flex', flexDirection:'column' }}>
            <div style={{ padding:'12px 16px', borderBottom:'1px solid #2d3748', fontSize:13, fontWeight:700, color:'#f1f5f9' }}>💬 Chat</div>
            <div style={{ flex:1, overflowY:'auto', padding:12, display:'flex', flexDirection:'column', gap:8 }}>
              {messages.map((m,i) => (
                <div key={i}>
                  <div style={{ fontSize:10.5, color:'#94a3b8', marginBottom:2 }}>{m.from}</div>
                  <div style={{ background:'#0f172a', color:'#f1f5f9', padding:'7px 10px', borderRadius:8, fontSize:12 }}>{m.text}</div>
                </div>
              ))}
            </div>
            <div style={{ padding:10, borderTop:'1px solid #2d3748', display:'flex', gap:6 }}>
              <input value={chatMsg} onChange={e => setChatMsg(e.target.value)} onKeyDown={e => e.key==='Enter' && sendChat()} placeholder="Type..." style={{ flex:1, padding:'7px 10px', borderRadius:8, border:'1px solid #2d3748', background:'#0f172a', color:'#f1f5f9', fontSize:12, outline:'none' }} />
              <button onClick={sendChat} style={{ width:30, height:30, borderRadius:'50%', background:'#3b82f6', border:'none', color:'#fff', cursor:'pointer', fontSize:12 }}>➤</button>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 24px', background:'#1e293b', borderTop:'1px solid #2d3748' }}>
        <div style={{ display:'flex', gap:8 }}>
          {['😊','✋','⋯'].map((ico,i) => (
            <button key={i} style={{ width:36, height:36, borderRadius:9, background:'#2d3748', border:'none', color:'#f1f5f9', fontSize:16, cursor:'pointer' }}>{ico}</button>
          ))}
        </div>
        <div style={{ display:'flex', gap:10, alignItems:'center' }}>
          <button onClick={() => setMuted(m => !m)} style={{ width:44, height:44, borderRadius:'50%', background:muted?'#ef4444':'#2d3748', border:'none', color:'#fff', fontSize:18, cursor:'pointer', transition:'all .2s' }}>{muted?'🔇':'🎤'}</button>
          <button onClick={() => setVideoOff(v => !v)} style={{ width:44, height:44, borderRadius:'50%', background:videoOff?'#ef4444':'#2d3748', border:'none', color:'#fff', fontSize:18, cursor:'pointer', transition:'all .2s' }}>{videoOff?'📵':'📹'}</button>
          <button onClick={onLeave} style={{ padding:'10px 22px', borderRadius:9, background:'#ef4444', border:'none', color:'#fff', fontSize:13, fontWeight:700, cursor:'pointer' }}>🔴 End</button>
        </div>
        <div style={{ display:'flex', gap:8 }}>
          <button onClick={() => setShowChat(c => !c)} style={{ width:38, height:38, borderRadius:9, background:showChat?'#3b82f6':'#2d3748', border:'none', color:'#fff', fontSize:16, cursor:'pointer' }}>💬</button>
          <button style={{ width:38, height:38, borderRadius:9, background:'#2d3748', border:'none', color:'#fff', fontSize:16, cursor:'pointer' }}>👥</button>
        </div>
      </div>
    </div>
  );
}

/* ══ MAIN ══ */
export default function Meetings() {
  const [filter,        setFilter]        = useState('All');
  const [showModal,     setShowModal]      = useState(false);
  const [search,        setSearch]        = useState('');
  const [activeMeeting, setActiveMeeting] = useState(null);
  const [syncing,       setSyncing]       = useState(false);
  const [syncDone,      setSyncDone]      = useState(false);
  const [meetings,      setMeetings]      = useState(() => {
    try { const s = localStorage.getItem('coadmin_meetings'); const p = s ? JSON.parse(s) : null; return Array.isArray(p) && p[0]?.participants ? p : MEETINGS_DATA; }
    catch { return MEETINGS_DATA; }
  });
  const [form, setForm] = useState({ title:'', date:'', startTime:'10:00', endTime:'10:00', platform:'Google Meet', participants:'' });
  const [toast, setToast] = useState('');

  const toast_ = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  // ── Sync Calendar ──
  const syncCalendar = () => {
    setSyncing(true); setSyncDone(false);
    setTimeout(() => {
      setSyncing(false); setSyncDone(true);
      toast_('✅ Calendar synced! 5 events imported.');
      setTimeout(() => setSyncDone(false), 3000);
    }, 2000);
  };

  const schedule = () => {
    if (!form.title || !form.date) { toast_('Please fill required fields'); return; }
    const d = new Date(form.date + 'T00:00:00');
    const dateStr = d.toLocaleDateString('en-US', { weekday:'short', month:'short', day:'numeric' });
    const newMtg = { id:Date.now(), title:form.title, date:dateStr, time:`${form.startTime} – ${form.endTime}`, platform:form.platform.split(' ').pop(), status:'upcoming', participants:['#3b82f6'], extra:0 };
    const updated = [newMtg, ...meetings];
    setMeetings(updated);
    localStorage.setItem('coadmin_meetings', JSON.stringify(updated));
    setShowModal(false);
    setForm({ title:'', date:'', startTime:'10:00', endTime:'10:00', platform:'Google Meet', participants:'' });
    toast_('✅ Meeting scheduled!');
  };

  const filtered = meetings
    .filter(m => filter==='All' ? true : filter==='Ongoing' ? m.status==='live' : filter==='Upcoming' ? m.status==='upcoming'||m.status==='today' : m.status==='past')
    .filter(m => m.title.toLowerCase().includes(search.toLowerCase()));

  if (activeMeeting) return <MeetingRoom meeting={activeMeeting} onLeave={() => setActiveMeeting(null)} />;

  return (
    <div style={{ padding:'22px 24px 40px' }}>

      {/* Header */}
      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:20 }}>
        <div>
          <div className="pg-name">Meetings</div>
          <div style={{ fontSize:12, color:'var(--muted)', marginTop:4 }}>Manage your schedule and prepare for upcoming calls</div>
        </div>
        <div style={{ display:'flex', gap:10 }}>
          {/* ── Sync Calendar ── */}
          <button onClick={syncCalendar} disabled={syncing}
            style={{ display:'flex', alignItems:'center', gap:6, padding:'9px 16px', borderRadius:9, background: syncDone?'var(--green-l)':'var(--bg)', border:`1px solid ${syncDone?'var(--green)':'var(--border)'}`, fontSize:12.5, fontWeight:600, color:syncDone?'var(--green)':'var(--text2)', cursor:syncing?'not-allowed':'pointer', transition:'all .3s' }}>
            {syncing ? '⏳ Syncing...' : syncDone ? '✅ Synced!' : '🔄 Sync Calendar'}
          </button>
          <button onClick={() => setShowModal(true)} className="save-btn" style={{ display:'flex', alignItems:'center', gap:6 }}>
            + Schedule New
          </button>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20, gap:12 }}>
        <div className="meetings-filter-tabs" style={{ display:'flex', gap:4, background:'var(--bg)', borderRadius:9, padding:4, border:'1px solid var(--border)' }}>
          {['All','Ongoing','Upcoming','Past'].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ padding:'6px 16px', borderRadius:7, border:'none', background:filter===f?'var(--blue)':'transparent', color:filter===f?'#fff':'var(--text2)', fontSize:12.5, fontWeight:600, cursor:'pointer', transition:'all .2s' }}>{f}</button>
          ))}
        </div>
        <div style={{ display:'flex', gap:10 }}>
          <button style={{ padding:'8px 14px', borderRadius:9, border:'1px solid var(--border)', background:'var(--bg)', fontSize:12, color:'var(--text2)', cursor:'pointer' }}>⚙ Filter</button>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search meetings..."
            style={{ padding:'8px 14px', borderRadius:9, border:'1px solid var(--border)', background:'var(--bg)', fontSize:12, color:'var(--text)', outline:'none', width:220 }} />
        </div>
      </div>

      {/* Cards */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(min(280px, 100%), 1fr))', gap:16 }}>
        {filtered.map((m,i) => (
          <div key={i} style={{ background:'var(--card)', borderRadius:14, border:'1px solid var(--border)', padding:'18px', boxShadow:'var(--shadow-sm)', transition:'all .2s', animation:'fadeUp .3s ease both', animationDelay:i*.05+'s' }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:12 }}>
              <div>
                {m.status==='live' && <span style={{ background:'#fee2e2', color:'#ef4444', fontSize:10, fontWeight:700, padding:'3px 9px', borderRadius:20, display:'inline-flex', alignItems:'center', gap:4 }}><span style={{ width:6, height:6, borderRadius:'50%', background:'#ef4444' }} />LIVE NOW</span>}
                {m.status==='today' && <span style={{ background:'#eff6ff', color:'#3b82f6', fontSize:10, fontWeight:700, padding:'3px 9px', borderRadius:20 }}>Today</span>}
                {m.status==='upcoming' && <span style={{ background:'var(--bg)', color:'var(--text2)', fontSize:10, fontWeight:600, padding:'3px 9px', borderRadius:20, border:'1px solid var(--border)' }}>{m.date}</span>}
              </div>
              <div style={{ fontSize:11.5, fontWeight:600, color:m.platform==='Zoom'?'#2D8CFF':'#34A853', display:'flex', alignItems:'center', gap:4 }}>
                {m.platform==='Zoom'?'📹':'🎥'} {m.platform}
              </div>
            </div>
            <div style={{ fontSize:14, fontWeight:800, color:'var(--text)', marginBottom:6 }}>{m.title}</div>
            <div style={{ fontSize:12, color:'var(--muted)', marginBottom:14 }}>🕐 {m.time}</div>
            <div style={{ display:'flex', alignItems:'center', marginBottom:14 }}>
              {m.participants.map((c,j) => (
                <div key={j} style={{ width:28, height:28, borderRadius:'50%', background:c, border:'2px solid var(--card)', marginLeft:j>0?-8:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:9, fontWeight:700, color:'#fff' }}>
                  {['J','K','L','D','A'][j%5]}
                </div>
              ))}
              {m.extra>0 && <div style={{ width:28, height:28, borderRadius:'50%', background:'var(--bg2)', border:'2px solid var(--card)', marginLeft:-8, display:'flex', alignItems:'center', justifyContent:'center', fontSize:9, fontWeight:700, color:'var(--text2)' }}>+{m.extra}</div>}
            </div>
            {m.status==='live' ? (
              <div style={{ display:'flex', gap:8 }}>
                <button onClick={() => setActiveMeeting(m)} style={{ flex:1, padding:'9px', borderRadius:8, background:'var(--blue)', color:'#fff', border:'none', fontSize:12.5, fontWeight:700, cursor:'pointer' }}>Join Now</button>
                <button style={{ width:36, height:36, borderRadius:8, background:'var(--bg)', border:'1px solid var(--border)', cursor:'pointer', fontSize:14, display:'flex', alignItems:'center', justifyContent:'center' }}>👥</button>
                <button style={{ width:36, height:36, borderRadius:8, background:'var(--bg)', border:'1px solid var(--border)', cursor:'pointer', fontSize:14, display:'flex', alignItems:'center', justifyContent:'center' }}>📄</button>
              </div>
            ) : (
              <div style={{ display:'flex', gap:8 }}>
                <button onClick={() => toast_('Meeting details: ' + m.title + ' on ' + m.date)} style={{ flex:1, padding:'9px', borderRadius:8, background:'var(--bg)', color:'var(--text2)', border:'1px solid var(--border)', fontSize:12.5, fontWeight:600, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:5 }}>→ Details</button>
                <button style={{ width:36, height:36, borderRadius:8, background:'var(--bg)', border:'1px solid var(--border)', cursor:'pointer', fontSize:14, display:'flex', alignItems:'center', justifyContent:'center' }}>👥</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Schedule Modal */}
      {showModal && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.5)', zIndex:2000, display:'flex', alignItems:'center', justifyContent:'center', padding:20, backdropFilter:'blur(4px)' }}
          onClick={e => e.target===e.currentTarget && setShowModal(false)}>
          <div style={{ background:'var(--card)', borderRadius:18, width:'100%', maxWidth:520, border:'1px solid var(--border)', boxShadow:'var(--shadow-lg)', animation:'scaleIn .2s ease both' }}>
            <div style={{ display:'flex', justifyContent:'space-between', padding:'20px 24px', borderBottom:'1px solid var(--border)' }}>
              <div style={{ fontSize:16, fontWeight:800 }}>Schedule New Meeting</div>
              <button onClick={() => setShowModal(false)} style={{ background:'none', border:'none', fontSize:20, cursor:'pointer', color:'var(--muted)' }}>✕</button>
            </div>
            <div style={{ padding:'20px 24px', display:'flex', flexDirection:'column', gap:14 }}>
              <div className="form-grp"><label className="form-lbl">Meeting Title *</label><input className="form-inp" placeholder="eg: Sprint Planning" value={form.title} onChange={e => setForm({...form,title:e.target.value})} /></div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:12 }}>
                <div className="form-grp"><label className="form-lbl">Date *</label><input className="form-inp" type="date" value={form.date} onChange={e => setForm({...form,date:e.target.value})} /></div>
                <div className="form-grp"><label className="form-lbl">Start Time</label><input className="form-inp" type="time" value={form.startTime} onChange={e => setForm({...form,startTime:e.target.value})} /></div>
                <div className="form-grp"><label className="form-lbl">End Time</label><input className="form-inp" type="time" value={form.endTime} onChange={e => setForm({...form,endTime:e.target.value})} /></div>
              </div>
              <div className="form-grp"><label className="form-lbl">Platform</label>
                <div style={{ display:'flex', gap:8 }}>
                  {['Google Meet','Zoom','Teams'].map(p => (
                    <button key={p} onClick={() => setForm({...form,platform:p})} style={{ flex:1, padding:'9px', borderRadius:9, border:form.platform===p?'2px solid var(--blue)':'1px solid var(--border)', background:form.platform===p?'var(--active)':'var(--bg)', color:form.platform===p?'var(--blue)':'var(--text2)', fontSize:12, fontWeight:600, cursor:'pointer' }}>{p}</button>
                  ))}
                </div>
              </div>
              <div className="form-grp"><label className="form-lbl">Participants</label><input className="form-inp" placeholder="Enter emails separated by commas" value={form.participants} onChange={e => setForm({...form,participants:e.target.value})} /></div>
            </div>
            <div style={{ display:'flex', gap:12, padding:'16px 24px', borderTop:'1px solid var(--border)' }}>
              <button onClick={() => setShowModal(false)} className="card-act" style={{ flex:1, padding:11, fontSize:13 }}>Cancel</button>
              <button onClick={schedule} className="save-btn" style={{ flex:2 }}>Schedule Meeting</button>
            </div>
          </div>
        </div>
      )}

      {toast && <div style={{ position:'fixed', bottom:24, right:24, background:'#22c55e', color:'#fff', padding:'12px 20px', borderRadius:10, fontWeight:600, fontSize:13, zIndex:9999, animation:'fadeUp .25s ease both' }}>{toast}</div>}
    </div>
  );
}