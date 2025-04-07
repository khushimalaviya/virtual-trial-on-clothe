import React from "react";
import "../../styles/Admin/DashBoard.css";
import Sidebar from "./SideBar";

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-main">
        <div className="dashboard-content"> 
        </div>
      </div>
    </div>
  );
}