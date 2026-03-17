// src/data/mockData.js

// Dashboard 
export const STATS = [
  { label:'Total Tasks',  value:142, change:'+9%',  up:true,  icon:'📋', color:'blue'   },
  { label:'Completed',    value:89,  change:'+12%', up:true,  icon:'✅', color:'green'  },
  { label:'In Progress',  value:89,  change:'+3%',  up:true,  icon:'🔄', color:'blue'   },
  { label:'Backlog',      value:11,  change:'+2%',  up:false, icon:'⏳', color:'amber'  },
  { label:'Risk Level',   value:'Moderate', change:'', up:null, icon:'⚠️', color:'amber' },
];

export const SPRINT = {
  completion:62, day:8, totalDays:14, remaining:6,
  health:{ healthy:10, planned:60, remaining:30 }
};

export const PROJECT_PROGRESS = [
  { name:'Sarah Jenkins',  pct:100, color:'#ef4444', label:'Over!'    },
  { name:'Mike Ross',      pct:80,  color:'#f59e0b', label:'Optimal'  },
  { name:'Jessica Chang',  pct:90,  color:'#22c55e', label:'High'     },
  { name:'David Kim',      pct:60,  color:'#3b82f6', label:'Moderate' },
];

export const TEAM_PERF = [
  { name:'Sarah', done:24, hrs:3.2 },
  { name:'Mike',  done:18, hrs:4.1 },
  { name:'Jess',  done:31, hrs:2.8 },
  { name:'David', done:15, hrs:5.0 },
];

export const BOTTLENECKS = [
  { stage:'Backlog',      tasks:42, delay:'1.2 days', pct:80,  highlight:false, warning:false },
  { stage:'Development',  tasks:28, delay:'3.8 days', pct:50,  highlight:false, warning:false },
  { stage:'Development',  tasks:15, delay:'5.2 days', pct:28,  highlight:true,  warning:true, label:'15 Stuck' },
  { stage:'Done',         tasks:9,  delay:'',         pct:15,  highlight:false, warning:false },
];

export const DASH_ALERTS = [
  { type:'error',   title:'API Dependency Failure',       desc:'Payment gateway blocked by external team. Overdue by 3 days.', time:'2h ago' },
  { type:'warning', title:'QA Environment Latency',       desc:'High volume of tickets in QA stage.',                          time:'4h ago' },
  { type:'info',    title:'Missing Assets for Sprint 25', desc:'Designer out sick today.',                                     time:'6h ago' },
];

//  Projects 
export const PROJ_STATS = [
  { label:'TOTAL PROJECTS', value:12,  change:'+2',         icon:'📁', color:'gray',  highlight:false },
  { label:'ACTIVE',         value:8,   change:'',           icon:'▶️', color:'blue',  highlight:false },
  { label:'COMPLETED',      value:2,   change:'This month', icon:'✅', color:'green', highlight:false },
  { label:'DELAYED',        value:1,   change:'This month', icon:'⚠️', color:'amber', highlight:true  },
  { label:'AT RISK',        value:1,   change:'This month', icon:'❌', color:'red',   highlight:true  },
];

export const PROJ_OVERVIEW = [
  { name:'Website Redesign',  pct:75, color:'#22c55e' },
  { name:'Mobile App Launch', pct:40, color:'#3b82f6' },
  { name:'Mobile App Launch', pct:40, color:'#60a5fa' },
];

export const HEALTH = { healthy:60, warning:30, critical:10 };

export const TEAM_WORKLOAD = [
  { name:'Marcus L.', init:'ML', color:'#ef4444', pct:120, label:'120%', overload:true  },
  { name:'Sarah J.',  init:'SJ', color:'#3b82f6', pct:80,  label:'80%',  overload:false },
  { name:'David K.',  init:'DK', color:'#22c55e', pct:45,  label:'45%',  overload:false },
];

export const TIMELINE = [
  { name:'Alpha Initiative', start:0,  dur:55, color:'#86efac' },
  { name:'Beta Launch',      start:25, dur:50, color:'#93c5fd' },
  { name:'Gamma Testing',    start:50, dur:35, color:'#fde68a' },
];

export const PROJECTS_TABLE = [
  { name:'Alpha Initiative', status:'In Progress', statusC:'#3b82f6', statusBg:'#eff6ff', health:'😊', pct:75, team:['#ef4444','#3b82f6','#22c55e'] },
  { name:'Beta Launch',      status:'Delayed',     statusC:'#f59e0b', statusBg:'#fffbeb', health:'😐', pct:40, team:['#f59e0b'] },
  { name:'Project Gamma',    status:'At Risk',     statusC:'#ef4444', statusBg:'#fff5f5', health:'😞', pct:21, team:['#ef4444','#a855f7'] },
];

