# 📊 Bảng Tham Khảo α/β

## 🎯 Giới thiệu

Bảng này tổng hợp các giá trị α/β được đề xuất cho các loại mô và u khác nhau, dựa trên:
- **QUANTEC** (Quantitative Analysis of Normal Tissue Effects in the Clinic)
- **PENTEC** (Pediatric Normal Tissue Effects in the Clinic)
- Các nghiên cứu lâm sàng được công bố

---

## 📋 Bảng Tham Khảo Đầy Đủ

### 🎯 TUMOR (U)

| Loại U | α/β (Gy) | Phạm vi | Ghi chú | Tài liệu |
|--------|----------|---------|---------|----------|
| **U tuyến tiền liệt** (Prostate) | **1.5** | 0.8-3.0 | Low α/β → ưu tiên hypofractionation | SpringerLink |
| **U vú** (Breast) | **3.5** | 2.0-5.0 | Nhiều phân tích cho ~3-4 Gy | Spandidos |
| **U đầu cổ** (Head & Neck) | **10** | 8-12 | Carcinoma rắn thường dùng 10 Gy | SpringerLink |
| **U phổi NSCLC** | **12** | 10-15 | Dữ liệu SBRT gợi ý 10-16 Gy | PubMed |

### 🧠 HỆ THẦN KINH (Late Effects)

| Cơ quan | α/β (Gy) | Phạm vi | Ghi chú | Tài liệu |
|---------|----------|---------|---------|----------|
| **Tủy sống** (Spinal Cord) | **2.0** | 0.9-5.0 | Dùng giá trị bảo thủ 2 Gy cho EQD2 | redjournal.org |
| **Não** (Brain Necrosis) | **2.5** | 2.0-3.0 | Late reacting CNS tissues → low α/β | QUANTEC/PENTEC |
| **Dây TK thị giác** (Optic Nerve/Chiasm) | **2.5** | 2.0-3.0 | Tương tự brainstem, dùng bảo thủ 2-3 | PMC |
| **Thủy tinh thể** (Lens) | **1.0** | 0.7-1.0 | Cataract là mô muộn, α/β rất thấp | PubMed |

### ❤️ TIM PHỔI THẬN GAN

| Cơ quan | α/β (Gy) | Phạm vi | Ghi chú | Tài liệu |
|---------|----------|---------|---------|----------|
| **Tim** (Heart) | **3.0** | 1.0-3.0 | Late cardiac injury, dùng 3 bảo thủ | redjournal.org |
| **Phổi** (Lung) | **3.0** | 2.0-4.0 | Pneumonitis/fibrosis, thường dùng 3 | redjournal.org |
| **Thận** (Kidney) | **2.5** | 2.0-3.0 | Late renal endpoints | jnm.snmjournals |
| **Gan** (Liver) | **2.5** | 2.0-3.0 | RILD (Radiation-Induced Liver Disease) | QUANTEC/PMC |

### 🔻 TIỂU KHUNG

| Cơ quan | α/β (Gy) | Phạm vi | Ghi chú | Tài liệu |
|---------|----------|---------|---------|----------|
| **Trực tràng** (Rectum) | **3.0** | 2.5-3.5 | Late proctitis/fibrosis | redjournal.org |
| **Bàng quang** (Bladder) | **3.0** | 2.5-3.5 | Late cystitis/stricture | PMC |

### 🩹 DA XƯƠNG TỦY

| Mô | α/β (Gy) | Phạm vi | Ghi chú | Tài liệu |
|----|----------|---------|---------|----------|
| **Da (Acute)** | **10** | 8-10 | Erythema - early responding | ScienceDirect |
| **Da (Late)** | **3.0** | 2.5-3.5 | Fibrosis/telangiectasia | PMC |
| **Xương** (Bone) | **3.0** | 2.5-3.5 | Late fracture/necrosis | PMC |
| **Tủy xương** (Bone Marrow) | **10** | 8-12 | Acute hematopoietic effects | ScienceDirect |

---

## 🎓 Nguyên tắc sử dụng

### 1. Phân biệt Early vs Late Effects

**Early responding tissues** (α/β cao ~10 Gy):
- ✅ U (tumor)
- ✅ Da cấp (acute skin)
- ✅ Niêm mạc (mucosa)
- ✅ Tủy xương (bone marrow)

**Late responding tissues** (α/β thấp ~2-3 Gy):
- ✅ Tủy sống (spinal cord)
- ✅ Não (brain)
- ✅ Tim phổi thận gan
- ✅ Da muộn (late skin)

### 2. Ý nghĩa lâm sàng

**α/β thấp (1-3 Gy)**:
- Rất nhạy cảm với liều/fx cao
- Hypofractionation có thể tăng độc tính
- Cần thận trọng khi tăng liều/fx

**α/β cao (8-12 Gy)**:
- Ít nhạy cảm với liều/fx cao
- Hypofractionation có thể có lợi
- Ví dụ: U prostate (α/β=1.5) vs U đầu cổ (α/β=10)

### 3. Khi nào dùng giá trị nào?

**Dùng giá trị thấp (bảo thủ)** khi:
- ✅ Cơ quan quan trọng (tủy sống, não)
- ✅ Không chắc chắn về α/β
- ✅ Muốn an toàn hơn

**Dùng giá trị cao** khi:
- ✅ Có dữ liệu cụ thể
- ✅ Tính toán cho u
- ✅ Hypofractionation

---

## 📊 Ví dụ ứng dụng

### Ví dụ 1: U tuyến tiền liệt (α/β = 1.5)

