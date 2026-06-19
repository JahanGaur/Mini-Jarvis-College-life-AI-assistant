import "./Dashboard.css";

export default function Dashboard({ navigate }) {
  return (
    <div className="dashboard animate-in">
      {/* Header */}
      <div className="dash-header">
        <div>
          <h2>Good evening, Jahan 👋</h2>
          <p>Here's what's happening today — Friday, 19 June 2026</p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate("chat")}>
          ◈ Ask Jarvis
        </button>
      </div>

      {/* Stats Row */}
      <div className="stats-row">
        {stats.map((s) => (
          <div className="stat-card card" key={s.label}>
            <div className="stat-icon" style={{ background: s.bg }}>{s.icon}</div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="dash-grid">
        {/* Tasks */}
        <div className="card dash-tasks">
          <div className="card-head">
            <h3>Current Tasks</h3>
            <button className="btn btn-ghost btn-xs" onClick={() => navigate("tasks")}>View All →</button>
          </div>
          <div className="task-list">
            {tasks.map((t) => (
              <div className="task-item" key={t.title}>
                <div className={`task-check ${t.done ? "done" : ""}`}>{t.done ? "✓" : ""}</div>
                <div className="task-info">
                  <div className={`task-title ${t.done ? "striked" : ""}`}>{t.title}</div>
                  <div className="task-meta">{t.subject} · {t.due}</div>
                </div>
                <span className={`badge badge-${t.priority === "High" ? "danger" : t.priority === "Medium" ? "warning" : "success"}`}>
                  {t.priority}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Reminders */}
        <div className="card dash-reminders">
          <div className="card-head">
            <h3>Upcoming Reminders</h3>
            <button className="btn btn-ghost btn-xs" onClick={() => navigate("reminders")}>View All →</button>
          </div>
          <div className="reminder-list">
            {reminders.map((r) => (
              <div className="reminder-item" key={r.title}>
                <div className="reminder-time">{r.time}</div>
                <div className="reminder-body">
                  <div className="reminder-title">{r.title}</div>
                  <div className="reminder-sub">{r.sub}</div>
                </div>
                <span className={`badge badge-${r.type}`}>{r.tag}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Jarvis Panel */}
        <div className="card-glass dash-jarvis" onClick={() => navigate("chat")}>
          <div className="jarvis-panel-orb">
            <div className="jp-outer"><div className="jp-inner">J</div></div>
          </div>
          <div className="jarvis-panel-text">
            <h3>Jarvis is ready</h3>
            <p>Ask me anything — assignments, summaries, planning, or just a study session.</p>
          </div>
          <button className="btn btn-primary jarvis-panel-btn">Start Chatting →</button>
        </div>

        {/* Study Planner Preview */}
        <div className="card dash-planner">
          <div className="card-head">
            <h3>This Week</h3>
            <button className="btn btn-ghost btn-xs" onClick={() => navigate("calendar")}>Open Calendar →</button>
          </div>
          <div className="week-bars">
            {weekDays.map((d) => (
              <div className="week-day" key={d.day}>
                <div className="week-bar-wrap">
                  <div className="week-bar" style={{ height: `${d.load}%`, background: d.load > 70 ? "var(--danger)" : d.load > 40 ? "var(--warning)" : "var(--accent)" }} />
                </div>
                <div className="week-day-label">{d.day}</div>
              </div>
            ))}
          </div>
          <p className="planner-note">Workload heatmap for the week</p>
        </div>

        {/* Memory Snippets */}
        <div className="card dash-memory">
          <div className="card-head">
            <h3>Recent Memories</h3>
            <button className="btn btn-ghost btn-xs" onClick={() => navigate("memory")}>View All →</button>
          </div>
          <div className="memory-chips">
            {memoryChips.map((m) => (
              <div className="memory-chip" key={m}>{m}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const stats = [
  { label: "Tasks Due Today", value: "4",  icon: "◻", bg: "rgba(248,113,113,0.15)" },
  { label: "Completed This Week", value: "11", icon: "✓", bg: "rgba(52,211,153,0.15)" },
  { label: "Reminders Active", value: "6",  icon: "◷", bg: "rgba(251,191,36,0.15)" },
  { label: "Memory Entries", value: "28",  icon: "◎", bg: "rgba(108,99,255,0.15)" },
];

const tasks = [
  { title: "Data Structures Assignment #3", subject: "CS201", due: "Today 11:59 PM", priority: "High",   done: false },
  { title: "Read Chapter 7 — Thermodynamics", subject: "PHY102", due: "Tomorrow",      priority: "Medium", done: false },
  { title: "Prepare presentation slides",   subject: "HUM303", due: "Jun 22",          priority: "Medium", done: false },
  { title: "Submit lab report draft",       subject: "CHE201", due: "Jun 20",           priority: "High",   done: false },
  { title: "Review lecture notes",          subject: "MATH301", due: "Jun 19",          priority: "Low",    done: true  },
];

const reminders = [
  { time: "Tonight 9 PM",  title: "Assignment submission deadline",   sub: "Data Structures #3",        type: "danger",  tag: "Urgent" },
  { time: "Tomorrow 10 AM",title: "Study session — Thermodynamics",   sub: "Chapter 7 deep dive",       type: "warning", tag: "Study" },
  { time: "Jun 21 2 PM",   title: "Group project meeting",            sub: "Humanities 303 team",       type: "accent",  tag: "Meeting" },
  { time: "Jun 22 9 AM",   title: "Presentation submission",          sub: "HUM303 slide deck due",     type: "warning", tag: "Due" },
];

const weekDays = [
  { day: "Mon", load: 30 },
  { day: "Tue", load: 60 },
  { day: "Wed", load: 85 },
  { day: "Thu", load: 45 },
  { day: "Fri", load: 90 },
  { day: "Sat", load: 20 },
  { day: "Sun", load: 10 },
];

const memoryChips = [
  "DS assignment due tonight",
  "Prefer visual study notes",
  "Physics exam next week",
  "Group project — HUM303",
  "Weak in Thermodynamics",
  "Morning study routine",
  "Lab report pending",
];
