// src/components/coadmin/DashboardSection.jsx
import React, { useEffect, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, BarController, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js';

// Register ALL needed components
ChartJS.register(CategoryScale, LinearScale, BarElement, BarController, DoughnutController, ArcElement, Tooltip, Legend);

const STATS = [
  { label:'Total Tasks', value:142, change:'+5%',  up:true,  icon:'📋', ic:'#eff6ff' },
  { label:'Completed',   value:89,  change:'+12%', up:true,  icon:'✅', ic:'#f0fdf4' },
  { label:'In Progress', value:89,  change:'+3%',  up:true,  icon:'🔄', ic:'#eff6ff' },
  { label:'Backlog',     value:11,  change:'-2%',  up:false, icon:'⏳', ic:'#fff7ed' },
  { label:'Risk Level',  value:'Moderate', change:'', up:null, icon:'⚠️', ic:'#fffbeb' },
];

const PROJECT_PROGRESS = [
  { name:'Sarah Jenkins', pct:100, color:'#ef4444', label:'Over!'    },
  { name:'Mike Ross',     pct:85,  color:'#22c55e', label:'Optimal'  },
  { name:'Jessica Chang', pct:92,  color:'#3b82f6', label:'High'     },
  { name:'David Kim',     pct:60,  color:'#94a3b8', label:'Available'},
];

// data hardcoded in components below

/* ══ Sprint Health Donut — Green DOMINANT like screenshot ══ */
function SprintDonut() {
  const ref   = useRef(null);
  const chart = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    if (chart.current) { chart.current.destroy(); chart.current = null; }

    const ctx = ref.current.getContext('2d');
    chart.current = new ChartJS(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Healthy','Planned','Remaining'],
        // Screenshot: Green (Healthy) is BIGGEST — about 70%
        // Blue (Planned) is medium — about 20%
        // Gray (Remaining) is small — about 10%
        datasets: [{
          data: [70, 20, 10],
          backgroundColor: ['#22c55e', '#3b82f6', '#e2e8f0'],
          borderWidth: 0,
          hoverBorderWidth: 0,
        }]
      },
      options: {
        cutout: '68%',
        plugins: { legend: { display: false } },
        animation: { duration: 700 }
      }
    });
    return () => { if (chart.current) { chart.current.destroy(); chart.current = null; } };
  }, []);

  return (
    <div style={{ display:'flex', alignItems:'center', gap:32 }}>
      <div style={{ width:130, height:130, position:'relative', flexShrink:0 }}>
        <canvas ref={ref} />
        <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', textAlign:'center' }}>
          <div style={{ fontSize:22, fontWeight:800, color:'var(--text)', lineHeight:1 }}>90%</div>
          <div style={{ fontSize:10, color:'var(--muted)', marginTop:2 }}>Adherence</div>
        </div>
      </div>
      <div style={{ display:'flex', flexDirection:'row', gap:12 }}>
        {[
          { c:'#22c55e', l:'Healthy'   },
          { c:'#3b82f6', l:'Planned'   },
          { c:'#e2e8f0', l:'Remaining' },
        ].map((x,i) => (
          <div key={i} style={{ display:'flex', alignItems:'center', gap:8, fontSize:13, color:'var(--text2)' }}>
            <div style={{ width:9, height:9, borderRadius:'50%', background:x.c, flexShrink:0 }} />
            {x.l}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══ Team Bar Chart — canvas directly, guaranteed bars ══ */
function TeamBarChart() {
  const ref   = useRef(null);
  const chart = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    if (chart.current) { chart.current.destroy(); chart.current = null; }

    const ctx = ref.current.getContext('2d');
    chart.current = new ChartJS(ctx, {
      type: 'bar',
      data: {
        labels: ['Sarah', 'Mike', 'Jess', 'David'],
        datasets: [
          {
            label: 'Tasks Completed',
            data: [28, 20, 32, 16],
            backgroundColor: '#3b82f6',
            borderRadius: 6,
            borderSkipped: false,
            barPercentage: 0.6,
            categoryPercentage: 0.7,
          },
          {
            label: 'Avg Time (hrs)',
            data: [16, 20, 14, 25],
            backgroundColor: '#e2e8f0',
            borderRadius: 6,
            borderSkipped: false,
            barPercentage: 0.6,
            categoryPercentage: 0.7,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            align: 'end',
            labels: {
              font: { size: 11 },
              boxWidth: 10,
              boxHeight: 10,
              color: '#64748b',
              padding: 16,
            }
          },
          tooltip: { mode: 'index', intersect: false }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color:'#94a3b8', font:{ size:11 } },
            border: { display: false }
          },
          y: {
            grid: { color:'rgba(0,0,0,.05)', drawTicks:false },
            ticks: { color:'#94a3b8', font:{ size:11 }, maxTicksLimit:5 },
            border: { display: false },
            beginAtZero: true
          }
        }
      }
    });
    return () => { if (chart.current) { chart.current.destroy(); chart.current = null; } };
  }, []);

  return (
    <div style={{ height:210, position:'relative' }}>
      <canvas ref={ref} />
    </div>
  );
}

