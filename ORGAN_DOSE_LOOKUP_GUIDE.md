# 📚 Organ Dose Limit Lookup - Developer Guide

## 🎯 Overview

Tính năng tra cứu và tính toán giới hạn liều cơ quan với 3 modules chính:

1. **organ-dose-database.js** - Database 30+ organs với constraints
2. **bed-calculator.js** - Tính toán BED và chuyển đổi liều
3. **validation-engine.js** - Validate inputs

## 🧪 Testing

Mở file test: `frontend/test-organ-dose-lookup.html`

### Test Cases

1. **Test Database** - Kiểm tra database load thành công
2. **Test BED Calculator** - Tính BED với các giá trị khác nhau
3. **Test Validation** - Thử các inputs hợp lệ/không hợp lệ
4. **Test Organ Lookup** - Tra cứu thông tin cơ quan
5. **Test Complete Workflow** - Workflow đầy đủ từ chọn organ đến tính toán

## 📖 API Documentation

### organ-dose-database.js

```javascript
// Get organ by ID
const organ = getOrgan('spinal_cord');
// Returns: { id, nameEn, nameVi, region, alphaBeta, endpoint, conventional, srs_1fx, sbrt_3fx, sbrt_5fx }

// Get all organs grouped by region
const organsByRegion = getOrgansByRegion();
// Returns: { head_neck: [...], cns: [...], thorax: [...], ... }

// Get constraints for specific fractionation
const constraints = getConstraints('spinal_cord', 'conventional');
// Returns: [{ type, volume, volumeUnit, doseLimit, sourceNumber }, ...]

// Get alpha/beta ratio
const alphaBeta = getAlphaBeta('spinal_cord');
// Returns: 2.0

// Get reference citation
const ref = getReference(16);
// Returns: { sourceNumber, category, authors, title, journal, year, doi }

// Get all organ IDs
const organIds = getAllOrganIds();
// Returns: ['brachial_plexus', 'brainstem', 'cochlea', ...]

// Count organs
const count = getOrganCount();
// Returns: 30+
```

### bed-calculator.js

```javascript
// Calculate BED
const bed = bedCalculator.calculateBED(45, 2, 2.0);
// Returns: 90.0 (BED in Gy)

// Calculate equivalent dose
const equivalentDose = bedCalculator.calculateEquivalentDose(45, 2, 3, 2.0);
// Returns: 36.0 (equivalent total dose for 3 Gy/fx)

// Calculate number of fractions
const fractions = bedCalculator.calculateFractions(45, 2);
// Returns: 22 (number of fractions)

// Calculate safety margin
const margin = bedCalculator.calculateSafetyMargin(90, 85);
// Returns: 5.56 (safety margin in %)

// Complete dose conversion
const result = bedCalculator.calculateDoseConversion({
  referenceDose: 45,
  referenceFraction: 2.0,
  customFraction: 3.0,
  alphaBeta: 2.0
});
// Returns: {
//   referenceDose, referenceFraction, referenceFractions, referenceBED,
//   customFraction, theoreticalDose, practicalDose, practicalFractions, customBED,
//   safetyMargin, isWithinLimits, warningLevel
// }
```

### validation-engine.js

```javascript
// Validate dose per fraction
const validation = validationEngine.validateDosePerFraction(3.0);
// Returns: { isValid: true, errorMessage: null, warnings: [] }

// Validate organ selection
const orgValidation = validationEngine.validateOrganSelection('spinal_cord');
// Returns: { isValid: true, errorMessage: null, warnings: [] }

// Check extreme values
const warning = validationEngine.checkExtremeValues(25);
// Returns: "Cảnh báo: Liều rất cao (>20 Gy)..."

// Validate complete inputs
const fullValidation = validationEngine.validateCalculationInputs({
  organId: 'spinal_cord',
  dosePerFraction: 3.0
});
// Returns: { isValid: true, errorMessage: null, warnings: [] }
```

## 🏗️ Integration Example

### HTML Structure

```html
<!-- Include scripts -->
<script src="js/organ-dose-database.js"></script>
<script src="js/bed-calculator.js"></script>
<script src="js/validation-engine.js"></script>

<!-- Organ selector -->
<select id="organSelector">
  <optgroup label="🧠 CNS">
    <option value="brainstem">Thân não (Brainstem)</option>
    <option value="spinal_cord">Tủy sống (Spinal Cord)</option>
  </optgroup>
  <!-- More regions... -->
</select>

<!-- Custom dose input -->
<input type="number" id="customDose" placeholder="Liều/fx (Gy)">

<!-- Calculate button -->
<button onclick="calculateCustomDose()">Tính toán</button>

<!-- Results display -->
<div id="results"></div>
```

### JavaScript Implementation

