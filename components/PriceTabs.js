'use client';

import { useState } from 'react';

export default function PriceTabs({ product, onMaterialSelect, selectedMaterial = 'silver' }) {
  const [activeTab, setActiveTab] = useState(selectedMaterial);

  const materials = [
    {
      key: 'silver',
      name: 'Silver',
      color: '#C0C0C0'
    },
    {
      key: 'gold',
      name: 'Gold',
      color: '#FFD700'
    },
    {
      key: 'roseGold',
      name: 'Rose Gold',
      color: '#E8B4B8'
    }
  ];

  const handleTabClick = (materialKey) => {
    setActiveTab(materialKey);
    if (onMaterialSelect) {
      onMaterialSelect(materialKey);
    }
  };

  const formatPrice = (priceINR, priceUSD, showUSD = false) => {
    return showUSD ? `$${priceUSD.toFixed(2)}` : `₹${priceINR.toLocaleString('en-IN')}`;
  };

  return (
    <div className="price-tabs-container">
      <div className="price-tabs-header">
        <h3 className="price-tabs-title">Choose Material</h3>
        <p className="price-tabs-subtitle">Select your preferred material and see the pricing</p>
      </div>

      <div className="price-tabs">
        {materials.map((material) => (
          <button
            key={material.key}
            className={`price-tab ${activeTab === material.key ? 'active' : ''}`}
            onClick={() => handleTabClick(material.key)}
            style={{
              '--material-color': material.color
            }}
          >
            <div className="tab-content">
              <span className="tab-name">{material.name}</span>
              <span className="tab-material">{product.materials[material.key]}</span>
            </div>
            <div className="tab-price">
              <span className="price-current">
                {formatPrice(product.prices[material.key].priceINR, product.prices[material.key].priceUSD)}
              </span>
              <span className="price-original">
                {formatPrice(
                  Math.round(product.prices[material.key].priceINR * 1.2),
                  Math.round(product.prices[material.key].priceUSD * 1.2)
                )}
              </span>
            </div>
          </button>
        ))}
      </div>

      <div className="selected-material-info">
        <div className="material-details">
          <div className="material-text">
            <h4 className="material-name">{materials.find(m => m.key === activeTab)?.name}</h4>
            <p className="material-description">{product.materials[activeTab]}</p>
          </div>
        </div>
        <div className="price-breakdown">
          <div className="price-item">
            <span className="price-label">Original Price:</span>
            <span className="price-value original">
              {formatPrice(
                Math.round(product.prices[activeTab].priceINR * 1.2),
                Math.round(product.prices[activeTab].priceUSD * 1.2)
              )}
            </span>
          </div>
          <div className="price-item">
            <span className="price-label">Current Price (Incl. {product.wastagePercentage}% wastage & shipping):</span>
            <span className="price-value current">
              {formatPrice(product.prices[activeTab].priceINR, product.prices[activeTab].priceUSD)}
            </span>
          </div>
          <div className="price-item">
            <span className="price-label">Total Amount:</span>
            <span className="price-value total">
              {formatPrice(product.prices[activeTab].priceINR, product.prices[activeTab].priceUSD)}
            </span>
          </div>
          <div className="price-item">
            <span className="price-label">You Save:</span>
            <span className="price-value savings">
              {formatPrice(
                Math.round(product.prices[activeTab].priceINR * 0.2),
                Math.round(product.prices[activeTab].priceUSD * 0.2)
              )}
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .price-tabs-container {
          background: #ffffff;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
          border: 1px solid rgba(0, 0, 0, 0.06);
        }

        .price-tabs-header {
          margin-bottom: 1.5rem;
          text-align: center;
        }

        .price-tabs-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1a1a1a;
          margin: 0 0 0.5rem 0;
        }

        .price-tabs-subtitle {
          color: #666;
          font-size: 0.9rem;
          margin: 0;
        }

        .price-tabs {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .price-tab {
          flex: 1;
          background: #f8f9fa;
          border: 2px solid #e9ecef;
          border-radius: 8px;
          padding: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .price-tab::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, var(--material-color, #C0C0C0) 0%, transparent 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .price-tab:hover::before {
          opacity: 0.1;
        }

        .price-tab.active {
          border-color: var(--material-color, #C0C0C0);
          background: rgba(var(--material-color, 192, 192, 192), 0.05);
          box-shadow: 0 4px 12px rgba(var(--material-color, 192, 192, 192), 0.2);
        }

        .tab-content {
          margin-bottom: 0.75rem;
          position: relative;
          z-index: 1;
        }

        .tab-name {
          display: block;
          font-weight: 600;
          color: #1a1a1a;
          font-size: 0.9rem;
          margin-bottom: 0.25rem;
        }

        .tab-material {
          display: block;
          font-size: 0.75rem;
          color: #666;
        }

        .tab-price {
          position: relative;
          z-index: 1;
        }

        .price-current {
          display: block;
          font-weight: 600;
          color: #1a1a1a;
          font-size: 0.9rem;
        }

        .price-original {
          display: block;
          font-size: 0.75rem;
          color: #999;
          text-decoration: line-through;
        }

        .selected-material-info {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 1.25rem;
        }

        .material-details {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #e9ecef;
        }

        .material-text {
          flex: 1;
        }

        .material-name {
          font-size: 1.1rem;
          font-weight: 600;
          color: #1a1a1a;
          margin: 0 0 0.25rem 0;
        }

        .material-description {
          color: #666;
          font-size: 0.9rem;
          margin: 0;
        }

        .price-breakdown {
          display: grid;
          gap: 0.75rem;
        }

        .price-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .price-label {
          color: #666;
          font-size: 0.9rem;
        }

        .price-value {
          font-weight: 500;
          font-size: 0.9rem;
        }

        .price-value.original {
          color: #999;
          text-decoration: line-through;
        }

        .price-value.current {
          color: #1a1a1a;
          font-weight: 600;
        }

        .price-value.savings {
          color: #28a745;
          font-weight: 600;
        }

        .price-value.gst {
          color: #007bff;
          font-weight: 500;
        }

        .price-value.total {
          color: #1a1a1a;
          font-weight: 700;
          font-size: 1rem;
          border-top: 1px solid #e9ecef;
          padding-top: 0.5rem;
          margin-top: 0.5rem;
        }

        @media (max-width: 768px) {
          .price-tabs {
            flex-direction: column;
          }
          
          .price-tab {
            flex-direction: row;
            text-align: left;
            align-items: center;
          }
          
          
          .tab-content {
            flex: 1;
            margin-bottom: 0;
            margin-right: 1rem;
          }
          
          .tab-price {
            text-align: right;
          }
        }
      `}</style>
    </div>
  );
}
