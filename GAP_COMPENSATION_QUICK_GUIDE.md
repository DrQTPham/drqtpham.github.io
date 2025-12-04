# Hướng Dẫn Nhanh: Tính Bù Liều Khi Gián Đoạn Xạ Trị

## 🚀 Quy Trình 3 Bước

### Bước 1: Xác định loại u và tốc độ tái sinh (K)

| Loại U | K (Gy/day) | Ghi chú |
|--------|------------|---------|
| **HNSCC** (đầu cổ) | **0.7** | Chuẩn cho u biểu mô đầu cổ |
| **NSCLC** (phổi) | **0.6** | U phổi không tế bào nhỏ |
| **SCLC** (phổi) | **0.75** | U phổi tế bào nhỏ - nhanh hơn |
| **Esophagus** | **0.6** | U thực quản |
| **Cervix** | **0.6** | U cổ tử cung |
| **Bladder** | **0.6** | U bàng quang |
| **Rectum** | **0.6** | U trực tràng |
| **GBM** | **0.5** | U não ác tính |
| **Lymphoma** | **1.0** | ⚠️ Rất nhanh! |
| **Breast** | **0.15** | Rất chậm |
| **Prostate** | **≈0** | Không cần bù |

---

### Bước 2: Tính liều bù

```
D_comp = K × N_days
```

**Ví dụ:**
- U đầu cổ (K = 0.7)
- Gián đoạn 5 ngày
- **D_comp = 0.7 × 5 = 3.5 Gy**

---

### Bước 3: Chọn phương án bù

#### Phương án 1: Thêm phân liều ✅ (An toàn hơn)

```
Số fx thêm = ceil(D_comp / d_original)
```

**Ví dụ:** D_comp = 3.5 Gy, d = 2 Gy
- Thêm: ceil(3.5 / 2) = **2 phân liều**

#### Phương án 2: Tăng liều/fx ⚠️ (Tiện lợi hơn)

```
d_new = (D_remaining + D_comp) / fx_remaining
```

**Ví dụ:** Còn 15 fx, cần bù 3.5 Gy, còn 30 Gy
- d_new = (30 + 3.5) / 15 = **2.23 Gy/fx**

---

## ⚡ Quyết Định Nhanh

| Liều bù | Khuyến nghị |
|---------|-------------|
| **< 2 Gy** | Có thể bỏ qua hoặc bù nhẹ |
| **2-3 Gy** | Nên bù, chọn phương án 1 hoặc 2 |
| **3-5 Gy** | Bắt buộc bù, ưu tiên phương án 1 |
| **> 5 Gy** | ⚠️ HỘI CHẨN! Xem xét lại phác đồ |

---

## 🎯 Lưu Ý Đặc Biệt

### Khi KHÔNG cần bù liều:
- ❌ U tuyến tiền liệt (Prostate)
- ❌ U vú nếu gián đoạn < 7 ngày
- ❌ Gián đoạn trước Tk (kick-off time)
- ❌ Gián đoạn cuối tuần thông thường

### Khi BẮT BUỘC bù liều:
- ✅ U đầu cổ (HNSCC)
- ✅ U phổi (NSCLC, SCLC)
- ✅ U cổ tử cung (Cervix)
- ✅ U thực quản (Esophagus)
- ✅ Lymphoma (rất quan trọng!)

---

## 📊 Ví Dụ Thực Tế

### Case 1: U đầu cổ - Gián đoạn 4 ngày

**Input:**
- Phác đồ: 70 Gy / 35 fx (2 Gy/fx)
- Đã xạ: 20 fx
- Gián đoạn: 4 ngày
- K = 0.7 Gy/day

**Tính toán:**
- D_comp = 0.7 × 4 = **2.8 Gy**

**Phương án 1:** Thêm 2 fx
- Tổng: 37 fx × 2 Gy = **74 Gy**

**Phương án 2:** Tăng liều/fx
- Còn 15 fx, cần bù 2.8 Gy
- d_new = (30 + 2.8) / 15 = **2.19 Gy/fx**
- Tổng: 40 + 32.85 = **72.85 Gy**

**Khuyến nghị:** Phương án 1 (an toàn hơn)

---

### Case 2: Lymphoma - Gián đoạn 3 ngày

**Input:**
- Phác đồ: 36 Gy / 18 fx (2 Gy/fx)
- Đã xạ: 10 fx
- Gián đoạn: 3 ngày
- K = 1.0 Gy/day ⚠️

**Tính toán:**
- D_comp = 1.0 × 3 = **3.0 Gy** (cao!)

**Phương án 1:** Thêm 2 fx
- Tổng: 20 fx × 2 Gy = **40 Gy**

**Phương án 2:** Tăng liều/fx
- Còn 8 fx, cần bù 3.0 Gy
- d_new = (16 + 3) / 8 = **2.38 Gy/fx**

**Khuyến nghị:** Phương án 1 (Lymphoma rất nhạy với gián đoạn!)

---

### Case 3: U vú - Gián đoạn 5 ngày

**Input:**
- Phác đồ: 50 Gy / 25 fx (2 Gy/fx)
- Đã xạ: 15 fx
- Gián đoạn: 5 ngày
- K = 0.15 Gy/day

**Tính toán:**
- D_comp = 0.15 × 5 = **0.75 Gy** (thấp)

**Khuyến nghị:** Có thể bỏ qua hoặc thêm 1 fx nếu muốn chắc chắn

---

## 🔧 Sử Dụng Công Cụ

1. Mở **EQD2 & BED Calculator**
2. Chọn phần **"Tính bù liều khi gián đoạn xạ trị"**
3. Chọn loại u từ dropdown (tự động điền K)
4. Nhập số ngày gián đoạn
5. Nhập thông tin phác đồ gốc
6. Click **"Tính liều bù"**
7. Xem 2 phương án và chọn phù hợp

---

## 📚 Tài Liệu Chi Tiết

Xem file **GAP_COMPENSATION_THEORY.md** để:
- Hiểu rõ lý thuyết đằng sau công thức
- Xem bảng đầy đủ α/β, Tk, Tp cho tất cả loại u
- Đọc thêm ví dụ lâm sàng chi tiết
- Tham khảo y văn và nghiên cứu

---

## ⚠️ Disclaimer

Công cụ này chỉ mang tính chất tham khảo. Quyết định cuối cùng về bù liều cần dựa trên:
- Đánh giá lâm sàng tổng thể
- Tình trạng bệnh nhân
- Khả năng chịu đựng điều trị
- Hội chẩn với đồng nghiệp
- Tham khảo y văn cập nhật

---

**© 2025 EQD2 & BED Calculator**  
**Phát triển bởi Dr. Q.T. Phạm**  
📧 qtphamhus@gmail.com
