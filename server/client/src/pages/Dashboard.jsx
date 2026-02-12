import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import "../styles/App.css";

function Dashboard() {
  const navigate = useNavigate();
  // 'chat' shows Group Chat Center, 'video' shows Video Meeting Room
  const [view, setView] = useState("chat"); 
  const [inputValue, setInputValue] = useState("");

  // WAY 1: Create - Generates a new ID and navigates
  const handleCreate = () => {
    const id = uuid().substring(0, 8);
    const route = view === "chat" ? `/chats/${id}` : `/room/${id}`;
    navigate(route);
  };

  // WAY 2: Join - Extracts ID from a link or uses raw ID
  const handleJoin = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const prefix = view === "chat" ? "/chats/" : "/room/";
    const id = inputValue.includes(prefix) ? inputValue.split(prefix)[1] : inputValue;
    
    navigate(view === "chat" ? `/chats/${id}` : `/room/${id}`);
    setInputValue("");
  };
  const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/auth");
};
  return (
    <div className="dash-container">
      {/* SIDEBAR - Exactly like your Screenshot (118) */}
      <aside className="sidebar">
        <h2 className="logo">ZoomX</h2>
        <nav className="nav-menu">
          <div 
            className={`nav-item ${view === "chat" ? "active" : ""}`} 
            onClick={() => {setView("chat"); setInputValue("");}}
          >
            <span className="icon">💬</span> Group Chat
          </div>
          <div 
            className={`nav-item ${view === "video" ? "active" : ""}`} 
            onClick={() => {setView("video"); setInputValue("");}}
          >
            <span className="icon">📹</span> Video Call
          </div>
        </nav>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="main-content">
        <header className="content-header">
          <h1>{view === "chat" ? "Group Chat Center" : "Video Meeting Room"}</h1>
          <p>Collaborate with your team instantly.</p>
        </header>

        <section className="action-grid">
          {/* CREATE CARD */}
          <div className={`glass-card ${view === "chat" ? "chat-border" : "video-border"}`}>
            <div className="card-icon">{view === "chat" ? "✨" : "🎬"}</div>
            <h3>Create {view === "chat" ? "Group" : "Call"}</h3>
            <p>Start a new session and share the link with others.</p>
            <button className="btn-primary" onClick={handleCreate}>
              Start {view === "chat" ? "Chat" : "Meeting"}
            </button>
          </div>

          {/* JOIN CARD */}
          <div className={`glass-card ${view === "chat" ? "chat-border" : "video-border"}`}>
            <div className="card-icon">🔗</div>
            <h3>Join {view === "chat" ? "Group" : "Call"}</h3>
            <p>Paste the shared link or ID to enter.</p>
            <form onSubmit={handleJoin} className="join-form">
              <input 
                type="text" 
                placeholder={`Paste ${view} link or ID here...`} 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button type="submit" className="btn-glow">Join Now</button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
