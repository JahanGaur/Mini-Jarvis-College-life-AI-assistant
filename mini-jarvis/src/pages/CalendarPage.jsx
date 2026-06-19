import { useState } from "react";
import "./CalendarPage.css";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const events = {
  19: [{ label: "DS Assignment Due", color: "danger" }, { label: "Study Session", color: "accent" }],
  20: [{ label: "Lab Report Draft", color: "danger" }],
  21: [{ label: "Group Meeting", color: "warning" }],
  22: [{ label: "Presentation Due", color: "warning" }],
  24: [{ label: "Physics Revision", color: "accent" }],
  25: [{ label: "Physics Mid-Term", color: "danger" }],
  28: [{ label: "MATH301 Quiz", color: "warning" }],
};

export default function CalendarPage() {
  const [month, setMonth] = useState(5); // June = 5
  const [year]  = useState(2026);
  const [selected, setSelected] = useState(19);

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

  return (
    <div className="calendar-page animate-in">
      <div className="page-header">
        <h2>Calendar</h2>
        <p>Monthly view · Study planner and deadlines</p>
      </div>

      <div className="calendar-layout">
        {/* Calendar */}
        <div className="calendar-card card">
          <div className="cal-nav">
            <button className="btn btn-ghost btn-xs" onClick={() => setMonth((m) => (m - 1 + 12) % 12)}>← Prev</button>
            <h3>{MONTHS[month]} {year}</h3>
            <button className="btn btn-ghost btn-xs" onClick={() => setMonth((m) => (m + 1) % 12)}>Next →</button>
          </div>

          <div className="cal-grid-header">
            {DAYS.map((d) => <div key={d} className="cal-day-name">{d}</div>)}
          </div>

          <div className="cal-grid">
            {cells.map((day, i) => {
              if (!day) return <div key={`e-${i}`} className="cal-cell empty" />;
              const hasEvents = events[day];
              const isToday = day === 19 && month === 5;
              return (
                <div
                  key={day}
                  className={`cal-cell ${isToday ? "today" : ""} ${selected === day ? "selected" : ""} ${hasEvents ? "has-events" : ""}`}
                  onClick={() => setSelected(day)}
                >
                  <span className="cal-day-num">{day}</span>
                  {hasEvents && (
                    <div className="cal-dots">
                      {hasEvents.slice(0, 3).map((e, j) => (
                        <span key={j} className={`cal-dot dot-${e.color}`} />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Side panel */}
        <div className="calendar-side">
          <div className="card">
            <h3>
              {selected ? `${MONTHS[month]} ${selected}, ${year}` : "Select a day"}
            </h3>
            <div className="divider" />
            {selected && events[selected] ? (
              <div className="day-events">
                {events[selected].map((e, i) => (
                  <div key={i} className={`day-event event-${e.color}`}>
                    <div className={`event-dot dot-${e.color}`} />
                    {e.label}
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-events">No events on this day.</p>
            )}
            <button className="btn btn-ghost full-w" style={{ marginTop: 16 }}>+ Add Event</button>
          </div>

          <div className="card legend-card">
            <h4>Legend</h4>
            <div className="legend-items">
              <div className="legend-item"><span className="cal-dot dot-danger" /> Deadline / Due</div>
              <div className="legend-item"><span className="cal-dot dot-warning" /> Meeting / Exam</div>
              <div className="legend-item"><span className="cal-dot dot-accent" /> Study Session</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
