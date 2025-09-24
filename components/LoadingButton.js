'use client';

import { useState } from 'react';

export default function LoadingButton({ 
  children, 
  onClick, 
  className = '', 
  disabled = false,
  loading = false,
  loadingText = 'Loading...',
  variant = 'primary',
  ...props 
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (e) => {
    if (loading || isLoading || disabled) return;
    
    setIsLoading(true);
    try {
      if (onClick) {
        await onClick(e);
      }
    } finally {
      // Add a small delay to show the loading state
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };

  const isButtonLoading = loading || isLoading;

  const baseClasses = `
    relative inline-flex items-center justify-center gap-2
    px-4 py-2 border border-transparent
    text-sm font-medium rounded-md
    focus:outline-none focus:ring-2 focus:ring-offset-2
    transition-all duration-200 ease-in-out
    disabled:opacity-50 disabled:cursor-not-allowed
  `;
  
  // Check if this is a social button
  const isSocialButton = className.includes('social-btn');
  

  const variantClasses = {
    primary: `
      bg-[var(--primary-teal)] text-white
      hover:bg-[var(--secondary-teal)] focus:ring-[var(--primary-teal)]
      shadow-sm hover:shadow-md
    `,
    secondary: `
      bg-[var(--secondary-teal)] text-white
      hover:bg-[var(--primary-teal)] focus:ring-[var(--secondary-teal)]
      shadow-sm hover:shadow-md
    `,
    outline: `
      border-[var(--primary-teal)] text-[var(--primary-teal)] bg-transparent
      hover:bg-[var(--primary-teal)] hover:text-white focus:ring-[var(--primary-teal)]
    `,
    ghost: `
      text-[var(--primary-teal)] bg-transparent
      hover:bg-[var(--pale-teal)] focus:ring-[var(--primary-teal)]
    `
  };

  return (
    <button
      className={isSocialButton ? className : `${baseClasses} ${variantClasses[variant]} ${className}`}
      onClick={handleClick}
      disabled={disabled || isButtonLoading}
      {...props}
    >
      {isButtonLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="btn-loading-spinner">
            <div className="ring-container">
              <div className="ring-outer">
                <div className="ring-inner">
                  <div className="gem"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
          <span className={isButtonLoading ? 'opacity-0' : isSocialButton ? 'opacity-100' : 'opacity-100 flex items-center justify-center gap-2'}>
            {isButtonLoading ? loadingText : children}
          </span>
    </button>
  );
}
