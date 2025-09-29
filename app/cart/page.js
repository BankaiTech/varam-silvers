'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaTrash } from 'react-icons/fa';
import { useCurrency } from '../../context/CurrencyContext';

export default function CartPage() {
  const { cart, removeFromCart, updateCartItemQuantity, getCartTotal } = useCurrency();
  
  // Calculate tax and totals - GST is inclusive in the price
  const subtotal = getCartTotal(); // Total of all items (price × quantity) - this already includes GST
  const taxRate = 0.18; // 18% GST
  
  // Calculate GST amount from the inclusive price
  // Formula: GST = (Price × Tax Rate) / (1 + Tax Rate)
  const gstAmount = cart.reduce((total, item) => {
    const itemTotal = item.priceINR * item.quantity;
    const itemGST = (itemTotal * taxRate) / (1 + taxRate);
    return total + itemGST;
  }, 0);
  
  // Subtotal before tax (excluding GST)
  const subtotalBeforeTax = subtotal - gstAmount;
  
  // Total is the same as subtotal since GST is inclusive
  const total = subtotal;

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-container">
          <div className="empty-cart">
            <h2 className="empty-cart-title">Your cart is empty</h2>
            <p className="empty-cart-subtitle">Add some items to your cart to continue shopping</p>
            <Link href="/products" className="browse-products-btn">
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1 className="cart-title">Shopping Cart</h1>
        <div className="cart-content">
          <div className="cart-items">
            {cart.map((item) => (
              <motion.div
                key={item.id}
                className="cart-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="cart-item-content">
                  <div className="cart-item-image">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={200}
                      height={200}
                      className="item-image"
                    />
                  </div>
                  <div className="cart-item-details">
                    <h5 className="item-title">{item.name}</h5>
                    <p className="item-price">₹{item.priceINR.toLocaleString('en-IN')}</p>
                    <div className="cart-item-controls">
                      <div className="quantity-controls">
                        <button
                          className="quantity-btn"
                          onClick={() => updateCartItemQuantity(item.id, Math.max(1, item.quantity - 1))}
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          className="quantity-input"
                          value={item.quantity}
                          min={1}
                          onChange={(e) => updateCartItemQuantity(item.id, Math.max(1, parseInt(e.target.value) || 1))}
                        />
                        <button
                          className="quantity-btn"
                          onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="remove-btn"
                        onClick={() => removeFromCart(item.id)}
                        aria-label="Remove from cart"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="cart-summary">
            <div className="summary-card">
              <div className="summary-content">
                <h5 className="summary-title">Order Summary</h5>
                <div className="summary-details">
                  <div className="summary-row">
                    <span>Subtotal (Excluding GST)</span>
                    <span>₹{subtotalBeforeTax.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="summary-row">
                    <span>GST (3%)</span>
                    <span>₹{gstAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="summary-row total-row">
                    <span>Total Amount</span>
                    <span>₹{total.toLocaleString('en-IN')}</span>
                  </div>
                </div>
                <div className="checkout-btn-wrapper">
                  <Link 
                    href="/checkout" 
                    className="checkout-btn"
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