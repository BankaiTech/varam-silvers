'use client';

import React, { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaHeart, FaShoppingCart, FaStar, FaTruck, FaShieldAlt, FaAward } from 'react-icons/fa';
import { useCurrency } from '../../../context/CurrencyContext';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../../components/LoadingSpinner';
import PriceTabs from '../../../components/PriceTabs';

export default function ProductDetailPage({ params }) {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useCurrency();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMaterial, setSelectedMaterial] = useState('silver');

  // Unwrap params Promise
  const resolvedParams = use(params);

  // Simulate loading for product data
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Get product data based on ID
  const getProductById = (id) => {
    const productMap = {
      '1': {
        name: 'Butterfly Feet Chain',
        images: [
          '/images/Butterfly Feet Chain Silver.jpg', 
          '/images/Butterfly Feet Chain Gold.jpg', 
          '/images/Butterfly Feet Chain Rose Gold.jpg'
        ]
      },
      '2': {
        name: 'Eye Chain',
        images: [
          '/images/Eye Chain Silver.jpg', 
          '/images/Eye Chain Gold.jpg', 
          '/images/Eye Chain Rose Gold.jpg'
        ]
      },
      '3': {
        name: 'Panda Chain',
        images: [
          '/images/Panda Chain Silver.jpg', 
          '/images/Panda Chain Gold.jpg', 
          '/images/Panda Chain Rose Gold.jpg'
        ]
      },
      '4': {
        name: 'Tiger Chain',
        images: [
          '/images/Tiger Chain Silver.jpg', 
          '/images/Tiger Chain Gold.jpg', 
          '/images/Tiger Chain Rose Gold.jpg'
        ]
      },
      '5': {
        name: 'Unicorn Chain',
        images: [
          '/images/Unicorn Chain Silver.jpg', 
          '/images/Unicorn Chain Gold.jpg', 
          '/images/Unicorn Chain Rose Gold.jpg'
        ]
      },
      '6': {
        name: 'Yellow Car Chain',
        images: [
          '/images/Yellow Car Silver.jpg', 
          '/images/Yellow Car Gold.jpg', 
          '/images/Yellow Car Rose Gold.jpg'
        ]
      },
      '7': {
        name: 'White Flower Chain',
        images: [
          '/images/White Flower Chain Silver.jpg', 
          '/images/White Flower Chain Gold.jpg', 
          '/images/White Flower Chain Rose Gold.jpg'
        ]
      },
      // Earrings Collection
      '8': {
        name: 'Flower Earrings',
        images: [
          '/images/earring/flower (s).jpg', 
          '/images/earring/flower (G).jpg'
        ]
      },
      '9': {
        name: 'House Sparrow Earrings',
        images: [
          '/images/earring/house sparrow (s).jpg', 
          '/images/earring/house sparrow (g).jpg', 
          '/images/earring/house sparrow (rg).jpg'
        ]
      },
      '10': {
        name: 'Butterfly Earrings',
        images: [
          '/images/earring/the butterfly (s).jpg', 
          '/images/earring/the butterfly (G).jpg', 
          '/images/earring/the butterfly (rg).jpg'
        ]
      },
      '11': {
        name: 'Rose Flower Earrings',
        images: [
          '/images/earring/the rose flower (rg).jpg'
        ]
      },
      '12': {
        name: 'Silver Elephant Earrings',
        images: [
          '/images/earring/the silver elephant (s).jpg', 
          '/images/earring/the silver elephant (g).jpg', 
          '/images/earring/the silver elephant (rg).jpg'
        ]
      },
      '13': {
        name: 'Silver Eye Earrings',
        images: [
          '/images/earring/the silver eye (s).jpg', 
          '/images/earring/the silver eye (g).jpg', 
          '/images/earring/the silver eye (rg).jpg'
        ]
      },
      '14': {
        name: 'Silver Moon Earrings',
        images: [
          '/images/earring/the silver moon(s).png', 
          '/images/earring/the silver moon(g).png', 
          '/images/earring/the silver moon(rg).png'
        ]
      },
      '15': {
        name: 'Silver Zebra Earrings',
        images: [
          '/images/earring/the silver zebra (s).jpg', 
          '/images/earring/the silver zebra (rg).jpg'
        ]
      },
      '16': {
        name: 'White Elephant Earrings',
        images: [
          '/images/earring/white elephant (s).jpg'
        ]
      },
      // Bracelet Collection
      '17': {
        name: 'House Sparrow Bracelet',
        images: [
          '/images/braclet/house sparrow (s).jpg', 
          '/images/braclet/house sparrow (g).jpg', 
          '/images/braclet/house sparrow (rg).jpg'
        ]
      },
      '18': {
        name: 'Silver Flower Bracelet',
        images: [
          '/images/braclet/the silver flower.jpg'
        ]
      },
      '19': {
        name: 'Yellow Elephant Bracelet',
        images: [
          '/images/braclet/the yellow elephant (g).jpg'
        ]
      },
      '20': {
        name: 'Unicorn Bracelet',
        images: [
          '/images/braclet/unicorn bralet(s).jpg', 
          '/images/braclet/unicorn braclet(g).jpg', 
          '/images/braclet/unicorn braclet(rg).jpg'
        ]
      },
      // Kada Collection
      '21': {
        name: 'Unicorn Bracelet',
        images: [
          '/images/braclet/unicorn bralet(s).jpg', 
          '/images/braclet/unicorn braclet(g).jpg', 
          '/images/braclet/unicorn braclet(rg).jpg'
        ]
      },
      '22': {
        name: 'Minimal Elephant Kada',
        images: [
          '/images/kada/minimal elephant (s).jpg', 
          '/images/kada/minimal elephant (g).jpg', 
          '/images/kada/minimal elephant (rg).jpg'
        ]
      },
      '23': {
        name: 'Singaa Kuty Kada',
        images: [
          '/images/kada/Singaa Kuty Kada (s).jpg', 
          '/images/kada/Singaa Kuty Kada (g).jpg', 
          '/images/kada/Singaa Kuty Kada (rg).jpg'
        ]
      },
      '24': {
        name: 'Aladdin Galaxy Star Kada',
        images: [
          '/images/kada/the aladdin galaxy star(s).jpg', 
          '/images/kada/the aladdin galaxy star (g).jpg', 
          '/images/kada/the aladdin galaxy star (rg).jpg'
        ]
      },
      '25': {
        name: 'Cup Cake Kada',
        images: [
          '/images/kada/The cup cake s.jpg', 
          '/images/kada/The cup cake g.jpg', 
          '/images/kada/The cup cake rg.jpg'
        ]
      },
      '26': {
        name: 'Kid Giraffe Kada',
        images: [
          '/images/kada/The Kid Giraffe kada (s).jpg', 
          '/images/kada/The Kid Giraffe kada (G).jpg'
        ]
      },
      '27': {
        name: 'Pinky Flower Candy Pineapple Kada',
        images: [
          '/images/kada/The pinky flower candy pineapple s.jpg', 
          '/images/kada/The pinky flower candy pineapple g.jpg', 
          '/images/kada/The pinky flower candy pineapple rg.jpg'
        ]
      },
      '28': {
        name: 'Protection Evil Eye Kada',
        images: [
          '/images/kada/The Protection Evil eye (s).jpg', 
          '/images/kada/The Protection Evil eye (rg).jpg'
        ]
      },
      '29': {
        name: 'Tiger Kada',
        images: [
          '/images/kada/the tiger kada (s).jpg', 
          '/images/kada/the tiger kada (g).jpg', 
          '/images/kada/the tiger kada (rg).jpg'
        ]
      },
      '30': {
        name: 'Unicorn Elephant Kada',
        images: [
          '/images/kada/unicorn elephant (s).jpg', 
          '/images/kada/unicorn elephant (g).jpg', 
          '/images/kada/unicorn elephant (rg).jpg'
        ]
      },
      // Nazariya Collection
      '32': {
        name: 'Butterfly Evil Eye Nazariya',
        images: [
          '/images/nazariya/buterfly evil eye (s).jpg', 
          '/images/nazariya/butterfly evil eye (rg).jpg'
        ]
      },
      '33': {
        name: 'Baby Feet Nazariya',
        images: [
          '/images/nazariya/the baby feet (S).jpg', 
          '/images/nazariya/the baby feet (g).jpg'
        ]
      },
      '34': {
        name: 'Lion Nazariya',
        images: [
          '/images/nazariya/the lion (s).jpg', 
          '/images/nazariya/the lion  (g).jpg'
        ]
      }
    };
    
    return productMap[id] || productMap['1']; // Default to first product
  };

  const productData = getProductById(resolvedParams.id);

  // Get correct prices based on product ID
  const getProductPrices = (id) => {
    const priceMap = {
      // Chains
      '1': { silver: { priceINR: 2050 }, gold: { priceINR: 2480 }, roseGold: { priceINR: 2799 } },
      '2': { silver: { priceINR: 2290 }, gold: { priceINR: 2520 }, roseGold: { priceINR: 2799 } },
      '3': { silver: { priceINR: 2150 }, gold: { priceINR: 2780 }, roseGold: { priceINR: 2590 } },
      '4': { silver: { priceINR: 2190 }, gold: { priceINR: 2580 }, roseGold: { priceINR: 2760 } },
      '5': { silver: { priceINR: 2299 }, gold: { priceINR: 2610 }, roseGold: { priceINR: 2799 } },
      '6': { silver: { priceINR: 2190 }, gold: { priceINR: 2780 }, roseGold: { priceINR: 2599 } },
      '7': { silver: { priceINR: 2299 }, gold: { priceINR: 2520 }, roseGold: { priceINR: 2810 } },
      // Earrings
      '8': { silver: { priceINR: 990 }, gold: { priceINR: 1100 }, roseGold: { priceINR: 1190 } },
      '9': { silver: { priceINR: 1100 }, gold: { priceINR: 1299 }, roseGold: { priceINR: 1250 } },
      '10': { silver: { priceINR: 1099 }, gold: { priceINR: 1250 }, roseGold: { priceINR: 1320 } },
      '11': { silver: { priceINR: 1150 }, gold: { priceINR: 1340 }, roseGold: { priceINR: 1290 } },
      '12': { silver: { priceINR: 980 }, gold: { priceINR: 1190 }, roseGold: { priceINR: 1310 } },
      '13': { silver: { priceINR: 1299 }, gold: { priceINR: 1380 }, roseGold: { priceINR: 1499 } },
      '14': { silver: { priceINR: 990 }, gold: { priceINR: 1180 }, roseGold: { priceINR: 1260 } },
      '15': { silver: { priceINR: 980 }, gold: { priceINR: 980 }, roseGold: { priceINR: 980 } },
      '16': { silver: { priceINR: 980 }, gold: { priceINR: 980 }, roseGold: { priceINR: 980 } },
      // Bracelets
      '17': { silver: { priceINR: 1400 }, gold: { priceINR: 1780 }, roseGold: { priceINR: 1899 } },
      '18': { silver: { priceINR: 2280 }, gold: { priceINR: 2280 }, roseGold: { priceINR: 2280 } },
      '19': { silver: { priceINR: 1280 }, gold: { priceINR: 1620 }, roseGold: { priceINR: 1780 } },
      '20': { silver: { priceINR: 3499 }, gold: { priceINR: 3850 }, roseGold: { priceINR: 3990 } },
      // Kada
      '22': { silver: { priceINR: 3299 }, gold: { priceINR: 3670 }, roseGold: { priceINR: 3790 } },
      '23': { silver: { priceINR: 2990 }, gold: { priceINR: 3799 }, roseGold: { priceINR: 3499 } },
      '24': { silver: { priceINR: 3430 }, gold: { priceINR: 3799 }, roseGold: { priceINR: 3690 } },
      '25': { silver: { priceINR: 3460 }, gold: { priceINR: 3690 }, roseGold: { priceINR: 3799 } },
      '26': { silver: { priceINR: 3290 }, gold: { priceINR: 3570 }, roseGold: { priceINR: 3799 } },
      '27': { silver: { priceINR: 3290 }, gold: { priceINR: 3499 }, roseGold: { priceINR: 3650 } },
      '28': { silver: { priceINR: 3299 }, gold: { priceINR: 3699 }, roseGold: { priceINR: 3760 } },
      '29': { silver: { priceINR: 3299 }, gold: { priceINR: 3680 }, roseGold: { priceINR: 3790 } },
      '30': { silver: { priceINR: 3290 }, gold: { priceINR: 3799 }, roseGold: { priceINR: 3690 } },
      // Nazariya
      '32': { silver: { priceINR: 1499 }, gold: { priceINR: 1650 }, roseGold: { priceINR: 1799 } },
      '33': { silver: { priceINR: 1399 }, gold: { priceINR: 1620 }, roseGold: { priceINR: 1760 } },
      '34': { silver: { priceINR: 1450 }, gold: { priceINR: 1610 }, roseGold: { priceINR: 1740 } }
    };
    return priceMap[id] || { silver: { priceINR: 2499 }, gold: { priceINR: 8999 }, roseGold: { priceINR: 6999 } };
  };

  // Get correct weight based on product ID
  const getProductWeight = (id) => {
    const weightMap = {
      // Chains
      '1': '3-4', '2': '2-3', '3': '4-5', '4': '2-3', '5': '3-4', '6': '2-3', '7': '2-3',
      // Earrings - no weights specified in image
      // Bracelets
      '17': '1-2', '18': '3-4', '19': '1-2', '20': '7-8',
      // Kada
      '22': '7-8', '23': '7-8', '24': '8-9', '25': '8-9', '26': '8-9', '27': '6-7', '28': '7-8', '29': '7-8', '30': '7-8',
      // Nazariya
      '32': '2-3', '33': '2-3', '34': '2-3'
    };
    return weightMap[id] || null; // Return null for earrings and other products without weights
  };

  // Mock product data - in real app, fetch based on resolvedParams.id
  const product = {
    id: resolvedParams.id,
    name: productData.name,
    prices: getProductPrices(resolvedParams.id),
    ...(parseInt(resolvedParams.id) > 7 && parseInt(resolvedParams.id) <= 16 ? {} : { weightGrams: getProductWeight(resolvedParams.id) }),
    images: productData.images,
    description: `Beautiful ${productData.name.toLowerCase()} with intricate detailing, perfect for your little one. This beautiful piece is crafted with love and attention to detail.`,
    longDescription: `Our ${productData.name} is a timeless piece that combines elegance with durability. Available in multiple materials including 92.5 sterling silver, 18K gold, and 18K rose gold. The adjustable design ensures a perfect fit as your child grows.`,
    category: parseInt(resolvedParams.id) <= 7 ? 'Chains' : 
              parseInt(resolvedParams.id) <= 16 ? 'Earrings' :
              parseInt(resolvedParams.id) <= 20 ? 'Bracelet' :
              parseInt(resolvedParams.id) <= 30 ? 'Kada' : 'Nazariya',
    materials: {
      silver: '92.5 Sterling Silver',
      gold: '18K Gold',
      roseGold: '18K Rose Gold'
    },
    ageRange: '2-12 years',
    wastagePercentage: 8,
    inStock: true,
    isNew: true,
    rating: 4.8,
    reviews: 127,
    features: [
      'Hypoallergenic materials',
      'Adjustable sizing',
      'Delicate charm details',
      'Tarnish resistant coating',
      'Comes with gift box'
    ],
    specifications: {
      'Materials Available': 'Silver, Gold, Rose Gold',
      ...(parseInt(resolvedParams.id) > 7 && parseInt(resolvedParams.id) <= 16 ? {} : { 'Weight': `${getProductWeight(resolvedParams.id)} grams (approx)` }),
      'Length': 'Adjustable 6-8 inches',
      'Finish': 'Polished',
      'Care': 'Clean with soft cloth'
    }
  };

  const handleAddToCart = () => {
    if (!product.inStock) {
      toast.error('This product is currently out of stock');
      return;
    }

    const cartItem = {
      ...product,
      selectedMaterial: selectedMaterial,
      priceINR: product.prices[selectedMaterial].priceINR,
      material: product.materials[selectedMaterial],
      quantity: quantity,
      image: product.images[0]
    };

    addToCart(cartItem);
    setIsAddedToCart(true);
    toast.success(`${product.name} (${product.materials[selectedMaterial]}) added to cart!`, {
      duration: 3000,
      icon: '🛒',
      style: {
        background: 'var(--primary-teal)',
        color: 'var(--soft-white)',
        borderRadius: '8px',
        padding: '12px 16px',
        fontSize: '14px',
        fontWeight: '500'
      }
    });
  };

  const handleGoToCart = () => {
    window.location.href = '/cart';
  };

  const toggleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.success('Removed from wishlist!', {
        duration: 2000,
        icon: '💔',
        style: {
          background: 'var(--primary-teal)',
          color: 'var(--soft-white)',
          borderRadius: '8px',
          padding: '12px 16px',
          fontSize: '14px',
          fontWeight: '500'
        }
      });
    } else {
      addToWishlist(product);
      toast.success('Added to wishlist!', {
        duration: 2000,
        icon: '❤️',
        style: {
          background: 'var(--primary-teal)',
          color: 'var(--soft-white)',
          borderRadius: '8px',
          padding: '12px 16px',
          fontSize: '14px',
          fontWeight: '500'
        }
      });
    }
  };

  if (isLoading) {
    return (
      <div className="product-detail-page">
        <div className="product-detail-container">
          <div className="loading-spinner-container" style={{ minHeight: '60vh' }}>
            <LoadingSpinner size="large" message="Loading product details..." />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/products">Products</Link>
          <span>/</span>
          <span>{product.name}</span>
        </nav>

        <div className="product-detail-content">
          {/* Product Images */}
          <div className="product-images">
            <div className="main-image">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                width={500}
                height={500}
                className="product-main-image"
              />
            </div>
            <div className="image-thumbnails">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    width={80}
                    height={80}
                    className="thumbnail-image"
                  />
                </button>
              ))}
            </div>
            
            {/* Specifications moved under images */}
            <div className="product-specifications">
              <h3>Specifications:</h3>
              <div className="specs-grid">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="spec-item">
                    <span className="spec-label">{key}:</span>
                    <span className="spec-value">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Features moved under specifications */}
            <div className="product-features">
              <h3>Key Features:</h3>
              <ul>
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Product Info */}
          <div className="product-info">
            <div className="product-header">
              <div className="product-category">
                <span className="category-badge">{product.category}</span>
                {product.isNew && <span className="new-badge">New</span>}
              </div>
              <h1 className="product-title">{product.name}</h1>
            </div>

            <div className="product-rating">
              <div className="rating-stars">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`star ${i < Math.floor(product.rating) ? 'filled' : 'empty'}`}
                  />
                ))}
              </div>
              <span className="rating-text">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            <PriceTabs 
              product={product} 
              onMaterialSelect={setSelectedMaterial}
              selectedMaterial={selectedMaterial}
            />

            <div className="product-description">
              <p>{product.description}</p>
            </div>

            <div className="product-actions">
              <div className="quantity-selector" style={{ display: 'none' }}>
                <label htmlFor="quantity">Quantity:</label>
                <div className="quantity-controls">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="quantity-input"
                    min="1"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="action-buttons">
                <button
                  className={`wishlist-btn ${isInWishlist(product.id) ? 'active' : ''}`}
                  onClick={toggleWishlist}
                >
                  <FaHeart />
                  <span>{isInWishlist(product.id) ? 'In Wishlist' : 'Add to Wishlist'}</span>
                </button>
                <button
                  className="add-to-cart-btn"
                  onClick={isAddedToCart ? handleGoToCart : handleAddToCart}
                  disabled={!product.inStock}
                  style={{ display: 'none' }}
                >
                  <FaShoppingCart />
                  <span>{isAddedToCart ? 'Go to Cart' : 'Add to Cart'}</span>
                </button>
                <button
                  className="whatsapp-btn"
                  onClick={() => {
                    const message = `Hi! I'm interested in the ${product.name} in ${product.materials[selectedMaterial]}. Could you please provide more details about this product?`;
                    const whatsappUrl = `https://wa.me/919444885666?text=${encodeURIComponent(message)}`;
                    window.open(whatsappUrl, '_blank');
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  <span>WhatsApp Query</span>
                </button>
              </div>
            </div>

            <div className="trust-indicators">
              <div className="trust-item">
                <FaTruck />
                <span>Free Shipping in India</span>
              </div>
              <div className="trust-item">
                <FaShieldAlt />
                <span>Secure Payment</span>
              </div>
              <div className="trust-item">
                <FaAward />
                <span>Quality Guarantee</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="product-tabs">
          <div className="tab-content">
            <h3>Product Description</h3>
            <p>{product.longDescription}</p>
            
            <h4>Care Instructions</h4>
            <ul>
              <li>Store in a dry place when not in use</li>
              <li>Clean gently with a soft cloth</li>
              <li>Avoid contact with perfumes and lotions</li>
              <li>Remove before swimming or bathing</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 