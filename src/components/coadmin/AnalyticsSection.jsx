// src/components/coadmin/AnalyticsSection.jsx
import React, { useEffect, useRef } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, LineController, DoughnutController, ArcElement, Tooltip, Legend, Filler } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, LineController, DoughnutController, ArcElement, Tooltip, Legend, Filler);

const ANALYTICS_STATS = [
  { label:'Total Tasks',     value:50,    sub:'+4 this week',        icon:'📋', color:'#eff6ff', hl:false },
  { label:'Total Tasks',     value:10,    sub:'+12% vs last sprint', icon:'✅', color:'#f0fdf4', hl:false },
  { label:'Sprint Progress', value:'42%', sub:'On Track',            icon:'🔄', color:'#fffbeb', hl:false },
  { label:'Active Risks',    value:5,     sub:'Action Required',     icon:'⚠️', color:'#fff5f5', hl:true  },
];

const ISSUES_BLOCKS = [
  { value:15, label:'To Do(30%)',       color:'#94a3b8', bg:'#f1f5f9',  textC:'#64748b' },
  { value:20, label:'In Progress(40%)', color:'#3b82f6', bg:'#3b82f6',  textC:'#fff' },
  { value:5,  label:'Blocked(10%)',     color:'#ef4444', bg:'#ef4444',  textC:'#fff' },
  { value:10, label:'Done(20%)',        color:'#22c55e', bg:'#22c55e',  textC:'#fff' },
];

const WORKLOAD = [
  { name:'Marcus L.',  init:'ML', color:'#3b82f6', pct:100, label:'8 Tasks (100%)',  overload:false },
  { name:'Mike Ross',  init:'MR', color:'#ef4444', pct:120, label:'Overload (120%)', overload:true  },
  { name:'David Chen', init:'DC', color:'#22c55e', pct:50,  label:'4 Tasks (50%)',   overload:false },
];

const CRIT_ALERTS = [
  { type:'error',   title:'API Integration Blocked', desc:'Waiting on backend deployment. Overdue by 2 days.' },
  { type:'warning', title:'QA Bottleneck',           desc:'High volume of tickets in QA stage.' },
  { type:'info',    title:'Resource Unavailable',    desc:'Designer out sick today.' },
];

const FUNNEL = [
  { stage:'Backlog', label:'45 Tasks',    pct:95, color:'#93c5fd', tc:'#1e3a5f' },
  { stage:'Dev',     label:'28 Tasks',    pct:60, color:'#3b82f6', tc:'#fff'    },
  { stage:'QA',      label:'12 Stuck',    pct:30, color:'#fde68a', tc:'#78350f' },
  { stage:'Done',    label:'18 Released', pct:42, color:'#86efac', tc:'#14532d' },
];

const SPRINT_HEALTH = [
  { label:'Code Coverage', value:'88%',  pct:88, color:'#22c55e' },
  { label:'Bug Rate',      value:'12%',  pct:12, color:'#f59e0b' },
  { label:'Team Morale',   value:'4.2/5',pct:84, color:'#3b82f6' },
];

/* ── Velocity Chart ── */
function VelocityChart() {
  const ref   = useRef(null);
  const chart = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    if (chart.current) { chart.current.destroy(); chart.current = null; }
    const ctx = ref.current.getContext('2d');

    const gradient = ctx.createLinearGradient(0, 0, 0, 260);
    gradient.addColorStop(0, 'rgba(34,197,94,0.20)');
    gradient.addColorStop(1, 'rgba(34,197,94,0.01)');

    // More points for angular/stepped green line
    const labels    = ['Day 1','','','Day 5','','','','','Day 10','','','','Day 14'];
    const planned   = [4, 12, 20, 28, 38, 48, 58, 66, 74, 80, 85, 90, 95];
    const completed = [3,  8, 14, 22, 32, 40, 45, 50, 62, 68, 73, 77, 81];

    chart.current = new ChartJS(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Planned',
            data: planned,
            borderColor: '#60a5fa',
            borderDash: [10, 6],
            tension: 0.5,
            borderWidth: 3,
            pointRadius: 0,
            fill: false,
            order: 2
          },
          {
            label: 'Completed',
            data: completed,
            borderColor: '#16a34a',
            tension: 0.25,
            borderWidth: 3,
            pointRadius: (c) => c.dataIndex === 8 ? 13 : 0,
            pointBackgroundColor: (c) => c.dataIndex === 8 ? 'transparent' : '#16a34a',
            pointBorderColor: '#16a34a',
            pointBorderWidth: (c) => c.dataIndex === 8 ? 2 : 0,
            fill: true,
            backgroundColor: gradient,
            order: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true, position:'top', align:'end',
            labels: { font:{size:11}, boxWidth:18, boxHeight:3, color:'#64748b', padding:18 }
          },
          tooltip: { mode:'index', intersect:false }
        },
        scales: {
          x: {
            grid: { display:false },
            ticks: {
              color:'#94a3b8', font:{size:11},
              callback: function(val, idx) {
                const l = ['Day 1','','','Day 5','','','','','Day 10','','','','Day 14'];
                return l[idx] || '';
              }
            },
            border: { display:false }
          },
          y: { display:false, beginAtZero:true }
        }
      }
    });
    return () => { if(chart.current){chart.current.destroy();chart.current=null;} };
  }, []);

  return <div style={{height:250,position:'relative'}}><canvas ref={ref}/></div>;
}

