'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { useCurrency } from '@/context/CurrencyContext';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const { cartCount } = useCurrency();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="navbar navbar-expand-lg fixed-top">
      <div className="container">
        <Link href="/" className="navbar-brand logo-text">
          Varam Silvers
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link
                href="/"
                className={`nav-link ${isActive('/') ? 'active' : ''}`}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/products"
                className={`nav-link ${isActive('/products') ? 'active' : ''}`}
              >
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/cart"
                className={`nav-link position-relative ${isActive('/cart') ? 'active' : ''}`}
                {...(mounted && {
                  'data-bs-toggle': 'tooltip',
                  'data-bs-placement': 'bottom',
                  title: 'Shopping Cart'
                })}
              >
                <FaShoppingCart className="fs-5" />
                {cartCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                    {cartCount}
                  </span>
                )}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/login"
                className={`nav-link ${isActive('/login') ? 'active' : ''}`}
                {...(mounted && {
                  'data-bs-toggle': 'tooltip',
                  'data-bs-placement': 'bottom',
                  title: 'Login / My Account'
                })}
              >
                <FaUser className="fs-5" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
} 