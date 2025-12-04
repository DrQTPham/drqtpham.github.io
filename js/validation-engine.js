/**
 * Validation Engine Module
 * Validates user inputs for organ dose limit calculator
 */

class ValidationEngine {
  /**
   * Validate dose per fraction input
   * @param {any} value - Input value to validate
   * @returns {Object} ValidationResult with isValid, errorMessage, warnings
   */
  validateDosePerFraction(value) {
    const result = {
      isValid: true,
      errorMessage: null,
      warnings: []
    };

    // Check if value exists
    if (value === null || value === undefined || value === '') {
      result.isValid = false;
      result.errorMessage = 'Vui lòng nhập liều trên một phân liều';
      return result;
    }

    // Convert to number
    const numValue = Number(value);

    // Check if numeric
    if (isNaN(numValue)) {
      result.isValid = false;
      result.errorMessage = 'Vui lòng nhập số hợp lệ';
      return result;
    }

    // Check if positive
    if (numValue <= 0) {
      result.isValid = false;
      result.errorMessage = 'Liều phải lớn hơn 0';
      return result;
    }

    // Check for extreme values
    const extremeWarning = this.checkExtremeValues(numValue);
    if (extremeWarning) {
      result.warnings.push(extremeWarning);
    }

    return result;
  }

  /**
   * Validate organ selection
   * @param {string} organId - Organ identifier
   * @returns {Object} ValidationResult
   */
  validateOrganSelection(organId) {
    const result = {
      isValid: true,
      errorMessage: null,
      warnings: []
    };

    if (!organId || organId === '') {
      result.isValid = false;
      result.errorMessage = 'Vui lòng chọn cơ quan trước';
      return result;
    }

    // Check if organ exists in database (if available)
    if (typeof getOrgan === 'function') {
      const organ = getOrgan(organId);
      if (!organ) {
        result.isValid = false;
        result.errorMessage = 'Không tìm thấy thông tin cơ quan';
        return result;
      }
    }

    return result;
  }

  /**
   * Check for extreme dose values
   * @param {number} dosePerFraction - Dose per fraction in Gy
   * @returns {string|null} Warning message or null
   */
  checkExtremeValues(dosePerFraction) {
    if (dosePerFraction > 20) {
      return 'Cảnh báo: Liều rất cao (>20 Gy), kết quả có thể không chính xác cho mô bình thường';
    }

    if (dosePerFraction < 0.5) {
      return 'Cảnh báo: Liều rất thấp (<0.5 Gy), không phổ biến trong thực tế lâm sàng';
    }

    return null;
  }

  /**
   * Validate complete calculation inputs
   * @param {Object} inputs - All calculation inputs
   * @returns {Object} ValidationResult
   */
  validateCalculationInputs(inputs) {
    const result = {
      isValid: true,
      errorMessage: null,
      warnings: []
    };

    // Validate organ selection
    const organValidation = this.validateOrganSelection(inputs.organId);
    if (!organValidation.isValid) {
      return organValidation;
    }

    // Validate dose per fraction
    const doseValidation = this.validateDosePerFraction(inputs.dosePerFraction);
    if (!doseValidation.isValid) {
      return doseValidation;
    }

    // Combine warnings
    result.warnings = [...organValidation.warnings, ...doseValidation.warnings];

    return result;
  }

  /**
   * Sanitize numeric input
   * @param {any} value - Input value
   * @returns {number|null} Sanitized number or null if invalid
   */
  sanitizeNumericInput(value) {
    if (value === null || value === undefined || value === '') {
      return null;
    }

    const numValue = Number(value);
    return isNaN(numValue) ? null : numValue;
  }

  /**
   * Format validation error for display
   * @param {Object} validationResult - Validation result object
   * @returns {string} Formatted error message
   */
  formatErrorMessage(validationResult) {
    if (validationResult.isValid) {
      return '';
    }

    let message = validationResult.errorMessage || 'Lỗi không xác định';

    if (validationResult.warnings.length > 0) {
      message += '\n' + validationResult.warnings.join('\n');
    }

    return message;
  }
}

// Create singleton instance
const validationEngine = new ValidationEngine();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ValidationEngine, validationEngine };
}

console.log('Validation Engine module loaded');
