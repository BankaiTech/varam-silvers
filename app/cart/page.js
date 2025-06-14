'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaTrash } from 'react-icons/fa';
import { useCurrency } from '../../context/CurrencyContext';

export default function CartPage() {
  const { cart, removeFromCart, updateCartItemQuantity, formatPrice, getCartTotal } = useCurrency();

  if (cart.length === 0) {
    return (
      <div className="container py-5">
        <div className="text-center py-5">
          <h2>Your cart is empty</h2>
          <p className="text-muted">Add some items to your cart to continue shopping</p>
          <Link href="/products" className="btn btn-primary mt-3">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4">Shopping Cart</h1>
      <div className="row">
        <div className="col-md-8">
          {cart.map((item) => (
            <motion.div
              key={item.id}
              className="card mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="row g-0">
                <div className="col-md-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={200}
                    height={200}
                    className="img-fluid rounded-start"
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">{formatPrice(item.priceINR, item.priceUSD)}</p>
                    <div className="d-flex align-items-center gap-3 mb-3">
                      <div className="quantity-controls d-flex align-items-center gap-1">
                        <button
                          className="btn btn-outline-primary"
                          onClick={() => updateCartItemQuantity(item.id, Math.max(1, item.quantity - 1))}
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          className="form-control text-center"
                          value={item.quantity}
                          min={1}
                          onChange={(e) => updateCartItemQuantity(item.id, Math.max(1, parseInt(e.target.value) || 1))}
                        />
                        <button
                          className="btn btn-outline-primary"
                          onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="btn btn-outline-danger d-flex align-items-center justify-content-center"
                        style={{ height: '42px', width: '42px', padding: 0 }}
                        onClick={() => removeFromCart(item.id)}
                        aria-label="Remove from cart"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Order Summary</h5>
              <div className="d-flex justify-content-between mb-3">
                <span>Subtotal</span>
                <span>{formatPrice(getCartTotal(), getCartTotal() / 83)}</span>
              </div>
              <Link href="/checkout" className="btn btn-primary w-100">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 