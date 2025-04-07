// import { Link, useNavigate } from "react-router-dom";
// import { FaTachometerAlt ,FaLayerGroup, FaChartPie, FaCog, FaFileAlt, FaSignOutAlt } from "react-icons/fa";
// import "../../styles/SideBar.css";

// export default function Sidebar() {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("adminAuth");
//     navigate("/admin/login");
//   };

//   return (
//     <div className="sidebar">
//       <h2>Admin Panel</h2>
//       <ul>
//         <li><Link to="/admin/dashboard"><FaTachometerAlt  /> Dashboard</Link></li>
//         <li><Link to="/admin/categories"><FaLayerGroup /> Categories</Link></li>
//         <li><Link to="/admin/analytics"><FaChartPie /> Analytics</Link></li>
//         <li><Link to="/admin/settings"><FaCog /> Settings</Link></li>
//         <li><Link to="/admin/reports"><FaFileAlt /> Reports</Link></li>
//         <li><Link to="/admin/user-management">👥 User Management</Link></li> 
//         <li>
//           <button onClick={handleLogout} className="logout-btn">
//             <FaSignOutAlt /> Logout
//           </button>
//         </li>
//       </ul>
//     </div>
//   );
// }

import { Link } from "react-router-dom";
import { FaTachometerAlt ,FaLayerGroup, FaChartPie, FaCog, FaFileAlt } from "react-icons/fa";
import "../../styles/Admin/SideBar.css";

export default function Sidebar() {
  return (
    <div className="admin-sidebar">
      <h2>Admin Panel</h2>
      <ul>
        <li><Link to="/admin/dashboard"><FaTachometerAlt  /> Dashboard</Link></li>
        <li><Link to="/admin/categories"><FaLayerGroup /> Categories</Link></li>
        <li><Link to="/admin/analytics"><FaChartPie /> Analytics</Link></li>
        <li><Link to="/admin/settings"><FaCog /> Settings</Link></li>
        <li><Link to="/admin/reports"><FaFileAlt /> Reports</Link></li>
        <li><Link to="/admin/user-management">👥 User Management</Link></li> 
      </ul>
    </div>
  );
}