export const PROJ_ALERTS = [
  { type:'error',   title:'Dependency Blocked', desc:'Backend API delay is blocking Alpha initiative.' },
  { type:'warning', title:'Over-allocation',    desc:'Designer Marcus - Q4 budget'                    },
  { type:'info',    title:'Budget Update',      desc:'Q4 budget capacity 4% worn'                     },
];

//  Analytics 
export const ANALYTICS_STATS = [
  { label:'Total Tasks',     value:50,   change:'+4 this week',        up:true,  icon:'📋', color:'blue',  highlight:false },
  { label:'Total Tasks',     value:10,   change:'+12% vs last sprint', up:true,  icon:'✅', color:'green', highlight:false },
  { label:'Sprint Progress', value:'42%',change:'On Track',            up:null,  icon:'🔄', color:'amber', highlight:false },
  { label:'Active Risks',    value:5,    change:'Action Required',     up:false, icon:'⚠️', color:'red',   highlight:true  },
];

export const ISSUES_SUMMARY = {
  blocks: [
    { value:15, label:'To Do(30%)',       color:'#94a3b8', bg:'#f1f5f9' },
    { value:20, label:'In Progress(40%)', color:'#3b82f6', bg:'#3b82f6' },
    { value:5,  label:'Blocked(10%)',     color:'#ef4444', bg:'#ef4444' },
    { value:10, label:'Done(20%)',        color:'#22c55e', bg:'#22c55e' },
  ]
};

export const VELOCITY = {
  labels:    ['Day 1','Day 5','Day 10','Day 14'],
  planned:   [10, 30, 55, 80],
  completed: [8,  25, 60, 90]
};

export const WORKLOAD_DIST = [
  { name:'Marcus L.',  init:'ML', color:'#3b82f6', pct:100, label:'8 Tasks (100%)',  overload:false },
  { name:'Mike Ross',  init:'MR', color:'#ef4444', pct:120, label:'Overload (120%)', overload:true  },
  { name:'David Chen', init:'DC', color:'#22c55e', pct:50,  label:'4 Tasks (50%)',   overload:false },
];

export const CRIT_ALERTS = [
  { type:'error',   title:'API Integration Blocked', desc:'Waiting on backend deployment. Overdue by 2 days.' },
  { type:'warning', title:'QA Bottleneck',           desc:'High volume of tickets in QA stage.'              },
  { type:'info',    title:'Resource Unavailable',    desc:'Designer out sick today.'                         },
];

export const DELIVERY = { planned:24, delivered:18, pct:75 };

export const FUNNEL = [
  { stage:'Backlog', label:'45 Tasks',    pct:100, color:'#93c5fd' },
  { stage:'Dev',     label:'28 Tasks',    pct:62,  color:'#3b82f6' },
  { stage:'QA',      label:'12 Stuck',    pct:27,  color:'#fde68a' },
  { stage:'Done',    label:'18 Released', pct:40,  color:'#86efac' },
];

export const SPRINT_HEALTH_BARS = [
  { label:'Code Coverage', value:'88%',  pct:88, color:'#22c55e' },
  { label:'Bug Rate',      value:'12%',  pct:12, color:'#f59e0b' },
  { label:'Team Morale',   value:'4.2/5',pct:84, color:'#3b82f6' },
];

//  Auth 
export const AUTH = { email:'admin@gmail.com', password:'admin123' };

//  Chat 
export const CHATS = [
  { id:0, name:'Alice Kim',   init:'AK', color:'#ef4444', online:true,  time:'10:42 AM', msg:'Sure, will check it out!',      unread:2 },
  { id:1, name:'Bob Chen',    init:'BC', color:'#3b82f6', online:true,  time:'9:30 AM',  msg:'The report is ready for review',unread:1 },
  { id:2, name:'Carol Davis', init:'CD', color:'#22c55e', online:false, time:'Yesterday',msg:'Thanks for the update!',         unread:0 },
  { id:3, name:'David Lee',   init:'DL', color:'#f59e0b', online:false, time:'Yesterday',msg:'Will join the meeting.',         unread:0 },
];

export const CHAT_MESSAGES = {
  0: [{ init:'AK', color:'#ef4444', text:'Hey! Sprint update checked?', time:'10:30 AM', mine:false }, { init:'JD', color:'#3b82f6', text:'Yes, looks good!', time:'10:32 AM', mine:true }],
  1: [{ init:'BC', color:'#3b82f6', text:'Q3 report is ready.', time:'9:15 AM', mine:false }, { init:'JD', color:'#3b82f6', text:'Great! Send it over.', time:'9:20 AM', mine:true }],
  2: [{ init:'CD', color:'#22c55e', text:'Design assets uploaded.', time:'Yesterday', mine:false }],
  3: [{ init:'DL', color:'#f59e0b', text:'Standup at 10am.', time:'Yesterday', mine:false }],
};

