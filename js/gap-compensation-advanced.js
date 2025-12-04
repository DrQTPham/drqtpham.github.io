/**
 * Advanced Gap Compensation Calculator
 * Implements 6 methods for compensating radiation dose gaps
 * Based on radiobiology principles and clinical practice
 */

class GapCompensationCalculator {
    constructor() {
        this.methods = {
            BID: 'BID (2 phân liều/ngày)',
            EXTRA_FRACTIONS: 'Thêm phân liều',
            SIX_DAYS_WEEK: 'Chiếu 6 ngày/tuần',
            INCREASE_DOSE: 'Tăng liều/phân liều',
            HYBRID: 'Kết hợp (Hybrid)'
        };
    }

    /**
     * Calculate BED (Biologically Effective Dose)
     * Formula: BED = n × d × (1 + d/(α/β))
     */
    calculateBED(n, d, alphaBeta) {
        return n * d * (1 + d / alphaBeta);
    }

    /**
     * Calculate dose loss due to repopulation
     * Formula: D_loss = k × T_gap
     */
    calculateDoseLoss(k, tGap) {
        return k * tGap;
    }

    /**
     * Calculate BED loss
     * Formula: BED_loss = D_loss × (1 + d/(α/β))
     */
    calculateBEDLoss(dLoss, d, alphaBeta) {
        return dLoss * (1 + d / alphaBeta);
    }

    /**
     * METHOD 1: BID (Twice daily fractions ≥ 6 hours apart)
     * Goal: Shorten OTT to reduce/eliminate repopulation
     */
    calculateBID(params) {
        const { nRemain, d, alphaBeta, tLoss, nDaysBID, ottPre, ottMax } = params;
        
        // 1.1. Number of days needed to deliver remaining fractions with BID
        const nBID = Math.ceil(nRemain / 2);
        
        // 1.2. New OTT
        const ottNew = ottPre + nBID;
        
        // 1.3. Check if within OTT max
        const withinOTTLimit = ottNew <= ottMax;
        
        // 1.4. Calculate new tumor BED
        const bedLoss = this.calculateBEDLoss(tLoss * params.k, d, alphaBeta);
        const bedTumorNew = this.calculateBED(params.nDelivered + nRemain, d, alphaBeta) - bedLoss;
        
        return {
            method: 'BID',
            nBID,
            ottNew,
            withinOTTLimit,
            bedTumorNew,
            bedLoss,
            feasible: withinOTTLimit,
            description: `Chiếu 2 lần/ngày trong ${nBID} ngày`,
            warnings: withinOTTLimit ? [] : ['OTT vượt quá giới hạn, cần kết hợp phương pháp khác']
        };
    }

    /**
     * METHOD 2: Extra Fractions
     * Goal: Add fractions to compensate for lost dose
     */
    calculateExtraFractions(params) {
        const { nPlan, nExtra, d, alphaBeta, dLoss, bedPlan } = params;
        
        // 2.1. New total fractions
        const nNew = nPlan + nExtra;
        
        // 2.2. New tumor BED
        const bedLoss = this.calculateBEDLoss(dLoss, d, alphaBeta);
        const bedTumorNew = this.calculateBED(nNew, d, alphaBeta) - bedLoss;
        
        // 2.3. Check if sufficient
        const sufficient = bedTumorNew >= bedPlan;
        
        // Calculate how many extra fractions actually needed
        const bedDeficit = bedPlan + bedLoss - this.calculateBED(nPlan, d, alphaBeta);
        const nExtraNeeded = Math.ceil(bedDeficit / (d * (1 + d / alphaBeta)));
        
        return {
            method: 'EXTRA_FRACTIONS',
            nNew,
            nExtra,
            nExtraNeeded,
            bedTumorNew,
            bedLoss,
            sufficient,
            feasible: true,
            description: `Thêm ${nExtraNeeded} phân liều (${d.toFixed(1)} Gy/fx)`,
            warnings: sufficient ? [] : [`Cần thêm ${nExtraNeeded - nExtra} phân liều nữa`]
        };
    }

