/**
 * Organ Dose Lookup UI Controller
 * Handles user interactions and display for organ dose limit lookup
 */

// Global state
let currentSelectedOrgan = null;

/**
 * Initialize organ selector dropdown
 */
function initializeOrganSelector() {
  const selector = document.getElementById('organLookupSelector');
  if (!selector) return;

  const organs = getOrgansByRegion();
  const regionNames = {
    head_neck: '👄 Head & Neck',
    cns: '🧠 CNS',
    thorax: '❤️ Thorax',
    abdomen: '🫁 Abdomen',
    pelvis: '🔻 Pelvis',
    bone: '🦴 Bone',
    genitourinary: '💧 Genitourinary'
  };

  // Clear existing options except first
  selector.innerHTML = '<option value="">-- Chọn cơ quan để tra cứu --</option>';

  // Add organs grouped by region
  Object.keys(organs).forEach(region => {
    if (organs[region].length > 0) {
      const optgroup = document.createElement('optgroup');
      optgroup.label = regionNames[region] || region;
      
      organs[region].forEach(organ => {
        const option = document.createElement('option');
        option.value = organ.id;
        option.textContent = `${organ.nameVi} (${organ.nameEn})`;
        optgroup.appendChild(option);
      });
      
      selector.appendChild(optgroup);
    }
  });

  console.log('Organ selector initialized with', getOrganCount(), 'organs');
}

/**
 * Lookup organ dose information
 */
