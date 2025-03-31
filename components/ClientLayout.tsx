'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import Navbar from './Navbar';
import { Toaster } from 'react-hot-toast';
import Footer from '@/components/Footer';

// Dynamically import Bootstrap's JavaScript bundle
const BootstrapClient = () => {
  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);
  return null;
};

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [tooltips, setTooltips] = useState<any[]>([]);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    // Initialize tooltips after component mounts
    const initTooltips = () => {
      // Clean up existing tooltips
      tooltips.forEach(tooltip => {
        try {
          tooltip.dispose();
        } catch (error) {
          // Ignore errors when disposing tooltips
        }
      });
      setTooltips([]);

      // Initialize new tooltips
      const tooltipElements = document.querySelectorAll('[data-bs-toggle="tooltip"]');
      const newTooltips = Array.from(tooltipElements).map(element => {
        try {
          const Tooltip = require('bootstrap').Tooltip;
          return new Tooltip(element);
        } catch (error) {
          console.error('Error initializing tooltip:', error);
          return null;
        }
      }).filter(Boolean); // Remove any null tooltips
      setTooltips(newTooltips);
    };

    // Wait for a short delay to ensure DOM is ready
    const timer = setTimeout(initTooltips, 100);

    return () => {
      clearTimeout(timer);
      tooltips.forEach(tooltip => {
        try {
          tooltip.dispose();
        } catch (error) {
          // Ignore errors when disposing tooltips
        }
      });
    };
  }, [pathname]);

  return (
    <>
      <BootstrapClient />
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1">
          {isLoading ? (
            <div className="loading-overlay">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            children
          )}
        </main>
        <Footer />
      </div>
      <Toaster />
    </>
  );
} 