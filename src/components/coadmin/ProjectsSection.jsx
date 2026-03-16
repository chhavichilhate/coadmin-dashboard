// src/components/coadmin/ProjectsSection.jsx
import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PROJ_STATS = [
  { label:'TOTAL PROJECTS', value:12, sub:'+2',         icon:'🗂️', hl:false, ic:'#f8fafc' },
  { label:'ACTIVE',         value:8,  sub:'',            icon:'▶️', hl:false, ic:'#eff6ff' },
  { label:'COMPLETED',      value:2,  sub:'This month',  icon:'✅', hl:false, ic:'#f0fdf4' },
  { label:'DELAYED',        value:1,  sub:'This month',  icon:'⚠️', hl:true,  bc:'#f59e0b', ic:'#fffbeb' },
  { label:'AT RISK',        value:1,  sub:'This month',  icon:'❌', hl:true,  bc:'#ef4444', ic:'#fff5f5' },
];

const PROJ_OVERVIEW = [
  { name:'Website Redesign',  pct:75, color:'#22c55e' },
  { name:'Mobile App Launch', pct:40, color:'#3b82f6' },
  { name:'Mobile App Launch', pct:40, color:'#60a5fa' },
];

const TEAM_WORKLOAD = [
  { name:'Marcus L.', init:'ML', color:'#ef4444', pct:120, label:'120%', overload:true  },
  { name:'Sarah J.',  init:'SJ', color:'#3b82f6', pct:80,  label:'80%',  overload:false },
  { name:'David K.',  init:'DK', color:'#22c55e', pct:45,  label:'45%',  overload:false },
];

const TIMELINE = [
  { name:'Alpha Initiative', start:2,  dur:52, color:'#bbf7d0' },
  { name:'Beta Launch',      start:28, dur:46, color:'#bfdbfe' },
  { name:'Gamma Testing',    start:54, dur:30, color:'#fde68a' },
];

const PROJECTS_TABLE = [
  { name:'Alpha Initiative', status:'In Progress', sc:'#3b82f6', sbg:'#eff6ff', health:'😊', pct:75,  team:['#ef4444','#3b82f6','#22c55e'] },
  { name:'Beta Launch',      status:'Delayed',     sc:'#f59e0b', sbg:'#fffbeb', health:'😐', pct:40,  team:['#f59e0b'] },
  { name:'Project Gamma',    status:'At Risk',     sc:'#ef4444', sbg:'#fff5f5', health:'😞', pct:21,  team:['#ef4444','#a855f7'] },
];

const PROJ_ALERTS = [
  { type:'error',   title:'Dependency Blocked',  desc:'Backend API delay is blocking Alpha initiative. Overdue by 2 days.' },
  { type:'warning', title:'Over-allocation',     desc:'Designer Marcus. Q4 budget capacity 4% worn.' },
  { type:'info',    title:'Budget Update',       desc:'Q4 budget capacity nearing total limit.' },
];

