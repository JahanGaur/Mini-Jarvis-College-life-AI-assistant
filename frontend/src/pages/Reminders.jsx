import { useState } from "react";
import "./Reminders.css";

const reminders = [
  { id: 1, title: "Submit Data Structures Assignment #3", time: "Jun 19, 11:59 PM", repeat: "None",    type: "danger",  tag: "Assignment", active: true },
  { id: 2, title: "Study session — Thermodynamics Ch 7",  time: "Jun 20, 10:00 AM", repeat: "None",    type: "accent",  tag: "Study",      active: true },
  { id: 3, title: "Group project meeting — HUM303",        time: "Jun 21, 2:00 PM",  repeat: "None",    type: "warning", tag: "Meeting",    active: true },
  { id: 4, title: "Morning study routine",                 time: "Daily, 7:00 AM",   repeat: "Daily",   type: "success", tag: "Routine",    active: true },
  { id: 5, title: "Submit presentation — HUM303",          time: "Jun 22, 9:00 AM",  repeat: "None",    type: "warning", tag: "Deadline",   active: true },
  { id: 6, title: "Physics mid-term revision",             time: "Jun 24, 4:00 PM",  repeat: "None",    type: "accent",  tag: "Study",      active: false },
];

export default function Reminders() {
  const [items, setItems] = useState(reminders);
  const [showForm, setShowForm] = useState(false);

  const toggle = (id) => setItems((r) => r.map((x) => x.id === id ? { ...x, active: !x.active } : x));

  return (
    <div className="reminders-page animate-in">
      <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h2>Reminders</h2>
          <p>Stay on top of deadlines and study sessions</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          + New Reminder
        </button>
      </div>

      {/* New reminder form */}
      {showForm && (
        <div className="card reminder-form animate-in">
          <h3>New Reminder</h3>
          <div className="form-row-2">
            <div className="form-group">
              <label>Title</label>
              <input className="input" placeholder="What do you need to remember?" />
            </div>
            <div className="form-group">
              <label>Date & Time</label>
              <input className="input" type="datetime-local" />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select className="input">
                <option>Assignment</option>
                <option>Study</option>
                <option>Meeting</option>
                <option>Routine</option>
                <option>Deadline</option>
              </select>
            </div>
            <div className="form-group">
              <label>Repeat</label>
              <select className="input">
                <option>None</option>
                <option>Daily</option>
                <option>Weekly</option>
              </select>
            </div>
          </div>
          <div className="form-actions">
            <button className="btn btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={() => setShowForm(false)}>Save Reminder</button>
          </div>
        </div>
      )}

      {/* Timeline */}
      <div className="reminder-timeline">
        <div className="timeline-label">Active Reminders</div>
        {items.filter((r) => r.active).map((r) => (
          <ReminderCard key={r.id} r={r} onToggle={toggle} />
        ))}

        <div className="timeline-label" style={{ marginTop: 24 }}>Snoozed / Inactive</div>
        {items.filter((r) => !r.active).map((r) => (
          <ReminderCard key={r.id} r={r} onToggle={toggle} />
        ))}
      </div>
    </div>
  );
}

function ReminderCard({ r, onToggle }) {
  return (
    <div className={`reminder-card card ${!r.active ? "inactive" : ""}`}>
      <div className={`reminder-type-bar type-${r.type}`} />
      <div className="reminder-card-body">
        <div className="reminder-card-title">{r.title}</div>
        <div className="reminder-card-meta">
          <span className="reminder-card-time">🕐 {r.time}</span>
          {r.repeat !== "None" && <span className="badge badge-accent">↻ {r.repeat}</span>}
          <span className={`badge badge-${r.type}`}>{r.tag}</span>
        </div>
      </div>
      <button className={`toggle-btn ${r.active ? "on" : "off"}`} onClick={() => onToggle(r.id)}>
        <span className="toggle-knob" />
      </button>
    </div>
  );
}
