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
    weightGrams: '3-4',
    image: '/images/Butterfly Feet Chain Silver - Card.png'
  },
  {
    id: 2,
    name: 'Eye Chain',
    description: 'Elegant eye-shaped chain with protective symbolism, designed to ward off evil and bring good luck',
    category: 'Chains',
    weightGrams: '2-3',
    image: '/images/Eye Chain Silver.jpg'
  },
  {
    id: 3,
    name: 'Panda Chain',
    description: 'Adorable panda-themed chain with cute panda charms, bringing joy and playfulness to your child',
    category: 'Chains',
    weightGrams: '4-5',
    image: '/images/Panda Chain Silver.jpg'
  },
  {
    id: 4,
    name: 'Tiger Chain',
    description: 'Bold tiger-themed chain with fierce tiger charm, perfect for brave little ones',
    category: 'Chains',
    weightGrams: '2-3',
    image: '/images/Tiger Chain Silver.jpg'
  },
  {
    id: 5,
    name: 'Unicorn Chain',
    description: 'Magical unicorn-themed chain with enchanting unicorn charm, bringing dreams to life',
    category: 'Chains',
    weightGrams: '3-4',
    image: '/images/Unicorn Chain Rose Gold.jpg'
  },
  {
    id: 6,
    name: 'Yellow Car Chain',
    description: 'Fun car-themed chain with vibrant yellow car charm, perfect for little car enthusiasts',
    category: 'Chains',
    weightGrams: '2-3',
    image: '/images/Yellow Car Silver.jpg'
  },
  {
    id: 7,
    name: 'White Flower Chain',
    description: 'Elegant white flower-themed chain with delicate floral charms, symbolizing purity and grace',
    category: 'Chains',
    weightGrams: '2-3',
    image: '/images/White Flower Chain Silver.jpg'
  },
  // Earrings Collection
  {
    id: 8,
    name: 'The Silver Evil Eye',
    description: 'Protective evil eye earrings designed to ward off negative energy and bring good fortune',
    category: 'Earrings',
    image: '/images/earring/flower (s).jpg',
    prices: {
      silver: { priceINR: 990 },
      gold: { priceINR: 1100 },
      roseGold: { priceINR: 1190 }
    }
  },
  {
    id: 9,
    name: 'The Silver Elephant',
    description: 'Adorable elephant earrings that bring wisdom and good luck to your child',
    category: 'Earrings',
    image: '/images/earring/house sparrow (s).jpg',
    prices: {
      silver: { priceINR: 1100 },
      gold: { priceINR: 1299 },
      roseGold: { priceINR: 1250 }
    }
  },
  {
    id: 10,
    name: 'The Silver Moon',
    description: 'Mystical moon earrings that capture the magic of the night sky',
    category: 'Earrings',
    image: '/images/earring/the butterfly (s).jpg',
    prices: {
      silver: { priceINR: 1099 },
      gold: { priceINR: 1250 },
      roseGold: { priceINR: 1320 }
    }
  },
  {
    id: 11,
    name: 'The House Sparrow',
    description: 'Charming house sparrow earrings that bring nature\'s beauty to your little one\'s ears',
    category: 'Earrings',
    image: '/images/earring/the rose flower (rg).jpg',
    prices: {
      silver: { priceINR: 1150 },
      gold: { priceINR: 1340 },
      roseGold: { priceINR: 1290 }
    }
  },
  {
    id: 12,
    name: 'The Butterfly',
    description: 'Elegant butterfly earrings with graceful wings, symbolizing transformation and beauty',
    category: 'Earrings',
    image: '/images/earring/the silver elephant (s).jpg',
    prices: {
      silver: { priceINR: 980 },
      gold: { priceINR: 1190 },
      roseGold: { priceINR: 1310 }
    }
  },
  {
    id: 13,
    name: 'The Silver Zebra',
    description: 'Unique zebra earrings with distinctive stripes, perfect for animal lovers',
    category: 'Earrings',
    image: '/images/earring/the silver eye (s).jpg',
    prices: {
      silver: { priceINR: 1299 },
      gold: { priceINR: 1380 },
      roseGold: { priceINR: 1499 }
    }
  },
  {
    id: 14,
    name: 'The Pink Flower',
    description: 'Beautiful pink flower earrings with delicate petals, perfect for your little princess',
    category: 'Earrings',
    image: '/images/earring/the silver moon(s).png',
    prices: {
      silver: { priceINR: 990 },
      gold: { priceINR: 1180 },
      roseGold: { priceINR: 1260 }
    }
  },
  {
    id: 15,
    name: 'The White Elephant',
    description: 'Pure white elephant earrings symbolizing purity, wisdom, and good fortune',
    category: 'Earrings',
    image: '/images/earring/the silver zebra (s).jpg',
    prices: {
      silver: { priceINR: 980 },
      gold: { priceINR: 980 },
      roseGold: { priceINR: 980 }
    }
  },
  {
    id: 16,
    name: 'The White Elephant',
    description: 'Pure white elephant earrings symbolizing purity, wisdom, and good fortune',
    category: 'Earrings',
    image: '/images/earring/white elephant (s).jpg',
    prices: {
      silver: { priceINR: 980 },
      gold: { priceINR: 980 },
      roseGold: { priceINR: 980 }
    }
  },
  // Bracelet Collection
  {
    id: 17,
    name: 'House Sparrow Bracelet',
    description: 'Charming house sparrow bracelet that brings nature\'s beauty to your little one\'s wrist',
    category: 'Bracelet',
    image: '/images/braclet/house sparrow (s).jpg',
    prices: {
      silver: { priceINR: 1400 },
      gold: { priceINR: 1780 },
      roseGold: { priceINR: 1899 }
    },
    weightGrams: '1-2'
  },
  {
    id: 18,
    name: 'Silver Flower Bracelet',
    description: 'Elegant silver flower bracelet with delicate floral design, perfect for special occasions',
    category: 'Bracelet',
    image: '/images/braclet/the silver flower.jpg',
    prices: {
      silver: { priceINR: 2280 },
      gold: { priceINR: 2280 },
      roseGold: { priceINR: 2280 }
    },
    weightGrams: '3-4'
  },
  {
    id: 19,
    name: 'Yellow Elephant Bracelet',
    description: 'Adorable yellow elephant bracelet that brings wisdom and good luck to your child',
    category: 'Bracelet',
    image: '/images/braclet/the yellow elephant (g).jpg',
    prices: {
      silver: { priceINR: 1280 },
      gold: { priceINR: 1620 },
      roseGold: { priceINR: 1780 }
    },
    weightGrams: '1-2'
  },
  {
    id: 20,
    name: 'Unicorn Bracelet',
    description: 'Magical unicorn bracelet with enchanting design, bringing dreams to life',
    category: 'Bracelet',
    image: '/images/braclet/unicorn bralet(s).jpg',
    prices: {
      silver: { priceINR: 3499 },
      gold: { priceINR: 3850 },
      roseGold: { priceINR: 3990 }
    },
    weightGrams: '7-8'
  },
  // Kada Collection
  {
    id: 22,
    name: 'Minimal Elephant Kada',
    description: 'Elegant minimal elephant kada with clean design, perfect for everyday wear',
    category: 'Kada',
    image: '/images/kada/minimal elephant (s).jpg',
    prices: {
      silver: { priceINR: 3299 },
      gold: { priceINR: 3670 },
      roseGold: { priceINR: 3790 }
    },
    weightGrams: '7-8'
  },
  {
    id: 23,
    name: 'Singaa Kuty Kada',
    description: 'Traditional Singaa Kuty kada with cultural significance and beautiful craftsmanship',
    category: 'Kada',
    image: '/images/kada/Singaa Kuty Kada (s).jpg',
    prices: {
      silver: { priceINR: 2990 },
      gold: { priceINR: 3799 },
      roseGold: { priceINR: 3499 }
    },
    weightGrams: '7-8'
  },
  {
    id: 24,
    name: 'Aladdin Galaxy Star Kada',
    description: 'Mystical Aladdin galaxy star kada that captures the magic of the night sky',
    category: 'Kada',
    image: '/images/kada/the aladdin galaxy star(s).jpg',
    prices: {
      silver: { priceINR: 3430 },
      gold: { priceINR: 3799 },
      roseGold: { priceINR: 3690 }
    },
    weightGrams: '8-9'
  },
  {
    id: 25,
    name: 'Cup Cake Kada',
    description: 'Sweet cup cake kada that brings joy and playfulness to your child',
    category: 'Kada',
    image: '/images/kada/The cup cake s.jpg',
    prices: {
      silver: { priceINR: 3460 },
      gold: { priceINR: 3690 },
      roseGold: { priceINR: 3799 }
    },
    weightGrams: '8-9'
  },
  {
    id: 26,
    name: 'Kid Giraffe Kada',
    description: 'Adorable giraffe kada with tall neck design, perfect for animal lovers',
    category: 'Kada',
    image: '/images/kada/The Kid Giraffe kada (s).jpg',
    prices: {
      silver: { priceINR: 3290 },
      gold: { priceINR: 3570 },
      roseGold: { priceINR: 3799 }
    },
    weightGrams: '8-9'
  },
  {
    id: 27,
    name: 'Pinky Flower Candy Pineapple Kada',
    description: 'Colorful pineapple kada with tropical vibes, bringing summer joy',
    category: 'Kada',
    image: '/images/kada/The pinky flower candy pineapple s.jpg',
    prices: {
      silver: { priceINR: 3290 },
      gold: { priceINR: 3499 },
      roseGold: { priceINR: 3650 }
    },
    weightGrams: '6-7'
  },
  {
    id: 28,
    name: 'Protection Evil Eye Kada',
    description: 'Protective evil eye kada designed to ward off negative energy and bring good fortune',
    category: 'Kada',
    image: '/images/kada/The Protection Evil eye (s).jpg',
    prices: {
      silver: { priceINR: 3299 },
      gold: { priceINR: 3699 },
      roseGold: { priceINR: 3760 }
    },
    weightGrams: '7-8'
  },
  {
    id: 29,
    name: 'Tiger Kada',
    description: 'Bold tiger kada with fierce design, perfect for brave little ones',
    category: 'Kada',
    image: '/images/kada/the tiger kada (s).jpg',
    prices: {
      silver: { priceINR: 3299 },
      gold: { priceINR: 3680 },
      roseGold: { priceINR: 3790 }
    },
    weightGrams: '7-8'
  },
  {
    id: 30,
    name: 'Unicorn Elephant Kada',
    description: 'Magical unicorn elephant kada combining two beloved creatures in one design',
    category: 'Kada',
    image: '/images/kada/unicorn elephant (s).jpg',
    prices: {
      silver: { priceINR: 3290 },
      gold: { priceINR: 3799 },
      roseGold: { priceINR: 3690 }
    },
    weightGrams: '7-8'
  },
  // Nazriya Collection
  {
    id: 32,
    name: 'Butterfly Evil Eye Nazriya',
    description: 'Beautiful butterfly evil eye nazriya with protective symbolism and elegant design',
    category: 'Nazriya',
    image: '/images/nazriya/buterfly evil eye (s).jpg',
    prices: {
      silver: { priceINR: 1499 },
      gold: { priceINR: 1650 },
      roseGold: { priceINR: 1799 }
    },
    weightGrams: '2-3'
  },
  {
    id: 33,
    name: 'Baby Feet Nazriya',
    description: 'Adorable baby feet nazriya symbolizing the precious journey of childhood',
    category: 'Nazriya',
    image: '/images/nazriya/the baby feet (S).jpg',
    prices: {
      silver: { priceINR: 1399 },
      gold: { priceINR: 1620 },
      roseGold: { priceINR: 1760 }
    },
    weightGrams: '2-3'
  },
  {
    id: 34,
    name: 'Lion Nazriya',
    description: 'Majestic lion nazriya representing courage, strength, and leadership',
    category: 'Nazriya',
    image: '/images/nazriya/the lion (s).jpg',
    prices: {
      silver: { priceINR: 1450 },
      gold: { priceINR: 1610 },
      roseGold: { priceINR: 1740 }
    },
    weightGrams: '2-3'
  }
];

