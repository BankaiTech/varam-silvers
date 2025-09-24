'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Mock products data
const mockProducts = [
  { id: 1, name: 'Silver Chain', price: 1200, stock: 15, category: 'Chains', status: 'Active', description: 'Beautiful silver chain for children' },
  { id: 2, name: 'Gold Ring', price: 2500, stock: 3, category: 'Rings', status: 'Low Stock', description: 'Elegant gold ring with gemstone' },
  { id: 3, name: 'Pearl Earrings', price: 1800, stock: 22, category: 'Earrings', status: 'Active', description: 'Classic pearl earrings for special occasions' },
  { id: 4, name: 'Diamond Pendant', price: 4500, stock: 0, category: 'Pendants', status: 'Out of Stock', description: 'Luxury diamond pendant necklace' },
  { id: 5, name: 'Silver Bracelet', price: 1500, stock: 8, category: 'Bracelets', status: 'Active', description: 'Delicate silver bracelet for kids' },
  { id: 6, name: 'Ruby Ring', price: 3200, stock: 5, category: 'Rings', status: 'Low Stock', description: 'Stunning ruby ring with silver setting' }
];

export default function ProductManagement() {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [adminEmail, setAdminEmail] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Check admin authentication
    const adminLoggedIn = localStorage.getItem('adminLoggedIn');
    const email = localStorage.getItem('adminEmail');
    
    if (!adminLoggedIn || !email) {
      router.push('/admin/login');
      return;
    }
    
    setAdminEmail(email);
    setProducts(mockProducts);
    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminEmail');
    router.push('/admin/login');
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'status-active';
      case 'Low Stock': return 'status-low-stock';
      case 'Out of Stock': return 'status-out-of-stock';
      default: return 'status-default';
    }
  };

  const handleAddProduct = (productData) => {
    const newProduct = {
      id: products.length + 1,
      ...productData,
      status: productData.stock > 10 ? 'Active' : productData.stock > 0 ? 'Low Stock' : 'Out of Stock'
    };
    setProducts([...products, newProduct]);
    setShowAddModal(false);
  };

  const handleEditProduct = (productData) => {
    setProducts(products.map(p => 
      p.id === editingProduct.id 
        ? { ...p, ...productData, status: productData.stock > 10 ? 'Active' : productData.stock > 0 ? 'Low Stock' : 'Out of Stock' }
        : p
    ));
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  if (isLoading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Loading Products...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <div className="admin-sidebar-header">
          <Image 
            src="/images/varam_silvers_logo.png" 
            alt="Varam Silvers" 
            width={60} 
            height={40}
            priority
          />
          <h3>Admin Panel</h3>
        </div>
        
        <nav className="admin-nav">
          <button className="nav-item" onClick={() => router.push('/admin/dashboard')}>
            📊 Overview
          </button>
          <button className="nav-item" onClick={() => router.push('/admin/orders')}>
            🛒 Orders
          </button>
          <button className="nav-item active">
            📦 Products
          </button>
          <button className="nav-item" onClick={() => router.push('/admin/customers')}>
            👥 Customers
          </button>
          <button className="nav-item" onClick={() => router.push('/admin/analytics')}>
            📈 Analytics
          </button>
          <button className="nav-item" onClick={() => router.push('/admin/settings')}>
            ⚙️ Settings
          </button>
        </nav>

        <div className="admin-sidebar-footer">
          <div className="admin-user-info">
            <p><strong>{adminEmail}</strong></p>
            <p>Administrator</p>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="admin-main-content">
        <div className="admin-header">
          <div className="header-left">
            <h1>Product Management</h1>
            <p className="header-subtitle">Manage your jewelry inventory efficiently</p>
          </div>
          <div className="admin-header-actions">
            <div className="search-box">
              <input type="text" placeholder="Search products..." />
              <span className="search-icon">🔍</span>
            </div>
            <button className="notification-btn">
              🔔
              <span className="notification-badge">2</span>
            </button>
            <div className="user-profile">
              <div className="profile-avatar">VS</div>
              <div className="profile-info">
                <span className="profile-name">Admin</span>
                <span className="profile-role">Administrator</span>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-content">
          {/* Products Table */}
          <div className="dashboard-section">
            <div className="section-header">
              <h2>All Products ({products.length})</h2>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <select className="filter-select" style={{
                  padding: '0.5rem 1rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  background: 'white'
                }}>
                  <option value="">All Categories</option>
                  <option value="Chains">Chains</option>
                  <option value="Rings">Rings</option>
                  <option value="Earrings">Earrings</option>
                  <option value="Pendants">Pendants</option>
                  <option value="Bracelets">Bracelets</option>
                </select>
                <select className="filter-select" style={{
                  padding: '0.5rem 1rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  background: 'white'
                }}>
                  <option value="">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Low Stock">Low Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
                <button 
                  className="add-product-btn"
                  onClick={() => setShowAddModal(true)}
                >
                  ➕ Add New Product
                </button>
              </div>
            </div>
            
            <div className="products-table">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Product Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>
                        <div className="product-name">
                          <strong>{product.name}</strong>
                          <small>{product.description}</small>
                        </div>
                      </td>
                      <td>{product.category}</td>
                      <td>{formatCurrency(product.price)}</td>
                      <td>{product.stock}</td>
                      <td>
                        <span className={`status-badge ${getStatusColor(product.status)}`}>
                          {product.status}
                        </span>
                      </td>
                      <td>
                        <button 
                          className="action-btn edit-btn"
                          onClick={() => setEditingProduct(product)}
                        >
                          ✏️
                        </button>
                        <button 
                          className="action-btn delete-btn"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <ProductModal
          onClose={() => setShowAddModal(false)}
          onSave={handleAddProduct}
        />
      )}

      {/* Edit Product Modal */}
      {editingProduct && (
        <ProductModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSave={handleEditProduct}
        />
      )}
    </div>
  );
}

// Product Modal Component
function ProductModal({ product, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    price: product?.price || '',
    stock: product?.stock || '',
    category: product?.category || '',
    description: product?.description || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>{product ? 'Edit Product' : 'Add New Product'}</h3>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-group">
            <label>Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Price (INR)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Stock Quantity</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option value="Chains">Chains</option>
              <option value="Rings">Rings</option>
              <option value="Earrings">Earrings</option>
              <option value="Pendants">Pendants</option>
              <option value="Bracelets">Bracelets</option>
            </select>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              required
            />
          </div>
          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-save">
              {product ? 'Update Product' : 'Save Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
