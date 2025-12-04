/**
 * Gap Compensation UI Module
 * Handles UI interactions and display for gap compensation
 * Feature: gap-compensation
 */

class GapCompensationUI {
    constructor() {
        this.currentResults = null;
        this.selectedMethod = null;
    }

    /**
     * Initialize UI event handlers
     */
    initialize() {
        // Will be called when DOM is ready
        console.log('Gap Compensation UI initialized');
    }

    /**
     * Calculate and display all compensation methods
     */
    calculateAllMethods() {
        try {
            // Get input values
            const params = this.getInputParameters();
            
            // Validate inputs
            const validation = window.gapCalculator.validateGapParameters(
                params.gapDays,
                params.tumorDoublingTime,
                params.alphaBeta
            );

            if (!validation.isValid) {
                this.displayErrors(validation.errors);
                return;
            }

            // Display warnings if any
            if (validation.warnings.length > 0) {
                this.displayWarnings(validation.warnings);
            }

            // Calculate BED loss
            const bedLoss = window.gapCalculator.calculateBEDLoss(
                params.gapDays,
                params.tumorDoublingTime,
                params.alphaBeta
            );

            // Calculate original BED
            const originalBED = window.gapCalculator.calculateBED(
                params.numFractions,
                params.dosePerFraction,
                params.alphaBeta
            );

            // Prepare parameters for strategies
            const strategyParams = {
                ...params,
                bedLoss,
                originalBED,
                remainingFractions: params.numFractions - (params.completedFractions || 0)
            };

            // Calculate all methods
            const results = {
                input: params,
                bedLoss,
                originalBED,
                methods: {}
            };

            // BID Strategy
            results.methods.BID = window.compensationStrategies.bid.calculateCompensation(strategyParams);

            // Extra Fractions Strategy
            results.methods.EXTRA_FRACTIONS = window.compensationStrategies.extraFractions.calculateCompensation(strategyParams);

            // Six Days Week Strategy
            results.methods.SIX_DAYS_WEEK = window.compensationStrategies.sixDaysWeek.calculateCompensation(strategyParams);

            // Dose Escalation Strategy
            results.methods.DOSE_ESCALATION = window.compensationStrategies.doseEscalation.calculateCompensation(strategyParams);

            // Store results
            this.currentResults = results;

            // Display results
            this.displayResults(results);

        } catch (error) {
            this.displayErrors([error.message]);
        }
    }

    /**
     * Get input parameters from form
     */
    getInputParameters() {
        return {
            gapDays: parseFloat(document.getElementById('gapDays')?.value) || 0,
            tumorDoublingTime: parseFloat(document.getElementById('tumorDoublingTime')?.value) || 
                              window.gapCalculator.getDefaultDoublingTime(),
            alphaBeta: parseFloat(document.getElementById('gapAlphaBeta')?.value) || 10,
            totalDose: parseFloat(document.getElementById('originalTotalDose')?.value) || 0,
            numFractions: parseInt(document.getElementById('originalFractions')?.value) || 0,
            dosePerFraction: 0, // Will be calculated
            completedFractions: parseInt(document.getElementById('completedFractions')?.value) || 0
        };
    }

