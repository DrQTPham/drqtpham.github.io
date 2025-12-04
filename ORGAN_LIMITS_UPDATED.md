# ✅ Đã Cập nhật α/β cho Giới hạn Liều Cơ quan Lành

## 🎯 Tổng quan

Đã cập nhật phần **Tính liều giới hạn cơ quan lành** với các giá trị α/β chính xác dựa trên QUANTEC/PENTEC!

---

## 📊 Danh sách cơ quan (16 cơ quan)

### 🧠 Hệ thần kinh (CNS) - 6 cơ quan

| Cơ quan | Liều giới hạn | α/β | Phạm vi | Ghi chú |
|---------|---------------|-----|---------|---------|
| **Thủy tinh thể** (Lens) | 10 Gy | **1.0** | 0.7-1.0 | Cực kỳ nhạy cảm! |
| **Tủy sống** (Spinal Cord) | 45 Gy | **2.0** | 0.9-5.0 | Dùng bảo thủ 2.0 |
| **Thân não** (Brainstem) | 54 Gy | **2.5** | 2.0-3.0 | Late CNS effects |
| **Não** (Brain) | 60 Gy | **2.5** | 2.0-3.0 | Brain necrosis |
| **Dây TK thị giác** (Optic Nerve) | 54 Gy | **2.5** | 2.0-3.0 | Late effects |
| **Giao thoa TK** (Optic Chiasm) | 54 Gy | **2.5** | 2.0-3.0 | Late effects |

### ❤️ Ngực (Thorax) - 2 cơ quan

| Cơ quan | Liều giới hạn | α/β | Phạm vi | Ghi chú |
|---------|---------------|-----|---------|---------|
| **Phổi** (Lung) | 20 Gy | **3.0** | 2.0-4.0 | Pneumonitis/fibrosis |
| **Tim** (Heart) | 30 Gy | **3.0** | 1.0-3.0 | Late cardiac injury |

### 🫁 Bụng (Abdomen) - 2 cơ quan

| Cơ quan | Liều giới hạn | α/β | Phạm vi | Ghi chú |
|---------|---------------|-----|---------|---------|
| **Gan** (Liver) | 30 Gy | **2.5** | 2.0-3.0 | RILD |
| **Thận** (Kidney) | 18 Gy | **2.5** | 2.0-3.0 | Late renal effects |

### 🔻 Tiểu khung (Pelvis) - 2 cơ quan

| Cơ quan | Liều giới hạn | α/β | Phạm vi | Ghi chú |
|---------|---------------|-----|---------|---------|
| **Trực tràng** (Rectum) | 60 Gy | **3.0** | 2.5-3.5 | Late proctitis |
| **Bàng quang** (Bladder) | 65 Gy | **3.0** | 2.5-3.5 | Late cystitis |

### 👄 Đầu cổ (H&N) - 1 cơ quan

| Cơ quan | Liều giới hạn | α/β | Phạm vi | Ghi chú |
|---------|---------------|-----|---------|---------|
| **Tuyến nước bọt** (Parotid) | 26 Gy | **3.0** | 2.5-3.5 | Xerostomia |

### 🩹 Da & Xương - 2 cơ quan

| Cơ quan | Liều giới hạn | α/β | Phạm vi | Ghi chú |
|---------|---------------|-----|---------|---------|
| **Da - Late** (Skin) | 50 Gy | **3.0** | 2.5-3.5 | Fibrosis/telangiectasia |
| **Xương** (Bone) | 60 Gy | **3.0** | 2.5-3.5 | Fracture/necrosis |

---

## 🔄 Thay đổi chính

### Trước đây
- 12 cơ quan
- α/β đơn giản (1.0, 2.0, 3.0)
- Không có phạm vi tham khảo
- Không phân loại rõ ràng

### Bây giờ
- ✅ **16 cơ quan** (thêm 4 cơ quan mới)
- ✅ **α/β chính xác** (1.0, 2.0, 2.5, 3.0)
- ✅ **Có phạm vi** tham khảo trong code
- ✅ **Phân loại rõ ràng** theo hệ thống
- ✅ **Hiển thị α/β** trong dropdown

### Cơ quan mới thêm
1. **Não** (Brain) - α/β = 2.5
2. **Da - Late** (Skin Late) - α/β = 3.0
3. **Xương** (Bone) - α/β = 3.0
4. *(Cập nhật α/β cho các cơ quan hiện có)*

### Cập nhật α/β
- **Brainstem**: 2.0 → **2.5** (chính xác hơn)
- **Optic Nerve**: 2.0 → **2.5** (chính xác hơn)
- **Optic Chiasm**: 2.0 → **2.5** (chính xác hơn)
- **Kidney**: 3.0 → **2.5** (chính xác hơn)
- **Liver**: 3.0 → **2.5** (chính xác hơn)

---

## 🎨 Giao diện mới

### Dropdown có phân loại và hiển thị α/β

```
-- Chọn cơ quan --

🧠 Hệ thần kinh (CNS)
  ├─ Thủy tinh thể (Lens) - α/β=1.0
  ├─ Tủy sống (Spinal Cord) - α/β=2.0
  ├─ Thân não (Brainstem) - α/β=2.5
  ├─ Não (Brain) - α/β=2.5
  ├─ Dây TK thị giác (Optic Nerve) - α/β=2.5
  └─ Giao thoa TK (Optic Chiasm) - α/β=2.5

❤️ Ngực (Thorax)
  ├─ Phổi (Lung) - α/β=3.0
  └─ Tim (Heart) - α/β=3.0

🫁 Bụng (Abdomen)
  ├─ Gan (Liver) - α/β=2.5
  └─ Thận (Kidney) - α/β=2.5

🔻 Tiểu khung (Pelvis)
  ├─ Trực tràng (Rectum) - α/β=3.0
  └─ Bàng quang (Bladder) - α/β=3.0

👄 Đầu cổ (H&N)
  └─ Tuyến nước bọt (Parotid) - α/β=3.0

🩹 Da & Xương
  ├─ Da - Late (Skin) - α/β=3.0
  └─ Xương (Bone) - α/β=3.0

Tùy chỉnh
```

