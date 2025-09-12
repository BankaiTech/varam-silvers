'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCurrency } from '../context/CurrencyContext';
import { FaShoppingCart, FaUser, FaSearch, FaHeart, FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getCartCount, getWishlistCount } = useCurrency();

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      setIsScrolled(scrolled);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Modern Silver Navbar */}
      <nav className={`silver-navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          {/* Brand Logo */}
          <div className="nav-brand">
            <Link href="/" className="brand-link">
              <span className="brand-text">Varam Silvers</span>
              <span className="brand-accent">✨</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="nav-links">
            <Link href="/products" className="nav-link">
              <span>Collections</span>
            </Link>
            <Link href="#about" className="nav-link">
              <span>About</span>
            </Link>
            <Link href="#contact" className="nav-link">
              <span>Contact</span>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="nav-search">
            <div className="search-wrapper">
              <FaSearch className="search-icon" />
              <input 
                type="text" 
                placeholder="Search silver jewelry..." 
                className="search-input"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="nav-actions">
            <Link href="/wishlist" className="action-btn wishlist-btn">
              <FaHeart />
              <span className="badge">{getWishlistCount()}</span>
            </Link>
            <Link href="/cart" className="action-btn cart-btn">
              <FaShoppingCart />
              <span className="badge">{getCartCount()}</span>
            </Link>
            <Link href="/login" className="login-btn">
              <FaUser />
              <span>Login</span>
            </Link>
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

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
          <div className="mobile-content">
            {/* Mobile Search */}
            <div className="mobile-search">
              <div className="mobile-search-wrapper">
                <FaSearch className="mobile-search-icon" />
                <input 
                  type="text" 
                  placeholder="Search silver jewelry..." 
                  className="mobile-search-input"
                />
              </div>
            </div>
            
            {/* Mobile Navigation */}
            <div className="mobile-nav-links">
              <Link href="/products" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
                Collections
              </Link>
              <Link href="#about" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
                About Us
              </Link>
              <Link href="#contact" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
                Contact
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="mobile-actions">
              <Link href="/wishlist" className="mobile-action-btn" onClick={() => setIsMenuOpen(false)}>
                <FaHeart />
                <span>Wishlist ({getWishlistCount()})</span>
              </Link>
              <Link href="/cart" className="mobile-action-btn" onClick={() => setIsMenuOpen(false)}>
                <FaShoppingCart />
                <span>Cart ({getCartCount()})</span>
              </Link>
              <Link href="/login" className="mobile-login-btn" onClick={() => setIsMenuOpen(false)}>
                <FaUser />
                <span>Login</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      {isMenuOpen && (
        <div className="mobile-overlay" onClick={() => setIsMenuOpen(false)}></div>
      )}
    </>
  );
} 