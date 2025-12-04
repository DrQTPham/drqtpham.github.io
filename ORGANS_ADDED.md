# 📋 Danh sách Cơ quan đã thêm

## ✅ Cơ quan mới được thêm vào

### 1. **Thủy tinh thể (Lens)** ⭐ MỚI
- **Liều giới hạn**: 10 Gy @ 2 Gy/fx
- **α/β**: 1.0 Gy (CỰC KỲ NHẠY CẢM!)
- **Độc tính**: Đục thủy tinh thể (Cataract)
- **Lưu ý**: Cơ quan nhạy cảm nhất với liều/fx cao

### 2. **Giao thoa thị giác (Optic Chiasm)** ⭐ MỚI
- **Liều giới hạn**: 54 Gy @ 2 Gy/fx
- **α/β**: 2.0 Gy
- **Độc tính**: Mù lòa
- **Lưu ý**: Quan trọng trong xạ trị u tuyến yên

### 3. **Tuyến nước bọt (Parotid)** ⭐ MỚI
- **Liều giới hạn**: 26 Gy @ 2 Gy/fx (mean dose)
- **α/β**: 3.0 Gy
- **Độc tính**: Khô miệng (Xerostomia)
- **Lưu ý**: Quan trọng trong xạ trị u đầu cổ

---

## 📊 Danh sách đầy đủ (12 cơ quan)

### Đầu cổ (6 cơ quan)
1. ✅ **Thủy tinh thể (Lens)** - 10 Gy, α/β = 1.0
2. ✅ **Dây thần kinh thị giác (Optic Nerve)** - 54 Gy, α/β = 2.0
3. ✅ **Giao thoa thị giác (Optic Chiasm)** - 54 Gy, α/β = 2.0
4. ✅ **Thân não (Brainstem)** - 54 Gy, α/β = 2.0
5. ✅ **Tủy sống (Spinal Cord)** - 45 Gy, α/β = 2.0
6. ✅ **Tuyến nước bọt (Parotid)** - 26 Gy, α/β = 3.0

### Ngực - Bụng (4 cơ quan)
7. ✅ **Phổi (Lung)** - 20 Gy, α/β = 3.0
8. ✅ **Tim (Heart)** - 30 Gy, α/β = 3.0
9. ✅ **Gan (Liver)** - 30 Gy, α/β = 3.0
10. ✅ **Thận (Kidney)** - 18 Gy, α/β = 3.0

### Tiểu khung (2 cơ quan)
11. ✅ **Trực tràng (Rectum)** - 60 Gy, α/β = 3.0
12. ✅ **Bàng quang (Bladder)** - 65 Gy, α/β = 3.0

---

## 🎯 Cải tiến giao diện

### Dropdown được tổ chức theo nhóm
```html
<optgroup label="Đầu cổ">
    <option value="lens">Thủy tinh thể (Lens)</option>
    <option value="optic_nerve">Dây thần kinh thị giác</option>
    ...
</optgroup>
<optgroup label="Ngực - Bụng">
    <option value="lung">Phổi (Lung)</option>
    ...
</optgroup>
<optgroup label="Tiểu khung">
    <option value="rectum">Trực tràng (Rectum)</option>
    ...
</optgroup>
```

**Lợi ích**:
- Dễ tìm kiếm
- Phân loại rõ ràng
- Trực quan hơn

---

## 📈 So sánh độ nhạy cảm

### Xếp hạng theo α/β (từ nhạy cảm nhất)

| Hạng | Cơ quan | α/β | Độ nhạy cảm |
|------|---------|-----|-------------|
| 1 | **Lens** | 1.0 | ⭐⭐⭐⭐⭐ Cực cao |
| 2 | Tủy sống | 2.0 | ⭐⭐⭐⭐ Rất cao |
| 2 | Thân não | 2.0 | ⭐⭐⭐⭐ Rất cao |
| 2 | Dây TK thị giác | 2.0 | ⭐⭐⭐⭐ Rất cao |
| 2 | Giao thoa TK | 2.0 | ⭐⭐⭐⭐ Rất cao |
| 3 | Phổi | 3.0 | ⭐⭐⭐ Cao |
| 3 | Tim | 3.0 | ⭐⭐⭐ Cao |
| 3 | Thận | 3.0 | ⭐⭐⭐ Cao |
| 3 | Gan | 3.0 | ⭐⭐⭐ Cao |
| 3 | Parotid | 3.0 | ⭐⭐⭐ Cao |
| 3 | Trực tràng | 3.0 | ⭐⭐⭐ Cao |
| 3 | Bàng quang | 3.0 | ⭐⭐⭐ Cao |

---

## 🧪 Test với Lens

### Ví dụ: Lens với 3.0 Gy/fx

**Input**:
- Cơ quan: Thủy tinh thể (Lens)
- Liều chuẩn: 10 Gy @ 2 Gy/fx
- α/β: 1.0 Gy
- Liều/fx mới: 3.0 Gy

**Output**:
- BED chuẩn: 30.00 Gy
- Liều tối đa mới: 6.0 Gy
- Số phân liều: 2 fx
- BED mới: 24.00 Gy
- Margin: 20.0%
- **Giảm 40% so với chuẩn!**

**Giải thích**:
- Lens có α/β rất thấp (1.0) nên cực kỳ nhạy cảm
- Khi tăng liều/fx từ 2 → 3 Gy, liều tổng giảm từ 10 → 6 Gy
- Đây là lý do cần thận trọng khi xạ gần lens!

---

## 📚 Tài liệu tham khảo

### Lens
- QUANTEC: Marks LB et al. 2010
- Merriam GR, Worgul BV. 1983
- Nakissa N et al. 2011

### Optic Chiasm
- QUANTEC: Mayo C et al. 2010
- Emami B et al. 1991

### Parotid
- QUANTEC: Deasy JO et al. 2010
- Eisbruch A et al. 1999

---

## ✅ Checklist cập nhật

- [x] Thêm Lens vào organLimits (JS)
- [x] Thêm Optic Chiasm vào organLimits (JS)
- [x] Thêm Parotid vào organLimits (JS)
- [x] Cập nhật dropdown HTML với optgroup
- [x] Test tính toán với Lens
- [x] Tạo tài liệu LENS_INFORMATION.md
- [x] Kiểm tra không có lỗi code
- [x] Tạo file ORGANS_ADDED.md

---

## 🎓 Kết luận

**Đã thêm thành công 3 cơ quan mới:**
1. ✅ Thủy tinh thể (Lens) - Cực kỳ quan trọng!
2. ✅ Giao thoa thị giác (Optic Chiasm)
3. ✅ Tuyến nước bọt (Parotid)

**Tổng cộng: 12 cơ quan**

**Cải tiến giao diện:**
- Dropdown có phân nhóm rõ ràng
- Dễ tìm kiếm và sử dụng

**Đặc biệt lưu ý:**
- **Lens** là cơ quan nhạy cảm nhất (α/β = 1.0)
- Cần thận trọng khi xạ trị vùng đầu cổ
- Công cụ giúp tính toán chính xác liều giới hạn

**Trạng thái**: ✅ HOÀN THÀNH
