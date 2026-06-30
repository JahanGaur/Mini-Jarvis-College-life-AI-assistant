import { useState } from "react";
import "./JarvisChat.css";

const suggestions = [
  "Summarise Chapter 7 for me",
  "What tasks are due today?",
  "Create a study plan for next week",
  "Remind me about my DS assignment",
];

const initialMessages = [
  {
    role: "jarvis",
    text: "Hello Jahan. I'm Jarvis — your AI study assistant. I remember your previous sessions, your upcoming deadlines, and your study preferences. What can I help you with today?",
    time: "9:41 PM",
  },
];

export default function JarvisChat() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");

  const send = (text) => {
    const msg = text || input.trim();
    if (!msg) return;
    setMessages((prev) => [
      ...prev,
      { role: "user", text: msg, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) },
      { role: "jarvis", text: "[ Jarvis AI response will appear here once the backend is connected. ]", time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), pending: true },
    ]);
    setInput("");
  };

  return (
    <div className="chat-page">
      {/* Header */}
      <div className="chat-header">
        <div className="chat-avatar">
          <div className="chat-av-ring">
            <div className="chat-av-core">J</div>
          </div>
          <div className="chat-av-dot" />
        </div>
        <div>
          <h3>Jarvis</h3>
          <p className="chat-status">AI Assistant · Online</p>
        </div>
        <div className="chat-header-actions">
          <span className="badge badge-success">Live</span>
          <button className="btn btn-ghost btn-xs">Clear Chat</button>
        </div>
      </div>

      {/* Messages */}
      <div className="chat-messages">
        {messages.map((m, i) => (
          <div key={i} className={`msg-row ${m.role}`}>
            {m.role === "jarvis" && (
              <div className="msg-avatar-sm">J</div>
            )}
            <div className="msg-bubble">
              <div className={`msg-text ${m.pending ? "pending" : ""}`}>{m.text}</div>
              <div className="msg-time">{m.time}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Suggestions */}
      {messages.length <= 2 && (
        <div className="chat-suggestions">
          {suggestions.map((s) => (
            <button key={s} className="suggestion-chip" onClick={() => send(s)}>
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="chat-input-bar">
        <button className="chat-mic-btn" title="Voice activation">🎤</button>
        <input
          className="input chat-input"
          placeholder='Ask Jarvis anything… or say "Hey Jarvis"'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
        />
        <button className="btn btn-primary chat-send" onClick={() => send()}>Send ↑</button>
      </div>

      {/* Voice hint */}
      <p className="voice-hint">Say <strong>"Hey Jarvis"</strong> to activate voice mode</p>
    </div>
  );
}