**Phác đồ chuẩn**: 78 Gy / 39 fx (2 Gy/fx)
```
BED = 78 × (1 + 2/1.5) = 78 × 2.33 = 182 Gy
```

**Hypofractionation**: 60 Gy / 20 fx (3 Gy/fx)
```
BED = 60 × (1 + 3/1.5) = 60 × 3 = 180 Gy
```

**Kết luận**: BED tương đương! Hypofractionation có lợi cho u prostate.

### Ví dụ 2: U đầu cổ (α/β = 10)

**Phác đồ chuẩn**: 70 Gy / 35 fx (2 Gy/fx)
```
BED = 70 × (1 + 2/10) = 70 × 1.2 = 84 Gy
```

**Hypofractionation**: 60 Gy / 20 fx (3 Gy/fx)
```
BED = 60 × (1 + 3/10) = 60 × 1.3 = 78 Gy
```

**Kết luận**: BED giảm! Cần cân nhắc kỹ khi hypofractionation.

### Ví dụ 3: Tủy sống (α/β = 2)

**Giới hạn chuẩn**: 45 Gy / 23 fx (2 Gy/fx)
```
BED = 45 × (1 + 2/2) = 45 × 2 = 90 Gy
```

**Với 3 Gy/fx**: Liều tối đa?
```
D_max = 90 / (1 + 3/2) = 90 / 2.5 = 36 Gy
```

**Kết luận**: Giảm đáng kể! Tủy sống rất nhạy cảm với liều/fx cao.

---

## ⚠️ Lưu ý quan trọng

### 1. Giá trị α/β là ước lượng

- ❌ Không phải giá trị tuyệt đối
- ❌ Có biến động giữa các nghiên cứu
- ✅ Dùng làm tham khảo
- ✅ Cân nhắc phạm vi giá trị

### 2. Phụ thuộc endpoint

Cùng một cơ quan có thể có α/β khác nhau cho các endpoint khác nhau:
- Da: Acute erythema (α/β=10) vs Late fibrosis (α/β=3)
- Tim: Pericarditis vs Coronary disease
- Phổi: Pneumonitis vs Fibrosis

### 3. Yếu tố ảnh hưởng

α/β có thể thay đổi do:
- Tuổi bệnh nhân
- Bệnh lý nền
- Hóa trị kết hợp
- Kỹ thuật xạ trị
- Thời gian theo dõi

### 4. Trẻ em (Pediatric)

**KHÔNG dùng giá trị người lớn!**
- Trẻ em nhạy cảm hơn
- Tham khảo PENTEC
- Cần tư vấn chuyên gia

---

## 📚 Tài liệu tham khảo

### QUANTEC Papers
1. Marks LB et al. Use of normal tissue complication probability models in the clinic. Int J Radiat Oncol Biol Phys. 2010.
2. Various organ-specific QUANTEC papers (2010)

### PENTEC Papers
3. Constine LS et al. Pediatric normal tissue effects in the clinic (PENTEC). Int J Radiat Oncol Biol Phys. 2019.

### Specific Studies
4. Prostate α/β: Miralbell R et al. Dose-fractionation sensitivity of prostate cancer deduced from radiotherapy outcomes of 5,969 patients. Int J Radiat Oncol Biol Phys. 2012.

5. Breast α/β: Haviland JS et al. The UK Standardisation of Breast Radiotherapy (START) trials. Lancet Oncol. 2013.

6. Spinal Cord: Kirkpatrick JP et al. The linear-quadratic model is inappropriate to model high dose per fraction effects in radiosurgery. Semin Radiat Oncol. 2008.

7. Lens: Merriam GR, Worgul BV. Experimental radiation cataract. Bull N Y Acad Med. 1983.

---

## 🎯 Khuyến nghị

### Cho bác sĩ xạ trị

1. **Chọn α/β phù hợp** với endpoint quan tâm
2. **Dùng giá trị bảo thủ** cho cơ quan quan trọng
3. **Cân nhắc phạm vi** không chỉ giá trị trung bình
4. **Tham khảo y văn** mới nhất

### Cho vật lý xạ trị

1. **Kiểm tra α/β** trong NTCP models
2. **Validate** với dữ liệu lâm sàng
3. **Document rõ ràng** giá trị đã dùng
4. **Sensitivity analysis** với các giá trị khác nhau

### Cho sinh viên

1. **Hiểu ý nghĩa** của α/β
2. **Phân biệt** early vs late effects
3. **Biết ứng dụng** trong lâm sàng
4. **Đọc** các paper QUANTEC/PENTEC

---

## ✅ Checklist sử dụng

Khi chọn α/β, hãy tự hỏi:

- [ ] Đây là u hay mô lành?
- [ ] Early hay late effect?
- [ ] Endpoint cụ thể là gì?
- [ ] Có dữ liệu cụ thể cho trường hợp này không?
- [ ] Giá trị này có bảo thủ đủ không?
- [ ] Có cần tham khảo chuyên gia không?

---

## 🎓 Kết luận

**Bảng α/β là công cụ quan trọng** trong:
- ✅ Tính toán BED/EQD2
- ✅ So sánh phác đồ
- ✅ Lập kế hoạch xạ trị
- ✅ Đánh giá độc tính

**Nhưng nhớ rằng**:
- ⚠️ Đây là ước lượng, không phải giá trị tuyệt đối
- ⚠️ Cần cân nhắc nhiều yếu tố lâm sàng
- ⚠️ Quyết định cuối cùng dựa trên kinh nghiệm và đánh giá tổng thể

**Phần mềm này** cung cấp các giá trị tham khảo dựa trên y văn uy tín, nhưng **bác sĩ điều trị** vẫn là người ra quyết định cuối cùng!
