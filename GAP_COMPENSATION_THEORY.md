# Lý Thuyết Tính Bù Liều Khi Gián Đoạn Xạ Trị

## 📚 Tổng Quan

Khi xạ trị bị gián đoạn, tế bào u có thể tái sinh (repopulation), làm giảm hiệu quả điều trị. Cần tính toán liều bù để duy trì hiệu quả sinh học tương đương.

---

## 1. Các Thông Số Cốt Lõi

### 1.1. α/β của Khối U

Tỷ lệ α/β phản ánh độ nhạy cảm với phân liều của khối u.

| Loại U | α/β (Gy) | Ghi chú |
|--------|----------|---------|
| **HNSCC** (đầu cổ) | ~10 Gy | Head & Neck Squamous Cell Carcinoma |
| **NSCLC** (phổi không tế bào nhỏ) | ~10–15 Gy | Non-Small Cell Lung Cancer |
| **SCLC** (phổi tế bào nhỏ) | ~8–10 Gy | Small Cell Lung Cancer |
| **Esophagus** (thực quản) | ~10 Gy | Esophageal Cancer |
| **Cervix** (cổ tử cung) | ~10 Gy | Cervical Cancer |
| **Bladder** (bàng quang) | ~10 Gy | Bladder Tumor |
| **Rectum** (trực tràng) | ~10 Gy | Rectal Cancer |
| **Prostate** (tuyến tiền liệt) | 1.5 Gy | Đặc biệt thấp |
| **GBM** (glioblastoma) | ~8–10 Gy | Glioblastoma Multiforme |
| **Lymphoma** | ~8–10 Gy | Lymphoma |
| **Breast** (vú) | ~3–4 Gy | Breast Tumor |

---

### 1.2. Thời Điểm Bắt Đầu Tăng Sinh Lại (Kick-off Time, Tk)

Thời gian từ khi bắt đầu xạ trị đến khi tế bào u bắt đầu tái sinh nhanh.

| Loại U | Tk (ngày) | Ghi chú |
|--------|-----------|---------|
| **HNSCC** | 21–28 ngày | Thường dùng 21 ngày |
| **NSCLC** | 21–28 ngày | Thường dùng 21 ngày |
| **Cervix** | 20–25 ngày | Thường dùng 20 ngày |
| **Esophagus** | 20–25 ngày | Thường dùng 20 ngày |
| **Brain tumors (GBM)** | ~21 ngày | Glioblastoma |
| **Lymphoma** | ~10–14 ngày | Rất nhanh |
| **Breast** | >30 ngày | Rất chậm |
| **Prostate** | N/A | Không coi là repopulation trong lâm sàng |

**💡 Ý nghĩa lâm sàng:** Nếu gián đoạn xảy ra **TRƯỚC Tk**, không cần bù liều. Chỉ tính bù cho số ngày **SAU Tk**.

---

### 1.3. Thời Gian Nhân Đôi Trong Điều Trị (Tp)

Thời gian để số lượng tế bào u tăng gấp đôi trong giai đoạn tái sinh nhanh (accelerated repopulation).

| Loại U | Tp (ngày) | Ghi chú |
|--------|-----------|---------|
| **HNSCC** | 2–4 ngày | Thường dùng 3 ngày |
| **NSCLC** | 3–5 ngày | Thường dùng 4 ngày |
| **Cervix** | 3–4 ngày | Thường dùng 3.5 ngày |
| **Esophagus** | 3–4 ngày | Thường dùng 3.5 ngày |
| **GBM** | 3–5 ngày | Thường dùng 4 ngày |
| **Lymphoma** | 1–3 ngày | Rất nhanh, dùng 2 ngày |
| **Breast** | >7–10 ngày | Rất chậm |
| **Prostate** | N/A | Không dùng (repopulation rất chậm) |

---

### 1.4. Hệ Số Chuyển Đổi α (Gy⁻¹)

Để tính mất liều sinh học do tái sinh:

```
K = (ln 2) / (α × Tp)
```

Thông thường dùng:

| Loại U | α (Gy⁻¹) | Ghi chú |
|--------|----------|---------|
| **U biểu mô** (HNSCC, esophagus, cervix) | 0.3 Gy⁻¹ | Epithelial tumors |
| **NSCLC** | 0.3 Gy⁻¹ | Non-Small Cell Lung |
| **SCLC** | 0.35 Gy⁻¹ | Small Cell Lung |
| **Breast** | 0.25 Gy⁻¹ | Breast tumor |
| **Prostate** | 0.15–0.2 Gy⁻¹ | Prostate tumor |
| **GBM** | 0.3 Gy⁻¹ | Glioblastoma |

---

