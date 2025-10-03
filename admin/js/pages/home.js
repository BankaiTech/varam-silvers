// ========================================
// HOME DASHBOARD PAGE SCRIPT
// ========================================

class HomeDashboard {
  constructor() {
    this.apiClient = new APIClient();
    this.init();
  }

  async init() {
    await this.loadDashboardData();
  }

  async loadDashboardData() {
    try {
      // Load stats and top products in parallel
      const [stats, topProducts] = await Promise.all([
        this.loadStats(),
        this.loadTopProducts()
      ]);
      
      this.updateStatsCards(stats);
      this.updateTopProductsTable(topProducts);
      
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
      this.showErrorState();
    }
  }

  async loadStats() {
    try {
      const stats = await this.apiClient.getStats();
      return {
        perDaySales: stats.perDaySales || 0,
        currentMonthSales: stats.currentMonthSales || 0,
        yearlySales: stats.yearlySales || 0,
        overallSales: stats.overallSales || 0
      };
    } catch (error) {
      console.warn('Stats API not available, using default values');
      return {
        perDaySales: 0,
        currentMonthSales: 0,
        yearlySales: 0,
        overallSales: 0
      };
    }
  }

  async loadTopProducts() {
    try {
      const products = await this.apiClient.getTopProducts(5);
      return products || [];
    } catch (error) {
      console.warn('Top products API not available, returning empty array');
      return [];
    }
  }

  updateStatsCards(stats) {
    // Update Per Day Sales
    const perDayElement = document.getElementById('perDaySales');
    if (perDayElement) {
      perDayElement.textContent = Utils.formatCurrency(stats.perDaySales);
    }

    // Update Current Month Sales
    const currentMonthElement = document.getElementById('currentMonthSales');
    if (currentMonthElement) {
      currentMonthElement.textContent = Utils.formatCurrency(stats.currentMonthSales);
    }

    // Update Yearly Sales
    const yearlyElement = document.getElementById('yearlySales');
    if (yearlyElement) {
      yearlyElement.textContent = Utils.formatCurrency(stats.yearlySales);
    }

    // Update Overall Sales
    const overallElement = document.getElementById('overallSales');
    if (overallElement) {
      overallElement.textContent = Utils.formatCurrency(stats.overallSales);
    }
  }

  updateTopProductsTable(products) {
    const tbody = document.querySelector('#topProductsTable tbody');
    if (!tbody) return;

    if (products.length === 0) {
      Utils.showNoData(tbody, 'No data available');
      return;
    }

    tbody.innerHTML = products.map(product => `
      <tr>
        <td>${product.id || 'N/A'}</td>
        <td>
          <a href="product.html?id=${product.id}" class="product-link">
            ${product.name || 'Unnamed Product'}
          </a>
        </td>
        <td>${Utils.formatCurrency(product.price || 0)}</td>
        <td>${Utils.formatNumber(product.todaySales || 0)}</td>
        <td>${Utils.formatNumber(product.totalSales || 0)}</td>
      </tr>
    `).join('');
  }

  showErrorState() {
    // Show error state for stats cards
    const statValues = document.querySelectorAll('.stat-value');
    statValues.forEach(element => {
      element.textContent = 'Error loading data';
      element.style.color = 'var(--error)';
    });

    // Show error state for top products table
    const tbody = document.querySelector('#topProductsTable tbody');
    if (tbody) {
      Utils.showNoData(tbody, 'Error loading data');
    }

    Utils.showToast('Failed to load dashboard data', 'error');
  }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new HomeDashboard();
});
