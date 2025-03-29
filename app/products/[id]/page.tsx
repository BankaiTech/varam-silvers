'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useCurrency } from '@/context/CurrencyContext';
import { useWishlist } from '@/context/WishlistContext';
import toast from 'react-hot-toast';

const product = {
  id: 1,
  name: 'Silver Anklet',
  priceINR: 2499,
  priceUSD: 29.99,
  image: '/images/slide1.jpg',
  description: 'Beautiful silver anklet for little girls',
  wastagePercentage: 8,
  features: [
    'Made of 925 sterling silver',
    'Adjustable size',
    'Cute charm design',
    'Hypoallergenic',
  ],
  specifications: {
    material: '925 Sterling Silver',
    length: 'Adjustable (8-10 inches)',
    weight: '5 grams',
    purity: '92.5%',
    wastage: '8%',
  },
};

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { formatPrice, addToCart } = useCurrency();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
            className="product-gallery"
          >
            <div className="main-image mb-3">
              <Image
                src={product.image}
                alt={product.name}
                width={500}
                height={500}
                className="img-fluid rounded"
              />
            </div>
          </motion.div>
        </div>

        {/* Product Info */}
        <div className="col-md-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="product-info"
          >
            <h1 className="mb-3">{product.name}</h1>
            <div className="mb-4">
              <div className="price-display">
                <h2 className="h3 mb-0">{formatPrice(product.priceINR, product.priceUSD)}</h2>
              </div>
            </div>

            <div className="mb-4">
              <span className="badge bg-light text-dark me-2">
                Wastage: {product.wastagePercentage}%
              </span>
              <span className="badge bg-light text-dark">
                Purity: {product.specifications.purity}
              </span>
            </div>

            <p className="lead text-muted mb-4">{product.description}</p>

            <div className="features mb-4">
              <h3 className="h5 mb-3">Features</h3>
              <ul className="list-unstyled">
                {product.features.map((feature, index) => (
                  <li key={index} className="mb-2">
                    • {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="specifications">
              <h3 className="h5 mb-3">Specifications</h3>
              <table className="table">
                <tbody>
                  {Object.entries(product.specifications).map(
                    ([key, value]) => (
                      <tr key={key}>
                        <th className="text-muted">
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </th>
                        <td>{value}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>

            <div className="d-flex gap-3 mb-4">
              <div className="input-group" style={{ width: '150px' }}>
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                >
                  -
                </button>
                <input
                  type="number"
                  className="form-control text-center"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="d-flex gap-3">
              <button
                className="btn btn-primary"
                onClick={handleAddToCart}
                {...(mounted && {
                  'data-bs-toggle': 'tooltip',
                  'data-bs-placement': 'top',
                  title: 'Add to Cart'
                })}
              >
                <FaShoppingCart className="me-2" />
                Add to Cart
              </button>
              <button 
                className={`btn ${isInWishlist(product.id) ? 'btn-danger' : 'btn-outline-primary'}`}
                onClick={handleWishlistToggle}
                {...(mounted && {
                  'data-bs-toggle': 'tooltip',
                  'data-bs-placement': 'top',
                  title: isInWishlist(product.id) ? "Remove from Wishlist" : "Add to Wishlist"
                })}
              >
                <FaHeart />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 