/* ── Delivery Donut ── */
function DeliveryDonut() {
  const data = {
    labels:['Delivered','Remaining'],
    datasets:[{ data:[18,6], backgroundColor:['#3b82f6','#e2e8f0'], borderWidth:0 }]
  };
  return (
    <div className="donut-wrapper" style={{display:'flex',alignItems:'center',gap:32}}>
      <div style={{width:120,height:120,position:'relative',flexShrink:0}}>
        <Doughnut data={data} options={{cutout:'68%',plugins:{legend:{display:false}}}}/>
        <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',textAlign:'center'}}>
          <div style={{fontSize:20,fontWeight:800,color:'var(--text)'}}>75%</div>
          <div style={{fontSize:9,color:'var(--muted)',textTransform:'uppercase'}}>Delivered</div>
        </div>
      </div>
      <div style={{display:'flex',gap:28}}>
        {[{c:'#e2e8f0',l:'Planned',v:24},{c:'#3b82f6',l:'Delivered',v:18}].map((d,i)=>(
          <div key={i} style={{display:'flex',alignItems:'center',gap:8}}>
            <div style={{width:9,height:9,borderRadius:'50%',background:d.c,flexShrink:0}}/>
            <div>
              <div style={{fontSize:12,color:'var(--text2)'}}>{d.l}</div>
              <div style={{fontSize:16,fontWeight:800,color:'var(--text)'}}>{d.v}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AnalyticsSection() {
  return (
    <div>
      {/* 1. Stats */}
      <div className="stats-flex-row" style={{display:'flex',gap:12,marginBottom:16}}>
        {ANALYTICS_STATS.map((s,i)=>(
          <div key={i} style={{background:'var(--card)',border:s.hl?'1.5px solid #ef4444':'1px solid var(--border)',borderRadius:12,padding:'14px 16px',flex:1,minWidth:0,position:'relative'}}>
            {s.hl&&<div style={{position:'absolute',top:0,right:0,background:'#ef4444',color:'#fff',fontSize:9,fontWeight:700,padding:'2px 8px',borderRadius:'0 12px 0 8px'}}>Action Required</div>}
            <div style={{position:'absolute',top:14,right:14,width:28,height:28,borderRadius:7,background:s.color,display:'flex',alignItems:'center',justifyContent:'center',fontSize:14}}>{s.icon}</div>
            <div style={{fontSize:10.5,fontWeight:600,color:'var(--muted)',textTransform:'uppercase',letterSpacing:'.5px',marginBottom:5}}>{s.label}</div>
            <div style={{fontSize:24,fontWeight:800,color:s.hl?'#ef4444':'var(--text)',letterSpacing:'-1px',marginBottom:4,paddingRight:32}}>{s.value}</div>
            <div style={{fontSize:11,color:s.hl?'#ef4444':'var(--muted)',fontWeight:s.hl?600:400}}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* 2. Issues & Alerts blocks */}
      <div className="card mb">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14}}>
          <div style={{fontSize:15,fontWeight:800,color:'var(--text)'}}>Issues &amp; Alerts</div>
          <button style={{background:'none',border:'none',cursor:'pointer',fontSize:20,color:'var(--muted)'}}>⋯</button>
        </div>
        {/* Colored number blocks */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',borderRadius:10,overflow:'hidden',marginBottom:12}}>
          {ISSUES_BLOCKS.map((b,i)=>(
            <div key={i} style={{background:b.bg,padding:'16px',textAlign:'center'}}>
              <div style={{fontSize:26,fontWeight:800,color:b.textC}}>{b.value}</div>
            </div>
          ))}
        </div>
        {/* Labels */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)'}}>
          {ISSUES_BLOCKS.map((b,i)=>(
            <div key={i} style={{display:'flex',alignItems:'center',gap:5}}>
              <div style={{width:8,height:8,borderRadius:'50%',background:b.color,flexShrink:0}}/>
              <span style={{fontSize:11.5,color:'var(--text2)'}}>{b.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Sprint Velocity Trend */}
      <div className="card mb">
        <div style={{fontSize:15,fontWeight:800,color:'var(--text)',marginBottom:14}}>Sprint Velocity Trend</div>
        <VelocityChart/>
      </div>

      {/* 4. Team Workload Distribution */}
      <div className="card mb">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:18}}>
          <div style={{fontSize:15,fontWeight:800,color:'var(--text)'}}>Team Workload Distribution</div>
          <button className="card-act">View All Members</button>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          {WORKLOAD.map((m,i)=>(
            <div key={i} style={{display:'flex',alignItems:'center',gap:14}}>
              <div style={{width:40,height:40,borderRadius:'50%',background:m.color,display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,fontWeight:800,color:'#fff',flexShrink:0}}>{m.init}</div>
              <div style={{flex:1}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
                  <span style={{fontSize:13,fontWeight:600,color:'var(--text)'}}>{m.name}</span>
                  <span style={{fontSize:12,fontWeight:700,color:m.overload?'#ef4444':'var(--text2)'}}>
                    {m.overload&&'🔴 '}{m.label}
                  </span>
                </div>
                <div style={{height:7,background:'var(--bg2)',borderRadius:10,overflow:'hidden'}}>
                  <div style={{height:'100%',width:Math.min(m.pct,100)+'%',background:m.overload?'#ef4444':m.color,borderRadius:10}}/>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Critical Alerts */}
      <div className="card mb">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14}}>
          <div style={{display:'flex',alignItems:'center',gap:8}}>
            <div style={{fontSize:15,fontWeight:800,color:'var(--text)'}}>Critical Alerts</div>
            <span style={{background:'#fee2e2',color:'#ef4444',fontSize:10,fontWeight:700,padding:'2px 8px',borderRadius:10}}>3 new</span>
          </div>
        </div>
        <div className="alerts-row" style={{display:'flex',gap:10}}>
          {CRIT_ALERTS.map((a,i)=>{
            const cfg={error:{bg:'#fff5f5',bc:'#ef4444',ico:'🔴'},warning:{bg:'#fffbeb',bc:'#f59e0b',ico:'⚠️'},info:{bg:'#eff6ff',bc:'#3b82f6',ico:'ℹ️'}}[a.type];
            return(
              <div key={i} style={{flex:1,padding:'13px',borderRadius:10,background:cfg.bg,borderLeft:`3px solid ${cfg.bc}`,minWidth:0}}>
                <div style={{fontSize:15,marginBottom:6}}>{cfg.ico}</div>
                <div style={{fontSize:12,fontWeight:700,color:'var(--text)',marginBottom:4}}>{a.title}</div>
                <div style={{fontSize:11,color:'var(--text2)',lineHeight:1.5}}>{a.desc}</div>
              </div>
            );
          })}
          <button style={{width:75,flexShrink:0,background:'#1e293b',color:'#fff',border:'none',borderRadius:10,fontSize:11,fontWeight:600,cursor:'pointer',padding:'10px 6px',lineHeight:1.4,textAlign:'center'}}>
            View all notifications
          </button>
        </div>
      </div>

      {/* 6. Delivery Report */}
      <div className="card mb">
        <div style={{fontSize:15,fontWeight:800,color:'var(--text)',marginBottom:18}}>Delivery Report</div>
        <DeliveryDonut/>
      </div>

      {/* 7. Process Funnel */}
      <div className="card mb">
        <div style={{fontSize:15,fontWeight:800,color:'var(--text)',marginBottom:16}}>Process Funnel</div>
        <div style={{display:'flex',flexDirection:'column',gap:12}}>
          {FUNNEL.map((f,i)=>(
            <div key={i} style={{display:'flex',alignItems:'center',gap:14}}>
              <span style={{fontSize:12.5,fontWeight:600,color:'var(--text2)',width:58,flexShrink:0}}>{f.stage}</span>
              <div style={{flex:1,height:30,background:'var(--bg2)',borderRadius:7,overflow:'hidden'}}>
                <div style={{height:'100%',width:f.pct+'%',background:f.color,borderRadius:7,display:'flex',alignItems:'center',paddingLeft:12,fontSize:12.5,fontWeight:700,color:f.tc}}>
                  {f.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 8. Sprint Health */}
      <div className="card mb">
        <div style={{fontSize:15,fontWeight:800,color:'var(--text)',marginBottom:14}}>Sprint Health</div>
        <div style={{display:'flex',flexDirection:'column',gap:14}}>
          {SPRINT_HEALTH.map((s,i)=>(
            <div key={i} style={{display:'flex',alignItems:'center',gap:14}}>
              <span style={{fontSize:12.5,color:'var(--text2)',width:115,flexShrink:0}}>{s.label}</span>
              <div style={{flex:1,height:9,background:'var(--bg2)',borderRadius:10,overflow:'hidden'}}>
                <div style={{height:'100%',width:s.pct+'%',background:s.color,borderRadius:10}}/>
              </div>
              <span style={{fontSize:12.5,fontWeight:700,color:'var(--text2)',width:42,textAlign:'right',flexShrink:0}}>{s.value}</span>
            </div>
          ))}
        </div>
        <button style={{width:'100%',marginTop:18,padding:'12px',background:'var(--bg)',border:'1px solid var(--border)',borderRadius:10,fontSize:13,fontWeight:600,color:'var(--text2)',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:8}}>
          ⬇ Generate Sprint Report
        </button>
      </div>
    </div>
  );
}