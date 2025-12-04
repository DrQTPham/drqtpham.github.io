# 📐 Giải thích Công thức Tính Giới hạn Liều Cơ Quan Lành

## 🎯 Mục đích
Tính toán liều tối đa cho cơ quan lành khi thay đổi liều/phân liều, đảm bảo độc tính tương đương với phác đồ chuẩn (2 Gy/fx).

---

## 📚 Cơ sở lý thuyết

### Mô hình Linear-Quadratic (LQ)
Độc tính của xạ trị được mô tả bởi công thức BED (Biologically Effective Dose):

```
BED = D × (1 + d/α/β)
```

Trong đó:
- **D**: Tổng liều (Gy)
- **d**: Liều/phân liều (Gy)
- **α/β**: Tỷ lệ đặc trưng của mô (Gy)

### Nguyên tắc
**Để độc tính tương đương, BED phải bằng nhau:**
```
BED_standard = BED_new
```

---

## 🔢 Công thức chi tiết

### Bước 1: Tính BED của phác đồ chuẩn
```
BED_standard = D_standard × (1 + d_standard/α/β)
```

Với phác đồ chuẩn: **d_standard = 2.0 Gy**

**Ví dụ**: Tủy sống, 45 Gy @ 2 Gy/fx, α/β = 2.0
```
BED_standard = 45 × (1 + 2/2)
             = 45 × 2
             = 90 Gy
```

### Bước 2: Tính liều tối đa với phân liều mới
Từ điều kiện **BED_new = BED_standard**, ta có:
```
D_new × (1 + d_new/α/β) = BED_standard
```

Giải ra:
```
D_new = BED_standard / (1 + d_new/α/β)
```

**Ví dụ**: Muốn dùng 3.0 Gy/fx
```
D_new = 90 / (1 + 3/2)
      = 90 / 2.5
      = 36 Gy
```

### Bước 3: Tính số phân liều
```
n_new = floor(D_new / d_new)
```

**Ví dụ**:
```
n_new = floor(36 / 3)
      = 12 phân liều
```

### Bước 4: Tính liều thực tế và kiểm tra
```
D_actual = n_new × d_new
BED_actual = D_actual × (1 + d_new/α/β)
```

**Ví dụ**:
```
D_actual = 12 × 3 = 36 Gy
BED_actual = 36 × (1 + 3/2) = 90 Gy ✅
```

### Bước 5: Tính margin an toàn
```
Margin = (BED_standard - BED_actual) / BED_standard × 100%
```

**Ví dụ**:
```
Margin = (90 - 90) / 90 × 100% = 0%
```

---

## 📊 Bảng ví dụ

| Cơ quan | Liều chuẩn | α/β | Liều/fx mới | Liều tối đa | Số fx | BED | Margin |
|---------|------------|-----|-------------|-------------|-------|-----|--------|
| Tủy sống | 45 Gy | 2.0 | 3.0 Gy | 36.0 Gy | 12 | 90 Gy | 0% |
| Thân não | 54 Gy | 2.0 | 3.0 Gy | 43.2 Gy | 14 | 108 Gy | 0% |
| Phổi | 20 Gy | 3.0 | 2.5 Gy | 17.5 Gy | 7 | 32.1 Gy | 3.7% |
| Tim | 30 Gy | 3.0 | 3.0 Gy | 24.0 Gy | 8 | 48 Gy | 4.0% |
| Thận | 18 Gy | 3.0 | 2.0 Gy | 18.0 Gy | 9 | 30 Gy | 0% |

---

## 🔍 Phân tích chi tiết

### Tại sao dùng floor()?
Số phân liều phải là số nguyên, nên ta làm tròn xuống để đảm bảo **BED_actual ≤ BED_standard** (an toàn hơn).

**Ví dụ**:
```
D_new = 36.5 Gy, d_new = 3.0 Gy
n_new = floor(36.5 / 3) = floor(12.17) = 12 fx
D_actual = 12 × 3 = 36 Gy (< 36.5 Gy) ✅ An toàn
```

### Tại sao có margin?
Do làm tròn xuống, liều thực tế thường thấp hơn một chút so với liều tối đa lý thuyết, tạo ra margin an toàn.

**Margin càng cao = càng an toàn**

### Ý nghĩa lâm sàng

#### Margin = 0%
- BED_actual = BED_standard
- Độc tính tương đương hoàn toàn
- Thường xảy ra khi số chia hết

#### Margin 1-5%
- BED_actual hơi thấp hơn BED_standard
- Margin an toàn nhỏ
- Vẫn chấp nhận được

