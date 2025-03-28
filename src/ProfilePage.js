import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";

const ProfilePage = ({ user, setUser }) => {
  const [name, setName] = useState(user?.name || "");
  const [gender, setGender] = useState(user?.gender || "Other");
  const [dob, setDob] = useState(user?.dob || "");
  const [profilePic, setProfilePic] = useState(user?.profilePic || "/default-profile.png");

  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePic(imageUrl);
    }
  };

  const handleSave = () => {
    setUser({ name, gender, dob, profilePic });
    navigate("/chat"); // Redirect back to chat after saving
  };

  return (
    <div className="profile-container">
      <div className="profile-pic-container">
        <img src={profilePic} alt="Profile" className="profile-pic" />
        <input type="file" id="fileInput" accept="image/*" onChange={handleFileChange} hidden />
        <button className="upload-btn" onClick={() => document.getElementById("fileInput").click()}>
          📷
        </button>
      </div>
      <div className="profile-form">
        <label>Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

        <label>Gender</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <label>Date of Birth</label>
        <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />

        <div className="plan-details">
          <h4>Plan Details</h4>
          <p>Current Plan: Gold (3 Months) - ₹1499</p>
        </div>

        <button className="save-btn" onClick={handleSave}>Save</button>
        <button className="back-btn" onClick={() => navigate("/chat")}>Back</button>
      </div>
    </div>
  );
};

export default ProfilePage;
