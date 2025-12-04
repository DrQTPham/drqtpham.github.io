// API Base URL
//const API_BASE_URL = 'http://localhost:8000/api/v1';
//const API_BASE_URL = 'http://localhost:8000';
//const API_URL = "http://192.168.30.105:8000";
//const API_BASE = "http://192.168.30.105:8000";     // nếu trong LAN
const API_BASE_URL = "http://192.168.30.105:8000/api/v1";
//const API_BASE_URL = "https://192.168.30.105:8000/api/v1";
//const API_BASE_URL = "http://192.168.30.105:8000";


//const API_URL = "https://192.168.30.105:8000";



// ============================================
// UTILITY: Normalize decimal input (hỗ trợ cả , và .)
// ============================================
function normalizeDecimal(value) {
    if (typeof value === 'string') {
        return value.replace(/,/g, '.');
    }
    return value;
}

function safeParseFloat(value) {
    return parseFloat(normalizeDecimal(value));
}

function safeParseInt(value) {
    return parseInt(normalizeDecimal(value));
}

// Load alpha/beta presets on page load
document.addEventListener('DOMContentLoaded', async () => {
    await loadAlphaBetaPresets();
    setupReverseAlphaBetaPreset();
});

// Load alpha/beta presets from API
async function loadAlphaBetaPresets() {
    try {
        const response = await fetch(`${API_BASE_URL}/presets/alpha-beta`);
        const presets = await response.json();
        
        const select = document.getElementById('alphaBetaPreset');
        presets.forEach(preset => {
            const option = document.createElement('option');
            option.value = preset.value;
            option.textContent = `${preset.name} (${preset.value} Gy)`;
            select.appendChild(option);
        });
        
        // Auto-fill alpha/beta when preset is selected
        select.addEventListener('change', (e) => {
            if (e.target.value) {
                document.getElementById('alphaBeta').value = e.target.value;
            }
        });
    } catch (error) {
        console.error('Error loading presets:', error);
        showAlert('Không thể tải danh sách α/β presets', 'error');
    }
}

// Setup alpha/beta preset for reverse calculation
function setupReverseAlphaBetaPreset() {
    const select = document.getElementById('reverseAlphaBetaPreset');
    if (select) {
        select.addEventListener('change', (e) => {
            if (e.target.value) {
                document.getElementById('reverseAlphaBeta').value = e.target.value;
            }
        });
    }
}

// Get form data
function getFormData() {
    const totalDose = document.getElementById('totalDose').value;
    const numFractions = document.getElementById('numFractions').value;
    const dosePerFraction = document.getElementById('dosePerFraction').value;
    const alphaBeta = document.getElementById('alphaBeta').value;
    
    if (!numFractions || !alphaBeta) {
        showAlert('Vui lòng nhập số phân liều và α/β', 'error');
        return null;
    }
    
    const data = {
        num_fractions: safeParseInt(numFractions),
        alpha_beta: safeParseFloat(alphaBeta)
    };
    
    if (totalDose) {
        data.total_dose = safeParseFloat(totalDose);
    }
    
    if (dosePerFraction) {
        data.dose_per_fraction = safeParseFloat(dosePerFraction);
    }
    
    if (!totalDose && !dosePerFraction) {
        showAlert('Vui lòng nhập tổng liều HOẶC liều/phân liều', 'error');
        return null;
    }
    
    return data;
}

// Calculate BED
window.calculateBED = async function() {
    const data = getFormData();
    if (!data) return;
    
    try {
        const response = await fetch(`${API_BASE_URL}/calculate/bed`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail?.error || 'Calculation failed');
        }
        
        const result = await response.json();
        displayResults(result);
    } catch (error) {
        showAlert(`Lỗi: ${error.message}`, 'error');
    }
};

// Calculate EQD2
window.calculateEQD2 = async function() {
    const data = getFormData();
    if (!data) return;
    
    try {
        const response = await fetch(`${API_BASE_URL}/calculate/eqd2`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail?.error || 'Calculation failed');
        }
        
        const result = await response.json();
        displayResults(result);
    } catch (error) {
        showAlert(`Lỗi: ${error.message}`, 'error');
    }
};

// Calculate Both
window.calculateBoth = async function() {
    const data = getFormData();
    if (!data) return;
    
    try {
        const response = await fetch(`${API_BASE_URL}/calculate/both`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail?.error || 'Calculation failed');
        }
        
        const result = await response.json();
        displayResults(result);
    } catch (error) {
        showAlert(`Lỗi: ${error.message}`, 'error');
    }
};

// Calculate Reverse
window.calculateReverse = async function() {
    const targetEQD2 = document.getElementById('targetEQD2').value;
    const dosePerFraction = document.getElementById('reverseDosePerFraction').value;
    const alphaBeta = document.getElementById('reverseAlphaBeta').value;
    
    if (!targetEQD2 || !dosePerFraction || !alphaBeta) {
        showAlert('Vui lòng nhập đầy đủ thông tin', 'error');
        return;
    }
    
    const data = {
        target_eqd2: safeParseFloat(targetEQD2),
        dose_per_fraction: safeParseFloat(dosePerFraction),
        alpha_beta: safeParseFloat(alphaBeta)
    };
    
    try {
        const response = await fetch(`${API_BASE_URL}/calculate/reverse`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail?.error || 'Calculation failed');
        }
        
        const result = await response.json();
        displayReverseResults(result);
    } catch (error) {
        showAlert(`Lỗi: ${error.message}`, 'error');
    }
};

// Display calculation results
function displayResults(result) {
    const resultsSection = document.getElementById('resultsSection');
    const resultsDiv = document.getElementById('results');
    
    let html = '';
    
    // Input parameters
    html += `
        <div class="result-item">
            <h3>Tổng liều (D)</h3>
            <div class="value">${result.total_dose.toFixed(2)}</div>
            <div class="unit">Gy</div>
        </div>
        <div class="result-item">
            <h3>Số phân liều (n)</h3>
            <div class="value">${result.num_fractions}</div>
            <div class="unit">fractions</div>
        </div>
        <div class="result-item">
            <h3>Liều/phân liều (d)</h3>
            <div class="value">${result.dose_per_fraction.toFixed(2)}</div>
            <div class="unit">Gy</div>
        </div>
    `;
    
    // Results
    if (result.bed !== null) {
        html += `
            <div class="result-item" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">
                <h3>BED</h3>
                <div class="value">${result.bed.toFixed(2)}</div>
                <div class="unit">Gy</div>
            </div>
        `;
    }
    
    if (result.eqd2 !== null) {
        html += `
            <div class="result-item" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);">
                <h3>EQD2</h3>
                <div class="value">${result.eqd2.toFixed(2)}</div>
                <div class="unit">Gy</div>
            </div>
        `;
    }
    
    resultsDiv.innerHTML = html;
    resultsSection.style.display = 'block';
    resultsSection.scrollIntoView({ behavior: 'smooth' });
    
    showAlert('Tính toán thành công!', 'success');
}

