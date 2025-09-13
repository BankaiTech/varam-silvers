'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import { useCurrency } from '../../context/CurrencyContext';
import toast from 'react-hot-toast';

const products = [
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
    ageRange: '2-12 years',
    inStock: true,
    isNew: true,
    rating: 4.8
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
    ageRange: '3-14 years',
    inStock: true,
    isNew: false,
    rating: 4.9
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
    ageRange: '4-16 years',
    inStock: true,
    isNew: true,
    rating: 4.7
  },
  {
    id: 4,
    name: 'Royal Silver Ring',
    priceINR: 1799,
    priceUSD: 21.99,
    image: '/images/slide1.jpg',
    description: 'Beautiful silver ring with adjustable sizing, perfect for little fingers',
    wastagePercentage: 6,
    category: 'Rings',
    material: '925 Sterling Silver',
    ageRange: '3-12 years',
    inStock: false,
    isNew: false,
    rating: 4.6
  },
  {
    id: 5,
    name: 'Fairy Silver Earrings',
    priceINR: 1299,
    priceUSD: 15.99,
    image: '/images/slide2.jpg',
    description: 'Hypoallergenic silver earrings designed for sensitive skin',
    wastagePercentage: 5,
    category: 'Earrings',
    material: '925 Sterling Silver',
    ageRange: '2-10 years',
    inStock: true,
    isNew: true,
    rating: 4.9
  },
  {
    id: 6,
    name: 'Angel Silver Set',
    priceINR: 4999,
    priceUSD: 59.99,
    image: '/images/slide3.jpg',
    description: 'Complete jewelry set including necklace, bracelet, and earrings',
    wastagePercentage: 15,
    category: 'Sets',
    material: '925 Sterling Silver',
    ageRange: '4-14 years',
    inStock: true,
    isNew: false,
    rating: 5.0
  },
];

export default function ProductsPage() {
  const { showUSD, addToWishlist, removeFromWishlist, isInWishlist } = useCurrency();
  const [sortBy, setSortBy] = useState('default');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'Anklets', 'Bracelets', 'Necklaces', 'Rings', 'Earrings', 'Sets'];

  const filteredProducts = products.filter(product => 
    selectedCategory === 'all' || product.category === selectedCategory
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') {
      return showUSD ? a.priceUSD - b.priceUSD : a.priceINR - b.priceINR;
    }
    if (sortBy === 'price-desc') {
      return showUSD ? b.priceUSD - a.priceUSD : b.priceINR - a.priceINR;
    }
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    if (sortBy === 'new') {
      return b.isNew - a.isNew;
    }
    return 0;
  });

  const handleToggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.success('Removed from wishlist!', {
        duration: 2000,
        icon: '💔',
        style: {
          background: '#008080',
          color: '#fff',
          borderRadius: '8px',
          padding: '12px 16px',
          fontSize: '14px',
          fontWeight: '500'
        }
      });
    } else {
      addToWishlist(product);
      toast.success('Added to wishlist!', {
        duration: 2000,
        icon: '❤️',
        style: {
          background: '#008080',
          color: '#fff',
          borderRadius: '8px',
          padding: '12px 16px',
          fontSize: '14px',
          fontWeight: '500'
        }
      });
    }
  };


  return (
    <main>
      {/* Hero Section */}
      <section className="products-hero">
        <div className="products-hero-container">
          <div className="products-hero-content">
            <h1 className="products-hero-title">Our Exquisite Collection</h1>
            <p className="products-hero-subtitle">Discover handcrafted silver jewelry that celebrates the magic of childhood</p>
          </div>
        </div>
      </section>

      <div className="products-page">
        <div className="products-container">
          {/* Filters and Sort */}
          <div className="products-filters">
            <div className="filters-section">
              <div className="category-filters">
                <span className="filter-label">Filter by Category:</span>
                <div className="category-buttons">
                  {categories.map(category => (
                    <button
                      key={category}
                      className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category === 'all' ? 'All Products' : category}
                    </button>
                  ))}
                </div>
              </div>
              <div className="sort-section">
                <select
                  className="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="default">Sort by</option>
                  <option value="new">Newest First</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          <div className="products-grid">
            {sortedProducts.map((product) => (
              <motion.div
                key={product.id}
                className="product-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="product-image-container">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="product-image"
                  />
                  {product.isNew && (
                    <span className="product-badge new-badge">
                      New
                    </span>
                  )}
                  {!product.inStock && (
                    <span className="product-badge out-of-stock-badge">
                      Out of Stock
                    </span>
                  )}
                  <button
                    className={`wishlist-btn ${isInWishlist(product.id) ? 'active' : ''}`}
                    onClick={() => handleToggleWishlist(product)}
                    aria-label={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                  >
                    <FaHeart />
                  </button>
                </div>
                <div className="product-content">
                  <div className="product-category">
                    <span className="category-badge">{product.category}</span>
                  </div>
                  <h3 className="product-title">{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  
                  {/* Rating */}
                  <div className="product-rating">
                    <div className="rating-stars">
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className={`fas fa-star ${i < Math.floor(product.rating) ? 'star-filled' : 'star-empty'}`}
                        />
                      ))}
                    </div>
                    <span className="rating-text">({product.rating})</span>
                  </div>
                  
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
                    <div className="product-actions">
                      <Link
                        href={`/products/${product.id}`}
                        className="view-details-btn"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {sortedProducts.length === 0 && (
            <div className="no-products">
              <h3 className="no-products-title">No products found</h3>
              <p className="no-products-subtitle">Try adjusting your filters to see more products.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 