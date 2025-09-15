'use client';

export default function LoadingSpinner({ size = 'medium', message = 'Loading...' }) {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  return (
    <div className="loading-spinner-container">
      <div className={`loading-spinner-icon ${sizeClasses[size]}`}>
        <div className="ring-container">
          <div className="ring-outer">
            <div className="ring-inner">
              <div className="gem"></div>
            </div>
          </div>
        </div>
      </div>
      {message && (
        <p className="loading-spinner-text">{message}</p>
      )}
    </div>
  );
}