    /**
     * Display calculation results
     */
    displayResults(results) {
        const resultsDiv = document.getElementById('gapCompensationResults');
        if (!resultsDiv) return;

        // Calculate dose per fraction
        results.input.dosePerFraction = results.input.totalDose / results.input.numFractions;

        let html = `
            <div class="gap-results">
                <h3>📊 Kết quả phân tích Gap Compensation</h3>
                
                <div class="gap-summary">
                    <h4>Thông tin Gap:</h4>
                    <p><strong>Số ngày gián đoạn:</strong> ${results.input.gapDays} ngày</p>
                    <p><strong>Tumor doubling time:</strong> ${results.input.tumorDoublingTime} ngày</p>
                    <p><strong>BED Loss:</strong> <span class="highlight-danger">${results.bedLoss.toFixed(2)} Gy</span></p>
                    <p><strong>BED ban đầu:</strong> ${results.originalBED.toFixed(2)} Gy</p>
                </div>

                <div class="methods-comparison">
                    <h4>So sánh các phương pháp bù trừ:</h4>
                    <table class="comparison-table">
                        <thead>
                            <tr>
                                <th>Phương pháp</th>
                                <th>Mô tả</th>
                                <th>BED sau bù</th>
                                <th>Độ phức tạp</th>
                                <th>Khả thi</th>
                            </tr>
                        </thead>
                        <tbody>
        `;

        // Add each method
        for (const [key, method] of Object.entries(results.methods)) {
            const feasibleIcon = method.feasible ? '✅' : '❌';
            const feasibleClass = method.feasible ? 'feasible' : 'not-feasible';
            const complexityStars = '⭐'.repeat(window.compensationStrategies[key.toLowerCase().replace('_', '')]?.complexityScore || 3);

            html += `
                <tr class="${feasibleClass}" onclick="window.gapCompensationUI.showMethodDetails('${key}')">
                    <td><strong>${method.method}</strong></td>
                    <td>${method.description || 'N/A'}</td>
                    <td>${method.newBED ? method.newBED.toFixed(2) + ' Gy' : 'N/A'}</td>
                    <td>${complexityStars}</td>
                    <td>${feasibleIcon}</td>
                </tr>
            `;
        }

        html += `
                        </tbody>
                    </table>
                </div>

                <div class="method-details" id="methodDetails" style="display: none;">
                    <!-- Method details will be shown here -->
                </div>

                <div class="gap-actions">
                    <button class="btn btn-primary" onclick="window.gapCompensationUI.exportResults()">
                        📥 Xuất kết quả
                    </button>
                </div>
            </div>
        `;

        resultsDiv.innerHTML = html;
        resultsDiv.style.display = 'block';
    }

    /**
     * Show detailed information for a specific method
     */
    showMethodDetails(methodKey) {
        if (!this.currentResults) return;

        const method = this.currentResults.methods[methodKey];
        if (!method) return;

        const detailsDiv = document.getElementById('methodDetails');
        if (!detailsDiv) return;

        let html = `
            <h4>Chi tiết: ${method.method}</h4>
            <div class="method-detail-content">
                <p><strong>Mô tả:</strong> ${method.description}</p>
        `;

        // Add method-specific details
        if (methodKey === 'BID') {
            html += `
                <p><strong>Số phân liều bổ sung:</strong> ${method.extraFractionsNeeded}</p>
                <p><strong>Số ngày chiếu BID:</strong> ${method.bidDays}</p>
                <p><strong>Tổng số phân liều mới:</strong> ${method.newTotalFractions}</p>
            `;
        } else if (methodKey === 'EXTRA_FRACTIONS') {
            html += `
                <p><strong>Số phân liều bổ sung:</strong> ${method.extraFractionsNeeded}</p>
                <p><strong>Số ngày điều trị thêm:</strong> ~${method.extraTreatmentDays} ngày</p>
                <p><strong>Tổng liều mới:</strong> ${method.newTotalDose.toFixed(2)} Gy</p>
            `;
        } else if (methodKey === 'SIX_DAYS_WEEK') {
            html += `
                <p><strong>Số tuần cần thiết:</strong> ${method.weeksNeeded}</p>
                <p><strong>Số ngày tiết kiệm:</strong> ${method.daysSaved}</p>
            `;
        } else if (methodKey === 'DOSE_ESCALATION') {
            html += `
                <p><strong>Liều/phân liều mới:</strong> ${method.newDosePerFraction} Gy</p>
                <p><strong>Tăng liều:</strong> ${method.doseIncreasePercent}%</p>
                <p><strong>Tổng liều mới:</strong> ${method.newTotalDose} Gy</p>
            `;
        }

        // Add warnings
        if (method.warnings && method.warnings.length > 0) {
            html += `
                <div class="warnings">
                    <h5>⚠️ Cảnh báo:</h5>
                    <ul>
                        ${method.warnings.map(w => `<li>${w}</li>`).join('')}
                    </ul>
                </div>
            `;
        }

        html += `</div>`;

        detailsDiv.innerHTML = html;
        detailsDiv.style.display = 'block';
    }

