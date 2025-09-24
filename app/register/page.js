'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaEye, FaEyeSlash, FaGoogle, FaFacebook } from 'react-icons/fa';
import LoadingButton from '../../components/LoadingButton';
//import LoadingSpinner from '../../components/LoadingSpinner';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Admin credentials check (same as login)
    const adminCredentials = {
      email: 'varam@gmail.com',
      password: 'Varam_silvers@#$'
    };

    // Simulate API call
    setTimeout(() => {
      if (formData.email === adminCredentials.email && formData.password === adminCredentials.password) {
        // Admin registration - redirect to admin dashboard
        localStorage.setItem('adminLoggedIn', 'true');
        localStorage.setItem('adminEmail', formData.email);
        router.push('/admin/dashboard');
      } else {
        // Regular user registration logic here
        // For now, just show error for non-admin users
        setError('Registration not available for regular users. Please use admin credentials.');
        setIsLoading(false);
      }
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
          style={{ position: 'relative' }}
        >
          {isLoading && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(255, 255, 255, 0.9)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              borderRadius: '16px'
            }}>
              <div className="loading-spinner" style={{
                width: '40px',
                height: '40px',
                border: '4px solid #e5e7eb',
                borderTop: '4px solid #008080',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                marginBottom: '1rem'
              }}></div>
              <p style={{ color: '#008080', fontWeight: '500' }}>Creating your account...</p>
            </div>
          )}
          <div className="auth-header">
            <h1 className="auth-title">Create Account</h1>
            <p className="auth-subtitle">Join Varam Silvers and discover beautiful jewelry</p>
            <div style={{
              background: '#f0f9ff',
              border: '1px solid #bae6fd',
              borderRadius: '8px',
              padding: '0.75rem',
              marginTop: '1rem',
              fontSize: '0.8rem',
              color: '#0369a1'
            }}>
              <strong>Admin Access:</strong> Use varam@gmail.com / Varam_silvers@#$ to access admin dashboard
            </div>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {error && (
              <div className="error-message" style={{
                background: '#fee2e2',
                color: '#dc2626',
                padding: '0.8rem',
                borderRadius: '8px',
                marginBottom: '1rem',
                fontSize: '0.9rem',
                border: '1px solid #fecaca'
              }}>
                {error}
              </div>
            )}
            <div 
              className="form-row"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0',
                width: '100%',
                maxWidth: '100%',
                overflow: 'hidden',
                boxSizing: 'border-box',
                margin: '0',
                padding: '0'
              }}
            >
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
                <label htmlFor="firstName" className="form-label">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="First name"
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
                    background: 'var(--soft-white)',
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
                <label htmlFor="lastName" className="form-label">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Last name"
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
                    background: 'var(--soft-white)',
                    display: 'block',
                    position: 'relative',
                    left: '0',
                    right: '0',
                    transform: 'none',
                    overflow: 'hidden'
                  }}
                />
              </div>
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
                  background: 'var(--soft-white)',
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
              <label htmlFor="phone" className="form-label">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your phone number"
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
                  background: 'var(--soft-white)',
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
                  placeholder="Create a password"
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
                    background: 'var(--soft-white)',
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
                    color: 'var(--primary-teal)',
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
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
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
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Confirm your password"
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
                    background: 'var(--soft-white)',
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
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{
                    position: 'absolute',
                    right: '0.5rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: 'var(--primary-teal)',
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
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  required
                />
                <span className="checkmark"></span>
                I agree to the{' '}
                <Link href="/terms" className="terms-link">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="terms-link">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <button
              type="submit"
              className="auth-btn w-full"
            >
              Create Account
            </button>
          </form>

          <div className="divider">
            <span>Or continue with</span>
          </div>

          <div className="social-login">
            <LoadingButton className="social-btn google-btn" variant="outline">
              <span className="social-icon-text">
                <FaGoogle />
                <span>Google</span>
              </span>
            </LoadingButton>
            <LoadingButton className="social-btn facebook-btn" variant="outline">
              <span className="social-icon-text">
                <FaFacebook />
                <span>Facebook</span>
              </span>
            </LoadingButton>
          </div>

          <div className="auth-footer">
            <p>
              Already have an account?{' '}
              <Link href="/login" className="auth-link">
                Sign in here
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
