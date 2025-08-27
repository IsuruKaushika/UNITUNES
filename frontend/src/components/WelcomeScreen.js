import React from "react";
import { Link } from "react-router-dom";
import logo from "../components/Styles/Content/Logo.jpg";

function WelcomeScreen() {
  return (
    <div style={{
      minHeight: '100vh',
      position: 'relative',
      padding: '40px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
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
        top: '10%',
        left: '5%',
        width: '120px',
        height: '120px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '50%',
        animation: 'pulse 3s infinite',
        zIndex: 1
      }}></div>
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '10%',
        width: '80px',
        height: '80px',
        background: 'rgba(255, 255, 255, 0.08)',
        borderRadius: '50%',
        animation: 'pulse 3s infinite 0.5s',
        zIndex: 1
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '15%',
        left: '8%',
        width: '100px',
        height: '100px',
        background: 'rgba(255, 255, 255, 0.06)',
        borderRadius: '50%',
        animation: 'pulse 3s infinite 1s',
        zIndex: 1
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '25%',
        right: '6%',
        width: '140px',
        height: '140px',
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '50%',
        animation: 'pulse 3s infinite 1.5s',
        zIndex: 1
      }}></div>

      <div style={{
        maxWidth: '480px',
        width: '100%',
        background: 'rgba(255, 255, 255, 0.95)',
        padding: '60px 40px',
        borderRadius: '24px',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        position: 'relative',
        zIndex: 2,
        textAlign: 'center'
      }}>
        {/* Logo Section */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{
            display: 'inline-block',
            padding: '20px',
            background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
            borderRadius: '50%',
            marginBottom: '24px',
            boxShadow: '0 15px 35px rgba(251, 191, 36, 0.4)',
            animation: 'bounce 2s infinite',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <img 
              src={logo} 
              alt="Unitunes Logo" 
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '3px solid rgba(255, 255, 255, 0.3)'
              }}
            />
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.2) 50%, transparent 70%)',
              animation: 'shimmer 3s infinite'
            }}></div>
          </div>
        </div>

        {/* Welcome Header */}
        <div style={{ marginBottom: '50px' }}>
          <h1 style={{
            fontSize: '42px',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #374151 0%, #4b5563 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            marginBottom: '16px',
            letterSpacing: '-0.02em'
          }}>
            Welcome to Unitunes
          </h1>
          <p style={{
            fontSize: '18px',
            color: '#6b7280',
            marginBottom: '24px',
            lineHeight: '1.6'
          }}>
            Connect, discover, and access university services
          </p>
          <div style={{
            width: '80px',
            height: '4px',
            background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
            margin: '0 auto',
            borderRadius: '2px'
          }}></div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Link to="/student-login" style={{ textDecoration: 'none' }}>
            <button
              style={{
                width: '100%',
                padding: '18px 24px',
                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                color: '#1f2937',
                border: 'none',
                borderRadius: '16px',
                fontSize: '18px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 10px 25px rgba(251, 191, 36, 0.3)',
                position: 'relative',
                overflow: 'hidden',
                outline: 'none'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 15px 35px rgba(251, 191, 36, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 10px 25px rgba(251, 191, 36, 0.3)';
              }}
            >
              <span style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                gap: '12px'
              }}>
                <span style={{ fontSize: '24px' }}>🎓</span>
                Student
              </span>
            </button>
          </Link>

          <Link to="/provider-login" style={{ textDecoration: 'none' }}>
            <button
              style={{
                width: '100%',
                padding: '18px 24px',
                background: 'transparent',
                color: '#374151',
                border: '2px solid #d1d5db',
                borderRadius: '16px',
                fontSize: '18px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                outline: 'none'
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = '#fbbf24';
                e.target.style.color = '#f59e0b';
                e.target.style.background = 'rgba(251, 191, 36, 0.05)';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 20px rgba(251, 191, 36, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = '#d1d5db';
                e.target.style.color = '#374151';
                e.target.style.background = 'transparent';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              <span style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                gap: '12px'
              }}>
                <span style={{ fontSize: '24px' }}>👨‍💼</span>
                Service Provider
              </span>
            </button>
          </Link>
        </div>

        {/* Footer Info */}
        <div style={{ 
          marginTop: '40px', 
          paddingTop: '24px', 
          borderTop: '1px solid #e5e7eb' 
        }}>
          <p style={{ 
            fontSize: '14px', 
            color: '#9ca3af',
            lineHeight: '1.5'
          }}>
            Choose your account type to get started
          </p>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { 
            opacity: 0.1; 
            transform: scale(1); 
          }
          50% { 
            opacity: 0.2; 
            transform: scale(1.05); 
          }
        }
        
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% { 
            transform: translateY(0); 
          }
          40%, 43% { 
            transform: translateY(-8px); 
          }
          70% { 
            transform: translateY(-4px); 
          }
          90% { 
            transform: translateY(-2px); 
          }
        }
        
        @keyframes shimmer {
          0% { 
            transform: translateX(-100%) rotate(45deg); 
          }
          100% { 
            transform: translateX(200%) rotate(45deg); 
          }
        }
        
        /* Smooth transitions for all interactive elements */
        * {
          transition: all 0.3s ease;
        }

        /* Responsive adjustments */
        @media (max-width: 480px) {
          .welcome-container {
            padding: 40px 20px;
            margin: 20px;
          }
        }
      `}</style>
    </div>
  );
}

export default WelcomeScreen;