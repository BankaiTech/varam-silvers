// ========================================
// PRODUCTS PAGE SCRIPT
// ========================================

class ProductsPage extends DataTableManager {
  constructor() {
    super('productsTable', {
      pageSize: 10,
      currentPage: 1
    });
    
    this.setupFilters();
  }

  setupFilters() {
    // Category filter
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
      categoryFilter.addEventListener('change', (e) => {
        this.options.filters.category = e.target.value;
        this.options.currentPage = 1;
        this.loadData();
      });
    }

    // Material filter
    const materialFilter = document.getElementById('materialFilter');
    if (materialFilter) {
      materialFilter.addEventListener('change', (e) => {
        this.options.filters.material = e.target.value;
        this.options.currentPage = 1;
        this.loadData();
      });
    }
  }

  renderRow(product) {
    const statusClass = this.getStatusClass(product.stock, product.outOfStock);
    const statusText = this.getStatusText(product.stock, product.outOfStock);
    
    return `
      <tr>
        <td>${product.id || 'N/A'}</td>
        <td>
          <a href="product.html?id=${product.id}" class="product-link">
            ${product.name || 'Unnamed Product'}
          </a>
        </td>
        <td>${product.category || 'N/A'}</td>
        <td>${this.formatMaterials(product.materials)}</td>
        <td>${Utils.formatCurrency(product.currentPrice || product.price || 0)}</td>
        <td>
          <span class="stock-indicator ${statusClass}">
            ${product.stock || 0}
          </span>
        </td>
        <td>
          <div class="action-buttons">
            <button class="action-btn edit-btn" onclick="window.location.href='product.html?id=${product.id}'" title="Edit">
              ✏️
            </button>
            <button class="action-btn delete-btn" onclick="ProductsPage.deleteProduct(${product.id})" title="Delete">
              🗑️
            </button>
          </div>
        </td>
      </tr>
    `;
  }

  formatMaterials(materials) {
    if (!materials || !Array.isArray(materials)) {
      return 'N/A';
    }
    
    if (materials.length === 0) {
      return 'N/A';
    }
    
    return materials.join(', ');
  }

  getStatusClass(stock, outOfStock) {
    if (outOfStock) return 'out-of-stock';
    if (stock === 0) return 'out-of-stock';
    if (stock <= 5) return 'low-stock';
    return 'in-stock';
  }

  getStatusText(stock, outOfStock) {
    if (outOfStock) return 'Out of Stock';
    if (stock === 0) return 'Out of Stock';
    if (stock <= 5) return 'Low Stock';
    return 'In Stock';
  }

  static async deleteProduct(productId) {
    if (!confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      return;
    }

    try {
      // In a real implementation, you would call the API to delete the product
      // await this.apiClient.deleteProduct(productId);
      
      Utils.showToast('Product deleted successfully', 'success');
      
      // Refresh the table
      if (window.productsPage) {
        window.productsPage.loadData();
      }
      
    } catch (error) {
      console.error('Failed to delete product:', error);
      Utils.showToast('Failed to delete product', 'error');
    }
  }
}

// Initialize products page
document.addEventListener('DOMContentLoaded', () => {
  window.productsPage = new ProductsPage();
});
