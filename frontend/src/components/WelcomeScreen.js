import React from "react";
import { Link } from "react-router-dom";
import "../components/Styles/WelcomePage.css";
import logo from "../components/Styles/Content/Logo.jpg";

function WelcomeScreen() {
  return (
    <div className="welcome-page">
      <div className="form-container">
        <img src={logo} alt="Unitunes Logo" className="logo" />
        <h1>Welcome to Unitunes</h1>

        <div>
          <Link to="/student-login">
            <button className="btn">Student</button>
          </Link>
        </div>
        <div>
          <Link to="/provider-login">
            <button className="btn">Service Provider</button>
          </Link>
        </div>

      </div>
    </div>
  );
}

export default WelcomeScreen;
