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
    }, 800);

    return () => clearTimeout(timer);
  }, [pathname]);

  if (!isLoading) return null;

  return (
    <div className="page-loader">
      <div className="page-loader-content">
        {/* Silver Ring Icon with Animation */}
        <div className="loading-icon">
          <div className="ring-container">
            <div className="ring-outer">
              <div className="ring-inner">
                <div className="gem"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Loading Text with Typing Animation */}
        <div className="loading-text">
          <span className="loading-text-main">Varam Silvers</span>
          <div className="loading-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="loading-progress">
          <div className="progress-bar"></div>
        </div>
      </div>
    </div>
  );
}
