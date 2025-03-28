import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import Register from "./Register";
import Login from "./Login";
import Chat from "./Chat";
import ProfilePage from "./ProfilePage"; // ✅ Import ProfilePage
import Messages from "./Messages"; // ✅ Import Messages Component

const App = () => {
  const [user, setUser] = useState(null); // ✅ User state
  const [chatHistory, setChatHistory] = useState([
    { name: "Alice", lastMessage: "Hey! How are you?" },
    { name: "Bob", lastMessage: "Let's catch up!" },
  ]); // ✅ Dummy chat history for messages page

  return (
    <Router>
      <nav>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        {user && <Link to="/chat">Chat</Link>}
        {user && <Link to="/messages">Messages</Link>} {/* ✅ Messages Page */}
        {user && <Link to="/profile">Profile</Link>} {/* ✅ Profile Page */}
      </nav>
      
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Chat user={user} setUser={setUser} />} />
        <Route path="/messages" element={<Messages user={user} chatHistory={chatHistory} />} /> {/* ✅ Messages Page Route */}
        <Route path="/profile" element={<ProfilePage />} /> {/* ✅ Profile Page Route */}
      </Routes>
    </Router>
  );
};

export default App;