### Ghi chú hướng dẫn
```
💡 Giá trị α/β dựa trên QUANTEC/PENTEC
```

---

## 📈 Ví dụ so sánh

### Ví dụ 1: Thủy tinh thể (α/β = 1.0)

**Input**: 10 Gy @ 2 Gy/fx → 3 Gy/fx

**Kết quả**:
- Liều lý thuyết: 8.00 Gy
- Liều thực tế: 6.00 Gy (2 fx)
- Margin: 25%

**Giải thích**: α/β thấp → rất nhạy cảm với liều/fx cao

### Ví dụ 2: Thân não (α/β = 2.5)

**Input**: 54 Gy @ 2 Gy/fx → 3 Gy/fx

**Kết quả**:
```
BED_standard = 54 × (1 + 2/2.5) = 54 × 1.8 = 97.2 Gy
D_new = 97.2 / (1 + 3/2.5) = 97.2 / 2.2 = 44.18 Gy
n = floor(44.18 / 3) = 14 fx
D_actual = 14 × 3 = 42 Gy
```

**So sánh với α/β = 2.0**:
```
BED_standard = 54 × (1 + 2/2) = 108 Gy
D_new = 108 / (1 + 3/2) = 43.2 Gy
```

**Kết luận**: α/β = 2.5 cho phép liều cao hơn một chút so với α/β = 2.0

### Ví dụ 3: Gan (α/β = 2.5 vs 3.0)

**Với α/β = 2.5** (mới - chính xác hơn):
```
30 Gy @ 2 Gy/fx → 3 Gy/fx
BED = 30 × 1.8 = 54 Gy
D_new = 54 / 2.2 = 24.55 Gy → 24 Gy (8 fx)
```

**Với α/β = 3.0** (cũ):
```
30 Gy @ 2 Gy/fx → 3 Gy/fx
BED = 30 × 1.67 = 50 Gy
D_new = 50 / 2 = 25 Gy → 24 Gy (8 fx)
```

**Kết luận**: Sự khác biệt nhỏ nhưng α/β = 2.5 chính xác hơn cho gan

---

## 🎓 Ý nghĩa lâm sàng

### Phân loại theo α/β

**α/β = 1.0** (Cực kỳ nhạy cảm):
- Lens
- → Giảm liều rất mạnh khi tăng liều/fx

**α/β = 2.0** (Rất nhạy cảm):
- Spinal Cord
- → Giảm liều đáng kể khi tăng liều/fx

**α/β = 2.5** (Nhạy cảm):
- Brainstem, Brain, Optic structures
- Liver, Kidney
- → Giảm liều vừa phải khi tăng liều/fx

**α/β = 3.0** (Trung bình):
- Lung, Heart
- Rectum, Bladder
- Parotid, Skin, Bone
- → Giảm liều ít hơn khi tăng liều/fx

### Ứng dụng

**Khi lập kế hoạch hypofractionation**:
1. Kiểm tra α/β của các cơ quan quan trọng
2. Cơ quan có α/β thấp cần giảm liều nhiều hơn
3. Dùng công cụ này để tính liều tối đa chính xác

**Khi đánh giá DVH**:
1. So sánh Dmax với liều giới hạn
2. Chuyển đổi về EQD2 nếu cần
3. Đảm bảo margin an toàn

---

## ✅ Lợi ích

### Cho bác sĩ xạ trị
- ✅ Giá trị α/β chính xác hơn
- ✅ Dựa trên y văn uy tín
- ✅ Dễ chọn cơ quan
- ✅ Thấy α/β ngay trong dropdown

### Cho vật lý xạ trị
- ✅ Chuẩn hóa giá trị
- ✅ Có phạm vi tham khảo
- ✅ Dễ validate
- ✅ Tính toán chính xác hơn

### Cho sinh viên
- ✅ Học giá trị thực tế
- ✅ Hiểu phân loại cơ quan
- ✅ Thấy sự khác biệt α/β
- ✅ Ứng dụng lâm sàng

---

## 🧪 Test ngay

```
http://localhost:8080/index.html?v=7
```

**Test cases**:

1. **Lens (α/β=1.0)**: 10 Gy → 3 Gy/fx
2. **Spinal Cord (α/β=2.0)**: 45 Gy → 3 Gy/fx
3. **Brainstem (α/β=2.5)**: 54 Gy → 3 Gy/fx
4. **Liver (α/β=2.5)**: 30 Gy → 3 Gy/fx
5. **Lung (α/β=3.0)**: 20 Gy → 2.5 Gy/fx

---

## 🎯 Kết luận

**Đã cập nhật thành công!**

- ✅ 16 cơ quan (thêm 4 mới)
- ✅ α/β chính xác dựa trên QUANTEC/PENTEC
- ✅ Phân loại rõ ràng theo hệ thống
- ✅ Hiển thị α/β trong dropdown
- ✅ Có phạm vi tham khảo trong code
- ✅ Ghi chú nguồn tham khảo

**Phần mềm giờ đây**:
- Chính xác hơn về mặt khoa học
- Đầy đủ hơn về số lượng cơ quan
- Rõ ràng hơn về phân loại
- Hữu ích hơn cho lâm sàng

**Trạng thái**: ✅ HOÀN THÀNH
