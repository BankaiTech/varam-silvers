'use client';

import { createContext, useContext, useState } from 'react';

const LoadingContext = createContext();

export function LoadingProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Loading...');

  const startLoading = (message = 'Loading...') => {
    setLoadingMessage(message);
    setIsLoading(true);
  };

  const stopLoading = () => {
    setIsLoading(false);
    setLoadingMessage('Loading...');
  };

  const withLoading = async (asyncFunction, message = 'Loading...') => {
    try {
      startLoading(message);
      const result = await asyncFunction();
      return result;
    } finally {
      stopLoading();
    }
  };

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        loadingMessage,
        startLoading,
        stopLoading,
        withLoading
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}

export default LoadingContext;
