import React, { useState } from 'react';
import { MEETINGS_DATA } from '../data/mockData';

const TYPE_COLORS = { Planning:'#3b82f6', Review:'#a855f7', Sync:'#f59e0b', Retro:'#22c55e', Technical:'#ef4444', Strategic:'#6366f1' };

export default function Meetings() {
  const [meetings, setMeetings] = useState(() => {
    const saved = localStorage.getItem('coadmin_meetings');
    return saved ? JSON.parse(saved) : MEETINGS_DATA;
  });
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title:'', date:'', time:'', attendees:'5', type:'Planning' });
  const [toast, setToast] = useState('');

  const save = (data) => { localStorage.setItem('coadmin_meetings', JSON.stringify(data)); };

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const addMeeting = () => {
    if (!form.title || !form.date || !form.time) { showToast('⚠️ Please fill all required fields'); return; }
    const d = new Date(form.date + 'T00:00:00');
    const dateStr = d.toLocaleDateString('en-US', { weekday:'short', month:'short', day:'numeric' });
    const t = new Date('2000-01-01T' + form.time);
    const timeStr = t.toLocaleTimeString('en-US', { hour:'numeric', minute:'2-digit' });
    const newMeeting = { title:form.title, date:dateStr, time:timeStr, attendees:parseInt(form.attendees)||5, type:form.type, color:TYPE_COLORS[form.type]||'#3b82f6' };
    const updated = [newMeeting, ...meetings];
    setMeetings(updated); save(updated);
    setShowModal(false);
    setForm({ title:'', date:'', time:'', attendees:'5', type:'Planning' });
    showToast('✅ Meeting scheduled!');
  };

  const deleteMeeting = (i) => {
    const updated = meetings.filter((_, idx) => idx !== i);
    setMeetings(updated); save(updated);
    showToast('🗑️ Meeting removed');
  };

  return (
    <div style={{ padding:'22px 24px 0' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20 }}>
        <div className="pg-name">Meetings</div>
        <button className="save-btn" onClick={() => setShowModal(true)}>+ Schedule Meeting</button>
      </div>

      <div className="card">
        <div className="card-head">
          <div className="card-title">Upcoming Meetings</div>
        </div>
        <div id="meetingList">
          {meetings.map((m, i) => (
            <div key={i} className="meeting-card">
              <div className="mtg-dot" style={{ background: m.color }} />
              <div className="mtg-body">
                <div className="mtg-title">{m.title}</div>
                <div className="mtg-meta">📅 {m.date} · 🕐 {m.time} · 👥 {m.attendees} attendees</div>
              </div>
              <span className="mtg-badge" style={{ background: m.color + '18', color: m.color }}>{m.type}</span>
              <button
                onClick={() => deleteMeeting(i)}
                style={{ marginLeft:10, background:'var(--red-l)', color:'var(--red)', border:'none', borderRadius:6, padding:'5px 10px', fontSize:11, cursor:'pointer', fontWeight:600 }}
              >✕</button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.5)', zIndex:2000, display:'flex', alignItems:'center', justifyContent:'center', padding:20, backdropFilter:'blur(4px)' }}
          onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div style={{ background:'var(--card)', borderRadius:16, padding:28, width:'100%', maxWidth:440, border:'1px solid var(--border)' }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:20 }}>
              <div style={{ fontSize:15, fontWeight:800, color:'var(--text)' }}>📅 Schedule Meeting</div>
              <button onClick={() => setShowModal(false)} style={{ background:'none', border:'none', fontSize:20, cursor:'pointer', color:'var(--muted)' }}>✕</button>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              <div className="form-grp"><label className="form-lbl">Title *</label>
                <input className="form-inp" placeholder="Meeting title" value={form.title} onChange={e => setForm({...form, title:e.target.value})} /></div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                <div className="form-grp"><label className="form-lbl">Date *</label>
                  <input className="form-inp" type="date" value={form.date} onChange={e => setForm({...form, date:e.target.value})} /></div>
                <div className="form-grp"><label className="form-lbl">Time *</label>
                  <input className="form-inp" type="time" value={form.time} onChange={e => setForm({...form, time:e.target.value})} /></div>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                <div className="form-grp"><label className="form-lbl">Attendees</label>
                  <input className="form-inp" type="number" min="1" value={form.attendees} onChange={e => setForm({...form, attendees:e.target.value})} /></div>
                <div className="form-grp"><label className="form-lbl">Type</label>
                  <select className="form-inp" value={form.type} onChange={e => setForm({...form, type:e.target.value})}>
                    {Object.keys(TYPE_COLORS).map(t => <option key={t}>{t}</option>)}
                  </select></div>
              </div>
            </div>
            <div style={{ marginTop:20, display:'flex', gap:10 }}>
              <button className="save-btn" style={{ flex:1 }} onClick={addMeeting}>Schedule Meeting</button>
              <button className="card-act" style={{ flex:1, padding:11 }} onClick={() => setShowModal(false)}>Cancel</button>
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