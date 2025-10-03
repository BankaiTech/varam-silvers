'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaHeart, FaTrash, FaShoppingCart } from 'react-icons/fa';
import { useCurrency } from '../../context/CurrencyContext';

export default function WishlistPage() {
  const { formatPrice, wishlist, removeFromWishlist, addToCart } = useCurrency();

  // Helper function to get the correct card image
  const getProductImage = (item) => {
    const productName = item.name || '';
    const material = item.material || item.selectedMaterial || 'Silver';
    
    // Map product names to their card images
    const cardImageMap = {
      'Butterfly Feet Chain': {
        'Silver': '/images/Butterfly Feet Chain Silver - Card.png',
        'Gold': '/images/Butterfly Feet Chain Gold - Card.jpg',
        'Rose Gold': '/images/Butterfly Feet Chain Rose Gold - Card.png'
      },
      'Panda Chain': {
        'Silver': '/images/Panda Chain Silver - Card.png',
        'Gold': '/images/Panda Chain Gold - Card.png',
        'Rose Gold': '/images/Panda Chain Rose Gold - Card.png'
      },
      'Unicorn Chain': {
        'Silver': '/images/Unicorn Chain Silver - Card.png',
        'Gold': '/images/Unicorn Chain Gold - Card.png',
        'Rose Gold': '/images/Unicorn Chain Rose Gold - Card.png'
      },
      'Eye Chain': {
        'Silver': '/images/Eye Chain Silver.jpg',
        'Gold': '/images/Eye Chain Gold.jpg',
        'Rose Gold': '/images/Eye Chain Rose Gold.jpg'
      },
      'Tiger Chain': {
        'Silver': '/images/Tiger Chain Silver.jpg',
        'Gold': '/images/Tiger Chain Gold.jpg',
        'Rose Gold': '/images/Tiger Chain Rose Gold.jpg'
      },
      'White Flower Chain': {
        'Silver': '/images/White Flower Chain Silver.jpg',
        'Gold': '/images/White Flower Chain Gold.jpg',
        'Rose Gold': '/images/White Flower Chain Rose Gold.jpg'
      },
      'Yellow Car Chain': {
        'Silver': '/images/Yellow Car Silver.jpg',
        'Gold': '/images/Yellow Car Gold.jpg',
        'Rose Gold': '/images/Yellow Car Rose Gold.jpg'
      }
    };
    
    // Try to get card image first
    if (cardImageMap[productName] && cardImageMap[productName][material]) {
      return cardImageMap[productName][material];
    }
    
    // Fallback to original image or default
    if (item.image) return item.image;
    if (item.imageUrl) return item.imageUrl;
    if (item.images && item.images.length > 0) return item.images[0];
    
    return '/images/Butterfly Feet Chain Silver - Card.png';
  };


  if (wishlist.length === 0) {
    return (
      <div className="wishlist-page">
        <div className="wishlist-container">
          <div className="empty-wishlist">
            <div className="empty-wishlist-icon">
              <FaHeart />
            </div>
            <h2 className="empty-wishlist-title">Your wishlist is empty</h2>
            <p className="empty-wishlist-subtitle">Save your favorite items to your wishlist and they&apos;ll appear here.</p>
            <Link href="/products" className="browse-products-btn">
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="wishlist-container">
        <div className="wishlist-header">
          <h1 className="wishlist-title">My Wishlist</h1>
          <p className="wishlist-subtitle">{wishlist.length} item{wishlist.length !== 1 ? 's' : ''} saved</p>
          {wishlist.length > 0 && (
            <button
              className="wishlist-add-all-cart-btn"
              onClick={() => {
                // Add all wishlist items to cart
                wishlist.forEach(item => {
                  const cartItem = {
                    ...item,
                    selectedMaterial: item.material || item.selectedMaterial || 'silver',
                    priceINR: item.priceINR || (item.prices && item.prices.silver && item.prices.silver.priceINR) || 0,
                    material: item.material || item.selectedMaterial || 'Silver',
                    quantity: 1,
                    image: getProductImage(item)
                  };
                  addToCart(cartItem);
                });
                // Redirect to cart page
                window.location.href = '/cart';
              }}
            >
              <FaShoppingCart />
              <span>Add All to Cart</span>
            </button>
          )}
        </div>

        <div className="wishlist-items-container">
          {wishlist.map((item) => (
            <motion.div
              key={item.id}
              className="wishlist-item-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="wishlist-item-image">
                <Link href={`/products/${item.id}`} className="product-image-link">
                  <Image
                    src={getProductImage(item)}
                    alt={item.name || 'Product'}
                    width={200}
                    height={200}
                    className="wishlist-product-image"
                    onError={(e) => {
                      e.target.src = '/images/Butterfly Feet Chain Silver - Card.png';
                    }}
                  />
                </Link>
                {item.isNew && (
                  <span className="wishlist-badge new-badge">
                    New
                  </span>
                )}
                {!item.inStock && (
                  <span className="wishlist-badge out-of-stock-badge">
                    Out of Stock
                  </span>
                )}
              </div>

              <div className="wishlist-item-details">
                <Link href={`/products/${item.id}`} className="product-name-link">
                  <h3 className="wishlist-product-name">{item.name || 'Product'}</h3>
                </Link>
                
                <div className="wishlist-product-info">
                  <div className="material-info">
                    <span className="material-label">Material:</span>
                    <span className="material-value">
                      {item.material || item.selectedMaterial || 'Silver'}
                    </span>
                  </div>
                  
                  <div className="wishlist-rating">
                    <div className="rating-stars">
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className={`fas fa-star ${i < Math.floor(item.rating || 5) ? 'star-filled' : 'star-empty'}`}
                        />
                      ))}
                    </div>
                    <span className="rating-text">({item.rating || 5})</span>
                  </div>
                </div>

                <div className="wishlist-pricing">
                  <div className="price-row">
                    <span className="original-price">
                      ₹{Math.round((item.priceINR || (item.prices && item.prices.silver && item.prices.silver.priceINR) || 0) * 1.2).toLocaleString('en-IN')}
                    </span>
                    <span className="current-price">
                      ₹{(item.priceINR || (item.prices && item.prices.silver && item.prices.silver.priceINR) || 0).toLocaleString('en-IN')}
                    </span>
                    <span className="discount-badge">
                      {Math.round((1 - ((item.priceINR || (item.prices && item.prices.silver && item.prices.silver.priceINR) || 0) / (Math.round((item.priceINR || (item.prices && item.prices.silver && item.prices.silver.priceINR) || 0) * 1.2)))) * 100)}% off
                    </span>
                  </div>
                  <div className="wastage-info">
                    Incl. {item.wastagePercentage || 8}% wastage
                  </div>
                </div>
              </div>

              <div className="wishlist-item-actions">
                <button
                  className="remove-wishlist-btn"
                  onClick={() => removeFromWishlist(item.id)}
                  aria-label="Remove from wishlist"
                  title="Remove from wishlist"
                >
                  <FaTrash />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
