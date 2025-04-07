// import React, { useState } from "react";
// import { FaDownload, FaFileAlt, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
// import "../../styles/Reports.css";

// const ReportsDashboard = () => {
//   const [filter, setFilter] = useState("all");

//   const trialReports = [
//     { user: "Aisha", category: "Saree", time: "2025-03-09 12:30", status: "Success" },
//     { user: "Fatima", category: "Jeans", time: "2025-03-09 12:45", status: "Success" },
//     { user: "Sana", category: "Dresses", time: "2025-03-09 13:00", status: "Failed" },
//   ];

//   const filteredReports = filter === "all" ? trialReports : trialReports.filter(report => report.status.toLowerCase() === filter);

//   return (
//     <div className="reports-container">
//       {/* 📑 Header */}
//       <h2><FaFileAlt /> REPORTS DASHBOARD</h2>

//       {/* 🎯 Filter Buttons */}
//       <div className="filters">
//         <button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>📋 ALL</button>
//         <button className={filter === "success" ? "active" : ""} onClick={() => setFilter("success")}>✅ SUCCESSFUL TRIALS</button>
//         <button className={filter === "failed" ? "active" : ""} onClick={() => setFilter("failed")}>❌ FAILED TRIALS</button>
//       </div>

//       {/* 📊 Reports Table */}
//       <div className="table-container">
//         <table>
//           <thead>
//             <tr>
//               <th>👤 USER</th>
//               <th>👗 CATEGORY</th>
//               <th>⏳ TIME</th>
//               <th>📌 STATUS</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredReports.map((report, index) => (
//               <tr key={index}>
//                 <td>{report.user}</td>
//                 <td>{report.category}</td>
//                 <td>{report.time}</td>
//                 <td className={report.status.toLowerCase()}>
//                   {report.status === "Success" ? <FaCheckCircle className="success-icon" /> : <FaTimesCircle className="failed-icon" />}
//                   {report.status}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* ⬇ Download Button */}
//       <button className="download-btn">
//         ⬇ <FaDownload /> DOWNLOAD CSV
//       </button>
//     </div>
//   );
// };

// export default ReportsDashboard;
import React, { useState } from "react";
import { FaDownload, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import "../../styles/Admin/Reports.css";

const ReportsDashboard = () => {
  const [filter, setFilter] = useState("all");

  const trialReports = [
    { user: "Aisha", category: "Saree", time: "2025-03-09 12:30", status: "Success" },
    { user: "Fatima", category: "Jeans", time: "2025-03-09 12:45", status: "Success" },
    { user: "Sana", category: "Dresses", time: "2025-03-09 13:00", status: "Failed" },
  ];

  const filteredReports = filter === "all" ? trialReports : trialReports.filter(report => report.status.toLowerCase() === filter);

  return (
    <div className="reports-container">
      <h2>Reports Dashboard</h2>

      {/* 🎯 Filter Buttons */}
      <div className="filters">
        <button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>All</button>
        <button className={filter === "success" ? "active" : ""} onClick={() => setFilter("success")}>Successful</button>
        <button className={filter === "failed" ? "active" : ""} onClick={() => setFilter("failed")}>Failed</button>
      </div>

      {/* 📊 Reports Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>👤 USER</th>
              <th>👗 CATEGORY</th>
              <th>⏳ TIME</th>
              <th>📌 STATUS</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map((report, index) => (
              <tr key={index}>
                <td>{report.user}</td>
                <td>{report.category}</td>
                <td>{report.time}</td>
                <td className={report.status.toLowerCase()}>
                  {report.status === "Success" ? <FaCheckCircle className="success-icon" /> : <FaTimesCircle className="failed-icon" />}
                  {report.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ⬇ Download Button */}
      <button className="download-btn">
        <FaDownload /> Download CSV
      </button>
    </div>
  );
};

export default ReportsDashboard;