## 2. Mất Liều Sinh Học Mỗi Ngày (Gy/day)

**Đây là bảng quan trọng nhất để dùng trực tiếp trong lâm sàng!**

| Loại U | Mất liều mỗi ngày (sau Tk) | Ghi chú |
|--------|----------------------------|---------|
| **HNSCC** | **0.6–0.8 Gy/day** (chuẩn: 0.7) | Head & Neck |
| **NSCLC** | **0.5–0.7 Gy/day** (chuẩn: 0.6) | Non-Small Cell Lung |
| **SCLC** | **0.7–0.8 Gy/day** (chuẩn: 0.75) | Small Cell Lung |
| **Esophagus** | **0.5–0.7 Gy/day** (chuẩn: 0.6) | Esophageal Cancer |
| **Cervix** | **0.6 Gy/day** | Cervical Cancer |
| **Bladder** | **0.5–0.7 Gy/day** (chuẩn: 0.6) | Bladder Tumor |
| **Rectum** | **0.5–0.7 Gy/day** (chuẩn: 0.6) | Rectal Cancer |
| **GBM** | **~0.4–0.6 Gy/day** (chuẩn: 0.5) | Glioblastoma |
| **Lymphoma** | **0.8–1.0 Gy/day** (chuẩn: 1.0) | Rất nhanh! |
| **Breast** | **~0.1–0.2 Gy/day** (chuẩn: 0.15) | Rất chậm |
| **Prostate** | **≈0 Gy/day** | Bỏ qua trong lâm sàng |

---

## 3. Công Thức Tính Bù Liều

### 3.1. Công Thức Đầy Đủ (Nếu OTT > Tk)

**Mất BED:**
```
BED_loss = (ln 2 / α) × (OTT - Tk) / Tp
```

**Qui đổi về liều:**
```
D_comp = BED_loss / (1 + d / (α/β))
```

Trong đó:
- `d` = liều mỗi phân liều gốc
- `α/β` = theo loại u
- `OTT` = Overall Treatment Time (tổng thời gian điều trị)
- `Tk` = Kick-off time
- `Tp` = Doubling time

---

### 3.2. Công Thức Ngắn Gọn Lâm Sàng

```
D_comp = K × N_days_delay
```

với:
- `K` = mất liều mỗi ngày (bảng trên)
- `N` = số ngày gián đoạn vượt Tk

**Ví dụ:**
- U đầu cổ (HNSCC), K = 0.7 Gy/day
- Ngừng 4 ngày → Bù liều: **0.7 × 4 = 2.8 Gy**

---

## 4. Bảng Tổng Hợp (SOP Làm Việc)

| Tumor | α/β | Tk | Tp | K (Gy/day) |
|-------|-----|----|----|------------|
| **HNSCC** | 10 | 21–28 | 2–4 | **0.7** |
| **NSCLC** | 10–15 | 21–28 | 3–5 | **0.6** |
| **SCLC** | 8–10 | 18–21 | 2–3 | **0.7–0.8** |
| **Esophagus** | 10 | 20–25 | 3–4 | **0.6** |
| **Cervix** | 10 | 20–25 | 3–4 | **0.6** |
| **GBM** | 8–10 | 21 | 3–5 | **0.5** |
| **Lymphoma** | 8–10 | 10–14 | 1–3 | **1.0** |
| **Breast** | 3–4 | >30 | >7 | **0.15** |
| **Prostate** | 1.5 | N/A | Slow | **≈0** |

---

## 5. Phương Án Bù Liều

### Phương án 1: Thêm Phân Liều (Giữ nguyên liều/fx)

**Ưu điểm:**
- An toàn hơn cho cơ quan lành
- Không tăng độc tính cấp
- Dễ lập kế hoạch

**Nhược điểm:**
- Kéo dài thời gian điều trị
- Tăng chi phí
- Bất tiện cho bệnh nhân

**Công thức:**
```
Số fx cần thêm = ceil(D_comp / d_original)
Tổng fx mới = fx_original + fx_thêm
```

---

### Phương án 2: Tăng Liều/fx (Giữ nguyên số fx)

**Ưu điểm:**
- Không kéo dài thời gian
- Tiện lợi cho bệnh nhân
- Không tăng chi phí

**Nhược điểm:**
- Tăng độc tính cấp
- Có thể tăng độc tính muộn
- Cần cân nhắc kỹ với cơ quan lành

**Công thức:**
```
d_new = (D_remaining + D_comp) / fx_remaining
```

**⚠️ Lưu ý:** Nếu `d_new > 3.0 Gy`, cần cân nhắc kỹ độc tính!

---

## 6. Lưu Ý Lâm Sàng Quan Trọng

### 6.1. Khi Nào Cần Bù Liều?

