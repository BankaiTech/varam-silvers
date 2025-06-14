'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaShoppingCart } from 'react-icons/fa';
import { useCurrency } from '../../context/CurrencyContext';

const products = [
  {
    id: 1,
    name: 'Silver Anklet',
    priceINR: 2499,
    priceUSD: 29.99,
    image: '/images/slide1.jpg',
    description: 'Beautiful silver anklet for little girls',
    wastagePercentage: 8,
  },
  {
    id: 2,
    name: 'Silver Bracelet',
    priceINR: 1999,
    priceUSD: 24.99,
    image: '/images/slide2.jpg',
    description: 'Elegant silver bracelet for children',
    wastagePercentage: 10,
  },
  {
    id: 3,
    name: 'Silver Necklace',
    priceINR: 3499,
    priceUSD: 42.99,
    image: '/images/slide3.jpg',
    description: 'Delicate silver necklace for kids',
    wastagePercentage: 12,
  },
];

export default function ProductsPage() {
  const { showUSD, formatPrice } = useCurrency();
  const [sortBy, setSortBy] = useState('default');

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'price-asc') {
      return showUSD ? a.priceUSD - b.priceUSD : a.priceINR - b.priceINR;
    }
    if (sortBy === 'price-desc') {
      return showUSD ? b.priceUSD - a.priceUSD : b.priceINR - a.priceINR;
    }
    return 0;
  });

  return (
    <main>
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h2 mb-0">Our Products</h1>
          <select
            className="form-select py-2 px-3"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{ width: '200px', cursor: 'pointer' }}
          >
            <option value="default">Sort by</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>

        <div className="row g-4">
          {sortedProducts.map((product) => (
            <motion.div
              key={product.id}
              className="col-md-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="card h-100">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h3 className="card-title">{product.name}</h3>
                  <p className="card-text">{product.description}</p>
                  <div className="mb-3">
                    <span className="badge me-2">
                      Wastage: {product.wastagePercentage}%
                    </span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="h5 mb-0">
                      {formatPrice(product.priceINR, product.priceUSD)}
                    </span>
                    <Link
                      href={`/products/${product.id}`}
                      className="btn btn-primary"
                    >
                      <FaShoppingCart className="me-2" />
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
} 