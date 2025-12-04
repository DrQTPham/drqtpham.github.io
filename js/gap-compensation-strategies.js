/**
 * Gap Compensation Strategies Module
 * Implements 6 compensation strategies
 * Feature: gap-compensation
 */

/**
 * Base class for all compensation strategies
 */
class CompensationStrategy {
    constructor(name, complexityScore) {
        this.name = name;
        this.complexityScore = complexityScore; // 1-5, where 1 is simplest
    }

    /**
     * Calculate compensation parameters
     * Must be implemented by subclasses
     * @param {Object} params - Protocol and gap parameters
     * @returns {Object} Compensation result
     */
    calculateCompensation(params) {
        throw new Error('calculateCompensation must be implemented by subclass');
    }

    /**
     * Validate if this method is feasible
     * @param {Object} result - Compensation result
     * @returns {boolean} True if feasible
     */
    validateFeasibility(result) {
        return result.feasible === true;
    }

    /**
     * Get warnings for this compensation
     * @param {Object} result - Compensation result
     * @returns {Array<string>} Array of warning messages
     */
    getWarnings(result) {
        return result.warnings || [];
    }

    /**
     * Get method name
     * @returns {string} Method name
     */
    getMethodName() {
        return this.name;
    }

    /**
     * Get complexity score
     * @returns {number} Complexity score (1-5)
     */
    getComplexityScore() {
        return this.complexityScore;
    }
}

/**
 * BID Strategy - Twice daily fractions
 */
class BIDStrategy extends CompensationStrategy {
    constructor() {
        super('BID (Twice Daily)', 3);
    }

    calculateCompensation(params) {
        const { bedLoss, dosePerFraction, alphaBeta, numFractions, remainingFractions } = params;

        // Calculate extra fractions needed to compensate BED loss
        const bedPerFraction = dosePerFraction * (1 + dosePerFraction / alphaBeta);
        const extraFractionsNeeded = Math.ceil(bedLoss / bedPerFraction);

        // Calculate BID days (2 fractions per day)
        const bidDays = Math.ceil(extraFractionsNeeded / 2);

        // Calculate new BED after compensation
        const newTotalFractions = numFractions + extraFractionsNeeded;
        const newBED = newTotalFractions * dosePerFraction * (1 + dosePerFraction / alphaBeta);

        // Check interval warning (assuming 8-hour workday, need at least 6 hours between fractions)
        const warnings = [];
        if (bidDays > 0) {
            warnings.push('Đảm bảo khoảng cách tối thiểu 6 giờ giữa hai phân liều');
        }

        return {
            method: 'BID',
            extraFractionsNeeded,
            bidDays,
            newTotalFractions,
            newTotalDose: newTotalFractions * dosePerFraction,
            dosePerFraction, // Maintained
            newBED,
            bedCompensation: newBED - (numFractions * dosePerFraction * (1 + dosePerFraction / alphaBeta)),
            feasible: true,
            warnings,
            description: `Chiếu 2 lần/ngày trong ${bidDays} ngày để bù ${extraFractionsNeeded} phân liều`
        };
    }
}

/**
 * Extra Fractions Strategy
 */
class ExtraFractionsStrategy extends CompensationStrategy {
    constructor() {
        super('Extra Fractions', 2);
    }

    calculateCompensation(params) {
        const { bedLoss, dosePerFraction, alphaBeta, numFractions } = params;

        // Calculate extra fractions needed
        const bedPerFraction = dosePerFraction * (1 + dosePerFraction / alphaBeta);
        const extraFractionsNeeded = Math.ceil(bedLoss / bedPerFraction);

        // Calculate new totals
        const newTotalFractions = numFractions + extraFractionsNeeded;
        const newTotalDose = newTotalFractions * dosePerFraction;

        // Calculate extra treatment days (assuming 5 days/week)
        const extraTreatmentDays = Math.ceil(extraFractionsNeeded / 5);

        // Calculate new BED
        const newBED = newTotalFractions * dosePerFraction * (1 + dosePerFraction / alphaBeta);

        // Warnings
        const warnings = [];
        if (extraFractionsNeeded > 5) {
            warnings.push('Số phân liều bổ sung lớn (>5), cân nhắc phương pháp khác');
        }

        return {
            method: 'EXTRA_FRACTIONS',
            extraFractionsNeeded,
            newTotalFractions,
            newTotalDose,
            dosePerFraction, // Maintained
            extraTreatmentDays,
            newBED,
            bedCompensation: newBED - (numFractions * dosePerFraction * (1 + dosePerFraction / alphaBeta)),
            feasible: true,
            warnings,
            description: `Thêm ${extraFractionsNeeded} phân liều (${dosePerFraction.toFixed(1)} Gy/fx), kéo dài thêm ~${extraTreatmentDays} ngày`
        };
    }
}

