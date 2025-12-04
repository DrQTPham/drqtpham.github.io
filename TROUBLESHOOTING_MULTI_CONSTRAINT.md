# 🔧 Troubleshooting - Multi-Constraint Display

## ❌ Vấn đề: Chỉ hiển thị 1 kết quả thay vì tất cả constraints

### Nguyên nhân có thể:

1. **Cache trình duyệt chưa clear**
2. **File JavaScript chưa load đúng**
3. **Function `formatConstraintLabel` bị thiếu**

---

## ✅ Giải pháp

### Bước 1: Clear Cache (QUAN TRỌNG!)

#### Chrome/Edge:
```
1. Nhấn Ctrl+Shift+Delete (Windows) hoặc Cmd+Shift+Delete (Mac)
2. Chọn "Cached images and files"
3. Click "Clear data"
```

#### Hoặc Hard Refresh:
```
Ctrl+F5 (Windows)
Cmd+Shift+R (Mac)
```

### Bước 2: Test với trang riêng

Mở trang test:
```
http://localhost:8080/TEST_MULTI_CONSTRAINT.html
```

Trang này sẽ:
- ✅ Tự động chọn Rectum
- ✅ Hiển thị debug info
- ✅ Kiểm tra tất cả functions đã load chưa

### Bước 3: Kiểm tra Console

1. Mở Console (F12)
2. Chạy lệnh:
```javascript
// Check if functions exist
console.log('formatConstraintLabel:', typeof formatConstraintLabel);
console.log('calculateCustomOrganDose:', typeof calculateCustomOrganDose);
console.log('displayCustomDoseResults:', typeof displayCustomDoseResults);

// Check rectum data
const rectum = getOrgan('rectum');
console.log('Rectum constraints:', rectum.conventional.length);
```

**Kết quả mong đợi:**
```
formatConstraintLabel: function
calculateCustomOrganDose: function
displayCustomDoseResults: function
Rectum constraints: 4
```

### Bước 4: Test thủ công

Trong Console, chạy:
```javascript
// Select rectum
document.getElementById('organLookupSelector').value = 'rectum';

// Lookup
lookupOrganDose();

// Set custom dose
document.getElementById('customDosePerFraction').value = 3.0;

// Calculate
calculateCustomOrganDose();
```

---

## 🎯 Kết quả đúng phải như thế nào?

### Phải thấy bảng với 4 dòng:

```
┌──────────┬─────────────────┬─────────────────┬─────────┬────────┐
│ V15%     │ 75.0 Gy / 37 fx │ 60.0 Gy / 20 fx │ +4.0%   │   ✅   │
│ V25%     │ 70.0 Gy / 35 fx │ 56.0 Gy / 19 fx │ +4.0%   │   ✅   │
│ V35%     │ 65.0 Gy / 32 fx │ 52.0 Gy / 17 fx │ +4.0%   │   ✅   │
│ V50%     │ 60.0 Gy / 30 fx │ 48.0 Gy / 16 fx │ +4.0%   │   ✅   │
└──────────┴─────────────────┴─────────────────┴─────────┴────────┘
```

### Mỗi dòng phải có:
- ✅ Tên constraint (V15%, V25%, etc.)
- ✅ Phác đồ chuẩn: Dose + Fractions + BED
- ✅ Phác đồ mới: Dose + Fractions + BED
- ✅ Safety Margin (%)
- ✅ Status (✅ hoặc ❌)

---

## 🔍 Debug Steps

### 1. Kiểm tra file đã load chưa

Mở Console và check:
```javascript
console.log('ORGAN_DATABASE:', typeof ORGAN_DATABASE);
console.log('bedCalculator:', typeof bedCalculator);
console.log('validationEngine:', typeof validationEngine);
```

Tất cả phải là `object` hoặc `function`.

### 2. Kiểm tra rectum data

```javascript
const rectum = getOrgan('rectum');
console.log('Rectum:', rectum);
console.log('Conventional constraints:', rectum.conventional);
```

Phải thấy array với 4 constraints.

### 3. Kiểm tra calculation

```javascript
const result = bedCalculator.calculateDoseConversion({
  referenceDose: 75.0,
  referenceFraction: 2.0,
  customFraction: 3.0,
  alphaBeta: 3.0
});
console.log('Calculation result:', result);
```

Phải thấy object với các fields: referenceDose, customDose, BED, etc.

### 4. Kiểm tra display function

```javascript
const organ = getOrgan('rectum');
const results = organ.conventional.map(c => ({
  constraint: c,
  calculation: bedCalculator.calculateDoseConversion({
    referenceDose: c.doseLimit,
    referenceFraction: 2.0,
    customFraction: 3.0,
    alphaBeta: 3.0
  })
}));

console.log('Results array:', results);
console.log('Number of results:', results.length);
```

Phải thấy array với 4 items.

---

## 🚨 Nếu vẫn không được

### Option 1: Reload toàn bộ

1. Stop server (Ctrl+C)
2. Clear browser cache
3. Start server lại:
```bash
cd frontend
python3 -m http.server 8080
```
4. Mở trang mới (Incognito mode):
```
http://localhost:8080/TEST_MULTI_CONSTRAINT.html
```

### Option 2: Kiểm tra file version

Mở file `organ-dose-ui.js` và tìm function `displayCustomDoseResults`.

Phải thấy code này:
```javascript
results.forEach((item, index) => {
  const c = item.constraint;
  const calc = item.calculation;
  
  const constraintLabel = formatConstraintLabel(c);
  // ... rest of code
});
```

Nếu không thấy `results.forEach`, file chưa được cập nhật.

### Option 3: Force reload scripts

Thêm version vào HTML:
```html
<script src="js/organ-dose-ui.js?v=2"></script>
```

---

## ✅ Checklist

- [ ] Đã clear cache (Ctrl+F5)
- [ ] Đã mở trang TEST_MULTI_CONSTRAINT.html
- [ ] Debug info hiển thị tất cả ✅
- [ ] Console không có lỗi
- [ ] Rectum có 4 conventional constraints
- [ ] Function formatConstraintLabel tồn tại
- [ ] Kết quả hiển thị 4 dòng (V15%, V25%, V35%, V50%)

---

## 📞 Nếu vẫn cần hỗ trợ

1. Chụp màn hình kết quả hiện tại
2. Chụp màn hình Console (F12)
3. Chụp màn hình Debug Info từ TEST_MULTI_CONSTRAINT.html
4. Gửi cho tôi để debug

---

**Version:** 2.1  
**Last Updated:** November 30, 2025
