'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaShoppingCart } from 'react-icons/fa';
import { useCurrency } from '../context/CurrencyContext';

const heroImages = [
  {
    src: '/images/homeslide1.png',
    title: 'Beautiful Silver Jewelry',
    subtitle: 'Elegant designs for little ones',
    cta: 'Shop Now',
    link: '/products'
  },
  {
    src: '/images/homeslide2.jpg',
    title: 'Handcrafted with Love',
    subtitle: 'Each piece tells a story',
    cta: 'Explore Collection',
    link: '/products'
  },
  {
    src: '/images/homeslide3.jpg',
    title: 'Pure Silver Quality',
    subtitle: '925 Sterling Silver',
    cta: 'View Products',
    link: '/products'
  }
];

const featuredProducts = [
  {
    id: 1,
    name: 'Silver Anklet',
    priceINR: 2499,
    priceUSD: 29.99,
    image: '/images/slide1.jpg',
    description: 'Beautiful silver anklet for little girls',
    wastagePercentage: 8,
  },
  {
    id: 2,
    name: 'Silver Bracelet',
    priceINR: 1999,
    priceUSD: 24.99,
    image: '/images/slide2.jpg',
    description: 'Elegant silver bracelet for children',
    wastagePercentage: 10,
  },
  {
    id: 3,
    name: 'Silver Necklace',
    priceINR: 3499,
    priceUSD: 42.99,
    image: '/images/slide3.jpg',
    description: 'Delicate silver necklace for kids',
    wastagePercentage: 12,
  },
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { formatPrice } = useCurrency();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main>
      {/* Hero Section with Carousel */}
      <section className="hero-section position-relative">
        {heroImages.map((slide, index) => (
          <motion.div
            key={index}
            className="hero-slide position-absolute w-100 h-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: currentSlide === index ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={slide.src}
              alt={slide.title}
              fill
              className="object-fit-cover"
              priority={index === 0}
            />
            <div className="container h-100 d-flex align-items-center justify-content-center">
              <div className="hero-content">
                <h1 className="display-3 fw-bold mb-3 text-white">{slide.title}</h1>
                <p className="lead mb-4 text-white-50">{slide.subtitle}</p>
                <Link href={slide.link} className="btn btn-primary btn-lg">
                  {slide.cta}
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Featured Products Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-5">Featured Products</h2>
          <div className="row g-4">
            {featuredProducts.map((product) => (
              <motion.div
                key={product.id}
                className="col-md-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="card h-100">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h3 className="card-title">{product.name}</h3>
                    <p className="card-text">{product.description}</p>
                    <div className="mb-3">
                      <span className="badge me-2">
                        Wastage: {product.wastagePercentage}%
                      </span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="h5 mb-0">
                        {formatPrice(product.priceINR, product.priceUSD)}
                      </span>
                      <Link
                        href={`/products/${product.id}`}
                        className="btn btn-primary"
                      >
                        <FaShoppingCart className="me-2" />
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional content for testing sticky header */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5">About Our Silver Collection</h2>
          <div className="row">
            <div className="col-md-6">
              <h3>Premium Quality</h3>
              <p>Our silver jewelry is crafted from 925 sterling silver, ensuring durability and beauty that lasts a lifetime.</p>
            </div>
            <div className="col-md-6">
              <h3>Handcrafted with Love</h3>
              <p>Each piece is carefully handcrafted by skilled artisans who take pride in creating beautiful jewelry for little ones.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-5">Why Choose Varam Silvers?</h2>
          <div className="row g-4">
            <div className="col-md-4 text-center">
              <h4>Hypoallergenic</h4>
              <p>Safe for sensitive skin, perfect for children.</p>
            </div>
            <div className="col-md-4 text-center">
              <h4>Adjustable Sizes</h4>
              <p>Designed to grow with your child.</p>
            </div>
            <div className="col-md-4 text-center">
              <h4>Beautiful Designs</h4>
              <p>Elegant and timeless pieces for every occasion.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 