/**
 * Six Day Week Strategy
 */

class SixDayWeekStrategy extends CompensationStrategy {
    constructor() {
        super('6 Days/Week', 2);
    }

    calculateCompensation(params) {
        const { bedLoss, dosePerFraction, alphaBeta, numFractions, remainingFractions } = params;

        // Calculate extra fractions needed
        const bedPerFraction = dosePerFraction * (1 + dosePerFraction / alphaBeta);
        const extraFractionsNeeded = Math.ceil(bedLoss / bedPerFraction);

        // Calculate weeks needed (1 extra fraction per week with 6-day schedule)
        const weeksNeeded = Math.ceil(extraFractionsNeeded / 1);

        // Calculate days saved
        const daysSaved = weeksNeeded * 1;

        // Calculate new totals
        const newTotalFractions = numFractions + extraFractionsNeeded;
        const newBED = newTotalFractions * dosePerFraction * (1 + dosePerFraction / alphaBeta);

        // Warnings
        const warnings = [];
        const remainingWeeks = Math.ceil(remainingFractions / 5);
        if (weeksNeeded > remainingWeeks) {
            warnings.push(`Cần ${weeksNeeded} tuần nhưng chỉ còn ${remainingWeeks} tuần điều trị`);
        }

        return {
            method: 'SIX_DAYS_WEEK',
            extraFractionsNeeded,
            weeksNeeded,
            daysSaved,
            newTotalFractions,
            newTotalDose: newTotalFractions * dosePerFraction,
            dosePerFraction, // Maintained
            newBED,
            bedCompensation: newBED - (numFractions * dosePerFraction * (1 + dosePerFraction / alphaBeta)),
            feasible: weeksNeeded <= remainingWeeks,
            warnings,
            description: `Chiếu 6 ngày/tuần trong ${weeksNeeded} tuần, tiết kiệm ${daysSaved} ngày`
        };
    }
}

/**
 * Dose Escalation Strategy
 */
class DoseEscalationStrategy extends CompensationStrategy {
    constructor() {
        super('Dose Escalation', 4);
    }

    calculateCompensation(params) {
        const { bedLoss, alphaBeta, numFractions, dosePerFraction } = params;

        // Target BED = original BED + BED loss
        const originalBED = numFractions * dosePerFraction * (1 + dosePerFraction / alphaBeta);
        const targetBED = originalBED + bedLoss;

        // Solve quadratic equation for new dose per fraction
        // n × d_new × (1 + d_new/(α/β)) = targetBED
        // n × d_new + (n/(α/β)) × d_new² = targetBED
        // (n/(α/β)) × d_new² + n × d_new - targetBED = 0
        
        const a = numFractions / alphaBeta;
        const b = numFractions;
        const c = -targetBED;

        const discriminant = b * b - 4 * a * c;
        
        if (discriminant < 0) {
            return {
                method: 'DOSE_ESCALATION',
                feasible: false,
                warnings: ['Không thể tính được liều mới (discriminant < 0)'],
                description: 'Phương pháp không khả thi'
            };
        }

        const newDosePerFraction = (-b + Math.sqrt(discriminant)) / (2 * a);
        const newTotalDose = numFractions * newDosePerFraction;
        const newBED = numFractions * newDosePerFraction * (1 + newDosePerFraction / alphaBeta);

        // Calculate dose increase percentage
        const doseIncreasePercent = ((newDosePerFraction - dosePerFraction) / dosePerFraction) * 100;

        // Warnings
        const warnings = [];
        if (doseIncreasePercent > 10) {
            warnings.push(`⚠️ Tăng liều ${doseIncreasePercent.toFixed(1)}% (>10%), cần xem xét kỹ`);
        }
        if (newDosePerFraction > 3.0) {
            warnings.push(`⚠️ Liều/phân liều cao (${newDosePerFraction.toFixed(2)} Gy), cân nhắc rủi ro`);
        }

        return {
            method: 'DOSE_ESCALATION',
            newDosePerFraction: Number(newDosePerFraction.toFixed(2)),
            originalDosePerFraction: dosePerFraction,
            doseIncreasePercent: Number(doseIncreasePercent.toFixed(1)),
            numFractions, // Maintained
            newTotalDose: Number(newTotalDose.toFixed(2)),
            newBED: Number(newBED.toFixed(2)),
            bedCompensation: Number((newBED - originalBED).toFixed(2)),
            feasible: true,
            warnings,
            description: `Tăng liều lên ${newDosePerFraction.toFixed(2)} Gy/fx (+${doseIncreasePercent.toFixed(1)}%)`
        };
    }
}

