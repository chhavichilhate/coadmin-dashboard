// src/data/mockData.js

// ── Auth
export const AUTH = { email: 'admin@gmail.com', password: 'admin123' };

// ── Dashboard 
export const STATS = [
  { label:'Total Tasks',  value:142, change:'↑ +5% this week',  up:true,  icon:'📋', color:'blue'   },
  { label:'Completed',    value:89,  change:'↑ +12% this week', up:true,  icon:'✅', color:'green'  },
  { label:'In Progress',  value:28,  change:'→ 3 new today',    up:null,  icon:'🔄', color:'indigo' },
  { label:'Pending',      value:11,  change:'↓ -3 resolved',    up:false, icon:'⏳', color:'amber'  },
  { label:'Risk Level',   value:'Moderate', change:'',          up:null,  icon:'⚠️', color:'red'   }
];

export const SPRINT = {
  completion:62, day:8, totalDays:14, remaining:6,
  health:{ healthy:70, warning:20, critical:10 }
};

export const PROJECT_PROGRESS = [
  { name:'E-Commerce Platform', pct:85, color:'#ef4444' },
  { name:'Mobile App Redesign', pct:62, color:'#f59e0b' },
  { name:'API Integration Hub', pct:45, color:'#22c55e' },
  { name:'Analytics Dashboard', pct:78, color:'#3b82f6' },
  { name:'CRM System v2',       pct:30, color:'#a855f7' }
];

export const TEAM_PERF = [
  { name:'Alice', done:24, hrs:3.2 },
  { name:'Bob',   done:18, hrs:4.1 },
  { name:'Carol', done:31, hrs:2.8 },
  { name:'David', done:15, hrs:5.0 },
  { name:'Emma',  done:22, hrs:3.6 }
];

export const BOTTLENECKS = [
  { stage:'Backlog',     tasks:42, blocked:7, delay:'1.2d', pct:84 },
  { stage:'Development', tasks:18, blocked:3, delay:'0.7d', pct:36 },
  { stage:'QA Review',   tasks:11, blocked:5, delay:'2.1d', pct:22 },
  { stage:'Staging',     tasks:6,  blocked:1, delay:'0.4d', pct:12 }
];

export const DASH_ALERTS = [
  { type:'error',   title:'API Dependency Failure',       desc:'Payment gateway blocked by external team', time:'2h ago' },
  { type:'warning', title:'QA Environment Latency',       desc:'Response 3x normal — check server load',   time:'4h ago' },
  { type:'info',    title:'Missing Assets for Sprint 20', desc:'Design assets for onboarding not uploaded', time:'6h ago' }
];

// ── Projects ─────────────────────────────
export const HEALTH = { healthy:12, warning:3, critical:1 };

export const TEAM_WORKLOAD = [
  { name:'Alice Kim',   init:'AK', tasks:14, pct:88, color:'#ef4444' },
  { name:'Bob Chen',    init:'BC', tasks:9,  pct:56, color:'#3b82f6' },
  { name:'Carol Davis', init:'CD', tasks:7,  pct:44, color:'#22c55e' },
  { name:'David Lee',   init:'DL', tasks:11, pct:69, color:'#f59e0b' }
];

export const TIMELINE = [
  { name:'E-Commerce',  start:0,  dur:55, phase:'Development', color:'#3b82f6' },
  { name:'Mobile App',  start:18, dur:42, phase:'Design',       color:'#a855f7' },
  { name:'API Integr.', start:38, dur:35, phase:'Testing',      color:'#f59e0b' },
  { name:'CRM System',  start:55, dur:28, phase:'Planning',     color:'#22c55e' }
];

