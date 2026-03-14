import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { STATS, SPRINT, PROJECT_PROGRESS, TEAM_PERF, BOTTLENECKS, DASH_ALERTS } from '../../data/mockData';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const BG = { blue:'#eff6ff', green:'#f0fdf4', indigo:'#eef2ff', amber:'#fffbeb', red:'#fff5f5' };
const CL = { blue:'#3b82f6', green:'#22c55e', indigo:'#6366f1', amber:'#f59e0b', red:'#ef4444' };

function StatCard({ item }) {
  return (
    <div className="stat-card">
      <div className="stat-ico" style={{ background: BG[item.color] }}>{item.icon}</div>
      <div>
        <div className="stat-lbl">{item.label}</div>
        <div className="stat-val" style={{ color: CL[item.color] }}>{item.value}</div>
        {item.change && (
          <div className={'stat-chg ' + (item.up === true ? 'up' : item.up === false ? 'down' : '')}>
            {item.change}
          </div>
        )}
      </div>
    </div>
  );
}

function ProgBar({ name, pct, color }) {
  return (
    <div className="prog-item">
      <div className="prog-row">
        <span className="prog-name">{name}</span>
        <span className="prog-pct">{pct}%</span>
      </div>
      <div className="prog-track">
        <div className="prog-fill" style={{ width: pct + '%', background: color }} />
      </div>
    </div>
  );
}

function AlertCard({ alert }) {
  const icons = { error:'🔴', warning:'⚠️', info:'ℹ️' };
  return (
    <div className={'alert-card ' + alert.type}>
      <div className="alert-ico">{icons[alert.type]}</div>
      <div style={{ flex: 1 }}>
        <div className="alert-ttl">{alert.title}</div>
        <div className="alert-desc">{alert.desc}</div>
      </div>
      {alert.time && <span className="alert-time">{alert.time}</span>}
    </div>
  );
}

function SprintDonut() {
  const data = {
    labels: ['Healthy', 'Warning', 'Critical'],
    datasets: [{
      data: [SPRINT.health.healthy, SPRINT.health.warning, SPRINT.health.critical],
      backgroundColor: ['#22c55e', '#f59e0b', '#ef4444'],
      borderWidth: 0
    }]
  };
  return (
    <div style={{ display:'flex', alignItems:'center', gap:18 }}>
      <div style={{ width:90, height:90, position:'relative', flexShrink:0 }}>
        <Doughnut data={data} options={{ cutout:'70%', plugins:{ legend:{ display:false } } }} />
        <div className="donut-c">
          <div className="donut-num">90%</div>
          <div className="donut-sub">Health</div>
        </div>
      </div>
      <div className="legend">
        {['#22c55e','#f59e0b','#ef4444'].map((c, i) => (
          <div className="leg" key={i}>
            <div className="leg-dot" style={{ background: c }} />
            {['Healthy','Warning','Critical'][i]}
          </div>
        ))}
      </div>
    </div>
  );
}

function TeamChart() {
  const data = {
    labels: TEAM_PERF.map(t => t.name),
    datasets: [
      { label:'Tasks Completed', data: TEAM_PERF.map(t => t.done), backgroundColor:'#3b82f6', borderRadius:5 },
      { label:'Avg hrs x5',      data: TEAM_PERF.map(t => +(t.hrs * 5).toFixed(1)), backgroundColor:'#e2e8f0', borderRadius:5 }
    ]
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend:{ display:true, position:'top', labels:{ font:{ size:10 }, boxWidth:10, color:'#64748b' } } },
    scales: {
      x: { grid:{ display:false }, ticks:{ color:'#64748b', font:{ size:10 } }, border:{ display:false } },
      y: { grid:{ color:'rgba(0,0,0,.05)' }, ticks:{ color:'#64748b', font:{ size:10 } }, border:{ display:false } }
    }
  };
  return (
    <div className="ch160">
      <Bar data={data} options={options} />
    </div>
  );
}

export default function DashboardSection() {
  return (
    <div>

      {/* Stat Cards */}
      <div className="stats-row">
        {STATS.map((s, i) => <StatCard key={i} item={s} />)}
      </div>

      {/* Sprint + Progress */}
      <div className="g21">
        <div className="card">
          <div className="card-head"><div className="card-title">Sprint Status</div></div>
          <div className="sprint-meta">
            <span>Day {SPRINT.day} of {SPRINT.totalDays}</span>
            <span className="sprint-pct">{SPRINT.completion}%</span>
          </div>
          <div className="sprint-track">
            <div className="sprint-fill" style={{ width: SPRINT.completion + '%' }} />
          </div>
          <div className="sprint-info">{SPRINT.remaining} days remaining</div>
          <div style={{ marginTop:20 }}>
            <div className="card-title" style={{ marginBottom:12 }}>Sprint Health</div>
            <SprintDonut />
          </div>
        </div>

        <div className="card">
          <div className="card-head">
            <div className="card-title">Project Progress</div>
            <button className="card-act">View More</button>
          </div>
          <div className="prog-list">
            {PROJECT_PROGRESS.map((p, i) => <ProgBar key={i} name={p.name} pct={p.pct} color={p.color} />)}
          </div>
        </div>
      </div>

      {/* Team Chart + Bottlenecks */}
      <div className="g12 mb">
        <div className="card">
          <div className="card-head"><div className="card-title">Team Performance</div></div>
          <TeamChart />
        </div>

        <div className="card">
          <div className="card-head"><div className="card-title">Bottleneck Detection</div></div>
          <div className="bn-list">
            {BOTTLENECKS.map((b, i) => (
              <div className="bn-row" key={i}>
                <span className="bn-stage">{b.stage}</span>
                <div className="bn-bar-wrap"><div className="bn-bar" style={{ width: b.pct + '%' }} /></div>
                <span className="bn-stats">{b.tasks} tasks</span>
                <span className="bn-blocked">🚫 {b.blocked}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alerts */}
      <div className="card mb">
        <div className="card-head">
          <div className="card-title">Issues &amp; Alerts</div>
          <button className="card-act">View All</button>
        </div>
        <div className="alert-list">
          {DASH_ALERTS.map((a, i) => <AlertCard key={i} alert={a} />)}
        </div>
      </div>

    </div>
  );
}