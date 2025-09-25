'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [, setAdminEmail] = useState('');
  const router = useRouter();

  // Mock data with today's data
  const today = new Date().toISOString().split('T')[0];
  const dashboardData = {
    stats: {
      todayRevenue: 45000,
      todayOrders: 12,
      totalRevenue: 125000,
      totalCustomers: 234
    },
    recentOrders: [
      { 
        id: 'ORD-001', 
        customer: 'John Doe', 
        email: 'john@example.com',
        phone: '+91 98765 43210',
        amount: 2500, 
        status: 'completed', 
        date: today,
        items: [
          { name: 'Silver Bracelet', quantity: 1, price: 2500 }
        ],
        shipping: {
          address: '123 Main St, Mumbai, Maharashtra 400001',
          method: 'Standard Shipping (India)'
        }
      },
      { 
        id: 'ORD-002', 
        customer: 'Jane Smith', 
        email: 'jane@example.com',
        phone: '+91 98765 43211',
        amount: 1800, 
        status: 'pending', 
        date: today,
        items: [
          { name: 'Gold Ring', quantity: 1, price: 1800 }
        ],
        shipping: {
          address: '456 Park Ave, Delhi, Delhi 110001',
          method: 'Express Shipping (India)'
        }
      },
      { 
        id: 'ORD-003', 
        customer: 'Mike Johnson', 
        email: 'mike@example.com',
        phone: '+91 98765 43212',
        amount: 3200, 
        status: 'processing', 
        date: '2024-01-13',
        items: [
          { name: 'Pearl Necklace', quantity: 1, price: 3200 }
        ],
        shipping: {
          address: '789 Garden Rd, Bangalore, Karnataka 560001',
          method: 'Standard Shipping (India)'
        }
      }
    ]
  };

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

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const handleStatusChange = (orderId, newStatus) => {
    // Update order status logic here
    console.log(`Order ${orderId} status changed to ${newStatus}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminEmail');
    router.push('/admin/login');
  };

  if (isLoading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
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
          <h2>Admin Panel</h2>
        </div>
        
        <nav className="admin-nav">
          <Link href="/admin/dashboard" className="nav-item active">
            🏠 Home
          </Link>
          <Link href="/admin/products" className="nav-item">
            📦 Products
          </Link>
          <button className="nav-item new-product-btn">
            ➕ New Product
          </button>
        </nav>
        
        <div className="admin-sidebar-footer">
          <div className="admin-user-info">
            <div className="user-avatar">A</div>
            <div className="user-details">
              <span className="user-name">Admin User</span>
              <span className="user-role">Administrator</span>
            </div>
          </div>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="admin-main-content">
        <div className="admin-header">
          <div className="header-left">
            <h1>Dashboard</h1>
            <p className="header-subtitle">Welcome back! Here&apos;s what&apos;s happening with your business today.</p>
          </div>
          <div className="admin-header-actions">
            <div className="search-box">
              <input type="text" placeholder="Search orders, customers..." />
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

        <div className="dashboard-content">
          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card revenue-card">
              <div className="stat-icon">💰</div>
              <div className="stat-content">
                <h3>Today&apos;s Revenue</h3>
                <p className="stat-value">₹{dashboardData.stats.todayRevenue.toLocaleString()}</p>
                <span className="stat-change positive">+12.5% from yesterday</span>
              </div>
            </div>
            
            <div className="stat-card orders-card">
              <div className="stat-icon">📦</div>
              <div className="stat-content">
                <h3>Today&apos;s Orders</h3>
                <p className="stat-value">{dashboardData.stats.todayOrders}</p>
                <span className="stat-change positive">+3 from yesterday</span>
              </div>
            </div>
            
            <div className="stat-card total-revenue-card">
              <div className="stat-icon">📊</div>
              <div className="stat-content">
                <h3>Total Revenue</h3>
                <p className="stat-value">₹{dashboardData.stats.totalRevenue.toLocaleString()}</p>
                <span className="stat-change positive">+8.2% this month</span>
              </div>
            </div>
            
            <div className="stat-card customers-card">
              <div className="stat-icon">👥</div>
              <div className="stat-content">
                <h3>Total Customers</h3>
                <p className="stat-value">{dashboardData.stats.totalCustomers}</p>
                <span className="stat-change positive">+15 new this week</span>
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="dashboard-section">
            <div className="section-header">
              <h3>Recent Orders</h3>
              <Link href="/admin/orders" className="view-all-btn">View All Orders</Link>
            </div>
            
            <div className="orders-table">
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData.recentOrders.map((order) => (
                    <tr key={order.id}>
                      <td>
                        <button 
                          className="order-id-link"
                          onClick={() => handleOrderClick(order)}
                        >
                          {order.id}
                        </button>
                      </td>
                      <td>
                        <div className="customer-info">
                          <span className="customer-name">{order.customer}</span>
                          <span className="customer-email">{order.email}</span>
                        </div>
                      </td>
                      <td>₹{order.amount.toLocaleString()}</td>
                      <td>{order.date}</td>
                      <td>
                        <select 
                          className={`status-select ${order.status}`}
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td>
                        <button 
                          className="action-btn view-btn"
                          onClick={() => handleOrderClick(order)}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Charts Section */}
          <div className="dashboard-section">
            <div className="section-header">
              <h3>Analytics</h3>
            </div>
            
            <div className="charts-grid">
              <div className="chart-card">
                <h4>Sales & Revenue</h4>
                <div className="chart-placeholder">
                  <div className="chart-mock">
                    <div className="chart-bars">
                      <div className="bar" style={{height: '60%'}}></div>
                      <div className="bar" style={{height: '80%'}}></div>
                      <div className="bar" style={{height: '45%'}}></div>
                      <div className="bar" style={{height: '90%'}}></div>
                      <div className="bar" style={{height: '70%'}}></div>
                      <div className="bar" style={{height: '85%'}}></div>
                      <div className="bar" style={{height: '95%'}}></div>
                    </div>
                    <div className="chart-labels">
                      <span>Mon</span>
                      <span>Tue</span>
                      <span>Wed</span>
                      <span>Thu</span>
                      <span>Fri</span>
                      <span>Sat</span>
                      <span>Sun</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="chart-card">
                <h4>Stock Levels</h4>
                <div className="chart-placeholder">
                  <div className="stock-chart">
                    <div className="stock-item">
                      <span>Silver Bracelets</span>
                      <div className="stock-bar">
                        <div className="stock-fill" style={{width: '75%'}}></div>
                      </div>
                      <span>15/20</span>
                    </div>
                    <div className="stock-item">
                      <span>Gold Rings</span>
                      <div className="stock-bar">
                        <div className="stock-fill" style={{width: '40%'}}></div>
                      </div>
                      <span>8/20</span>
                    </div>
                    <div className="stock-item">
                      <span>Pearl Necklaces</span>
                      <div className="stock-bar">
                        <div className="stock-fill" style={{width: '0%'}}></div>
                      </div>
                      <span>0/10</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Order Details Modal */}
      {showOrderModal && selectedOrder && (
        <div className="modal-overlay" onClick={() => setShowOrderModal(false)}>
          <div className="modal-content order-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Order Details - {selectedOrder.id}</h2>
              <button 
                className="modal-close"
                onClick={() => setShowOrderModal(false)}
              >
                ×
              </button>
            </div>
            
            <div className="order-details">
              <div className="order-info">
                <div className="info-section">
                  <h3>Customer Information</h3>
                  <p><strong>Name:</strong> {selectedOrder.customer}</p>
                  <p><strong>Email:</strong> {selectedOrder.email}</p>
                  <p><strong>Phone:</strong> {selectedOrder.phone}</p>
                </div>
                
                <div className="info-section">
                  <h3>Order Information</h3>
                  <p><strong>Order ID:</strong> {selectedOrder.id}</p>
                  <p><strong>Date:</strong> {selectedOrder.date}</p>
                  <p><strong>Status:</strong> 
                    <span className={`status-badge ${selectedOrder.status}`}>
                      {selectedOrder.status}
                    </span>
                  </p>
                  <p><strong>Total Amount:</strong> ₹{selectedOrder.amount.toLocaleString()}</p>
                </div>
                
                <div className="info-section">
                  <h3>Shipping Information</h3>
                  <p><strong>Address:</strong> {selectedOrder.shipping.address}</p>
                  <p><strong>Method:</strong> {selectedOrder.shipping.method}</p>
                </div>
              </div>
              
              <div className="order-items">
                <h3>Order Items</h3>
                <table className="items-table">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>₹{item.price.toLocaleString()}</td>
                        <td>₹{(item.quantity * item.price).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                className="btn btn-secondary"
                onClick={() => setShowOrderModal(false)}
              >
                Close
              </button>
              <button className="btn btn-primary">
                Print Invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}