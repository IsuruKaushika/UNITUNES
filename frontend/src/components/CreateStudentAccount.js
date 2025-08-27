import React, { useState, useCallback } from "react";
import axios from "axios";
import Tesseract from "tesseract.js";
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
    <div style={{
      minHeight: '100vh',
      position: 'relative',
      padding: '40px 20px',
    }}>
      {/* Blurred Background Image */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'url(/images/map.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        filter: 'blur(8px)',
        zIndex: -2
      }}></div>
      
      {/* Background Overlay (without blur) */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(251, 191, 36, 0.15)',
        zIndex: -1
      }}></div>
      
      {/* Animated Background Elements */}
      <div style={{
        position: 'absolute',
        top: '80px',
        left: '40px',
        width: '128px',
        height: '128px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '50%',
        animation: 'pulse 2s infinite',
        zIndex: 1
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '128px',
        right: '64px',
        width: '160px',
        height: '160px',
        background: 'rgba(255, 255, 255, 0.08)',
        borderRadius: '50%',
        animation: 'pulse 2s infinite 1s',
        zIndex: 1
      }}></div>

      <div style={{
        maxWidth: '480px',
        margin: '0 auto',
        background: 'rgba(255, 255, 255, 0.95)',
        padding: '40px',
        borderRadius: '24px',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        position: 'relative',
        zIndex: 2
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
            borderRadius: '50%',
            marginBottom: '24px',
            boxShadow: '0 10px 30px rgba(251, 191, 36, 0.3)',
            animation: 'bounce 1s infinite'
          }}>
            <span style={{ fontSize: '36px' }}>🎓</span>
          </div>
          <h1 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #374151 0%, #4b5563 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            marginBottom: '12px'
          }}>
            Create Student Account
          </h1>
          <div style={{
            width: '60px',
            height: '4px',
            background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
            margin: '0 auto',
            borderRadius: '2px'
          }}></div>
        </div>

        {/* Upload Section */}
        <div style={{ marginBottom: '32px' }}>
          <label 
            htmlFor="id-upload" 
            style={{ 
              display: 'block', 
              marginBottom: '16px', 
              fontWeight: '600',
              color: '#059669',
              fontSize: '16px'
            }}
          >
            📷 Upload Student ID Card * (Required to extract Registration Number & Faculty)
          </label>
          <div style={{ position: 'relative' }}>
            <input
              id="id-upload"
              type="file"
              accept="image/jpeg,image/jpg,image/png"
              onChange={handleImageUpload}
              disabled={isProcessing}
              required
              style={{
                width: '100%',
                padding: '16px',
                border: '2px dashed #d1d5db',
                borderRadius: '16px',
                backgroundColor: '#f9fafb',
                cursor: isProcessing ? 'not-allowed' : 'pointer',
                fontSize: '16px',
                transition: 'all 0.3s ease',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#fbbf24'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            />
          </div>
          <p style={{ 
            fontSize: '14px', 
            color: '#6b7280', 
            margin: '8px 0 0 0',
            lineHeight: '1.4'
          }}>
            Supported formats: JPG, PNG (max 10MB). Ensure your ID card is clearly visible.
          </p>
          
          {isProcessing && ocrProgress > 0 && (
            <div style={{ marginTop: '16px' }}>
              <div style={{ 
                width: '100%', 
                backgroundColor: '#f3f4f6', 
                borderRadius: '8px',
                overflow: 'hidden',
                height: '8px'
              }}>
                <div style={{ 
                  width: `${ocrProgress}%`, 
                  height: '100%', 
                  background: 'linear-gradient(90deg, #fbbf24 0%, #f59e0b 100%)',
                  transition: 'width 0.3s ease',
                  borderRadius: '8px'
                }}></div>
              </div>
              <p style={{ 
                margin: '8px 0', 
                fontSize: '14px', 
                color: '#6b7280',
                textAlign: 'center'
              }}>
                Processing... {ocrProgress}%
              </p>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '600',
              color: '#374151',
              fontSize: '14px'
            }}>
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name manually"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={isProcessing}
              style={{
                width: '100%',
                padding: '16px',
                border: '1px solid #d1d5db',
                borderRadius: '12px',
                fontSize: '16px',
                backgroundColor: '#ffffff',
                color: '#374151',
                transition: 'all 0.3s ease',
                outline: 'none',
                opacity: isProcessing ? 0.6 : 1,
                cursor: isProcessing ? 'not-allowed' : 'text'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#fbbf24';
                e.target.style.boxShadow = '0 0 0 3px rgba(251, 191, 36, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d1d5db';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '600',
              color: '#374151',
              fontSize: '14px'
            }}>
              Registration Number * (Auto-filled from ID)
            </label>
            <input
              type="text"
              name="regNo"
              placeholder="Will be extracted from ID card"
              value={formData.regNo}
              readOnly
              disabled
              style={{ 
                width: '100%',
                padding: '16px',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                fontSize: '16px',
                backgroundColor: '#f8fafc', 
                cursor: 'not-allowed',
                textTransform: 'uppercase',
                color: '#6b7280'
              }}
            />
            {!formData.regNo && (
              <small style={{ 
                color: '#dc2626', 
                fontSize: '12px',
                display: 'block',
                marginTop: '4px'
              }}>
                Upload your ID card to auto-fill this field
              </small>
            )}
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '600',
              color: '#374151',
              fontSize: '14px'
            }}>
              Faculty * (Auto-filled from ID)
            </label>
            <input
              type="text"
              name="faculty"
              placeholder="Will be extracted from ID card"
              value={formData.faculty}
              readOnly
              disabled
              style={{ 
                width: '100%',
                padding: '16px',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                fontSize: '16px',
                backgroundColor: '#f8fafc', 
                cursor: 'not-allowed',
                color: '#6b7280'
              }}
            />
            {!formData.faculty && (
              <small style={{ 
                color: '#dc2626', 
                fontSize: '12px',
                display: 'block',
                marginTop: '4px'
              }}>
                Upload your ID card to auto-fill this field
              </small>
            )}
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '600',
              color: '#374151',
              fontSize: '14px'
            }}>
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isProcessing}
              style={{
                width: '100%',
                padding: '16px',
                border: '1px solid #d1d5db',
                borderRadius: '12px',
                fontSize: '16px',
                backgroundColor: '#ffffff',
                color: '#374151',
                transition: 'all 0.3s ease',
                outline: 'none',
                opacity: isProcessing ? 0.6 : 1,
                cursor: isProcessing ? 'not-allowed' : 'text'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#fbbf24';
                e.target.style.boxShadow = '0 0 0 3px rgba(251, 191, 36, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d1d5db';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div style={{ marginBottom: '32px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '600',
              color: '#374151',
              fontSize: '14px'
            }}>
              Password *
            </label>
            <input
              type="password"
              name="password"
              placeholder="Minimum 6 characters"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={isProcessing}
              minLength="6"
              style={{
                width: '100%',
                padding: '16px',
                border: '1px solid #d1d5db',
                borderRadius: '12px',
                fontSize: '16px',
                backgroundColor: '#ffffff',
                color: '#374151',
                transition: 'all 0.3s ease',
                outline: 'none',
                opacity: isProcessing ? 0.6 : 1,
                cursor: isProcessing ? 'not-allowed' : 'text'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#fbbf24';
                e.target.style.boxShadow = '0 0 0 3px rgba(251, 191, 36, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d1d5db';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <button 
            type="submit" 
            disabled={isProcessing}
            style={{ 
              width: '100%',
              padding: '16px 24px',
              background: isProcessing 
                ? 'linear-gradient(135deg, #d1d5db 0%, #9ca3af 100%)' 
                : 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
              color: isProcessing ? '#6b7280' : '#1f2937',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: isProcessing ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: isProcessing 
                ? 'none' 
                : '0 10px 20px rgba(251, 191, 36, 0.3)',
              transform: isProcessing ? 'none' : 'translateY(0)',
              outline: 'none'
            }}
            onMouseEnter={(e) => {
              if (!isProcessing) {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 15px 30px rgba(251, 191, 36, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isProcessing) {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 10px 20px rgba(251, 191, 36, 0.3)';
              }
            }}
          >
            {isProcessing ? "Processing..." : "Sign Up"}
          </button>
        </form>

        {message && (
          <div style={{ 
            marginTop: '24px', 
            padding: '16px', 
            borderRadius: '12px',
            backgroundColor: message.includes("✓") ? '#d1fae5' : 
                           message.includes("⚠") ? '#fef3c7' : '#fee2e2',
            color: message.includes("✓") ? '#065f46' : 
                   message.includes("⚠") ? '#92400e' : '#991b1b',
            border: `1px solid ${message.includes("✓") ? '#a7f3d0' : 
                                message.includes("⚠") ? '#fde68a' : '#fca5a5'}`,
            fontSize: '14px',
            lineHeight: '1.5',
            fontWeight: '500'
          }}>
            {message}
          </div>
        )}

        <div style={{ marginTop: '32px', textAlign: 'center' }}>
          <p style={{ 
            color: '#6b7280', 
            marginBottom: '16px',
            fontSize: '14px'
          }}>
            Already have an account?
          </p>
          <Link to="/student-login" style={{ textDecoration: 'none' }}>
            <button 
              type="button"
              style={{
                padding: '12px 32px',
                background: 'transparent',
                color: '#374151',
                border: '2px solid #d1d5db',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                outline: 'none'
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = '#fbbf24';
                e.target.style.color = '#f59e0b';
                e.target.style.background = 'rgba(251, 191, 36, 0.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = '#d1d5db';
                e.target.style.color = '#374151';
                e.target.style.background = 'transparent';
              }}
            >
              Back to Log In
            </button>
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.05); }
        }
        
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
          40%, 43% { transform: translateY(-8px); }
          70% { transform: translateY(-4px); }
          90% { transform: translateY(-2px); }
        }
        
        /* Hide default file input styling */
        input[type="file"]::-webkit-file-upload-button {
          visibility: hidden;
        }
        
        input[type="file"]::before {
          content: 'Choose ID Card Image';
          display: inline-block;
          background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
          color: #1f2937;
          padding: 8px 16px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          margin-right: 16px;
          font-size: 14px;
          transition: all 0.3s ease;
        }
        
        input[type="file"]:hover::before {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(251, 191, 36, 0.3);
        }
        
        input[type="file"]:disabled::before {
          background: #d1d5db;
          color: #6b7280;
          cursor: not-allowed;
        }
        
        /* Smooth transitions for all interactive elements */
        * {
          transition: all 0.3s ease;
        }
      `}</style>
    </div>
  );
}

export default CreateStudentAccount;