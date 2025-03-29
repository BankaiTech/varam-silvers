'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { FaCreditCard, FaTruck, FaUser } from 'react-icons/fa';

const cartItems = [
  {
    id: 1,
    name: 'Silver Anklet',
    price: 29.99,
    quantity: 2,
  },
  {
    id: 2,
    name: 'Silver Bracelet',
    price: 34.99,
    quantity: 1,
  },
];

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 5.99;
  const total = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Handle payment submission
      console.log('Form submitted:', formData);
    }
  };

  return (
    <main>
      <Navbar />
      
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-8">
            {/* Progress Steps */}
            <div className="progress-steps mb-5">
              <div className="d-flex justify-content-between">
                <div
                  className={`step ${step >= 1 ? 'active' : ''}`}
                  onClick={() => setStep(1)}
                >
                  <FaUser className="mb-2" />
                  <span>Shipping</span>
                </div>
                <div
                  className={`step ${step >= 2 ? 'active' : ''}`}
                  onClick={() => setStep(2)}
                >
                  <FaTruck className="mb-2" />
                  <span>Delivery</span>
                </div>
                <div
                  className={`step ${step >= 3 ? 'active' : ''}`}
                  onClick={() => setStep(3)}
                >
                  <FaCreditCard className="mb-2" />
                  <span>Payment</span>
                </div>
              </div>
            </div>

            {/* Forms */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <form onSubmit={handleSubmit}>
                {step === 1 && (
                  <div className="card mb-4">
                    <div className="card-body">
                      <h5 className="card-title mb-4">Shipping Information</h5>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label">First Name</label>
                          <input
                            type="text"
                            className="form-control"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Last Name</label>
                          <input
                            type="text"
                            className="form-control"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Address</label>
                        <input
                          type="text"
                          className="form-control"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label">City</label>
                          <input
                            type="text"
                            className="form-control"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="col-md-3 mb-3">
                          <label className="form-label">State</label>
                          <input
                            type="text"
                            className="form-control"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="col-md-3 mb-3">
                          <label className="form-label">ZIP Code</label>
                          <input
                            type="text"
                            className="form-control"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="card mb-4">
                    <div className="card-body">
                      <h5 className="card-title mb-4">Delivery Options</h5>
                      <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="delivery"
                          id="standard"
                          defaultChecked
                        />
                        <label className="form-check-label" htmlFor="standard">
                          Standard Delivery (5-7 business days) - $5.99
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="delivery"
                          id="express"
                        />
                        <label className="form-check-label" htmlFor="express">
                          Express Delivery (2-3 business days) - $12.99
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="card mb-4">
                    <div className="card-body">
                      <h5 className="card-title mb-4">Payment Information</h5>
                      <div className="mb-3">
                        <label className="form-label">Card Number</label>
                        <input
                          type="text"
                          className="form-control"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Expiry Date</label>
                          <input
                            type="text"
                            className="form-control"
                            name="expiryDate"
                            placeholder="MM/YY"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">CVV</label>
                          <input
                            type="text"
                            className="form-control"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="d-flex justify-content-between">
                  {step > 1 && (
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      onClick={() => setStep(step - 1)}
                    >
                      Back
                    </button>
                  )}
                  <button
                    type="submit"
                    className="btn btn-primary ms-auto"
                  >
                    {step === 3 ? 'Place Order' : 'Continue'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>

          <div className="col-lg-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card"
            >
              <div className="card-body">
                <h5 className="card-title mb-4">Order Summary</h5>
                {cartItems.map((item) => (
                  <div key={item.id} className="d-flex justify-content-between mb-2">
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <hr />
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-4">
                  <strong>Total</strong>
                  <strong>${total.toFixed(2)}</strong>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
} 