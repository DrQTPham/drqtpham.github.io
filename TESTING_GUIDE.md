# 🧪 Hướng dẫn Test Tính năng Mới

## 🎯 Tổng quan
Phần mềm đã được thêm 2 tính năng mới:
1. **Tính giới hạn liều cơ quan lành** - Tính liều tối đa cho cơ quan khi thay đổi phân liều
2. **Tính bù liều gián đoạn** - Tính liều bù khi có gián đoạn trong xạ trị

---

## 🚀 Cách test nhanh

### Bước 1: Mở trình duyệt
```
http://localhost:8080/index.html?v=3
```

### Bước 2: Test tính giới hạn liều cơ quan lành

1. Cuộn xuống phần **"⚠️ Tính liều giới hạn cơ quan lành"**
2. Chọn **"Tủy sống (Spinal Cord)"** từ dropdown
   - Tự động điền: 45 Gy, α/β = 2.0
3. Nhập **"3.0"** vào "Liều/phân liều mới"
4. Click **"🧮 Tính liều giới hạn mới"**

**Kết quả mong đợi:**
```
✅ Trong giới hạn an toàn

Phác đồ chuẩn (2 Gy/fx): 45.0 Gy
BED: 90.00 Gy

Phác đồ mới (3.0 Gy/fx): 36.0 Gy
12 phân liều

BED với phác đồ mới: 90.00 Gy
Margin an toàn: 0.0%
```

### Bước 3: Test tính bù liều gián đoạn

1. Cuộn xuống phần **"⏸️ Tính bù liều khi gián đoạn xạ trị"**
2. Chọn **"U đầu cổ (Head & Neck)"** từ dropdown
   - Tự động điền: 0.6 Gy/ngày
3. Nhập các giá trị:
   - Số ngày gián đoạn: **7**
   - Tổng liều ban đầu: **70.0** Gy
   - Số phân liều ban đầu: **35**
   - Số phân liều đã hoàn thành: **20**
4. Click **"🧮 Tính liều bù"**

**Kết quả mong đợi:**
```
⚠️ Lưu ý: Liều bù đáng kể

Số ngày gián đoạn: 7 ngày
Tốc độ tái sinh: 0.6 Gy/ngày
Liều cần bù: 4.20 Gy

Phương án 1: Thêm phân liều
- Liều/phân liều: 2.00 Gy (không đổi)
- Số phân liều cần thêm: 3 phân liều
- Tổng số phân liều mới: 38 phân liều
- Tổng liều mới: 74.20 Gy

Phương án 2: Tăng liều/fx
- Liều/phân liều mới: 2.28 Gy (+0.28 Gy)
- Số phân liều còn lại: 15 phân liều (không đổi)
- Tổng liều mới: 74.20 Gy
```

---

## 📝 Test Cases chi tiết

### Test Case 1: Organ Limit - Tủy sống
**Input:**
- Cơ quan: Tủy sống
- Liều chuẩn: 45 Gy
- α/β: 2.0 Gy
- Liều/fx mới: 3.0 Gy

**Expected:**
- BED chuẩn: 90 Gy
- Liều mới: 36 Gy
- Số fx: 12
- Margin: 0%

### Test Case 2: Organ Limit - Phổi
**Input:**
- Cơ quan: Phổi
- Liều chuẩn: 20 Gy
- α/β: 3.0 Gy
- Liều/fx mới: 2.5 Gy

**Expected:**
- BED chuẩn: ~33.33 Gy
- Liều mới: ~19 Gy
- Số fx: 7-8
- Margin: dương

### Test Case 3: Gap Compensation - U phổi
**Input:**
- Loại u: U phổi
- Tốc độ: 0.5 Gy/ngày
- Gián đoạn: 10 ngày
- Tổng liều: 60 Gy
- Số fx: 30
- Đã xong: 15

**Expected:**
- Liều bù: 5.0 Gy (⚠️ cao!)
- Thêm: 3 fx
- Hoặc tăng: ~2.33 Gy/fx

