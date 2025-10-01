'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="about-hero-section">
        <div className="about-hero-container">
          <div className="about-hero-content">
            <motion.h1 
              className="about-hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              About Varam Silvers
            </motion.h1>
            <motion.p 
              className="about-hero-subtitle"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Crafting Dreams in Silver with Passion and Care
            </motion.p>
          </div>
        </div>
      </section>

      {/* Company Story Section */}
      <section className="company-story-section">
        <div className="section-container">
          <div className="story-content">
            <div className="story-text">
              <motion.h2 
                className="section-title"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                Our Story
              </motion.h2>
              <motion.div 
                className="story-paragraphs"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <p>
                  Founded in 2025 by Praveen, Varam Silvers emerged from a simple yet powerful vision: to create beautiful, safe, and meaningful silver jewelry that celebrates the precious moments of childhood. As a passionate entrepreneur and craftsman, Praveen recognized the need for high-quality, child-safe jewelry that parents could trust.
                </p>
                <p>
                  Praveen&apos;s journey began with a deep appreciation for traditional silver craftsmanship combined with modern safety standards. Having witnessed the joy that jewelry brings to children and families, he set out to create a brand that would combine the timeless beauty of silver with contemporary design and uncompromising safety.
                </p>
                <p>
                  Today, Varam Silvers offers five distinct collections - Chains, Earrings, Bracelets, Kada, and Nazriya - each carefully designed to bring joy, protection, and beauty to children&apos;s lives. Every piece reflects Praveen&apos;s commitment to quality, safety, and the belief that every child deserves to feel special and loved.
                </p>
              </motion.div>
            </div>
            <motion.div 
              className="story-image"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="image-frame">
                <Image
                  src="/images/Baby with Panda Chain.png"
                  alt="Varam Silvers Crafting Process"
                  width={500}
                  height={400}
                  className="story-img"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Silver Section */}
      <section className="why-silver-section">
        <div className="section-container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Why Choose Silver Jewelry?</h2>
            <p className="section-subtitle">
              Discover the timeless benefits of sterling silver for your precious little ones
            </p>
          </motion.div>

          <div className="benefits-grid">
            <motion.div 
              className="benefit-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="benefit-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3 className="benefit-title">Hypoallergenic & Safe</h3>
              <p className="benefit-description">
                Sterling silver is naturally hypoallergenic, making it perfect for children with sensitive skin. Unlike other metals, silver rarely causes allergic reactions or skin irritations.
              </p>
            </motion.div>

            <motion.div 
              className="benefit-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="benefit-icon">
                <i className="fas fa-gem"></i>
              </div>
              <h3 className="benefit-title">Premium Quality</h3>
              <p className="benefit-description">
                Our 925 sterling silver contains 92.5% pure silver and 7.5% other metals, ensuring durability while maintaining the beautiful luster and shine that silver is known for.
              </p>
            </motion.div>

            <motion.div 
              className="benefit-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="benefit-icon">
                <i className="fas fa-heart"></i>
              </div>
              <h3 className="benefit-title">Timeless Beauty</h3>
              <p className="benefit-description">
                Silver jewelry never goes out of style. It complements any outfit and occasion, from casual playtime to special celebrations, growing with your child through every milestone.
              </p>
            </motion.div>

            <motion.div 
              className="benefit-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="benefit-icon">
                <i className="fas fa-expand-arrows-alt"></i>
              </div>
              <h3 className="benefit-title">Adjustable & Growing</h3>
              <p className="benefit-description">
                Our jewelry is designed to grow with your child. Adjustable chains, expandable bracelets, and flexible designs ensure years of comfortable wear.
              </p>
            </motion.div>

            <motion.div 
              className="benefit-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="benefit-icon">
                <i className="fas fa-leaf"></i>
              </div>
              <h3 className="benefit-title">Natural & Pure</h3>
              <p className="benefit-description">
                Silver is a natural element found in the earth, making it an eco-friendly choice. It&apos;s also antimicrobial, helping to keep your child&apos;s skin clean and healthy.
              </p>
            </motion.div>

            <motion.div 
              className="benefit-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="benefit-icon">
                <i className="fas fa-star"></i>
              </div>
              <h3 className="benefit-title">Investment Value</h3>
              <p className="benefit-description">
                Silver jewelry retains its value over time and can be passed down through generations, creating lasting family heirlooms and precious memories.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="values-section">
        <div className="section-container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Our Values</h2>
            <p className="section-subtitle">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="values-grid">
            <motion.div 
              className="value-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="value-icon">
                <i className="fas fa-hands"></i>
              </div>
              <h3 className="value-title">Craftsmanship</h3>
              <p className="value-description">
                Every piece is handcrafted by skilled artisans using traditional techniques passed down through generations, ensuring exceptional quality and attention to detail.
              </p>
            </motion.div>

            <motion.div 
              className="value-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="value-icon">
                <i className="fas fa-child"></i>
              </div>
              <h3 className="value-title">Child Safety</h3>
              <p className="value-description">
                Safety is our top priority. All our jewelry is designed with child safety in mind, featuring smooth edges, secure clasps, and non-toxic materials.
              </p>
            </motion.div>

            <motion.div 
              className="value-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="value-icon">
                <i className="fas fa-heart"></i>
              </div>
              <h3 className="value-title">Love & Care</h3>
              <p className="value-description">
                We infuse every piece with love and care, understanding that jewelry for children is more than an accessory—it&apos;s a symbol of love and protection.
              </p>
            </motion.div>

            <motion.div 
              className="value-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="value-icon">
                <i className="fas fa-award"></i>
              </div>
              <h3 className="value-title">Excellence</h3>
              <p className="value-description">
                We strive for excellence in everything we do, from the quality of our materials to the design of our pieces and the service we provide to our customers.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="stats-section">
        <div className="section-container">
          <motion.div 
            className="stats-grid"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="stat-item">
              <motion.div 
                className="stat-number"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                2025
              </motion.div>
              <div className="stat-label">Founded by Praveen</div>
            </div>
            <div className="stat-item">
              <motion.div 
                className="stat-number"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                5
              </motion.div>
              <div className="stat-label">Collections</div>
            </div>
            <div className="stat-item">
              <motion.div 
                className="stat-number"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              >
                30+
              </motion.div>
              <div className="stat-label">Unique Designs</div>
            </div>
            <div className="stat-item">
              <motion.div 
                className="stat-number"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: true }}
              >
                100%
              </motion.div>
              <div className="stat-label">Child Safe</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="section-container">
          <motion.div 
            className="cta-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="cta-title">Ready to Create Beautiful Memories?</h2>
            <p className="cta-subtitle">
              Explore our exquisite collection of handcrafted silver jewelry and find the perfect piece for your little one.
            </p>
            <div className="cta-buttons">
              <Link href="/products" className="cta-btn primary">
                Explore Collection
              </Link>
              <Link href="/contact" className="cta-btn secondary">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
