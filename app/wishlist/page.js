'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaHeart, FaTrash } from 'react-icons/fa';
import { useCurrency } from '../../context/CurrencyContext';

export default function WishlistPage() {
  const { formatPrice, wishlist, removeFromWishlist } = useCurrency();

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
              className="wishlist-whatsapp-btn"
              onClick={() => {
                const message = `Hi! I'm interested in the following products from my wishlist:\n\n${wishlist.map(item => {
                  const material = item.material || item.selectedMaterial || 'Silver';
                  const price = item.priceINR || (item.prices && item.prices.silver && item.prices.silver.priceINR) || 0;
                  return `• ${item.name || 'Product'} - ${material} - ${formatPrice(price)}`;
                }).join('\n')}\n\nCould you please provide more details about these products?`;
                const whatsappUrl = `https://wa.me/919444885666?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              <span>WhatsApp Query</span>
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
