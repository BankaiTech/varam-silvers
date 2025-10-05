// ========================================
// VARAM SILVERS ADMIN DASHBOARD
// API Client and Utilities
// ========================================

// API Configuration
const API_CONFIG = {
  BASE_URL: '', // Leave empty as requested
  ENDPOINTS: {
    STATS: '/stats',
    PRODUCTS: '/products',
    PRODUCT_BY_ID: '/products/:id',
    INVENTORY: '/inventory',
    TOP_PRODUCTS: '/products/top'
  }
};

// API Client
class APIClient {
  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = this.baseURL + endpoint;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Get dashboard statistics
  async getStats() {
    try {
      return await this.request(API_CONFIG.ENDPOINTS.STATS);
    } catch (error) {
      console.warn('Stats API not available, returning empty data');
      return {
        perDaySales: 0,
        currentMonthSales: 0,
        yearlySales: 0,
        overallSales: 0
      };
    }
  }

  // Get products with pagination
  async getProducts(page = 1, limit = 10, search = '', filters = {}) {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        search: search,
        ...filters
      });
      
      return await this.request(`${API_CONFIG.ENDPOINTS.PRODUCTS}?${params}`);
    } catch (error) {
      console.warn('Products API not available, returning empty data');
      return {
        data: [],
        pagination: {
          currentPage: 1,
          totalPages: 0,
          totalItems: 0,
          itemsPerPage: 10
        }
      };
    }
  }

  // Get single product by ID
  async getProduct(id) {
    try {
      const endpoint = API_CONFIG.ENDPOINTS.PRODUCT_BY_ID.replace(':id', id);
      return await this.request(endpoint);
    } catch (error) {
      console.warn(`Product ${id} API not available, returning null`);
      return null;
    }
  }

  // Create new product
  async createProduct(productData) {
    try {
      return await this.request(API_CONFIG.ENDPOINTS.PRODUCTS, {
        method: 'POST',
        body: JSON.stringify(productData)
      });
    } catch (error) {
      console.warn('Create product API not available');
      throw error;
    }
  }

  // Update product
  async updateProduct(id, productData) {
    try {
      const endpoint = API_CONFIG.ENDPOINTS.PRODUCT_BY_ID.replace(':id', id);
      return await this.request(endpoint, {
        method: 'PUT',
        body: JSON.stringify(productData)
      });
    } catch (error) {
      console.warn(`Update product ${id} API not available`);
      throw error;
    }
  }

  // Get inventory data
  async getInventory(page = 1, limit = 10, search = '', filters = {}) {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        search: search,
        ...filters
      });
      
      return await this.request(`${API_CONFIG.ENDPOINTS.INVENTORY}?${params}`);
    } catch (error) {
      console.warn('Inventory API not available, returning empty data');
      return {
        data: [],
        pagination: {
          currentPage: 1,
          totalPages: 0,
          totalItems: 0,
          itemsPerPage: 10
        }
      };
    }
  }

  // Get top products
  async getTopProducts(limit = 5) {
    try {
      return await this.request(`${API_CONFIG.ENDPOINTS.TOP_PRODUCTS}?limit=${limit}`);
    } catch (error) {
      console.warn('Top products API not available, returning empty data');
      return [];
    }
  }
}

