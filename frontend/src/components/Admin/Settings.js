import React from "react";
import "../../styles/Admin/Settings.css";

const Settings = () => {
  return (
    <div className="settings-page">
      <h2 className="page-title">Settings</h2>

      <div className="settings-card">
        <h3 className="section-title">Notifications</h3>
        <p className="section-subtitle">Manage the notifications</p>

        <div className="notification-section">
          <div className="column">
            <h4>Email</h4>
            <label><input type="checkbox" /> Product updates</label>
            <label><input type="checkbox" /> Security updates</label>
          </div>
          <div className="column">
            <h4>Phone</h4>
            <label><input type="checkbox" /> Email</label>
            <label><input type="checkbox" /> Security updates</label>
          </div>
        </div>

        <div className="action">
          <button className="btn-primary">Save changes</button>
        </div>
      </div>

      <div className="settings-card">
        <h3 className="section-title">Password</h3>
        <p className="section-subtitle">Update password</p>

        <input type="password" placeholder="Password" className="input-box" />
        <input
          type="password"
          placeholder="Confirm password"
          className="input-box"
        />

        <div className="action">
          <button className="btn-primary">Update</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;