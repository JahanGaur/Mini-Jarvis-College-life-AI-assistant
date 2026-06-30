import "./Sidebar.css";

const navItems = [
  { id: "dashboard", label: "Dashboard",  icon: "⬡" },
  { id: "chat",      label: "Jarvis Chat", icon: "◈" },
  { id: "tasks",     label: "Tasks",       icon: "◻" },
  { id: "reminders", label: "Reminders",   icon: "◷" },
  { id: "calendar",  label: "Calendar",    icon: "▦" },
  { id: "memory",    label: "Memory",      icon: "◎" },
];

export default function Sidebar({ current, navigate }) {
  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo" onClick={() => navigate("dashboard")}>
        <div className="logo-ring">
          <span className="logo-j">J</span>
        </div>
        <div>
          <div className="logo-name">JARVIS</div>
          <div className="logo-sub">AI Assistant</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="sidebar-nav">
        <div className="nav-label">NAVIGATION</div>
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${current === item.id ? "active" : ""}`}
            onClick={() => navigate(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label-text">{item.label}</span>
            {current === item.id && <span className="nav-indicator" />}
          </button>
        ))}
      </nav>

      {/* Bottom */}
      <div className="sidebar-bottom">
        <div className="divider" />
        <button
          className={`nav-item ${current === "settings" ? "active" : ""}`}
          onClick={() => navigate("settings")}
        >
          <span className="nav-icon">⚙</span>
          <span className="nav-label-text">Settings</span>
        </button>
        <div className="sidebar-user">
          <div className="user-avatar">JS</div>
          <div className="user-info">
            <div className="user-name">Jahan Gaur</div>
            <div className="user-role">Student</div>
          </div>
          <div className="user-status" />
        </div>
      </div>
    </aside>
  );
}