```javascript
function calculateCustomDose() {
  // 1. Get inputs
  const organId = document.getElementById('organSelector').value;
  const customDose = parseFloat(document.getElementById('customDose').value);
  
  // 2. Validate
  const validation = validationEngine.validateCalculationInputs({
    organId: organId,
    dosePerFraction: customDose
  });
  
  if (!validation.isValid) {
    showError(validation.errorMessage);
    return;
  }
  
  // 3. Get organ data
  const organ = getOrgan(organId);
  const alphaBeta = organ.alphaBeta;
  const refConstraint = organ.conventional[0];
  const referenceDose = refConstraint.doseLimit;
  
  // 4. Calculate
  const result = bedCalculator.calculateDoseConversion({
    referenceDose: referenceDose,
    referenceFraction: 2.0,
    customFraction: customDose,
    alphaBeta: alphaBeta
  });
  
  // 5. Display results
  displayResults(organ, result);
}

function displayResults(organ, result) {
  const resultsDiv = document.getElementById('results');
  
  let html = `
    <h3>${organ.nameVi} (${organ.nameEn})</h3>
    <p>Alpha/Beta: ${organ.alphaBeta} | Endpoint: ${organ.endpoint}</p>
    
    <h4>Reference (2 Gy/fx):</h4>
    <p>Total: ${result.referenceDose} Gy (${result.referenceFractions} fx)</p>
    <p>BED: ${result.referenceBED.toFixed(2)} Gy</p>
    
    <h4>Custom (${result.customFraction} Gy/fx):</h4>
    <p>Total: ${result.practicalDose.toFixed(1)} Gy (${result.practicalFractions} fx)</p>
    <p>BED: ${result.customBED.toFixed(2)} Gy</p>
    
    <h4>Safety:</h4>
    <p>Margin: ${result.safetyMargin.toFixed(1)}%</p>
    <p>Status: ${result.isWithinLimits ? '✅ Safe' : '❌ EXCEEDS LIMIT'}</p>
  `;
  
  resultsDiv.innerHTML = html;
}
```

## 📊 Database Structure

### Organ Object

```javascript
{
  id: 'spinal_cord',
  nameEn: 'Spinal Cord',
  nameVi: 'Tủy sống',
  region: 'cns',  // head_neck, cns, thorax, abdomen, pelvis, bone, genitourinary
  alphaBeta: 2.0,
  endpoint: 'Myelopathy',
  conventional: [
    { type: 'max', volume: null, volumeUnit: null, doseLimit: 45, sourceNumber: 16 }
  ],
  srs_1fx: [],
  sbrt_3fx: [],
  sbrt_5fx: []
}
```

### Constraint Types

- `max` - Maximum dose (Dmax)
- `mean` - Mean dose (Dmean)
- `volume_percent` - Volume percentage (V20, V30, etc.)
- `volume_cc` - Volume in cubic centimeters
- `volume_to_spare` - Volume that must be spared

### Fractionation Schemes

- `conventional` - Standard 2 Gy/fraction
- `srs_1fx` - Single fraction stereotactic radiosurgery
- `sbrt_3fx` - 3-fraction SBRT
- `sbrt_5fx` - 5-fraction SBRT

## 🎨 UI Guidelines

### Color Coding

- **Conventional**: Green (#e8f5e8)
- **1-fx SRS**: Red (#ffe0e0)
- **3-fx SBRT**: Orange (#fff3cd)
- **5-fx SBRT**: Light green (#d4edda)

### Warning Levels

- **Success** (green): Safety margin ≥ 5%
- **Caution** (yellow): Safety margin < 5%
- **Danger** (red): BED exceeds reference

### Icons

- ✅ Success / Within limits
- ⚠️ Warning / Caution
- ❌ Error / Exceeds limit
- 📋 Reference data
- 🧮 Calculated data
- ⚖️ Safety assessment

## 🔧 Error Handling

### Common Errors

1. **No organ selected**: "Vui lòng chọn cơ quan trước"
2. **Invalid dose**: "Vui lòng nhập số hợp lệ"
3. **Negative dose**: "Liều phải lớn hơn 0"
4. **Extreme dose**: "Cảnh báo: Liều rất cao (>20 Gy)..."

### Error Display

```javascript
function showError(message) {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'alert alert-danger';
  errorDiv.innerHTML = `<strong>❌ Lỗi:</strong> ${message}`;
  document.getElementById('results').appendChild(errorDiv);
}
```

## 📝 Next Steps

### To Complete Implementation:

1. **Add to index.html** - Integrate organ lookup section
2. **Style with CSS** - Match existing application design
3. **Add table display** - Show constraints in organized tables
4. **Add reference system** - Clickable source numbers with citations
5. **Add export feature** - Export results to PDF/print
6. **Add comparison** - Compare multiple organs side-by-side

### Testing Checklist:

- [ ] Database loads all 30+ organs
- [ ] BED calculation is accurate
- [ ] Validation catches invalid inputs
- [ ] Organ lookup displays all constraints
- [ ] Custom dose calculation works correctly
- [ ] Warning levels display appropriately
- [ ] References are accessible
- [ ] UI is responsive on mobile

## 🐛 Known Issues

None currently. Report issues to development team.

## 📚 References

- QUANTEC: Quantitative Analysis of Normal Tissue Effects in the Clinic
- AAPM TG-101: Stereotactic Body Radiation Therapy Guidelines
- RTOG Protocols: Various organ-specific protocols

## 👥 Support

For questions or issues, contact the development team.

---

**Version**: 1.0.0  
**Last Updated**: 2024  
**Status**: ✅ Core modules complete, ready for UI integration
