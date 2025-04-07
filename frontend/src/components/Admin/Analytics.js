import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import "../../styles/Admin/Analytics.css"; // Adjusted to assume CSS is in src/styles/

const AnalyticsDashboard = () => {
  // State for data and loading
  const [trialData, setTrialData] = useState([]);
  const [deviceStats, setDeviceStats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulated data fetching
  useEffect(() => {
    const fetchData = () => {
      setTimeout(() => {
        setTrialData([
          { name: "Jeans", trials: 120 },
          { name: "Saree", trials: 85 },
          { name: "Dresses", trials: 95 },
          { name: "Tops", trials: 78 },
        ]);
        setDeviceStats([
          { name: "Mobile", value: 65 },
          { name: "Desktop", value: 35 },
        ]);
        setIsLoading(false);
      }, 1000); // Simulate 1-second loading
    };

    fetchData();

    // Cleanup function
    return () => clearTimeout();
  }, []);

  // Colors for charts and cards
  const chartColors = ["#8884d8", "#82ca9d", "#ff7300", "#ffcc00"];
  const cardColors = ["#ffd700", "#28a745", "#007bff"]; // Gold, Green, Blue

  if (isLoading) {
    return (
      <div className="dashboard-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="card" style={{ backgroundColor: cardColors[0] }}>
          <h3>Total Trials</h3>
          <p>850+</p>
        </div>
        <div className="card" style={{ backgroundColor: cardColors[1] }}>
          <h3>Active Users</h3>
          <p>250+</p>
        </div>
        <div className="card" style={{ backgroundColor: cardColors[2] }}>
          <h3>Top Category</h3>
          <p>Jeans</p>
        </div>
      </div>

      {/* Bar Chart for Clothing Popularity */}
      <div className="chart-container">
        <h3>Category Popularity</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={trialData}>
            <XAxis dataKey="name" stroke="#e0e0e0" />
            <YAxis stroke="#e0e0e0" />
            <Tooltip contentStyle={{ backgroundColor: "#2c2c2c", color: "#e0e0e0" }} />
            <Legend wrapperStyle={{ color: "#e0e0e0" }} />
            <Bar dataKey="trials" fill="#8884d8" barSize={30} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart for Device Stats */}
      <div className="chart-container">
        <h3>Device Usage</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={deviceStats}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              labelLine={false}
              label={({ name, percent }) => ${name} ${(percent * 100).toFixed(0)}%}
            >
              {deviceStats.map((entry, index) => (
                <Cell key={cell-${index}} fill={chartColors[index % chartColors.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: "#2c2c2c", color: "#e0e0e0" }} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Trials Table */}
      <div className="recent-trials">
        <h3>Recent Trials</h3>
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Category</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Aisha</td>
              <td>Saree</td>
              <td>5 min ago</td>
            </tr>
            <tr>
              <td>Fatima</td>
              <td>Jeans</td>
              <td>10 min ago</td>
            </tr>
            <tr>
              <td>Sana</td>
              <td>Dresses</td>
              <td>15 min ago</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;