import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { API_URL } from "config"; // Import API URL
import "./ChatPage.css";
import config from "config";

const socket = io(API_URL, {
  transports: ["websocket"],
  reconnectionAttempts: 5,
  timeout: 10000,
});

const ChatPage = ({ user, setUser }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);
  const [showPlans, setShowPlans] = useState(false);
  const [typing, setTyping] = useState(false);
  const [typingUser, setTypingUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      socket.emit("user:join", user);
    }

    socket.on("chat:message", (message) => {
      setMessages((prev) => [...prev, `${message.sender}: ${message.text}`]);
    });

    socket.on("user:typing", (typingUser) => {
      if (typingUser !== user) {
        setTypingUser(typingUser);
        setTyping(true);
        setTimeout(() => setTyping(false), 2000);
      }
    });

    return () => {
      socket.off("chat:message");
      socket.off("user:typing");
    };
  }, [user]);

  const sendMessage = () => {
    if (input.trim()) {
      socket.emit("chat:message", { user, text: input });
      setMessages((prev) => [...prev, `You: ${input}`]);
      setInput("");
    }
  };

  const handleTyping = () => {
    socket.emit("user:typing", user);
  };

  const addEmoji = (emoji) => {
    setInput((prev) => prev + emoji);
    setShowEmojis(false);
  };

  const handleLogout = () => {
    socket.emit("user:leave", user);
    setUser(null);
    navigate("/");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="chat-container">
      <div className="sidebar">
        <div className="profile-section">
          <img src="/profile.jpg" alt="User" className="profile-pic" />
          <h3>{user || "Guest"}</h3>
        </div>
        <ul className="menu-list">
          <li onClick={() => navigate("/profile")}>Profile</li>
          <li onClick={() => navigate("/messages")}>Messages</li>
          <li>Friends</li>
          <li onClick={() => setShowPlans(!showPlans)} className="upgrade-btn">
            Upgrade
          </li>
          <li onClick={handleLogout} className="logout-btn">
            Logout
          </li>
        </ul>
      </div>
      <div className="chat-section">
        <div className="chat-area">
          <div className="chat-header">
            <h2>Random Chat</h2>
          </div>
          <div className="chat-box">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={msg.startsWith("You:") ? "message-sent" : "message-received"}
              >
                {msg}
              </div>
            ))}
            {typing && <div className="typing-indicator">{typingUser} is typing...</div>}
          </div>
          <div className="input-area">
            <button onClick={() => setShowEmojis(!showEmojis)}>😊</button>
            {showEmojis && (
              <div className="emoji-picker">
                {["😀", "😂", "😍", "😎", "👍", "👏", "😢", "🔥", "🎉"].map((emoji) => (
                  <span key={emoji} onClick={() => addEmoji(emoji)}>
                    {emoji}
                  </span>
                ))}
              </div>
            )}
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleTyping}
              onKeyDown={handleKeyPress}
              placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
          {showPlans && (
            <div className="plans-section">
              <h2>Upgrade Your Plan</h2>
              <div className="plan-container">
                <div className="plan bronze">
                  <h3>Bronze</h3>
                  <p>1 Week ₹199</p>
                  <button>Upgrade</button>
                </div>
                <div className="plan silver">
                  <h3>Silver</h3>
                  <p>1 Month ₹599</p>
                  <button>Upgrade</button>
                </div>
                <div className="plan gold">
                  <h3>Gold</h3>
                  <p>3 Months ₹1499</p>
                  <button>Upgrade</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
