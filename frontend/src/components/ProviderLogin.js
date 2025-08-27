import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const backendUrl = process.env.VITE_BACKEND_URL;

function ProfessionalLogin() {
  // State variables to store user input and any error messages
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return false;
    }
    
    if (!password || password.length < 1) {
      setErrorMessage("Please enter your password.");
      return false;
    }
    
    return true;
  };

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setIsProcessing(true);
      setErrorMessage("");

      // Send a POST request to the backend
      const response = await axios.post(
        `${backendUrl}/api/user/serlogin`,
        {
          email: email.trim().toLowerCase(),
          password: password
        },
        {
          timeout: 10000, // 10 second timeout
        }
      );

      // If successful, handle the success response
      if (response.status === 200 && response.data.success) {
        console.log(response.data.message);
        setErrorMessage("✓ Login successful! Redirecting...");
        setTimeout(() => {
          navigate("/go-professional-dashboard");
        }, 1000);
      } else {
        // Display a message if the response is not as expected
        setErrorMessage(response.data.message || "❌ Login failed. Please try again.");
      }

    } catch (error) {
      console.error("Login error:", error);
      
      if (error.code === 'ECONNABORTED') {
        setErrorMessage("❌ Request timeout. Please check your connection and try again.");
      } else if (error.response?.status === 401) {
        setErrorMessage("❌ Invalid email or password. Please try again.");
      } else if (error.response?.data?.message) {
        setErrorMessage(`❌ ${error.response.data.message}`);
      } else {
        setErrorMessage("❌ Network error. Please check your connection and try again.");
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
        {/* Go Back Icon */}
        <Link 
          to="/welcome" 
          style={{ 
            position: 'absolute',
            top: '20px',
            left: '20px',
            textDecoration: 'none',
            color: '#6b7280',
            fontSize: '24px',
            transition: 'all 0.3s ease',
            padding: '8px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px'
          }}
          onMouseEnter={(e) => {
            e.target.style.color = '#fbbf24';
            e.target.style.backgroundColor = 'rgba(251, 191, 36, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.color = '#6b7280';
            e.target.style.backgroundColor = 'transparent';
          }}
        >
          ←
        </Link>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px', marginTop: '20px' }}>
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
            <span style={{ fontSize: '36px' }}>🔧</span>
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
            Service Provider Login
          </h1>
          <div style={{
            width: '60px',
            height: '4px',
            background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
            margin: '0 auto',
            borderRadius: '2px'
          }}></div>
        </div>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '600',
              color: '#374151',
              fontSize: '14px'
            }}>
              Email Address
            </label>
            <input
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            {isProcessing ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {errorMessage && (
          <div style={{ 
            marginTop: '24px', 
            padding: '16px', 
            borderRadius: '12px',
            backgroundColor: errorMessage.includes("✓") ? '#d1fae5' : '#fee2e2',
            color: errorMessage.includes("✓") ? '#065f46' : '#991b1b',
            border: `1px solid ${errorMessage.includes("✓") ? '#a7f3d0' : '#fca5a5'}`,
            fontSize: '14px',
            lineHeight: '1.5',
            fontWeight: '500'
          }}>
            {errorMessage}
          </div>
        )}

        <div style={{ marginTop: '32px', textAlign: 'center' }}>
          <p style={{ 
            color: '#6b7280', 
            marginBottom: '16px',
            fontSize: '14px'
          }}>
            Don't have an account?
          </p>
          <Link to="/create-Provider-account" style={{ textDecoration: 'none' }}>
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
                outline: 'none',
                marginBottom: '12px',
                marginRight: '8px'
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
              Create Service Provider Account
            </button>
          </Link>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <button 
              type="button"
              style={{
                padding: '12px 32px',
                background: 'transparent',
                color: '#6b7280',
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                outline: 'none',
                marginLeft: '8px'
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = '#d1d5db';
                e.target.style.color = '#374151';
                e.target.style.background = 'rgba(107, 114, 128, 0.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = '#e5e7eb';
                e.target.style.color = '#6b7280';
                e.target.style.background = 'transparent';
              }}
            >
              Go Back
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

export default ProfessionalLogin;