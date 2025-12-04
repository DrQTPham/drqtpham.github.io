# 👁️ Thông tin về Thủy tinh thể (Lens) trong Xạ trị

## 📋 Thông tin cơ bản

### Đặc điểm
- **Tên tiếng Anh**: Lens / Crystalline Lens
- **Vị trí**: Trong nhãn cầu, sau mống mắt
- **Chức năng**: Điều tiết ánh sáng, tạo hình ảnh trên võng mạc
- **Độc tính xạ trị**: Đục thủy tinh thể (Cataract)

### Thông số xạ trị
- **Liều giới hạn chuẩn (2 Gy/fx)**: 10 Gy
- **α/β**: 1.0 Gy (rất thấp - cực kỳ nhạy cảm!)
- **Thời gian xuất hiện độc tính**: 6 tháng - 5 năm

---

## ⚠️ Tại sao Lens rất nhạy cảm?

### 1. α/β rất thấp (1.0 Gy)
Lens có α/β = 1.0 Gy, thấp nhất trong các cơ quan:
- Lens: α/β = 1.0 Gy ⭐ Cực kỳ nhạy cảm
- Tủy sống: α/β = 2.0 Gy
- Thần kinh: α/β = 2.0-3.0 Gy
- Phổi/Tim: α/β = 3.0 Gy

**Ý nghĩa**: Lens RẤT NHẠY CẢM với liều/phân liều cao!

### 2. Liều giới hạn thấp (10 Gy)
So với các cơ quan khác:
- Lens: 10 Gy ⭐ Rất thấp
- Thận: 18 Gy
- Phổi: 20 Gy
- Tủy sống: 45 Gy
- Thân não: 54 Gy

---

## 📊 Bảng tính toán với các liều/fx khác nhau

| Liều/fx | Liều tối đa | Số fx | BED | Giảm so với chuẩn | Ghi chú |
|---------|-------------|-------|-----|-------------------|---------|
| 2.0 Gy | 10.0 Gy | 5 | 30 Gy | 0% | Chuẩn ✅ |
| 2.5 Gy | 7.5 Gy | 3 | 26.25 Gy | -25% | Giảm đáng kể ⚠️ |
| 3.0 Gy | 6.0 Gy | 2 | 24 Gy | -40% | Giảm mạnh ⚠️⚠️ |
| 4.0 Gy | 4.0 Gy | 1 | 20 Gy | -60% | Giảm rất mạnh ⚠️⚠️⚠️ |
| 5.0 Gy | 5.0 Gy | 1 | 30 Gy | -50% | Chỉ 1 fx! ⚠️⚠️⚠️ |

### Nhận xét
- **2.5 Gy/fx**: Giảm 25% → Chỉ còn 7.5 Gy
- **3.0 Gy/fx**: Giảm 40% → Chỉ còn 6.0 Gy (2 fx)
- **4.0 Gy/fx**: Giảm 60% → Chỉ còn 4.0 Gy (1 fx!)

---

## 🔬 So sánh với Tủy sống

### Test với 3.0 Gy/fx

**Lens (α/β = 1.0)**:
- Chuẩn: 10 Gy @ 2 Gy/fx
- Mới: 6.0 Gy @ 3 Gy/fx (2 fx)
- Giảm: 40%

**Tủy sống (α/β = 2.0)**:
- Chuẩn: 45 Gy @ 2 Gy/fx
- Mới: 36.0 Gy @ 3 Gy/fx (12 fx)
- Giảm: 20%

**Kết luận**: Lens nhạy cảm gấp **2 lần** tủy sống!

---

## 🎯 Ứng dụng lâm sàng

### 1. Xạ trị u não
**Vấn đề**: Lens thường nằm trong vùng liều thấp
**Giải pháp**:
- Dùng IMRT/VMAT để giảm liều lens
- Nếu dùng hypofractionation (3-5 Gy/fx), cần giảm liều lens xuống rất nhiều
- Ví dụ: 3 Gy/fx → lens chỉ được 6 Gy thay vì 10 Gy

