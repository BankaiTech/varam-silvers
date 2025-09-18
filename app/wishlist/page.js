'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaHeart, FaShoppingCart, FaTrash } from 'react-icons/fa';
import { useCurrency } from '../../context/CurrencyContext';

export default function WishlistPage() {
  const { formatPrice, wishlist, removeFromWishlist, addToCart } = useCurrency();

  const handleAddToCart = (product) => {
    const cartItem = {
      ...product,
      quantity: 1,
      image: product.image
    };
    addToCart(cartItem);
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
        </div>

        <div className="wishlist-grid">
          {wishlist.map((item) => (
            <motion.div
              key={item.id}
              className="wishlist-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="wishlist-item-image">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={300}
                  height={300}
                  className="item-image"
                />
                <button
                  className="remove-wishlist-btn"
                  onClick={() => removeFromWishlist(item.id)}
                  aria-label="Remove from wishlist"
                >
                  <FaTrash />
                </button>
              </div>

              <div className="wishlist-item-content">
                <div className="item-category">
                  <span className="category-badge">{item.category}</span>
                </div>
                <h3 className="item-title">{item.name}</h3>
                <p className="item-description">{item.description}</p>
                
                <div className="item-rating">
                  <div className="rating-stars">
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={`fas fa-star ${i < Math.floor(item.rating) ? 'star-filled' : 'star-empty'}`}
                      />
                    ))}
                  </div>
                  <span className="rating-text">({item.rating})</span>
                </div>

                <div className="item-price">
                  <span className="price">{formatPrice(item.priceINR, item.priceUSD)}</span>
                  {!item.inStock && (
                    <span className="out-of-stock">Out of Stock</span>
                  )}
                </div>

                <div className="wishlist-item-actions">
                  <Link
                    href={`/products/${item.id}`}
                    className="view-details-btn"
                  >
                    View Details
                  </Link>
                  <button
                    className={`add-to-cart-btn ${!item.inStock ? 'disabled' : ''}`}
                    onClick={() => handleAddToCart(item)}
                    disabled={!item.inStock}
                  >
                    <FaShoppingCart />
                    {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
