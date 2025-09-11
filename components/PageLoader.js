'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Show loading when pathname changes
    setIsLoading(true);
    
    // Hide loading after a short delay to ensure smooth transition
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [pathname]);

  if (!isLoading) return null;

  return (
    <div className="page-loader">
      <div className="page-loader-content">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-muted">Loading...</p>
      </div>
      <style jsx>{`
        .page-loader {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(5px);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
          animation: fadeIn 0.2s ease-in-out;
        }
        
        .page-loader-content {
          text-align: center;
        }
        
        .spinner-border {
          width: 3rem;
          height: 3rem;
          border-width: 0.3em;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
