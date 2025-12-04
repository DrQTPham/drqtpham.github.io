# Tính Năng Tính Toán Đa Constraint

## 🎯 Tổng Quan

Tính năng mới cho phép tính toán giới hạn liều cho **TẤT CẢ các constraints** của một cơ quan, thay vì chỉ tính cho một constraint duy nhất.

## ✨ Cải Tiến

### Trước đây:
```
Phác đồ mới (3.0 Gy/fx):
60.0 Gy / 20 phân liều
BED: 120.00 Gy
```

### Bây giờ:
```
Phác đồ mới (3.0 Gy/fx):

┌─────────────┬──────────────────┬──────────────────┬──────────┬────────┐
│ Constraint  │ Phác đồ chuẩn    │ Phác đồ mới      │ BED      │ Status │
│             │ (2 Gy/fx)        │ (3.0 Gy/fx)      │ Margin   │        │
├─────────────┼──────────────────┼──────────────────┼──────────┼────────┤
│ V15%        │ 75.0 Gy / 37 fx  │ 60.0 Gy / 20 fx  │ +4.0%    │   ✅   │
│             │ BED: 125.0 Gy    │ BED: 120.0 Gy    │          │        │
├─────────────┼──────────────────┼──────────────────┼──────────┼────────┤
│ V25%        │ 70.0 Gy / 35 fx  │ 56.0 Gy / 19 fx  │ +4.0%    │   ✅   │
│             │ BED: 116.7 Gy    │ BED: 112.0 Gy    │          │        │
├─────────────┼──────────────────┼──────────────────┼──────────┼────────┤
│ V35%        │ 65.0 Gy / 32 fx  │ 52.0 Gy / 17 fx  │ +4.0%    │   ✅   │
│             │ BED: 108.3 Gy    │ BED: 104.0 Gy    │          │        │
├─────────────┼──────────────────┼──────────────────┼──────────┼────────┤
│ V50%        │ 60.0 Gy / 30 fx  │ 48.0 Gy / 16 fx  │ +4.0%    │   ✅   │
│             │ BED: 100.0 Gy    │ BED: 96.0 Gy     │          │        │
└─────────────┴──────────────────┴──────────────────┴──────────┴────────┘
```

## 📊 Ví Dụ Cụ Thể

### Ví dụ 1: Rectum với 3 Gy/fx

**Input:**
- Cơ quan: Rectum (Trực tràng)
- Phác đồ mới: 3.0 Gy/fx
- α/β: 3 Gy

**Conventional Constraints:**
- V15% ≤ 75 Gy
- V25% ≤ 70 Gy
- V35% ≤ 65 Gy
- V50% ≤ 60 Gy

**Output:**

| Constraint | Chuẩn (2 Gy/fx) | Mới (3 Gy/fx) | BED Margin | Status |
|------------|-----------------|---------------|------------|--------|
| V15% | 75.0 Gy (37 fx)<br>BED: 125.0 Gy | 60.0 Gy (20 fx)<br>BED: 120.0 Gy | +4.0% | ✅ |
| V25% | 70.0 Gy (35 fx)<br>BED: 116.7 Gy | 56.0 Gy (19 fx)<br>BED: 112.0 Gy | +4.0% | ✅ |
| V35% | 65.0 Gy (32 fx)<br>BED: 108.3 Gy | 52.0 Gy (17 fx)<br>BED: 104.0 Gy | +4.0% | ✅ |
| V50% | 60.0 Gy (30 fx)<br>BED: 100.0 Gy | 48.0 Gy (16 fx)<br>BED: 96.0 Gy | +4.0% | ✅ |

**Kết luận:** ✅ Tất cả constraints đều an toàn

### Ví dụ 2: Bladder với 4 Gy/fx

**Input:**
- Cơ quan: Bladder (Bàng quang)
- Phác đồ mới: 4.0 Gy/fx
- α/β: 3 Gy

**Conventional Constraints:**
- V15% ≤ 80 Gy
- V25% ≤ 75 Gy
- V35% ≤ 70 Gy
- V50% ≤ 65 Gy

**Output:**

| Constraint | Chuẩn (2 Gy/fx) | Mới (4 Gy/fx) | BED Margin | Status |
|------------|-----------------|---------------|------------|--------|
| V15% | 80.0 Gy (40 fx)<br>BED: 133.3 Gy | 60.0 Gy (15 fx)<br>BED: 140.0 Gy | -5.0% | ❌ |
| V25% | 75.0 Gy (37 fx)<br>BED: 125.0 Gy | 56.0 Gy (14 fx)<br>BED: 130.7 Gy | -4.5% | ❌ |
| V35% | 70.0 Gy (35 fx)<br>BED: 116.7 Gy | 52.0 Gy (13 fx)<br>BED: 121.3 Gy | -4.0% | ❌ |
| V50% | 65.0 Gy (32 fx)<br>BED: 108.3 Gy | 48.0 Gy (12 fx)<br>BED: 112.0 Gy | -3.4% | ❌ |

**Kết luận:** ❌ TẤT CẢ constraints đều vượt quá giới hạn!

## 🔧 Cách Sử Dụng

### Trong Ứng Dụng Chính

1. Mở tab **"Organ Dose Limits"**
2. Chọn cơ quan (ví dụ: Rectum)
3. Xem bảng constraints conventional
4. Nhập **Liều mỗi phân liều mới** (ví dụ: 3.0 Gy)
5. Click **"Tính toán"**
6. Xem kết quả cho **TẤT CẢ constraints**

