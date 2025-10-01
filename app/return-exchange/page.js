'use client';

import React from 'react';
import { FaBoxOpen, FaExclamationTriangle } from 'react-icons/fa';

export default function ReturnExchangePage() {
  return (
    <div className="return-exchange-page">
      <div className="return-exchange-container">
        {/* Header */}
        <div className="page-header">
          <h1 className="page-title">7-Day Replacement & Refund Policy</h1>
          <p className="page-subtitle">Important information about our replacement and refund process with unboxing video requirements</p>
        </div>

        {/* Main Content */}
        <div className="return-exchange-content">
          {/* Exchange Process */}
          <div className="exchange-section">
            <div className="section-header">
              <FaBoxOpen className="section-icon" />
              <h2>Replacement & Refund Process</h2>
            </div>
            
            <div className="exchange-info">
              <div className="important-notice">
                <FaExclamationTriangle className="notice-icon" />
                <h3>Important Notice</h3>
                <p><strong>Unboxing Video Required:</strong> For all replacement, damage claims, or refund requests, an unboxing video is mandatory. The video must show the complete unboxing process from package opening to item reveal.</p>
              </div>

              <div className="exchange-steps">
                <h3>How to Request a Replacement or Refund:</h3>
                <ol className="steps-list">
                  <li>
                    <strong>Record Unboxing Video:</strong> Create a video showing the complete unboxing process from package opening to item reveal
                  </li>
                  <li>
                    <strong>Contact Us:</strong> Reach out to us via WhatsApp or email within 7 days of delivery with your unboxing video
                  </li>
                  <li>
                    <strong>Provide Details:</strong> Share your order number, reason for replacement/refund, and attach the unboxing video
                  </li>
                  <li>
                    <strong>Ship Item:</strong> We&apos;ll provide shipping instructions for returning the original item
                  </li>
                  <li>
                    <strong>Receive Replacement/Refund:</strong> Your new item will be shipped or refund will be processed after we receive the original
                  </li>
                </ol>
              </div>
            </div>
          </div>


          {/* Replacement & Refund Conditions */}
          <div className="conditions-section">
            <h2 style={{margin: '0px'}}>Replacement & Refund Conditions</h2>
            <div className="conditions-grid">
              <div className="condition-item">
                <h4 style={{margin: '5px',textDecoration: 'underline'}}>Requirements</h4>
                <ul style={{margin: '0px'}}>
                  <li>Unboxing video showing complete process</li>
                  <li>Contact within 7 days of delivery</li>
                  <li>Original packaging included</li>
                  <li>Clear reason for replacement/refund</li>
                </ul>
              </div>
              
              <div className="condition-item">
                <h4 style={{margin: '5px',textDecoration: 'underline'}}>Eligible for Replacement/Refund</h4>
                <ul style={{margin: '0px'}}>
                  <li>Damaged items upon arrival</li>
                  <li>Defective or faulty products</li>
                  <li>Wrong item received</li>
                  <li>Size or style exchanges</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="contact-section" style={{paddingBottom: '15px'}}>
            <h2 style={{margin: '0px'}}>Need Help?</h2>
            <p>If you have any questions about our replacement or refund process, or need assistance with your unboxing video, please contact us:</p>
            <div className="contact-methods">
              <a 
                href="https://wa.me/919444885666?text=Hello! I need help with a replacement or refund request." 
                className="contact-btn whatsapp-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                WhatsApp Support
              </a>
              
              <a 
                href="mailto:varamsilvers@gmail.com?subject=Replacement or Refund Request" 
                className="contact-btn email-btn"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                Email Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
