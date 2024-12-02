import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Register.css";

function Register(props) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  if (props.token) {
    return <Navigate to="/" />;
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    fetch("http://localhost:3004/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("New user created:", data);
        const simulatedToken = `token-${Date.now()}`;
        props.setToken(simulatedToken);
        localStorage.setItem("authToken", simulatedToken);
        console.log(
          "Token stored in localStorage:",
          localStorage.getItem("authToken")
        );
        navigate("/auth/login");
      })
      .catch((error) => {
        console.error("Error during registration:", error);
      });
  }

  return (
    <div className="register-container">
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="inputFullName">Full Name</label>
          <input
            type="text"
            className="form-control"
            id="inputFullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="John Doe"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="inputEmail">Email</label>
          <input
            type="email"
            className="form-control"
            id="inputEmail"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="inputPassword">Password</label>
          <input
            type="password"
            className="form-control"
            id="inputPassword"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="inputConfirmPassword">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="inputConfirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
