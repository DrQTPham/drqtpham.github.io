/**
 * Gap Compensation Core Module
 * Core logic for calculating BED loss and validating gap parameters
 * Feature: gap-compensation
 */

class GapCalculator {
    /**
     * Calculate BED loss due to tumor repopulation during gap
     * Formula: BED_loss = (gap_days / Td) × ln(2) × (α/β)
     * 
     * @param {number} gapDays - Number of days treatment was interrupted (>= 0)
     * @param {number} tumorDoublingTime - Tumor doubling time in days (> 0)
     * @param {number} alphaBeta - Alpha/beta ratio (> 0)
     * @returns {number} BED loss in Gy (rounded to 2 decimal places)
     */
    calculateBEDLoss(gapDays, tumorDoublingTime, alphaBeta) {
        // Validate inputs
        const validation = this.validateGapParameters(gapDays, tumorDoublingTime, alphaBeta);
        if (!validation.isValid) {
            throw new Error(validation.errors.join('; '));
        }

        // Edge case: no gap means no loss
        if (gapDays === 0) {
            return 0.00;
        }

        // Calculate BED loss
        const bedLoss = (gapDays / tumorDoublingTime) * Math.log(2) * alphaBeta;
        
        // Return with 2 decimal precision
        return Number(bedLoss.toFixed(2));
    }

    /**
     * Validate gap parameters
     * 
     * @param {number} gapDays - Gap days to validate
     * @param {number} tumorDoublingTime - Td to validate
     * @param {number} alphaBeta - Alpha/beta to validate
     * @returns {Object} Validation result with isValid flag, errors array, and warnings array
     */
    validateGapParameters(gapDays, tumorDoublingTime, alphaBeta) {
        const errors = [];
        const warnings = [];

        // Validate gap_days
        if (gapDays === null || gapDays === undefined || isNaN(gapDays)) {
            errors.push('Gap days must be a valid number');
        } else if (gapDays < 0) {
            errors.push('Gap days must be non-negative');
        }

        // Validate tumor doubling time
        if (tumorDoublingTime === null || tumorDoublingTime === undefined || isNaN(tumorDoublingTime)) {
            errors.push('Tumor doubling time must be a valid number');
        } else if (tumorDoublingTime <= 0) {
            errors.push('Tumor doubling time must be positive');
        } else if (tumorDoublingTime > 30) {
            warnings.push('Tumor doubling time > 30 days is uncommon. Please verify.');
        }

        // Validate alpha/beta
        if (alphaBeta === null || alphaBeta === undefined || isNaN(alphaBeta)) {
            errors.push('Alpha/beta ratio must be a valid number');
        } else if (alphaBeta <= 0) {
            errors.push('Alpha/beta ratio must be positive');
        }

        return {
            isValid: errors.length === 0,
            errors,
            warnings
        };
    }

    /**
     * Get default tumor doubling time
     * @returns {number} Default Td of 3 days (for fast-growing tumors)
     */
    getDefaultDoublingTime() {
        return 3;
    }

    /**
     * Calculate BED for a given protocol
     * Formula: BED = n × d × (1 + d/(α/β))
     * 
     * @param {number} numFractions - Number of fractions
     * @param {number} dosePerFraction - Dose per fraction in Gy
     * @param {number} alphaBeta - Alpha/beta ratio
     * @returns {number} BED in Gy (rounded to 2 decimal places)
     */
    calculateBED(numFractions, dosePerFraction, alphaBeta) {
        const bed = numFractions * dosePerFraction * (1 + dosePerFraction / alphaBeta);
        return Number(bed.toFixed(2));
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GapCalculator };
}

// Create global instance
window.gapCalculator = new GapCalculator();

console.log('✅ Gap Compensation Core Module loaded');
