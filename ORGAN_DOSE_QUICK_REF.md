# 🚀 Quick Reference - Organ Dose Lookup

## ⚡ Quick Start

```html
<!-- 1. Include scripts -->
<script src="js/organ-dose-database.js"></script>
<script src="js/bed-calculator.js"></script>
<script src="js/validation-engine.js"></script>

<!-- 2. Use functions -->
<script>
  const organ = getOrgan('spinal_cord');
  const bed = bedCalculator.calculateBED(45, 2, 2.0);
  const valid = validationEngine.validateDosePerFraction(3.0);
</script>
```

## 📦 Available Organs (30+)

### 🧠 CNS
- brainstem, brain, spinal_cord, optic_nerves, temporal_lobes, cauda_equina, sacral_plexus

### 👄 Head & Neck
- brachial_plexus, cochlea, ears, eyes, glottic_larynx, lens, mandible, oral_cavity, parotid, tm_joint, tongue, pharyngeal_constrictor

### ❤️ Thorax
- esophagus, heart, lung, trachea, bronchus, great_vessels

### 🫁 Abdomen
- duodenum, kidney, liver, small_intestine, jejunum_ileum, stomach, colon

### 🔻 Pelvis
- bladder, rectum

### 🦴 Bone
- femoral_heads, ribs

### 💧 Genitourinary
- penile_bulb

## 🔑 Key Functions

```javascript
// DATABASE
getOrgan(id)                    // Get organ by ID
getOrgansByRegion()             // Get all organs grouped
getConstraints(id, scheme)      // Get constraints
getAlphaBeta(id)                // Get α/β ratio
getReference(num)               // Get citation

// BED CALCULATOR
calculateBED(D, d, αβ)          // Calculate BED
calculateEquivalentDose(...)    // Convert dose
calculateFractions(D, d)        // Get # fractions
calculateSafetyMargin(...)      // Get margin %
calculateDoseConversion({...})  // Complete calc

// VALIDATION
validateDosePerFraction(val)    // Validate dose
validateOrganSelection(id)      // Validate organ
checkExtremeValues(dose)        // Check warnings
```

## 💡 Common Patterns

### Pattern 1: Lookup Organ Info
```javascript
const organ = getOrgan('spinal_cord');
console.log(organ.nameVi);      // "Tủy sống"
console.log(organ.alphaBeta);   // 2.0
console.log(organ.endpoint);    // "Myelopathy"
```

### Pattern 2: Get Constraints
```javascript
const conv = getConstraints('spinal_cord', 'conventional');
// [{ type: 'max', doseLimit: 45, sourceNumber: 16 }]

const sbrt = getConstraints('brainstem', 'sbrt_5fx');
// [{ type: 'max', doseLimit: 15, ... }]
```

### Pattern 3: Calculate BED
```javascript
const bed = bedCalculator.calculateBED(45, 2, 2.0);
// 90.0 Gy
```

### Pattern 4: Convert Dose
```javascript
const result = bedCalculator.calculateDoseConversion({
  referenceDose: 45,
  referenceFraction: 2.0,
  customFraction: 3.0,
  alphaBeta: 2.0
});
// { practicalDose: 36, practicalFractions: 12, ... }
```

### Pattern 5: Validate Input
```javascript
const v = validationEngine.validateDosePerFraction(3.0);
if (v.isValid) {
  // Proceed with calculation
} else {
  alert(v.errorMessage);
}
```

### Pattern 6: Complete Workflow
```javascript
function calculateCustomDose(organId, customDose) {
  // 1. Validate
  const v = validationEngine.validateCalculationInputs({
    organId, dosePerFraction: customDose
  });
  if (!v.isValid) return alert(v.errorMessage);
  
  // 2. Get data
  const organ = getOrgan(organId);
  const refDose = organ.conventional[0].doseLimit;
  
  // 3. Calculate
  const result = bedCalculator.calculateDoseConversion({
    referenceDose: refDose,
    referenceFraction: 2.0,
    customFraction: customDose,
    alphaBeta: organ.alphaBeta
  });
  
  // 4. Display
  return result;
}
```

