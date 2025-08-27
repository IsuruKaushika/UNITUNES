import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

function CreateProviderAccount() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { name, email, password } = formData;
    
    if (!name.trim() || name.length < 2) {
      setMessage("Please enter a valid full name.");
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
        `${backendUrl}/api/user/serregister`,
        {
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password
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
        setMessage("❌ Account already exists with this email.");
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
            <span style={{ fontSize: '36px' }}>👨‍💼</span>
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
            Create Professional Account
          </h1>
          <div style={{
            width: '60px',
            height: '4px',
            background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
            margin: '0 auto',
            borderRadius: '2px'
          }}></div>
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
              placeholder="Enter your full name"
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
          <Link to="/Provider-login" style={{ textDecoration: 'none' }}>
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
        
        /* Smooth transitions for all interactive elements */
        * {
          transition: all 0.3s ease;
        }
      `}</style>
    </div>
  );
}

export default CreateProviderAccount;