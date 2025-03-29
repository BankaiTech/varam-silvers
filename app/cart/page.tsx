'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useCurrency } from '@/context/CurrencyContext';

interface CartItem {
  id: number;
  name: string;
  priceINR: number;
  priceUSD: number;
  image: string;
  quantity: number;
}

export default function CartPage() {
  const { formatPrice } = useCurrency();
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: 'Silver Anklet',
      priceINR: 2499,
      priceUSD: 29.99,
      image: '/images/slide1.jpg',
      quantity: 1,
    },
    // Add more sample items as needed
  ]);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleQuantityChange = (id: number, value: string) => {
    const newQuantity = parseInt(value);
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      updateQuantity(id, newQuantity);
    }
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      return {
        INR: total.INR + (item.priceINR * item.quantity),
        USD: total.USD + (item.priceUSD * item.quantity)
      };
    }, { INR: 0, USD: 0 });
  };

  const subtotal = calculateSubtotal();

  return (
    <main className="container py-5 mt-5">
      <h1 className="mb-4">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-5">
          <h2 className="h4 mb-4">Your cart is empty</h2>
          <Link href="/products" className="btn btn-primary">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="table-responsive mb-4">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <td>
                      <div className="d-flex align-items-center">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="rounded me-3"
                        />
                        <div>
                          <h3 className="h6 mb-0">{item.name}</h3>
                        </div>
                      </div>
                    </td>
                    <td>{formatPrice(item.priceINR, item.priceUSD)}</td>
                    <td>
                      <div className="d-flex align-items-center quantity-controls" style={{ maxWidth: '120px' }}>
                        <button
                          className="btn btn-outline-secondary px-2 py-1"
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <FaMinus size={12} />
                        </button>
                        <input
                          type="text"
                          className="form-control text-center px-2 mx-1"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                          style={{ width: '40px', padding: '0.25rem' }}
                        />
                        <button
                          className="btn btn-outline-secondary px-2 py-1"
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <FaPlus size={12} />
                        </button>
                      </div>
                    </td>
                    <td>
                      {formatPrice(
                        item.priceINR * item.quantity,
                        item.priceUSD * item.quantity
                      )}
                    </td>
                    <td>
                      <button
                        className="btn btn-link text-danger"
                        onClick={() => removeItem(item.id)}
                        title="Remove item"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="row justify-content-end">
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title h5 mb-3">Order Summary</h3>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Subtotal:</span>
                    <span>{formatPrice(subtotal.INR, subtotal.USD)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Shipping:</span>
                    <span>Free</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between mb-3">
                    <strong>Total:</strong>
                    <strong>{formatPrice(subtotal.INR, subtotal.USD)}</strong>
                  </div>
                  <button className="btn btn-primary w-100">
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
} 