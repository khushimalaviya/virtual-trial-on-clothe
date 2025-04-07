import React from "react";
import "../../styles/Admin/AdminAccount.css";

export default function AccountPage() {
  return (
    <div className="account-wrapper">
      <h2 className="account-title">Account</h2>
      <div className="account-content">
        <div className="account-left">
          <div className="account-card">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Profile"
              className="profile-img"
            />
            <h3 className="account-name">Sofia Rivers</h3>
            <p className="account-location">Los Angeles USA</p>
            <p className="account-timezone">GTM-7</p>
            <button className="upload-btn">Upload picture</button>
          </div>
        </div>
        <div className="account-right">
          <div className="account-card">
            <h3 className="profile-header">Profile</h3>
            <p className="edit-info">The information can be edited</p>
            <form className="account-form">
              <div className="form-group">
                <div>
                  <label>First name *</label>
                  <input type="text" defaultValue="Sofia" />
                </div>
                <div>
                  <label>Last name *</label>
                  <input type="text" defaultValue="Rivers" />
                </div>
              </div>
              <div className="form-group">
                <div>
                  <label>Email address *</label>
                  <input type="email" defaultValue="sofia@devias.io" />
                </div>
                <div>
                  <label>Phone number</label>
                  <input type="text" placeholder="Phone number" />
                </div>
              </div>
              <div className="form-group">
                <div>
                  <label>State</label>
                  <input type="text" placeholder="State" />
                </div>
                <div>
                  <label>City</label>
                  <input type="text" placeholder="City" />
                </div>
              </div>
              <div className="form-footer">
                <button type="submit" className="save-btn">Save details</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}