## 🎨 Display Templates

### Template 1: Organ Info Card
```html
<div class="organ-card">
  <h3>${organ.nameVi} (${organ.nameEn})</h3>
  <p>Region: ${organ.region}</p>
  <p>α/β: ${organ.alphaBeta}</p>
  <p>Endpoint: ${organ.endpoint}</p>
</div>
```

### Template 2: Constraints Table
```html
<table>
  <tr><th>Type</th><th>Volume</th><th>Dose</th><th>Src</th></tr>
  ${constraints.map(c => `
    <tr>
      <td>${c.type}</td>
      <td>${c.volume || 'None'} ${c.volumeUnit || ''}</td>
      <td>${c.doseLimit} Gy</td>
      <td>${c.sourceNumber}</td>
    </tr>
  `).join('')}
</table>
```

### Template 3: Calculation Results
```html
<div class="results ${result.warningLevel}">
  <h4>Reference (2 Gy/fx):</h4>
  <p>${result.referenceDose} Gy (${result.referenceFractions} fx)</p>
  <p>BED: ${result.referenceBED.toFixed(2)} Gy</p>
  
  <h4>Custom (${result.customFraction} Gy/fx):</h4>
  <p>${result.practicalDose.toFixed(1)} Gy (${result.practicalFractions} fx)</p>
  <p>BED: ${result.customBED.toFixed(2)} Gy</p>
  
  <h4>Safety: ${result.safetyMargin.toFixed(1)}%</h4>
  <p>${result.isWithinLimits ? '✅ Safe' : '❌ EXCEEDS'}</p>
</div>
```

## ⚠️ Error Messages

```javascript
// Vietnamese error messages
'Vui lòng chọn cơ quan trước'           // No organ selected
'Vui lòng nhập số hợp lệ'               // Invalid number
'Liều phải lớn hơn 0'                   // Negative/zero
'Cảnh báo: Liều rất cao (>20 Gy)...'   // Extreme value
'Không tìm thấy thông tin cơ quan'      // Organ not found
```

## 🎯 Testing Commands

```javascript
// Test database
console.log(`Organs: ${getOrganCount()}`);
console.log(getOrgansByRegion());

// Test BED
console.log(bedCalculator.calculateBED(45, 2, 2.0));

// Test validation
console.log(validationEngine.validateDosePerFraction(3.0));

// Test organ
console.log(getOrgan('spinal_cord'));

// Test constraints
console.log(getConstraints('brainstem', 'conventional'));
```

## 📊 Data Structure

```javascript
// Organ
{
  id: string,
  nameEn: string,
  nameVi: string,
  region: string,
  alphaBeta: number,
  endpoint: string,
  conventional: Constraint[],
  srs_1fx: Constraint[],
  sbrt_3fx: Constraint[],
  sbrt_5fx: Constraint[]
}

// Constraint
{
  type: 'max' | 'mean' | 'volume_percent' | 'volume_cc',
  volume: number | null,
  volumeUnit: '%' | 'cc' | null,
  doseLimit: number,
  sourceNumber: number
}

// Calculation Result
{
  referenceDose, referenceFraction, referenceFractions, referenceBED,
  customFraction, theoreticalDose, practicalDose, practicalFractions, customBED,
  safetyMargin, isWithinLimits, warningLevel
}
```

## 🔗 Files

- `js/organ-dose-database.js` - Database & access functions
- `js/bed-calculator.js` - BED calculations
- `js/validation-engine.js` - Input validation
- `test-organ-dose-lookup.html` - Test page
- `ORGAN_DOSE_LOOKUP_GUIDE.md` - Full documentation

## 🚦 Status Indicators

- ✅ **Success**: Safety margin ≥ 5%
- ⚠️ **Caution**: Safety margin < 5%
- ❌ **Danger**: BED exceeds reference

---

**Quick Tip**: Open `test-organ-dose-lookup.html` to see everything in action!
