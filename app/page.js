'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const heroImages = [
  {
    src: '/images/Unicorn Chain Rose Gold.jpg',
    title: 'Timeless Elegance for Little Princesses',
    subtitle: 'Discover our exquisite collection of handcrafted silver jewelry, where every piece is designed to celebrate the precious moments of childhood',
    cta: 'Explore Collection',
    link: '/products'
  },
  {
    src: '/images/Eye Chain Rose Gold.jpg',
    title: 'Crafted with Love & Precision',
    subtitle: 'Each piece tells a story of tradition, quality, and the pure joy of childhood. Made with 925 sterling silver and endless care',
    cta: 'Shop Now',
    link: '/products'
  },
  {
    src: '/images/Boy with Eye Chain.png',
    title: 'Where Dreams Meet Silver',
    subtitle: 'Premium quality jewelry that grows with your child, creating memories that will last a lifetime',
    cta: 'View Collection',
    link: '/products'
  }
];

const featuredProducts = [
  {
    id: 1,
    name: 'Butterfly Feet Chain',
    prices: {
      silver: { priceINR: 2499, priceUSD: 29.99 },
      gold: { priceINR: 8999, priceUSD: 107.99 },
      roseGold: { priceINR: 6999, priceUSD: 83.99 }
    },
    image: '/images/Butterfly Feet Chain Rose Gold.jpg',
    description: 'Beautiful butterfly-themed anklet chain with delicate butterfly charms, perfect for your little princess',
    wastagePercentage: 8,
    category: 'Chains',
    materials: {
      silver: '925 Sterling Silver',
      gold: '18K Gold',
      roseGold: '18K Rose Gold'
    },
    ageRange: '2-12 years'
  },
  {
    id: 2,
    name: 'Eye Chain',
    prices: {
      silver: { priceINR: 1999, priceUSD: 24.99 },
      gold: { priceINR: 7999, priceUSD: 95.99 },
      roseGold: { priceINR: 5999, priceUSD: 71.99 }
    },
    image: '/images/Eye Chain Silver.jpg',
    description: 'Elegant eye-shaped chain with protective symbolism, designed to ward off evil and bring good luck',
    wastagePercentage: 10,
    category: 'Chains',
    materials: {
      silver: '925 Sterling Silver',
      gold: '18K Gold',
      roseGold: '18K Rose Gold'
    },
    ageRange: '3-14 years'
  },
  {
    id: 3,
    name: 'Panda Chain',
    prices: {
      silver: { priceINR: 3499, priceUSD: 42.99 },
      gold: { priceINR: 12999, priceUSD: 155.99 },
      roseGold: { priceINR: 9999, priceUSD: 119.99 }
    },
    image: '/images/Panda Chain Silver.jpg',
    description: 'Adorable panda-themed chain with cute panda charms, bringing joy and playfulness to your child',
    wastagePercentage: 12,
    category: 'Chains',
    materials: {
      silver: '925 Sterling Silver',
      gold: '18K Gold',
      roseGold: '18K Rose Gold'
    },
    ageRange: '4-16 years'
  },
  {
    id: 4,
    name: 'Unicorn Chain',
    prices: {
      silver: { priceINR: 1299, priceUSD: 15.99 },
      gold: { priceINR: 4999, priceUSD: 59.99 },
      roseGold: { priceINR: 3999, priceUSD: 47.99 }
    },
    image: '/images/Unicorn Chain Rose Gold.jpg',
    description: 'Magical unicorn-themed chain with enchanting unicorn charm, bringing dreams to life',
    wastagePercentage: 5,
    category: 'Chains',
    materials: {
      silver: '925 Sterling Silver',
      gold: '18K Gold',
      roseGold: '18K Rose Gold'
    },
    ageRange: '2-10 years'
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
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="product-card-link"
              >
                <motion.div
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
                    <h3 className="product-title">{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                    
                    <div className="product-price-section">
                      <div className="product-price">
                        <span className="original-price">₹{Math.round(product.prices.silver.priceINR * 1.2).toLocaleString('en-IN')}</span>
                        <span className="current-price">₹{product.prices.silver.priceINR.toLocaleString('en-IN')} (Incl. {product.wastagePercentage}% wastage)</span>
                      </div>
                    </div>
                  </div>
              </motion.div>
              </Link>
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
                  src="/images/Boy with Tiger Chain.png"
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
              <h4 className="feature-title">Free Shipping in India</h4>
              <p className="feature-description">Complimentary shipping on all orders within India, with premium packaging that makes every delivery feel special.</p>
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