export default function ProjectsSection() {
  const [timeView, setTimeView] = useState('Month');
  const [, setPage] = useState(1);

  const healthData = {
    labels:['Healthy','Warning','Critical'],
    datasets:[{ data:[60,30,10], backgroundColor:['#22c55e','#f59e0b','#ef4444'], borderWidth:0 }]
  };

  return (
    <div>
      {/* 1. Stats */}
      <div className="stats-flex-row" style={{display:'flex',gap:12,marginBottom:16}}>
        {PROJ_STATS.map((s,i)=>(
          <div key={i} style={{background:'var(--card)',border:s.hl?`1.5px solid ${s.bc}`:'1px solid var(--border)',borderRadius:12,padding:'14px 16px',flex:1,minWidth:0,position:'relative'}}>
            <div style={{position:'absolute',top:12,right:12,width:28,height:28,borderRadius:7,background:s.ic,display:'flex',alignItems:'center',justifyContent:'center',fontSize:14}}>{s.icon}</div>
            <div style={{fontSize:10,fontWeight:700,color:s.hl?s.bc:'var(--muted)',textTransform:'uppercase',letterSpacing:'.6px',marginBottom:5}}>{s.label}</div>
            <div style={{fontSize:22,fontWeight:800,color:s.hl?s.bc:'var(--text)',letterSpacing:'-1px',marginBottom:4,paddingRight:32}}>
              {s.value} {s.sub&&s.label==='TOTAL PROJECTS'&&<span style={{fontSize:13,color:'var(--muted)',fontWeight:500}}>{s.sub}</span>}
            </div>
            {s.sub&&s.label!=='TOTAL PROJECTS'&&<div style={{fontSize:10.5,color:'var(--muted)'}}>{s.sub}</div>}
          </div>
        ))}
      </div>

      {/* 2. Project Progress Overview */}
      <div className="card mb">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14}}>
          <div style={{fontSize:15,fontWeight:800,color:'var(--text)'}}>Project Progress Overview</div>
          <button className="card-act">View Details</button>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:12}}>
          {PROJ_OVERVIEW.map((p,i)=>(
            <div key={i}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
                <span style={{fontSize:13,fontWeight:600,color:'var(--text)'}}>{p.name}</span>
                <span style={{fontSize:12.5,fontWeight:700,color:'var(--text2)'}}>{p.pct}%</span>
              </div>
              <div style={{height:8,background:'var(--bg2)',borderRadius:10,overflow:'hidden'}}>
                <div style={{height:'100%',width:p.pct+'%',background:p.color,borderRadius:10}}/>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Health Status */}
      <div className="card mb">
        <div style={{fontSize:15,fontWeight:800,color:'var(--text)',marginBottom:18}}>Health Status</div>
        <div style={{display:'flex',alignItems:'center',gap:40}}>
          <div style={{width:140,height:140,position:'relative',flexShrink:0}}>
            <Doughnut data={healthData} options={{cutout:'60%',plugins:{legend:{display:false}},animation:{duration:700}}}/>
            <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',textAlign:'center'}}>
              <div style={{fontSize:22,fontWeight:800,color:'var(--text)'}}>12</div>
              <div style={{fontSize:10,color:'var(--muted)',textTransform:'uppercase'}}>Projects</div>
            </div>
          </div>
          <div style={{display:'flex',flexDirection:'row',gap:14}}>
            {[{c:'#22c55e',l:'Healthy',p:'60%'},{c:'#f59e0b',l:'Warning',p:'30%'},{c:'#ef4444',l:'Critical',p:'10%'}].map((x,i)=>(
              <div key={i} style={{display:'flex',alignItems:'center',gap:10,fontSize:13,color:'var(--text2)'}}>
                <div style={{width:10,height:10,borderRadius:'50%',background:x.c,flexShrink:0}}/>
                <div>
                  <div style={{fontWeight:600}}>{x.l}</div>
                  <div style={{fontSize:11,color:'var(--muted)'}}>({x.p})</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Team Workload */}
      <div className="card mb">
        <div style={{fontSize:15,fontWeight:800,color:'var(--text)',marginBottom:18}}>Team Workload</div>
        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          {TEAM_WORKLOAD.map((m,i)=>(
            <div key={i} style={{display:'flex',alignItems:'center',gap:14}}>
              <div style={{width:40,height:40,borderRadius:'50%',background:m.color,display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,fontWeight:800,color:'#fff',flexShrink:0}}>{m.init}</div>
              <div style={{flex:1}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
                  <span style={{fontSize:13,fontWeight:600,color:'var(--text)'}}>{m.name}</span>
                  <span style={{fontSize:12,fontWeight:700,color:m.overload?'#ef4444':'var(--text2)'}}>
                    {m.overload&&<span style={{marginRight:3}}>🔴</span>}{m.overload?`Overload (${m.label})`:m.label}
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

      {/* 5. Project Timeline */}
      <div className="card mb">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14}}>
          <div style={{fontSize:15,fontWeight:800,color:'var(--text)'}}>Project Timeline</div>
          <div style={{display:'flex',gap:4}}>
            {['Month','Quarter'].map(v=>(
              <button key={v} onClick={()=>setTimeView(v)} style={{padding:'5px 14px',borderRadius:7,border:'1px solid var(--border)',background:timeView===v?'var(--blue)':'var(--bg)',color:timeView===v?'#fff':'var(--text2)',fontSize:12,fontWeight:600,cursor:'pointer'}}>{v}</button>
            ))}
          </div>
        </div>
        <div style={{display:'flex',gap:0,marginBottom:12}}>
          {['Oct','Nov','Dec','Jan'].map((m,i)=>(
            <div key={i} style={{flex:1,fontSize:12,color:'var(--muted)',fontWeight:500}}>{m}</div>
          ))}
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:10}}>
          {TIMELINE.map((t,i)=>(
            <div key={i} style={{position:'relative',height:30,background:'var(--bg2)',borderRadius:8,overflow:'hidden'}}>
              <div style={{position:'absolute',left:t.start+'%',width:t.dur+'%',height:'100%',background:t.color,borderRadius:8,display:'flex',alignItems:'center',paddingLeft:10,fontSize:12,fontWeight:600,color:'#1e293b'}}>
                {t.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. All Projects Table */}
      <div className="card mb">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14}}>
          <div style={{fontSize:15,fontWeight:800,color:'var(--text)'}}>All Projects</div>
          <button style={{background:'none',border:'none',cursor:'pointer',fontSize:20,color:'var(--muted)'}}>⋯</button>
        </div>
        <table style={{width:'100%',borderCollapse:'collapse',fontSize:13}}>
          <thead>
            <tr>
              {['PROJECT NAME','STATUS','HEALTH','PROGRESS','TEAM','ACTIONS'].map((h,i)=>(
                <th key={i} style={{textAlign:'left',padding:'10px 12px',fontSize:10.5,fontWeight:700,color:'var(--muted)',textTransform:'uppercase',letterSpacing:'.5px',borderBottom:'1px solid var(--border)',background:'var(--bg)'}}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PROJECTS_TABLE.map((p,i)=>(
              <tr key={i} style={{borderBottom:'1px solid var(--border)'}}>
                <td style={{padding:'12px',fontWeight:600,color:'var(--text)'}}>{p.name}</td>
                <td style={{padding:'12px'}}><span style={{background:p.sbg,color:p.sc,padding:'4px 10px',borderRadius:20,fontSize:11.5,fontWeight:700}}>{p.status}</span></td>
                <td style={{padding:'12px',fontSize:18}}>{p.health}</td>
                <td style={{padding:'12px'}}>
                  <div style={{display:'flex',alignItems:'center',gap:8}}>
                    <div style={{width:80,height:5,background:'var(--bg2)',borderRadius:10,overflow:'hidden'}}>
                      <div style={{height:'100%',width:p.pct+'%',background:p.pct>60?'#22c55e':p.pct>30?'#f59e0b':'#ef4444',borderRadius:10}}/>
                    </div>
                    <span style={{fontSize:11,fontWeight:700,color:'var(--text2)'}}>{p.pct}%</span>
                  </div>
                </td>
                <td style={{padding:'12px'}}>
                  <div style={{display:'flex'}}>
                    {p.team.map((c,j)=>(
                      <div key={j} style={{width:26,height:26,borderRadius:'50%',background:c,border:'2px solid var(--card)',marginLeft:j>0?-7:0,display:'flex',alignItems:'center',justifyContent:'center',fontSize:9,fontWeight:700,color:'#fff'}}>T</div>
                    ))}
                  </div>
                </td>
                <td style={{padding:'12px'}}>
                  <button style={{background:'none',border:'none',cursor:'pointer',fontSize:20,color:'var(--muted)'}}>⋮</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'12px 4px 0'}}>
          <span style={{fontSize:12,color:'var(--muted)'}}>Showing 3 of 12 projects</span>
          <div style={{display:'flex',gap:8}}>
            <button onClick={()=>setPage(p=>Math.max(1,p-1))} style={{padding:'6px 14px',borderRadius:7,border:'1px solid var(--border)',background:'var(--bg)',fontSize:12,cursor:'pointer',color:'var(--text2)'}}>Prev</button>
            <button onClick={()=>setPage(p=>p+1)} style={{padding:'6px 14px',borderRadius:7,border:'none',background:'var(--blue)',fontSize:12,cursor:'pointer',color:'#fff',fontWeight:600}}>Next</button>
          </div>
        </div>
      </div>

      {/* 7. Issues & Alerts */}
      <div className="card mb">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14}}>
          <div style={{display:'flex',alignItems:'center',gap:8}}>
            <div style={{fontSize:15,fontWeight:800,color:'var(--text)'}}>Issues &amp; Alerts</div>
            <span style={{background:'#fee2e2',color:'#ef4444',fontSize:10,fontWeight:700,padding:'2px 8px',borderRadius:10}}>3 new</span>
          </div>
        </div>
        <div className="alerts-row" style={{display:'flex',gap:10}}>
          {PROJ_ALERTS.map((a,i)=>{
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
    </div>
  );
}