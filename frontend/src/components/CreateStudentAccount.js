import React, { useState } from "react";
import axios from "axios";
import Tesseract from "tesseract.js";
import "./Styles/CreateAccount.css";
import { Link } from "react-router-dom";

function CreateStudentAccount() {
  const [formData, setFormData] = useState({
    name: "",
    regNo: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setMessage("Extracting data from ID image...");
      const {
        data: { text },
      } = await Tesseract.recognize(file, "eng");

      console.log("OCR Result:", text);

      // Custom regex patterns based on expected ID formats
      const nameMatch = text.match(/Name[:\-]?\s*([A-Z a-z]+)/);
      const regNoMatch = text.match(/Reg(?:istration)?\s?No[:\-]?\s*([\w\d\/\-]+)/i);

      setFormData((prev) => ({
        ...prev,
        name: nameMatch ? nameMatch[1].trim() : prev.name,
        regNo: regNoMatch ? regNoMatch[1].trim() : prev.regNo,
      }));

      setMessage("Name and Registration No. extracted successfully.");
    } catch (error) {
      console.error("Error processing image:", error);
      setMessage("Failed to extract data from image. Please fill in manually.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/api/user/sturegister",
        formData
      );
      if (response.status === 200) {
        setMessage("Account created successfully!");
      } else {
        setMessage("Failed to create account. Please try again.");
      }
    } catch (error) {
      console.error("Error creating account:", error.response?.data);
      setMessage(
        error.response?.data?.message ||
          "An error occurred. Please try again later."
      );
    }
  };

  return (
    <div className="Login-page">
      <div className="form-container">
        <h1>Create Student Account</h1>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ marginBottom: "20px" }}
        />

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
            <label>Registration No.</label>
            <input
              type="text"
              name="regNo"
              placeholder="Registration Number"
              value={formData.regNo}
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

          <button type="submit" className="btn">
            Sign Up
          </button>
        </form>

        {message && <p>{message}</p>}

        <div style={{ marginTop: "20px" }}>
          <p>Do you have an account?</p>
          <Link to="/student-login">
            <button className="btn">Back to Log In</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CreateStudentAccount;
