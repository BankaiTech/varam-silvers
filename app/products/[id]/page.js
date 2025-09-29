'use client';

import React, { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaHeart, FaShoppingCart, FaStar, FaTruck, FaShieldAlt, FaAward } from 'react-icons/fa';
import { useCurrency } from '../../../context/CurrencyContext';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../../components/LoadingSpinner';
import PriceTabs from '../../../components/PriceTabs';

export default function ProductDetailPage({ params }) {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useCurrency();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMaterial, setSelectedMaterial] = useState('silver');

  // Unwrap params Promise
  const resolvedParams = use(params);

  // Simulate loading for product data
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Get product data based on ID
  const getProductById = (id) => {
    const productMap = {
      '1': {
        name: 'Butterfly Feet Chain',
        images: [
          '/images/Butterfly Feet Chain Silver.jpg', 
          '/images/Butterfly Feet Chain Gold.jpg', 
          '/images/Butterfly Feet Chain Rose Gold.jpg'
        ]
      },
      '2': {
        name: 'Eye Chain',
        images: [
          '/images/Eye Chain Silver.jpg', 
          '/images/Eye Chain Gold.jpg', 
          '/images/Eye Chain Rose Gold.jpg'
        ]
      },
      '3': {
        name: 'Panda Chain',
        images: [
          '/images/Panda Chain Silver.jpg', 
          '/images/Panda Chain Gold.jpg', 
          '/images/Panda Chain Rose Gold.jpg'
        ]
      },
      '4': {
        name: 'Yellow Car Chain',
        images: [
          '/images/Yellow Car Silver.jpg', 
          '/images/Yellow Car Gold.jpg', 
          '/images/Yellow Car Rose Gold.jpg'
        ]
      },
      '5': {
        name: 'Unicorn Chain',
        images: [
          '/images/Unicorn Chain Silver.jpg', 
          '/images/Unicorn Chain Gold.jpg', 
          '/images/Unicorn Chain Rose Gold.jpg'
        ]
      },
      '6': {
        name: 'White Flower Chain',
        images: [
          '/images/White Flower Chain Silver.jpg', 
          '/images/White Flower Chain Gold.jpg', 
          '/images/White Flower Chain Rose Gold.jpg'
        ]
      },
      '7': {
        name: 'Tiger Chain',
        images: [
          '/images/Tiger Chain Silver.jpg', 
          '/images/Tiger Chain Gold.jpg', 
          '/images/Tiger Chain Rose Gold.jpg'
        ]
      }
    };
    
    return productMap[id] || productMap['1']; // Default to first product
  };

  const productData = getProductById(resolvedParams.id);

  // Mock product data - in real app, fetch based on resolvedParams.id
  const product = {
    id: resolvedParams.id,
    name: productData.name,
    prices: {
      silver: { priceINR: 2499, priceUSD: 29.99 },
      gold: { priceINR: 8999, priceUSD: 107.99 },
      roseGold: { priceINR: 6999, priceUSD: 83.99 }
    },
    images: productData.images,
    description: `Beautiful ${productData.name.toLowerCase()} with intricate detailing, perfect for your little one. This beautiful piece is crafted with love and attention to detail.`,
    longDescription: `Our ${productData.name} is a timeless piece that combines elegance with durability. Available in multiple materials including 925 sterling silver, 18K gold, and 18K rose gold. The adjustable design ensures a perfect fit as your child grows.`,
    category: 'Anklets',
    materials: {
      silver: '925 Sterling Silver',
      gold: '18K Gold',
      roseGold: '18K Rose Gold'
    },
    ageRange: '2-12 years',
    wastagePercentage: 8,
    inStock: true,
    isNew: true,
    rating: 4.8,
    reviews: 127,
    features: [
      'Hypoallergenic materials',
      'Adjustable sizing',
      'Delicate charm details',
      'Tarnish resistant coating',
      'Comes with gift box'
    ],
    specifications: {
      'Materials Available': 'Silver, Gold, Rose Gold',
      'Weight': '8.5 grams (Silver)',
      'Length': 'Adjustable 6-8 inches',
      'Finish': 'Polished',
      'Care': 'Clean with soft cloth'
    }
  };

  const handleAddToCart = () => {
    if (!product.inStock) {
      toast.error('This product is currently out of stock');
      return;
    }

    const cartItem = {
      ...product,
      selectedMaterial: selectedMaterial,
      priceINR: product.prices[selectedMaterial].priceINR,
      priceUSD: product.prices[selectedMaterial].priceUSD,
      material: product.materials[selectedMaterial],
      quantity: quantity,
      image: product.images[0]
    };

    addToCart(cartItem);
    setIsAddedToCart(true);
    toast.success(`${product.name} (${product.materials[selectedMaterial]}) added to cart!`, {
      duration: 3000,
      icon: '🛒',
      style: {
        background: 'var(--primary-teal)',
        color: 'var(--soft-white)',
        borderRadius: '8px',
        padding: '12px 16px',
        fontSize: '14px',
        fontWeight: '500'
      }
    });
  };

  const handleGoToCart = () => {
    window.location.href = '/cart';
  };

  const toggleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.success('Removed from wishlist!', {
        duration: 2000,
        icon: '💔',
        style: {
          background: 'var(--primary-teal)',
          color: 'var(--soft-white)',
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
          background: 'var(--primary-teal)',
          color: 'var(--soft-white)',
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
      <div className="product-detail-page">
        <div className="product-detail-container">
          <div className="loading-spinner-container" style={{ minHeight: '60vh' }}>
            <LoadingSpinner size="large" message="Loading product details..." />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/products">Products</Link>
          <span>/</span>
          <span>{product.name}</span>
        </nav>

        <div className="product-detail-content">
          {/* Product Images */}
          <div className="product-images">
            <div className="main-image">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                width={500}
                height={500}
                className="product-main-image"
              />
            </div>
            <div className="image-thumbnails">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    width={80}
                    height={80}
                    className="thumbnail-image"
                  />
                </button>
              ))}
            </div>
            
            {/* Specifications moved under images */}
            <div className="product-specifications">
              <h3>Specifications:</h3>
              <div className="specs-grid">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="spec-item">
                    <span className="spec-label">{key}:</span>
                    <span className="spec-value">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="product-info">
            <div className="product-header">
              <div className="product-category">
                <span className="category-badge">{product.category}</span>
                {product.isNew && <span className="new-badge">New</span>}
              </div>
              <h1 className="product-title">{product.name}</h1>
            </div>

            <div className="product-rating">
              <div className="rating-stars">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`star ${i < Math.floor(product.rating) ? 'filled' : 'empty'}`}
                  />
                ))}
              </div>
              <span className="rating-text">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            <PriceTabs 
              product={product} 
              onMaterialSelect={setSelectedMaterial}
              selectedMaterial={selectedMaterial}
            />

            <div className="product-description">
              <p>{product.description}</p>
            </div>

            <div className="product-features">
              <h3>Key Features:</h3>
              <ul>
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className="product-actions">
              <div className="quantity-selector">
                <label htmlFor="quantity">Quantity:</label>
                <div className="quantity-controls">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="quantity-input"
                    min="1"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="action-buttons">
                <button
                  className={`wishlist-btn ${isInWishlist(product.id) ? 'active' : ''}`}
                  onClick={toggleWishlist}
                >
                  <FaHeart />
                  <span>{isInWishlist(product.id) ? 'In Wishlist' : 'Add to Wishlist'}</span>
                </button>
                <button
                  className="add-to-cart-btn"
                  onClick={isAddedToCart ? handleGoToCart : handleAddToCart}
                  disabled={!product.inStock}
                >
                  <FaShoppingCart />
                  <span>{isAddedToCart ? 'Go to Cart' : 'Add to Cart'}</span>
                </button>
              </div>
            </div>

            <div className="trust-indicators">
              <div className="trust-item">
                <FaTruck />
                <span>Free Shipping in India</span>
              </div>
              <div className="trust-item">
                <FaShieldAlt />
                <span>Secure Payment</span>
              </div>
              <div className="trust-item">
                <FaAward />
                <span>Quality Guarantee</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="product-tabs">
          <div className="tab-content">
            <h3>Product Description</h3>
            <p>{product.longDescription}</p>
            
            <h4>Care Instructions</h4>
            <ul>
              <li>Store in a dry place when not in use</li>
              <li>Clean gently with a soft cloth</li>
              <li>Avoid contact with perfumes and lotions</li>
              <li>Remove before swimming or bathing</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 