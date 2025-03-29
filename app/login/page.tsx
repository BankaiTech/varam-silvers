'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaUser, FaLock, FaGoogle, FaFacebook } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your login logic here
    toast.success('Login successful!', {
      duration: 2000,
      position: 'top-center',
    });
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card shadow-sm"
          >
            <div className="card-body p-5">
              <h2 className="text-center mb-4">Login</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaUser />
                    </span>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="form-label">Password</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaLock />
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="d-grid gap-2 mb-4">
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                </div>

                <div className="text-center mb-4">
                  <p className="mb-2">Or login with</p>
                  <div className="d-flex justify-content-center gap-3">
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      {...(mounted && {
                        'data-bs-toggle': 'tooltip',
                        'data-bs-placement': 'top',
                        title: 'Login with Google'
                      })}
                    >
                      <FaGoogle />
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      {...(mounted && {
                        'data-bs-toggle': 'tooltip',
                        'data-bs-placement': 'top',
                        title: 'Login with Facebook'
                      })}
                    >
                      <FaFacebook />
                    </button>
                  </div>
                </div>

                <div className="text-center">
                  <p className="mb-0">
                    Don't have an account?{' '}
                    <Link href="/register" className="text-decoration-none">
                      Register here
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 