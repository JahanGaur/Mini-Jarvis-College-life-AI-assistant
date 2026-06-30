import { useState } from "react";
import "./Settings.css";

export default function Settings() {
  const [voice, setVoice]       = useState(true);
  const [notifs, setNotifs]     = useState(true);
  const [memory, setMemory]     = useState(true);
  const [autoTask, setAutoTask] = useState(true);
  const [theme]                 = useState("dark");
  const [model, setModel]       = useState("gemini-1.5-pro");

  return (
    <div className="settings-page animate-in">
      <div className="page-header">
        <h2>Settings</h2>
        <p>Manage your Jarvis preferences and account</p>
      </div>

      <div className="settings-layout">
        {/* Left column */}
        <div className="settings-col">

          {/* Profile */}
          <div className="card settings-section">
            <h3>Profile</h3>
            <div className="divider" />
            <div className="profile-row">
              <div className="profile-avatar-lg">JG</div>
              <div className="profile-info">
                <div className="form-group">
                  <label>Full Name</label>
                  <input className="input" defaultValue="Jahan Gaur" />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input className="input" defaultValue="jahan@example.com" type="email" />
                </div>
                <div className="form-group">
                  <label>Role</label>
                  <select className="input">
                    <option>Student</option>
                    <option>Teacher</option>
                    <option>Professional</option>
                  </select>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12 }}>
              <button className="btn btn-primary">Save Changes</button>
            </div>
          </div>

          {/* AI Model */}
          <div className="card settings-section">
            <h3>AI Engine</h3>
            <div className="divider" />
            <div className="form-group">
              <label>Model</label>
              <select className="input" value={model} onChange={(e) => setModel(e.target.value)}>
                <option value="gemini-1.5-pro">Gemini 1.5 Pro (Free Tier)</option>
                <option value="gemini-1.5-flash">Gemini 1.5 Flash (Faster)</option>
                <option value="ollama-llama3">Ollama — LLaMA 3 (Offline)</option>
                <option value="openrouter">OpenRouter (Backup)</option>
              </select>
            </div>
            <p className="settings-note">Gemini 1.5 Pro is the default. Switch to Ollama for offline use when the feature is available.</p>
          </div>

        </div>

        {/* Right column */}
        <div className="settings-col">

          {/* Toggles */}
          <div className="card settings-section">
            <h3>Features</h3>
            <div className="divider" />

            <ToggleRow
              label="Voice Activation"
              sub='Activate Jarvis by saying "Hey Jarvis"'
              value={voice}
              onChange={setVoice}
            />
            <ToggleRow
              label="Notifications & Reminders"
              sub="Browser push notifications for deadlines and reminders"
              value={notifs}
              onChange={setNotifs}
            />
            <ToggleRow
              label="Persistent Memory"
              sub="Allow Jarvis to remember info across sessions"
              value={memory}
              onChange={setMemory}
            />
            <ToggleRow
              label="Auto Task Extraction"
              sub="Automatically extract tasks from chat conversations"
              value={autoTask}
              onChange={setAutoTask}
            />
          </div>

          {/* Appearance */}
          <div className="card settings-section">
            <h3>Appearance</h3>
            <div className="divider" />
            <div className="theme-options">
              {["dark", "darker", "light"].map((t) => (
                <div key={t} className={`theme-option ${theme === t ? "active" : ""}`}>
                  <div className={`theme-preview theme-${t}`} />
                  <span>{t.charAt(0).toUpperCase() + t.slice(1)}</span>
                </div>
              ))}
            </div>
            <p className="settings-note">Light theme coming in a future update.</p>
          </div>

          {/* Danger zone */}
          <div className="card settings-section danger-zone">
            <h3>Data & Privacy</h3>
            <div className="divider" />
            <div className="danger-actions">
              <div>
                <div className="danger-label">Clear All Memories</div>
                <div className="danger-desc">Permanently delete all stored memory entries.</div>
              </div>
              <button className="btn btn-danger">Clear</button>
            </div>
            <div className="divider" />
            <div className="danger-actions">
              <div>
                <div className="danger-label">Delete Account</div>
                <div className="danger-desc">This action cannot be undone.</div>
              </div>
              <button className="btn btn-danger">Delete</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function ToggleRow({ label, sub, value, onChange }) {
  return (
    <div className="toggle-row">
      <div>
        <div className="toggle-row-label">{label}</div>
        <div className="toggle-row-sub">{sub}</div>
      </div>
      <button className={`toggle-btn ${value ? "on" : "off"}`} onClick={() => onChange(!value)}>
        <span className="toggle-knob" />
      </button>
    </div>
  );
}