// Utility Functions
class Utils {
  // Format currency
  static formatCurrency(amount, currency = 'INR') {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency
    }).format(amount);
  }

  // Format number with commas
  static formatNumber(number) {
    return new Intl.NumberFormat('en-IN').format(number);
  }

  // Show toast notification
  static showToast(message, type = 'info', duration = 3000) {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;

    toastContainer.appendChild(toast);

    // Auto remove after duration
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, duration);
  }

  // Show loading state
  static showLoading(element, message = 'Loading...') {
    if (!element) return;
    
    element.innerHTML = `
      <div class="loading-cell">
        <div class="loading-spinner"></div>
        ${message}
      </div>
    `;
  }

  // Show no data state
  static showNoData(element, message = 'No data available') {
    if (!element) return;
    
    element.innerHTML = `
      <tr class="no-data-row">
        <td colspan="100%" class="no-data-cell">${message}</td>
      </tr>
    `;
  }

  // Debounce function
  static debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Validate email
  static isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Validate required fields
  static validateRequired(fields) {
    const errors = {};
    
    fields.forEach(field => {
      const element = document.getElementById(field.id);
      if (!element) return;
      
      const value = element.value.trim();
      if (!value) {
        errors[field.id] = field.message || `${field.label} is required`;
        this.showFieldError(field.id, errors[field.id]);
      } else {
        this.clearFieldError(field.id);
      }
    });
    
    return Object.keys(errors).length === 0;
  }

  // Show field error
  static showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(`${fieldId}Error`);
    
    if (field) {
      field.style.borderColor = 'var(--error)';
    }
    
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.classList.add('show');
    }
  }

  // Clear field error
  static clearFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(`${fieldId}Error`);
    
    if (field) {
      field.style.borderColor = '';
    }
    
    if (errorElement) {
      errorElement.textContent = '';
      errorElement.classList.remove('show');
    }
  }

  // Get URL parameters
  static getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const result = {};
    for (const [key, value] of params) {
      result[key] = value;
    }
    return result;
  }

  // Set URL parameter
  static setUrlParam(key, value) {
    const url = new URL(window.location);
    url.searchParams.set(key, value);
    window.history.replaceState({}, '', url);
  }
}

// Data Table Manager
class DataTableManager {
  constructor(tableId, options = {}) {
    this.table = document.getElementById(tableId);
    this.tbody = this.table?.querySelector('tbody');
    this.options = {
      pageSize: 10,
      currentPage: 1,
      sortColumn: '',
      sortDirection: 'asc',
      searchTerm: '',
      filters: {},
      ...options
    };
    this.data = [];
    this.filteredData = [];
    this.apiClient = new APIClient();
    
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.loadData();
  }

  setupEventListeners() {
    // Search functionality
    const searchInput = document.querySelector('input[type="text"]');
    if (searchInput) {
      searchInput.addEventListener('input', Utils.debounce((e) => {
        this.options.searchTerm = e.target.value;
        this.currentPage = 1;
        this.loadData();
      }, 300));
    }

    // Sort functionality
    const sortableHeaders = this.table?.querySelectorAll('th[data-sort]');
    sortableHeaders?.forEach(header => {
      header.addEventListener('click', () => {
        const column = header.dataset.sort;
        this.sort(column);
      });
    });

    // Pagination
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    
    if (prevBtn) {
      prevBtn.addEventListener('click', () => this.previousPage());
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.nextPage());
    }
  }

  async loadData() {
    try {
      Utils.showLoading(this.tbody);
      
      const response = await this.apiClient.getProducts(
        this.options.currentPage,
        this.options.pageSize,
        this.options.searchTerm,
        this.options.filters
      );
      
      this.data = response.data || [];
      this.updateTable();
      this.updatePagination(response.pagination);
      
    } catch (error) {
      console.error('Failed to load data:', error);
      Utils.showNoData(this.tbody, 'No data available');
    }
  }

  updateTable() {
    if (!this.tbody) return;
    
    if (this.data.length === 0) {
      Utils.showNoData(this.tbody, 'No data available');
      return;
    }
    
    this.tbody.innerHTML = this.data.map(item => this.renderRow(item)).join('');
  }

  renderRow(item) {
    // Override this method in subclasses
    return `<tr><td>${JSON.stringify(item)}</td></tr>`;
  }

  updatePagination(pagination) {
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    const paginationInfo = document.getElementById('paginationInfo');
    const paginationPages = document.getElementById('paginationPages');
    
    if (prevBtn) {
      prevBtn.disabled = pagination.currentPage <= 1;
    }
    
    if (nextBtn) {
      nextBtn.disabled = pagination.currentPage >= pagination.totalPages;
    }
    
    if (paginationInfo) {
      const start = (pagination.currentPage - 1) * pagination.itemsPerPage + 1;
      const end = Math.min(start + pagination.itemsPerPage - 1, pagination.totalItems);
      paginationInfo.textContent = `Showing ${start}-${end} of ${pagination.totalItems} items`;
    }
    
    if (paginationPages) {
      this.renderPaginationPages(pagination);
    }
  }

  renderPaginationPages(pagination) {
    const pages = [];
    const currentPage = pagination.currentPage;
    const totalPages = pagination.totalPages;
    
    // Show first page
    if (currentPage > 3) {
      pages.push(this.createPageButton(1));
      if (currentPage > 4) {
        pages.push('<span class="pagination-ellipsis">...</span>');
      }
    }
    
    // Show pages around current page
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);
    
    for (let i = start; i <= end; i++) {
      pages.push(this.createPageButton(i, i === currentPage));
    }
    
    // Show last page
    if (currentPage < totalPages - 2) {
      if (currentPage < totalPages - 3) {
        pages.push('<span class="pagination-ellipsis">...</span>');
      }
      pages.push(this.createPageButton(totalPages));
    }
    
    paginationPages.innerHTML = pages.join('');
    
    // Add click listeners to page buttons
    paginationPages.querySelectorAll('.page-number').forEach(btn => {
      btn.addEventListener('click', () => {
        const page = parseInt(btn.dataset.page);
        this.goToPage(page);
      });
    });
  }

  createPageButton(page, active = false) {
    return `<button class="page-number ${active ? 'active' : ''}" data-page="${page}">${page}</button>`;
  }

  sort(column) {
    if (this.options.sortColumn === column) {
      this.options.sortDirection = this.options.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.options.sortColumn = column;
      this.options.sortDirection = 'asc';
    }
    
    this.loadData();
  }

  previousPage() {
    if (this.options.currentPage > 1) {
      this.options.currentPage--;
      this.loadData();
    }
  }

  nextPage() {
    this.options.currentPage++;
    this.loadData();
  }

  goToPage(page) {
    this.options.currentPage = page;
    this.loadData();
  }
}

