'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { useCurrency } from '../context/CurrencyContext';
import Navbar from './Navbar';
import Footer from './Footer';
import { ToastContainer } from 'react-hot-toast';

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const { checkAuth } = useAuth();
  const { initializeCurrency } = useCurrency();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      try {
        await checkAuth();
        initializeCurrency();
      } catch {
        // Handle initialization error silently
      } finally {
        setIsLoading(false);
      }
    };

    initialize();
  }, [checkAuth, initializeCurrency]);

  useEffect(() => {
    // Initialize tooltips
    const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltips.forEach(tooltip => {
      new bootstrap.Tooltip(tooltip);
    });

    return () => {
      tooltips.forEach(tooltip => {
        const tooltipInstance = bootstrap.Tooltip.getInstance(tooltip);
        if (tooltipInstance) {
          tooltipInstance.dispose();
        }
      });
    };
  }, [pathname]);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <ToastContainer />
    </>
  );
} 