    /**
     * METHOD 3: Six Days per Week (add Saturday)
     * Goal: Shorten total treatment time without increasing total dose
     */
    calculateSixDaysWeek(params) {
        const { tGap, nWeek, ottPlan, bedPlan, bedLoss } = params;
        
        // 3.1. Days gained by 6 fr/week
        const tGain = nWeek * 1; // 1 day per week
        
        // 3.2. New OTT
        const ottNew = ottPlan - tGain;
        
        // 3.3. Tumor BED (no dose change, only time)
        const bedTumorNew = bedPlan - bedLoss;
        
        // Check if time compensation is sufficient
        const timeCompensated = tGain >= tGap;
        
        return {
            method: 'SIX_DAYS_WEEK',
            tGain,
            ottNew,
            bedTumorNew,
            timeCompensated,
            feasible: true,
            description: `Chiếu 6 ngày/tuần trong ${nWeek} tuần, tiết kiệm ${tGain} ngày`,
            warnings: timeCompensated ? [] : ['Chỉ bù được thời gian, không bù liều. Cần kết hợp phương pháp khác nếu gap lớn']
        };
    }

    /**
     * METHOD 4: Increase Dose per Fraction
     * Goal: Use higher dose per fraction to compensate for BED loss
     * Solves quadratic equation for d_new
     */
    calculateIncreaseDose(params) {
        const { nRemain, alphaBeta, bedPlan, bedDelivered, bedLoss } = params;
        
        // Required BED for remaining fractions
        const bedReq = bedPlan - bedDelivered + bedLoss;
        
        // Solve quadratic equation: (nRemain/alphaBeta) × d² + nRemain × d - bedReq = 0
        const a = nRemain / alphaBeta;
        const b = nRemain;
        const c = -bedReq;
        
        // Quadratic formula: d = (-b + sqrt(b² + 4ac)) / 2a
        const discriminant = b * b - 4 * a * c;
        
        if (discriminant < 0) {
            return {
                method: 'INCREASE_DOSE',
                feasible: false,
                description: 'Không thể tính được liều mới',
                warnings: ['Phương trình không có nghiệm dương']
            };
        }
        
        const dNew = (-b + Math.sqrt(discriminant)) / (2 * a);
        
        // Check if new dose is clinically acceptable (typically < 4 Gy for normal tissue tolerance)
        const clinicallyAcceptable = dNew <= 4.0;
        
        // Calculate new BED
        const bedTumorNew = this.calculateBED(nRemain, dNew, alphaBeta) + bedDelivered - bedLoss;
        
        return {
            method: 'INCREASE_DOSE',
            dNew,
            nRemain,
            bedTumorNew,
            bedReq,
            clinicallyAcceptable,
            feasible: true,
            description: `Tăng liều lên ${dNew.toFixed(2)} Gy/fx cho ${nRemain} phân liều còn lại`,
            warnings: clinicallyAcceptable ? [] : ['⚠️ Liều/fx cao (>4 Gy), nguy cơ độc tính cấp cao']
        };
    }

    /**
     * METHOD 5: Invalid - Fraction spacing < 6 hours
     * This method is NOT recommended and should be rejected
     */
    validateFractionSpacing(deltaT) {
        if (deltaT < 6) {
            return {
                method: 'INVALID_SPACING',
                feasible: false,
                description: 'KHÔNG AN TOÀN: Khoảng cách giữa 2 phân liều < 6 giờ',
                warnings: ['❌ Tế bào bình thường chưa phục hồi đủ (incomplete repair)', '❌ Nguy cơ độc tính cấp và muộn rất cao', '❌ KHÔNG được phép sử dụng phương pháp này']
            };
        }
        return { feasible: true };
    }

    /**
     * METHOD 6: Hybrid (Combination of BID + Extra Fractions + 6 days/week)
     * Goal: Find optimal combination that satisfies both BED ≥ BED_plan and OTT ≤ OTT_max
     */
    calculateHybrid(params) {
        const { nDelivered, nRemain, nExtra, nBID, n6Week, d, alphaBeta, bedPlan, ottPre, ottMax, dLoss } = params;
        
        // 6.1. Total BED
        const bedLoss = this.calculateBEDLoss(dLoss, d, alphaBeta);
        const bedTumorNew = this.calculateBED(nDelivered + nRemain + nExtra, d, alphaBeta) - bedLoss;
        
        // 6.2. Total OTT calculation
        // Days for BID portion
        const daysBID = Math.ceil((nBID * 2) / 2); // BID delivers 2 fr/day
        // Days for remaining fractions at 5 fr/week
        const remainingFr = nRemain + nExtra - (nBID * 2);
        const daysRegular = Math.ceil(remainingFr / 5) * 7; // 5 fr/week
        // Days saved by 6 fr/week
        const daysSaved = n6Week;
        
        const ottNew = ottPre + daysBID + daysRegular - daysSaved;
        
        // 6.3. Check conditions
        const bedSufficient = bedTumorNew >= bedPlan;
        const ottAcceptable = ottNew <= ottMax;
        const feasible = bedSufficient && ottAcceptable;
        
        return {
            method: 'HYBRID',
            nExtra,
            nBID,
            n6Week,
            bedTumorNew,
            ottNew,
            bedSufficient,
            ottAcceptable,
            feasible,
            description: `Kết hợp: ${nBID} ngày BID + ${nExtra} phân liều thêm + ${n6Week} tuần 6 ngày`,
            warnings: feasible ? [] : [
                !bedSufficient ? 'BED chưa đủ' : '',
                !ottAcceptable ? 'OTT vượt quá' : ''
            ].filter(w => w)
        };
    }