✅ **CẦN bù liều:**
- U biểu mô (HNSCC, NSCLC, cervix, esophagus)
- Gián đoạn > 3 ngày
- Đã qua thời điểm Tk

❌ **KHÔNG cần bù liều:**
- U tuyến tiền liệt (prostate)
- U vú (thường không cần nếu gián đoạn < 1 tuần)
- Gián đoạn trước Tk
- Gián đoạn cuối tuần thông thường (đã tính trong phác đồ)

---

### 6.2. Giới Hạn An Toàn

| Tình huống | Khuyến nghị |
|------------|-------------|
| **D_comp < 2 Gy** | Có thể bỏ qua hoặc bù nhẹ |
| **D_comp 2-5 Gy** | Nên bù liều, chọn phương án phù hợp |
| **D_comp > 5 Gy** | ⚠️ CẢNH BÁO! Cần hội chẩn, xem xét lại phác đồ |
| **d_new > 3.0 Gy** | ⚠️ Cẩn thận độc tính cấp và muộn |

---

### 6.3. Các Trường Hợp Đặc Biệt

**1. Gián đoạn nhiều lần:**
```
D_comp_total = K × (N1 + N2 + N3 + ...)
```

**2. Gián đoạn trước Tk:**
- Chỉ tính số ngày SAU Tk
- Ví dụ: Tk = 21 ngày, gián đoạn ngày 15-20 → Không bù
- Gián đoạn ngày 25-30 → Bù 5 ngày

**3. Điều trị đồng thời hóa-xạ:**
- Có thể giảm tốc độ tái sinh
- Cân nhắc giảm K xuống 70-80% giá trị chuẩn

---

## 7. Ví Dụ Lâm Sàng

### Ví dụ 1: U đầu cổ (HNSCC)

**Tình huống:**
- Phác đồ: 70 Gy / 35 fx (2 Gy/fx)
- Đã xạ: 20 fx (40 Gy)
- Gián đoạn: 7 ngày (do COVID-19)
- Tk = 21 ngày, K = 0.7 Gy/day

**Tính toán:**
- Đã qua Tk (20 fx × 5 ngày/tuần ≈ 28 ngày > 21 ngày)
- D_comp = 0.7 × 7 = **4.9 Gy**

**Phương án 1:** Thêm 3 fx (4.9 / 2 ≈ 2.5 → làm tròn lên 3)
- Tổng: 38 fx × 2 Gy = 76 Gy

**Phương án 2:** Tăng liều/fx còn lại
- Còn lại: 15 fx
- d_new = (30 + 4.9) / 15 = **2.33 Gy/fx**
- Tổng: 40 + (15 × 2.33) = 74.9 Gy

---

### Ví dụ 2: U phổi NSCLC

**Tình huống:**
- Phác đồ: 60 Gy / 30 fx (2 Gy/fx)
- Đã xạ: 15 fx (30 Gy)
- Gián đoạn: 5 ngày
- Tk = 21 ngày, K = 0.6 Gy/day

**Tính toán:**
- Đã qua Tk (15 fx ≈ 21 ngày)
- D_comp = 0.6 × 5 = **3.0 Gy**

**Phương án 1:** Thêm 2 fx
- Tổng: 32 fx × 2 Gy = 64 Gy

**Phương án 2:** Tăng liều/fx
- Còn lại: 15 fx
- d_new = (30 + 3) / 15 = **2.2 Gy/fx**
- Tổng: 30 + (15 × 2.2) = 63 Gy

---

## 8. Tài Liệu Tham Khảo

1. **Withers HR et al.** "Treatment volume and tissue tolerance." Int J Radiat Oncol Biol Phys. 1988
2. **Fowler JF.** "The linear-quadratic formula and progress in fractionated radiotherapy." Br J Radiol. 1989
3. **Bese NS et al.** "Effects of prolongation of overall treatment time due to unplanned interruptions during radiotherapy of different tumor sites and practical methods for compensation." Int J Radiat Oncol Biol Phys. 2007
4. **QUANTEC** - Quantitative Analysis of Normal Tissue Effects in the Clinic
5. **PENTEC** - Pediatric Normal Tissue Effects in the Clinic

---

## 9. Công Cụ Tính Toán

Sử dụng công cụ **"Tính bù liều khi gián đoạn xạ trị"** trong ứng dụng EQD2 & BED Calculator để:
- Tự động tính toán liều bù
- So sánh 2 phương án bù liều
- Đánh giá an toàn và khả thi
- Xuất báo cáo cho hồ sơ bệnh án

---

**© 2025 EQD2 & BED Calculator**  
**Phát triển bởi Dr. Q.T. Phạm**  
📧 qtphamhus@gmail.com