/**
 * Hybrid Strategy - Combination of methods
 */
class HybridStrategy extends CompensationStrategy {
    constructor() {
        super('Hybrid', 5);
    }

    calculateCompensation(params) {
        const { methods, bedLoss } = params;

        // Validate max 3 methods
        if (methods.length > 3) {
            return {
                method: 'HYBRID',
                feasible: false,
                warnings: ['Không thể kết hợp quá 3 phương pháp'],
                description: 'Giới hạn tối đa 3 phương pháp'
            };
        }

        // Check for conflicts
        const conflicts = this.detectConflicts(methods);
        if (conflicts.length > 0) {
            return {
                method: 'HYBRID',
                feasible: false,
                warnings: conflicts,
                description: 'Các phương pháp xung đột'
            };
        }

        // Calculate total compensation
        let totalBEDCompensation = 0;
        const methodDetails = [];

        for (const method of methods) {
            totalBEDCompensation += method.bedCompensation || 0;
            methodDetails.push({
                name: method.method,
                contribution: method.bedCompensation || 0
            });
        }

        // Check if compensation is adequate
        const adequate = totalBEDCompensation >= bedLoss;

        const warnings = [];
        if (!adequate) {
            warnings.push(`Bù trừ chưa đủ: ${totalBEDCompensation.toFixed(2)} Gy < ${bedLoss.toFixed(2)} Gy`);
        }

        return {
            method: 'HYBRID',
            methods: methodDetails,
            totalBEDCompensation: Number(totalBEDCompensation.toFixed(2)),
            bedLossTarget: bedLoss,
            adequate,
            feasible: adequate,
            warnings,
            description: `Kết hợp ${methods.length} phương pháp: ${methods.map(m => m.method).join(' + ')}`
        };
    }

    detectConflicts(methods) {
        const conflicts = [];
        const methodNames = methods.map(m => m.method);

        // BID + Dose Escalation conflict (both change treatment intensity)
        if (methodNames.includes('BID') && methodNames.includes('DOSE_ESCALATION')) {
            conflicts.push('BID và Dose Escalation xung đột (cả hai đều thay đổi cường độ điều trị)');
        }

        // Extra Fractions + Dose Escalation conflict (both change total dose)
        if (methodNames.includes('EXTRA_FRACTIONS') && methodNames.includes('DOSE_ESCALATION')) {
            conflicts.push('Extra Fractions và Dose Escalation xung đột (cả hai đều thay đổi tổng liều)');
        }

        return conflicts;
    }
}

// Export strategies
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        CompensationStrategy,
        BIDStrategy,
        ExtraFractionsStrategy,
        SixDayWeekStrategy,
        DoseEscalationStrategy,
        HybridStrategy
    };
}

// Create global instances
window.compensationStrategies = {
    bid: new BIDStrategy(),
    extraFractions: new ExtraFractionsStrategy(),
    sixDaysWeek: new SixDayWeekStrategy(),
    doseEscalation: new DoseEscalationStrategy(),
    hybrid: new HybridStrategy()
};

console.log('✅ Gap Compensation Strategies Module loaded');
