import React, { useState, useRef, useEffect } from 'react';

const CONTACTS = [
  { id:0, name:'Ananya P',  init:'A', color:'#ef4444', time:'Nov 5',  msg:'Can we meet today?',       unread:2 },
  { id:1, name:'Rohit K',   init:'R', color:'#a855f7', time:'Nov 6',  msg:'Sent you the documents.',  unread:0 },
  { id:2, name:'Priya L',   init:'P', color:'#ec4899', time:'Nov 7',  msg:'Thanks for your help!',    unread:4 },
  { id:3, name:'Vikram S',  init:'V', color:'#22c55e', time:'Nov 8',  msg:"Let's catch up soon.",     unread:0 },
  { id:4, name:'Neha M',    init:'N', color:'#3b82f6', time:'Nov 9',  msg:'Call me when free.',       unread:1 },
  { id:5, name:'Amit R',    init:'A', color:'#f59e0b', time:'Nov 10', msg:'Working on the project.',  unread:0 },
  { id:6, name:'Shreya D',  init:'S', color:'#6366f1', time:'Nov 11', msg:'Good night!',              unread:3 },
  { id:7, name:'Rahul P',   init:'R', color:'#14b8a6', time:'Nov 12', msg:"Let's finalize this.",     unread:0 },
];

const INIT_MESSAGES = {
  0: [{ from:'Ananya P', init:'A', color:'#ef4444', text:'Can we meet today?',      time:'10:30 AM', mine:false }],
  1: [{ from:'Rohit K',  init:'R', color:'#a855f7', text:'Sent you the documents.', time:'9:00 AM',  mine:false }],
  2: [{ from:'Priya L',  init:'P', color:'#ec4899', text:'Thanks for your help!',   time:'8:00 AM',  mine:false }],
  3: [{ from:'Vikram S', init:'V', color:'#22c55e', text:"Let's catch up soon.",    time:'Yesterday',mine:false }],
  4: [{ from:'Neha M',   init:'N', color:'#3b82f6', text:'Call me when free.',      time:'Yesterday',mine:false }],
};

const AUTO_REPLIES = ['Got it! 👍','Sure thing!','Will do!','On it!','Noted, thanks!','Sounds good! 😊','I will get back to you shortly.','Perfect, thanks!'];

