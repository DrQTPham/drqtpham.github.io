# 🚀 Quick Start - Organ Dose Multi-Constraint Calculator

## ⚡ Khởi động nhanh (5 phút)

### Bước 1: Mở ứng dụng

Chọn **MỘT** trong các cách sau:

#### Cách 1: Mở file trực tiếp (Đơn giản nhất)
```bash
# Mở file index.html trong trình duyệt
open frontend/index.html

# Hoặc double-click vào file index.html
```

#### Cách 2: Dùng Python HTTP Server (Khuyến nghị)
```bash
cd frontend
python3 -m http.server 8080

# Truy cập: http://localhost:8080
```

#### Cách 3: Dùng Live Server trong VS Code
1. Cài extension "Live Server"
2. Right-click vào `index.html`
3. Chọn "Open with Live Server"

### Bước 2: Test tính năng mới

#### Option A: Dùng trang Demo (Khuyến nghị cho test)
```bash
# Mở trang demo
open frontend/demo-organ-dose-calculator.html

# Hoặc truy cập
http://localhost:8080/demo-organ-dose-calculator.html
```

**Trong trang demo:**
1. Click nút **"🎯 Rectum + 3 Gy/fx"** để test nhanh
2. Xem kết quả cho TẤT CẢ constraints (V15%, V25%, V35%, V50%)
3. Thử các nút khác: Bladder, Heart, Lung

#### Option B: Dùng trang chính (index.html)
1. Scroll xuống phần **"📚 Tra cứu & Tính toán Giới hạn Liều Cơ quan"**
2. Chọn cơ quan: **Rectum (Trực tràng)**
3. Click **"🔍 Tra cứu thông tin"**
4. Nhập liều mới: **3.0** Gy
5. Click **"🧮 Tính liều giới hạn mới"**
6. Xem kết quả cho TẤT CẢ constraints!

---

## 📊 Ví dụ cụ thể

### Test Case 1: Rectum với 3 Gy/fx

**Input:**
- Cơ quan: Rectum
- Liều/fx mới: 3.0 Gy

**Expected Output:**
```
✅ Tất cả constraints trong giới hạn an toàn

┌──────────┬─────────────────┬─────────────────┬─────────┬────────┐
│ V15%     │ 75 Gy / 37 fx   │ 60 Gy / 20 fx   │ +4.0%   │   ✅   │
│ V25%     │ 70 Gy / 35 fx   │ 56 Gy / 19 fx   │ +4.0%   │   ✅   │
│ V35%     │ 65 Gy / 32 fx   │ 52 Gy / 17 fx   │ +4.0%   │   ✅   │
│ V50%     │ 60 Gy / 30 fx   │ 48 Gy / 16 fx   │ +4.0%   │   ✅   │
└──────────┴─────────────────┴─────────────────┴─────────┴────────┘
```

### Test Case 2: Bladder với 4 Gy/fx

**Input:**
- Cơ quan: Bladder
- Liều/fx mới: 4.0 Gy

**Expected Output:**
```
❌ MỘT SỐ CONSTRAINTS VƯỢT QUÁ GIỚI HẠN!

┌──────────┬─────────────────┬─────────────────┬─────────┬────────┐
│ V15%     │ 80 Gy / 40 fx   │ 60 Gy / 15 fx   │ -5.0%   │   ❌   │
│ V25%     │ 75 Gy / 37 fx   │ 56 Gy / 14 fx   │ -4.5%   │   ❌   │
│ V35%     │ 70 Gy / 35 fx   │ 52 Gy / 13 fx   │ -4.0%   │   ❌   │
│ V50%     │ 65 Gy / 32 fx   │ 48 Gy / 12 fx   │ -3.4%   │   ❌   │
└──────────┴─────────────────┴─────────────────┴─────────┴────────┘
```

---

## 🎯 Các cơ quan có nhiều constraints

Các cơ quan sau có nhiều constraints để test:

