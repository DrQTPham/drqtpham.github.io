# 🔧 Fix Display Issue - Hiển thị đầy đủ constraints

## ❌ Vấn đề

Khi tính liều với phân liều tùy chỉnh, chỉ hiển thị **1 kết quả** thay vì **TẤT CẢ constraints** (V15%, V25%, V35%, V50%).

## ✅ Giải pháp nhanh

### Bước 1: Clear Cache
```
Nhấn Ctrl+F5 (Windows) hoặc Cmd+Shift+R (Mac)
```

### Bước 2: Test với trang riêng
```
http://localhost:8080/TEST_MULTI_CONSTRAINT.html
```

### Bước 3: Kiểm tra kết quả

**Phải thấy bảng với 4 dòng:**
- V15%: 75.0 Gy → 60.0 Gy ✅
- V25%: 70.0 Gy → 56.0 Gy ✅
- V35%: 65.0 Gy → 52.0 Gy ✅
- V50%: 60.0 Gy → 48.0 Gy ✅

---

## 🎯 Nếu vẫn chỉ thấy 1 dòng

### Nguyên nhân: Cache chưa clear

**Giải pháp:**

1. **Mở Incognito/Private mode**
   ```
   Ctrl+Shift+N (Chrome)
   Cmd+Shift+N (Safari)
   ```

2. **Truy cập:**
   ```
   http://localhost:8080/TEST_MULTI_CONSTRAINT.html
   ```

3. **Test:**
   - Chọn Rectum
   - Click "Tra cứu"
   - Nhập 3.0 Gy
   - Click "Tính toán"

4. **Kiểm tra:**
   - Phải thấy 4 dòng
   - Mỗi dòng có đầy đủ: Constraint, Dose, Fractions, BED, Margin, Status

---

## 📊 Kết quả mong đợi

### Bảng đầy đủ:

| Constraint | Phác đồ chuẩn (2 Gy/fx) | Phác đồ mới (3 Gy/fx) | BED Margin | Status |
|------------|-------------------------|----------------------|------------|--------|
| **V15%** | 75.0 Gy<br>37 fx<br>BED: 125.0 Gy | 60.0 Gy<br>20 fx<br>BED: 120.0 Gy | +4.0% | ✅ |
| **V25%** | 70.0 Gy<br>35 fx<br>BED: 116.7 Gy | 56.0 Gy<br>19 fx<br>BED: 112.0 Gy | +4.0% | ✅ |
| **V35%** | 65.0 Gy<br>32 fx<br>BED: 108.3 Gy | 52.0 Gy<br>17 fx<br>BED: 104.0 Gy | +4.0% | ✅ |
| **V50%** | 60.0 Gy<br>30 fx<br>BED: 100.0 Gy | 48.0 Gy<br>16 fx<br>BED: 96.0 Gy | +4.0% | ✅ |

---

## 🔍 Debug nhanh

Mở Console (F12) và chạy:

```javascript
// Check rectum data
const rectum = getOrgan('rectum');
console.log('Constraints:', rectum.conventional.length);
// Phải hiển thị: 4

// Check function
console.log('formatConstraintLabel:', typeof formatConstraintLabel);
// Phải hiển thị: function
```

---

## 📁 Files hỗ trợ

1. **TEST_MULTI_CONSTRAINT.html** - Trang test riêng
2. **TROUBLESHOOTING_MULTI_CONSTRAINT.md** - Hướng dẫn chi tiết
3. **🔧_FIX_DISPLAY_ISSUE.md** - File này

---

## ✅ Checklist

- [ ] Đã clear cache (Ctrl+F5)
- [ ] Đã test với TEST_MULTI_CONSTRAINT.html
- [ ] Thấy 4 dòng trong bảng kết quả
- [ ] Mỗi dòng có đầy đủ thông tin
- [ ] Console không có lỗi

---

## 🎉 Khi đã OK

Quay lại trang chính:
```
http://localhost:8080/index.html
```

Tính năng sẽ hoạt động giống như trang test!

---

**Quick Link:**
- Test: http://localhost:8080/TEST_MULTI_CONSTRAINT.html
- Main: http://localhost:8080/index.html