export default function Chat() {
  const [search,      setSearch]      = useState('');
  const [active,      setActive]      = useState(null);
  const [messages,    setMessages]    = useState(INIT_MESSAGES);
  const [input,       setInput]       = useState('');
  const [contacts,    setContacts]    = useState(CONTACTS);
  const [showNew,     setShowNew]     = useState(false);
  const [newName,     setNewName]     = useState('');
  const [calling,     setCalling]     = useState(false);
  const [callType,    setCallType]    = useState('');
  const [msgMenu,     setMsgMenu]     = useState(null);
  const [toast,       setToast]       = useState('');
  const msgRef = useRef(null);

  useEffect(() => {
    if (msgRef.current) msgRef.current.scrollTop = msgRef.current.scrollHeight;
  }, [messages, active]);

  const toast_ = (msg) => { setToast(msg); setTimeout(() => setToast(''), 2500); };

  const filtered = contacts.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const send = () => {
    if (!input.trim() || active === null) return;
    const text = input.trim(); setInput('');
    const now = new Date().toLocaleTimeString('en-US', { hour:'numeric', minute:'2-digit' });
    setMessages(prev => ({ ...prev, [active]: [...(prev[active]||[]), { from:'You', init:'JD', color:'#3b82f6', text, time:now, mine:true }] }));
    setContacts(prev => prev.map((c,i) => i===active ? {...c, msg:text, time:now} : c));
    setTimeout(() => {
      const reply = AUTO_REPLIES[Math.floor(Math.random()*AUTO_REPLIES.length)];
      const t2 = new Date().toLocaleTimeString('en-US', { hour:'numeric', minute:'2-digit' });
      const contact = contacts[active];
      setMessages(prev => ({ ...prev, [active]: [...(prev[active]||[]), { from:contact.name, init:contact.init, color:contact.color, text:reply, time:t2, mine:false }] }));
      setContacts(prev => prev.map((c,i) => i===active ? {...c, msg:reply, time:t2} : c));
    }, 1200);
  };

  // ── New Chat ──
  const createNewChat = () => {
    if (!newName.trim()) { toast_('Please enter a name'); return; }
    const colors = ['#ef4444','#3b82f6','#22c55e','#f59e0b','#a855f7','#14b8a6'];
    const newContact = { id:contacts.length, name:newName, init:newName[0].toUpperCase(), color:colors[contacts.length%colors.length], time:'Now', msg:'New conversation', unread:0 };
    setContacts(prev => [newContact, ...prev]);
    setMessages(prev => ({ ...prev, [0]: [] }));
    setShowNew(false); setNewName('');
    setActive(0);
    toast_('✅ New chat created!');
  };

  // ── Call ──
  const startCall = (type) => {
    setCallType(type); setCalling(true);
    toast_(`📞 ${type === 'voice' ? 'Voice' : 'Video'} call started with ${contacts[active]?.name}`);
    setTimeout(() => setCalling(false), 4000);
  };

  // ── Message options ──
  const deleteMsg = (msgIdx) => {
    setMessages(prev => ({
      ...prev,
      [active]: prev[active].filter((_, i) => i !== msgIdx)
    }));
    setMsgMenu(null);
    toast_('Message deleted');
  };

  const copyMsg = (text) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setMsgMenu(null);
    toast_('✅ Copied to clipboard!');
  };

  return (
    <div style={{ padding:'22px 24px 0', height:'calc(100vh - 62px)', display:'flex', flexDirection:'column' }}>
      <div style={{ display:'flex', gap:0, flex:1, background:'var(--card)', borderRadius:14, border:'1px solid var(--border)', overflow:'hidden', boxShadow:'var(--shadow)' }}>

        {/* LEFT: Contact List */}
        <div style={{ width:300, flexShrink:0, borderRight:'1px solid var(--border)', display:'flex', flexDirection:'column' }}>

          {/* Header */}
          <div style={{ padding:'18px 18px 12px', borderBottom:'1px solid var(--border)' }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12 }}>
              <div style={{ fontSize:18, fontWeight:800, color:'var(--text)' }}>Chat</div>
              <button style={{ background:'none', border:'none', cursor:'pointer', fontSize:18, color:'var(--muted)' }}>⋯</button>
            </div>
            <div style={{ position:'relative' }}>
              <span style={{ position:'absolute', left:10, top:'50%', transform:'translateY(-50%)', fontSize:13, color:'var(--muted)' }}>🔍</span>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search"
                style={{ width:'100%', padding:'8px 12px 8px 32px', borderRadius:9, border:'1.5px solid var(--border)', background:'var(--bg)', color:'var(--text)', fontSize:12.5, outline:'none' }} />
            </div>
          </div>

          {/* Contacts */}
          <div style={{ flex:1, overflowY:'auto' }}>
            {filtered.map((c,i) => (
              <div key={i} onClick={() => { setActive(i); setContacts(prev => prev.map((ct,j) => j===i ? {...ct,unread:0} : ct)); }}
                style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 16px', cursor:'pointer', background: active===i?'var(--active)':'transparent', borderBottom:'1px solid var(--border)', transition:'background .15s' }}>
                <div style={{ width:42, height:42, borderRadius:'50%', background:c.color, display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, fontWeight:800, color:'#fff', flexShrink:0 }}>
                  {c.init}
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:13, fontWeight:600, color:'var(--text)' }}>{c.name}</div>
                  <div style={{ fontSize:11.5, color:'var(--muted)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{c.msg}</div>
                </div>
                <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:5, flexShrink:0 }}>
                  <span style={{ fontSize:10.5, color:'var(--muted)' }}>{c.time}</span>
                  {c.unread > 0 && <span style={{ width:18, height:18, borderRadius:'50%', background:'#3b82f6', color:'#fff', fontSize:9.5, fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center' }}>{c.unread}</span>}
                </div>
              </div>
            ))}
          </div>

          {/* ✏️ Pencil — New Chat */}
          <div style={{ padding:'12px', borderTop:'1px solid var(--border)', display:'flex', justifyContent:'flex-end' }}>
            <button onClick={() => setShowNew(true)} title="New Conversation"
              style={{ width:42, height:42, borderRadius:'50%', background:'#3b82f6', border:'none', color:'#fff', fontSize:18, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 4px 12px rgba(59,130,246,.4)', transition:'transform .2s' }}>
              ✏️
            </button>
          </div>
        </div>

        {/* RIGHT */}
        {active === null ? (
          <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', background:'var(--bg)', position:'relative', overflow:'hidden' }}>
            <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:.12 }} viewBox="0 0 800 500">
              {[{x:100,y:80,r:30},{x:200,y:150,r:20},{x:400,y:60,r:25},{x:600,y:100,r:35},{x:700,y:200,r:20},{x:150,y:280,r:22},{x:350,y:320,r:18},{x:550,y:250,r:28},{x:650,y:380,r:24},{x:750,y:300,r:16},{x:80,y:420,r:20},{x:280,y:440,r:26},{x:480,y:420,r:22},{x:700,y:440,r:18}].map((c,i) => (
                <circle key={i} cx={c.x} cy={c.y} r={c.r} fill="none" stroke="#3b82f6" strokeWidth="1.5"/>
              ))}
            </svg>
            <div style={{ textAlign:'center', zIndex:1 }}>
              <div style={{ fontSize:36, marginBottom:10 }}>💬</div>
              <div style={{ fontSize:14, fontWeight:600, color:'var(--text2)' }}>Select a conversation to start chatting</div>
            </div>
          </div>
        ) : (
          <div style={{ flex:1, display:'flex', flexDirection:'column' }}>
            {/* Chat Header */}
            <div style={{ padding:'14px 18px', borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', gap:12, flexShrink:0, background:'var(--card)' }}>
              <div style={{ width:38, height:38, borderRadius:'50%', background:contacts[active].color, display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:800, color:'#fff' }}>
                {contacts[active].init}
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:14, fontWeight:700, color:'var(--text)' }}>{contacts[active].name}</div>
                <div style={{ fontSize:11, color:'#22c55e' }}>● Online</div>
              </div>
              {/* ── Working Header Buttons ── */}
              <div style={{ display:'flex', gap:8 }}>
                {/* Voice Call */}
                <button onClick={() => startCall('voice')} title="Voice Call"
                  style={{ width:36, height:36, borderRadius:9, background:'var(--bg)', border:'1px solid var(--border)', cursor:'pointer', fontSize:16, display:'flex', alignItems:'center', justifyContent:'center', transition:'all .2s' }}>
                  📞
                </button>
                {/* Video Call */}
                <button onClick={() => startCall('video')} title="Video Call"
                  style={{ width:36, height:36, borderRadius:9, background:'var(--bg)', border:'1px solid var(--border)', cursor:'pointer', fontSize:16, display:'flex', alignItems:'center', justifyContent:'center', transition:'all .2s' }}>
                  📹
                </button>
                {/* Options Menu */}
                <button onClick={() => toast_('Options: Mute, Block, Clear chat')} title="More Options"
                  style={{ width:36, height:36, borderRadius:9, background:'var(--bg)', border:'1px solid var(--border)', cursor:'pointer', fontSize:16, display:'flex', alignItems:'center', justifyContent:'center', transition:'all .2s' }}>
                  ⋯
                </button>
              </div>
            </div>

            {/* ── Call Overlay ── */}
            {calling && (
              <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', background:'var(--card)', border:'1px solid var(--border)', borderRadius:16, padding:'24px 32px', textAlign:'center', boxShadow:'var(--shadow-lg)', zIndex:500 }}>
                <div style={{ fontSize:40, marginBottom:8 }}>{callType==='voice'?'📞':'📹'}</div>
                <div style={{ fontSize:14, fontWeight:700, color:'var(--text)', marginBottom:4 }}>
                  {callType==='voice'?'Voice':'Video'} calling {contacts[active]?.name}...
                </div>
                <div style={{ fontSize:12, color:'var(--muted)', marginBottom:16 }}>Ringing...</div>
                <button onClick={() => setCalling(false)} style={{ padding:'9px 24px', borderRadius:20, background:'#ef4444', color:'#fff', border:'none', fontSize:13, fontWeight:700, cursor:'pointer' }}>
                  End Call
                </button>
              </div>
            )}

            {/* Messages */}
            <div ref={msgRef} style={{ flex:1, overflowY:'auto', padding:'16px 18px', display:'flex', flexDirection:'column', gap:12, background:'var(--bg)' }}
              onClick={() => setMsgMenu(null)}>
              {(messages[active]||[]).map((m,i) => (
                <div key={i} style={{ display:'flex', alignItems:'flex-end', gap:8, flexDirection:m.mine?'row-reverse':'row', position:'relative' }}>
                  <div style={{ width:28, height:28, borderRadius:'50%', background:m.color, display:'flex', alignItems:'center', justifyContent:'center', fontSize:9, fontWeight:800, color:'#fff', flexShrink:0 }}>
                    {m.init}
                  </div>
                  <div
                    onContextMenu={e => { e.preventDefault(); setMsgMenu(i); }}
                    style={{ maxWidth:'65%', padding:'10px 14px', borderRadius:14, fontSize:13, lineHeight:1.5, background:m.mine?'#3b82f6':'var(--card)', color:m.mine?'#fff':'var(--text)', boxShadow:'var(--shadow-sm)', borderBottomRightRadius:m.mine?4:14, borderBottomLeftRadius:m.mine?14:4, cursor:'context-menu' }}>
                    {m.text}
                  </div>
                  <span style={{ fontSize:10, color:'var(--muted)', flexShrink:0 }}>{m.time}</span>

                  {/* Right-click message menu */}
                  {msgMenu === i && (
                    <div style={{ position:'absolute', [m.mine?'right':'left']:40, bottom:0, background:'var(--card)', border:'1px solid var(--border)', borderRadius:10, boxShadow:'var(--shadow-lg)', zIndex:100, minWidth:140, overflow:'hidden' }}>
                      <button onClick={() => copyMsg(m.text)} style={{ display:'block', width:'100%', padding:'10px 16px', background:'none', border:'none', textAlign:'left', fontSize:12.5, cursor:'pointer', color:'var(--text)', fontFamily:'var(--font)' }}>📋 Copy</button>
                      <button onClick={() => deleteMsg(i)} style={{ display:'block', width:'100%', padding:'10px 16px', background:'none', border:'none', textAlign:'left', fontSize:12.5, cursor:'pointer', color:'var(--red)', fontFamily:'var(--font)' }}>🗑️ Delete</button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Input */}
            <div style={{ padding:'12px 16px', borderTop:'1px solid var(--border)', display:'flex', gap:10, flexShrink:0, background:'var(--card)' }}>
              <button onClick={() => toast_('📎 File attachment coming soon!')} style={{ background:'var(--bg)', border:'1px solid var(--border)', borderRadius:9, padding:'8px 10px', cursor:'pointer', fontSize:16 }}>📎</button>
              <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key==='Enter' && send()} placeholder="Type a message..."
                style={{ flex:1, padding:'10px 14px', borderRadius:22, border:'1.5px solid var(--border)', background:'var(--bg)', color:'var(--text)', fontSize:13, outline:'none' }} />
              <button onClick={send} style={{ width:42, height:42, borderRadius:'50%', background:'#3b82f6', border:'none', color:'#fff', fontSize:16, cursor:'pointer', flexShrink:0 }}>➤</button>
            </div>
          </div>
        )}
      </div>

      {/* ── New Chat Modal ── */}
      {showNew && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.5)', zIndex:2000, display:'flex', alignItems:'center', justifyContent:'center', backdropFilter:'blur(4px)' }}
          onClick={e => e.target===e.currentTarget && setShowNew(false)}>
          <div style={{ background:'var(--card)', borderRadius:16, padding:28, width:360, border:'1px solid var(--border)', boxShadow:'var(--shadow-lg)' }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:20 }}>
              <div style={{ fontSize:15, fontWeight:800, color:'var(--text)' }}>✏️ New Conversation</div>
              <button onClick={() => setShowNew(false)} style={{ background:'none', border:'none', fontSize:20, cursor:'pointer', color:'var(--muted)' }}>✕</button>
            </div>
            <div className="form-grp" style={{ marginBottom:16 }}>
              <label className="form-lbl">Contact Name *</label>
              <input className="form-inp" placeholder="Enter name..." value={newName} onChange={e => setNewName(e.target.value)} onKeyDown={e => e.key==='Enter' && createNewChat()} autoFocus />
            </div>
            <div style={{ display:'flex', gap:10 }}>
              <button onClick={() => setShowNew(false)} className="card-act" style={{ flex:1, padding:11 }}>Cancel</button>
              <button onClick={createNewChat} className="save-btn" style={{ flex:2 }}>Start Chat</button>
            </div>
          </div>
        </div>
      )}

      {toast && <div style={{ position:'fixed', bottom:90, right:24, background:'#1e293b', color:'#fff', padding:'10px 20px', borderRadius:10, fontWeight:600, fontSize:12.5, zIndex:9999, animation:'fadeUp .2s ease' }}>{toast}</div>}
    </div>
  );
}