// ========================================
// VARAM SILVERS ADMIN DASHBOARD SCRIPT
// ========================================

// Admin Authentication Functions
const AdminAuth = {
  // Check if admin is logged in
  isLoggedIn() {
    return localStorage.getItem('adminLoggedIn') === 'true';
  },

  // Get admin email
  getAdminEmail() {
    return localStorage.getItem('adminEmail');
  },

  // Login admin
  login(email, password) {
    const adminCredentials = {
      email: 'varam@gmail.com',
      password: 'Varam_silvers@#$'
    };

    if (email === adminCredentials.email && password === adminCredentials.password) {
      localStorage.setItem('adminLoggedIn', 'true');
      localStorage.setItem('adminEmail', email);
      return true;
    }
    return false;
  },

  // Logout admin
  logout() {
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminEmail');
  }
};

// Dashboard Data Management
const DashboardData = {
  // Mock data for dashboard
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
  ],

  // Get dashboard data
  getDashboardData() {
    return {
      stats: this.stats,
      recentOrders: this.recentOrders,
      products: this.products
    };
  },

  // Add new product
  addProduct(product) {
    const newProduct = {
      id: this.products.length + 1,
      ...product,
      status: product.stock > 10 ? 'Active' : product.stock > 0 ? 'Low Stock' : 'Out of Stock'
    };
    this.products.push(newProduct);
    return newProduct;
  },

  // Update product
  updateProduct(id, updates) {
    const index = this.products.findIndex(p => p.id === id);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updates };
      return this.products[index];
    }
    return null;
  },

  // Delete product
  deleteProduct(id) {
    const index = this.products.findIndex(p => p.id === id);
    if (index !== -1) {
      return this.products.splice(index, 1)[0];
    }
    return null;
  }
};

