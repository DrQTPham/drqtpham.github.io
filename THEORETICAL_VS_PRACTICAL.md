# 📐 Liều Lý thuyết vs Liều Thực tế

## 🎯 Tại sao có 2 giá trị?

Khi tính toán liều giới hạn cơ quan lành, phần mềm hiển thị **2 giá trị khác nhau**:

1. **Liều lý thuyết** (💡): Kết quả tính toán thuần túy từ công thức
2. **Liều thực tế** (✅): Liều có thể áp dụng trong lâm sàng

---

## 📊 Ví dụ cụ thể

### Input
- Cơ quan: Thủy tinh thể
- Liều chuẩn: 10 Gy @ 2 Gy/fx
- α/β: 2.0 Gy
- Liều/fx mới: 3.0 Gy

### Kết quả

#### 💡 Liều lý thuyết: **8.00 Gy**
```
BED_standard = 10 × (1 + 2/2) = 20 Gy

D_theoretical = BED / (1 + d_new/α/β)
              = 20 / (1 + 3/2)
              = 20 / 2.5
              = 8.00 Gy

Số fx = 8.00 / 3.0 = 2.67 phân liều
```

**Vấn đề**: Không thể xạ 2.67 phân liều!

#### ✅ Liều thực tế: **6.00 Gy**
```
Số fx = floor(2.67) = 2 phân liều
D_practical = 2 × 3.0 = 6.00 Gy

BED_practical = 6.0 × (1 + 3/2) = 15.0 Gy
Margin = (20 - 15) / 20 × 100% = 25%
```

**Lợi ích**: An toàn hơn với margin 25%!

---

## 🔍 Phân tích chi tiết

### Tại sao phải làm tròn?

| Khía cạnh | Lý thuyết | Thực tế |
|-----------|-----------|---------|
| Số phân liều | 2.67 fx | 2 fx |
| Khả thi | ❌ Không thể | ✅ Có thể |
| Liều tổng | 8.00 Gy | 6.00 Gy |
| BED | 20.00 Gy | 15.00 Gy |
| Margin | 0% | 25% |
| An toàn | Vừa đủ | An toàn hơn |

### Tại sao làm tròn xuống?

**Làm tròn xuống** (floor) thay vì làm tròn lên (ceil) vì:

1. **An toàn hơn**: BED thực tế < BED chuẩn
2. **Tạo margin**: Dư địa an toàn cho bệnh nhân
3. **Nguyên tắc ALARA**: As Low As Reasonably Achievable

**Ví dụ so sánh**:
```
Làm tròn xuống (floor):
  2.67 → 2 fx → 6.0 Gy → BED 15 Gy ✅ An toàn

Làm tròn lên (ceil):
  2.67 → 3 fx → 9.0 Gy → BED 22.5 Gy ⚠️ Vượt quá!
```

---

## 📈 Các trường hợp khác

### Case 1: Số fx chia hết
**Input**: 45 Gy @ 2 Gy/fx, α/β = 2.0 → 3 Gy/fx

```
Lý thuyết: 36.00 Gy (12.00 fx)
Thực tế:   36.00 Gy (12 fx)
Margin:    0%
```

**Kết luận**: Khi chia hết, cả hai bằng nhau!

### Case 2: Số fx không chia hết
**Input**: 10 Gy @ 2 Gy/fx, α/β = 2.0 → 3 Gy/fx

```
Lý thuyết: 8.00 Gy (2.67 fx)
Thực tế:   6.00 Gy (2 fx)
Margin:    25%
```

**Kết luận**: Có sự khác biệt đáng kể!

### Case 3: Liều/fx rất cao
**Input**: 10 Gy @ 2 Gy/fx, α/β = 1.0 → 5 Gy/fx

```
Lý thuyết: 5.00 Gy (1.00 fx)
Thực tế:   5.00 Gy (1 fx)
Margin:    0%
```

**Kết luận**: Chỉ 1 fx, không có sự khác biệt!

---

## 🎓 Ý nghĩa lâm sàng

### Khi nào dùng liều lý thuyết?

**Liều lý thuyết** (8 Gy) hữu ích để:
- ✅ Hiểu giới hạn tối đa tuyệt đối
- ✅ So sánh với các phác đồ khác
- ✅ Nghiên cứu và phân tích
- ✅ Tham khảo khi lập kế hoạch

**Không dùng để**: Áp dụng trực tiếp vào bệnh nhân

### Khi nào dùng liều thực tế?

**Liều thực tế** (6 Gy) là giá trị để:
- ✅ Áp dụng trong lâm sàng
- ✅ Nhập vào hệ thống TPS
- ✅ Đánh giá DVH
- ✅ Quyết định điều trị

**Luôn dùng**: Trong thực hành lâm sàng!

---

## 💡 Khuyến nghị

### Cho bác sĩ xạ trị

1. **Xem cả hai giá trị** để hiểu đầy đủ
2. **Dùng liều thực tế** khi lập kế hoạch
3. **Chú ý margin** - càng cao càng an toàn
4. **Giải thích cho bệnh nhân** nếu cần

### Cho vật lý xạ trị

1. **Kiểm tra cả hai** khi optimize
2. **Đảm bảo Dmax < liều thực tế**
3. **Margin ≥ 5%** là lý tưởng
4. **Document rõ ràng** trong báo cáo

### Cho sinh viên

1. **Hiểu sự khác biệt** giữa lý thuyết và thực tế
2. **Biết tại sao** phải làm tròn xuống
3. **Tính được cả hai** bằng tay
4. **Giải thích được** cho người khác

---

## 📝 Công thức tóm tắt

### Liều lý thuyết
```
D_theoretical = BED_standard / (1 + d_new/α/β)
```

### Liều thực tế
```
n_practical = floor(D_theoretical / d_new)
D_practical = n_practical × d_new
```

### Margin an toàn
```
BED_practical = D_practical × (1 + d_new/α/β)
Margin = (BED_standard - BED_practical) / BED_standard × 100%
```

---

## ✅ Checklist

Khi đánh giá kết quả, kiểm tra:

- [ ] Liều lý thuyết có hợp lý không?
- [ ] Liều thực tế < Liều lý thuyết?
- [ ] Margin ≥ 0%?
- [ ] BED thực tế ≤ BED chuẩn?
- [ ] Số fx là số nguyên?
- [ ] Giải thích có rõ ràng không?

---

## 🎯 Kết luận

**Cả hai giá trị đều quan trọng:**

- **Liều lý thuyết** (8 Gy): Giới hạn tối đa tuyệt đối
- **Liều thực tế** (6 Gy): Giá trị áp dụng lâm sàng

**Phần mềm hiển thị cả hai** để:
- ✅ Người dùng hiểu đầy đủ
- ✅ Tránh nhầm lẫn
- ✅ Ra quyết định chính xác
- ✅ Đảm bảo an toàn bệnh nhân

**Luôn nhớ**: Trong lâm sàng, dùng **liều thực tế**!
