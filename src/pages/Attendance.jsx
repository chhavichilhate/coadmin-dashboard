import React, { useState } from 'react';
import { ATTENDANCE, LEAVE_REQUESTS } from '../data/mockData';

export default function Attendance() {
  const [leaves, setLeaves] = useState(() => {
    const s = localStorage.getItem('coadmin_leaves');
    return s ? JSON.parse(s) : LEAVE_REQUESTS;
  });
  const [toast, setToast] = useState({ msg:'', type:'success' });

  const save = (data) => localStorage.setItem('coadmin_leaves', JSON.stringify(data));
  const showToast = (msg, type='success') => { setToast({ msg, type }); setTimeout(() => setToast({ msg:'', type:'success' }), 3000); };

  const approve = (i) => {
    const updated = leaves.map((l, idx) => idx === i ? { ...l, status:'Approved', sc:'#22c55e' } : l);
    setLeaves(updated); save(updated);
    showToast('Leave approved for ' + leaves[i].name + ' ✓');
  };

  const reject = (i) => {
    const updated = leaves.map((l, idx) => idx === i ? { ...l, status:'Rejected', sc:'#ef4444' } : l);
    setLeaves(updated); save(updated);
    showToast('Leave rejected for ' + leaves[i].name, 'error');
  };

  return (
    <div style={{ padding:'22px 24px 0' }}>
      <div className="pg-name" style={{ marginBottom:20 }}>Attendance &amp; Leave</div>

      {/* Attendance Table */}
      <div className="card mb">
        <div className="card-head"><div className="card-title">Monthly Attendance</div></div>
        <div className="tbl-wrap">
          <table className="tbl">
            <thead>
              <tr><th>Employee</th><th>Department</th><th>Present</th><th>Absent</th><th>Late</th><th>Leave</th><th>Status</th></tr>
            </thead>
            <tbody>
              {ATTENDANCE.map((a, i) => (
                <tr key={i}>
                  <td>
                    <div className="own">
                      <div className="own-av" style={{ background: a.color }}>{a.init}</div>
                      <span>{a.name}</span>
                    </div>
                  </td>
                  <td>{a.dept}</td>
                  <td style={{ color:'var(--green)', fontWeight:700 }}>{a.present}</td>
                  <td style={{ color:'var(--red)',   fontWeight:700 }}>{a.absent}</td>
                  <td style={{ color:'var(--amber)', fontWeight:700 }}>{a.late}</td>
                  <td style={{ color:'var(--blue)',  fontWeight:700 }}>{a.leave}</td>
                  <td>
                    <span className="pill" style={{
                      background: a.status==='Active' ? 'var(--green-l)' : 'var(--amber-l)',
                      color:      a.status==='Active' ? 'var(--green)'   : 'var(--amber)'
                    }}>{a.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Leave Requests */}
      <div className="card mb">
        <div className="card-head"><div className="card-title">Leave Requests</div></div>
        <div id="leaveReqList">
          {leaves.map((l, i) => (
            <div key={i} className="card mb" style={{ display:'flex', alignItems:'center', gap:14 }}>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, fontWeight:700, color:'var(--text)' }}>{l.name}</div>
                <div style={{ fontSize:11.5, color:'var(--muted)' }}>{l.type} · {l.from} → {l.to} ({l.days} days)</div>
              </div>
              {l.status === 'Pending' ? (
                <>
                  <button onClick={() => approve(i)} style={{ background:'var(--green-l)', color:'var(--green)', border:'none', borderRadius:6, padding:'6px 13px', fontSize:11, fontWeight:700, cursor:'pointer' }}>✓ Approve</button>
                  <button onClick={() => reject(i)}  style={{ background:'var(--red-l)',   color:'var(--red)',   border:'none', borderRadius:6, padding:'6px 13px', fontSize:11, fontWeight:700, cursor:'pointer' }}>✕ Reject</button>
                </>
              ) : (
                <span className="pill" style={{ background:l.sc+'18', color:l.sc }}>{l.status}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {toast.msg && (
        <div style={{ position:'fixed', bottom:24, right:24, background: toast.type==='error'?'#ef4444':'#22c55e', color:'#fff', padding:'12px 20px', borderRadius:10, fontWeight:600, fontSize:13, zIndex:9999 }}>
          {toast.msg}
        </div>
      )}
    </div>
  );
}