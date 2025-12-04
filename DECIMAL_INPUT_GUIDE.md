# Hướng Dẫn Nhập Số Thập Phân

## 🎯 Tính Năng Mới: Hỗ Trợ Cả Dấu Phẩy và Dấu Chấm

Ứng dụng EQD2 & BED Calculator hiện đã hỗ trợ nhập số thập phân với **CẢ HAI** định dạng:

### ✅ Định dạng được hỗ trợ:

| Định dạng | Ví dụ | Khu vực sử dụng |
|-----------|-------|-----------------|
| **Dấu chấm (.)** | `2.5` | Mỹ, Anh, Úc, Châu Á |
| **Dấu phẩy (,)** | `2,5` | Việt Nam, Châu Âu, Nam Mỹ |

---

## 🚀 Cách Sử Dụng

### 1. Nhập với dấu chấm (.)
```
Tốc độ tái sinh: 0.7
Tổng liều: 70.5
Liều/phân liều: 2.5
```

### 2. Nhập với dấu phẩy (,)
```
Tốc độ tái sinh: 0,7
Tổng liều: 70,5
Liều/phân liều: 2,5
```

**Cả hai cách đều hoạt động!** Hệ thống tự động chuyển đổi.

---

## 💡 Tính Năng Tự Động

### Chuyển đổi tự động
Khi bạn nhập số với dấu phẩy và rời khỏi ô nhập (blur), hệ thống sẽ:
1. ✅ Tự động chuyển dấu phẩy (,) thành dấu chấm (.)
2. ✅ Hiển thị thông báo nhỏ: "✓ Đã chuyển , → ."
3. ✅ Tính toán chính xác

### Ví dụ:
```
Bạn nhập:  2,5
Hệ thống chuyển thành: 2.5
Kết quả: ✓ Đã chuyển , → .
```

---

## 🔧 Áp Dụng Cho Tất Cả Input

Tính năng này hoạt động với **TẤT CẢ** ô nhập số trong ứng dụng:

### 1. Tính BED & EQD2
- Tổng liều (D)
- Liều/phân liều (d)
- α/β

### 2. Tính bù liều Gap
- Tốc độ tái sinh
- Tổng liều ban đầu

### 3. Tra cứu Organ Dose
- Liều giới hạn chuẩn
- α/β cơ quan
- Liều/phân liều mới

### 4. Tính ngược EQD2
- EQD2 mục tiêu
- Liều/phân liều
- α/β

---

## 📱 Tương Thích

### Desktop
- ✅ Chrome, Firefox, Safari, Edge
- ✅ Tự động chuyển đổi khi blur
- ✅ Hiển thị tooltip

### Mobile
- ✅ iOS Safari
- ✅ Android Chrome
- ✅ Bàn phím số hỗ trợ cả , và .

---

## 🎨 Trải Nghiệm Người Dùng

### Khi nhập với dấu phẩy:
1. Bạn nhập: `2,5`
2. Click ra ngoài ô nhập
3. Thấy tooltip xanh: **"✓ Đã chuyển , → ."**
4. Giá trị tự động đổi thành: `2.5`
5. Tính toán chính xác!

### Không cần lo lắng:
- ❌ Không cần nhớ phải dùng dấu gì
- ❌ Không bị lỗi "NaN" (Not a Number)
- ❌ Không cần sửa lại input
- ✅ Nhập tự nhiên theo thói quen!

---

## 🔍 Kỹ Thuật

### Cách hoạt động:
```javascript
// Hàm normalize
function normalizeDecimalInput(value) {
    return value.replace(/,/g, '.');
}

// Parse linh hoạt
function parseFloatFlexible(value) {
    const normalized = normalizeDecimalInput(value);
    return parseFloat(normalized);
}
```

### Event listeners:
- **blur**: Tự động chuyển đổi khi rời khỏi ô
- **keypress**: Cho phép nhập dấu phẩy
- **DOMContentLoaded**: Khởi tạo cho tất cả input

---

## 📊 Ví Dụ Thực Tế

### Case 1: Tính bù liều
```
Input (với dấu phẩy):
- Tốc độ tái sinh: 0,7
- Số ngày gián đoạn: 5
- Tổng liều: 70,0
- Số phân liều: 35

Kết quả:
✓ Tất cả được chuyển đổi tự động
✓ Tính toán chính xác: Liều bù = 3.5 Gy
```

### Case 2: Tính EQD2
```
Input (với dấu phẩy):
- Tổng liều: 60,0
- Số phân liều: 30
- α/β: 10,0

Kết quả:
✓ EQD2 = 60.00 Gy
✓ BED = 120.00 Gy
```

---

## ⚠️ Lưu Ý

### Không hỗ trợ:
- ❌ Nhiều dấu phẩy: `2,5,0` (không hợp lệ)
- ❌ Dấu phẩy làm phân cách nghìn: `1,000` (sẽ thành 1.000)

### Khuyến nghị:
- ✅ Dùng dấu phẩy CHỈ cho thập phân
- ✅ Không dùng dấu phân cách nghìn
- ✅ Ví dụ đúng: `2,5` hoặc `2.5`
- ✅ Ví dụ sai: `1,000` (nên viết `1000`)

---

## 🎓 Tại Sao Cần Tính Năng Này?

### Vấn đề:
- Người Việt Nam quen dùng dấu phẩy: `2,5`
- JavaScript chỉ hiểu dấu chấm: `2.5`
- Nhập sai → Lỗi NaN → Không tính được

### Giải pháp:
- ✅ Tự động chuyển đổi
- ✅ Hỗ trợ cả hai định dạng
- ✅ Trải nghiệm người dùng tốt hơn
- ✅ Giảm lỗi nhập liệu

---

## 📚 Tài Liệu Kỹ Thuật

### File liên quan:
- `js/input-normalizer.js` - Logic chuyển đổi
- `js/app.js` - Sử dụng parseFloatFlexible
- `index.html` - Load script

### Functions:
- `normalizeDecimalInput(value)` - Chuyển , → .
- `parseFloatFlexible(value)` - Parse float linh hoạt
- `parseIntFlexible(value)` - Parse int linh hoạt
- `showDecimalHint(element)` - Hiển thị tooltip

---

## 🚀 Cập Nhật

**Version 2.2** - Decimal Input Support
- ✅ Hỗ trợ dấu phẩy và dấu chấm
- ✅ Tự động chuyển đổi
- ✅ Tooltip thông báo
- ✅ Áp dụng toàn bộ ứng dụng

---

**© 2025 EQD2 & BED Calculator**  
**Phát triển bởi Dr. Q.T. Phạm**  
📧 qtphamhus@gmail.com