/* ══ MAIN ══ */
export default function DashboardSection() {
  return (
    <div>

      {/* ── 1. Stat Cards ── */}
      <div className="stats-flex-row" style={{ display:'flex', gap:12, marginBottom:16 }}>
        {STATS.map((s,i) => (
          <div key={i} style={{
            background:'var(--card)', border:'1px solid var(--border)',
            borderRadius:12, padding:'14px 16px',
            flex:1, minWidth:0, position:'relative'
          }}>
            <div style={{ position:'absolute', top:12, right:12, width:28, height:28, borderRadius:7, background:s.ic, display:'flex', alignItems:'center', justifyContent:'center', fontSize:13 }}>
              {s.icon}
            </div>
            <div style={{ fontSize:10.5, fontWeight:600, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'.5px', marginBottom:5 }}>{s.label}</div>
            <div style={{ fontSize:24, fontWeight:800, color:'var(--text)', letterSpacing:'-1px', marginBottom:4, paddingRight:32 }}>{s.value}</div>
            {s.change && (
              <div style={{ fontSize:11, fontWeight:600, color:s.up===true?'#22c55e':s.up===false?'#ef4444':'#94a3b8' }}>
                {s.up===true?'↑':s.up===false?'↓':''} {s.change}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── 2. Sprint Status ── */}
      <div className="card mb">
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:8 }}>
          <div>
            <div style={{ fontSize:15, fontWeight:800, color:'var(--text)' }}>Sprint  Status</div>
            <div style={{ fontSize:12, color:'var(--muted)' }}>Sprint Completion</div>
          </div>
          <div style={{ fontSize:22, fontWeight:800, color:'#3b82f6' }}>62%</div>
        </div>
        <div style={{ height:8, background:'var(--bg2)', borderRadius:10, overflow:'hidden', marginBottom:8 }}>
          <div style={{ height:'100%', width:'62%', background:'linear-gradient(90deg,#3b82f6,#6366f1)', borderRadius:10 }} />
        </div>
        <div style={{ display:'flex', justifyContent:'space-between', fontSize:11.5, color:'var(--muted)' }}>
          <span>Day 8 of 14</span>
          <span>6 days remaining</span>
        </div>
      </div>

      {/* ── 3. Sprint Health Donut ── */}
      <div className="card mb">
        <div style={{ fontSize:15, fontWeight:800, color:'var(--text)', marginBottom:2 }}>Sprint Health</div>
        <div style={{ fontSize:12, color:'var(--muted)', marginBottom:18 }}>(Planned vs Actual)</div>
        <SprintDonut />
      </div>

      {/* ── 4. Project Progress Overview ── */}
      <div className="card mb">
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:4 }}>
          <div>
            <div style={{ fontSize:15, fontWeight:800, color:'var(--text)' }}>Project Progress Overview</div>
            <div style={{ fontSize:12, color:'var(--muted)' }}>Sprint Completion</div>
          </div>
          <button className="card-act">View Details</button>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:14, marginTop:16 }}>
          {PROJECT_PROGRESS.map((p,i) => (
            <div key={i}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
                <span style={{ fontSize:13, fontWeight:600, color:'var(--text)' }}>{p.name}</span>
                <span style={{ fontSize:11.5, fontWeight:700, padding:'2px 10px', borderRadius:10, background:p.color+'20', color:p.color }}>
                  {p.pct}% ({p.label})
                </span>
              </div>
              <div style={{ height:8, background:'var(--bg2)', borderRadius:10, overflow:'hidden' }}>
                <div style={{ height:'100%', width:p.pct+'%', background:p.color, borderRadius:10 }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 5. Team Completed vs Avg Time — BAR CHART ── */}
      <div className="card mb">
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
          <div style={{ fontSize:15, fontWeight:800, color:'var(--text)' }}>Team Completed vs Avg Time</div>
          <div style={{ display:'flex', gap:6 }}>
            <button className="card-act">Workload</button>
            <button className="card-act" style={{ background:'var(--bg)', color:'var(--text2)' }}>Productivity</button>
          </div>
        </div>
        <TeamBarChart />
      </div>

      {/* ── 6. Bottleneck Detection — exactly like Figma ── */}
      <div className="card mb">
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:18 }}>
          <div style={{ fontSize:15, fontWeight:800, color:'var(--text)' }}>Bottleneck Detection</div>
          <span style={{ fontSize:12, color:'var(--muted)' }}>Avg Wait Time</span>
        </div>

        <div style={{ display:'flex', flexDirection:'column', gap:6 }}>

          {/* Row 1 — Backlog */}
          <div style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 0' }}>
            <span style={{ fontSize:12.5, fontWeight:600, color:'var(--text2)', width:100, flexShrink:0 }}>Backlog</span>
            <div style={{ flex:1, height:6, background:'var(--bg2)', borderRadius:10, overflow:'hidden' }}>
              <div style={{ height:'100%', width:'82%', background:'#cbd5e1', borderRadius:10 }} />
            </div>
            <span style={{ fontSize:12, color:'var(--muted)', whiteSpace:'nowrap', textAlign:'right', width:130 }}>42 Tasks &nbsp;&nbsp; 1.2 days</span>
          </div>

          {/* Row 2 — Development (green left border, indented) */}
          <div style={{
            display:'flex', alignItems:'center', gap:10,
            padding:'8px 10px', paddingLeft:14,
            borderLeft:'3px solid #22c55e',
            marginLeft:10,
          }}>
            <span style={{ fontSize:12.5, fontWeight:600, color:'var(--text2)', width:100, flexShrink:0 }}>Development</span>
            <div style={{ flex:1, height:6, background:'var(--bg2)', borderRadius:10, overflow:'hidden' }}>
              <div style={{ height:'100%', width:'55%', background:'#22c55e', borderRadius:10 }} />
            </div>
            <span style={{ fontSize:12, color:'var(--muted)', whiteSpace:'nowrap', textAlign:'right', width:130 }}>28 Tasks &nbsp;&nbsp; 3.5 days</span>
          </div>

          {/* Row 3 — Development STUCK (red warning, more indented) */}
          <div style={{
            display:'flex', alignItems:'center', gap:8,
            padding:'9px 12px',
            marginLeft:24,
            background:'rgba(239,68,68,.07)',
            borderRadius:8,
            border:'1px solid rgba(239,68,68,.18)',
          }}>
            <span style={{ fontSize:14, flexShrink:0 }}>⚠️</span>
            <span style={{ fontSize:12.5, fontWeight:600, color:'var(--text)', width:100, flexShrink:0 }}>Development</span>
            <div style={{ flex:1, height:6, background:'rgba(239,68,68,.15)', borderRadius:10, overflow:'hidden' }}>
              <div style={{ height:'100%', width:'30%', background:'#ef4444', borderRadius:10 }} />
            </div>
            <span style={{ fontSize:12, color:'#ef4444', fontWeight:700, whiteSpace:'nowrap', textAlign:'right', width:140 }}>15 Stuck &nbsp;&nbsp; 5.2 days</span>
          </div>

          {/* Row 4 — Done */}
          <div style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 0' }}>
            <span style={{ fontSize:12.5, fontWeight:600, color:'var(--text2)', width:100, flexShrink:0 }}>Done</span>
            <div style={{ flex:1, height:6, background:'var(--bg2)', borderRadius:10, overflow:'hidden' }}>
              <div style={{ height:'100%', width:'18%', background:'#94a3b8', borderRadius:10 }} />
            </div>
            <span style={{ fontSize:12, color:'var(--muted)', whiteSpace:'nowrap', textAlign:'right', width:130 }}>9 tasks</span>
          </div>

        </div>
      </div>

      {/* ── 7. Issues & Alerts — 3 RECTANGLE boxes + dark button ── */}
      <div className="card mb">
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <div style={{ fontSize:15, fontWeight:800, color:'var(--text)' }}>Issues &amp; Alerts</div>
            <span style={{ background:'#fee2e2', color:'#ef4444', fontSize:10, fontWeight:700, padding:'2px 8px', borderRadius:10 }}>
              3 new
            </span>
          </div>
        </div>

        {/* Horizontal: 3 cards + button */}
        <div className="alerts-row" style={{ display:'flex', gap:10, alignItems:'stretch' }}>

          {/* Card 1 — Error */}
          <div style={{ flex:1, padding:'14px', borderRadius:10, background:'#fff5f5', borderLeft:'3px solid #ef4444', minWidth:0 }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}>
              <div style={{ width:26, height:26, borderRadius:6, background:'#fee2e2', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13 }}>🔴</div>
              <div style={{ fontSize:12.5, fontWeight:700, color:'var(--text)' }}>API Dependency Failure</div>
            </div>
            <div style={{ fontSize:11, color:'var(--text2)', lineHeight:1.6 }}>
              Payment gateway integration is failing due to 500 errors from provider. Blocking checkout flow.
            </div>
          </div>

          {/* Card 2 — Warning */}
          <div style={{ flex:1, padding:'14px', borderRadius:10, background:'#fffbeb', borderLeft:'3px solid #f59e0b', minWidth:0 }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}>
              <div style={{ width:26, height:26, borderRadius:6, background:'#fef3c7', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13 }}>⚠️</div>
              <div style={{ fontSize:12.5, fontWeight:700, color:'var(--text)' }}>QA Environment Latency</div>
            </div>
            <div style={{ fontSize:11, color:'var(--text2)', lineHeight:1.6 }}>
              Staging environment is experiencing high latency. Slowing down the QA review process significantly.
            </div>
          </div>

          {/* Card 3 — Info */}
          <div style={{ flex:1, padding:'14px', borderRadius:10, background:'#f0f9ff', borderLeft:'3px solid #3b82f6', minWidth:0 }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}>
              <div style={{ width:26, height:26, borderRadius:6, background:'#dbeafe', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13 }}>ℹ️</div>
              <div style={{ fontSize:12.5, fontWeight:700, color:'var(--text)' }}>Missing Assets for Sprint 25</div>
            </div>
            <div style={{ fontSize:11, color:'var(--text2)', lineHeight:1.6 }}>
              Design assets for the upcoming sprint not received on time or complete.
            </div>
          </div>

          {/* Dark "View all notifications" button */}
          <button style={{
            width:72, flexShrink:0,
            background:'#1e293b', color:'#fff',
            border:'none', borderRadius:10,
            fontSize:11, fontWeight:600,
            cursor:'pointer', padding:'10px 8px',
            lineHeight:1.5, textAlign:'center',
            transition:'all .2s'
          }}>
            View all notifications
          </button>

        </div>
      </div>

    </div>
  );
}