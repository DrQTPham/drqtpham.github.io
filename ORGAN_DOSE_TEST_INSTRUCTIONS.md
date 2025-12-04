# 🧪 Hướng dẫn Test Organ Dose Custom Calculation

## ✅ Checklist trước khi test

1. **Backend đang chạy**: `./START_APP.sh`
2. **Browser console mở**: Press F12
3. **Clear cache**: Ctrl+Shift+R (hoặc Cmd+Shift+R trên Mac)

## 📋 Steps để test

### Bước 1: Mở ứng dụng
```
http://localhost:3000/index.html
```

### Bước 2: Scroll xuống section
Tìm section: **"📚 Tra cứu & Tính toán Giới hạn Liều Cơ quan"**

### Bước 3: Chọn organ
- Click dropdown "Chọn cơ quan"
- Chọn một organ (VD: **Spinal Cord - Tủy sống**)

### Bước 4: Tra cứu
- Click button **"🔍 Tra cứu thông tin"**
- Kiểm tra:
  - ✅ Thông tin organ hiển thị
  - ✅ Section "🧮 Tính liều với phân liều tùy chỉnh" xuất hiện

### Bước 5: Nhập custom dose
- Trong section "🧮 Tính liều với phân liều tùy chỉnh"
- Nhập giá trị (VD: **5**)

### Bước 6: Tính toán
- Click button **"🧮 Tính liều giới hạn mới"**
- **MỞ CONSOLE (F12)** để xem logs

## 🔍 Console Logs mong đợi

Bạn sẽ thấy các logs sau trong console:

```
=== 🧮 calculateCustomOrganDose START ===
Step 1 - Input element: <input type="number" id="customDosePerFraction"...>
Step 2 - Parsed value: 5 from raw: 5
Step 3 - Results div: <div id="customOrganDoseResults"...>
Step 4 - Current organ: spinal_cord
Step 5 - Validating...
Validation result: {isValid: true, errorMessage: null, warnings: Array(0)}
Step 6 - Getting organ data...
Organ data: {id: "spinal_cord", nameVi: "Tủy sống", ...}
Step 7 - Checking constraints...
Alpha/Beta: 2
Number of constraints: 2
Step 8 - Calculating...
  Processing constraint 1/2: {type: "Dmax", volume: "", doseLimit: 50, ...}
  Result 1: {referenceDose: 50, referenceFraction: 2, ...}
  Processing constraint 2/2: {type: "D0.03cc", volume: "0.03", doseLimit: 50, ...}
  Result 2: {referenceDose: 50, referenceFraction: 2, ...}
All results: Array(2)
Calling displayCustomDoseResults...
✅ displayCustomDoseResults completed
```

## ✅ Kết quả mong đợi

Sau khi click "Tính liều giới hạn mới", bạn sẽ thấy:

### 1. Bảng kết quả hiển thị
```
✅ Tất cả constraints trong giới hạn an toàn

📊 Kết quả tính toán - Tủy sống

💡 Thông tin:
α/β: 2 Gy | Endpoint: Myelitis
Phác đồ mới: 5.0 Gy/fx

📋 So sánh theo từng Constraint:

| Constraint | Phác đồ chuẩn (2 Gy/fx) | Phác đồ mới (5.0 Gy/fx) | BED So sánh | Status |
|------------|-------------------------|-------------------------|-------------|--------|
| Dmax       | 50.0 Gy (25 fx)        | 35.0 Gy (7 fx)          | +30.0%      | ✅     |
|            | BED: 75.0 Gy           | BED: 52.5 Gy            |             |        |
```

### 2. Màu sắc
- **Xanh lá (green)**: Constraints an toàn
- **Đỏ (red)**: Constraints vượt quá

### 3. Giải thích
- **BED**: Biologically Effective Dose
- **Safety Margin**: % chênh lệch (dương = an toàn)
- **✅**: BED mới ≤ BED chuẩn
- **❌**: BED mới > BED chuẩn

## ❌ Troubleshooting

### Lỗi 1: "Vui lòng chọn cơ quan trước"
**Nguyên nhân**: Chưa chọn organ hoặc chưa click "Tra cứu thông tin"
**Giải pháp**: 
1. Chọn organ từ dropdown
2. Click "🔍 Tra cứu thông tin"
3. Đợi section custom dose xuất hiện
4. Mới nhập và tính toán

### Lỗi 2: "Vui lòng nhập liều/phân liều hợp lệ"
**Nguyên nhân**: Input trống hoặc không phải số
**Giải pháp**: Nhập số dương (VD: 3.0, 5.0)

### Lỗi 3: Không có kết quả hiển thị
**Nguyên nhân**: Có thể có lỗi JavaScript
**Giải pháp**:
1. Mở Console (F12)
2. Xem error messages màu đỏ
3. Copy error và gửi cho developer

### Lỗi 4: Console shows "undefined"
**Nguyên nhân**: Module chưa load
**Giải pháp**:
1. Clear cache (Ctrl+Shift+R)
2. Reload page
3. Kiểm tra Network tab xem có file nào fail không

## 🧮 Test Cases

### Test Case 1: Spinal Cord với 5 Gy/fx
**Input**:
- Organ: Spinal Cord
- Custom dose: 5.0 Gy/fx

**Expected**:
- Dmax: 50 Gy (25 fx @ 2 Gy) → 35 Gy (7 fx @ 5 Gy)
- BED: 75 Gy → 52.5 Gy
- Status: ✅ Safe (margin +30%)

### Test Case 2: Lens với 3 Gy/fx
**Input**:
- Organ: Lens
- Custom dose: 3.0 Gy/fx

**Expected**:
- Dmax: 10 Gy (5 fx @ 2 Gy) → 6 Gy (2 fx @ 3 Gy)
- BED: 15 Gy → 9 Gy
- Status: ✅ Safe

### Test Case 3: Brainstem với 8 Gy/fx (High dose)
**Input**:
- Organ: Brainstem
- Custom dose: 8.0 Gy/fx

**Expected**:
- Warning: High dose
- Some constraints may exceed
- Status: ❌ Exceeded (red)

## 📸 Screenshots

Nếu có lỗi, hãy chụp màn hình:
1. **Toàn bộ page** với section visible
2. **Console logs** (F12)
3. **Network tab** nếu có file fail

## 📞 Support

Nếu vẫn không hoạt động:
1. Copy toàn bộ console logs
2. Chụp screenshot
3. Gửi email: qtphamhus@gmail.com

---

**Version**: 1.0.0
**Date**: 2025-12-02
**Status**: ✅ READY FOR TESTING
