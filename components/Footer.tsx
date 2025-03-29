'use client';

import Link from 'next/link';
import { FaFacebook, FaInstagram, FaTwitter, FaPinterest, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-black text-white mt-20">
      <div className="container" style={{ paddingTop: '3% !important' }}>
        <div className="row gy-5 justify-content-center">
          {/* Company Info */}
          <div className="col-lg-3 col-md-6">
            <div className="pe-lg-4">
              <h3 className="h4 mb-4 fw-semibold">Varam Silvers</h3>
              <p className="mb-4 opacity-75 small">
                Beautiful and elegant silver jewelry for children. Each piece is crafted with love and care to bring joy to little ones.
              </p>
              <div className="d-flex gap-4">
                <a href="#" className="text-white opacity-50 hover-lift">
                  <FaFacebook size={20} />
                </a>
                <a href="#" className="text-white opacity-50 hover-lift">
                  <FaInstagram size={20} />
                </a>
                <a href="#" className="text-white opacity-50 hover-lift">
                  <FaTwitter size={20} />
                </a>
                <a href="#" className="text-white opacity-50 hover-lift">
                  <FaPinterest size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6 offset-lg-1">
            <div>
              <h4 className="h6 mb-4 text-uppercase fw-semibold">Quick Links</h4>
              <ul className="list-unstyled footer-links small">
                <li className="mb-2">
                  <Link href="/products" className="text-white opacity-75 text-decoration-none">
                    Products
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/about" className="text-white opacity-75 text-decoration-none">
                    About Us
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/contact" className="text-white opacity-75 text-decoration-none">
                    Contact
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/shipping" className="text-white opacity-75 text-decoration-none">
                    Shipping Info
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Customer Service */}
          <div className="col-lg-2 col-md-6">
            <div>
              <h4 className="h6 mb-4 text-uppercase fw-semibold">Customer Service</h4>
              <ul className="list-unstyled footer-links small">
                <li className="mb-2">
                  <Link href="/faq" className="text-white opacity-75 text-decoration-none">
                    FAQ
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/returns" className="text-white opacity-75 text-decoration-none">
                    Returns
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/privacy" className="text-white opacity-75 text-decoration-none">
                    Privacy Policy
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/terms" className="text-white opacity-75 text-decoration-none">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="col-lg-3 col-md-6">
            <div>
              <h4 className="h6 mb-4 text-uppercase fw-semibold">Contact Us</h4>
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
                    123 Silver Street<br />
                    Jewelry District<br />
                    New York, NY 10001
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center border-top border-white border-opacity-10 mt-10 pt-6">
          <p className="mb-0 opacity-50 small">
            © {currentYear} Varam Silvers. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 