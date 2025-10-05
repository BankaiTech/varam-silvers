// ========================================
// EDIT PRODUCT PAGE SCRIPT
// ========================================

class EditProductPage extends FormManager {
  constructor() {
    super('productForm', {
      validateOnSubmit: true,
      showLoadingOnSubmit: true
    });
    
    this.apiClient = new APIClient();
    this.productId = this.getProductIdFromUrl();
    this.productData = null;
    
    this.init();
  }

  getProductIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
  }

  async init() {
    if (!this.productId) {
      this.showNoDataState();
      return;
    }
    
    await this.loadProductData();
  }

  async loadProductData() {
    try {
      // Show loading state
      this.showLoadingState();
      
      // Load product data
      const product = await this.apiClient.getProduct(this.productId);
      
      if (!product) {
        this.showNoDataState();
        return;
      }
      
      this.productData = product;
      this.populateForm(product);
      this.showFormState();
      
    } catch (error) {
      console.error('Failed to load product:', error);
      this.showNoDataState();
    }
  }

  showLoadingState() {
    const loadingState = document.getElementById('loadingState');
    const noDataState = document.getElementById('noDataState');
    const formContainer = document.getElementById('productFormContainer');
    
    if (loadingState) loadingState.style.display = 'flex';
    if (noDataState) noDataState.style.display = 'none';
    if (formContainer) formContainer.style.display = 'none';
  }

  showNoDataState() {
    const loadingState = document.getElementById('loadingState');
    const noDataState = document.getElementById('noDataState');
    const formContainer = document.getElementById('productFormContainer');
    
    if (loadingState) loadingState.style.display = 'none';
    if (noDataState) noDataState.style.display = 'flex';
    if (formContainer) formContainer.style.display = 'none';
  }

  showFormState() {
    const loadingState = document.getElementById('loadingState');
    const noDataState = document.getElementById('noDataState');
    const formContainer = document.getElementById('productFormContainer');
    
    if (loadingState) loadingState.style.display = 'none';
    if (noDataState) noDataState.style.display = 'none';
    if (formContainer) formContainer.style.display = 'block';
  }

  populateForm(product) {
    // Basic information
    this.setFieldValue('productName', product.name);
    this.setFieldValue('productCategory', product.category);
    
    // Handle custom category
    if (product.category && !this.isStandardCategory(product.category)) {
      this.setFieldValue('productCategory', 'custom');
      this.setFieldValue('customCategory', product.category);
      this.showCustomCategoryInput();
    }
    
    // Materials
    if (product.materials && Array.isArray(product.materials)) {
      product.materials.forEach(material => {
        const checkbox = document.querySelector(`input[name="materials"][value="${material}"]`);
        if (checkbox) {
          checkbox.checked = true;
        }
      });
      this.updateMaterialPricing();
    }
    
    // Pricing
    this.setFieldValue('actualPrice', product.actualPrice);
    
    // Set material prices if available
    if (product.prices) {
      Object.entries(product.prices).forEach(([material, price]) => {
        const priceInput = document.querySelector(`input[name="prices[${material}]"]`);
        if (priceInput) {
          priceInput.value = price;
        }
      });
    }
    
    // Product details
    this.setFieldValue('wastage', product.wastage);
    this.setFieldValue('stock', product.stock);
    this.setFieldValue('length', product.length);
    this.setFieldValue('outOfStock', product.outOfStock);
    
    // Description
    this.setFieldValue('description', product.description);
    this.setFieldValue('keyFeatures', product.keyFeatures ? product.keyFeatures.join(', ') : '');
    
    // Image
    if (product.image) {
      this.setImagePreview(product.image);
    }
  }

  setFieldValue(fieldId, value) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    
    if (field.type === 'checkbox') {
      field.checked = Boolean(value);
    } else {
      field.value = value || '';
    }
  }

  isStandardCategory(category) {
    const standardCategories = ['Chains', 'Rings', 'Earrings', 'Pendants', 'Bracelets'];
    return standardCategories.includes(category);
  }

  showCustomCategoryInput() {
    const customCategoryInput = document.getElementById('customCategory');
    if (customCategoryInput) {
      customCategoryInput.style.display = 'block';
    }
  }

  setImagePreview(imageUrl) {
    const previewImage = document.getElementById('previewImage');
    const filePreview = document.getElementById('filePreview');
    const uploadPlaceholder = document.getElementById('uploadPlaceholder');
    
    if (previewImage && filePreview) {
      previewImage.src = imageUrl;
      filePreview.style.display = 'block';
      if (uploadPlaceholder) {
        uploadPlaceholder.style.display = 'none';
      }
    }
  }

  async submitForm(data) {
    try {
      // Validate materials selection
      if (!this.validateMaterials()) {
        return;
      }

      // Validate material pricing
      if (!this.validateMaterialPricing()) {
        return;
      }

      // Prepare product data
      const productData = this.prepareProductData(data);
      
      // Update product via API
      const result = await this.apiClient.updateProduct(this.productId, productData);
      
      Utils.showToast('Product updated successfully!', 'success');
      
      // Redirect to products page after a short delay
      setTimeout(() => {
        window.location.href = 'products.html';
      }, 1500);
      
    } catch (error) {
      console.error('Failed to update product:', error);
      Utils.showToast('Failed to update product. Please try again.', 'error');
    }
  }

  validateMaterials() {
    const materialCheckboxes = document.querySelectorAll('input[name="materials"]:checked');
    
    if (materialCheckboxes.length === 0) {
      Utils.showFieldError('materials', 'Please select at least one material');
      return false;
    }
    
    Utils.clearFieldError('materials');
    return true;
  }

  validateMaterialPricing() {
    const selectedMaterials = Array.from(document.querySelectorAll('input[name="materials"]:checked'))
      .map(cb => cb.value);
    
    let isValid = true;
    
    selectedMaterials.forEach(material => {
      const priceInput = document.querySelector(`input[name="prices[${material}]"]`);
      if (priceInput) {
        const price = parseFloat(priceInput.value);
        if (isNaN(price) || price <= 0) {
          Utils.showFieldError(priceInput.id, 'Please enter a valid price');
          isValid = false;
        } else {
          Utils.clearFieldError(priceInput.id);
        }
      }
    });
    
    return isValid;
  }

  prepareProductData(formData) {
    // Get selected materials
    const materials = Array.from(document.querySelectorAll('input[name="materials"]:checked'))
      .map(cb => cb.value);
    
    // Get material prices
    const prices = {};
    materials.forEach(material => {
      const priceInput = document.querySelector(`input[name="prices[${material}]"]`);
      if (priceInput) {
        prices[material] = parseFloat(priceInput.value);
      }
    });
    
    // Handle custom category
    let category = formData.category;
    if (category === 'custom') {
      category = formData.customCategory;
    }
    
    // Prepare the product data object
    return {
      name: formData.name,
      category: category,
      materials: materials,
      actualPrice: parseFloat(formData.actualPrice),
      prices: prices,
      wastage: parseFloat(formData.wastage) || 0,
      stock: parseInt(formData.stock),
      outOfStock: formData.outOfStock === 'on',
      length: parseFloat(formData.length) || null,
      description: formData.description,
      keyFeatures: formData.keyFeatures ? formData.keyFeatures.split(',').map(f => f.trim()) : [],
      image: formData.image
    };
  }
}

// Initialize edit product page
document.addEventListener('DOMContentLoaded', () => {
  new EditProductPage();
});