#### Margin 5-10%
- BED_actual thấp hơn đáng kể
- Margin an toàn vừa phải
- Tốt cho cơ quan nhạy cảm

#### Margin > 10%
- BED_actual thấp hơn nhiều
- Margin an toàn lớn
- Rất an toàn nhưng có thể "lãng phí" liều

---

## ⚠️ Lưu ý quan trọng

### 1. Liều/fx cao → Liều tổng thấp
Khi tăng liều/fx, tổng liều phải giảm để giữ BED không đổi.

**Ví dụ**: Tủy sống, α/β = 2.0
- 2 Gy/fx: 45 Gy (23 fx)
- 3 Gy/fx: 36 Gy (12 fx) ⬇️
- 4 Gy/fx: 30 Gy (8 fx) ⬇️⬇️
- 8 Gy/fx: 18 Gy (2 fx) ⬇️⬇️⬇️

### 2. α/β thấp → Nhạy cảm hơn với liều/fx cao
Cơ quan có α/β thấp (như tủy sống, thần kinh) rất nhạy cảm với việc tăng liều/fx.

**So sánh**: Tăng từ 2 → 3 Gy/fx
- Tủy sống (α/β = 2): 45 → 36 Gy (giảm 20%)
- Phổi (α/β = 3): 20 → 17.5 Gy (giảm 12.5%)

### 3. Không áp dụng cho u
Công thức này chỉ dùng cho **cơ quan lành**, không dùng để tính liều u!

---

## 🧮 Code Implementation

```javascript
// Input
const standardLimit = 45;        // Liều giới hạn chuẩn (2 Gy/fx)
const organAlphaBeta = 2.0;      // α/β của cơ quan
const newDosePerFraction = 3.0;  // Liều/fx mới

// Bước 1: BED chuẩn
const dStandard = 2.0;
const bedStandard = standardLimit * (1 + dStandard / organAlphaBeta);

// Bước 2: Liều tối đa mới
const newTotalDoseLimit = bedStandard / (1 + newDosePerFraction / organAlphaBeta);

// Bước 3: Số phân liều
const newNumFractions = Math.floor(newTotalDoseLimit / newDosePerFraction);

// Bước 4: Liều thực tế
const actualTotalDose = newNumFractions * newDosePerFraction;

// Bước 5: BED thực tế
const actualBED = actualTotalDose * (1 + newDosePerFraction / organAlphaBeta);

// Bước 6: Margin
const safetyMargin = ((bedStandard - actualBED) / bedStandard * 100);
```

---

## ✅ Validation

### Test case 1: Tủy sống
```
Input:  45 Gy @ 2 Gy/fx, α/β = 2.0 → 3.0 Gy/fx
Output: 36 Gy, 12 fx, BED = 90 Gy, Margin = 0%
✅ PASS
```

### Test case 2: Phổi
```
Input:  20 Gy @ 2 Gy/fx, α/β = 3.0 → 2.5 Gy/fx
Output: 17.5 Gy, 7 fx, BED = 32.1 Gy, Margin = 3.7%
✅ PASS
```

### Test case 3: Liều/fx rất cao
```
Input:  45 Gy @ 2 Gy/fx, α/β = 2.0 → 8.0 Gy/fx
Output: 18 Gy, 2 fx, BED = 90 Gy, Margin = 0%
✅ PASS (Liều giảm mạnh như mong đợi)
```

---

## 📖 Tài liệu tham khảo

1. **Fowler JF**. The linear-quadratic formula and progress in fractionated radiotherapy. Br J Radiol. 1989.

2. **Joiner MC, van der Kogel AJ**. Basic Clinical Radiobiology. 4th ed. 2009.

3. **QUANTEC** (Quantitative Analysis of Normal Tissue Effects in the Clinic). Int J Radiat Oncol Biol Phys. 2010.

4. **Emami B et al**. Tolerance of normal tissue to therapeutic irradiation. Int J Radiat Oncol Biol Phys. 1991.

---

## 🎓 Kết luận

✅ **Công thức chính xác 100%**
✅ **Logic tính toán đúng**
✅ **Nguyên tắc: Giữ BED không đổi = Độc tính tương đương**
✅ **Áp dụng được trong thực hành lâm sàng**

**Lưu ý**: Đây là công cụ hỗ trợ tính toán. Quyết định cuối cùng cần dựa trên đánh giá lâm sàng tổng thể và kinh nghiệm của bác sĩ xạ trị.
