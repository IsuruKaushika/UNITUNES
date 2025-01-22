import React from "react";
import { Link } from "react-router-dom";
import "../components/Styles/WelcomePage.css"; // Ensure path is correct
import logo from "../components/Styles/Content/Logo.jpg"; // Adjust path to your logo

function WelcomeScreen() {
  return (
    <div className="welcome-page">
      <div className="form-container">
        {/* Add the logo */}
        <img src={logo} alt="Unitunes Logo" className="logo" />
        <h1>Welcome to Unitunes</h1>
        <div>
          <Link to="/student-login">
            <button className="btn">Student</button>
          </Link>
        </div>
        <div>
          <p></p>
          <Link to="/professional-login">
            <button className="btn">Professional</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default WelcomeScreen;
