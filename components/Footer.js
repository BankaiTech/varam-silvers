'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaFacebook, FaInstagram, FaTwitter, FaPinterest, FaEnvelope, FaPhone, FaWhatsapp, FaPaperPlane, FaShieldAlt, FaTruck, FaAward } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  const contactLinkStyle = {
    color: '#008080',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
    fontWeight: '500'
  };

  const contactLinkHoverStyle = {
    color: '#20b2aa',
    textDecoration: 'underline'
  };
  
  return (
    <>
      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="newsletter-container">
          <div className="newsletter-content">
            <div className="newsletter-text">
              <h3 className="newsletter-title">Stay Updated with Our Latest Collections</h3>
              <p className="newsletter-subtitle">Be the first to know about new arrivals, exclusive offers, and special events.</p>
            </div>
            <div className="newsletter-form-container">
              <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
                <div className="newsletter-input-group">
                  <input
                    type="email"
                    className="newsletter-input"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button className="newsletter-btn" type="submit">
                    <FaPaperPlane />
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="trust-section">
        <div className="trust-container">
          <div className="trust-grid">
            <div className="trust-item">
              <FaShieldAlt className="trust-icon" />
              <h6 className="trust-title">Secure Shopping</h6>
              <small className="trust-subtitle">SSL Encrypted</small>
            </div>
            <div className="trust-item">
              <FaTruck className="trust-icon" />
              <h6 className="trust-title">Free Shipping</h6>
              <small className="trust-subtitle">Worldwide Delivery</small>
            </div>
            <div className="trust-item">
              <FaAward className="trust-icon" />
              <h6 className="trust-title">Premium Quality</h6>
              <small className="trust-subtitle">925 Sterling Silver</small>
            </div>
            <div className="trust-item">
              <FaShieldAlt className="trust-icon" />
              <h6 className="trust-title">Lifetime Warranty</h6>
              <small className="trust-subtitle">Quality Guaranteed</small>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            {/* Company Info */}
            <div className="footer-section company-info">
              <h3 className="footer-brand">Varam Silvers</h3>
              <p className="footer-description">
                Creating timeless memories with exquisite silver jewelry for children. Each piece is handcrafted with love, precision, and the finest 925 sterling silver.
              </p>
              <div className="social-links">
                <a href="#" className="social-icon">
                  <FaFacebook size={20} />
                </a>
                <a href="#" className="social-icon">
                  <FaInstagram size={20} />
                </a>
                <a href="#" className="social-icon">
                  <FaTwitter size={20} />
                </a>
                <a href="#" className="social-icon">
                  <FaPinterest size={20} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-section">
              <h5 className="footer-title">Collections</h5>
              <ul className="footer-links">
                <li><Link href="/products?category=anklets">Anklets</Link></li>
                <li><Link href="/products?category=bracelets">Bracelets</Link></li>
                <li><Link href="/products?category=necklaces">Necklaces</Link></li>
                <li><Link href="/products?category=rings">Rings</Link></li>
                <li><Link href="/products">View All</Link></li>
              </ul>
            </div>

            {/* Customer Service */}
            <div className="footer-section">
              <h5 className="footer-title">Support</h5>
              <ul className="footer-links">
                <li><Link href="#faq">FAQ</Link></li>
                <li><Link href="#returns">Returns & Exchanges</Link></li>
                <li><Link href="#shipping">Shipping Info</Link></li>
                <li><Link href="#size-guide">Size Guide</Link></li>
                <li><Link href="#care">Care Instructions</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="footer-section">
              <h5 className="footer-title">Get in Touch</h5>
              <ul className="contact-info">
                <li className="contact-item">
                  <FaEnvelope className="contact-icon" size={16} />
                  <a 
                    href="mailto:varamsilvers@gmail.com?subject=Inquiry from Varam Silvers Website" 
                    className="contact-link"
                    style={contactLinkStyle}
                    onMouseEnter={(e) => Object.assign(e.target.style, contactLinkHoverStyle)}
                    onMouseLeave={(e) => Object.assign(e.target.style, contactLinkStyle)}
                  >
                    varamsilvers@gmail.com
                  </a>
                </li>
                <li className="contact-item">
                  <FaWhatsapp className="contact-icon" size={16} />
                  <a 
                    href="https://wa.me/919444885666?text=Hello! I would like to know more about Varam Silvers jewelry." 
                    className="contact-link" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={contactLinkStyle}
                    onMouseEnter={(e) => Object.assign(e.target.style, contactLinkHoverStyle)}
                    onMouseLeave={(e) => Object.assign(e.target.style, contactLinkStyle)}
                  >
                    +91 94448 85666
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="footer-copyright">
            <div className="copyright-content">
              <div className="copyright-text">
                <p>© {currentYear} Varam Silvers. All rights reserved.</p>
              </div>
              <div className="copyright-links">
                <Link href="#privacy">Privacy Policy</Link>
                <Link href="#terms">Terms of Service</Link>
                <Link href="#cookies">Cookie Policy</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      
      <style jsx>{`
        .footer .contact-icon {
          color: #008080 !important;
        }
        
        .footer .contact-link {
          color: #008080 !important;
          text-decoration: none !important;
        }
        
        .footer .contact-link:hover {
          color: #20b2aa !important;
          text-decoration: underline !important;
        }
      `}</style>
    </>
  );
};

export default Footer; 