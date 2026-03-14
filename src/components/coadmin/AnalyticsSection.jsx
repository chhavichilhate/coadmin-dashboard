import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend, Filler } from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import { ISSUES_SUMMARY, VELOCITY, WORKLOAD_DIST, CRIT_ALERTS, DELIVERY, FUNNEL, SPRINT_HEALTH_BARS } from '../../data/mockData';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend, Filler);

function VelocityChart() {
  const data = {
    labels: VELOCITY.labels,
    datasets: [
      {
        label: 'Planned',
        data: VELOCITY.planned,
        borderColor: '#94a3b8',
        borderDash: [5,4],
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 3,
        fill: false,
        pointBackgroundColor: '#94a3b8'
      },
      {
        label: 'Completed',
        data: VELOCITY.completed,
        borderColor: '#22c55e',
        tension: 0.4,
        borderWidth: 2.5,
        pointRadius: 4,
        fill: true,
        pointBackgroundColor: '#22c55e',
        backgroundColor: 'rgba(34,197,94,.08)'
      }
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
  return <div className="ch220"><Line data={data} options={options} /></div>;
}

function DeliveryDonut() {
  const data = {
    labels: ['Delivered','Remaining'],
    datasets: [{
      data: [DELIVERY.delivered, DELIVERY.planned - DELIVERY.delivered],
      backgroundColor: ['#3b82f6','#e2e8f0'],
      borderWidth: 0
    }]
  };
  return (
    <div className="del-wrap">
      <div style={{ width:100, height:100, position:'relative', marginBottom:8 }}>
        <Doughnut data={data} options={{ cutout:'70%', plugins:{ legend:{ display:false } } }} />
        <div className="donut-c">
          <div className="donut-num">{DELIVERY.pct}%</div>
        </div>
      </div>
      <div className="del-meta">
        <div className="del-i"><div className="del-dot" style={{ background:'#3b82f6' }} />Planned: <strong>{DELIVERY.planned}</strong></div>
        <div className="del-i"><div className="del-dot" style={{ background:'#22c55e' }} />Delivered: <strong>{DELIVERY.delivered}</strong></div>
      </div>
    </div>
  );
}

export default function AnalyticsSection() {
  return (
    <div>

      {/* Issues Summary */}
      <div className="card mb">
        <div className="card-head"><div className="card-title">Issues Summary</div></div>
        <div className="iss-grid">
          {[
            { icon:'📋', label:'Total Issues',  value: ISSUES_SUMMARY.total      },
            { icon:'🚫', label:'Blockers',      value: ISSUES_SUMMARY.blockers,  red:true },
            { icon:'⚙️', label:'In Progress',   value: ISSUES_SUMMARY.inProgress },
            { icon:'🔴', label:'Critical',      value: ISSUES_SUMMARY.critical,  red:true }
          ].map((c, i) => (
            <div className="iss-card" key={i}>
              <span style={{ fontSize:20 }}>{c.icon}</span>
              <div>
                <div className="iss-n" style={{ color: c.red ? '#ef4444' : 'var(--text)' }}>{c.value}</div>
                <div className="iss-l">{c.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Velocity + Workload */}
      <div className="g21">
        <div className="card">
          <div className="card-head"><div className="card-title">Sprint Velocity Trend</div></div>
          <VelocityChart />
        </div>

        <div className="card">
          <div className="card-head">
            <div className="card-title">Team Workload</div>
            <button className="card-act">All Members</button>
          </div>
          <div className="wl-list">
            {WORKLOAD_DIST.map((m, i) => (
              <div className="wl-item" key={i}>
                <div className="wl-av" style={{ background: m.color }}>{m.init}</div>
                <div className="wl-info">
                  <div className="wl-name">
                    {m.name} <span style={{ fontSize:10, color:'var(--muted)' }}>{m.note}</span>
                  </div>
                  <div className="wl-track">
                    <div className="wl-fill" style={{ width: m.pct + '%', background: m.color }} />
                  </div>
                </div>
                <span className="wl-ct">{m.tasks} tasks</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Critical Alerts + Delivery + Funnel */}
      <div className="g3">
        <div className="card">
          <div className="card-head"><div className="card-title">Critical Alerts</div></div>
          <div className="crit-list">
            {CRIT_ALERTS.map((a, i) => (
              <div className={'crit-card ' + a.type} key={i}>
                <div className="crit-ico">{a.type === 'error' ? '🔴' : '⚠️'}</div>
                <div>
                  <div className="crit-ttl">{a.title}</div>
                  <div className="crit-desc">{a.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-head"><div className="card-title">Delivery Report</div></div>
          <DeliveryDonut />
        </div>

        <div className="card">
          <div className="card-head"><div className="card-title">Process Funnel</div></div>
          <div className="funnel-list">
            {FUNNEL.map((f, i) => (
              <div className="fn-row" key={i}>
                <span className="fn-lbl">{f.stage}</span>
                <div className="fn-wrap">
                  <div className={'fn-bar' + (f.dim ? ' dim' : '')} style={{ width: f.pct + '%', background: f.color }}>
                    {f.tasks} Tasks
                  </div>
                </div>
                <span className="fn-ct">{f.tasks}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sprint Health Bars */}
      <div className="card mb">
        <div className="card-head"><div className="card-title">Sprint Health</div></div>
        <div className="sh-list">
          {SPRINT_HEALTH_BARS.map((s, i) => (
            <div className="sh-row" key={i}>
              <span className="sh-lbl">{s.label}</span>
              <div className="sh-track">
                <div className="sh-fill" style={{ width: s.pct + '%', background: s.color }} />
              </div>
              <span className="sh-pct">{s.pct}%</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}