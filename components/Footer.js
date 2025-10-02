'use client';

import Link from 'next/link';
import { FaInstagram, FaEnvelope, FaWhatsapp, FaShieldAlt, FaTruck, FaAward } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const contactLinkStyle = {
    color: '#ffffffb3',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
    fontWeight: '500'
  };

  const contactLinkHoverStyle = {
    color: 'rgba(255, 255, 255, 0.8)',
    textDecoration: 'underline'
  };
  
  return (
    <>

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
              <small className="trust-subtitle">India Only</small>
            </div>
            <div className="trust-item">
              <FaAward className="trust-icon" />
              <h6 className="trust-title">Premium Quality</h6>
              <small className="trust-subtitle">92.5 Sterling Silver</small>
            </div>
            <div className="trust-item">
              <FaShieldAlt className="trust-icon" />
              <h6 className="trust-title">Quality Guaranteed</h6>
              <small className="trust-subtitle">Rigorous Quality Checks</small>
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
                Creating timeless memories with exquisite silver jewelry for children. Each piece is handcrafted with love, precision, and the finest 92.5 sterling silver.
              </p>
              <div className="social-links">
                <a href="https://www.instagram.com/varamsilvers/" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <FaInstagram size={20} />
                </a>
              </div>
            </div>

            {/* Collections */}
            <div className="footer-section">
              <h5 className="footer-title">Collections</h5>
              <ul className="footer-links">
                <li><Link href="/products?category=earrings">Earrings</Link></li>
                <li><Link href="/products?category=bracelet">Bracelet</Link></li>
                <li><Link href="/products?category=kada">Kada</Link></li>
                <li><Link href="/products?category=nazariya">Nazariya</Link></li>
                <li><Link href="/products?category=chains">Chains</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div className="footer-section">
              <h5 className="footer-title">Support</h5>
              <ul className="footer-links">
                <li><Link href="/faq">FAQ</Link></li>
                <li><Link href="/return-exchange">Return & Exchange</Link></li>
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
                <span className="copyright-left">© {currentYear} Varam Silvers. All rights reserved.</span>
                <span className="attribution-right">
                  Designed and developed with ❤️ by{' '}
                  <a 
                    href="https://bankaitech.co/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bankaitech-link"
                  >
                    BankaiTech
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      
      <style jsx>{`
        .footer .contact-icon {
          color: white !important;
        }
        
        .footer .contact-link {
          color: white !important;
          text-decoration: none !important;
        }
        
        .footer .contact-link:hover {
          color: rgba(255, 255, 255, 0.8) !important;
          text-decoration: underline !important;
        }
        
        .footer .copyright-content {
          display: flex !important;
          justify-content: space-between !important;
          align-items: center !important;
          width: 100% !important;
        }
        
        .footer .copyright-text {
          display: flex !important;
          justify-content: space-between !important;
          align-items: center !important;
          width: 100% !important;
          margin: 0 !important;
        }
        
        .footer .copyright-left {
          color: rgba(255, 255, 255, 0.7) !important;
          font-size: 0.9rem !important;
          margin: 0 !important;
        }
        
        .footer .attribution-right {
          font-size: 14px !important;
          color: rgba(255, 255, 255, 0.7) !important;
          margin: 0 !important;
        }
        
        .bankaitech-link {
          color: #4CAF50 !important;
          text-decoration: none !important;
          font-weight: 600;
          transition: color 0.3s ease;
        }
        
        .bankaitech-link:hover {
          color: #66BB6A !important;
          text-decoration: underline !important;
        }
        
        @media (max-width: 768px) {
          .footer .copyright-content {
            flex-direction: column !important;
            text-align: center !important;
            gap: 8px !important;
          }
          
          .footer .copyright-text {
            flex-direction: column !important;
            text-align: center !important;
            gap: 8px !important;
          }
        }
      `}</style>
    </>
  );
};

export default Footer; 
