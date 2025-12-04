# EQD2 & BED Calculator - Frontend

Frontend đơn giản với HTML/CSS/JavaScript thuần để tính toán EQD2 và BED trong xạ trị.

## 🚀 Cách sử dụng

### Bước 1: Start Backend API

```bash
cd backend
source venv/bin/activate
uvicorn app.main:app --reload --port 8001
```

Backend sẽ chạy tại: http://localhost:8001

### Bước 2: Mở Frontend

Có 2 cách:

**Cách 1: Mở trực tiếp file HTML**
- Mở file `index.html` trong browser
- Hoặc double-click vào file `index.html`

**Cách 2: Dùng Python HTTP Server (Khuyến nghị)**
```bash
cd frontend
python3 -m http.server 8080
```

Sau đó mở: http://localhost:8080

### Bước 3: Sử dụng

1. **Tính toán BED/EQD2:**
   - Nhập tổng liều (D) hoặc liều/phân liều (d)
   - Nhập số phân liều (n)
   - Chọn α/β từ dropdown hoặc nhập tùy chỉnh
   - Click "Tính cả BED & EQD2"

2. **Tính ngược:**
   - Nhập EQD2 mục tiêu
   - Nhập liều/phân liều
   - Nhập α/β
   - Click "Tính số phân liều cần thiết"

3. **Xem lịch sử:**
   - Click "Tải lịch sử" để xem các tính toán trước
   - Click "Xuất file" để download lịch sử

## 📁 Cấu trúc

```
frontend/
├── index.html       # Trang chính
├── css/
│   └── style.css   # Styling
├── js/
│   └── app.js      # Logic & API calls
└── README.md       # Hướng dẫn
```

## ✨ Tính năng

✅ Tính BED (Biologically Effective Dose)  
✅ Tính EQD2 (Equivalent Dose in 2 Gy)  
✅ Tính cả hai đồng thời  
✅ Tính ngược từ EQD2 mục tiêu  
✅ Chọn α/β presets (Mô muộn, Khối u, Tủy sống, Thần kinh)  
✅ Xem lịch sử tính toán  
✅ Xuất lịch sử ra file text  
✅ Responsive design  
✅ Giao diện tiếng Việt  

## 🎨 Giao diện

- Gradient background đẹp mắt
- Card-based layout
- Form validation
- Alert messages
- Smooth animations
- Mobile-friendly

## 🔧 Cấu hình

Nếu backend chạy ở port khác, sửa trong `js/app.js`:

```javascript
const API_BASE_URL = 'http://localhost:8001/api/v1';
```

## 📝 Lưu ý

- Backend phải chạy trước khi sử dụng frontend
- CORS đã được cấu hình trong backend
- Tất cả tính toán được lưu vào database
- Hỗ trợ tất cả trình duyệt hiện đại

## 🐛 Troubleshooting

**Lỗi: "Failed to fetch"**
- Kiểm tra backend có đang chạy không
- Kiểm tra URL API trong `js/app.js`
- Kiểm tra CORS settings trong backend

**Lỗi: "Không thể tải α/β presets"**
- Backend chưa khởi tạo database
- Chạy: `python -m app.db.init_db` trong thư mục backend

## 🎉 Hoàn thành!

Frontend đã sẵn sàng sử dụng với backend API!
