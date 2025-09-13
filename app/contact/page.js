'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock, FaWhatsapp } from 'react-icons/fa';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsLoading(false);
      alert('Thank you for your message! We will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 2000);
  };

  const handleEmailClick = () => {
    window.open('mailto:varamsilvers@gmail.com?subject=Inquiry from Varam Silvers Website', '_blank');
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('Hello! I would like to know more about Varam Silvers jewelry.');
    window.open(`https://wa.me/919444885666?text=${message}`, '_blank');
  };

  return (
    <main className="contact-page">
      <div className="contact-container">
        {/* Hero Section */}
        <motion.div
          className="contact-hero"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="contact-title">Get in Touch</h1>
          <p className="contact-subtitle">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </motion.div>

        <div className="contact-content">
          {/* Contact Information */}
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2>Contact Information</h2>
            
            <div className="contact-items-wrapper">
              <div className="contact-item" onClick={handleEmailClick}>
                <div className="contact-icon">
                  <FaEnvelope />
                </div>
                <div className="contact-details">
                  <h3>Email Us</h3>
                  <p>varamsilvers@gmail.com</p>
                  <span className="contact-action">Click to open Gmail</span>
                </div>
              </div>

              <div className="contact-item" onClick={handleWhatsAppClick}>
                <div className="contact-icon">
                  <FaWhatsapp />
                </div>
                <div className="contact-details">
                  <h3>WhatsApp Us</h3>
                  <p>+91 94448 85666</p>
                  <span className="contact-action">Click to open WhatsApp</span>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <FaClock />
                </div>
                <div className="contact-details">
                  <h3>Business Hours</h3>
                  <p>Monday - Saturday: 10:00 AM - 8:00 PM<br />Sunday: 11:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="contact-form-container"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2>Send us a Message</h2>
            <div className="contact-form-card">
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-fields">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="What is this about?"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      placeholder="Tell us more about your inquiry..."
                    ></textarea>
                  </div>
                </div>

                <button
                  type="submit"
                  className="submit-btn"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="btn-spinner"></div>
                      Sending Message...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .contact-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          padding: 2rem 0;
        }

        .contact-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .contact-hero {
          text-align: center;
          margin-bottom: 3rem;
        }

        .contact-title {
          font-size: 3rem;
          font-weight: 700;
          color: #008080;
          margin-bottom: 1rem;
          font-family: var(--font-playfair);
        }

        .contact-subtitle {
          font-size: 1.2rem;
          color: #6b7280;
          max-width: 600px;
          margin: 0 auto;
        }

        .contact-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          align-items: start;
          min-height: 600px;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          height: 100%;
          padding-top: 0;
        }

        .contact-info h2 {
          font-size: 2rem;
          font-weight: 600;
          color: #008080;
          margin-top: 0;
          margin-bottom: 2rem;
          font-family: var(--font-playfair);
        }

        .contact-items-wrapper {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .contact-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1.5rem;
          background: white;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0, 128, 128, 0.1);
          border: 1px solid #e0f7f7;
          margin-bottom: 1.5rem;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .contact-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 35px rgba(0, 128, 128, 0.2);
        }

        .contact-icon {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #008080 0%, #40e0d0 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.2rem;
          flex-shrink: 0;
        }

        .contact-details h3 {
          font-size: 1.1rem;
          font-weight: 600;
          color: #008080;
          margin-bottom: 0.5rem;
        }

        .contact-details p {
          color: #374151;
          margin-bottom: 0.5rem;
          line-height: 1.5;
        }

        .contact-action {
          font-size: 0.9rem;
          color: #20b2aa;
          font-weight: 500;
        }

        .contact-form-container {
          display: flex;
          flex-direction: column;
          height: 100%;
          padding-top: 0;
        }

        .contact-form-container h2 {
          font-size: 2rem;
          font-weight: 600;
          color: #008080;
          margin-top: 0;
          margin-bottom: 2rem;
          font-family: var(--font-playfair);
        }

        .contact-form-card {
          background: white;
          padding: 2rem;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0, 128, 128, 0.1);
          border: 1px solid #e0f7f7;
          flex: 1;
          display: flex;
          flex-direction: column;
          margin-top: 0;
        }


        .contact-form {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .form-fields {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          font-weight: 500;
          color: #374151;
          margin-bottom: 0.5rem;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 0.75rem;
          border: 2px solid #e0f7f7;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.3s ease;
          box-sizing: border-box;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #008080;
          box-shadow: 0 0 0 3px rgba(0, 128, 128, 0.1);
        }

        .form-group textarea {
          resize: vertical;
          min-height: 120px;
        }

        .submit-btn {
          width: 100%;
          padding: 1rem 2rem;
          font-size: 1.1rem;
          font-weight: 600;
          background: linear-gradient(135deg, #008080 0%, #20b2aa 100%);
          border: none;
          color: white;
          border-radius: 12px;
          transition: all 0.3s ease;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          box-shadow: 0 4px 15px rgba(0, 128, 128, 0.3);
          position: relative;
          overflow: hidden;
        }

        .submit-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }

        .submit-btn:hover::before {
          left: 100%;
        }

        .submit-btn:hover {
          background: linear-gradient(135deg, #006666 0%, #008080 100%);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 128, 128, 0.4);
        }

        .submit-btn:active {
          transform: translateY(0);
          box-shadow: 0 4px 15px rgba(0, 128, 128, 0.3);
        }

        .submit-btn:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(0, 128, 128, 0.3);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .btn-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .contact-content {
            grid-template-columns: 1fr;
            gap: 2rem;
            min-height: auto;
          }

          .contact-title {
            font-size: 2.5rem;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .contact-info {
            height: auto;
          }

          .contact-items-wrapper {
            justify-content: flex-start;
          }

          .contact-form-container {
            height: auto;
          }

          .contact-form-card {
            flex: none;
          }
        }
      `}</style>
    </main>
  );
}