1. **Rectum** - 4 constraints (V15%, V25%, V35%, V50%)
2. **Bladder** - 4 constraints (V15%, V25%, V35%, V50%)
3. **Heart** - 3 constraints (V33%, V67%, V100%)
4. **Lung** - 2 constraints (Dmean, V37%)
5. **Kidney** - 3 constraints (V33%, V67%, V100%)
6. **Liver** - 2 constraints (V50%, V100%)

---

## 🔍 Kiểm tra kết quả

### Kết quả đúng phải có:

✅ **Bảng chi tiết** với các cột:
- Constraint (V15%, V25%, etc.)
- Phác đồ chuẩn (2 Gy/fx)
- Phác đồ mới (X Gy/fx)
- BED So sánh (Margin %)
- Status (✅ hoặc ❌)

✅ **Mỗi constraint** hiển thị:
- Total dose (Gy)
- Số fractions
- BED (Gy)

✅ **Status tổng thể**:
- ✅ Nếu TẤT CẢ constraints an toàn
- ❌ Nếu CÓ ÍT NHẤT MỘT constraint vượt quá

---

## 🐛 Troubleshooting

### Lỗi: "Không tìm thấy cơ quan"
**Giải pháp:** Kiểm tra file `organ-dose-database.js` đã load chưa
```bash
# Mở console (F12) và check
console.log(getOrganCount());
# Phải hiển thị: 38
```

### Lỗi: "Không có dữ liệu conventional"
**Giải pháp:** Cơ quan đó không có conventional constraints, chọn cơ quan khác

### Lỗi: Chỉ hiển thị 1 constraint thay vì tất cả
**Giải pháp:** 
1. Refresh trang (Ctrl+F5)
2. Clear cache
3. Kiểm tra file `organ-dose-ui.js` đã được cập nhật chưa

### Lỗi: JavaScript không chạy
**Giải pháp:**
1. Mở Console (F12)
2. Xem có lỗi gì không
3. Kiểm tra thứ tự load scripts trong HTML:
   ```html
   <script src="js/organ-dose-database.js"></script>
   <script src="js/bed-calculator.js"></script>
   <script src="js/validation-engine.js"></script>
   <script src="js/organ-dose-ui.js"></script>
   ```

---

## 📚 Files quan trọng

### Để sử dụng:
- `index.html` - Trang chính
- `demo-organ-dose-calculator.html` - Trang demo (khuyến nghị)

### Để tham khảo:
- `MULTI_CONSTRAINT_FEATURE.md` - Tài liệu chi tiết
- `HUONG_DAN_SU_DUNG.md` - Hướng dẫn đầy đủ
- `SBRT_3FX_5FX_UPDATE_COMPLETE.md` - Thông tin về dữ liệu SBRT

### Code:
- `js/organ-dose-ui.js` - UI controller (đã cập nhật)
- `js/organ-dose-database.js` - Database 38 cơ quan
- `js/bed-calculator.js` - BED calculation engine

---

## ✅ Checklist

- [ ] Đã mở được ứng dụng (index.html hoặc demo)
- [ ] Đã chọn được cơ quan từ dropdown
- [ ] Đã tra cứu được thông tin cơ quan
- [ ] Đã nhập được liều/fx mới
- [ ] Đã tính toán được kết quả
- [ ] Kết quả hiển thị **TẤT CẢ constraints** (không chỉ 1)
- [ ] Mỗi constraint có đầy đủ: Dose, Fractions, BED, Margin, Status

---

## 🎉 Thành công!

Nếu bạn thấy bảng kết quả với nhiều constraints (V15%, V25%, V35%, V50%), 
tính năng đã hoạt động đúng! 🎊

**Next steps:**
1. Thử với các cơ quan khác
2. Thử với các liều/fx khác nhau
3. So sánh kết quả với guidelines
4. Sử dụng trong công việc thực tế

---

**Cần hỗ trợ?**
- Xem `MULTI_CONSTRAINT_FEATURE.md` để hiểu chi tiết
- Xem `HUONG_DAN_SU_DUNG.md` để biết cách dùng đầy đủ
- Check console log (F12) để debug

**Phiên bản:** 2.1  
**Ngày:** November 30, 2025
