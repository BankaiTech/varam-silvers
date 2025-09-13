'use client';

import { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaHeart, FaShoppingCart, FaStar, FaTruck, FaShieldAlt, FaAward } from 'react-icons/fa';
import { useCurrency } from '../../../context/CurrencyContext';
import toast from 'react-hot-toast';
import LoadingButton from '../../../components/LoadingButton';

export default function ProductDetailPage({ params }) {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useCurrency();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  // Unwrap params Promise
  const resolvedParams = use(params);

  // Mock product data - in real app, fetch based on resolvedParams.id
  const product = {
    id: resolvedParams.id,
    name: 'Princess Silver Anklet',
    priceINR: 2499,
    priceUSD: 29.99,
    images: ['/images/slide1.jpg', '/images/slide2.jpg', '/images/slide3.jpg'],
    description: 'Delicate sterling silver anklet adorned with tiny charms, perfect for your little princess. This beautiful piece is crafted with love and attention to detail.',
    longDescription: 'Our Princess Silver Anklet is a timeless piece that combines elegance with durability. Made from 925 sterling silver, it features delicate charms that sparkle with every step. The adjustable design ensures a perfect fit as your child grows.',
    category: 'Anklets',
    material: '925 Sterling Silver',
    ageRange: '2-12 years',
    wastagePercentage: 8,
    inStock: true,
    isNew: true,
    rating: 4.8,
    reviews: 127,
    features: [
      'Hypoallergenic sterling silver',
      'Adjustable sizing',
      'Delicate charm details',
      'Tarnish resistant coating',
      'Comes with gift box'
    ],
    specifications: {
      'Material': '925 Sterling Silver',
      'Weight': '8.5 grams',
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
      quantity: quantity,
      image: product.images[0]
    };

    addToCart(cartItem);
    setIsAddedToCart(true);
    toast.success(`${product.name} added to cart!`, {
      duration: 3000,
      icon: '🛒',
      style: {
        background: '#008080',
        color: '#fff',
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
          </div>

          {/* Product Info */}
          <div className="product-info">
            <div className="product-header">
              <div className="product-category">
                <span className="category-badge">{product.category}</span>
                {product.isNew && <span className="new-badge">New</span>}
              </div>
              <h1 className="product-title">{product.name}</h1>
              
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
            </div>

            <div className="product-price">
              <div className="price-section">
                <div className="product-price-line">
                  <span className="original-price">₹{Math.round(product.priceINR * 1.2).toLocaleString('en-IN')}</span>
                  <span className="current-price">₹{product.priceINR.toLocaleString('en-IN')}</span>
                  <span className="wastage-info">
                    Including {product.wastagePercentage}% wastage
                  </span>
                </div>
                <span className="gst-info">Including GST</span>
              </div>
            </div>

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

            <div className="trust-indicators">
              <div className="trust-item">
                <FaTruck />
                <span>Free Shipping</span>
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