'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaShoppingCart, FaUser, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Detect if on home page
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top py-3" style={{zIndex: 1030}}>
        <div className="container">
          <Link href="/" className="navbar-brand fw-bold fs-3 text-gradient">
            Varam Silvers
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded={isMenuOpen ? "true" : "false"}
            aria-label="Toggle navigation"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse${isMenuOpen ? ' show' : ''}`} id="navbarNav">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center gap-lg-3">
              <li className="nav-item">
                <Link href="/products" className="nav-link">
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link href="#JavaScript:void(0)" className="nav-link">
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link href="#JavaScript:void(0)" className="nav-link">
                  Contact
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/cart" className="btn btn-primary ms-lg-3">
                  <FaShoppingCart className="me-2" /> Cart
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/login" className="btn btn-outline-primary ms-lg-2">
                  <FaUser className="me-2" /> Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {isSearchOpen && (
        <div className="search-overlay">
          <div className="container">
            <div className="search-container">
              <input
                type="text"
                className="form-control"
                placeholder="Search for silver jewelry..."
                autoFocus
              />
              <button
                className="btn btn-link"
                onClick={() => setIsSearchOpen(false)}
                aria-label="Close search"
              >
                <FaTimes className={`icon${isHome && !isScrolled ? ' icon-hero' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 