//  Meetings 
export const MEETINGS_DATA = [
  { id:1, title:'Sprint 20 Planning',      date:'Mon, Mar 17', time:'10:00 AM', attendees:8,  type:'Planning',  color:'#3b82f6' },
  { id:2, title:'Design Review Session',   date:'Tue, Mar 18', time:'2:00 PM',  attendees:5,  type:'Review',    color:'#a855f7' },
  { id:3, title:'Weekly Team Sync',        date:'Wed, Mar 19', time:'11:00 AM', attendees:12, type:'Sync',      color:'#f59e0b' },
  { id:4, title:'Q1 Retrospective',        date:'Thu, Mar 20', time:'3:00 PM',  attendees:10, type:'Retro',     color:'#22c55e' },
  { id:5, title:'API Architecture Review', date:'Fri, Mar 21', time:'1:00 PM',  attendees:6,  type:'Technical', color:'#ef4444' },
];

//  Documents 
export const DOCS = [
  { name:'Sprint 20 Planning Doc',     size:'2.4 MB', date:'Mar 12, 2025', icon:'📄', color:'#3b82f6' },
  { name:'Q1 Performance Report',      size:'5.1 MB', date:'Mar 10, 2025', icon:'📊', color:'#22c55e' },
  { name:'API Integration Specs',      size:'1.8 MB', date:'Mar 8, 2025',  icon:'📋', color:'#f59e0b' },
  { name:'Design System Guidelines',   size:'12 MB',  date:'Mar 5, 2025',  icon:'🎨', color:'#a855f7' },
  { name:'Security Audit Report 2025', size:'3.2 MB', date:'Mar 1, 2025',  icon:'🔒', color:'#ef4444' },
];

//Complaints 
export const COMPLAINTS = [
  { id:'CMP-001', title:'Login page slow on mobile',    submitter:'Alice Kim',   date:'Mar 10, 2025', priority:'High',    status:'In Progress', sc:'#f59e0b', pc:'#ef4444' },
  { id:'CMP-002', title:'Dashboard charts not loading', submitter:'Bob Chen',    date:'Mar 9, 2025',  priority:'Critical',status:'Open',        sc:'#ef4444', pc:'#7c3aed' },
  { id:'CMP-003', title:'Email notifications delayed',  submitter:'Carol Davis', date:'Mar 8, 2025',  priority:'Medium',  status:'Resolved',    sc:'#22c55e', pc:'#f59e0b' },
];

//  Notices
export const NOTICES = [
  { title:'Sprint 20 Kickoff Meeting',     date:'Mar 15, 2025', type:'Meeting',   color:'#3b82f6', body:'Sprint 20 begins Monday March 17. All team members must attend.' },
  { title:'New Security Policy Update',    date:'Mar 14, 2025', type:'Policy',    color:'#ef4444', body:'Important security policy changes effective from April 1st.' },
  { title:'Office Closed - Public Holiday',date:'Mar 13, 2025', type:'Holiday',   color:'#22c55e', body:'The office will be closed on March 25th for the public holiday.' },
];

// Attendance 
export const ATTENDANCE = [
  { name:'Alice Kim',   init:'AK', color:'#ef4444', dept:'Engineering', present:18, absent:2, late:1, leave:1, status:'Active'   },
  { name:'Bob Chen',    init:'BC', color:'#3b82f6', dept:'Engineering', present:20, absent:0, late:2, leave:0, status:'Active'   },
  { name:'Carol Davis', init:'CD', color:'#22c55e', dept:'Design',      present:17, absent:1, late:0, leave:2, status:'Active'   },
  { name:'Emma Wilson', init:'EW', color:'#a855f7', dept:'Design',      present:15, absent:3, late:2, leave:2, status:'On Leave' },
];

export const LEAVE_REQUESTS = [
  { name:'Emma Wilson', type:'Medical Leave', from:'Mar 18', to:'Mar 20', days:3, status:'Pending',  sc:'#f59e0b' },
  { name:'Carol Davis', type:'Annual Leave',  from:'Mar 25', to:'Mar 27', days:3, status:'Pending',  sc:'#f59e0b' },
  { name:'Bob Chen',    type:'Personal Leave',from:'Apr 1',  to:'Apr 1',  days:1, status:'Approved', sc:'#22c55e' },
];