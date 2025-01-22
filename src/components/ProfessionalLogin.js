import React, { useState } from "react";

import axios from "axios";
import "../components/Styles/LoginAccount.css"; // Import the correct CSS file
import { Link, useNavigate } from "react-router-dom";

function ProfessionalLogin() {
  // State variables to store user input and any error messages
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to the backend for login
      const response = await axios.post('http://localhost:8080/api/v1/auth/login', {
        email,
        password,
        
      });

      // If successful, handle the success response
      console.log(response.data.message); // You can redirect or display a success message here
      navigate("/ProfDashboard");
    } catch (error) {
      // If there is an error (e.g., invalid credentials), display the error message
      setErrorMessage(error.response ? error.response.data.message : "Something went wrong!");
    }
  };

  return (
    <div className="Login-page-2">
    <div className="form-container">
      

      <h1>Professional Login</h1>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn" type="submit">Sign In</button>
      </form>
      {errorMessage && <div style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</div>}
      <div style={{ marginTop: "20px" }}>
        <p>Don’t have an account?</p>
        <Link to="/create-Professional-account">
          <button className="btn">Create Professional Account</button>
        </Link>
        <p></p>
        <Link to="/">
          <button className="btn">Go Back</button>
        </Link>
      </div>
    </div>
    </div>
  );
}

export default ProfessionalLogin;