// Display reverse calculation results
function displayReverseResults(result) {
    const resultsDiv = document.getElementById('reverseResults');
    
    const html = `
        <div class="alert alert-success">
            <h3 style="margin-bottom: 10px;">✅ Kết quả tính ngược</h3>
            <p><strong>Số phân liều cần thiết:</strong> ${result.num_fractions} fractions</p>
            <p><strong>Tổng liều:</strong> ${result.total_dose.toFixed(2)} Gy</p>
            <p><strong>Liều/phân liều:</strong> ${result.dose_per_fraction.toFixed(2)} Gy</p>
            <p><strong>EQD2 đạt được:</strong> ${result.target_eqd2.toFixed(2)} Gy</p>
        </div>
    `;
    
    resultsDiv.innerHTML = html;
    resultsDiv.style.display = 'block';
}

// Load history
window.loadHistory = async function() {
    try {
        const response = await fetch(`${API_BASE_URL}/history`);
        const data = await response.json();
        
        const historyDiv = document.getElementById('historyList');
        
        if (data.items.length === 0) {
            historyDiv.innerHTML = '<p style="color: #888;">Chưa có lịch sử tính toán</p>';
            return;
        }
        
        let html = '';
        data.items.forEach(item => {
            html += `
                <div class="history-item">
                    <div class="history-header">
                        <span class="history-type">${item.calculation_type.toUpperCase()}</span>
                        <span class="history-date">${new Date(item.created_at).toLocaleString('vi-VN')}</span>
                    </div>
                    <div class="history-details">
                        <div class="detail"><strong>D:</strong> ${item.total_dose.toFixed(2)} Gy</div>
                        <div class="detail"><strong>n:</strong> ${item.num_fractions}</div>
                        <div class="detail"><strong>α/β:</strong> ${item.alpha_beta.toFixed(2)} Gy</div>
                        ${item.bed ? `<div class="detail"><strong>BED:</strong> ${item.bed.toFixed(2)} Gy</div>` : ''}
                        ${item.eqd2 ? `<div class="detail"><strong>EQD2:</strong> ${item.eqd2.toFixed(2)} Gy</div>` : ''}
                    </div>
                </div>
            `;
        });
        
        historyDiv.innerHTML = html;
        showAlert(`Đã tải ${data.items.length} tính toán`, 'info');
    } catch (error) {
        showAlert(`Lỗi khi tải lịch sử: ${error.message}`, 'error');
    }
};

