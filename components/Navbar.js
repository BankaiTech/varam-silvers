'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCurrency } from '../context/CurrencyContext';
import { FaShoppingCart, FaUser, FaHeart, FaBars, FaTimes, FaSearch } from 'react-icons/fa';
import AuthModal from './AuthModal';
import ProductSearch from './ProductSearch';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const { getCartCount, getWishlistCount } = useCurrency();

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      setIsScrolled(scrolled);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Check for existing login session
    const userSession = localStorage.getItem('userSession');
    const adminSession = localStorage.getItem('adminSession');
    setIsLoggedIn(!!(userSession || adminSession));
  }, []);

  // Close mobile search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileSearchOpen && !event.target.closest('.mobile-search-overlay') && !event.target.closest('.search-btn')) {
        setIsMobileSearchOpen(false);
      }
    };

    if (isMobileSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isMobileSearchOpen]);

  const handleLogout = () => {
    localStorage.removeItem('userSession');
    localStorage.removeItem('adminSession');
    setIsLoggedIn(false);
    window.location.reload();
  };

  return (
    <>
      {/* Modern Silver Navbar */}
      <nav className={`silver-navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          {/* Brand Logo */}
          <div className="nav-brand">
            <Link href="/" className="brand-link">
              <div className="brand-logo">
                <Image 
                  src="/images/varam_silvers_logo.png" 
                  alt="Varam Silvers - Kids Silver Jewelry" 
                  width={250} 
                  height={85}
                  className="logo-image"
                  priority
                />
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="nav-links">
            <Link href="/products" className="nav-link">
              <span>Collections</span>
            </Link>
            <Link href="/about" className="nav-link">
              <span>About</span>
            </Link>
            <Link href="/faq" className="nav-link">
              <span>FAQ</span>
            </Link>
            <Link href="/contact" className="nav-link">
              <span>Contact</span>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="nav-search">
            <ProductSearch />
          </div>

          {/* Action Buttons */}
          <div className="nav-actions">
            <button 
              className="action-btn search-btn mobile-only"
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              title="Search products"
            >
              <FaSearch />
            </button>
            <Link href="/wishlist" className="action-btn wishlist-btn">
              <FaHeart />
              <span className="badge">{getWishlistCount()}</span>
            </Link>
            <button 
              className="action-btn cart-btn disabled" 
              disabled 
              title="Cart feature coming soon!"
            >
              <FaShoppingCart />
              <span className="badge">{getCartCount()}</span>
            </button>
            {isLoggedIn ? (
              <button onClick={handleLogout} className="login-btn">
                <FaUser />
                <span>Logout</span>
              </button>
            ) : (
              <button 
                className="login-btn disabled" 
                onClick={(e) => e.preventDefault()}
                title="Login feature coming soon!"
              >
                <FaUser />
                <span>Login</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Search Input */}
        {isMobileSearchOpen && (
          <div className="mobile-search-overlay">
            <div className="mobile-search-header">
              <h3>Search Products</h3>
              <button 
                className="mobile-search-close"
                onClick={() => setIsMobileSearchOpen(false)}
                aria-label="Close search"
              >
                <FaTimes />
              </button>
            </div>
            <ProductSearch 
              isMobile={true} 
              onClose={() => setIsMobileSearchOpen(false)} 
            />
          </div>
        )}

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
          <div className="mobile-content">
            {/* Mobile Navigation */}
            <div className="mobile-nav-links">
              <Link href="/products" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
                Collections
              </Link>
              <Link href="/about" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
                About Us
              </Link>
              <Link href="/faq" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
                FAQ
              </Link>
              <Link href="/contact" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
                Contact
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="mobile-actions">
              <Link href="/wishlist" className="mobile-action-btn" onClick={() => setIsMenuOpen(false)}>
                <FaHeart />
                <span>Wishlist ({getWishlistCount()})</span>
              </Link>
              <button 
                className="mobile-action-btn disabled" 
                disabled 
                title="Cart feature coming soon!"
              >
                <FaShoppingCart />
                <span>Cart ({getCartCount()})</span>
              </button>
              {isLoggedIn ? (
                <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="mobile-login-btn">
                  <FaUser />
                  <span>Logout</span>
                </button>
              ) : (
                <button 
                  className="mobile-login-btn disabled" 
                  onClick={(e) => e.preventDefault()}
                  title="Login feature coming soon!"
                >
                  <FaUser />
                  <span>Login</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      {isMenuOpen && (
        <div className="mobile-overlay" onClick={() => setIsMenuOpen(false)}></div>
      )}

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </>
  );
} 