// Form Manager
class FormManager {
  constructor(formId, options = {}) {
    this.form = document.getElementById(formId);
    this.options = {
      validateOnSubmit: true,
      showLoadingOnSubmit: true,
      ...options
    };
    
    this.init();
  }

  init() {
    if (!this.form) return;
    
    this.setupEventListeners();
    this.setupValidation();
  }

  setupEventListeners() {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    
    // Real-time validation
    const inputs = this.form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearFieldError(input.id));
    });
  }

  setupValidation() {
    // Add custom validation rules
    this.addValidationRule('required', (value) => value.trim() !== '', 'This field is required');
    this.addValidationRule('email', (value) => Utils.isValidEmail(value), 'Please enter a valid email');
    this.addValidationRule('number', (value) => !isNaN(value) && value !== '', 'Please enter a valid number');
    this.addValidationRule('min', (value, min) => parseFloat(value) >= min, `Value must be at least ${min}`);
    this.addValidationRule('max', (value, max) => parseFloat(value) <= max, `Value must be at most ${max}`);
  }

  addValidationRule(name, validator, message) {
    this.validationRules = this.validationRules || {};
    this.validationRules[name] = { validator, message };
  }

  validateField(input) {
    const rules = input.dataset.validation?.split(' ') || [];
    const value = input.value.trim();
    
    for (const rule of rules) {
      const [ruleName, ...params] = rule.split(':');
      const ruleConfig = this.validationRules?.[ruleName];
      
      if (ruleConfig) {
        const isValid = ruleConfig.validator(value, ...params);
        if (!isValid) {
          Utils.showFieldError(input.id, ruleConfig.message);
          return false;
        }
      }
    }
    
    Utils.clearFieldError(input.id);
    return true;
  }

  clearFieldError(fieldId) {
    Utils.clearFieldError(fieldId);
  }

  async handleSubmit(e) {
    e.preventDefault();
    
    if (this.options.validateOnSubmit && !this.validateForm()) {
      return;
    }
    
    if (this.options.showLoadingOnSubmit) {
      this.showLoadingState();
    }
    
    try {
      const formData = this.getFormData();
      await this.submitForm(formData);
    } catch (error) {
      console.error('Form submission failed:', error);
      Utils.showToast('Form submission failed. Please try again.', 'error');
    } finally {
      this.hideLoadingState();
    }
  }

  validateForm() {
    const requiredFields = this.form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });
    
    return isValid;
  }

  getFormData() {
    const formData = new FormData(this.form);
    const data = {};
    
    for (const [key, value] of formData.entries()) {
      if (data[key]) {
        // Handle multiple values (like checkboxes)
        if (Array.isArray(data[key])) {
          data[key].push(value);
        } else {
          data[key] = [data[key], value];
        }
      } else {
        data[key] = value;
      }
    }
    
    return data;
  }

  async submitForm(data) {
    // Override this method in subclasses
    console.log('Form data:', data);
  }

  showLoadingState() {
    const submitBtn = this.form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      const btnText = submitBtn.querySelector('.btn-text');
      const btnLoading = submitBtn.querySelector('.btn-loading');
      
      if (btnText) btnText.style.display = 'none';
      if (btnLoading) btnLoading.style.display = 'flex';
    }
  }

  hideLoadingState() {
    const submitBtn = this.form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = false;
      const btnText = submitBtn.querySelector('.btn-text');
      const btnLoading = submitBtn.querySelector('.btn-loading');
      
      if (btnText) btnText.style.display = 'inline';
      if (btnLoading) btnLoading.style.display = 'none';
    }
  }
}

