'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaSearch, FaTimes } from 'react-icons/fa';

// Product data - same as main products page
const products = [
  {
    id: 1,
    name: 'Butterfly Feet Chain',
    prices: {
      silver: { priceINR: 2050 },
      gold: { priceINR: 2480 },
      roseGold: { priceINR: 2799 }
    },
    weightGrams: '3-4',
    image: '/images/Butterfly Feet Chain Silver - Card.png',
    description: 'Beautiful butterfly-themed anklet chain with delicate butterfly charms, perfect for your little princess',
    wastagePercentage: 8,
    category: 'Chains',
    materials: {
      silver: '92.5 Sterling Silver',
      gold: '18K Gold',
      roseGold: '18K Rose Gold'
    },
    ageRange: '2-12 years',
    inStock: true,
    isNew: true,
    rating: 4.8
  },
  {
    id: 2,
    name: 'Eye Chain',
    prices: {
      silver: { priceINR: 2290 },
      gold: { priceINR: 2520 },
      roseGold: { priceINR: 2799 }
    },
    weightGrams: '2-3',
    image: '/images/Eye Chain Silver.jpg',
    description: 'Elegant eye-shaped chain with protective symbolism, designed to ward off evil and bring good luck',
    wastagePercentage: 10,
    category: 'Chains',
    materials: {
      silver: '92.5 Sterling Silver',
      gold: '18K Gold',
      roseGold: '18K Rose Gold'
    },
    ageRange: '3-14 years',
    inStock: true,
    isNew: false,
    rating: 4.9
  },
  {
    id: 3,
    name: 'Panda Chain',
    prices: {
      silver: { priceINR: 2150 },
      gold: { priceINR: 2780 },
      roseGold: { priceINR: 2590 }
    },
    weightGrams: '4-5',
    image: '/images/Panda Chain Silver - Card.png',
    description: 'Adorable panda-themed chain with cute panda charms, bringing joy and playfulness to your child',
    wastagePercentage: 12,
    category: 'Chains',
    materials: {
      silver: '92.5 Sterling Silver',
      gold: '18K Gold',
      roseGold: '18K Rose Gold'
    },
    ageRange: '4-16 years',
    inStock: true,
    isNew: true,
    rating: 4.7
  },
  {
    id: 4,
    name: 'Tiger Chain',
    prices: {
      silver: { priceINR: 2190 },
      gold: { priceINR: 2580 },
      roseGold: { priceINR: 2760 }
    },
    weightGrams: '2-3',
    image: '/images/Tiger Chain Silver.jpg',
    description: 'Bold tiger-themed chain with fierce tiger charm, perfect for brave little ones',
    wastagePercentage: 6,
    category: 'Chains',
    materials: {
      silver: '92.5 Sterling Silver',
      gold: '18K Gold',
      roseGold: '18K Rose Gold'
    },
    ageRange: '3-12 years',
    inStock: true,
    isNew: false,
    rating: 4.6
  },
  {
    id: 5,
    name: 'Unicorn Chain',
    prices: {
      silver: { priceINR: 2299 },
      gold: { priceINR: 2610 },
      roseGold: { priceINR: 2799 }
    },
    weightGrams: '3-4',
    image: '/images/Unicorn Chain Rose Gold - Card.png',
    description: 'Magical unicorn-themed chain with enchanting unicorn charm, bringing dreams to life',
    wastagePercentage: 5,
    category: 'Chains',
    materials: {
      silver: '92.5 Sterling Silver',
      gold: '18K Gold',
      roseGold: '18K Rose Gold'
    },
    ageRange: '2-10 years',
    inStock: true,
    isNew: true,
    rating: 4.9
  },
  {
    id: 6,
    name: 'Yellow Car Chain',
    prices: {
      silver: { priceINR: 2190 },
      gold: { priceINR: 2780 },
      roseGold: { priceINR: 2599 }
    },
    weightGrams: '2-3',
    image: '/images/Yellow Car Silver.jpg',
    description: 'Fun car-themed chain with vibrant yellow car charm, perfect for little car enthusiasts',
    wastagePercentage: 5,
    category: 'Chains',
    materials: {
      silver: '92.5 Sterling Silver',
      gold: '18K Gold',
      roseGold: '18K Rose Gold'
    },
    ageRange: '2-10 years',
    inStock: true,
    isNew: true,
    rating: 4.8
  },
  {
    id: 7,
    name: 'White Flower Chain',
    prices: {
      silver: { priceINR: 2299 },
      gold: { priceINR: 2520 },
      roseGold: { priceINR: 2810 }
    },
    weightGrams: '2-3',
    image: '/images/White Flower Chain Silver.jpg',
    description: 'Elegant white flower-themed chain with delicate floral charms, symbolizing purity and grace',
    wastagePercentage: 15,
    category: 'Chains',
    materials: {
      silver: '92.5 Sterling Silver',
      gold: '18K Gold',
      roseGold: '18K Rose Gold'
    },
    ageRange: '4-14 years',
    inStock: true,
    isNew: false,
    rating: 5.0
  },
  // Earrings Collection
  {
    id: 8,
    name: 'Flower Earrings',
    prices: {
      silver: { priceINR: 990 },
      gold: { priceINR: 1100 },
      roseGold: { priceINR: 1190 }
    },
    image: '/images/earring/flower (s).jpg',
    description: 'Beautiful flower earrings with delicate petals, perfect for your little princess',
    wastagePercentage: 8,
    category: 'Earrings',
    materials: {
      silver: '92.5 Sterling Silver',
      gold: '18K Gold',
      roseGold: '18K Rose Gold'
    },
    ageRange: '3-12 years',
    inStock: true,
    isNew: true,
    rating: 4.8
  },
  {
    id: 9,
    name: 'House Sparrow Earrings',
    prices: {
      silver: { priceINR: 1100 },
      gold: { priceINR: 1299 },
      roseGold: { priceINR: 1250 }
    },
    image: '/images/earring/house sparrow (s).jpg',
    description: 'Charming house sparrow earrings that bring nature\'s beauty to your little one\'s ears',
    wastagePercentage: 10,
    category: 'Earrings',
    materials: {
      silver: '92.5 Sterling Silver',
      gold: '18K Gold',
      roseGold: '18K Rose Gold'
    },
    ageRange: '4-14 years',
    inStock: true,
    isNew: true,
    rating: 4.7
  },
  {
    id: 10,
    name: 'Butterfly Earrings',
    prices: {
      silver: { priceINR: 1099 },
      gold: { priceINR: 1250 },
      roseGold: { priceINR: 1320 }
    },
    image: '/images/earring/the butterfly (s).jpg',
    description: 'Elegant butterfly earrings with graceful wings, symbolizing transformation and beauty',
    wastagePercentage: 12,
    category: 'Earrings',
    materials: {
      silver: '92.5 Sterling Silver',
      gold: '18K Gold',
      roseGold: '18K Rose Gold'
    },
    ageRange: '3-12 years',
    inStock: true,
    isNew: true,
    rating: 4.9
  },
  {
    id: 11,
    name: 'Rose Flower Earrings',
    prices: {
      silver: { priceINR: 1150 },
      gold: { priceINR: 1340 },
      roseGold: { priceINR: 1290 }
    },
    image: '/images/earring/the rose flower (rg).jpg',
    description: 'Romantic rose flower earrings with detailed petals, perfect for your little princess',
    wastagePercentage: 15,
    category: 'Earrings',
    materials: {
      silver: '92.5 Sterling Silver',
      gold: '18K Gold',
      roseGold: '18K Rose Gold'
    },
    ageRange: '4-16 years',
    inStock: true,
    isNew: false,
    rating: 4.8
  },
  {
    id: 12,
    name: 'Silver Elephant Earrings',
    prices: {
      silver: { priceINR: 980 },
      gold: { priceINR: 1190 },
      roseGold: { priceINR: 1310 }
    },
    image: '/images/earring/the silver elephant (s).jpg',
    description: 'Adorable elephant earrings that bring wisdom and good luck to your child',
    wastagePercentage: 18,
    category: 'Earrings',
    materials: {
      silver: '92.5 Sterling Silver',
      gold: '18K Gold',
      roseGold: '18K Rose Gold'
    },
    ageRange: '3-14 years',
    inStock: true,
    isNew: true,
    rating: 4.9
  },
  {
    id: 13,
    name: 'Silver Eye Earrings',
    prices: {
      silver: { priceINR: 1299 },
      gold: { priceINR: 1380 },
      roseGold: { priceINR: 1499 }
    },
    image: '/images/earring/the silver eye (s).jpg',
    description: 'Protective eye earrings designed to ward off evil and bring good fortune',
    wastagePercentage: 8,
    category: 'Earrings',
    materials: {
      silver: '92.5 Sterling Silver',
      gold: '18K Gold',
      roseGold: '18K Rose Gold'
    },
    ageRange: '3-12 years',
    inStock: true,
    isNew: false,
    rating: 4.7
  },
  {
    id: 14,
    name: 'Silver Moon Earrings',
    prices: {
      silver: { priceINR: 990 },
      gold: { priceINR: 1180 },
      roseGold: { priceINR: 1260 }
    },
    image: '/images/earring/the silver moon(s).png',
    description: 'Mystical moon earrings that capture the magic of the night sky',
    wastagePercentage: 6,
    category: 'Earrings',
    materials: {
      silver: '92.5 Sterling Silver',
      gold: '18K Gold',
      roseGold: '18K Rose Gold'
    },
    ageRange: '2-10 years',
    inStock: true,
    isNew: true,
    rating: 4.8
  },
  {
    id: 15,
    name: 'Silver Zebra Earrings',
    prices: {
      silver: { priceINR: 980 },
      gold: { priceINR: 980 },
      roseGold: { priceINR: 980 }
    },
    image: '/images/earring/the silver zebra (s).jpg',
    description: 'Unique zebra earrings with distinctive stripes, perfect for animal lovers',
    wastagePercentage: 14,
    category: 'Earrings',
    materials: {
      silver: '92.5 Sterling Silver',
      gold: '18K Gold',
      roseGold: '18K Rose Gold'
    },
    ageRange: '4-14 years',
    inStock: true,
    isNew: true,
    rating: 4.6
  },
  {
    id: 16,
    name: 'White Elephant Earrings',
    prices: {
      silver: { priceINR: 980 },
      gold: { priceINR: 980 },
      roseGold: { priceINR: 980 }
    },
    image: '/images/earring/white elephant (s).jpg',
    description: 'Pure white elephant earrings symbolizing purity, wisdom, and good fortune',
    wastagePercentage: 16,
    category: 'Earrings',
    materials: {
      silver: '92.5 Sterling Silver',
      gold: '18K Gold',
      roseGold: '18K Rose Gold'
    },
    ageRange: '3-14 years',
    inStock: true,
    isNew: false,
    rating: 4.9
  },
  // Bracelet Collection
  {
    id: 17,
    name: 'House Sparrow Bracelet',
    prices: {
      silver: { priceINR: 1400 },
      gold: { priceINR: 1780 },
      roseGold: { priceINR: 1899 }
    },
    weightGrams: '1-2',
    image: '/images/braclet/house sparrow (s) - card.png',
    description: 'Charming house sparrow bracelet that brings nature\'s beauty to your little one\'s wrist',
    wastagePercentage: 10,
    category: 'Bracelet',
    materials: {
      silver: '92.5 Sterling Silver',
      gold: '18K Gold',
      roseGold: '18K Rose Gold'
    },
    ageRange: '3-12 years',
    inStock: true,
    isNew: true,
    rating: 4.7
  },
  {
    id: 18,
    name: 'Silver Flower Bracelet',
    prices: {
      silver: { priceINR: 2280 },
      gold: { priceINR: 2280 },
      roseGold: { priceINR: 2280 }
    },
    weightGrams: '3-4',
    image: '/images/braclet/the silver flower.jpg',
    description: 'Elegant silver flower bracelet with delicate floral design, perfect for special occasions',
    wastagePercentage: 8,
    category: 'Bracelet',
    materials: {
      silver: '92.5 Sterling Silver',
      gold: '18K Gold',
      roseGold: '18K Rose Gold'
    },
    ageRange: '3-14 years',
    inStock: true,
    isNew: true,
    rating: 4.8
  },
  {
    id: 19,
    name: 'Yellow Elephant Bracelet',
    prices: {
      silver: { priceINR: 1280 },
      gold: { priceINR: 1620 },
      roseGold: { priceINR: 1780 }
    },
    weightGrams: '1-2',
    image: '/images/braclet/the yellow elephant (g) - card.png',
    description: 'Adorable yellow elephant bracelet that brings wisdom and good luck to your child',
    wastagePercentage: 12,
    category: 'Bracelet',
    materials: {
      silver: '92.5 Sterling Silver',
      gold: '18K Gold',
      roseGold: '18K Rose Gold'
    },
    ageRange: '3-12 years',
    inStock: true,
    isNew: false,
    rating: 4.9
  },
  {
    id: 20,
    name: 'Unicorn Bracelet',
    prices: {
      silver: { priceINR: 3499 },
      gold: { priceINR: 3850 },
      roseGold: { priceINR: 3990 }
    },
    weightGrams: '7-8',
    image: '/images/braclet/unicorn bralet(s).jpg',
    description: 'Magical unicorn bracelet with enchanting design, bringing dreams to life',
    wastagePercentage: 9,
    category: 'Bracelet',
    materials: {
      silver: '92.5 Sterling Silver',
      gold: '18K Gold',
      roseGold: '18K Rose Gold'
    },
    ageRange: '2-10 years',
    inStock: true,
    isNew: true,
    rating: 4.8
  },
  // Kada Collection
  {
    id: 22,
    name: 'Minimal Elephant Kada',
    prices: {
      silver: { priceINR: 3299 },
      gold: { priceINR: 3670 },
      roseGold: { priceINR: 3790 }
    },
    weightGrams: '7-8',
    image: '/images/kada/minimal elephant (s).jpg',
    description: 'Elegant minimal elephant kada with clean design, perfect for everyday wear',
    wastagePercentage: 15,
    category: 'Kada',
    materials: {
      silver: '92.5 Sterling Silver',
      gold: '18K Gold',
      roseGold: '18K Rose Gold'
    },
    ageRange: '4-16 years',
    inStock: true,
    isNew: true,
    rating: 4.7
  },
  {
    id: 23,
    name: 'Singaa Kuty Kada',
    prices: {
      silver: { priceINR: 2990 },
      gold: { priceINR: 3799 },
      roseGold: { priceINR: 3499 }
    },
    weightGrams: '7-8',
    image: '/images/kada/Singaa Kuty Kada (s).jpg',
    description: 'Traditional Singaa Kuty kada with cultural significance and beautiful craftsmanship',
    wastagePercentage: 18,
    category: 'Kada',
    materials: {
      silver: '92.5 Sterling Silver',
      gold: '18K Gold',
      roseGold: '18K Rose Gold'
    },
    ageRange: '5-16 years',
    inStock: true,
    isNew: false,
    rating: 4.9
  },
  {
    id: 24,
    name: 'Aladdin Galaxy Star Kada',
    prices: {
      silver: { priceINR: 3430 },
      gold: { priceINR: 3799 },
      roseGold: { priceINR: 3690 }
    },
    weightGrams: '8-9',
    image: '/images/kada/the aladdin galaxy star(s).jpg',
    description: 'Mystical Aladdin galaxy star kada that captures the magic of the night sky',
    wastagePercentage: 11,
    category: 'Kada',
    materials: {
      silver: '92.5 Sterling Silver',
      gold: '18K Gold',
      roseGold: '18K Rose Gold'
    },
    ageRange: '3-12 years',
    inStock: true,
    isNew: true,
    rating: 4.8
  },
  {
    id: 25,
    name: 'Cup Cake Kada',
    prices: {
      silver: { priceINR: 3460 },
      gold: { priceINR: 3690 },
      roseGold: { priceINR: 3799 }
    },
    weightGrams: '8-9',
    image: '/images/kada/The cup cake s.jpg',
    description: 'Sweet cup cake kada that brings joy and playfulness to your child',
    wastagePercentage: 8,
    category: 'Kada',
    materials: {
      silver: '92.5 Sterling Silver',
      gold: '18K Gold',
      roseGold: '18K Rose Gold'
    },
    ageRange: '2-10 years',
    inStock: true,
    isNew: true,
    rating: 4.9
  },
  {
    id: 26,
    name: 'Kid Giraffe Kada',
    prices: {
      silver: { priceINR: 3290 },
      gold: { priceINR: 3570 },
      roseGold: { priceINR: 3799 }
    },
    weightGrams: '8-9',
    image: '/images/kada/The Kid Giraffe kada (s).jpg',
    description: 'Adorable giraffe kada with tall neck design, perfect for animal lovers',
    wastagePercentage: 13,
    category: 'Kada',
    materials: {
      silver: '92.5 Sterling Silver',
      gold: '18K Gold',
      roseGold: '18K Rose Gold'
    },
    ageRange: '3-14 years',
    inStock: true,
    isNew: false,
    rating: 4.6
  },
  {
    id: 27,
    name: 'Pinky Flower Candy Pineapple Kada',
    prices: {
      silver: { priceINR: 3290 },
      gold: { priceINR: 3499 },
      roseGold: { priceINR: 3650 }
    },
    weightGrams: '6-7',
    image: '/images/kada/The pinky flower candy pineapple s.jpg',
    description: 'Colorful pineapple kada with tropical vibes, bringing summer joy',
    wastagePercentage: 10,
    category: 'Kada',
    materials: {
      silver: '92.5 Sterling Silver',
      gold: '18K Gold',
      roseGold: '18K Rose Gold'
    },
    ageRange: '3-12 years',
    inStock: true,
    isNew: true,
    rating: 4.7
  },
  {
    id: 28,
    name: 'Protection Evil Eye Kada',
    prices: {
      silver: { priceINR: 3299 },
      gold: { priceINR: 3699 },
      roseGold: { priceINR: 3760 }
    },
    weightGrams: '7-8',
    image: '/images/kada/The Protection Evil eye (s).jpg',
    description: 'Protective evil eye kada designed to ward off negative energy and bring good fortune',
    wastagePercentage: 7,
    category: 'Kada',
    materials: {
      silver: '92.5 Sterling Silver',
      gold: '18K Gold',
      roseGold: '18K Rose Gold'
    },
    ageRange: '3-14 years',
    inStock: true,
    isNew: false,
    rating: 4.8
  },
  {
    id: 29,
    name: 'Tiger Kada',
    prices: {
      silver: { priceINR: 3299 },
      gold: { priceINR: 3680 },
      roseGold: { priceINR: 3790 }
    },
    weightGrams: '7-8',
    image: '/images/kada/the tiger kada (s).jpg',
    description: 'Bold tiger kada with fierce design, perfect for brave little ones',
    wastagePercentage: 12,
    category: 'Kada',
    materials: {
      silver: '92.5 Sterling Silver',
      gold: '18K Gold',
      roseGold: '18K Rose Gold'
    },
    ageRange: '3-12 years',
    inStock: true,
    isNew: true,
    rating: 4.7
  },
  {
    id: 30,
    name: 'Unicorn Elephant Kada',
    prices: {
      silver: { priceINR: 3290 },
      gold: { priceINR: 3799 },
      roseGold: { priceINR: 3690 }
    },
    weightGrams: '7-8',
    image: '/images/kada/unicorn elephant (s).jpg',
    description: 'Magical unicorn elephant kada combining two beloved creatures in one design',
    wastagePercentage: 14,
    category: 'Kada',
    materials: {
      silver: '92.5 Sterling Silver',
      gold: '18K Gold',
      roseGold: '18K Rose Gold'
    },
    ageRange: '3-14 years',
    inStock: true,
    isNew: true,
    rating: 4.9
  },
  // Nazariya Collection
  {
    id: 32,
    name: 'Butterfly Evil Eye Nazariya',
    prices: {
      silver: { priceINR: 1499 },
      gold: { priceINR: 1650 },
      roseGold: { priceINR: 1799 }
    },
    weightGrams: '2-3',
    image: '/images/nazariya/buterfly evil eye (s).jpg',
    description: 'Beautiful butterfly evil eye nazariya with protective symbolism and elegant design',
    wastagePercentage: 6,
    category: 'Nazariya',
    materials: {
      silver: '92.5 Sterling Silver',
      gold: '18K Gold',
      roseGold: '18K Rose Gold'
    },
    ageRange: '2-10 years',
    inStock: true,
    isNew: true,
    rating: 4.8
  },
  {
    id: 33,
    name: 'Baby Feet Nazariya',
    prices: {
      silver: { priceINR: 1399 },
      gold: { priceINR: 1620 },
      roseGold: { priceINR: 1760 }
    },
    weightGrams: '2-3',
    image: '/images/nazariya/the baby feet (S).jpg',
    description: 'Adorable baby feet nazariya symbolizing the precious journey of childhood',
    wastagePercentage: 5,
    category: 'Nazariya',
    materials: {
      silver: '92.5 Sterling Silver',
      gold: '18K Gold',
      roseGold: '18K Rose Gold'
    },
    ageRange: '2-8 years',
    inStock: true,
    isNew: true,
    rating: 4.9
  },
  {
    id: 34,
    name: 'Lion Nazariya',
    prices: {
      silver: { priceINR: 1450 },
      gold: { priceINR: 1610 },
      roseGold: { priceINR: 1740 }
    },
    weightGrams: '2-3',
    image: '/images/nazariya/the lion (s).jpg',
    description: 'Majestic lion nazariya representing courage, strength, and leadership',
    wastagePercentage: 8,
    category: 'Nazariya',
    materials: {
      silver: '92.5 Sterling Silver',
      gold: '18K Gold',
      roseGold: '18K Rose Gold'
    },
    ageRange: '3-12 years',
    inStock: true,
    isNew: false,
    rating: 4.7
  }
];

