import "./AuthPage.css";
import { useState } from "react";

export default function AuthPage({ onSkip }) {
  const [tab, setTab] = useState("login");

  return (
    <div className="auth-page">
      <div className="auth-grid" />
      <div className="auth-glow" />

      {/* Left panel */}
      <div className="auth-left">
        <div className="auth-brand">
          <div className="auth-logo-ring"><span>J</span></div>
          <div>
            <div className="auth-brand-name">JARVIS</div>
            <div className="auth-brand-sub">AI Study Assistant</div>
          </div>
        </div>

        <div className="auth-orb">
          <div className="auth-orb-outer">
            <div className="auth-orb-mid">
              <div className="auth-orb-core">J</div>
            </div>
          </div>
        </div>

        <div className="auth-tagline">
          <h2>Think Smarter,<br />Study Better.</h2>
          <p>Your AI-powered academic companion that remembers, plans, and guides — so you don't have to keep track of everything alone.</p>
        </div>
      </div>

      {/* Right panel */}
      <div className="auth-right">
        <div className="auth-card">
          {/* Skip button */}
          <button className="skip-btn" onClick={onSkip}>
            Skip → Enter App
          </button>

          {/* Tabs */}
          <div className="auth-tabs">
            <button className={`auth-tab ${tab === "login" ? "active" : ""}`} onClick={() => setTab("login")}>Sign In</button>
            <button className={`auth-tab ${tab === "signup" ? "active" : ""}`} onClick={() => setTab("signup")}>Sign Up</button>
          </div>

          {tab === "login" ? (
            <div className="auth-form animate-in">
              <h3>Welcome back</h3>
              <p className="auth-form-sub">Sign in to your Jarvis account</p>

              <div className="form-group">
                <label>Email</label>
                <input className="input" type="email" placeholder="you@example.com" />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input className="input" type="password" placeholder="••••••••" />
                <a className="forgot-link" href="#">Forgot password?</a>
              </div>

              <button className="btn btn-primary full-w" onClick={onSkip}>Sign In</button>

              <div className="auth-divider"><span>or continue with</span></div>
              <button className="btn btn-ghost full-w oauth-btn">
                <span>G</span> Continue with Google
              </button>
            </div>
          ) : (
            <div className="auth-form animate-in">
              <h3>Create your account</h3>
              <p className="auth-form-sub">Start your journey with Jarvis</p>

              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <input className="input" type="text" placeholder="Jahan" />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input className="input" type="text" placeholder="Gaur" />
                </div>
              </div>
              <div className="form-group">
                <label>Email</label>
                <input className="input" type="email" placeholder="you@example.com" />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input className="input" type="password" placeholder="Create a strong password" />
              </div>

              <button className="btn btn-primary full-w" onClick={onSkip}>Create Account</button>

              <div className="auth-divider"><span>or continue with</span></div>
              <button className="btn btn-ghost full-w oauth-btn">
                <span>G</span> Continue with Google
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
