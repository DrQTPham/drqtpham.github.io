# Hướng Dẫn Sử Dụng EQD2/BED Calculator

## 📋 Mục Lục
1. [Khởi động ứng dụng](#khởi-động-ứng-dụng)
2. [Tính toán EQD2/BED cơ bản](#tính-toán-eqd2bed-cơ-bản)
3. [Tra cứu giới hạn liều cơ quan](#tra-cứu-giới-hạn-liều-cơ-quan)
4. [So sánh phác đồ xạ trị](#so-sánh-phác-đồ-xạ-trị)
5. [Xem lịch sử tính toán](#xem-lịch-sử-tính-toán)

---

## 🚀 Khởi động ứng dụng

### Bước 1: Khởi động Backend (API Server)

```bash
# Di chuyển vào thư mục backend
cd backend

# Kích hoạt môi trường ảo (nếu có)
source venv/bin/activate  # macOS/Linux
# hoặc
venv\Scripts\activate     # Windows

# Khởi động server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Server sẽ chạy tại: `http://localhost:8000`

### Bước 2: Mở Frontend

```bash
# Mở file index.html trong trình duyệt
# Cách 1: Double-click vào file frontend/index.html
# Cách 2: Dùng Live Server trong VS Code
# Cách 3: Dùng Python HTTP server
cd frontend
python -m http.server 8080
```

Truy cập: `http://localhost:8080`

---

## 🧮 Tính toán EQD2/BED cơ bản

### Bước 1: Nhập thông tin phác đồ xạ trị

1. **Tổng liều (Total Dose)**: Nhập tổng liều Gy
   - Ví dụ: `60` Gy

2. **Số phân liều (Number of Fractions)**: Nhập số lần chiếu xạ
   - Ví dụ: `30` fractions

3. **Tỷ lệ α/β (Alpha/Beta Ratio)**: Chọn hoặc nhập
   - Chọn từ dropdown: "Khối u (Tumor) - 10.0"
   - Hoặc nhập tùy chỉnh: `10`

### Bước 2: Nhập thông tin Gap (nếu có)

Nếu có gián đoạn điều trị:

1. Click vào **"Thêm Gap"**
2. Nhập:
   - **Ngày bắt đầu gap**: Chọn ngày
   - **Số ngày gap**: Ví dụ `7` ngày
   - **Số phân liều trước gap**: Ví dụ `15` fractions

### Bước 3: Xem kết quả

Kết quả sẽ hiển thị:
- **EQD2**: Equivalent Dose in 2 Gy fractions
- **BED**: Biologically Effective Dose
- **Liều mỗi phân liều**: Dose per fraction

**Ví dụ kết quả:**
```
Total Dose: 60 Gy
Fractions: 30
Dose/Fraction: 2 Gy
α/β: 10

→ EQD2: 60.00 Gy
→ BED: 72.00 Gy
```

---

## 🔍 Tra cứu giới hạn liều cơ quan

### Bước 1: Chọn cơ quan

1. Click vào tab **"Organ Dose Limits"**
2. Chọn cơ quan từ dropdown:
   - Ví dụ: "Heart (Tim)"
   - Hoặc tìm kiếm: Gõ "tim" để lọc

### Bước 2: Chọn phác đồ xạ trị

Chọn loại fractionation:
- **Conventional**: Xạ trị thông thường (1.8-2 Gy/fx)
- **SRS 1fx**: Stereotactic Radiosurgery (1 fraction)
- **SBRT 3fx**: Stereotactic Body RT (3 fractions) ⭐ MỚI
- **SBRT 5fx**: Stereotactic Body RT (5 fractions) ⭐ MỚI

### Bước 3: Xem giới hạn liều

Hệ thống sẽ hiển thị:
- **Endpoint**: Biến chứng cần tránh
- **α/β ratio**: Tỷ lệ alpha/beta của cơ quan
- **Dose constraints**: Các giới hạn liều

**Ví dụ: Heart - SBRT 3fx**
```
Organ: Heart (Tim)
Endpoint: Pericarditis
α/β: 3.0

Constraints:
✓ Dmax < 30 Gy
✓ D15cc < 24 Gy
```

### Các loại Constraint

1. **Dmax (Max Dose)**: Liều tối đa
   - Ví dụ: `Dmax < 30 Gy`

2. **Dmean (Mean Dose)**: Liều trung bình
   - Ví dụ: `Dmean < 20 Gy`

3. **DXcc (Volume in cc)**: Liều tại volume cụ thể
   - Ví dụ: `D15cc < 24 Gy` (15cc nhận < 24 Gy)

4. **VX% (Volume in %)**: Liều tại % volume
   - Ví dụ: `V50% < 30 Gy` (50% thể tích nhận < 30 Gy)

5. **Volume to Spare**: Thể tích cần bảo vệ
   - Ví dụ: `>700cc < 9.1 Gy` (giữ >700cc dưới 9.1 Gy)

---

## ⚖️ So sánh phác đồ xạ trị

### Bước 1: Nhập phác đồ thứ nhất

1. Click tab **"Compare Regimens"**
2. Nhập thông tin **Regimen 1**:
   ```
   Total Dose: 60 Gy
   Fractions: 30
   α/β: 10
   ```

### Bước 2: Nhập phác đồ thứ hai

Nhập thông tin **Regimen 2**:
```
Total Dose: 54 Gy
Fractions: 27
α/β: 10
```

### Bước 3: Xem so sánh

Kết quả hiển thị bảng so sánh:

| Thông số | Regimen 1 | Regimen 2 | Chênh lệch |
|----------|-----------|-----------|------------|
| Total Dose | 60 Gy | 54 Gy | -6 Gy |
| Fractions | 30 | 27 | -3 |
| Dose/Fx | 2.0 Gy | 2.0 Gy | 0 Gy |
| EQD2 | 60.0 Gy | 54.0 Gy | -6.0 Gy |
| BED | 72.0 Gy | 64.8 Gy | -7.2 Gy |

**Biểu đồ trực quan** sẽ hiển thị sự khác biệt giữa 2 phác đồ.

---

## 📊 Xem lịch sử tính toán

### Bước 1: Truy cập lịch sử

1. Click tab **"History"**
2. Xem danh sách các tính toán đã thực hiện

### Bước 2: Lọc và tìm kiếm

- **Lọc theo ngày**: Chọn khoảng thời gian
- **Lọc theo α/β**: Chọn tỷ lệ alpha/beta
- **Tìm kiếm**: Gõ từ khóa

### Bước 3: Thao tác với lịch sử

- **Xem chi tiết**: Click vào một bản ghi
- **Tính lại**: Click "Recalculate" để tính lại với cùng thông số
- **Xóa**: Click "Delete" để xóa bản ghi
- **Export**: Click "Export" để xuất dữ liệu

---

## 💡 Các tính năng nâng cao

### 1. Gap Compensation (Bù liều cho gián đoạn)

Khi có gián đoạn điều trị, hệ thống tự động:
- Tính toán tái sinh tế bào khối u
- Điều chỉnh BED/EQD2 theo thời gian gap
- Đề xuất liều bù (nếu cần)

**Công thức:**
```
BED_loss = (Dprolif × gap_days) / (α/β + dose_per_fraction)
```

### 2. Tính toán ngược (Reverse Calculation)

Tính số phân liều cần thiết để đạt EQD2 mục tiêu:

1. Nhập **Target EQD2**: Ví dụ `70 Gy`
2. Nhập **Dose per fraction**: Ví dụ `2 Gy`
3. Nhập **α/β**: Ví dụ `10`
4. Hệ thống tính số fractions cần thiết

### 3. Batch Calculation (Tính hàng loạt)

Upload file CSV với nhiều phác đồ:

```csv
total_dose,fractions,alpha_beta
60,30,10
54,27,10
70,35,3
```

Hệ thống sẽ tính toán tất cả và xuất kết quả.

---

## 📱 Sử dụng trên thiết bị di động

Ứng dụng responsive, hoạt động tốt trên:
- 📱 Smartphone
- 📱 Tablet
- 💻 Desktop

**Lưu ý**: Một số tính năng nâng cao có thể bị giới hạn trên mobile.

---

## 🔧 Xử lý sự cố

### Lỗi: "Cannot connect to server"

**Nguyên nhân**: Backend chưa chạy

**Giải pháp**:
```bash
cd backend
uvicorn app.main:app --reload
```

### Lỗi: "Invalid input"

**Nguyên nhân**: Dữ liệu nhập không hợp lệ

**Giải pháp**:
- Kiểm tra Total Dose > 0
- Kiểm tra Fractions > 0
- Kiểm tra α/β > 0

### Lỗi: "Organ not found"

**Nguyên nhân**: Cơ quan chưa có dữ liệu cho fractionation scheme đã chọn

**Giải pháp**:
- Thử chọn fractionation scheme khác
- Kiểm tra database đã cập nhật chưa

---

## 📚 Tài liệu tham khảo

### Công thức tính toán

**BED (Biologically Effective Dose):**
```
BED = D × (1 + d/(α/β))
```
Trong đó:
- D = Total dose
- d = Dose per fraction
- α/β = Alpha/beta ratio

**EQD2 (Equivalent Dose in 2 Gy fractions):**
```
EQD2 = D × [(d + α/β) / (2 + α/β)]
```

### Nguồn dữ liệu

- **QUANTEC**: Quantitative Analysis of Normal Tissue Effects
- **AAPM TG-101**: SBRT Guidelines
- **Clinical Literature**: Các nghiên cứu lâm sàng

---

## 🆘 Hỗ trợ

Nếu cần hỗ trợ:
1. Xem file `README.md` trong thư mục gốc
2. Kiểm tra file `TESTING_GUIDE.md` để test các tính năng
3. Xem `SBRT_3FX_5FX_UPDATE_COMPLETE.md` cho thông tin về dữ liệu mới

---

## ✅ Checklist sử dụng

- [ ] Backend đã chạy (port 8000)
- [ ] Frontend đã mở (browser)
- [ ] Đã thử tính toán EQD2/BED cơ bản
- [ ] Đã tra cứu organ dose limits
- [ ] Đã thử so sánh 2 phác đồ
- [ ] Đã xem lịch sử tính toán

---

**Phiên bản**: 2.0 (với SBRT 3fx/5fx data)  
**Cập nhật**: November 30, 2025
