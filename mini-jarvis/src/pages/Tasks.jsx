import { useState } from "react";
import "./Tasks.css";

const initialTasks = [
  { id: 1, title: "Data Structures Assignment #3",   subject: "CS201",   due: "Jun 19, 11:59 PM", priority: "High",   done: false, extracted: true },
  { id: 2, title: "Submit lab report draft",          subject: "CHE201",  due: "Jun 20, 5:00 PM",  priority: "High",   done: false, extracted: false },
  { id: 3, title: "Read Chapter 7 — Thermodynamics",  subject: "PHY102",  due: "Jun 21",           priority: "Medium", done: false, extracted: false },
  { id: 4, title: "Prepare presentation slides",      subject: "HUM303",  due: "Jun 22",           priority: "Medium", done: false, extracted: true },
  { id: 5, title: "Practice DSA problems — Trees",    subject: "CS201",   due: "Jun 23",           priority: "Medium", done: false, extracted: false },
  { id: 6, title: "Study for Physics mid-term",       subject: "PHY102",  due: "Jun 25",           priority: "High",   done: false, extracted: false },
  { id: 7, title: "Review lecture notes",             subject: "MATH301", due: "Jun 19",           priority: "Low",    done: true,  extracted: false },
  { id: 8, title: "Submit quiz response form",        subject: "HUM303",  due: "Jun 18",           priority: "Low",    done: true,  extracted: true },
];

const filters = ["All", "Today", "Pending", "Completed"];

export default function Tasks() {
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState("All");
  const [newTask, setNewTask] = useState("");

  const toggle = (id) => setTasks((t) => t.map((x) => x.id === id ? { ...x, done: !x.done } : x));

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks((t) => [...t, { id: Date.now(), title: newTask, subject: "General", due: "No due date", priority: "Medium", done: false, extracted: false }]);
    setNewTask("");
  };

  const filtered = tasks.filter((t) => {
    if (filter === "Pending")   return !t.done;
    if (filter === "Completed") return t.done;
    if (filter === "Today")     return t.due.includes("Jun 19");
    return true;
  });

  const pending   = tasks.filter((t) => !t.done).length;
  const completed = tasks.filter((t) => t.done).length;

  return (
    <div className="tasks-page animate-in">
      <div className="page-header">
        <h2>Tasks</h2>
        <p>Manage your assignments and to-dos · {pending} pending, {completed} done</p>
      </div>

      {/* Add task */}
      <div className="task-add card">
        <input
          className="input"
          placeholder="Add a new task…"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <button className="btn btn-primary" onClick={addTask}>+ Add Task</button>
      </div>

      {/* Filter tabs */}
      <div className="filter-tabs">
        {filters.map((f) => (
          <button key={f} className={`filter-tab ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>
            {f}
            <span className="filter-count">
              {f === "All" ? tasks.length : f === "Pending" ? pending : f === "Completed" ? completed : tasks.filter((t) => t.due.includes("Jun 19")).length}
            </span>
          </button>
        ))}
      </div>

      {/* Task cards */}
      <div className="task-cards">
        {filtered.map((t) => (
          <div key={t.id} className={`task-card card ${t.done ? "task-done" : ""}`}>
            <button className={`task-check-lg ${t.done ? "done" : ""}`} onClick={() => toggle(t.id)}>
              {t.done ? "✓" : ""}
            </button>
            <div className="task-card-body">
              <div className={`task-card-title ${t.done ? "striked" : ""}`}>{t.title}</div>
              <div className="task-card-meta">
                <span className="badge badge-accent">{t.subject}</span>
                <span className="task-due">📅 {t.due}</span>
                {t.extracted && <span className="badge badge-success">AI Extracted</span>}
              </div>
            </div>
            <span className={`badge badge-${t.priority === "High" ? "danger" : t.priority === "Medium" ? "warning" : "success"}`}>
              {t.priority}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
