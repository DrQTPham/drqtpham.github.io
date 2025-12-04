/**
 * BED Calculator Module
 * Calculates Biologically Effective Dose (BED) and equivalent doses
 * for different fractionation schemes
 */

class BEDCalculator {
  /**
   * Calculate BED for given dose and fractionation
   * Formula: BED = D × (1 + d/(α/β))
   * @param {number} totalDose - Total dose in Gy
   * @param {number} dosePerFraction - Dose per fraction in Gy
   * @param {number} alphaBeta - Alpha/beta ratio for tissue
   * @returns {number} BED in Gy
   */
  calculateBED(totalDose, dosePerFraction, alphaBeta) {
    if (totalDose <= 0 || dosePerFraction <= 0 || alphaBeta <= 0) {
      throw new Error('All parameters must be positive numbers');
    }
    
    return totalDose * (1 + dosePerFraction / alphaBeta);
  }

  /**
   * Calculate equivalent total dose for custom fractionation
   * Uses BED equivalence: BED_ref = BED_custom
   * @param {number} referenceDose - Reference total dose in Gy
   * @param {number} referenceFraction - Reference dose per fraction in Gy
   * @param {number} customFraction - Custom dose per fraction in Gy
   * @param {number} alphaBeta - Alpha/beta ratio for tissue
   * @returns {number} Equivalent total dose in Gy
   */
  calculateEquivalentDose(referenceDose, referenceFraction, customFraction, alphaBeta) {
    if (referenceDose <= 0 || referenceFraction <= 0 || customFraction <= 0 || alphaBeta <= 0) {
      throw new Error('All parameters must be positive numbers');
    }

    // Calculate reference BED
    const referenceBED = this.calculateBED(referenceDose, referenceFraction, alphaBeta);
    
    // Calculate equivalent dose: D_custom = BED_ref / (1 + d_custom/(α/β))
    const equivalentDose = referenceBED / (1 + customFraction / alphaBeta);
    
    return equivalentDose;
  }

  /**
   * Calculate number of fractions for target dose
   * @param {number} totalDose - Total dose in Gy
   * @param {number} dosePerFraction - Dose per fraction in Gy
   * @returns {number} Number of fractions (rounded down)
   */
  calculateFractions(totalDose, dosePerFraction) {
    if (totalDose <= 0 || dosePerFraction <= 0) {
      throw new Error('Dose values must be positive numbers');
    }
    
    return Math.floor(totalDose / dosePerFraction);
  }

  /**
   * Calculate safety margin between reference and custom BED
   * @param {number} referenceBED - Reference BED in Gy
   * @param {number} customBED - Custom BED in Gy
   * @returns {number} Safety margin as percentage (positive means safe, negative means exceeded)
   */
  calculateSafetyMargin(referenceBED, customBED) {
    if (referenceBED <= 0) {
      throw new Error('Reference BED must be positive');
    }
    
    return ((referenceBED - customBED) / referenceBED) * 100;
  }

  /**
   * Calculate complete dose conversion with all details
   * @param {Object} params - Calculation parameters
   * @param {number} params.referenceDose - Reference total dose
   * @param {number} params.referenceFraction - Reference dose per fraction (default 2.0)
   * @param {number} params.customFraction - Custom dose per fraction
   * @param {number} params.alphaBeta - Alpha/beta ratio
   * @returns {Object} Complete calculation results
   */
  calculateDoseConversion(params) {
    const {
      referenceDose,
      referenceFraction = 2.0,
      customFraction,
      alphaBeta
    } = params;

    // Validate inputs
    if (!referenceDose || !customFraction || !alphaBeta) {
      throw new Error('Missing required parameters');
    }

    // Calculate reference BED
    const referenceBED = this.calculateBED(referenceDose, referenceFraction, alphaBeta);
    const referenceFractions = this.calculateFractions(referenceDose, referenceFraction);

    // Calculate equivalent dose
    const theoreticalDose = this.calculateEquivalentDose(
      referenceDose,
      referenceFraction,
      customFraction,
      alphaBeta
    );

    // Calculate practical dose (rounded to achievable fractions)
    const practicalFractions = this.calculateFractions(theoreticalDose, customFraction);
    const practicalDose = practicalFractions * customFraction;

    // Calculate custom BED
    const customBED = this.calculateBED(practicalDose, customFraction, alphaBeta);

    // Calculate safety margin
    const safetyMargin = this.calculateSafetyMargin(referenceBED, customBED);

    // Determine warning level
    let warningLevel = 'success';
    let isWithinLimits = true;

    if (customBED > referenceBED) {
      warningLevel = 'danger';
      isWithinLimits = false;
    } else if (safetyMargin < 5) {
      warningLevel = 'caution';
    }

    return {
      // Reference values
      referenceDose,
      referenceFraction,
      referenceFractions,
      referenceBED,

      // Custom values
      customFraction,
      theoreticalDose,
      practicalDose,
      practicalFractions,
      customBED,

      // Safety assessment
      safetyMargin,
      isWithinLimits,
      warningLevel
    };
  }
}

// Create singleton instance
const bedCalculator = new BEDCalculator();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { BEDCalculator, bedCalculator };
}

console.log('BED Calculator module loaded');
