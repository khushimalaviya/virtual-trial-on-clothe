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
  const [errors, setErrors] = useState({});

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
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));

    // Real-time validation
    let error = "";

    const numVal = Number(value);
    const fieldRules = {
      height: { min: 140, label: "Height must be at least 140 cm." },
      weight: { min: 25, label: "Weight must be at least 25 kg." },
      chest:  { min: 24, label: "Chest must be at least 24 cm." },
      waist:  { min: 24, label: "Waist must be at least 24 cm." },
      hip:    { min: 28, label: "Hip must be at least 28 cm." },
    };

    if (["height", "weight", "chest", "waist", "hip"].includes(name)) {
      if (!value) {
        error = "This field is required.";
      } else if (isNaN(value)) {
        error = "Must be a number.";
      } else if (numVal <= 0) {
        error = "Value must be greater than zero.";
      } else if (numVal < fieldRules[name].min) {
        error = fieldRules[name].label;
      }

      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: error,
      }));
    }
  };

  const handleSave = async () => {
    // Check if there are any validation errors before saving
    if (Object.values(errors).some((err) => err)) {
      alert("Please fix validation errors before saving.");
      return;
    }

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
              {errors.height && <span className="error-msg">{errors.height}</span>}
            </div>
            <div className="form-group">
              <label><FaWeight /> Weight (kg)</label>
              <input type="text" name="weight" value={profile.weight} onChange={handleChange} />
              {errors.weight && <span className="error-msg">{errors.weight}</span>}
            </div>
            <div className="form-group">
              <label><FaTshirt /> Chest (cm)</label>
              <input type="text" name="chest" value={profile.chest} onChange={handleChange} />
              {errors.chest && <span className="error-msg">{errors.chest}</span>}
            </div>
            <div className="form-group">
              <label><FaTshirt /> Waist (cm)</label>
              <input type="text" name="waist" value={profile.waist} onChange={handleChange} />
              {errors.waist && <span className="error-msg">{errors.waist}</span>}
            </div>
            <div className="form-group">
              <label><FaTshirt /> Hip (cm)</label>
              <input type="text" name="hip" value={profile.hip} onChange={handleChange} />
              {errors.hip && <span className="error-msg">{errors.hip}</span>}
            </div>
          </div>
        </div>

        <center>
          <div className="button-group">
            <button className="save-btn" onClick={handleSave} disabled={Object.values(errors).some(err => err)}>
              <FaSave /> Save
            </button>
          </div>
        </center>
      </div>
    </>
  );
};

export default MyAccount;
