'use client';

import { useLoading } from '../context/LoadingContext';

export default function GlobalLoadingOverlay() {
  const { isLoading, loadingMessage } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="global-loading-overlay">
      <div className="loading-content">
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
        <p className="loading-text">{loadingMessage}</p>
      </div>
      <style jsx>{`
        .global-loading-overlay {
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
          z-index: 10000;
          animation: fadeIn 0.2s ease-in-out;
        }
        
        .loading-content {
          text-align: center;
          padding: 2rem;
          background: white;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0, 128, 128, 0.1);
          border: 1px solid #e0f7f7;
        }
        
        .loading-spinner {
          margin-bottom: 1rem;
        }
        
        .spinner {
          width: 3rem;
          height: 3rem;
          border: 3px solid #e0f7f7;
          border-top: 3px solid #008080;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        .loading-text {
          color: #008080;
          font-weight: 500;
          font-size: 1rem;
          margin: 0;
        }
        
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