// Mobile Menu Handler
class MobileMenuHandler {
  constructor() {
    this.toggle = document.getElementById('mobileMenuToggle');
    this.menu = document.getElementById('navbarMenu');
    
    this.init();
  }

  init() {
    if (this.toggle && this.menu) {
      this.toggle.addEventListener('click', () => this.toggleMenu());
      
      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!this.menu.contains(e.target) && !this.toggle.contains(e.target)) {
          this.closeMenu();
        }
      });
    }
  }

  toggleMenu() {
    this.menu.classList.toggle('active');
  }

  closeMenu() {
    this.menu.classList.remove('active');
  }
}

// Initialize admin components
document.addEventListener('DOMContentLoaded', () => {
  // Initialize mobile menu
  new MobileMenuHandler();
  
  // Initialize common functionality
  initializeCommonFeatures();
});

function initializeCommonFeatures() {
  // Handle file upload previews
  const fileInputs = document.querySelectorAll('input[type="file"]');
  fileInputs.forEach(input => {
    input.addEventListener('change', handleFilePreview);
  });
  
  // Handle category selection
  const categorySelect = document.getElementById('productCategory');
  const customCategoryInput = document.getElementById('customCategory');
  
  if (categorySelect && customCategoryInput) {
    categorySelect.addEventListener('change', (e) => {
      if (e.target.value === 'custom') {
        customCategoryInput.style.display = 'block';
        customCategoryInput.required = true;
      } else {
        customCategoryInput.style.display = 'none';
        customCategoryInput.required = false;
      }
    });
  }
  
  // Handle material pricing
  const materialCheckboxes = document.querySelectorAll('input[name="materials"]');
  const pricingContainer = document.getElementById('materialPricingContainer');
  
  if (materialCheckboxes.length && pricingContainer) {
    materialCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', updateMaterialPricing);
    });
  }
}

function handleFilePreview(e) {
  const file = e.target.files[0];
  const preview = document.getElementById('previewImage');
  const placeholder = document.getElementById('uploadPlaceholder');
  const filePreview = document.getElementById('filePreview');
  
  if (file && preview && filePreview) {
    const reader = new FileReader();
    reader.onload = (e) => {
      preview.src = e.target.result;
      filePreview.style.display = 'block';
      if (placeholder) placeholder.style.display = 'none';
    };
    reader.readAsDataURL(file);
  }
}

function updateMaterialPricing() {
  const selectedMaterials = Array.from(document.querySelectorAll('input[name="materials"]:checked'))
    .map(cb => cb.value);
  
  const container = document.getElementById('materialPricingContainer');
  if (!container) return;
  
  container.innerHTML = selectedMaterials.map(material => `
    <div class="form-group">
      <label for="price_${material.toLowerCase().replace(' ', '_')}">Current Price for ${material} (INR) *</label>
      <input type="number" id="price_${material.toLowerCase().replace(' ', '_')}" 
             name="prices[${material}]" step="0.01" required>
    </div>
  `).join('');
}

// Initialize mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const navbarMenu = document.getElementById('navbarMenu');
  
  if (mobileMenuToggle && navbarMenu) {
    mobileMenuToggle.addEventListener('click', () => {
      navbarMenu.classList.toggle('active');
      mobileMenuToggle.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = navbarMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navbarMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
      });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navbarMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        navbarMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
      }
    });
  }
});

// Export classes for use in page scripts
window.APIClient = APIClient;
window.Utils = Utils;
window.DataTableManager = DataTableManager;
window.FormManager = FormManager;
window.MobileMenuHandler = MobileMenuHandler;
