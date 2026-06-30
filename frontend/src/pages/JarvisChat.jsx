import "./JarvisChat.css";
import { useEffect, useState } from "react";

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
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const loadHistory = async () => {
    try {
      const response = await fetch("http://localhost:5000/chat/history");

      const history = await response.json();

      if (history.length === 0) {
        setMessages([
          {
            role: "jarvis",
            text: "Hello Jahan. I'm Jarvis — your AI study assistant.",
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ]);
        return;
      }

      setMessages(
        history.map((msg) => ({
          role: msg.role === "assistant" ? "jarvis" : "user",
          text: msg.content,
          time: new Date(msg.created_at).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        }))
      );
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
      loadHistory();
  }, []);

  const send = async (text) => {
  const msg = text || input.trim();
  if (!msg) return;
  setInput("");
  setMessages((prev) => [
    ...prev,
    {
      role: "user",
      text: msg,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);

  try {
    const response = await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: msg,
      }),
    });

    const data = await response.json();

    setMessages((prev) => [
      ...prev,
      {
        role: "jarvis",
        text: data.reply,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
  } catch (err) {
    setMessages((prev) => [
      ...prev,
      {
        role: "jarvis",
        text: "Unable to reach the backend.",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
  }
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
