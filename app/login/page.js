'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaEye, FaEyeSlash, FaGoogle, FaFacebook } from 'react-icons/fa';
import LoadingButton from '../../components/LoadingButton';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Handle login logic here
    }, 2000);
  };

  return (
    <main className="auth-page">
      <div className="auth-container">
        <motion.div
          className="auth-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="auth-header">
            <h1 className="auth-title">Welcome Back</h1>
            <p className="auth-subtitle">Sign in to your Varam Silvers account</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div 
              className="form-group"
              style={{
                width: '100%',
                maxWidth: '100%',
                overflow: 'hidden',
                boxSizing: 'border-box',
                margin: '0 0 1rem 0',
                padding: '0'
              }}
            >
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your email"
                required
                style={{
                  width: '100%',
                  maxWidth: '100%',
                  boxSizing: 'border-box',
                  margin: '0',
                  padding: '0.75rem',
                  border: '2px solid #e0f7f7',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  background: '#fff',
                  display: 'block',
                  position: 'relative',
                  left: '0',
                  right: '0',
                  transform: 'none',
                  overflow: 'hidden'
                }}
              />
            </div>

            <div 
              className="form-group"
              style={{
                width: '100%',
                maxWidth: '100%',
                overflow: 'hidden',
                boxSizing: 'border-box',
                margin: '0 0 1rem 0',
                padding: '0'
              }}
            >
              <label htmlFor="password" className="form-label">Password</label>
              <div 
                className="password-input-container"
                style={{
                  width: '100%',
                  maxWidth: '100%',
                  overflow: 'hidden',
                  boxSizing: 'border-box',
                  position: 'relative',
                  display: 'block',
                  margin: '0',
                  padding: '0'
                }}
              >
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter your password"
                  required
                  style={{
                    width: '100%',
                    maxWidth: '100%',
                    boxSizing: 'border-box',
                    margin: '0',
                    padding: '0.75rem 2rem 0.75rem 0.75rem',
                    border: '2px solid #e0f7f7',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    background: '#fff',
                    display: 'block',
                    position: 'relative',
                    left: '0',
                    right: '0',
                    transform: 'none',
                    overflow: 'hidden'
                  }}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '0.5rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: '#008080',
                    cursor: 'pointer',
                    padding: '0.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: '10',
                    width: 'auto',
                    height: 'auto',
                    maxWidth: '1.5rem',
                    margin: '0'
                  }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div 
              className="form-options"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                gap: '0.75rem',
                marginBottom: '1.5rem'
              }}
            >
              <label 
                className="checkbox-container"
                style={{
                  order: '1',
                  marginBottom: '0'
                }}
              >
                <input type="checkbox" />
                <span className="checkmark"></span>
                Remember me
              </label>
              <Link 
                href="/forgot-password" 
                className="forgot-link"
                style={{
                  order: '2',
                  alignSelf: 'flex-start'
                }}
              >
                Forgot Password?
              </Link>
            </div>

            <LoadingButton
              type="submit"
              className="auth-btn w-full"
              loading={isLoading}
              loadingText="Signing In..."
              variant="primary"
            >
              Sign In
            </LoadingButton>
          </form>

          <div className="divider">
            <span>Or continue with</span>
          </div>

          <div className="social-login">
            <LoadingButton className="social-btn google-btn" variant="outline">
              <FaGoogle />
              Google
            </LoadingButton>
            <LoadingButton className="social-btn facebook-btn" variant="outline">
              <FaFacebook />
              Facebook
            </LoadingButton>
          </div>

          <div className="auth-footer">
            <p>
              Don&apos;t have an account?{' '}
              <Link href="/register" className="auth-link">
                Sign up here
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}