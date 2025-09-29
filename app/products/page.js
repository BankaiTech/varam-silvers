'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';
import { useCurrency } from '../../context/CurrencyContext';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../components/LoadingSpinner';

const products = [
  {
    id: 1,
    name: 'Butterfly Feet Chain',
    prices: {
      silver: { priceINR: 2499, priceUSD: 29.99 },
      gold: { priceINR: 8999, priceUSD: 107.99 },
      roseGold: { priceINR: 6999, priceUSD: 83.99 }
    },
    image: '/images/Butterfly Feet Chain Silver.jpg',
    description: 'Beautiful butterfly-themed anklet chain with delicate butterfly charms, perfect for your little princess',
    wastagePercentage: 8,
    category: 'Anklets',
    materials: {
      silver: '925 Sterling Silver',
      gold: '18K Gold',
      roseGold: '18K Rose Gold'
    },
    ageRange: '2-12 years',
    inStock: true,
    isNew: true,
    rating: 4.8
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
    category: 'Bracelets',
    materials: {
      silver: '925 Sterling Silver',
      gold: '18K Gold',
      roseGold: '18K Rose Gold'
    },
    ageRange: '3-14 years',
    inStock: true,
    isNew: false,
    rating: 4.9
  },
  {
    id: 3,
    name: 'Dreamy Necklace',
    prices: {
      silver: { priceINR: 3499, priceUSD: 42.99 },
      gold: { priceINR: 12999, priceUSD: 155.99 },
      roseGold: { priceINR: 9999, priceUSD: 119.99 }
    },
    image: '/images/Tiger Chain Silver.jpg',
    description: 'Exquisite necklace featuring a delicate pendant, creating magical moments',
    wastagePercentage: 12,
    category: 'Necklaces',
    materials: {
      silver: '925 Sterling Silver',
      gold: '18K Gold',
      roseGold: '18K Rose Gold'
    },
    ageRange: '4-16 years',
    inStock: true,
    isNew: true,
    rating: 4.7
  },
  {
    id: 4,
    name: 'Tiger Chain',
    prices: {
      silver: { priceINR: 1799, priceUSD: 21.99 },
      gold: { priceINR: 6999, priceUSD: 83.99 },
      roseGold: { priceINR: 5499, priceUSD: 65.99 }
    },
    image: '/images/Tiger Chain Silver.jpg',
    description: 'Bold tiger-themed chain with fierce tiger charm, perfect for brave little ones',
    wastagePercentage: 6,
    category: 'Rings',
    materials: {
      silver: '925 Sterling Silver',
      gold: '18K Gold',
      roseGold: '18K Rose Gold'
    },
    ageRange: '3-12 years',
    inStock: false,
    isNew: false,
    rating: 4.6
  },
  {
    id: 5,
    name: 'Unicorn Chain',
    prices: {
      silver: { priceINR: 1299, priceUSD: 15.99 },
      gold: { priceINR: 4999, priceUSD: 59.99 },
      roseGold: { priceINR: 3999, priceUSD: 47.99 }
    },
    image: '/images/Unicorn Chain Rose Gold.jpg',
    description: 'Magical unicorn-themed chain with enchanting unicorn charm, bringing dreams to life',
    wastagePercentage: 5,
    category: 'Earrings',
    materials: {
      silver: '925 Sterling Silver',
      gold: '18K Gold',
      roseGold: '18K Rose Gold'
    },
    ageRange: '2-10 years',
    inStock: true,
    isNew: true,
    rating: 4.9
  },
  {
    id: 6,
    name: 'White Flower Chain',
    prices: {
      silver: { priceINR: 4999, priceUSD: 59.99 },
      gold: { priceINR: 19999, priceUSD: 239.99 },
      roseGold: { priceINR: 14999, priceUSD: 179.99 }
    },
    image: '/images/White Flower Chain Silver.jpg',
    description: 'Elegant white flower-themed chain with delicate floral charms, symbolizing purity and grace',
    wastagePercentage: 15,
    category: 'Sets',
    materials: {
      silver: '925 Sterling Silver',
      gold: '18K Gold',
      roseGold: '18K Rose Gold'
    },
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
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading for products
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

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


  if (isLoading) {
    return (
      <main>
        <div className="products-hero">
          <div className="products-hero-container">
            <div className="loading-spinner-container" style={{ minHeight: '60vh' }}>
              <LoadingSpinner size="large" message="Loading products..." />
            </div>
          </div>
        </div>
      </main>
    );
  }

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
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="product-card-link"
              >
                <motion.div
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
                      onClick={(e) => {
                        e.preventDefault();
                        handleToggleWishlist(product);
                      }}
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
                    
                    <div className="product-price-section">
                      <div className="product-price">
                        <span className="original-price">₹{Math.round(product.prices.silver.priceINR * 1.2).toLocaleString('en-IN')}</span>
                        <span className="current-price">₹{product.prices.silver.priceINR.toLocaleString('en-IN')}</span>
                        <span className="gst-info">Including GST</span>
                        <div className="material-variants">
                          <span className="material-info silver">Silver</span>
                          <span className="material-info gold">Gold</span>
                          <span className="material-info rose-gold">Rose Gold</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
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