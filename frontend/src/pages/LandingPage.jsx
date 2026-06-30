import "./LandingPage.css";

export default function LandingPage({ onEnter }) {
  return (
    <div className="landing">
      {/* Background grid */}
      <div className="landing-grid" />
      <div className="landing-glow" />

      {/* Header */}
      <header className="landing-header">
        <div className="landing-logo">
          <div className="landing-logo-ring"><span>J</span></div>
          <span className="landing-logo-text">JARVIS</span>
        </div>
        <button className="btn btn-ghost btn-sm" onClick={onEnter}>
          Sign In →
        </button>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="hero-badge">
          <span className="badge badge-accent">AI-Powered Study Assistant</span>
        </div>

        <h1 className="hero-title">
          Your Intelligence,<br />
          <span className="hero-accent">Amplified.</span>
        </h1>

        <p className="hero-desc">
          Jarvis learns how you think, remembers what matters, and helps you
          stay on top of assignments, deadlines, and goals — so you can focus
          on actually learning.
        </p>

        <div className="hero-actions">
          <button className="btn btn-primary hero-cta" onClick={onEnter}>
            Get Started Free
          </button>
          <button className="btn btn-ghost" onClick={onEnter}>
            See it in action ↓
          </button>
        </div>

        {/* Orb */}
        <div className="hero-orb">
          <div className="orb-outer">
            <div className="orb-mid">
              <div className="orb-inner">
                <span>J</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <p className="section-eyebrow">What Jarvis Does</p>
        <h2 className="section-title">Built for students who mean business</h2>

        <div className="features-grid">
          {features.map((f) => (
            <div className="feature-card" key={f.title}>
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <h2>Ready to study smarter?</h2>
        <p>No credit card. No setup. Just Jarvis.</p>
        <button className="btn btn-primary" onClick={onEnter}>
          Launch Jarvis →
        </button>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <span>© 2026 Jarvis AI</span>
        <span className="footer-sep">·</span>
        <span>Built for students</span>
      </footer>
    </div>
  );
}

const features = [
  { icon: "◈", title: "Jarvis Chat",    desc: "Talk to your AI assistant — ask questions, get summaries, brainstorm ideas, and more." },
  { icon: "◎", title: "Memory System",  desc: "Jarvis remembers your notes, past conversations, and important context across sessions." },
  { icon: "◻", title: "Task Engine",    desc: "Automatically extracts tasks from your messages and organises them by priority and deadline." },
  { icon: "◷", title: "Reminders",      desc: "Smart reminders that adapt to your schedule and nudge you at the right time." },
  { icon: "▦", title: "Study Planner",  desc: "Plan your week with an intelligent calendar that accounts for your workload and deadlines." },
  { icon: "⬡", title: "Smart Insights", desc: "Personalised recommendations to improve focus, study patterns, and academic performance." },
];
