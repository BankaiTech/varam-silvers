'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import { useCurrency } from '../../../context/CurrencyContext';
import toast from 'react-hot-toast';

export default function ProductDetail({ product }) {
  const { formatPrice, addToCart, addToWishlist, removeFromWishlist, isInWishlist, cart } = useCurrency();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      priceINR: product.priceINR,
      priceUSD: product.priceUSD,
      image: product.image,
      quantity: quantity
    });
    toast.success('Item added to cart!', {
      duration: 2000,
      position: 'top-center',
    });
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.success('Removed from wishlist', {
        duration: 2000,
        position: 'top-center',
      });
    } else {
      addToWishlist(product);
      toast.success('Added to wishlist', {
        duration: 2000,
        position: 'top-center',
      });
    }
  };

  const isInCart = (id) => {
    return cart.some(item => item.id === id);
  };

  return (
    <div className="container py-5">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link href="/products">Products</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {product.name}
          </li>
        </ol>
      </nav>
      <div className="row">
        {/* Product Image */}
        <div className="col-md-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card product-gallery mb-4"
          >
            <div className="main-image mb-3">
              <Image
                src={product.image}
                alt={product.name}
                width={500}
                height={500}
                className="card-img-top"
              />
            </div>
          </motion.div>
        </div>
        {/* Product Info */}
        <div className="col-md-6">
          <h1 className="card-title mb-3">{product.name}</h1>
          <h2 className="h3 mb-3 text-primary">{formatPrice(product.priceINR, product.priceUSD)}</h2>
          <div className="mb-3">
            <span className="badge me-2">Wastage: {product.specifications.wastage}</span>
            <span className="badge">Purity: {product.specifications.purity}</span>
          </div>
          <p className="card-text mb-4">{product.description}</p>
          <h3 className="h5 mb-2">Features</h3>
          <ul className="mb-4 ps-3">
            {product.features.map((feature, idx) => (
              <li key={idx} className="mb-1">{feature}</li>
            ))}
          </ul>
          <h3 className="h5 mb-2">Specifications</h3>
          <table className="table table-bordered w-auto mb-4">
            <tbody>
              <tr>
                <th>Material</th>
                <td>{product.specifications.material}</td>
              </tr>
              <tr>
                <th>Length</th>
                <td>{product.specifications.length}</td>
              </tr>
              <tr>
                <th>Weight</th>
                <td>{product.specifications.weight}</td>
              </tr>
              <tr>
                <th>Purity</th>
                <td>{product.specifications.purity}</td>
              </tr>
              <tr>
                <th>Wastage</th>
                <td>{product.specifications.wastage}</td>
              </tr>
            </tbody>
          </table>
          <div className="d-flex align-items-center gap-3 mb-4">
            <div className="quantity-controls d-flex align-items-center mb-1 gap-1" style={{ width: '120px' }}>
              <button className="btn btn-outline-primary px-3 py-1" onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity">-</button>
              <input type="number" className="form-control text-center" value={quantity} min={1} onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} style={{ width: '40px', minWidth: '40px' }} />
              <button className="btn btn-outline-primary px-3 py-1" onClick={() => setQuantity(quantity + 1)} aria-label="Increase quantity">+</button>
            </div>
            {typeof window !== 'undefined' && isInCart(product.id) ? (
              <Link href="/cart" className="btn btn-primary">
                <FaShoppingCart className="me-2" /> Go to Cart
              </Link>
            ) : (
              <button className="btn btn-primary" onClick={handleAddToCart}>
                <FaShoppingCart className="me-2" /> Add to Cart
              </button>
            )}
            <button className={`btn ${isInWishlist(product.id) ? 'btn-danger' : 'btn-outline-primary'}`} onClick={handleWishlistToggle}>
              <FaHeart />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 