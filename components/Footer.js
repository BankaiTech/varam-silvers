'use client';

import Link from 'next/link';
import { FaFacebook, FaInstagram, FaTwitter, FaPinterest, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer mt-5">
      <div className="container">
        <div className="row gy-5 justify-content-center">
          {/* Company Info */}
          <div className="col-lg-3 col-md-6">
            <div className="pe-lg-4">
              <h3 className="navbar-brand mb-4">Varam Silvers</h3>
              <p className="mb-4 opacity-75 small">
                Beautiful and elegant silver jewelry for children. Each piece is crafted with love and care to bring joy to little ones.
              </p>
              <div className="d-flex gap-4">
                <a href="#" className="social-icon hover-lift">
                  <FaFacebook size={20} />
                </a>
                <a href="#" className="social-icon hover-lift">
                  <FaInstagram size={20} />
                </a>
                <a href="#" className="social-icon hover-lift">
                  <FaTwitter size={20} />
                </a>
                <a href="#" className="social-icon hover-lift">
                  <FaPinterest size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6">
            <h5 className="mb-4 text-uppercase fw-semibold">Quick Links</h5>
            <ul className="list-unstyled footer-links small">
              <li className="mb-2"><Link href="/products">Products</Link></li>
              <li className="mb-2"><Link href="#JavaScript:void(0)">About Us</Link></li>
              <li className="mb-2"><Link href="#JavaScript:void(0)">Contact</Link></li>
              <li className="mb-2"><Link href="#JavaScript:void(0)">Shipping Info</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="col-lg-2 col-md-6">
            <h5 className="mb-4 text-uppercase fw-semibold">Customer Service</h5>
            <ul className="list-unstyled footer-links small">
              <li className="mb-2"><Link href="#JavaScript:void(0)">FAQ</Link></li>
              <li className="mb-2"><Link href="#JavaScript:void(0)">Returns</Link></li>
              <li className="mb-2"><Link href="#JavaScript:void(0)">Privacy Policy</Link></li>
              <li className="mb-2"><Link href="#JavaScript:void(0)">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-lg-3 col-md-6">
            <h5 className="mb-4 text-uppercase fw-semibold">Contact Us</h5>
            <ul className="list-unstyled contact-info small">
              <li className="mb-3 d-flex align-items-center">
                <FaEnvelope className="me-3 opacity-50" size={16} />
                <span className="opacity-75">info@varamsilvers.com</span>
              </li>
              <li className="mb-3 d-flex align-items-center">
                <FaPhone className="me-3 opacity-50" size={16} />
                <span className="opacity-75">+1 (555) 123-4567</span>
              </li>
              <li className="d-flex align-items-start">
                <FaMapMarkerAlt className="me-3 opacity-50 mt-1" size={16} />
                <div className="opacity-75">
                  123 Silver Street<br />Jewelry District<br />New York, NY 10001
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center border-top border-white border-opacity-10 mt-5 pt-4">
          <p className="mb-0 opacity-50 small">
            © {currentYear} Varam Silvers. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 