// Export history
window.exportHistory = async function() {
    try {
        const response = await fetch(`${API_BASE_URL}/history/export`, {
            method: 'POST'
        });
        
        const text = await response.text();
        
        // Create download link
        const blob = new Blob([text], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `eqd2_bed_history_${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        showAlert('Đã xuất file thành công!', 'success');
    } catch (error) {
        showAlert(`Lỗi khi xuất file: ${error.message}`, 'error');
    }
};

// Show alert message
window.showAlert = function(message, type = 'info') {
    // Remove existing alerts
    const existingAlerts = document.querySelectorAll('.alert');
    existingAlerts.forEach(alert => alert.remove());
    
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    
    const main = document.querySelector('main');
    main.insertBefore(alert, main.firstChild);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        alert.remove();
    }, 5000);
};



// Tumor repopulation database - Complete clinical parameters
// Based on QUANTEC, clinical trials, and radiobiology literature
const tumorRepopulationRates = {
    'hnscc': { 
        rate: 0.7, 
        name: 'U đầu cổ (HNSCC)', 
        alphaBeta: 10,
        tk: 21,  // kick-off time (days)
        tp: 3,   // doubling time during treatment (days)
        alpha: 0.3,  // Gy⁻¹
        range: '0.6-0.8',
        description: 'Head & Neck Squamous Cell Carcinoma'
    },
    'nsclc': { 
        rate: 0.6, 
        name: 'U phổi không tế bào nhỏ (NSCLC)', 
        alphaBeta: 10,
        tk: 21,
        tp: 4,
        alpha: 0.3,
        range: '0.5-0.7',
        description: 'Non-Small Cell Lung Cancer'
    },
    'sclc': { 
        rate: 0.75, 
        name: 'U phổi tế bào nhỏ (SCLC)', 
        alphaBeta: 9,
        tk: 18,
        tp: 2.5,
        alpha: 0.35,
        range: '0.7-0.8',
        description: 'Small Cell Lung Cancer'
    },
    'esophagus': { 
        rate: 0.6, 
        name: 'U thực quản (Esophagus)', 
        alphaBeta: 10,
        tk: 20,
        tp: 3.5,
        alpha: 0.3,
        range: '0.5-0.7',
        description: 'Esophageal Cancer'
    },
    'cervix': { 
        rate: 0.6, 
        name: 'U cổ tử cung (Cervix)', 
        alphaBeta: 10,
        tk: 20,
        tp: 3.5,
        alpha: 0.3,
        range: '0.6',
        description: 'Cervical Cancer'
    },
    'bladder': { 
        rate: 0.6, 
        name: 'U bàng quang (Bladder)', 
        alphaBeta: 10,
        tk: 21,
        tp: 3.5,
        alpha: 0.3,
        range: '0.5-0.7',
        description: 'Bladder Tumor'
    },
    'rectum': { 
        rate: 0.6, 
        name: 'U trực tràng (Rectum)', 
        alphaBeta: 10,
        tk: 21,
        tp: 3.5,
        alpha: 0.3,
        range: '0.5-0.7',
        description: 'Rectal Cancer'
    },
    'gbm': { 
        rate: 0.5, 
        name: 'U não ác tính (GBM)', 
        alphaBeta: 9,
        tk: 21,
        tp: 4,
        alpha: 0.3,
        range: '0.4-0.6',
        description: 'Glioblastoma Multiforme'
    },
    'lymphoma': { 
        rate: 1.0, 
        name: 'U lympho (Lymphoma)', 
        alphaBeta: 9,
        tk: 10,
        tp: 2,
        alpha: 0.35,
        range: '0.8-1.0',
        description: 'Lymphoma (fast repopulation)'
    },
    'breast': { 
        rate: 0.15, 
        name: 'U vú (Breast)', 
        alphaBeta: 3.5,
        tk: 35,
        tp: 8,
        alpha: 0.25,
        range: '0.1-0.2',
        description: 'Breast Cancer (slow repopulation)'
    },
    'prostate': { 
        rate: 0, 
        name: 'U tuyến tiền liệt (Prostate)', 
        alphaBeta: 1.5,
        tk: 999,  // Not applicable
        tp: 999,
        alpha: 0.15,
        range: '≈0',
        description: 'Prostate Cancer (negligible repopulation)'
    }
};

// Auto-fill repopulation rate when tumor type is selected
document.addEventListener('DOMContentLoaded', () => {
    const tumorSelect = document.getElementById('tumorType');
    if (tumorSelect) {
        tumorSelect.addEventListener('change', (e) => {
            const tumor = e.target.value;
            if (tumor && tumor !== 'custom' && tumorRepopulationRates[tumor]) {
                document.getElementById('repopulationRate').value = tumorRepopulationRates[tumor].rate;
            }
        });
    }
});

// Calculate gap compensation
window.calculateGapCompensation = function() {
    console.log('calculateGapCompensation called');
    
    // Sử dụng safe parse functions (hỗ trợ cả , và .)
    const repopulationRate = safeParseFloat(document.getElementById('repopulationRate').value);
    const gapDays = safeParseInt(document.getElementById('gapDays').value);
    const originalTotalDose = safeParseFloat(document.getElementById('originalTotalDose').value);
    const originalFractions = safeParseInt(document.getElementById('originalFractions').value);
    const completedFractions = safeParseInt(document.getElementById('completedFractions').value);
    
    console.log('Values:', { repopulationRate, gapDays, originalTotalDose, originalFractions, completedFractions });
    
    // Validation
    if (!repopulationRate || !gapDays || !originalTotalDose || !originalFractions || completedFractions === undefined) {
        showAlert('Vui lòng nhập đầy đủ thông tin', 'error');
        return;
    }
    
    if (isNaN(repopulationRate) || isNaN(gapDays) || isNaN(originalTotalDose) || isNaN(originalFractions) || isNaN(completedFractions)) {
        showAlert('Vui lòng nhập giá trị số hợp lệ', 'error');
        return;
    }
    
    if (completedFractions > originalFractions) {
        showAlert('Số phân liều đã hoàn thành không thể lớn hơn tổng số phân liều', 'error');
        return;
    }
    
    if (gapDays <= 0) {
        showAlert('Số ngày gián đoạn phải lớn hơn 0', 'error');
        return;
    }
    
    // Calculate
    const originalDosePerFraction = originalTotalDose / originalFractions;
    const completedDose = completedFractions * originalDosePerFraction;
    const remainingFractions = originalFractions - completedFractions;
    
    if (remainingFractions <= 0) {
        showAlert('Đã hoàn thành tất cả phân liều, không cần tính bù', 'error');
        return;
    }
    
    const remainingDose = remainingFractions * originalDosePerFraction;
    
    // Compensation dose due to tumor repopulation
    const compensationDose = gapDays * repopulationRate;
    
    // New total dose needed
    const newTotalDose = originalTotalDose + compensationDose;
    
    // Calculate new fractions needed (keeping same dose per fraction)
    const additionalFractions = Math.ceil(compensationDose / originalDosePerFraction);
    const newTotalFractions = originalFractions + additionalFractions;
    const newRemainingFractions = remainingFractions + additionalFractions;
    
    // Alternative: increase dose per fraction for remaining fractions
    const newDosePerFraction = (remainingDose + compensationDose) / remainingFractions;
    
    // Get tumor type name and parameters
    const tumorTypeElement = document.getElementById('tumorType');
    const tumorType = tumorTypeElement ? tumorTypeElement.value : '';
    const tumorData = tumorType && tumorType !== 'custom' && tumorRepopulationRates[tumorType] 
        ? tumorRepopulationRates[tumorType] 
        : null;
    const tumorDisplayName = tumorData ? tumorData.name : 'Loại u được chọn';
    
    console.log('Calculated:', {
        compensationDose,
        newTotalDose,
        additionalFractions,
        newTotalFractions,
        newDosePerFraction
    });
    
    // Display results
    const resultsDiv = document.getElementById('gapCompensationResults');
    if (!resultsDiv) {
        console.error('gapCompensationResults element not found');
        return;
    }
    
    let warningClass = 'alert-info';
    let warningText = 'ℹ️ Kết quả tính bù liều';
    
    if (compensationDose > 5) {
        warningClass = 'alert-error';
        warningText = '⚠️ CẢNH BÁO: Liều bù cao, cần xem xét kỹ!';
    } else if (compensationDose > 3) {
        warningClass = 'alert-info';
        warningText = '⚠️ Lưu ý: Liều bù đáng kể';
    }
    
    const html = `
        <div class="alert ${warningClass}">
            <h3 style="margin-bottom: 15px;">${warningText}</h3>
            
            <div style="background: white; padding: 15px; border-radius: 8px; margin: 15px 0;">
                <h4 style="color: #667eea; margin-bottom: 10px;">📊 Thông tin gián đoạn - ${tumorDisplayName}</h4>
                
                ${tumorData ? `
                <div style="background: #f8f9fa; padding: 10px; border-radius: 6px; margin-bottom: 15px; font-size: 0.85rem;">
                    <p style="margin: 3px 0; color: #555;"><strong>α/β:</strong> ${tumorData.alphaBeta} Gy</p>
                    <p style="margin: 3px 0; color: #555;"><strong>Tk (kick-off):</strong> ${tumorData.tk} ngày</p>
                    <p style="margin: 3px 0; color: #555;"><strong>Tp (doubling):</strong> ${tumorData.tp} ngày</p>
                    <p style="margin: 3px 0; color: #555;"><strong>α:</strong> ${tumorData.alpha} Gy⁻¹</p>
                    <p style="margin: 3px 0; color: #888; font-style: italic;">${tumorData.description}</p>
                </div>
                ` : ''}
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 15px;">
                    <div>
                        <p style="color: #666; font-size: 0.9rem; margin-bottom: 5px;">Số ngày gián đoạn:</p>
                        <p style="font-size: 1.1rem; font-weight: bold; color: #333;">
                            ${gapDays} ngày
                        </p>
                    </div>
                    
                    <div>
                        <p style="color: #666; font-size: 0.9rem; margin-bottom: 5px;">Tốc độ tái sinh (K):</p>
                        <p style="font-size: 1.1rem; font-weight: bold; color: #333;">
                            ${repopulationRate.toFixed(2)} Gy/ngày
                        </p>
                        ${tumorData ? `<p style="font-size: 0.75rem; color: #888; margin-top: 3px;">Range: ${tumorData.range} Gy/day</p>` : ''}
                    </div>
                </div>
                
                <div style="margin-top: 15px; padding: 12px; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); border-radius: 8px; color: white;">
                    <p style="font-size: 0.9rem; margin-bottom: 5px; opacity: 0.9;">💊 Liều cần bù (D_comp = K × N):</p>
                    <p style="font-size: 1.8rem; font-weight: bold; margin: 0;">
                        ${compensationDose.toFixed(2)} Gy
                    </p>
                    <p style="font-size: 0.8rem; margin-top: 5px; opacity: 0.8;">
                        = ${repopulationRate.toFixed(2)} × ${gapDays} ngày
                    </p>
                </div>
            </div>
            
            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 15px 0;">
                <h4 style="color: #667eea; margin-bottom: 10px;">💊 Phương án bù liều</h4>
                
                <div style="margin-bottom: 15px; padding: 12px; background: white; border-radius: 6px; border-left: 4px solid #667eea;">
                    <p style="font-weight: bold; color: #667eea; margin-bottom: 8px;">Phương án 1: Thêm phân liều (giữ nguyên liều/fx)</p>
                    <p style="margin: 5px 0;"><strong>Liều/phân liều:</strong> ${originalDosePerFraction.toFixed(2)} Gy (không đổi)</p>
                    <p style="margin: 5px 0;"><strong>Số phân liều cần thêm:</strong> ${additionalFractions} phân liều</p>
                    <p style="margin: 5px 0;"><strong>Tổng số phân liều mới:</strong> ${newTotalFractions} phân liều</p>
                    <p style="margin: 5px 0;"><strong>Tổng liều mới:</strong> ${newTotalDose.toFixed(2)} Gy</p>
                    <p style="margin: 5px 0; color: #666; font-size: 0.9rem;">
                        (Còn ${newRemainingFractions} phân liều × ${originalDosePerFraction.toFixed(2)} Gy)
                    </p>
                </div>
                
                <div style="padding: 12px; background: white; border-radius: 6px; border-left: 4px solid #764ba2;">
                    <p style="font-weight: bold; color: #764ba2; margin-bottom: 8px;">Phương án 2: Tăng liều/fx (giữ nguyên số fx)</p>
                    <p style="margin: 5px 0;"><strong>Liều/phân liều mới:</strong> ${newDosePerFraction.toFixed(2)} Gy 
                        <span style="color: ${newDosePerFraction > originalDosePerFraction * 1.1 ? '#f44' : '#4c4'};">
                            (${newDosePerFraction > originalDosePerFraction ? '+' : ''}${(newDosePerFraction - originalDosePerFraction).toFixed(2)} Gy)
                        </span>
                    </p>
                    <p style="margin: 5px 0;"><strong>Số phân liều còn lại:</strong> ${remainingFractions} phân liều (không đổi)</p>
                    <p style="margin: 5px 0;"><strong>Tổng liều mới:</strong> ${newTotalDose.toFixed(2)} Gy</p>
                    <p style="margin: 5px 0; color: #666; font-size: 0.9rem;">
                        (${remainingFractions} phân liều × ${newDosePerFraction.toFixed(2)} Gy)
                    </p>
                    ${newDosePerFraction > 3.0 ? '<p style="margin-top: 8px; color: #f44; font-size: 0.85rem;">⚠️ Lưu ý: Liều/fx cao, cần cân nhắc độc tính</p>' : ''}
                </div>
            </div>
            
            <div style="background: #fff3cd; padding: 12px; border-radius: 6px; border-left: 4px solid #ffc107;">
                <p style="font-size: 0.9rem; color: #856404; margin: 0;">
                    <strong>⚠️ Lưu ý quan trọng:</strong><br>
                    • Công thức này dựa trên mô hình tái sinh tế bào u tuyến tính<br>
                    • Phương án 1 thường an toàn hơn cho cơ quan lành<br>
                    • Phương án 2 tiện lợi hơn nhưng cần cân nhắc độc tính cấp<br>
                    • Quyết định cuối cùng cần dựa trên đánh giá lâm sàng tổng thể<br>
                    • Tham khảo thêm y văn và hội chẩn nếu gián đoạn kéo dài
                </p>
            </div>
            
            <div style="background: #e7f3ff; padding: 12px; border-radius: 6px; border-left: 4px solid #2196F3; margin-top: 15px;">
                <p style="font-size: 0.9rem; color: #0d47a1; margin: 0;">
                    <strong>📚 Tài liệu tham khảo:</strong><br>
                    • <a href="GAP_COMPENSATION_THEORY.md" target="_blank" style="color: #1976d2; text-decoration: underline;">Lý thuyết đầy đủ về tính bù liều</a><br>
                    • Bảng thông số α/β, Tk, Tp, K cho tất cả loại u<br>
                    • Công thức chi tiết và ví dụ lâm sàng<br>
                    • Dựa trên QUANTEC, PENTEC và các nghiên cứu lâm sàng
                </p>
            </div>
        </div>
    `;
    
    resultsDiv.innerHTML = html;
    resultsDiv.style.display = 'block';
    resultsDiv.scrollIntoView({ behavior: 'smooth' });
    
    console.log('Gap compensation results displayed');
};

// Organ dose limits (standard 2 Gy/fraction)
// Values based on QUANTEC, PENTEC, and clinical literature
const organLimits = {
    // CNS - Late Effects (α/β = 1.0-2.5)
    'lens': { limit: 10, alphaBeta: 1.0, name: 'Thủy tinh thể (Lens)', range: '0.7-1.0' },
    'spinal_cord': { limit: 45, alphaBeta: 2.0, name: 'Tủy sống (Spinal Cord)', range: '0.9-5.0' },
    'brainstem': { limit: 54, alphaBeta: 2.5, name: 'Thân não (Brainstem)', range: '2.0-3.0' },
    'brain': { limit: 60, alphaBeta: 2.5, name: 'Não (Brain)', range: '2.0-3.0' },
    'optic_nerve': { limit: 54, alphaBeta: 2.5, name: 'Dây thần kinh thị giác (Optic Nerve)', range: '2.0-3.0' },
    'optic_chiasm': { limit: 54, alphaBeta: 2.5, name: 'Giao thoa thị giác (Optic Chiasm)', range: '2.0-3.0' },
    
    // Thoracic Organs (α/β = 2.5-3.0)
    'lung': { limit: 20, alphaBeta: 3.0, name: 'Phổi (Lung - mean)', range: '2.0-4.0' },
    'heart': { limit: 30, alphaBeta: 3.0, name: 'Tim (Heart - mean)', range: '1.0-3.0' },
    
    // Abdominal Organs (α/β = 2.5-3.0)
    'kidney': { limit: 18, alphaBeta: 2.5, name: 'Thận (Kidney - mean)', range: '2.0-3.0' },
    'liver': { limit: 30, alphaBeta: 2.5, name: 'Gan (Liver - mean)', range: '2.0-3.0' },
    
    // Pelvic Organs (α/β = 3.0)
    'rectum': { limit: 60, alphaBeta: 3.0, name: 'Trực tràng (Rectum)', range: '2.5-3.5' },
    'bladder': { limit: 65, alphaBeta: 3.0, name: 'Bàng quang (Bladder)', range: '2.5-3.5' },
    
    // Head & Neck (α/β = 3.0)
    'parotid': { limit: 26, alphaBeta: 3.0, name: 'Tuyến nước bọt (Parotid - mean)', range: '2.5-3.5' },
    
    // Skin & Bone (α/β = 3.0-10)
    'skin_late': { limit: 50, alphaBeta: 3.0, name: 'Da - Late (Skin Fibrosis)', range: '2.5-3.5' },
    'bone': { limit: 60, alphaBeta: 3.0, name: 'Xương (Bone)', range: '2.5-3.5' }
};

// Auto-fill organ data when selected
document.addEventListener('DOMContentLoaded', () => {
    const organSelect = document.getElementById('organName');
    if (organSelect) {
        organSelect.addEventListener('change', (e) => {
            const organ = e.target.value;
            if (organ && organ !== 'custom' && organLimits[organ]) {
                document.getElementById('standardDoseLimit').value = organLimits[organ].limit;
                document.getElementById('organAlphaBeta').value = organLimits[organ].alphaBeta;
            }
        });
    }
});

// Calculate organ dose limit with new fractionation
window.calculateOrganLimit = function() {
    console.log('calculateOrganLimit called');
    
    const standardLimit = safeParseFloat(document.getElementById('standardDoseLimit').value);
    const organAlphaBeta = safeParseFloat(document.getElementById('organAlphaBeta').value);
    const newDosePerFraction = safeParseFloat(document.getElementById('newDosePerFraction').value);
    
    console.log('Values:', { standardLimit, organAlphaBeta, newDosePerFraction });
    
    if (!standardLimit || !organAlphaBeta || !newDosePerFraction) {
        showAlert('Vui lòng nhập đầy đủ thông tin', 'error');
        return;
    }
    
    if (isNaN(standardLimit) || isNaN(organAlphaBeta) || isNaN(newDosePerFraction)) {
        showAlert('Vui lòng nhập giá trị số hợp lệ', 'error');
        return;
    }
    
    // Calculate using BED equivalence
    // BED_standard = BED_new
    // D_standard × (1 + d_standard/α/β) = D_new × (1 + d_new/α/β)
    // With d_standard = 2 Gy
    
    const dStandard = 2.0;
    const bedStandard = standardLimit * (1 + dStandard / organAlphaBeta);
    
    // Solve for D_new (theoretical maximum)
    const dNew = newDosePerFraction;
    const theoreticalDoseLimit = bedStandard / (1 + dNew / organAlphaBeta);
    
    // Calculate practical dose (with integer fractions)
    const newNumFractions = Math.floor(theoreticalDoseLimit / dNew);
    const actualTotalDose = newNumFractions * dNew;
    
    // Calculate actual BED with new fractionation
    const actualBED = actualTotalDose * (1 + dNew / organAlphaBeta);
    
    // Calculate theoretical BED (if we could use fractional fractions)
    const theoreticalBED = theoreticalDoseLimit * (1 + dNew / organAlphaBeta);
    
    // Safety margin
    const safetyMargin = ((bedStandard - actualBED) / bedStandard * 100);
    
    // Display results
    const resultsDiv = document.getElementById('organLimitResults');
    if (!resultsDiv) {
        console.error('organLimitResults element not found');
        return;
    }
    
    const organNameElement = document.getElementById('organName');
    const organName = organNameElement ? organNameElement.value : '';
    const organDisplayName = organName && organName !== 'custom' && organLimits[organName] 
        ? organLimits[organName].name 
        : 'Cơ quan được chọn';
    
    console.log('Displaying results for:', organDisplayName);
    
    let warningClass = '';
    let warningText = '';
    
    if (actualBED > bedStandard) {
        warningClass = 'alert-error';
        warningText = '⚠️ CẢNH BÁO: BED vượt quá giới hạn an toàn!';
    } else if (safetyMargin < 5) {
        warningClass = 'alert-error';
        warningText = '⚠️ CẢNH BÁO: Margin an toàn quá thấp!';
    } else if (safetyMargin < 10) {
        warningClass = 'alert-info';
        warningText = 'ℹ️ Lưu ý: Margin an toàn hẹp, cần thận trọng';
    } else {
        warningClass = 'alert-success';
        warningText = '✅ Trong giới hạn an toàn';
    }
    
    const html = `
        <div class="alert ${warningClass}">
            <h3 style="margin-bottom: 15px;">${warningText}</h3>
            
            <div style="background: white; padding: 15px; border-radius: 8px; margin: 15px 0;">
                <h4 style="color: #667eea; margin-bottom: 10px;">📊 Kết quả tính toán cho ${organDisplayName}</h4>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 15px;">
                    <div>
                        <p style="color: #666; font-size: 0.9rem; margin-bottom: 5px;">Phác đồ chuẩn (2 Gy/fx):</p>
                        <p style="font-size: 1.1rem; font-weight: bold; color: #333;">
                            ${standardLimit.toFixed(1)} Gy
                        </p>
                        <p style="font-size: 0.85rem; color: #888;">
                            BED: ${bedStandard.toFixed(2)} Gy
                        </p>
                    </div>
                    
                    <div>
                        <p style="color: #666; font-size: 0.9rem; margin-bottom: 5px;">Phác đồ mới (${dNew.toFixed(1)} Gy/fx):</p>
                        <p style="font-size: 1.1rem; font-weight: bold; color: #f5576c;">
                            ${actualTotalDose.toFixed(1)} Gy
                        </p>
                        <p style="font-size: 0.85rem; color: #888;">
                            ${newNumFractions} phân liều
                        </p>
                    </div>
                </div>
                
                <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #eee;">
                    <p style="color: #666; font-size: 0.9rem;">BED với phác đồ mới:</p>
                    <p style="font-size: 1.2rem; font-weight: bold; color: #667eea;">
                        ${actualBED.toFixed(2)} Gy
                    </p>
                    <p style="font-size: 0.9rem; color: ${safetyMargin >= 0 ? '#4c4' : '#f44'};">
                        Margin an toàn: ${safetyMargin.toFixed(1)}%
                    </p>
                </div>
            </div>
            
            <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #ffc107;">
                <h4 style="color: #856404; margin-bottom: 10px;">📐 So sánh Liều Lý thuyết vs Thực tế</h4>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div style="background: white; padding: 12px; border-radius: 6px;">
                        <p style="color: #666; font-size: 0.85rem; margin-bottom: 5px;">💡 Liều lý thuyết (tính toán):</p>
                        <p style="font-size: 1.3rem; font-weight: bold; color: #667eea;">
                            ${theoreticalDoseLimit.toFixed(2)} Gy
                        </p>
                        <p style="font-size: 0.8rem; color: #888; margin-top: 5px;">
                            = ${(theoreticalDoseLimit / dNew).toFixed(2)} phân liều
                        </p>
                        <p style="font-size: 0.8rem; color: #888;">
                            BED = ${bedStandard.toFixed(2)} Gy (bằng chuẩn)
                        </p>
                    </div>
                    
                    <div style="background: white; padding: 12px; border-radius: 6px;">
                        <p style="color: #666; font-size: 0.85rem; margin-bottom: 5px;">✅ Liều thực tế (áp dụng):</p>
                        <p style="font-size: 1.3rem; font-weight: bold; color: #28a745;">
                            ${actualTotalDose.toFixed(2)} Gy
                        </p>
                        <p style="font-size: 0.8rem; color: #888; margin-top: 5px;">
                            = ${newNumFractions} phân liều (làm tròn)
                        </p>
                        <p style="font-size: 0.8rem; color: #888;">
                            BED = ${actualBED.toFixed(2)} Gy
                        </p>
                    </div>
                </div>
                
                <div style="margin-top: 12px; padding: 10px; background: #f8f9fa; border-radius: 4px;">
                    <p style="font-size: 0.85rem; color: #856404; margin: 0;">
                        <strong>📌 Giải thích:</strong> Liều lý thuyết là ${theoreticalDoseLimit.toFixed(2)} Gy, 
                        nhưng vì không thể xạ ${(theoreticalDoseLimit / dNew).toFixed(2)} phân liều, 
                        nên làm tròn xuống ${newNumFractions} fx → Liều thực tế ${actualTotalDose.toFixed(2)} Gy 
                        (an toàn hơn với margin ${safetyMargin.toFixed(1)}%)
                    </p>
                </div>
            </div>
            
            <div style="background: #f8f9fa; padding: 12px; border-radius: 6px; margin-top: 10px;">
                <p style="font-size: 0.9rem; color: #555; margin: 0;">
                    <strong>💊 Khuyến nghị lâm sàng:</strong> Sử dụng liều thực tế <strong>${actualTotalDose.toFixed(1)} Gy</strong> 
                    (${newNumFractions} phân liều × ${dNew.toFixed(1)} Gy) để đảm bảo an toàn cho ${organDisplayName}. 
                    Liều này tương đương sinh học với ${standardLimit.toFixed(1)} Gy ở phân liều chuẩn 2 Gy 
                    và có margin an toàn ${safetyMargin.toFixed(1)}%.
                </p>
            </div>
        </div>
    `;
    
    resultsDiv.innerHTML = html;
    resultsDiv.style.display = 'block';
    resultsDiv.scrollIntoView({ behavior: 'smooth' });
};

// Log that the function is loaded
console.log('Organ limit calculator loaded successfully');


// ============================================
// ADVANCED GAP COMPENSATION FUNCTIONS
// ============================================

// Toggle advanced parameters visibility
window.toggleAdvancedGapParams = function() {
    const advancedDiv = document.getElementById('advancedGapParams');
    if (advancedDiv) {
        advancedDiv.style.display = advancedDiv.style.display === 'none' ? 'block' : 'none';
    }
};

// Calculate gap compensation with advanced methods
window.calculateGapCompensationAdvanced = function() {
    console.log('calculateGapCompensationAdvanced called');
    
    // Get all input values
    const repopulationRate = safeParseFloat(document.getElementById('repopulationRate').value);
    const gapDays = safeParseInt(document.getElementById('gapDays').value);
    const originalTotalDose = safeParseFloat(document.getElementById('originalTotalDose').value);
    const originalFractions = safeParseInt(document.getElementById('originalFractions').value);
    const completedFractions = safeParseInt(document.getElementById('completedFractions').value);
    const alphaBeta = safeParseFloat(document.getElementById('gapAlphaBeta').value) || 10.0;
    const ottMax = safeParseInt(document.getElementById('ottMax').value) || 56;
    const ottCompleted = safeParseInt(document.getElementById('ottCompleted').value) || 0;
    
    // Validation
    if (!repopulationRate || !gapDays || !originalTotalDose || !originalFractions || completedFractions === undefined) {
        showAlert('Vui lòng nhập đầy đủ thông tin', 'error');
        return;
    }
    
    if (completedFractions > originalFractions) {
        showAlert('Số phân liều đã hoàn thành không thể lớn hơn tổng số phân liều', 'error');
        return;
    }
    
    // Prepare parameters for calculator
    const params = {
        k: repopulationRate,
        tGap: gapDays,
        totalDose: originalTotalDose,
        nPlan: originalFractions,
        nDelivered: completedFractions,
        alphaBeta: alphaBeta,
        ottMax: ottMax,
        ottCompleted: ottCompleted,
        ottPlan: Math.ceil(originalFractions / 5) * 7 // Estimate: 5 fr/week
    };
    
    // Calculate using advanced calculator
    const calculator = window.gapCompensationCalculator;
    const results = calculator.calculateAllMethods(params);
    
    // Display results
    displayAdvancedGapCompensationResults(results);
};

// Display advanced gap compensation results
function displayAdvancedGapCompensationResults(results) {
    const resultsDiv = document.getElementById('gapCompensationResults');
    if (!resultsDiv) return;
    
    const { input, methods, summary } = results;
    const d = input.totalDose / input.nPlan;
    
    // Get tumor info
    const tumorTypeElement = document.getElementById('tumorType');
    const tumorType = tumorTypeElement ? tumorTypeElement.value : '';
    const tumorData = tumorType && tumorType !== 'custom' && tumorRepopulationRates[tumorType] 
        ? tumorRepopulationRates[tumorType] 
        : null;
    const tumorDisplayName = tumorData ? tumorData.name : 'Loại u được chọn';
    
    let html = `
        <div class="alert alert-info">
            <h3 style="margin-bottom: 15px;">📊 Kết quả Tính bù liều Nâng cao - ${tumorDisplayName}</h3>
            
            <!-- Summary Section -->
            <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                <h4 style="color: #667eea; margin-bottom: 10px;">📋 Tóm tắt</h4>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px;">
                    <div style="background: #f8f9fa; padding: 10px; border-radius: 4px;">
                        <p style="margin: 0; font-size: 0.85rem; color: #666;">Liều mất do tái sinh:</p>
                        <p style="margin: 5px 0 0 0; font-size: 1.2rem; font-weight: bold; color: #f5576c;">
                            ${summary.dLoss.toFixed(2)} Gy
                        </p>
                    </div>
                    <div style="background: #f8f9fa; padding: 10px; border-radius: 4px;">
                        <p style="margin: 0; font-size: 0.85rem; color: #666;">BED mất:</p>
                        <p style="margin: 5px 0 0 0; font-size: 1.2rem; font-weight: bold; color: #f5576c;">
                            ${summary.bedLoss.toFixed(2)} Gy
                        </p>
                    </div>
                    <div style="background: #f8f9fa; padding: 10px; border-radius: 4px;">
                        <p style="margin: 0; font-size: 0.85rem; color: #666;">BED kế hoạch:</p>
                        <p style="margin: 5px 0 0 0; font-size: 1.2rem; font-weight: bold; color: #667eea;">
                            ${summary.bedPlan.toFixed(2)} Gy
                        </p>
                    </div>
                    <div style="background: #f8f9fa; padding: 10px; border-radius: 4px;">
                        <p style="margin: 0; font-size: 0.85rem; color: #666;">Phương pháp khả thi:</p>
                        <p style="margin: 5px 0 0 0; font-size: 1.2rem; font-weight: bold; color: #28a745;">
                            ${summary.feasibleMethods}/5
                        </p>
                    </div>
                </div>
            </div>
    `;
    
    // Method 1: BID
    if (methods.BID) {
        const m = methods.BID;
        html += generateMethodCard(
            '1️⃣ BID (2 phân liều/ngày ≥ 6 giờ)',
            m.feasible,
            m.description,
            [
                `Số ngày BID: ${m.nBID} ngày`,
                `OTT mới: ${m.ottNew} ngày ${m.withinOTTLimit ? '✅' : '❌ (vượt quá)'}`,
                `BED tumor mới: ${m.bedTumorNew.toFixed(2)} Gy`,
                `BED loss: ${m.bedLoss.toFixed(2)} Gy`
            ],
            m.warnings
        );
    }
    
    // Method 2: Extra Fractions
    if (methods.EXTRA_FRACTIONS) {
        const m = methods.EXTRA_FRACTIONS;
        html += generateMethodCard(
            '2️⃣ Thêm phân liều',
            m.feasible,
            m.description,
            [
                `Số phân liều cần thêm: ${m.nExtraNeeded}`,
                `Tổng số phân liều mới: ${m.nNew}`,
                `BED tumor mới: ${m.bedTumorNew.toFixed(2)} Gy`,
                `Đủ BED: ${m.sufficient ? '✅ Có' : '❌ Chưa'}`
            ],
            m.warnings
        );
    }
    
    // Method 3: Six Days/Week
    if (methods.SIX_DAYS_WEEK) {
        const m = methods.SIX_DAYS_WEEK;
        html += generateMethodCard(
            '3️⃣ Chiếu 6 ngày/tuần (thêm thứ 7)',
            m.feasible,
            m.description,
            [
                `Số ngày tiết kiệm: ${m.tGain} ngày`,
                `OTT mới: ${m.ottNew} ngày`,
                `BED tumor mới: ${m.bedTumorNew.toFixed(2)} Gy`,
                `Bù đủ thời gian: ${m.timeCompensated ? '✅ Có' : '❌ Chưa'}`
            ],
            m.warnings
        );
    }
    
    // Method 4: Increase Dose
    if (methods.INCREASE_DOSE) {
        const m = methods.INCREASE_DOSE;
        html += generateMethodCard(
            '4️⃣ Tăng liều/phân liều',
            m.feasible && m.clinicallyAcceptable,
            m.description,
            m.feasible ? [
                `Liều mới/fx: ${m.dNew.toFixed(2)} Gy (từ ${d.toFixed(2)} Gy)`,
                `Số phân liều còn lại: ${m.nRemain}`,
                `BED tumor mới: ${m.bedTumorNew.toFixed(2)} Gy`,
                `An toàn lâm sàng: ${m.clinicallyAcceptable ? '✅ Có (≤4 Gy)' : '⚠️ Cần cân nhắc (>4 Gy)'}`
            ] : ['Không thể tính toán'],
            m.warnings
        );
    }
    
    // Method 6: Hybrid
    if (methods.HYBRID) {
        const m = methods.HYBRID;
        html += generateMethodCard(
            '6️⃣ Kết hợp (Hybrid)',
            m.feasible,
            m.description,
            m.feasible ? [
                `BED tumor mới: ${m.bedTumorNew.toFixed(2)} Gy ${m.bedSufficient ? '✅' : '❌'}`,
                `OTT mới: ${m.ottNew} ngày ${m.ottAcceptable ? '✅' : '❌'}`,
                `Đạt cả 2 điều kiện: ${m.feasible ? '✅ Có' : '❌ Không'}`
            ] : ['Không tìm thấy phương án khả thi'],
            m.warnings
        );
    }
    
    // Method 5: Invalid spacing warning
    html += `
        <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin-top: 15px; border-left: 4px solid #ffc107;">
            <h4 style="color: #856404; margin-bottom: 10px;">⚠️ Phương pháp KHÔNG được phép</h4>
            <p style="margin: 0; font-size: 0.9rem; color: #856404;">
                <strong>5️⃣ Giảm khoảng cách giữa 2 phân liều < 6 giờ:</strong><br>
                ❌ KHÔNG AN TOÀN - Tế bào bình thường chưa phục hồi đủ<br>
                ❌ Nguy cơ độc tính cấp và muộn rất cao<br>
                ❌ TUYỆT ĐỐI KHÔNG sử dụng phương pháp này
            </p>
        </div>
    `;
    
    // Recommendations
    html += `
        <div style="background: #e7f3ff; padding: 15px; border-radius: 8px; margin-top: 15px; border-left: 4px solid #2196F3;">
            <h4 style="color: #0d47a1; margin-bottom: 10px;">💡 Khuyến nghị</h4>
            <p style="margin: 0; font-size: 0.9rem; color: #0d47a1;">
                ${generateRecommendations(methods, summary)}
            </p>
        </div>
    `;
    
    html += '</div>';
    
    resultsDiv.innerHTML = html;
    resultsDiv.style.display = 'block';
    resultsDiv.scrollIntoView({ behavior: 'smooth' });
}

// Helper function to generate method card
function generateMethodCard(title, feasible, description, details, warnings) {
    const borderColor = feasible ? '#28a745' : '#dc3545';
    const bgColor = feasible ? '#d4edda' : '#f8d7da';
    const icon = feasible ? '✅' : '❌';
    
    let html = `
        <div style="background: ${bgColor}; padding: 15px; border-radius: 8px; margin-bottom: 15px; border-left: 4px solid ${borderColor};">
            <h4 style="margin-bottom: 10px;">${icon} ${title}</h4>
            <p style="margin: 5px 0; font-weight: bold;">${description}</p>
            <ul style="margin: 10px 0; padding-left: 20px;">
    `;
    
    details.forEach(detail => {
        html += `<li style="margin: 3px 0;">${detail}</li>`;
    });
    
    html += '</ul>';
    
    if (warnings && warnings.length > 0) {
        html += '<div style="background: rgba(255,255,255,0.7); padding: 8px; border-radius: 4px; margin-top: 10px;">';
        warnings.forEach(warning => {
            html += `<p style="margin: 3px 0; color: #856404; font-size: 0.85rem;">⚠️ ${warning}</p>`;
        });
        html += '</div>';
    }
    
    html += '</div>';
    return html;
}

// Generate recommendations based on results
function generateRecommendations(methods, summary) {
    const feasible = [];
    
    if (methods.BID && methods.BID.feasible) feasible.push('BID');
    if (methods.EXTRA_FRACTIONS && methods.EXTRA_FRACTIONS.feasible) feasible.push('Thêm phân liều');
    if (methods.SIX_DAYS_WEEK && methods.SIX_DAYS_WEEK.feasible) feasible.push('6 ngày/tuần');
    if (methods.INCREASE_DOSE && methods.INCREASE_DOSE.feasible && methods.INCREASE_DOSE.clinicallyAcceptable) {
        feasible.push('Tăng liều/fx');
    }
    if (methods.HYBRID && methods.HYBRID.feasible) feasible.push('Kết hợp');
    
    if (feasible.length === 0) {
        return '⚠️ Không có phương pháp nào khả thi với các thông số hiện tại. Cần xem xét lại kế hoạch điều trị hoặc hội chẩn.';
    }
    
    if (feasible.length === 1) {
        return `✅ Phương pháp khuyến nghị: <strong>${feasible[0]}</strong>`;
    }
    
    let rec = `✅ Có ${feasible.length} phương pháp khả thi: <strong>${feasible.join(', ')}</strong><br><br>`;
    rec += '<strong>Lựa chọn tối ưu:</strong><br>';
    
    // Prioritize based on clinical practice
    if (methods.BID && methods.BID.feasible && methods.BID.withinOTTLimit) {
        rec += '• <strong>BID</strong> - Ưu tiên nếu có thể tổ chức 2 lần/ngày (rút ngắn OTT hiệu quả)<br>';
    }
    if (methods.EXTRA_FRACTIONS && methods.EXTRA_FRACTIONS.feasible && methods.EXTRA_FRACTIONS.sufficient) {
        rec += '• <strong>Thêm phân liều</strong> - An toàn, dễ thực hiện, phù hợp với lịch điều trị<br>';
    }
    if (methods.HYBRID && methods.HYBRID.feasible) {
        rec += '• <strong>Kết hợp</strong> - Tối ưu nhất khi gap lớn, đảm bảo cả BED và OTT<br>';
    }
    
    rec += '<br><strong>⚠️ Lưu ý:</strong> Quyết định cuối cùng cần dựa trên đánh giá lâm sàng tổng thể, tình trạng bệnh nhân, và khả năng thực hiện của cơ sở.';
    
    return rec;
}

// Update the main calculateGapCompensation function to support both modes
const originalCalculateGapCompensation = window.calculateGapCompensation;

window.calculateGapCompensation = function() {
    const method = document.getElementById('compensationMethod');
    const selectedMethod = method ? method.value : 'simple';
    
    if (selectedMethod === 'all') {
        calculateGapCompensationAdvanced();
    } else {
        originalCalculateGapCompensation();
    }
};

console.log('✅ Advanced gap compensation functions loaded');
