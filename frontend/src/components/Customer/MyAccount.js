import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaUser, FaEnvelope, FaPhone, FaSave,
  FaRulerVertical, FaWeight, FaTshirt
} from "react-icons/fa";
import "../../styles/MyAccount.css";

const MyAccount = () => {
  const [profile, setProfile] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  // Load userId from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.userId) {
        setUserId(parsedUser.userId);
      } else {
        setError("User ID missing in stored data.");
        setLoading(false);
      }
    } else {
      setError("User not found. Please login again.");
      setLoading(false);
    }
  }, []);

  // Fetch profile after userId is set
  useEffect(() => {
    if (userId) {
      fetchProfile(userId);
    }
  }, [userId]);

  const fetchProfile = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/api/accountbodies/${id}`);
      const { user, profile } = response.data;

      setProfile({
        name: user?.name || "",
        email: user?.email || "",
        contactNo: user?.contactNo || "",
        height: profile?.height || "",
        weight: profile?.weight || "",
        chest: profile?.chest_size || "",
        waist: profile?.waist_size || "",
        hip: profile?.hip_size || "",
        skinTone: profile?.skin_tone || "",
        bodyShape: profile?.body_shape || "",
      });

      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch profile data.");
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const userUpdate = {
        name: profile.name,
        contactNo: profile.contactNo,
      };
      await axios.put(`${API_URL}/api/accountbodies/update-account/${userId}`, userUpdate);

      const profileUpdate = {
        height: profile.height,
        weight: profile.weight,
        chest_size: profile.chest,
        waist_size: profile.waist,
        hip_size: profile.hip,
        skin_tone: profile.skinTone,
        body_shape: profile.bodyShape,
      };
      await axios.put(`${API_URL}/api/accountbodies/update-profile/${userId}`, profileUpdate);

      alert("Profile and Body Measurements updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile and body measurements.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <br /><br />
      <div className="my-account-container">
        <h2 className="title">My Profile</h2>

        <div className="profile-header">
          <div className="basic-info">
            <div className="form-group">
              <label><FaUser /> Full Name</label>
              <input type="text" name="name" value={profile.name} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label><FaEnvelope /> Email</label>
              <input type="email" name="email" value={profile.email} disabled />
            </div>
            <div className="form-group">
              <label><FaPhone /> Phone</label>
              <input type="text" name="contactNo" value={profile.contactNo} onChange={handleChange} />
            </div>
          </div>
        </div>

        <div className="form-card">
          <h3>📏 Body Measurements</h3>
          <div className="grid-three">
            <div className="form-group">
              <label><FaRulerVertical /> Height (cm)</label>
              <input type="text" name="height" value={profile.height} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label><FaWeight /> Weight (kg)</label>
              <input type="text" name="weight" value={profile.weight} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label><FaTshirt /> Chest (cm)</label>
              <input type="text" name="chest" value={profile.chest} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label><FaTshirt /> Waist (cm)</label>
              <input type="text" name="waist" value={profile.waist} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label><FaTshirt /> Hip (cm)</label>
              <input type="text" name="hip" value={profile.hip} onChange={handleChange} />
            </div>
          </div>
        </div>

        {/* Optional: Style Preferences */}
        {/* 
        <div className="form-card">
          <h3>🎨 Style Preferences</h3>
          <div className="grid-two">
            <div className="form-group">
              <label>Skin Tone</label>
              <select name="skinTone" value={profile.skinTone} onChange={handleChange}>
                <option value="Light">Light</option>
                <option value="Medium">Medium</option>
                <option value="Dark">Dark</option>
              </select>
            </div>
            <div className="form-group">
              <label>Body Shape</label>
              <select name="bodyShape" value={profile.bodyShape} onChange={handleChange}>
                <option value="Rectangle">Rectangle</option>
                <option value="Pear">Pear</option>
                <option value="Apple">Apple</option>
                <option value="Hourglass">Hourglass</option>
                <option value="Inverted Triangle">Inverted Triangle</option>
                <option value="Athletic">Athletic</option>
              </select>
            </div>
          </div>
        </div>
        */}

        <center>
          <div className="button-group">
            <button className="save-btn" onClick={handleSave}><FaSave /> Save</button>
          </div>
        </center>
      </div>
    </>
  );
};

export default MyAccount;