    /**
     * Optimize hybrid method by trying different combinations
     */
    optimizeHybrid(baseParams) {
        const results = [];
        
        // Try different combinations
        for (let nExtra = 0; nExtra <= 5; nExtra++) {
            for (let nBID = 0; nBID <= Math.ceil(baseParams.nRemain / 2); nBID++) {
                for (let n6Week = 0; n6Week <= 4; n6Week++) {
                    const params = { ...baseParams, nExtra, nBID, n6Week };
                    const result = this.calculateHybrid(params);
                    
                    if (result.feasible) {
                        results.push({
                            ...result,
                            score: nExtra + nBID + n6Week // Prefer simpler solutions
                        });
                    }
                }
            }
        }
        
        // Sort by score (lower is better - simpler solution)
        results.sort((a, b) => a.score - b.score);
        
        return results;
    }

    /**
     * Calculate all methods and return recommendations
     */
    calculateAllMethods(params) {
        const results = {
            input: params,
            methods: {}
        };
        
        // Calculate dose loss
        const dLoss = this.calculateDoseLoss(params.k, params.tGap);
        const d = params.totalDose / params.nPlan;
        const bedPlan = this.calculateBED(params.nPlan, d, params.alphaBeta);
        const bedDelivered = this.calculateBED(params.nDelivered, d, params.alphaBeta);
        const bedLoss = this.calculateBEDLoss(dLoss, d, params.alphaBeta);
        
        // Add calculated values to params
        const enrichedParams = {
            ...params,
            d,
            dLoss,
            bedPlan,
            bedDelivered,
            bedLoss
        };
        
        // Method 1: BID
        results.methods.BID = this.calculateBID({
            ...enrichedParams,
            nRemain: params.nPlan - params.nDelivered,
            ottPre: params.ottCompleted || 0,
            ottMax: params.ottMax || 999
        });
        
        // Method 2: Extra Fractions
        results.methods.EXTRA_FRACTIONS = this.calculateExtraFractions({
            ...enrichedParams,
            nExtra: Math.ceil(dLoss / d)
        });
        
        // Method 3: Six Days/Week
        const weeksRemaining = Math.ceil((params.nPlan - params.nDelivered) / 5);
        results.methods.SIX_DAYS_WEEK = this.calculateSixDaysWeek({
            ...enrichedParams,
            nWeek: weeksRemaining,
            ottPlan: params.ottPlan || 0
        });
        
        // Method 4: Increase Dose
        results.methods.INCREASE_DOSE = this.calculateIncreaseDose({
            ...enrichedParams,
            nRemain: params.nPlan - params.nDelivered
        });
        
        // Method 6: Hybrid (find optimal combination)
        const hybridResults = this.optimizeHybrid({
            ...enrichedParams,
            nDelivered: params.nDelivered,
            nRemain: params.nPlan - params.nDelivered,
            ottPre: params.ottCompleted || 0,
            ottMax: params.ottMax || 999
        });
        
        results.methods.HYBRID = hybridResults.length > 0 ? hybridResults[0] : {
            method: 'HYBRID',
            feasible: false,
            description: 'Không tìm thấy phương án kết hợp khả thi',
            warnings: ['Cần xem xét lại các thông số đầu vào']
        };
        
        // Add summary
        results.summary = {
            dLoss,
            bedLoss,
            bedPlan,
            bedDelivered,
            feasibleMethods: Object.values(results.methods).filter(m => m.feasible).length
        };
        
        return results;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GapCompensationCalculator };
}

// Create global instance
window.gapCompensationCalculator = new GapCompensationCalculator();

console.log('✅ Advanced Gap Compensation Calculator loaded');
