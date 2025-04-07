import { Outlet } from "react-router-dom";
import Sidebar from "./SideBar";
import Navbar from "./AdminNavBar";
import styles from "../../styles/Admin/AdminLayout.module.css";

const AdminLayout = () => {
  return (
    <div className={styles.adminLayout}>
      <Navbar />
      <div className={styles.adminContainer}>
        <Sidebar />
        <div className={styles.adminContent}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