### Test Case 4: Gap Compensation - Gián đoạn dài
**Input:**
- Loại u: U đầu cổ
- Tốc độ: 0.6 Gy/ngày
- Gián đoạn: 14 ngày
- Tổng liều: 70 Gy
- Số fx: 35
- Đã xong: 20

**Expected:**
- Liều bù: 8.4 Gy (⚠️ CẢNH BÁO cao!)
- Thêm: 5 fx
- Hoặc tăng: ~2.56 Gy/fx

---

## ⚠️ Edge Cases cần test

### Edge Case 1: Liều/fx rất cao
**Input:** Liều/fx mới = 8.0 Gy
**Expected:** Liều tối đa giảm mạnh (18 Gy cho tủy sống)

### Edge Case 2: Đã hoàn thành tất cả fx
**Input:** Completed = Total fractions
**Expected:** Hiển thị lỗi "Đã hoàn thành tất cả phân liều"

### Edge Case 3: Gián đoạn = 0
**Input:** Gap days = 0
**Expected:** Hiển thị lỗi "Số ngày gián đoạn phải lớn hơn 0"

### Edge Case 4: Completed > Total
**Input:** Completed > Total fractions
**Expected:** Hiển thị lỗi "Số phân liều đã hoàn thành không thể lớn hơn tổng số phân liều"

---

## 🐛 Troubleshooting

### Vấn đề 1: Không hiển thị kết quả
**Giải pháp:**
1. Mở Developer Console (F12)
2. Kiểm tra có lỗi JavaScript không
3. Hard refresh (Cmd+Shift+R hoặc Ctrl+Shift+R)
4. Xóa cache browser

### Vấn đề 2: Preset không tự động điền
**Giải pháp:**
1. Kiểm tra console có lỗi không
2. Đảm bảo đã chọn đúng option (không phải "-- Chọn --")
3. Reload trang

### Vấn đề 3: Validation không hoạt động
**Giải pháp:**
1. Kiểm tra đã nhập đầy đủ thông tin chưa
2. Kiểm tra giá trị có hợp lệ không (số dương)
3. Xem console có thông báo lỗi không

---

## ✅ Checklist kiểm tra

### Tính giới hạn liều cơ quan lành
- [ ] Preset cơ quan tự động điền đúng
- [ ] Tính toán chính xác với các giá trị khác nhau
- [ ] Cảnh báo khi BED vượt quá
- [ ] Cảnh báo khi margin thấp
- [ ] Hiển thị kết quả đầy đủ và rõ ràng
- [ ] Scroll xuống kết quả tự động

### Tính bù liều gián đoạn
- [ ] Preset loại u tự động điền đúng
- [ ] Tính toán chính xác với các giá trị khác nhau
- [ ] Hiển thị cả 2 phương án bù liều
- [ ] Cảnh báo khi liều bù cao (>3 Gy, >5 Gy)
- [ ] Cảnh báo khi liều/fx mới cao (>3 Gy)
- [ ] Validation đầy đủ (completed ≤ total, gap > 0, etc.)
- [ ] Hiển thị kết quả đầy đủ và rõ ràng
- [ ] Scroll xuống kết quả tự động

### General
- [ ] Không có lỗi JavaScript trong console
- [ ] UI responsive trên mobile
- [ ] Tất cả button hoạt động
- [ ] Alert messages hiển thị đúng
- [ ] Scroll smooth khi hiển thị kết quả

---

## 📊 Kết quả kiểm tra

**Ngày test:** ___________
**Người test:** ___________

| Tính năng | Status | Ghi chú |
|-----------|--------|---------|
| Organ Limit - Logic | ✅ | |
| Organ Limit - UI | ✅ | |
| Organ Limit - Validation | ✅ | |
| Gap Compensation - Logic | ✅ | |
| Gap Compensation - UI | ✅ | |
| Gap Compensation - Validation | ✅ | |
| Edge Cases | ✅ | |
| Browser Compatibility | ⏳ | |

**Tổng kết:** ✅ PASS / ❌ FAIL

**Ghi chú thêm:**
_________________________________
_________________________________
_________________________________
