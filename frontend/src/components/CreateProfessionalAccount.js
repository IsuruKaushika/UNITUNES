import React, { useState } from "react";
import axios from "axios";
import "./Styles/CreateAccount.css";

import { Link } from "react-router-dom";


function CreateProfessionalAccount() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    userType: "BoardingOwner", // Updated to match valid enum value
    identificationNumber: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

 
  

    try {
      const response = await axios.post("http://localhost:8080/api/v1/auth/register", formData);
      if (response.status === 201) {
        setMessage("Account created successfully!");
      } else {
        setMessage("Failed to create account. Please try again.");
      }
    } catch (error) {
      console.error("Error creating account:", error.response.data);
      setMessage(error.response.data.message || "An error occurred. Please try again later.");
    }
  };

  return (
    <div className="Login-page-2 ">
    <div className="form-container">
      <h1>Create Professional Account</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Identification Number</label>
          <input
            type="text"
            name="identificationNumber"
            placeholder="xxxxxxxxxV or xxxxxxxxxxxx"
            value={formData.identificationNumber}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn">Sign Up</button>
      </form>
      {message && <p>{message}</p>}
      <div style={{ marginTop: "20px" }}>
        <p>Do You  have an account?</p>
        <Link to="/Professional-login">
          <button type="submit" className="btn">Back to Log In</button>
        </Link>
      </div>
    </div>
    </div>
    
  );
}

export default CreateProfessionalAccount;
