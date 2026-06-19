import { useState } from "react";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import JarvisChat from "./pages/JarvisChat";
import Tasks from "./pages/Tasks";
import Reminders from "./pages/Reminders";
import CalendarPage from "./pages/CalendarPage";
import Memory from "./pages/Memory";
import Settings from "./pages/Settings";
import Sidebar from "./components/Sidebar";
import "./styles/global.css";

export default function App() {
  const [page, setPage] = useState("landing");
  const [authed, setAuthed] = useState(false);

  const navigate = (p) => setPage(p);

  if (!authed) {
    if (page === "landing") return <LandingPage onEnter={() => navigate("auth")} />;
    if (page === "auth") return <AuthPage onSkip={() => { setAuthed(true); navigate("dashboard"); }} />;
  }

  const pages = {
    dashboard: <Dashboard navigate={navigate} />,
    chat: <JarvisChat />,
    tasks: <Tasks />,
    reminders: <Reminders />,
    calendar: <CalendarPage />,
    memory: <Memory />,
    settings: <Settings />,
  };

  return (
    <div className="app-shell">
      <Sidebar current={page} navigate={navigate} />
      <main className="main-content">
        {pages[page] || <Dashboard navigate={navigate} />}
      </main>
    </div>
  );
}
