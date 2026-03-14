import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  HEALTH,
  TEAM_WORKLOAD,
  TIMELINE,
  PROJECTS_TABLE,
  PROJ_ALERTS,
  PROJECT_PROGRESS
} from '../../data/mockData';

/* ── Note: ChartJS already registered in DashboardSection ── */

function HealthDonut() {
  const data = {
    labels: ['Healthy', 'Warning', 'Critical'],
    datasets: [{
      data: [HEALTH.healthy, HEALTH.warning, HEALTH.critical],
      backgroundColor: ['#22c55e', '#f59e0b', '#ef4444'],
      borderWidth: 0
    }]
  };

  const options = {
    cutout: '70%',
    plugins: { legend: { display: false } },
    animation: { duration: 700 }
  };

  return (
    <div>
      <div style={{ width: 110, height: 110, position: 'relative', margin: '0 auto 12px' }}>
        <Doughnut data={data} options={options} />
        <div className="donut-c">
          <div className="donut-num">12</div>
          <div className="donut-sub">Projects</div>
        </div>
      </div>
      <div className="legend" style={{ justifyContent: 'center' }}>
        <div className="leg">
          <div className="leg-dot" style={{ background: '#22c55e' }} />
          Healthy (12)
        </div>
        <div className="leg">
          <div className="leg-dot" style={{ background: '#f59e0b' }} />
          Warning (3)
        </div>
        <div className="leg">
          <div className="leg-dot" style={{ background: '#ef4444' }} />
          Critical (1)
        </div>
      </div>
    </div>
  );
}

function WorkloadBars({ data }) {
  return (
    <div className="wl-list">
      {data.map((m, i) => (
        <div className="wl-item" key={i}>
          <div className="wl-av" style={{ background: m.color }}>{m.init}</div>
          <div className="wl-info">
            <div className="wl-name">{m.name}</div>
            <div className="wl-track">
              <div className="wl-fill" style={{ width: m.pct + '%', background: m.color }} />
            </div>
          </div>
          <span className="wl-ct">{m.tasks} tasks</span>
        </div>
      ))}
    </div>
  );
}

function AlertList({ data }) {
  const icons = { error: '🔴', warning: '⚠️', info: 'ℹ️' };
  return (
    <div className="alert-list">
      {data.map((a, i) => (
        <div className={'alert-card ' + a.type} key={i}>
          <div className="alert-ico">{icons[a.type]}</div>
          <div style={{ flex: 1 }}>
            <div className="alert-ttl">{a.title}</div>
            <div className="alert-desc">{a.desc}</div>
          </div>
          {a.time && <span className="alert-time">{a.time}</span>}
        </div>
      ))}
    </div>
  );
}

export default function ProjectsSection() {
  return (
    <div>

      {/* Top Row: Health + Workload + Timeline */}
      <div className="g3">

        <div className="card">
          <div className="card-head">
            <div className="card-title">Health Status</div>
          </div>
          <HealthDonut />
        </div>

        <div className="card">
          <div className="card-head">
            <div className="card-title">Team Workload</div>
            <button className="card-act">View All</button>
          </div>
          <WorkloadBars data={TEAM_WORKLOAD} />
        </div>

        <div className="card">
          <div className="card-head">
            <div className="card-title">Project Timeline</div>
          </div>
          <div className="tl-wrap">
            {TIMELINE.map((t, i) => (
              <div className="tl-row" key={i}>
                <span className="tl-lbl">{t.name}</span>
                <div className="tl-track">
                  <div
                    className="tl-bar"
                    style={{
                      left: t.start + '%',
                      width: t.dur + '%',
                      background: t.color
                    }}
                  >
                    {t.phase}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Projects Table */}
      <div className="card mb">
        <div className="card-head">
          <div className="card-title">All Projects</div>
          <button className="card-act">+ Add Project</button>
        </div>
        <div className="tbl-wrap">
          <table className="tbl">
            <thead>
              <tr>
                <th>Project</th>
                <th>Status</th>
                <th>Progress</th>
                <th>Owner</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              {PROJECTS_TABLE.map((p, i) => {
                const bc = p.pct >= 80 ? '#22c55e' : p.pct >= 50 ? '#f59e0b' : '#ef4444';
                return (
                  <tr key={i}>
                    <td style={{ fontWeight: 600 }}>{p.name}</td>
                    <td>
                      <span className="pill" style={{ background: p.sc + '18', color: p.sc }}>
                        <span style={{
                          width: 5, height: 5, borderRadius: '50%',
                          background: p.sc, display: 'inline-block', marginRight: 4
                        }} />
                        {p.status}
                      </span>
                    </td>
                    <td>
                      <div className="tpw">
                        <div className="tpf" style={{ width: p.pct + '%', background: bc }} />
                      </div>
                      <span className="tpct">{p.pct}%</span>
                    </td>
                    <td>
                      <div className="own">
                        <div className="own-av">{p.oi}</div>
                        <span>{p.owner}</span>
                      </div>
                    </td>
                    <td>
                      <span className="pri" style={{ background: p.pc + '18', color: p.pc }}>
                        {p.priority}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Progress + Alerts */}
      <div className="g2">

        <div className="card mb">
          <div className="card-head">
            <div className="card-title">Project Progress</div>
          </div>
          <div className="prog-list">
            {PROJECT_PROGRESS.map((p, i) => (
              <div className="prog-item" key={i}>
                <div className="prog-row">
                  <span className="prog-name">{p.name}</span>
                  <span className="prog-pct">{p.pct}%</span>
                </div>
                <div className="prog-track">
                  <div className="prog-fill" style={{ width: p.pct + '%', background: p.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card mb">
          <div className="card-head">
            <div className="card-title">Issues &amp; Alerts</div>
            <button className="card-act">View All</button>
          </div>
          <AlertList data={PROJ_ALERTS} />
        </div>

      </div>

    </div>
  );
}