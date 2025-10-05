// ========================================
// INVENTORY PAGE SCRIPT
// ========================================

class InventoryPage extends DataTableManager {
  constructor() {
    super('inventoryTable', {
      pageSize: 10,
      currentPage: 1
    });
    
    this.setupFilters();
    this.setupActions();
    this.loadSummaryData();
  }

  setupFilters() {
    // Performance filter
    const performanceFilter = document.getElementById('performanceFilter');
    if (performanceFilter) {
      performanceFilter.addEventListener('change', (e) => {
        this.options.filters.performance = e.target.value;
        this.options.currentPage = 1;
        this.loadData();
      });
    }

    // Stock filter
    const stockFilter = document.getElementById('stockFilter');
    if (stockFilter) {
      stockFilter.addEventListener('change', (e) => {
        this.options.filters.stockLevel = e.target.value;
        this.options.currentPage = 1;
        this.loadData();
      });
    }
  }

  setupActions() {
    // Export button
    const exportBtn = document.getElementById('exportInventory');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => this.exportInventory());
    }

    // Refresh button
    const refreshBtn = document.getElementById('refreshInventory');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => this.refreshData());
    }
  }

  async loadData() {
    try {
      Utils.showLoading(this.tbody);
      
      const response = await this.apiClient.getInventory(
        this.options.currentPage,
        this.options.pageSize,
        this.options.searchTerm,
        this.options.filters
      );
      
      this.data = response.data || [];
      this.updateTable();
      this.updatePagination(response.pagination);
      
    } catch (error) {
      console.error('Failed to load inventory data:', error);
      Utils.showNoData(this.tbody, 'No data available');
    }
  }

  async loadSummaryData() {
    try {
      const response = await this.apiClient.getInventory(1, 1000); // Get all data for summary
      const products = response.data || [];
      
      this.updateSummaryCards(products);
      
    } catch (error) {
      console.error('Failed to load summary data:', error);
      this.updateSummaryCards([]);
    }
  }

  renderRow(item) {
    const performanceClass = this.getPerformanceClass(item.performance);
    const performanceIcon = this.getPerformanceIcon(item.performance);
    const stockClass = this.getStockClass(item.stockRemaining, item.outOfStock);
    
    return `
      <tr>
        <td>
          <a href="product.html?id=${item.id}" class="product-link">
            ${item.name || 'Unnamed Product'}
          </a>
        </td>
        <td>${Utils.formatCurrency(item.price || 0)}</td>
        <td>
          <span class="stock-indicator ${stockClass}">
            ${item.stockRemaining || 0}
          </span>
        </td>
        <td>${Utils.formatNumber(item.totalSold || 0)}</td>
        <td>
          <span class="performance-indicator ${performanceClass}">
            ${performanceIcon} ${this.getPerformanceText(item.performance)}
          </span>
        </td>
      </tr>
    `;
  }

  getPerformanceClass(performance) {
    if (performance >= 80) return 'high-performance';
    if (performance >= 50) return 'medium-performance';
    return 'low-performance';
  }

  getPerformanceIcon(performance) {
    if (performance >= 80) return '📈';
    if (performance >= 50) return '➡️';
    return '📉';
  }

  getPerformanceText(performance) {
    if (performance >= 80) return 'High';
    if (performance >= 50) return 'Medium';
    return 'Low';
  }

  getStockClass(stock, outOfStock) {
    if (outOfStock || stock === 0) return 'out-of-stock';
    if (stock <= 5) return 'low-stock';
    return 'in-stock';
  }

  updateSummaryCards(products) {
    const totalProducts = products.length;
    const inStock = products.filter(p => p.stockRemaining > 0 && !p.outOfStock).length;
    const lowStock = products.filter(p => p.stockRemaining > 0 && p.stockRemaining <= 5 && !p.outOfStock).length;
    const outOfStock = products.filter(p => p.stockRemaining === 0 || p.outOfStock).length;

    // Update summary cards
    this.updateSummaryCard('totalProducts', totalProducts);
    this.updateSummaryCard('inStockProducts', inStock);
    this.updateSummaryCard('lowStockProducts', lowStock);
    this.updateSummaryCard('outOfStockProducts', outOfStock);
  }

  updateSummaryCard(elementId, value) {
    const element = document.getElementById(elementId);
    if (element) {
      element.textContent = Utils.formatNumber(value);
    }
  }

  exportInventory() {
    try {
      // Create CSV data
      const csvData = this.createCSVData();
      
      // Download CSV file
      this.downloadCSV(csvData, 'inventory-export.csv');
      
      Utils.showToast('Inventory data exported successfully', 'success');
      
    } catch (error) {
      console.error('Failed to export inventory:', error);
      Utils.showToast('Failed to export inventory data', 'error');
    }
  }

  createCSVData() {
    const headers = ['Name', 'Price', 'Stock Remaining', 'Total Sold', 'Performance'];
    const rows = this.data.map(item => [
      item.name || 'Unnamed Product',
      item.price || 0,
      item.stockRemaining || 0,
      item.totalSold || 0,
      item.performance || 0
    ]);
    
    return [headers, ...rows].map(row => 
      row.map(cell => `"${cell}"`).join(',')
    ).join('\n');
  }

  downloadCSV(csvData, filename) {
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  refreshData() {
    this.loadData();
    this.loadSummaryData();
    Utils.showToast('Inventory data refreshed', 'success');
  }
}

// Initialize inventory page
document.addEventListener('DOMContentLoaded', () => {
  window.inventoryPage = new InventoryPage();
});
