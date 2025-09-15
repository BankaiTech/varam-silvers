'use client';

import { useLoading } from '../context/LoadingContext';

export default function GlobalLoadingOverlay() {
  const { isLoading, loadingMessage } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="global-loading-overlay">
      <div className="global-loading-content">
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
        
        {/* Loading Text */}
        <div className="loading-text">
          <span className="loading-text-main">{loadingMessage || 'Loading...'}</span>
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