export const PROJECTS_TABLE = [
  { name:'E-Commerce Platform', status:'On Track',  sc:'#22c55e', pct:85,  owner:'Alice Kim',   oi:'AK', priority:'High',     pc:'#ef4444' },
  { name:'Mobile App Redesign', status:'At Risk',   sc:'#f59e0b', pct:62,  owner:'Bob Chen',    oi:'BC', priority:'Medium',   pc:'#f59e0b' },
  { name:'API Integration Hub', status:'Delayed',   sc:'#ef4444', pct:45,  owner:'Carol Davis', oi:'CD', priority:'High',     pc:'#ef4444' },
  { name:'Analytics Dashboard', status:'On Track',  sc:'#22c55e', pct:78,  owner:'David Lee',   oi:'DL', priority:'Low',      pc:'#22c55e' },
  { name:'CRM System v2',       status:'On Track',  sc:'#22c55e', pct:30,  owner:'Alice Kim',   oi:'AK', priority:'Medium',   pc:'#f59e0b' },
  { name:'Security Audit 2025', status:'Completed', sc:'#3b82f6', pct:100, owner:'Bob Chen',    oi:'BC', priority:'Critical', pc:'#7c3aed' }
];

export const PROJ_ALERTS = [
  { type:'warning', title:'Dependency Blocked',  desc:'API Integration waiting on vendor sign-off', time:'1h ago' },
  { type:'error',   title:'Over Allocation',     desc:'Alice Kim has 14 tasks — exceeds threshold', time:'3h ago' },
  { type:'info',    title:'Budget Update',       desc:'CRM System 15% over initial budget estimate', time:'5h ago' }
];

// ── Analytics ────────────────────────────
export const ISSUES_SUMMARY = { total:15, blockers:5, inProgress:20, critical:10 };

export const VELOCITY = {
  labels:    ['Day 1','Day 3','Day 5','Day 7','Day 9','Day 11','Day 13'],
  planned:   [8, 18, 32, 46, 60, 74, 86],
  completed: [6, 15, 34, 52, 63, 79, 92]
};

export const WORKLOAD_DIST = [
  { name:'Alice Kim',   init:'AK', tasks:14, pct:88, color:'#ef4444', note:'Overloaded (140%)' },
  { name:'Bob Chen',    init:'BC', tasks:9,  pct:56, color:'#3b82f6', note:'Normal (90%)'      },
  { name:'Carol Davis', init:'CD', tasks:7,  pct:44, color:'#22c55e', note:'Available (70%)'   },
  { name:'David Lee',   init:'DL', tasks:11, pct:69, color:'#f59e0b', note:'High (110%)'       }
];

export const CRIT_ALERTS = [
  { type:'error',   title:'API Integration Blocked', desc:'3 tasks stalled for 2+ days' },
  { type:'warning', title:'QA Bottleneck Detected',  desc:'5 tasks queued, no engineer available' },
  { type:'warning', title:'Resource Unavailable',    desc:'Lead designer out until Friday' }
];

export const DELIVERY = { planned:24, delivered:18, pct:75 };

export const FUNNEL = [
  { stage:'Backlog', tasks:42, pct:100, color:'#94a3b8', dim:true  },
  { stage:'Dev',     tasks:28, pct:67,  color:'#3b82f6', dim:false },
  { stage:'QA',      tasks:12, pct:29,  color:'#f59e0b', dim:false },
  { stage:'Done',    tasks:32, pct:76,  color:'#22c55e', dim:false }
];

export const SPRINT_HEALTH_BARS = [
  { label:'On Track', pct:65, color:'#22c55e' },
  { label:'At Risk',  pct:25, color:'#f59e0b' },
  { label:'Critical', pct:10, color:'#ef4444' }
];

// ── Chat ─────────────────────────────────
export const CHATS = [
  { id:0, name:'Alice Kim',   init:'AK', color:'#ef4444', online:true,  time:'10:42 AM', msg:'Sure, will check it out!',       unread:2 },
  { id:1, name:'Bob Chen',    init:'BC', color:'#3b82f6', online:true,  time:'9:30 AM',  msg:'The report is ready for review', unread:1 },
  { id:2, name:'Carol Davis', init:'CD', color:'#22c55e', online:false, time:'Yesterday',msg:'Thanks for the update!',          unread:0 },
  { id:3, name:'David Lee',   init:'DL', color:'#f59e0b', online:false, time:'Yesterday',msg:'Will join the meeting.',          unread:0 },
  { id:4, name:'Emma Wilson', init:'EW', color:'#a855f7', online:true,  time:'Mon',      msg:'Designs are uploaded.',          unread:1 }
];

