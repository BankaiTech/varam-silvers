'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaSearch, FaTimes } from 'react-icons/fa';

// Product data - same as in products page
const products = [
  {
    id: 1,
    name: 'Butterfly Feet Chain',
    description: 'Beautiful butterfly-themed anklet chain with delicate butterfly charms, perfect for your little princess',
    category: 'Chains',
    image: '/images/Butterfly Feet Chain Silver - Card.png'
  },
  {
    id: 2,
    name: 'Eye Chain',
    description: 'Elegant eye-shaped chain with protective symbolism, designed to ward off evil and bring good luck',
    category: 'Chains',
    image: '/images/Eye Chain Silver.jpg'
  },
  {
    id: 3,
    name: 'Panda Chain',
    description: 'Adorable panda-themed chain with cute panda charms, bringing joy and playfulness to your child',
    category: 'Chains',
    image: '/images/Panda Chain Silver.jpg'
  },
  {
    id: 4,
    name: 'Tiger Chain',
    description: 'Bold tiger-themed chain with fierce tiger charm, perfect for brave little ones',
    category: 'Chains',
    image: '/images/Tiger Chain Silver.jpg'
  },
  {
    id: 5,
    name: 'Unicorn Chain',
    description: 'Magical unicorn-themed chain with enchanting unicorn charm, bringing dreams to life',
    category: 'Chains',
    image: '/images/Unicorn Chain Rose Gold.jpg'
  },
  {
    id: 6,
    name: 'Yellow Car Chain',
    description: 'Fun car-themed chain with vibrant yellow car charm, perfect for little car enthusiasts',
    category: 'Chains',
    image: '/images/Yellow Car Silver.jpg'
  },
  {
    id: 7,
    name: 'White Flower Chain',
    description: 'Elegant white flower-themed chain with delicate floral charms, symbolizing purity and grace',
    category: 'Chains',
    image: '/images/White Flower Chain Silver.jpg'
  }
];

export default function ProductSearch({ isMobile = false }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  const resultsRef = useRef(null);

  // Filter products based on search term
  useEffect(() => {
    if (searchTerm.trim().length > 0) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filtered);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  }, [searchTerm]);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleProductClick = () => {
    setSearchTerm('');
    setShowResults(false);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setShowResults(false);
  };

  const SearchInput = () => (
    <div className="search-input-wrapper">
      <FaSearch className="search-icon" />
      <input
        type="text"
        placeholder="Search silver jewelry..."
        value={searchTerm}
        onChange={handleSearchChange}
        onFocus={() => setShowResults(true)}
        className="search-input"
      />
      {searchTerm && (
        <button onClick={clearSearch} className="clear-search-btn">
          <FaTimes />
        </button>
      )}
    </div>
  );

  const SearchResults = () => (
    showResults && searchResults.length > 0 && (
      <div className="search-results" ref={resultsRef}>
        <div className="search-results-header">
          <span className="results-count">{searchResults.length} product{searchResults.length !== 1 ? 's' : ''} found</span>
        </div>
        <div className="search-results-list">
          {searchResults.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="search-result-item"
              onClick={handleProductClick}
            >
              <div className="result-image">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={50}
                  height={50}
                  className="result-img"
                />
              </div>
              <div className="result-content">
                <h4 className="result-name">{product.name}</h4>
                <p className="result-description">{product.description}</p>
                <span className="result-category">{product.category}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    )
  );

  const NoResults = () => (
    showResults && searchTerm && searchResults.length === 0 && (
      <div className="search-results" ref={resultsRef}>
        <div className="no-results">
          <p>No products found for &quot;{searchTerm}&quot;</p>
          <span>Try searching with different keywords</span>
        </div>
      </div>
    )
  );

  if (isMobile) {
    return (
      <div className="mobile-search-container" ref={searchRef}>
        <div className="mobile-search-wrapper">
          <SearchInput />
        </div>
        <SearchResults />
        <NoResults />
      </div>
    );
  }

  return (
    <div className="search-container" ref={searchRef}>
      <div className="search-wrapper">
        <SearchInput />
      </div>
      <SearchResults />
      <NoResults />
    </div>
  );
}