    /**
     * Display error messages
     */
    displayErrors(errors) {
        const resultsDiv = document.getElementById('gapCompensationResults');
        if (!resultsDiv) return;

        const html = `
            <div class="error-message">
                <h4>❌ Lỗi:</h4>
                <ul>
                    ${errors.map(e => `<li>${e}</li>`).join('')}
                </ul>
            </div>
        `;

        resultsDiv.innerHTML = html;
        resultsDiv.style.display = 'block';
    }

    /**
     * Display warning messages
     */
    displayWarnings(warnings) {
        const resultsDiv = document.getElementById('gapCompensationResults');
        if (!resultsDiv) return;

        const html = `
            <div class="warning-message">
                <h4>⚠️ Cảnh báo:</h4>
                <ul>
                    ${warnings.map(w => `<li>${w}</li>`).join('')}
                </ul>
            </div>
        `;

        resultsDiv.innerHTML = html;
        resultsDiv.style.display = 'block';
    }

    /**
     * Export results to text file
     */
    exportResults() {
        if (!this.currentResults) {
            alert('Không có kết quả để xuất');
            return;
        }

        const text = this.generateExportText(this.currentResults);
        const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `gap-compensation-${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    /**
     * Generate export text
     */
    generateExportText(results) {
        const dosePerFraction = results.input.totalDose / results.input.numFractions;
        
        let text = `=== KẾ HOẠCH BÙ TRỪ GIÁN ĐOẠN ĐIỀU TRỊ ===\n`;
        text += `Ngày tạo: ${new Date().toLocaleString('vi-VN')}\n\n`;

        text += `PHÁC ĐỒ BAN ĐẦU:\n`;
        text += `- Tổng liều: ${results.input.totalDose} Gy\n`;
        text += `- Số phân liều: ${results.input.numFractions}\n`;
        text += `- Liều/phân liều: ${dosePerFraction.toFixed(2)} Gy\n`;
        text += `- α/β: ${results.input.alphaBeta} Gy\n`;
        text += `- BED ban đầu: ${results.originalBED.toFixed(2)} Gy\n\n`;

        text += `THÔNG TIN GIÁN ĐOẠN:\n`;
        text += `- Số ngày gián đoạn: ${results.input.gapDays}\n`;
        text += `- Thời gian tăng gấp đôi khối u: ${results.input.tumorDoublingTime} ngày\n`;
        text += `- BED loss: ${results.bedLoss.toFixed(2)} Gy\n\n`;

        text += `CÁC PHƯƠNG PHÁP BÙ TRỪ:\n\n`;

        for (const [key, method] of Object.entries(results.methods)) {
            text += `${method.method}:\n`;
            text += `- Mô tả: ${method.description}\n`;
            text += `- Khả thi: ${method.feasible ? 'Có' : 'Không'}\n`;
            if (method.newBED) {
                text += `- BED sau bù: ${method.newBED.toFixed(2)} Gy\n`;
            }
            if (method.warnings && method.warnings.length > 0) {
                text += `- Cảnh báo: ${method.warnings.join('; ')}\n`;
            }
            text += `\n`;
        }

        return text;
    }
}

// Create global instance
window.gapCompensationUI = new GapCompensationUI();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.gapCompensationUI.initialize();
    });
} else {
    window.gapCompensationUI.initialize();
}

console.log('✅ Gap Compensation UI Module loaded');
