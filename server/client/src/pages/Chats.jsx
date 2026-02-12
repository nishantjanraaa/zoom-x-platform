import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import "../styles/chat.css";

// Connect to the backend server
const socket = io(process.env.REACT_APP_BACKEND_URL || "http://localhost:5000");

function Chats() {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Join the room on load
    socket.emit("join_room", groupId);

    // Listen for messages
    socket.on("receive_message", (data) => {
      setChatHistory((list) => [...list, { ...data, type: "received" }]);
    });
    
  return () => {
  socket.off("receive_message");
  socket.emit("leave_room", groupId);
};
    
  }, [groupId]);

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const messageData = {
      room: groupId,
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    await socket.emit("send_message", messageData);
    // Add our own message to the history
    setChatHistory((list) => [...list, { ...messageData, type: "sent" }]);
    setMessage("");
  };

  return (
    <div className="chat-layout">
      <aside className="mini-sidebar">
        <div className="avatar-circle">#</div>
        <button className="back-circle" onClick={() => navigate("/dashboard")}>←</button>
      </aside>

      <main className="chat-main">
        <header className="chat-top-bar">
          <div className="room-info">
            <h3>Room: {groupId}</h3>
            <p className="status-dot">● Live</p>
          </div>
          <button className="btn-secondary" onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            alert("Link Copied!");
          }}>Copy Link</button>
        </header>

        <div className="messages-container">
          {chatHistory.map((msg, index) => (
            <div key={index} className={`message-wrapper ${msg.type}`}>
              <div className="message-bubble">
                <p>{msg.text}</p>
                <span className="msg-time">{msg.time}</span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form className="chat-input-wrapper" onSubmit={handleSend}>
          <input 
            placeholder="Type your message..." 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit" className="send-icon-btn">➤</button>
        </form>
      </main>
    </div>
  );
}

export default Chats;