export const CHAT_MESSAGES = [
  [
    { init:'AK', color:'#ef4444', text:'Hey! Have you checked the latest sprint update?', time:'10:30 AM', mine:false },
    { init:'JD', color:'#3b82f6', text:'Yes just reviewed it. Looks good overall!',       time:'10:32 AM', mine:true  },
    { init:'AK', color:'#ef4444', text:'The API integration is still blocked though.',     time:'10:35 AM', mine:false },
    { init:'JD', color:'#3b82f6', text:'I know, escalating it today.',                    time:'10:38 AM', mine:true  },
    { init:'AK', color:'#ef4444', text:'Sure, will check it out!',                        time:'10:42 AM', mine:false }
  ],
  [
    { init:'BC', color:'#3b82f6', text:'Hi! The Q3 report is ready.',                     time:'9:15 AM',  mine:false },
    { init:'JD', color:'#3b82f6', text:'Great! Send it over.',                            time:'9:20 AM',  mine:true  },
    { init:'BC', color:'#3b82f6', text:'The report is ready for review.',                 time:'9:30 AM',  mine:false }
  ],
  [
    { init:'CD', color:'#22c55e', text:'Design assets uploaded to Drive.',                time:'Yesterday',mine:false },
    { init:'JD', color:'#3b82f6', text:'Perfect, thanks Carol!',                         time:'Yesterday',mine:true  },
    { init:'CD', color:'#22c55e', text:'Thanks for the update!',                         time:'Yesterday',mine:false }
  ],
  [
    { init:'DL', color:'#f59e0b', text:'Reminder: standup at 10am.',                     time:'Yesterday',mine:false },
    { init:'JD', color:'#3b82f6', text:'Will join the meeting.',                         time:'Yesterday',mine:true  }
  ],
  [
    { init:'EW', color:'#a855f7', text:'New mockups are in Figma.',                      time:'Mon',      mine:false },
    { init:'JD', color:'#3b82f6', text:'Checking now!',                                  time:'Mon',      mine:true  },
    { init:'EW', color:'#a855f7', text:'Designs are uploaded.',                          time:'Mon',      mine:false }
  ]
];

// ── Meetings ─────────────────────────────
export const MEETINGS_DATA = [
  { title:'Sprint 20 Planning',       date:'Mon, Mar 17', time:'10:00 AM', attendees:8,  type:'Planning',  color:'#3b82f6' },
  { title:'Design Review Session',    date:'Tue, Mar 18', time:'2:00 PM',  attendees:5,  type:'Review',    color:'#a855f7' },
  { title:'Weekly Team Sync',         date:'Wed, Mar 19', time:'11:00 AM', attendees:12, type:'Sync',      color:'#f59e0b' },
  { title:'Q1 Retrospective',         date:'Thu, Mar 20', time:'3:00 PM',  attendees:10, type:'Retro',     color:'#22c55e' },
  { title:'API Architecture Review',  date:'Fri, Mar 21', time:'1:00 PM',  attendees:6,  type:'Technical', color:'#ef4444' }
];

// ── Documents ────────────────────────────
export const DOCS = [
  { name:'Sprint 20 Planning Doc',     size:'2.4 MB', date:'Mar 12, 2025', icon:'📄', color:'#3b82f6' },
  { name:'Q1 Performance Report',      size:'5.1 MB', date:'Mar 10, 2025', icon:'📊', color:'#22c55e' },
  { name:'API Integration Specs',      size:'1.8 MB', date:'Mar 8, 2025',  icon:'📋', color:'#f59e0b' },
  { name:'Design System Guidelines',   size:'12 MB',  date:'Mar 5, 2025',  icon:'🎨', color:'#a855f7' },
  { name:'Security Audit Report 2025', size:'3.2 MB', date:'Mar 1, 2025',  icon:'🔒', color:'#ef4444' },
  { name:'Team Onboarding Guide',      size:'4.7 MB', date:'Feb 28, 2025', icon:'📘', color:'#6366f1' }
];