### 2. Xạ trị u hốc mắt
**Vấn đề**: Lens rất gần u
**Giải pháp**:
- Cân nhắc kỹ giữa kiểm soát u và bảo vệ lens
- Có thể chấp nhận đục lens nếu cần thiết (có thể phẫu thuật sau)
- Thông báo rõ cho bệnh nhân về nguy cơ

### 3. Xạ trị u vòm họng
**Vấn đề**: Lens có thể nhận liều từ scatter
**Giải pháp**:
- Dùng kỹ thuật IMRT
- Đặt block bảo vệ mắt nếu có thể
- Theo dõi thị lực sau xạ

---

## 📈 Công thức tính toán

### Bước 1: Tính BED chuẩn
```
BED_standard = 10 × (1 + 2/1) = 10 × 3 = 30 Gy
```

### Bước 2: Tính liều tối đa với fx mới
Ví dụ: 3 Gy/fx
```
D_new = 30 / (1 + 3/1) = 30 / 4 = 7.5 Gy
n_new = floor(7.5 / 3) = 2 fx
D_actual = 2 × 3 = 6 Gy
```

### Bước 3: Kiểm tra BED
```
BED_actual = 6 × (1 + 3/1) = 6 × 4 = 24 Gy
Margin = (30 - 24) / 30 × 100% = 20%
```

---

## ⚠️ Lưu ý quan trọng

### 1. Độc tính
- **Đục lens (Cataract)**: Mất dần thị lực
- **Thời gian**: 6 tháng - 5 năm sau xạ
- **Điều trị**: Phẫu thuật thay thủy tinh thể nhân tạo

### 2. Liều ngưỡng
- **< 10 Gy**: Nguy cơ thấp
- **10-15 Gy**: Nguy cơ trung bình
- **> 15 Gy**: Nguy cơ cao (gần như chắc chắn đục)

### 3. Yếu tố ảnh hưởng
- Tuổi (người già nhạy cảm hơn)
- Đái tháo đường (tăng nguy cơ)
- Hóa trị kết hợp (tăng độc tính)
- Liều/phân liều (cao = nguy cơ cao)

---

## 📚 Tài liệu tham khảo

1. **QUANTEC** - Marks LB et al. Use of normal tissue complication probability models in the clinic. Int J Radiat Oncol Biol Phys. 2010.

2. **Emami B et al**. Tolerance of normal tissue to therapeutic irradiation. Int J Radiat Oncol Biol Phys. 1991.

3. **Merriam GR, Worgul BV**. Experimental radiation cataract--its clinical relevance. Bull N Y Acad Med. 1983.

4. **Nakissa N et al**. Lens and cataract. Radiat Oncol. 2011.

---

## ✅ Khuyến nghị

### Khi lập kế hoạch xạ trị vùng đầu cổ:

1. **Luôn đánh giá liều lens**
   - Xem DVH (Dose-Volume Histogram)
   - Kiểm tra Dmax lens

2. **Ưu tiên bảo vệ lens**
   - Dùng IMRT/VMAT
   - Tối ưu góc chiếu
   - Đặt block nếu cần

3. **Cân nhắc kỹ khi dùng hypofractionation**
   - Lens rất nhạy cảm với liều/fx cao
   - Có thể cần giảm liều tổng đáng kể
   - Thông báo rõ cho bệnh nhân

4. **Theo dõi sau xạ**
   - Khám mắt định kỳ
   - Phát hiện sớm đục lens
   - Tư vấn phẫu thuật nếu cần

---

## 🎓 Kết luận

**Lens là cơ quan CỰC KỲ NHẠY CẢM với xạ trị!**

- ✅ α/β = 1.0 Gy (thấp nhất)
- ✅ Liều giới hạn chỉ 10 Gy
- ✅ Rất nhạy cảm với liều/fx cao
- ✅ Cần ưu tiên bảo vệ trong xạ trị đầu cổ

**Công cụ tính toán này giúp bạn:**
- Tính liều tối đa cho lens với các phân liều khác nhau
- Đánh giá margin an toàn
- Ra quyết định lâm sàng chính xác hơn

**Nhớ**: Đây là công cụ hỗ trợ. Quyết định cuối cùng cần dựa trên đánh giá lâm sàng tổng thể!