function lookupOrganDose() {
  const organId = document.getElementById('organLookupSelector').value;
  const resultsDiv = document.getElementById('organDoseLookupResults');
  const calculatorDiv = document.getElementById('customDoseCalculatorSection');

  if (!organId) {
    showAlert('Vui lòng chọn cơ quan', 'error');
    resultsDiv.style.display = 'none';
    calculatorDiv.style.display = 'none';
    return;
  }

  const organ = getOrgan(organId);
  if (!organ) {
    showAlert('Không tìm thấy thông tin cơ quan', 'error');
    resultsDiv.style.display = 'none';
    calculatorDiv.style.display = 'none';
    return;
  }

  // Store current organ
  currentSelectedOrgan = organId;

  // Display results
  displayOrganDoseInfo(organ);
  
  // Show calculator section
  calculatorDiv.style.display = 'block';
  
  // Scroll to results
  resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Display organ dose information
 */
function displayOrganDoseInfo(organ) {
  const resultsDiv = document.getElementById('organDoseLookupResults');

  let html = `
    <div class="alert alert-info">
      <h3 style="margin-bottom: 15px;">📊 ${organ.nameVi} (${organ.nameEn})</h3>
      <div style="background: #f8f9fa; padding: 12px; border-radius: 6px; margin-bottom: 15px;">
        <p style="margin: 5px 0;"><strong>📌 Thông tin:</strong></p>
        <p style="margin: 5px 0;">α/β = <strong>${organ.alphaBeta} Gy</strong></p>
        <p style="margin: 5px 0;">Endpoint: <strong>${organ.endpoint}</strong></p>
        <p style="margin: 5px 0;">Region: <strong>${organ.region}</strong></p>
      </div>
  `;

  // Display Conventional
  if (organ.conventional && organ.conventional.length > 0) {
    html += `
      <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
        <h4 style="color: #2d5a2d; margin-bottom: 10px;">📋 Conventional (2 Gy/fx)</h4>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background: #d4edda;">
              <th style="padding: 8px; text-align: left; border: 1px solid #c3e6cb;">Type</th>
              <th style="padding: 8px; text-align: left; border: 1px solid #c3e6cb;">Volume</th>
              <th style="padding: 8px; text-align: left; border: 1px solid #c3e6cb;">Dose Limit</th>
              <th style="padding: 8px; text-align: center; border: 1px solid #c3e6cb;">Src</th>
            </tr>
          </thead>
          <tbody>
    `;
    
    organ.conventional.forEach(c => {
      const vol = c.volume ? `${c.volume} ${c.volumeUnit}` : 'None';
      const note = c.note ? `<br><small style="color: #666;">${c.note}</small>` : '';
      html += `
        <tr>
          <td style="padding: 8px; border: 1px solid #c3e6cb;">${formatConstraintType(c.type)}</td>
          <td style="padding: 8px; border: 1px solid #c3e6cb;">${vol}${note}</td>
          <td style="padding: 8px; border: 1px solid #c3e6cb;"><strong>${c.doseLimit.toFixed(1)} Gy</strong></td>
          <td style="padding: 8px; text-align: center; border: 1px solid #c3e6cb;">${c.sourceNumber}</td>
        </tr>
      `;
    });
    
    html += `
          </tbody>
        </table>
      </div>
    `;
  }

  // Display SBRT sections
  const sbrtSchemes = [
    { key: 'srs_1fx', label: '🟥 1-Fraction SRS', color: '#ffe0e0', borderColor: '#ffb3b3' },
    { key: 'sbrt_3fx', label: '🟧 3-Fraction SBRT', color: '#fff3cd', borderColor: '#ffeaa7' },
    { key: 'sbrt_5fx', label: '🟩 5-Fraction SBRT', color: '#d4edda', borderColor: '#c3e6cb' }
  ];

  sbrtSchemes.forEach(scheme => {
    if (organ[scheme.key] && organ[scheme.key].length > 0) {
      html += `
        <div style="background: ${scheme.color}; padding: 15px; border-radius: 8px; margin-bottom: 15px; border: 2px solid ${scheme.borderColor};">
          <h4 style="margin-bottom: 10px;">${scheme.label}</h4>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background: ${scheme.borderColor};">
                <th style="padding: 8px; text-align: left; border: 1px solid ${scheme.borderColor};">Type</th>
                <th style="padding: 8px; text-align: left; border: 1px solid ${scheme.borderColor};">Volume</th>
                <th style="padding: 8px; text-align: left; border: 1px solid ${scheme.borderColor};">Dose Limit</th>
                <th style="padding: 8px; text-align: center; border: 1px solid ${scheme.borderColor};">Src</th>
              </tr>
            </thead>
            <tbody>
      `;
      
      organ[scheme.key].forEach(c => {
        const vol = c.volume ? `${c.volume} ${c.volumeUnit}` : 'None';
        const note = c.note ? `<br><small style="color: #666;">${c.note}</small>` : '';
        html += `
          <tr>
            <td style="padding: 8px; border: 1px solid ${scheme.borderColor};">${formatConstraintType(c.type)}</td>
            <td style="padding: 8px; border: 1px solid ${scheme.borderColor};">${vol}${note}</td>
            <td style="padding: 8px; border: 1px solid ${scheme.borderColor};"><strong>${c.doseLimit.toFixed(1)} Gy</strong></td>
            <td style="padding: 8px; text-align: center; border: 1px solid ${scheme.borderColor};">${c.sourceNumber}</td>
          </tr>
        `;
      });
      
      html += `
            </tbody>
          </table>
        </div>
      `;
    } else {
      html += `
        <div style="background: #f8f9fa; padding: 10px; border-radius: 6px; margin-bottom: 10px; border-left: 3px solid #dee2e6;">
          <p style="margin: 0; color: #6c757d;">${scheme.label}: <em>Không có dữ liệu</em></p>
        </div>
      `;
    }
  });

  html += '</div>';

  resultsDiv.innerHTML = html;
  resultsDiv.style.display = 'block';
}

/**
 * Format constraint type for display
 */
function formatConstraintType(type) {
  const typeMap = {
    'max': 'Dmax',
    'mean': 'Dmean',
    'volume_percent': 'Volume %',
    'volume_cc': 'Volume cc',
    'volume_to_spare': 'Volume to spare'
  };
  return typeMap[type] || type;
}

/**
 * Calculate custom organ dose
 */
function calculateCustomOrganDose() {
  console.log('=== 🧮 calculateCustomOrganDose START ===');
  
  try {
    // Step 1: Get input element
    const customDoseInput = document.getElementById('customDosePerFraction');
    console.log('Step 1 - Input element:', customDoseInput);
    
    if (!customDoseInput) {
      alert('❌ Lỗi: Không tìm thấy input element với ID "customDosePerFraction"');
      return;
    }
    
    // Step 2: Parse value
    const customDose = parseFloat(customDoseInput.value);
    console.log('Step 2 - Parsed value:', customDose, 'from raw:', customDoseInput.value);
    
    if (isNaN(customDose) || customDose <= 0) {
      alert('❌ Vui lòng nhập liều/phân liều hợp lệ (số dương)');
      return;
    }
    
    // Step 3: Get results div
    const resultsDiv = document.getElementById('customOrganDoseResults');
    console.log('Step 3 - Results div:', resultsDiv);
    
    if (!resultsDiv) {
      alert('❌ Lỗi: Không tìm thấy results div với ID "customOrganDoseResults"');
      return;
    }
    
    // Step 4: Check organ selected
    console.log('Step 4 - Current organ:', currentSelectedOrgan);
    
    if (!currentSelectedOrgan) {
      alert('❌ Vui lòng chọn cơ quan trước khi tính toán');
      resultsDiv.style.display = 'none';
      return;
    }
    
    // Step 5: Validate with validation engine
    console.log('Step 5 - Validating...');
    const validation = validationEngine.validateCalculationInputs({
      organId: currentSelectedOrgan,
      dosePerFraction: customDose
    });
    console.log('Validation result:', validation);
    
    if (!validation.isValid) {
      alert('❌ ' + validation.errorMessage);
      resultsDiv.style.display = 'none';
      return;
    }
    
    // Step 6: Get organ data
    console.log('Step 6 - Getting organ data...');
    const organ = getOrgan(currentSelectedOrgan);
    console.log('Organ data:', organ);
    
    if (!organ) {
      alert('❌ Không tìm thấy thông tin cơ quan');
      resultsDiv.style.display = 'none';
      return;
    }
    
    // Step 7: Check conventional constraints
    console.log('Step 7 - Checking constraints...');
    if (!organ.conventional || organ.conventional.length === 0) {
      alert('⚠️ Không có dữ liệu conventional cho cơ quan này');
      resultsDiv.style.display = 'none';
      return;
    }
    
    const alphaBeta = organ.alphaBeta;
    console.log('Alpha/Beta:', alphaBeta);
    console.log('Number of constraints:', organ.conventional.length);
    
    // Step 8: Calculate for ALL constraints
    console.log('Step 8 - Calculating...');
    const results = organ.conventional.map((constraint, index) => {
      console.log(`  Processing constraint ${index + 1}/${organ.conventional.length}:`, constraint);
      
      const result = bedCalculator.calculateDoseConversion({
        referenceDose: constraint.doseLimit,
        referenceFraction: 2.0,
        customFraction: customDose,
        alphaBeta: alphaBeta
      });
      
      console.log(`  Result ${index + 1}:`, result);
      
      return {
        constraint: constraint,
        calculation: result
      };
    });

    console.log('All results:', results);
    console.log('Calling displayCustomDoseResults...');
    
    displayCustomDoseResults(organ, results, customDose, validation.warnings);
    
    console.log('✅ displayCustomDoseResults completed');
  } catch (error) {
    console.error('❌ Error in calculation:', error);
    showAlert('Lỗi tính toán: ' + error.message, 'error');
    resultsDiv.style.display = 'none';
  }
}

/**
 * Display custom dose calculation results
 */
function displayCustomDoseResults(organ, results, customDose, warnings) {
  const resultsDiv = document.getElementById('customOrganDoseResults');

  // Determine overall status
  const anyExceeded = results.some(r => !r.calculation.isWithinLimits);
  const alertClass = anyExceeded ? 'alert-error' : 'alert-success';
  const statusIcon = anyExceeded ? '❌' : '✅';
  const statusText = anyExceeded ? 'MỘT SỐ CONSTRAINTS VƯỢT QUÁ GIỚI HẠN!' : 'Tất cả constraints trong giới hạn an toàn';

  let html = `
    <div class="alert ${alertClass}">
      <h4 style="margin-bottom: 15px;">${statusIcon} ${statusText}</h4>
      
      <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
        <h5 style="color: #667eea; margin-bottom: 15px;">📊 Kết quả tính toán - ${organ.nameVi}</h5>
        
        <div style="background: #f8f9fa; padding: 12px; border-radius: 6px; margin-bottom: 15px;">
          <p style="margin: 0; font-size: 0.9rem; color: #555;">
            <strong>💡 Thông tin:</strong><br>
            α/β: ${organ.alphaBeta} Gy | Endpoint: ${organ.endpoint}<br>
            Phác đồ mới: ${customDose.toFixed(1)} Gy/fx
          </p>
        </div>

        <h6 style="color: #2d5a2d; margin-bottom: 10px;">📋 So sánh theo từng Constraint:</h6>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
          <thead>
            <tr style="background: #e8f5e8;">
              <th style="padding: 8px; text-align: left; border: 1px solid #c3e6cb;">Constraint</th>
              <th style="padding: 8px; text-align: center; border: 1px solid #c3e6cb;">Phác đồ chuẩn<br>(2 Gy/fx)</th>
              <th style="padding: 8px; text-align: center; border: 1px solid #c3e6cb;">Phác đồ mới<br>(${customDose.toFixed(1)} Gy/fx)</th>
              <th style="padding: 8px; text-align: center; border: 1px solid #c3e6cb;">BED So sánh</th>
              <th style="padding: 8px; text-align: center; border: 1px solid #c3e6cb;">Status</th>
            </tr>
          </thead>
          <tbody>
  `;

  // Add row for each constraint
  results.forEach((item, index) => {
    const c = item.constraint;
    const calc = item.calculation;
    
    const constraintLabel = formatConstraintLabel(c);
    const statusEmoji = calc.isWithinLimits ? '✅' : '❌';
    const rowColor = calc.isWithinLimits ? '#ffffff' : '#ffe0e0';
    
    html += `
      <tr style="background: ${rowColor};">
        <td style="padding: 8px; border: 1px solid #c3e6cb;">
          <strong>${constraintLabel}</strong>
        </td>
        <td style="padding: 8px; text-align: center; border: 1px solid #c3e6cb;">
          <strong>${calc.referenceDose.toFixed(1)} Gy</strong><br>
          <small style="color: #666;">${calc.referenceFractions} fx</small><br>
          <small style="color: #888;">BED: ${calc.referenceBED.toFixed(1)} Gy</small>
        </td>
        <td style="padding: 8px; text-align: center; border: 1px solid #c3e6cb;">
          <strong style="color: #f5576c;">${calc.practicalDose.toFixed(1)} Gy</strong><br>
          <small style="color: #666;">${calc.practicalFractions} fx</small><br>
          <small style="color: #888;">BED: ${calc.customBED.toFixed(1)} Gy</small>
        </td>
        <td style="padding: 8px; text-align: center; border: 1px solid #c3e6cb;">
          <small style="color: #666;">Margin:</small><br>
          <strong style="color: ${calc.safetyMargin >= 0 ? '#28a745' : '#dc3545'};">
            ${calc.safetyMargin.toFixed(1)}%
          </strong>
        </td>
        <td style="padding: 8px; text-align: center; border: 1px solid #c3e6cb; font-size: 1.2rem;">
          ${statusEmoji}
        </td>
      </tr>
    `;
  });

  html += `
          </tbody>
        </table>
  `;

  // Add warnings if any
  if (warnings && warnings.length > 0) {
    html += `
      <div style="background: #fff3cd; padding: 10px; border-radius: 4px; border-left: 3px solid #ffc107; margin-top: 15px;">
        <p style="margin: 0; font-size: 0.9rem; color: #856404;">
          <strong>⚠️ Cảnh báo:</strong><br>
          ${warnings.join('<br>')}
        </p>
      </div>
    `;
  }

  // Add explanation
  html += `
        <div style="background: #e7f3ff; padding: 10px; border-radius: 4px; margin-top: 15px; border-left: 3px solid #2196F3;">
          <p style="margin: 0; font-size: 0.85rem; color: #0d47a1;">
            <strong>ℹ️ Giải thích:</strong><br>
            • <strong>BED (Biologically Effective Dose)</strong>: Liều sinh học tương đương<br>
            • <strong>Safety Margin</strong>: % chênh lệch BED (dương = an toàn, âm = vượt quá)<br>
            • <strong>✅</strong> = BED phác đồ mới ≤ BED chuẩn (an toàn)<br>
            • <strong>❌</strong> = BED phác đồ mới > BED chuẩn (vượt quá giới hạn)
          </p>
        </div>
      </div>
    </div>
  `;

  resultsDiv.innerHTML = html;
  resultsDiv.style.display = 'block';
  resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Format constraint label for display
 */
function formatConstraintLabel(constraint) {
  const typeLabel = formatConstraintType(constraint.type);
  
  if (constraint.volume) {
    return `${typeLabel} ${constraint.volume}${constraint.volumeUnit}`;
  }
  
  return typeLabel;
}

/**
 * Show alert message (reuse from app.js if available)
 */
function showAlert(message, type = 'info') {
  // Try to use existing showAlert from app.js
  if (typeof window.showAlert === 'function') {
    window.showAlert(message, type);
    return;
  }

  // Fallback: simple alert
  const typeMap = {
    'error': '❌ Lỗi',
    'warning': '⚠️ Cảnh báo',
    'success': '✅ Thành công',
    'info': 'ℹ️ Thông tin'
  };

  alert(`${typeMap[type] || 'ℹ️'}: ${message}`);
}

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeOrganSelector);
} else {
  initializeOrganSelector();
}

console.log('Organ Dose UI Controller loaded');