// ── Complaints ───────────────────────────
export const COMPLAINTS = [
  { id:'CMP-001', title:'Login page slow on mobile',    submitter:'Alice Kim',   date:'Mar 10, 2025', priority:'High',   status:'In Progress', sc:'#f59e0b', pc:'#ef4444' },
  { id:'CMP-002', title:'Dashboard charts not loading', submitter:'Bob Chen',    date:'Mar 9, 2025',  priority:'Critical',status:'Open',        sc:'#ef4444', pc:'#7c3aed' },
  { id:'CMP-003', title:'Email notifications delayed',  submitter:'Carol Davis', date:'Mar 8, 2025',  priority:'Medium', status:'Resolved',    sc:'#22c55e', pc:'#f59e0b' },
  { id:'CMP-004', title:'Export to PDF broken',         submitter:'David Lee',   date:'Mar 7, 2025',  priority:'High',   status:'Open',        sc:'#ef4444', pc:'#ef4444' },
  { id:'CMP-005', title:'Dark mode toggle not saving',  submitter:'Emma Wilson', date:'Mar 6, 2025',  priority:'Low',    status:'Closed',      sc:'#94a3b8', pc:'#22c55e' }
];

// ── Notices ──────────────────────────────
export const NOTICES = [
  { title:'Sprint 20 Kickoff Meeting',    date:'Mar 15, 2025', type:'Meeting',   color:'#3b82f6', body:'Sprint 20 begins on Monday March 17. All team members must attend the kickoff meeting at 10:00 AM. Please review the backlog before attending.' },
  { title:'New Security Policy Update',   date:'Mar 14, 2025', type:'Policy',    color:'#ef4444', body:'Important security policy changes effective from April 1st. All employees must complete the security awareness training by March 31st.' },
  { title:'Office Closed - Public Holiday',date:'Mar 13, 2025',type:'Holiday',   color:'#22c55e', body:'The office will be closed on March 25th for the public holiday. Please plan your work accordingly and ensure all deadlines are met before this date.' },
  { title:'Q1 Performance Reviews',       date:'Mar 12, 2025', type:'HR',        color:'#a855f7', body:'Q1 performance reviews will be conducted between March 28-31. Managers will schedule individual meetings. Please prepare your self-assessment forms.' },
  { title:'System Maintenance Window',    date:'Mar 11, 2025', type:'Technical', color:'#f59e0b', body:'Scheduled maintenance on Saturday March 22 from 2:00 AM - 6:00 AM. All services will be unavailable during this period.' }
];

// ── Attendance ───────────────────────────
export const ATTENDANCE = [
  { name:'Alice Kim',   init:'AK', color:'#ef4444', dept:'Engineering', present:18, absent:2, late:1, leave:1, status:'Active'  },
  { name:'Bob Chen',    init:'BC', color:'#3b82f6', dept:'Engineering', present:20, absent:0, late:2, leave:0, status:'Active'  },
  { name:'Carol Davis', init:'CD', color:'#22c55e', dept:'Design',      present:17, absent:1, late:0, leave:2, status:'Active'  },
  { name:'David Lee',   init:'DL', color:'#f59e0b', dept:'QA',          present:19, absent:1, late:1, leave:1, status:'Active'  },
  { name:'Emma Wilson', init:'EW', color:'#a855f7', dept:'Design',      present:15, absent:3, late:2, leave:2, status:'On Leave'}
];

export const LEAVE_REQUESTS = [
  { name:'Emma Wilson', type:'Medical Leave', from:'Mar 18', to:'Mar 20', days:3, status:'Pending', sc:'#f59e0b' },
  { name:'Carol Davis', type:'Annual Leave',  from:'Mar 25', to:'Mar 27', days:3, status:'Pending', sc:'#f59e0b' },
  { name:'Bob Chen',    type:'Personal Leave',from:'Apr 1',  to:'Apr 1',  days:1, status:'Approved',sc:'#22c55e' },
  { name:'David Lee',   type:'Medical Leave', from:'Mar 10', to:'Mar 11', days:2, status:'Approved',sc:'#22c55e' }
];