export default function ProductSearch({ isMobile = false, onClose }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  // Filter products when search term changes
  useEffect(() => {
    if (searchTerm.trim()) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
      setIsOpen(true);
    } else {
      setFilteredProducts([]);
      setIsOpen(false);
    }
  }, [searchTerm]);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleInputFocus = () => {
    if (searchTerm.trim()) {
      setIsOpen(true);
    }
  };

  const handleInputBlur = () => {
    // Delay closing to allow clicking on results
    setTimeout(() => setIsOpen(false), 150);
  };

  const handleProductClick = () => {
    setSearchTerm('');
    setIsOpen(false);
    if (onClose) {
      onClose();
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const containerClass = isMobile ? 'mobile-search-container' : 'search-container';
  const inputClass = isMobile ? 'mobile-search-input' : 'search-input';

  return (
    <div ref={containerRef} className={containerClass}>
      <div className="search-input-wrapper">
        <FaSearch className="search-icon" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search silver jewelry..."
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          className={inputClass}
          autoComplete="off"
          spellCheck="false"
        />
        {searchTerm && (
          <button onClick={clearSearch} className="clear-search-btn" type="button">
            <FaTimes />
          </button>
        )}
      </div>

      {isOpen && filteredProducts.length > 0 && (
        <div className="search-results">
          <div className="search-results-header">
            <span className="results-count">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
            </span>
          </div>
          <div className="search-results-list">
            {filteredProducts.slice(0, 8).map((product) => (
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
            {filteredProducts.length > 8 && (
              <div className="more-results">
                <p>... and {filteredProducts.length - 8} more results</p>
              </div>
            )}
          </div>
        </div>
      )}

      {isOpen && searchTerm.trim() && filteredProducts.length === 0 && (
        <div className="search-results">
          <div className="no-results">
            <p>No products found for &quot;{searchTerm}&quot;</p>
            <span>Try searching with different keywords</span>
          </div>
        </div>
      )}
    </div>
  );
}