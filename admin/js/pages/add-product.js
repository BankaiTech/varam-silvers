// ========================================
// ADD PRODUCT PAGE SCRIPT
// ========================================

class AddProductPage extends FormManager {
  constructor() {
    super('productForm', {
      validateOnSubmit: true,
      showLoadingOnSubmit: true
    });
    
    this.apiClient = new APIClient();
    this.setupFormValidation();
  }

  setupFormValidation() {
    // Add custom validation rules
    this.addValidationRule('required', (value) => value.trim() !== '', 'This field is required');
    this.addValidationRule('number', (value) => !isNaN(value) && value !== '', 'Please enter a valid number');
    this.addValidationRule('positive', (value) => parseFloat(value) >= 0, 'Value must be positive');
    this.addValidationRule('min', (value, min) => parseFloat(value) >= parseFloat(min), `Value must be at least ${min}`);
    this.addValidationRule('max', (value, max) => parseFloat(value) <= parseFloat(max), `Value must be at most ${max}`);
    
    // Set up field validation attributes
    this.setupFieldValidation();
  }

  setupFieldValidation() {
    const fields = [
      { id: 'productName', rules: 'required' },
      { id: 'productCategory', rules: 'required' },
      { id: 'actualPrice', rules: 'required number positive' },
      { id: 'stock', rules: 'required number min:0' },
      { id: 'description', rules: 'required' }
    ];

    fields.forEach(field => {
      const element = document.getElementById(field.id);
      if (element) {
        element.dataset.validation = field.rules;
      }
    });
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
      
      // Submit to API
      const result = await this.apiClient.createProduct(productData);
      
      Utils.showToast('Product created successfully!', 'success');
      
      // Redirect to products page after a short delay
      setTimeout(() => {
        window.location.href = 'products.html';
      }, 1500);
      
    } catch (error) {
      console.error('Failed to create product:', error);
      Utils.showToast('Failed to create product. Please try again.', 'error');
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

// Initialize add product page
document.addEventListener('DOMContentLoaded', () => {
  new AddProductPage();
});
