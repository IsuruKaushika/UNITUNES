import React from "react";
import { Link } from "react-router-dom";
import "../components/Styles/WelcomePage.css"; // Make sure the path is correct

function WelcomeScreen() {
  return (
    <div className="form-container">
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
  );
}

export default WelcomeScreen;
