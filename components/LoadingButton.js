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

  const variantClasses = {
    primary: `
      bg-[#008080] text-white
      hover:bg-[#006666] focus:ring-[#008080]
      shadow-sm hover:shadow-md
    `,
    secondary: `
      bg-[#20b2aa] text-white
      hover:bg-[#008080] focus:ring-[#20b2aa]
      shadow-sm hover:shadow-md
    `,
    outline: `
      border-[#008080] text-[#008080] bg-transparent
      hover:bg-[#008080] hover:text-white focus:ring-[#008080]
    `,
    ghost: `
      text-[#008080] bg-transparent
      hover:bg-[#e0f7f7] focus:ring-[#008080]
    `
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onClick={handleClick}
      disabled={disabled || isButtonLoading}
      {...props}
    >
      {isButtonLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <span className={isButtonLoading ? 'opacity-0' : 'opacity-100 flex items-center justify-center gap-2'}>
        {isButtonLoading ? loadingText : children}
      </span>
    </button>
  );
}
