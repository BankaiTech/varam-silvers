'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Default admin credentials
    const adminCredentials = {
      email: 'varam@gmail.com',
      password: 'Varam_silvers@#$'
    };

    // Simulate authentication check
    setTimeout(() => {
      if (formData.email === adminCredentials.email && formData.password === adminCredentials.password) {
        // Store admin session
        localStorage.setItem('adminLoggedIn', 'true');
        localStorage.setItem('adminEmail', formData.email);
        router.push('/admin/dashboard');
      } else {
        setError('Invalid credentials. Please try again.');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-container">
        <div className="admin-login-card">
          <div className="admin-login-header">
            <div className="admin-logo">
              <Image 
                src="/images/Varam Silvers Logo.png" 
                alt="Varam Silvers Admin" 
                width={80} 
                height={40}
                priority
              />
            </div>
            <h1>Admin Dashboard</h1>
            <p>Sign in to manage your jewelry business</p>
          </div>

          <form onSubmit={handleSubmit} className="admin-login-form">
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              className="admin-login-btn"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In to Dashboard'}
            </button>
          </form>

          <div className="admin-login-footer">
            <p>Default Credentials:</p>
            <p><strong>Email:</strong> varam@gmail.com</p>
            <p><strong>Password:</strong> Varam_silvers@#$</p>
          </div>

          <div className="back-to-site">
            <Link href="/" className="back-link">
              ← Back to Varam Silvers
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
