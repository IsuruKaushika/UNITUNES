import React, { useState, useCallback } from "react";
import axios from "axios";
import Tesseract from "tesseract.js";
import "./Styles/CreateAccount.css";
import { Link } from "react-router-dom";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

function CreateStudentAccount() {
  const [formData, setFormData] = useState({
    name: "",
    regNo: "",
    faculty: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [ocrProgress, setOcrProgress] = useState(0);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const preprocessImage = (file) => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Draw image
        ctx.drawImage(img, 0, 0);
        
        // Get image data for preprocessing
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        // Convert to grayscale and increase contrast
        for (let i = 0; i < data.length; i += 4) {
          const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
          const enhanced = gray > 128 ? 255 : 0; // Binary threshold
          data[i] = enhanced;     // Red
          data[i + 1] = enhanced; // Green
          data[i + 2] = enhanced; // Blue
        }
        
        ctx.putImageData(imageData, 0, 0);
        canvas.toBlob(resolve, 'image/png');
      };
      
      img.src = URL.createObjectURL(file);
    });
  };

  const extractDataFromText = (text) => {
    console.log("OCR Result:", text);
    
    // Clean the text
    const cleanText = text.replace(/[^\w\s\.\/:]/g, ' ').replace(/\s+/g, ' ');
    
    // Enhanced patterns specifically for University of Ruhuna ID cards
    const patterns = {
      regNo: [
        /Reg\s*\.?\s*No\s*[:\-]?\s*([A-Z]{2,3}\/\d{4}\/\d{4})/i,
        /([A-Z]{2,3}\/\d{4}\/\d{4})/g, // EG/2021/4606 format
        /Registration\s*[:\-]?\s*([A-Z]{2,3}\d{4}\d{4})/i,
      ],
      faculty: [
        /Faculty\s*[:\-]?\s*([A-Za-z\s&]+)/i,
        /(Engineering|Science|Arts|Medicine|Business|Law|Computing|Technology)/i,
        /(Faculty\s+of\s+[A-Za-z\s]+)/i,
      ]
    };

    const extracted = {};

    // Extract registration number only
    for (const pattern of patterns.regNo) {
      const match = cleanText.match(pattern);
      if (match && match[1]) {
        extracted.regNo = match[1].trim();
        break;
      }
    }

    // Extract faculty only
    for (const pattern of patterns.faculty) {
      const match = cleanText.match(pattern);
      if (match && match[1]) {
        const faculty = match[1].trim().replace(/\s+/g, ' ');
        if (faculty.length > 2) {
          extracted.faculty = faculty;
          break;
        }
      }
    }

    return extracted;
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type and size
    if (!file.type.startsWith('image/')) {
      setMessage("Please upload a valid image file.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      setMessage("File size too large. Please upload an image under 10MB.");
      return;
    }

    try {
      setIsProcessing(true);
      setOcrProgress(0);
      setMessage("Processing ID card image...");
      
      // Preprocess image for better OCR
      const processedFile = await preprocessImage(file);
      
      const { data: { text } } = await Tesseract.recognize(processedFile, 'eng', {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            setOcrProgress(Math.round(m.progress * 100));
          }
        },
        tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789./:- ',
        tessedit_pageseg_mode: Tesseract.PSM.SPARSE_TEXT,
      });

      const extractedData = extractDataFromText(text);
      
      // Update form data (excluding name)
      setFormData(prev => ({
        ...prev,
        regNo: extractedData.regNo || prev.regNo,
        faculty: extractedData.faculty || prev.faculty,
      }));

      // Provide feedback
      const extractedFields = Object.keys(extractedData).filter(key => extractedData[key]);
      
      if (extractedFields.length > 0) {
        const fieldNames = {
          regNo: "Registration Number",
          faculty: "Faculty"
        };
        const extractedNames = extractedFields.map(field => fieldNames[field]);
        setMessage(`✓ Successfully extracted: ${extractedNames.join(", ")}`);
      } else {
        setMessage("⚠ Could not extract Registration Number or Faculty. Please upload a clear image of your ID card.");
      }

    } catch (error) {
      console.error("Error processing image:", error);
      setMessage("❌ Failed to process image. Please upload a clear image of your ID card.");
    } finally {
      setIsProcessing(false);
      setOcrProgress(0);
    }
  };

  const validateForm = () => {
    const { name, regNo, faculty, email, password } = formData;
    
    if (!name.trim() || name.length < 2) {
      setMessage("Please enter a valid full name.");
      return false;
    }
    
    if (!regNo.trim()) {
      setMessage("Please upload your ID card to extract Registration Number.");
      return false;
    }
    
    if (!/^[A-Z]{2,3}\/\d{4}\/\d{4}$/.test(regNo)) {
      setMessage("Invalid Registration Number format detected. Please upload a clearer image.");
      return false;
    }
    
    if (!faculty.trim()) {
      setMessage("Please upload your ID card to extract Faculty information.");
      return false;
    }
    
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage("Please enter a valid email address.");
      return false;
    }
    
    if (!password || password.length < 6) {
      setMessage("Password must be at least 6 characters long.");
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      setIsProcessing(true);
      setMessage("Creating account...");
      
      const response = await axios.post(
        `${backendUrl}/api/user/sturegister`,
        {
          ...formData,
          name: formData.name.trim(),
          regNo: formData.regNo.trim().toUpperCase(),
          faculty: formData.faculty.trim(),
          email: formData.email.trim().toLowerCase(),
        },
        {
          timeout: 10000, // 10 second timeout
        }
      );
      
      if (response.status === 200) {
        setMessage("✓ Account created successfully!");
        // Clear sensitive data
        setFormData(prev => ({ ...prev, password: "" }));
      } else {
        setMessage("❌ Failed to create account. Please try again.");
      }
    } catch (error) {
      console.error("Error creating account:", error);
      
      if (error.code === 'ECONNABORTED') {
        setMessage("❌ Request timeout. Please check your connection and try again.");
      } else if (error.response?.status === 409) {
        setMessage("❌ Account already exists with this email or registration number.");
      } else if (error.response?.data?.message) {
        setMessage(`❌ ${error.response.data.message}`);
      } else {
        setMessage("❌ Network error. Please check your connection and try again.");
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="Login-page">
      <div className="form-container">
        <h1>Create Student Account</h1>

        <div className="upload-section" style={{ marginBottom: "20px" }}>
          <label htmlFor="id-upload" style={{ 
            display: "block", 
            marginBottom: "10px", 
            fontWeight: "500",
            color: "green"
          }}>
            📷 Upload Student ID Card * (Required to extract Registration Number & Faculty)
          </label>
          <input
            id="id-upload"
            type="file"
            accept="image/jpeg,image/jpg,image/png"
            onChange={handleImageUpload}
            disabled={isProcessing}
            style={{ marginBottom: "10px" }}
            required
          />
          <p style={{ 
            fontSize: "12px", 
            color: "#666", 
            margin: "5px 0 0 0" 
          }}>
            Supported formats: JPG, PNG (max 10MB). Ensure your ID card is clearly visible.
          </p>
          {isProcessing && ocrProgress > 0 && (
            <div style={{ marginTop: "10px" }}>
              <div style={{ 
                width: "100%", 
                backgroundColor: "#f0f0f0", 
                borderRadius: "4px",
                overflow: "hidden"
              }}>
                <div style={{ 
                  width: `${ocrProgress}%`, 
                  height: "6px", 
                  backgroundColor: "#007bff",
                  transition: "width 0.3s ease"
                }}></div>
              </div>
              <p style={{ margin: "5px 0", fontSize: "14px" }}>
                Processing... {ocrProgress}%
              </p>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name manually"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={isProcessing}
            />
          </div>

          <div className="form-group">
            <label>Registration Number * (Auto-filled from ID)</label>
            <input
              type="text"
              name="regNo"
              placeholder="Will be extracted from ID card"
              value={formData.regNo}
              readOnly
              disabled
              style={{ 
                backgroundColor: "#f8f9fa", 
                cursor: "not-allowed",
                textTransform: "uppercase" 
              }}
            />
            {!formData.regNo && (
              <small style={{ color: "#dc3545", fontSize: "12px" }}>
                Upload your ID card to auto-fill this field
              </small>
            )}
          </div>

          <div className="form-group">
            <label>Faculty * (Auto-filled from ID)</label>
            <input
              type="text"
              name="faculty"
              placeholder="Will be extracted from ID card"
              value={formData.faculty}
              readOnly
              disabled
              style={{ 
                backgroundColor: "#f8f9fa", 
                cursor: "not-allowed" 
              }}
            />
            {!formData.faculty && (
              <small style={{ color: "#dc3545", fontSize: "12px" }}>
                Upload your ID card to auto-fill this field
              </small>
            )}
          </div>

          <div className="form-group">
            <label>Email Address *</label>
            <input
              type="email"
              name="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isProcessing}
            />
          </div>

          <div className="form-group">
            <label>Password *</label>
            <input
              type="password"
              name="password"
              placeholder="Minimum 6 characters"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={isProcessing}
              minLength="6"
            />
          </div>

          <button 
            type="submit" 
            className="btn" 
            disabled={isProcessing}
            style={{ 
              opacity: isProcessing ? 0.6 : 1,
              cursor: isProcessing ? "not-allowed" : "pointer"
            }}
          >
            {isProcessing ? "Processing..." : "Sign Up"}
          </button>
        </form>

        {message && (
          <div style={{ 
            marginTop: "15px", 
            padding: "10px", 
            borderRadius: "4px",
            backgroundColor: message.includes("✓") ? "#d4edda" : 
                           message.includes("⚠") ? "#fff3cd" : "#f8d7da",
            color: message.includes("✓") ? "#155724" : 
                   message.includes("⚠") ? "#856404" : "#721c24",
            border: `1px solid ${message.includes("✓") ? "#c3e6cb" : 
                                message.includes("⚠") ? "#ffeaa7" : "#f5c6cb"}`
          }}>
            {message}
          </div>
        )}

        <div style={{ marginTop: "20px" }}>
          <p>Already have an account?</p>
          <Link to="/student-login">
            <button className="btn" type="button">Back to Log In</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CreateStudentAccount;