// Utility Functions
const Utils = {
  // Format currency
  formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  },

  // Get status color class
  getStatusColor(status) {
    const statusMap = {
      'Pending': 'status-pending',
      'Processing': 'status-processing',
      'Shipped': 'status-shipped',
      'Delivered': 'status-delivered',
      'Active': 'status-active',
      'Low Stock': 'status-low-stock',
      'Out of Stock': 'status-out-of-stock'
    };
    return statusMap[status] || 'status-default';
  },

  // Show notification
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      color: white;
      font-weight: 500;
      z-index: 10000;
      animation: slideIn 0.3s ease;
    `;

    // Set background color based on type
    const colors = {
      success: '#10b981',
      error: '#ef4444',
      warning: '#f59e0b',
      info: '#3b82f6'
    };
    notification.style.backgroundColor = colors[type] || colors.info;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  },

  // Confirm action
  confirmAction(message) {
    return confirm(message);
  }
};

// Product Management Functions
const ProductManager = {
  // Show add product modal
  showAddProductModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h3>Add New Product</h3>
          <button class="modal-close">&times;</button>
        </div>
        <form class="product-form">
          <div class="form-group">
            <label>Product Name</label>
            <input type="text" name="name" required>
          </div>
          <div class="form-group">
            <label>Price (INR)</label>
            <input type="number" name="price" required>
          </div>
          <div class="form-group">
            <label>Stock Quantity</label>
            <input type="number" name="stock" required>
          </div>
          <div class="form-group">
            <label>Category</label>
            <select name="category" required>
              <option value="">Select Category</option>
              <option value="Chains">Chains</option>
              <option value="Rings">Rings</option>
              <option value="Earrings">Earrings</option>
              <option value="Pendants">Pendants</option>
              <option value="Bracelets">Bracelets</option>
            </select>
          </div>
          <div class="form-actions">
            <button type="button" class="btn-cancel">Cancel</button>
            <button type="submit" class="btn-save">Save Product</button>
          </div>
        </form>
      </div>
    `;

    document.body.appendChild(modal);

    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
      .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
      }
      .modal-content {
        background: white;
        border-radius: 12px;
        padding: 2rem;
        width: 90%;
        max-width: 500px;
        max-height: 90vh;
        overflow-y: auto;
      }
      .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid #e5e7eb;
      }
      .modal-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #6b7280;
      }
      .product-form .form-group {
        margin-bottom: 1rem;
      }
      .product-form label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
        color: #1f2937;
      }
      .product-form input,
      .product-form select {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid #d1d5db;
        border-radius: 6px;
        font-size: 0.9rem;
      }
      .form-actions {
        display: flex;
        gap: 1rem;
        justify-content: flex-end;
        margin-top: 1.5rem;
      }
      .btn-cancel, .btn-save {
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 6px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      .btn-cancel {
        background: #f3f4f6;
        color: #374151;
      }
      .btn-save {
        background: #008080;
        color: white;
      }
      .btn-cancel:hover {
        background: #e5e7eb;
      }
      .btn-save:hover {
        background: #20b2aa;
      }
    `;
    document.head.appendChild(style);

    // Handle form submission
    const form = modal.querySelector('.product-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const product = {
        name: formData.get('name'),
        price: parseInt(formData.get('price')),
        stock: parseInt(formData.get('stock')),
        category: formData.get('category')
      };

      DashboardData.addProduct(product);
      Utils.showNotification('Product added successfully!', 'success');
      document.body.removeChild(modal);
      document.head.removeChild(style);
      // Refresh the dashboard
      window.location.reload();
    });

    // Handle modal close
    const closeBtn = modal.querySelector('.modal-close');
    const cancelBtn = modal.querySelector('.btn-cancel');
    const closeModal = () => {
      document.body.removeChild(modal);
      document.head.removeChild(style);
    };

    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }
};

// Order Management Functions
const OrderManager = {
  // Update order status
  updateOrderStatus(orderId, newStatus) {
    const order = DashboardData.recentOrders.find(o => o.id === orderId);
    if (order) {
      order.status = newStatus;
      Utils.showNotification(`Order ${orderId} status updated to ${newStatus}`, 'success');
      return true;
    }
    return false;
  }
};

// Analytics Functions
const Analytics = {
  // Generate sales report
  generateSalesReport() {
    const totalRevenue = DashboardData.stats.totalRevenue;
    const totalOrders = DashboardData.stats.totalOrders;
    const averageOrderValue = totalRevenue / totalOrders;

    return {
      totalRevenue,
      totalOrders,
      averageOrderValue,
      reportDate: new Date().toLocaleDateString()
    };
  },

  // Get product performance
  getProductPerformance() {
    return DashboardData.products.map(product => ({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
      status: product.status
    }));
  }
};

// Initialize admin dashboard
const AdminDashboard = {
  init() {
    // Check authentication
    if (!AdminAuth.isLoggedIn()) {
      window.location.href = '/admin/login';
      return;
    }

    // Initialize dashboard components
    this.initializeEventListeners();
    this.loadDashboardData();
  },

  initializeEventListeners() {
    // Add product button
    const addProductBtn = document.querySelector('.add-product-btn');
    if (addProductBtn) {
      addProductBtn.addEventListener('click', ProductManager.showAddProductModal);
    }

    // Logout button
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        if (Utils.confirmAction('Are you sure you want to logout?')) {
          AdminAuth.logout();
          window.location.href = '/admin/login';
        }
      });
    }
  },

  loadDashboardData() {
    const data = DashboardData.getDashboardData();
    // Update dashboard with data
    this.updateStats(data.stats);
    this.updateRecentOrders(data.recentOrders);
    this.updateProducts(data.products);
  },

  updateStats(stats) {
    // Update stats cards
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
      const icon = card.querySelector('.stat-icon').textContent;
      if (icon === '🛒') {
        card.querySelector('.stat-content h3').textContent = stats.totalOrders;
      } else if (icon === '💰') {
        card.querySelector('.stat-content h3').textContent = Utils.formatCurrency(stats.totalRevenue);
      } else if (icon === '📦') {
        card.querySelector('.stat-content h3').textContent = stats.totalProducts;
      } else if (icon === '👥') {
        card.querySelector('.stat-content h3').textContent = stats.totalCustomers;
      }
    });
  },

  updateRecentOrders(orders) {
    // Update orders table
    const tbody = document.querySelector('.orders-table tbody');
    if (tbody) {
      tbody.innerHTML = orders.map(order => `
        <tr>
          <td>${order.id}</td>
          <td>${order.customer}</td>
          <td>${Utils.formatCurrency(order.amount)}</td>
          <td><span class="status-badge ${Utils.getStatusColor(order.status)}">${order.status}</span></td>
          <td>${order.date}</td>
          <td>
            <button class="action-btn view-btn" onclick="OrderManager.viewOrder('${order.id}')">👁️</button>
            <button class="action-btn edit-btn" onclick="OrderManager.editOrder('${order.id}')">✏️</button>
          </td>
        </tr>
      `).join('');
    }
  },

  updateProducts(products) {
    // Update products grid
    const productsGrid = document.querySelector('.products-grid');
    if (productsGrid) {
      productsGrid.innerHTML = products.map(product => `
        <div class="product-card">
          <div class="product-info">
            <h4>${product.name}</h4>
            <p class="product-category">${product.category}</p>
            <p class="product-price">${Utils.formatCurrency(product.price)}</p>
            <p class="product-stock">Stock: ${product.stock}</p>
          </div>
          <div class="product-status">
            <span class="status-badge ${Utils.getStatusColor(product.status)}">${product.status}</span>
          </div>
          <div class="product-actions">
            <button class="action-btn edit-btn" onclick="ProductManager.editProduct(${product.id})">✏️</button>
            <button class="action-btn delete-btn" onclick="ProductManager.deleteProduct(${product.id})">🗑️</button>
          </div>
        </div>
      `).join('');
    }
  }
};

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Export functions for global access
window.AdminAuth = AdminAuth;
window.DashboardData = DashboardData;
window.Utils = Utils;
window.ProductManager = ProductManager;
window.OrderManager = OrderManager;
window.Analytics = Analytics;
window.AdminDashboard = AdminDashboard;