export default function ProductSearch({ isMobile = false }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  const resultsRef = useRef(null);
  const inputRef = useRef(null);
  const isTypingRef = useRef(false);

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

  // Monitor and maintain focus
  useEffect(() => {
    const handleFocusLoss = () => {
      if (inputRef.current && searchTerm && document.activeElement !== inputRef.current) {
        // Only refocus if we're actively searching
        setTimeout(() => {
          if (inputRef.current && searchTerm) {
            inputRef.current.focus();
          }
        }, 10);
      }
    };

    // Check focus periodically while typing
    const intervalId = setInterval(handleFocusLoss, 50);
    
    return () => {
      clearInterval(intervalId);
    };
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    isTypingRef.current = true;
    setSearchTerm(e.target.value);
    
    // Force focus to stay on input
    setTimeout(() => {
      if (inputRef.current && isTypingRef.current) {
        inputRef.current.focus();
        isTypingRef.current = false;
      }
    }, 0);
  };

  const handleProductClick = () => {
    setSearchTerm('');
    setShowResults(false);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setShowResults(false);
    // Refocus the input after clearing
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const SearchInput = () => (
    <div className="search-input-wrapper">
      <FaSearch className="search-icon" />
      <input
        ref={inputRef}
        type="text"
        placeholder="Search silver jewelry..."
        value={searchTerm}
        onChange={handleSearchChange}
        onFocus={() => setShowResults(true)}
        onKeyDown={(e) => {
          // Prevent any key events from causing focus loss
          e.stopPropagation();
        }}
        onKeyUp={(e) => {
          // Ensure focus is maintained after key release
          e.stopPropagation();
          if (inputRef.current && document.activeElement !== inputRef.current) {
            inputRef.current.focus();
          }
        }}
        onInput={(e) => {
          // Additional input handler to maintain focus
          e.stopPropagation();
        }}
        className="search-input"
        autoComplete="off"
        spellCheck="false"
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
