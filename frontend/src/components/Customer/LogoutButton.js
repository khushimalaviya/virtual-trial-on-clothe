import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { app } from "../../firebaseConfig"; // Firebase app instance

const Logout = () => {
  const navigate = useNavigate();
  const auth = getAuth(app);

  useEffect(() => {
    const handleLogout = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        
        // Handle logout for both Google and manual login users
        if (storedUser) {
          if (storedUser.googleId) {
            // Google login user -> Sign out from Firebase
            await signOut(auth);
          }
          
          // Clear user session
          localStorage.removeItem("user");
          toast.success("Logged out successfully!");
        } else {
          toast.info("No active session found.");
        }

        // Redirect to login page
        navigate("/login"); 
      } catch (error) {
        console.error("Logout Error:", error);
        toast.error("Logout failed!");
      }
    };

    handleLogout();
  }, [navigate, auth]);

  return <p>Logging out...</p>;
};

export default Logout;
