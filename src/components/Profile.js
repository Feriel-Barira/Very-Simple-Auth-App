import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = ({ setToken }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setToken("");
    navigate("/");
  };

  return (
    <div className="profile-container">
      <h2>Welcome to your Profile!</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
