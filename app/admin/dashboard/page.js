'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import Image from 'next/image';

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [adminEmail, setAdminEmail] = useState('');
  const router = useRouter();

  // Mock data for dashboard
  const [dashboardData] = useState({
    stats: {
      totalOrders: 156,
      totalRevenue: 245000,
      totalProducts: 89,
      totalCustomers: 234,
      pendingOrders: 12,
      lowStockItems: 8
    },
    recentOrders: [
      { id: 'ORD-001', customer: 'Priya Sharma', amount: 2500, status: 'Pending', date: '2024-01-15' },
      { id: 'ORD-002', customer: 'Raj Kumar', amount: 1800, status: 'Shipped', date: '2024-01-14' },
      { id: 'ORD-003', customer: 'Sneha Patel', amount: 3200, status: 'Delivered', date: '2024-01-13' },
      { id: 'ORD-004', customer: 'Amit Singh', amount: 1500, status: 'Processing', date: '2024-01-12' }
    ],
    products: [
      { id: 1, name: 'Silver Chain', price: 1200, stock: 15, category: 'Chains', status: 'Active' },
      { id: 2, name: 'Gold Ring', price: 2500, stock: 3, category: 'Rings', status: 'Low Stock' },
      { id: 3, name: 'Pearl Earrings', price: 1800, stock: 22, category: 'Earrings', status: 'Active' },
      { id: 4, name: 'Diamond Pendant', price: 4500, stock: 0, category: 'Pendants', status: 'Out of Stock' }
    ]
  });

  useEffect(() => {
    // Check admin authentication
    const adminLoggedIn = localStorage.getItem('adminLoggedIn');
    const email = localStorage.getItem('adminEmail');
    
    if (!adminLoggedIn || !email) {
      router.push('/admin/login');
      return;
    }
    
    setAdminEmail(email);
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
      case 'Pending': return 'status-pending';
      case 'Processing': return 'status-processing';
      case 'Shipped': return 'status-shipped';
      case 'Delivered': return 'status-delivered';
      case 'Active': return 'status-active';
      case 'Low Stock': return 'status-low-stock';
      case 'Out of Stock': return 'status-out-of-stock';
      default: return 'status-default';
    }
  };

  if (isLoading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Loading Admin Dashboard...</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Admin Dashboard - Varam Silvers</title>
      </Head>
      <div className="admin-dashboard">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <div className="admin-sidebar-header">
          <Image 
            src="/images/Varam Silvers Logo.jpg" 
            alt="Varam Silvers" 
            width={60} 
            height={40}
            priority
          />
          <h3>Admin Panel</h3>
        </div>
        
        <nav className="admin-nav">
          <button 
            className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            📊 Overview
          </button>
          <button 
            className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            🛒 Orders
          </button>
          <button 
            className={`nav-item ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            📦 Products
          </button>
          <button 
            className={`nav-item ${activeTab === 'customers' ? 'active' : ''}`}
            onClick={() => setActiveTab('customers')}
          >
            👥 Customers
          </button>
          <button 
            className={`nav-item ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            📈 Analytics
          </button>
          <button 
            className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
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
            <h1>Varam Silvers Admin</h1>
            <p className="header-subtitle">Manage your jewelry business efficiently</p>
          </div>
          <div className="admin-header-actions">
            <div className="search-box">
              <input type="text" placeholder="Search..." />
              <span className="search-icon">🔍</span>
            </div>
            <button className="notification-btn">
              🔔
              <span className="notification-badge">3</span>
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

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="dashboard-content">
            {/* Stats Cards */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">🛒</div>
                <div className="stat-content">
                  <h3>{dashboardData.stats.totalOrders}</h3>
                  <p>Total Orders</p>
                  <span className="stat-change positive">+12% this month</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">💰</div>
                <div className="stat-content">
                  <h3>{formatCurrency(dashboardData.stats.totalRevenue)}</h3>
                  <p>Total Revenue</p>
                  <span className="stat-change positive">+8% this month</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">📦</div>
                <div className="stat-content">
                  <h3>{dashboardData.stats.totalProducts}</h3>
                  <p>Total Products</p>
                  <span className="stat-change neutral">+2 this month</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">👥</div>
                <div className="stat-content">
                  <h3>{dashboardData.stats.totalCustomers}</h3>
                  <p>Total Customers</p>
                  <span className="stat-change positive">+15% this month</span>
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="dashboard-section">
              <div className="section-header">
                <h2>Recent Orders</h2>
                <button className="view-all-btn">View All</button>
              </div>
              <div className="orders-table">
                <table>
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardData.recentOrders.map((order) => (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.customer}</td>
                        <td>{formatCurrency(order.amount)}</td>
                        <td>
                          <span className={`status-badge ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td>{order.date}</td>
                        <td>
                          <button className="action-btn view-btn">👁️</button>
                          <button className="action-btn edit-btn">✏️</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Product Status */}
            <div className="dashboard-section">
              <div className="section-header">
                <h2>Product Status</h2>
                <button className="add-product-btn">➕ Add Product</button>
              </div>
              <div className="products-grid">
                {dashboardData.products.map((product) => (
                  <div key={product.id} className="product-card">
                    <div className="product-info">
                      <h4>{product.name}</h4>
                      <p className="product-category">{product.category}</p>
                      <p className="product-price">{formatCurrency(product.price)}</p>
                      <p className="product-stock">Stock: {product.stock}</p>
                    </div>
                    <div className="product-status">
                      <span className={`status-badge ${getStatusColor(product.status)}`}>
                        {product.status}
                      </span>
                    </div>
                    <div className="product-actions">
                      <button className="action-btn edit-btn">✏️</button>
                      <button className="action-btn delete-btn">🗑️</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Other tabs content */}
        {activeTab === 'orders' && (
          <div className="dashboard-content">
            <h2>Orders Management</h2>
            <p>Order management features will be implemented here.</p>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="dashboard-content">
            <h2>Products Management</h2>
            <p>Product management features will be implemented here.</p>
          </div>
        )}

        {activeTab === 'customers' && (
          <div className="dashboard-content">
            <h2>Customers Management</h2>
            <p>Customer management features will be implemented here.</p>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="dashboard-content">
            <h2>Analytics & Reports</h2>
            <p>Analytics and reporting features will be implemented here.</p>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="dashboard-content">
            <h2>Settings</h2>
            <p>System settings and configuration will be implemented here.</p>
          </div>
        )}
      </div>
      </div>
    </>
  );
}