### Test Riêng

Mở file `test-multi-constraint-calculation.html` trong trình duyệt:

```bash
# Mở trong trình duyệt
open frontend/test-multi-constraint-calculation.html

# Hoặc dùng Python HTTP server
cd frontend
python -m http.server 8080
# Truy cập: http://localhost:8080/test-multi-constraint-calculation.html
```

## 📐 Công Thức Tính Toán

### Cho mỗi constraint:

1. **Tính BED chuẩn:**
   ```
   BED_ref = D_ref × (1 + d_ref/(α/β))
   ```
   Với:
   - D_ref = Dose limit từ constraint (ví dụ: 75 Gy)
   - d_ref = 2 Gy (conventional)
   - α/β = Alpha/beta ratio của cơ quan

2. **Tính liều tương đương:**
   ```
   D_new = BED_ref / (1 + d_new/(α/β))
   ```
   Với:
   - d_new = Dose per fraction mới (ví dụ: 3 Gy)

3. **Tính số phân liều:**
   ```
   n_new = floor(D_new / d_new)
   ```

4. **Tính liều thực tế:**
   ```
   D_practical = n_new × d_new
   ```

5. **Tính BED mới:**
   ```
   BED_new = D_practical × (1 + d_new/(α/β))
   ```

6. **Tính Safety Margin:**
   ```
   Margin = ((BED_ref - BED_new) / BED_ref) × 100%
   ```

## 🎨 Hiển Thị Kết Quả

### Màu sắc:
- ✅ **Xanh lá** (background trắng): BED mới ≤ BED chuẩn (an toàn)
- ❌ **Đỏ** (background hồng nhạt): BED mới > BED chuẩn (vượt quá)

### Thông tin hiển thị cho mỗi constraint:
1. **Tên constraint** (V15%, V25%, Dmax, etc.)
2. **Phác đồ chuẩn:**
   - Total dose (Gy)
   - Số fractions
   - BED (Gy)
3. **Phác đồ mới:**
   - Total dose (Gy)
   - Số fractions
   - BED (Gy)
4. **BED Margin** (%)
5. **Status** (✅ hoặc ❌)

## 🔍 Các Loại Constraint Được Hỗ Trợ

1. **Dmax** - Dose tối đa
2. **Dmean** - Dose trung bình
3. **VX%** - Volume percent (ví dụ: V15%, V25%)
4. **DXcc** - Dose at volume (ví dụ: D15cc, D20cc)
5. **Volume to spare** - Volume cần bảo vệ

## ⚠️ Lưu Ý Quan Trọng

1. **Tất cả constraints đều được tính:**
   - Không chỉ constraint đầu tiên
   - Mỗi constraint có giới hạn riêng

2. **Status tổng thể:**
   - ✅ Nếu TẤT CẢ constraints đều an toàn
   - ❌ Nếu CÓ ÍT NHẤT MỘT constraint vượt quá

3. **Safety Margin:**
   - Dương (+): An toàn, BED mới < BED chuẩn
   - Âm (-): Vượt quá, BED mới > BED chuẩn
   - Càng cao càng an toàn

4. **Làm tròn fractions:**
   - Số fractions luôn là số nguyên
   - Làm tròn xuống để đảm bảo an toàn

## 📚 Ví Dụ Thực Tế

### Case 1: Prostate Cancer - Rectum Constraint

**Tình huống:**
- Bệnh nhân ung thư tuyến tiền liệt
- Muốn dùng hypofractionation: 3 Gy/fx
- Cần kiểm tra rectum constraints

**Kết quả:**
```
Rectum (α/β = 3 Gy):
✅ V15%: 60.0 Gy (20 fx) - Margin: +4.0%
✅ V25%: 56.0 Gy (19 fx) - Margin: +4.0%
✅ V35%: 52.0 Gy (17 fx) - Margin: +4.0%
✅ V50%: 48.0 Gy (16 fx) - Margin: +4.0%

→ Kết luận: An toàn, có thể dùng 3 Gy/fx
```

### Case 2: Lung SBRT - Heart Constraint

**Tình huống:**
- SBRT phổi
- Muốn dùng 12 Gy/fx × 5 fractions
- Cần kiểm tra heart constraints

**Kết quả:**
```
Heart (α/β = 3 Gy):
❌ V33%: Vượt quá +15%
❌ V67%: Vượt quá +20%
✅ V100%: An toàn -2%

→ Kết luận: Cần giảm liều hoặc tối ưu kế hoạch
```

## 🚀 Cải Tiến Trong Tương Lai

1. **Export kết quả** sang PDF/Excel
2. **Biểu đồ trực quan** so sánh BED
3. **Đề xuất tự động** liều tối ưu
4. **Lưu lịch sử** tính toán
5. **So sánh nhiều phác đồ** cùng lúc

## 📞 Hỗ Trợ

Nếu có vấn đề:
1. Kiểm tra console log (F12)
2. Xem file `test-multi-constraint-calculation.html`
3. Đọc `HUONG_DAN_SU_DUNG.md`

---

**Phiên bản**: 2.1  
**Ngày cập nhật**: November 30, 2025  
**Tác giả**: EQD2/BED Calculator Team
