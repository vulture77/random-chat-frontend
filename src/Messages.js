import React from "react";
import { useNavigate } from "react-router-dom";
import "./Messages.css"; // ✅ Import styles

const Messages = ({ user, chatHistory }) => {
  const navigate = useNavigate();

  if (!user) {
    return <h2 className="not-logged-in">Please log in to view messages.</h2>;
  }

  return (
    <div className="messages-container">
      <div className="sidebar">
        <div className="profile-section">
          <img src="/profile.jpg" alt="User" className="profile-pic" />
          <h3>{user}</h3>
        </div>
        <ul className="menu-list">
          <li onClick={() => navigate("/profile")}>Profile</li>
          <li className="active">Messages</li>
          <li onClick={() => navigate("/chat")}>Chat</li>
          <li onClick={() => navigate("/")}>Logout</li>
        </ul>
      </div>

      <div className="message-section">
        <h2 className="header">Messages</h2>
        <div className="chat-list">
          {chatHistory.length > 0 ? (
            chatHistory.map((chat, index) => (
              <div key={index} className="chat-item" onClick={() => navigate("/chat")}>
                <img src={chat.profilePic || "/default-avatar.png"} alt={chat.name} className="chat-avatar" />
                <div className="chat-info">
                  <h3>{chat.name}</h3>
                  <p className="last-message">{chat.lastMessage}</p>
                </div>
                <span className="timestamp">{chat.time}</span>
              </div>
            ))
          ) : (
            <p className="no-messages">No messages yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
