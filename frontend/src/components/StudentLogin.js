import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../components/Styles/LoginAccount.css"; // Import the correct CSS file


const backendUrl = import.meta.env.VITE_BACKEND_URL ;


function StudentLogin() {
  // State variables to store user input and any error messages

  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      //      Send a POST request to the backend for
      const response = await axios.post(`${backendUrl}/api/user/stulogin`, { email, password });

      // If successful, handle the success response
      if (response.status === 200 && response.data.success) {
        console.log(response.data.message);
        navigate("/go-student-dashboard");
      } else {
        // Display a message if the response is not as expected
        setErrorMessage(response.data.message || "Login failed. Please try again.");
      }

    } catch (error) {
      // If there is an error (e.g., invalid credentials), display the error message
      setErrorMessage(error.response ? error.response.data.message : "Something went wrong!");
    }
  };

  return (
    <div className="Login-page">
    <div className="form-container">
      {/* Go Back Icon */}
      <Link to="/welcome">
        <i className="fas fa-arrow-left go-back-icon"></i>
      </Link>

      <h1>Student Login</h1>
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
        <Link to="/create-student-account">
          <button className="btn">Create Student Account</button>
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

export default StudentLogin;
