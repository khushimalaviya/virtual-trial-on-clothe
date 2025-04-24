// import { Routes, Route, Navigate } from "react-router-dom";
// import HomePage from "./components/Homepage";
// import Login from "./components/common/Login";
// import Signup from "./components/Customer/Signup";
// import Dashboard from "./components/Customer/Dashboard";
// import Header from "./components/common/Header";
// import Footer from "./components/common/Footer";
// import Logout from "./components/Customer/LogoutButton";
// import ContactUs from "./components/Customer/ContactUs";
// import About from "./components/Customer/About";
// import MyAccount from "./components/Customer/MyAccount";
// import Catalog from "./components/Customer/Catalog";
// import TryOn from "./components/Customer/TryOn";
// import ProductPage from "./components/ProductPage";
// import AutoSizeChart from "./components/Customer/AutoSizeChart";
// // import AdminLogin from "./components/Admin/AdminLogin"; 
// // import AdminDashboard from "./components/Admin/AdminDashBoard";
// // import AuthGuard from "./components/Admin/AuthGuard";
// // import Sidebar from "./components/Admin/SideBar";
// // import AdminNavbar from "./components/Admin/AdminNavbar";
// // import AdminCategories from "./components/Admin/AdminCategories";
// // import UserManagement from "./components/Admin/UserManagement";
// // import Settings from "./components/Admin/Settings";
// // import Analytics from "./components/Admin/Analytics";
// // import Reports from "./components/Admin/Reports";


// function PrivateRoute({ element }) {
//   const isAuthenticated = localStorage.getItem("user") !== null;
//   return isAuthenticated ? element : <Navigate to="/login" />;
// }

// function App() {
//   return (
//     <>
//       <Header />
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<ContactUs />} />
//         <Route path="/myaccount" element={<MyAccount />} />
//         <Route path="/catalog" element={<Catalog />} />
//         <Route path="/tryon" element={<TryOn />} />
//         <Route path="/productpage" element={<ProductPage />} />
//         <Route path="/productpage/:productId" element={<ProductPage />} /> {/* ✅ Dynamic product ID */}
//         <Route path="/try-on" element={<TryOn />} />
//         <Route path="/logout" element={<Logout />} />
//         <Route path="/autosizechart" element={<AutoSizeChart />} />

//         {/* admin */}

//         {/* <Route path="/AdminDashBoard" element={<AdminDashboard/>} />
//         <Route path="/admin/DashBoard/*" element={<AuthGuard />}/>
//         <Route path="/SideBar" element={<Sidebar />} />
//         <Route path="/AdminNavbar" element={<AdminNavbar />} />
//         {/* <Route path="/admin/Chart" element={<Chart />} /> */}
//         {/* <Route path="/categories" element={<AdminCategories />} />
//         <Route path="/analytics" element={<Analytics />} />
//         <Route path="/settings" element={<Settings />} />
//         <Route path="/reports" element={<Reports />} />
//         <Route path="/user-management" element={<UserManagement />} /> */}

//       </Routes>
//       <Footer />
//       {/* <div>
//         <ProductPage />
//       </div> */}
//     </>
//   );
// }

// export default App;

import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./components/Homepage";
import Login from "./components/common/Login";
import ForgotPassword from "./components/common/ForgotPassword";
import Signup from "./components/Customer/Signup";
import Dashboard from "./components/Customer/Dashboard";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Logout from "./components/Customer/LogoutButton";
import ContactUs from "./components/Customer/ContactUs";
import About from "./components/Customer/About";
import MyAccount from "./components/Customer/MyAccount";
import Catalog from "./components/Customer/Catalog";
import TryOn from "./components/Customer/TryOn";
import ProductPage from "./components/ProductPage";
import AutoSizeChart from "./components/Customer/AutoSizeChart";
import AdminDashboard from "./components/Admin/AdminDashBoard";
import Unauthorized from "./components/common/Unauthorized"; // ❌ Show unauthorized access

// import { PrivateRoute } from "./routes/ProtectedRoute";
// import RoleBasedRoute from "./routes/RoleBasedRoute";
import { PrivateRoute, RoleBasedRoute } from "./routes/ProtectedRoute"; // ✅ NEW

function App() {
  return (
    <>
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/productpage" element={<ProductPage />} />
        <Route path="/productpage/:productId" element={<ProductPage />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Customer Protected Routes */}
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/logout" element={<PrivateRoute element={<Logout />} />} />
        <Route path="/myaccount" element={<PrivateRoute element={<MyAccount />} />} />
        <Route path="/catalog" element={<PrivateRoute element={<Catalog />} />} />
        <Route path="/try-on" element={<TryOn />} />
        <Route path="/autosizechart" element={<PrivateRoute element={<AutoSizeChart />} />} />

        {/* Admin Protected Route */}
        <Route
          path="/admin-dashboard"
          element={
            <RoleBasedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </RoleBasedRoute>
          }
        />

      </Routes>
      <Footer />
    </>
  );
}

export default App;