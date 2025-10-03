'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaTrash, FaShoppingCart } from 'react-icons/fa';
import { useCurrency } from '../../context/CurrencyContext';
import './cart.css';

export default function CartPage() {
  const { cart, removeFromCart, updateCartItemQuantity, getCartTotal } = useCurrency();
  
  // Calculate totals
  const subtotal = getCartTotal();
  const total = subtotal;

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

  if (cart.length === 0) {
    return (
      <div className="vs-cart-page">
        <div className="vs-cart-container">
          <div className="vs-empty-cart">
            <div className="vs-empty-cart-icon">
              <FaShoppingCart />
            </div>
            <h2 className="vs-empty-cart-title">Your cart is empty</h2>
            <p className="vs-empty-cart-subtitle">Add some items to your cart to continue shopping</p>
            <Link href="/products" className="vs-browse-products-btn">
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="vs-cart-page">
      <div className="vs-cart-container">
        <div className="vs-cart-header">
          <h1 className="vs-cart-title">Shopping Cart</h1>
          <p className="vs-cart-subtitle">{cart.length} item{cart.length !== 1 ? 's' : ''} in cart</p>
        </div>

        <div className="vs-cart-content">
          <div className="vs-cart-items-container">
            {cart.map((item) => (
              <motion.div
                key={item.id}
                className="vs-cart-item-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="vs-cart-item-image">
                  <Link href={`/products/${item.id}`} className="vs-product-image-link">
                    <Image
                      src={getProductImage(item)}
                      alt={item.name || 'Product'}
                      width={200}
                      height={200}
                      className="vs-cart-product-image"
                      onError={(e) => {
                        e.target.src = '/images/Butterfly Feet Chain Silver - Card.png';
                      }}
                    />
                  </Link>
                  {item.isNew && (
                    <span className="vs-cart-badge vs-new-badge">
                      New
                    </span>
                  )}
                  {!item.inStock && (
                    <span className="vs-cart-badge vs-out-of-stock-badge">
                      Out of Stock
                    </span>
                  )}
                </div>

                <div className="vs-cart-item-details">
                  <Link href={`/products/${item.id}`} className="vs-product-name-link">
                    <h3 className="vs-cart-product-name">{item.name || 'Product'}</h3>
                  </Link>
                  
                  <div className="vs-cart-product-info">
                    <div className="vs-material-info">
                      <span className="vs-material-label">Material:</span>
                      <span className="vs-material-value">
                        {item.material || item.selectedMaterial || 'Silver'}
                      </span>
                    </div>
                    
                    <div className="vs-cart-rating">
                      <div className="vs-rating-stars">
                        {[...Array(5)].map((_, i) => (
                          <i
                            key={i}
                            className={`fas fa-star ${i < Math.floor(item.rating || 5) ? 'star-filled' : 'star-empty'}`}
                          />
                        ))}
                      </div>
                      <span className="vs-rating-text">({item.rating || 5})</span>
                    </div>
                  </div>

                  <div className="vs-cart-pricing">
                    <div className="vs-price-row">
                      <div className="vs-price-info">
                        <span className="vs-original-price">
                          ₹{Math.round((item.priceINR || 0) * 1.2).toLocaleString('en-IN')}
                        </span>
                        <span className="vs-current-price">
                          ₹{(item.priceINR || 0).toLocaleString('en-IN')}
                        </span>
                        <span className="vs-discount-badge">
                          {Math.round((1 - ((item.priceINR || 0) / (Math.round((item.priceINR || 0) * 1.2)))) * 100)}% off
                        </span>
                      </div>
                      <div className="vs-quantity-controls">
                        <button
                          className="vs-quantity-btn"
                          onClick={() => updateCartItemQuantity(item.id, Math.max(1, item.quantity - 1))}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <input
                          type="number"
                          className="vs-quantity-input"
                          value={item.quantity}
                          min={1}
                          onChange={(e) => updateCartItemQuantity(item.id, Math.max(1, parseInt(e.target.value) || 1))}
                        />
                        <button
                          className="vs-quantity-btn"
                          onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="vs-wastage-info">
                      Incl. {item.wastagePercentage || 8}% wastage
                    </div>
                  </div>
                </div>

                <div className="vs-cart-item-actions">
                  <button
                    className="vs-remove-cart-btn"
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Remove from cart"
                    title="Remove from cart"
                  >
                    <FaTrash />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="vs-cart-summary">
            <div className="vs-summary-card">
              <div className="vs-summary-content">
                <h5 className="vs-summary-title">Order Summary</h5>
                <div className="vs-summary-details">
                  {cart.map((item) => (
                    <div key={item.id} className="vs-summary-row">
                      <span className="vs-product-name">{item.name}</span>
                      <span className="vs-product-price">₹{((item.priceINR || 0) * item.quantity).toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                  <div className="vs-summary-row vs-total-row">
                    <span>Grand Total</span>
                    <span>₹{total.toLocaleString('en-IN')}</span>
                  </div>
                </div>
                <div className="vs-checkout-btn-wrapper">
                  <Link 
                    href="/checkout" 
                    className="vs-checkout-btn"
                    role="button"
                    aria-label="Proceed to checkout with your items"
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 