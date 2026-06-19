import { useState } from "react";
import "./Memory.css";

const memories = [
  { id: 1, category: "Academic",  title: "DS assignment due tonight (Jun 19)",          detail: "From conversation on Jun 14 — Assignment #3 for CS201 due at 11:59 PM.", tags: ["CS201", "Deadline"],   source: "Chat", date: "Jun 14" },
  { id: 2, category: "Academic",  title: "Physics mid-term on Jun 25",                  detail: "Jahan mentioned an upcoming physics exam during a study planning session.",  tags: ["PHY102", "Exam"],     source: "Chat", date: "Jun 15" },
  { id: 3, category: "Preference",title: "Prefers visual notes and diagrams",            detail: "Mentioned preferring mind maps and diagrams over reading long texts.",       tags: ["Learning Style"],     source: "Chat", date: "Jun 12" },
  { id: 4, category: "Academic",  title: "Weak in Thermodynamics (Ch 7)",               detail: "Struggled with entropy and heat transfer concepts in our session.",          tags: ["PHY102", "Weak Area"], source: "Chat", date: "Jun 16" },
  { id: 5, category: "Routine",   title: "Morning study routine — 7:00 AM daily",       detail: "Prefers to study in the morning before class.",                             tags: ["Routine", "Habit"],   source: "Manual", date: "Jun 10" },
  { id: 6, category: "Academic",  title: "Group project for HUM303 due Jun 22",         detail: "Presentation slides for Humanities class, group of 4 students.",            tags: ["HUM303", "Group Work"],source: "Chat", date: "Jun 17" },
  { id: 7, category: "Goal",      title: "Aiming for 80%+ in CS201 this semester",      detail: "Stated goal during goal-setting session. Struggling with Trees and Graphs.", tags: ["CS201", "Goal"],      source: "Chat", date: "Jun 11" },
  { id: 8, category: "Preference",title: "Pomodoro technique works well",               detail: "Found 25-min study blocks with 5-min breaks effective.",                   tags: ["Study Technique"],    source: "Chat", date: "Jun 13" },
];

const categories = ["All", "Academic", "Preference", "Routine", "Goal"];

export default function Memory() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = memories.filter((m) => {
    const matchCat = filter === "All" || m.category === filter;
    const matchSearch = m.title.toLowerCase().includes(search.toLowerCase()) || m.detail.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="memory-page animate-in">
      <div className="page-header">
        <div>
          <h2>Memory</h2>
          <p>Everything Jarvis remembers about you · {memories.length} entries</p>
        </div>
      </div>

      {/* Info banner */}
      <div className="memory-banner card-glass">
        <div className="memory-banner-icon">◎</div>
        <div>
          <div className="memory-banner-title">Persistent Memory Active</div>
          <p>Jarvis builds a picture of your academic life across conversations — your goals, preferences, deadlines, and study patterns — to give you more personalised, accurate help over time.</p>
        </div>
      </div>

      {/* Controls */}
      <div className="memory-controls">
        <input className="input memory-search" placeholder="🔍 Search memories…" value={search} onChange={(e) => setSearch(e.target.value)} />
        <div className="filter-tabs">
          {categories.map((c) => (
            <button key={c} className={`filter-tab ${filter === c ? "active" : ""}`} onClick={() => setFilter(c)}>{c}</button>
          ))}
        </div>
      </div>

      {/* Memory cards */}
      <div className="memory-grid">
        {filtered.map((m) => (
          <div key={m.id} className="memory-item card">
            <div className="memory-item-head">
              <span className={`badge badge-${catColor(m.category)}`}>{m.category}</span>
              <span className="memory-date">{m.date} · via {m.source}</span>
            </div>
            <div className="memory-item-title">{m.title}</div>
            <div className="memory-item-detail">{m.detail}</div>
            <div className="memory-item-tags">
              {m.tags.map((t) => (
                <span key={t} className="memory-tag">{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const catColor = (c) => ({ Academic: "accent", Preference: "warning", Routine: "success", Goal: "danger" }[c] || "accent");
