'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaShoppingCart } from 'react-icons/fa';

const heroImages = [
  {
    src: '/images/homeslide1.png',
    title: 'Timeless Elegance for Little Princesses',
    subtitle: 'Discover our exquisite collection of handcrafted silver jewelry, where every piece is designed to celebrate the precious moments of childhood',
    cta: 'Explore Collection',
    link: '/products'
  },
  {
    src: '/images/homeslide2.jpg',
    title: 'Crafted with Love & Precision',
    subtitle: 'Each piece tells a story of tradition, quality, and the pure joy of childhood. Made with 925 sterling silver and endless care',
    cta: 'Shop Now',
    link: '/products'
  },
  {
    src: '/images/homeslide3.jpg',
    title: 'Where Dreams Meet Silver',
    subtitle: 'Premium quality jewelry that grows with your child, creating memories that will last a lifetime',
    cta: 'View Collection',
    link: '/products'
  }
];

const featuredProducts = [
  {
    id: 1,
    name: 'Princess Silver Anklet',
    priceINR: 2499,
    priceUSD: 29.99,
    image: '/images/slide1.jpg',
    description: 'Delicate sterling silver anklet adorned with tiny charms, perfect for your little princess',
    wastagePercentage: 8,
    category: 'Anklets',
    material: '925 Sterling Silver',
    ageRange: '2-12 years'
  },
  {
    id: 2,
    name: 'Elegant Silver Bracelet',
    priceINR: 1999,
    priceUSD: 24.99,
    image: '/images/slide2.jpg',
    description: 'Adjustable silver bracelet with intricate detailing, designed to grow with your child',
    wastagePercentage: 10,
    category: 'Bracelets',
    material: '925 Sterling Silver',
    ageRange: '3-14 years'
  },
  {
    id: 3,
    name: 'Dreamy Silver Necklace',
    priceINR: 3499,
    priceUSD: 42.99,
    image: '/images/slide3.jpg',
    description: 'Exquisite silver necklace featuring a delicate pendant, creating magical moments',
    wastagePercentage: 12,
    category: 'Necklaces',
    material: '925 Sterling Silver',
    ageRange: '4-16 years'
  },
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main>
      {/* Hero Section with Carousel */}
      <section className="hero-section">
        {heroImages.map((slide, index) => (
          <motion.div
            key={index}
            className={`hero-slide ${currentSlide === index ? 'active' : ''}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: currentSlide === index ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={slide.src}
              alt={slide.title}
              fill
              className="hero-image"
              priority={index === 0}
            />
            <div className="hero-overlay">
              <div className="hero-container">
                <div className="hero-content">
                  <h1 className="hero-title">{slide.title}</h1>
                  <p className="hero-subtitle">{slide.subtitle}</p>
                  <Link href={slide.link} className="hero-btn">
                    {slide.cta}
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Featured Products Section */}
      <section className="featured-products-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">✨ Trending Now ✨</h2>
            <p className="section-subtitle">Handpicked favorites that are stealing hearts this season</p>
          </div>
          <div className="products-grid">
            {featuredProducts.map((product) => (
              <motion.div
                key={product.id}
                className="product-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="product-image-container">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="product-image"
                  />
                </div>
                <div className="product-content">
                  <div className="product-category">
                    <span className="category-badge">{product.category}</span>
                  </div>
                  <h3 className="product-title">{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  
                  <span className="wastage-info">Including {product.wastagePercentage}% wastage</span>
                  
                  <div className="product-details">
                    <div className="detail-item">
                      <span className="detail-label">Material</span>
                      <span className="detail-value">{product.material}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Age Range</span>
                      <span className="detail-value">{product.ageRange}</span>
                    </div>
                  </div>
                  
                  <div className="product-footer">
                    <div className="price-section">
                      <div className="product-price">
                        <span className="original-price">₹{Math.round(product.priceINR * 1.2).toLocaleString('en-IN')}</span>
                        <span className="current-price">₹{product.priceINR.toLocaleString('en-IN')}</span>
                      </div>
                      <span className="gst-info">Including GST</span>
                    </div>
                    <Link
                      href={`/products/${product.id}`}
                      className="view-details-btn"
                    >
                      <FaShoppingCart />
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="section-container">
          <div className="about-content">
            <div className="about-text">
              <h2 className="about-title">Crafting Dreams in Silver</h2>
              <p className="about-description">
                At Varam Silvers, we believe that every child deserves to feel like royalty. Our master craftsmen have been creating exquisite silver jewelry for over three decades, combining traditional techniques with modern elegance.
              </p>
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-number">30+</div>
                  <small className="stat-label">Years of Excellence</small>
                </div>
                <div className="stat-item">
                  <div className="stat-number">10K+</div>
                  <small className="stat-label">Happy Families</small>
                </div>
              </div>
            </div>
            <div className="about-image">
              <div className="image-frame">
                <Image
                  src="/images/homeslide4.jpg"
                  alt="Crafting Process"
                  width={500}
                  height={400}
                  className="about-img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="features-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Why Choose Varam Silvers?</h2>
            <p className="section-subtitle">Excellence in every detail, love in every piece</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-gem"></i>
              </div>
              <h4 className="feature-title">Premium 925 Sterling Silver</h4>
              <p className="feature-description">Only the finest quality silver, hypoallergenic and safe for sensitive skin, ensuring your child&apos;s comfort and safety.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-heart"></i>
              </div>
              <h4 className="feature-title">Handcrafted with Love</h4>
              <p className="feature-description">Each piece is meticulously crafted by skilled artisans who pour their heart and soul into creating jewelry that tells a story.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-expand-arrows-alt"></i>
              </div>
              <h4 className="feature-title">Adjustable & Growing</h4>
              <p className="feature-description">Designed to grow with your child, our adjustable pieces ensure years of wear and precious memories.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h4 className="feature-title">Lifetime Warranty</h4>
              <p className="feature-description">We stand behind our craftsmanship with a comprehensive warranty, ensuring your investment is protected.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-shipping-fast"></i>
              </div>
              <h4 className="feature-title">Free Worldwide Shipping</h4>
              <p className="feature-description">Complimentary shipping on all orders, with premium packaging that makes every delivery feel special.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-star"></i>
              </div>
              <h4 className="feature-title">Timeless Designs</h4>
              <p className="feature-description">Classic and elegant designs that never go out of style, creating heirlooms that can be passed down through generations.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 