import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import usersData from "../db.json";

const Login = ({ setToken }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const users = usersData.users;
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const user = users.find((user) => user.email === formData.email);

    if (!user) {
      setError("No user found with this email.");
      return;
    }
    if (formData.password === user.password) {
      setToken(`token-${Date.now()}`); 
      localStorage.setItem("authToken", `token-${Date.now()}`);
      navigate("/profile");
    } else {
      setError("Incorrect password.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
};

export default Login;
