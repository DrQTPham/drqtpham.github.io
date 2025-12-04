# Hướng dẫn Test Tính năng Tính liều giới hạn cơ quan lành

## Các bước test:

### 1. Đảm bảo server đang chạy
- Backend: http://localhost:8001
- Frontend: http://localhost:8080

### 2. Mở trang test
Mở browser và truy cập:
- Trang chính: http://localhost:8080/index.html
- Trang test: http://localhost:8080/test-organ-limit.html

### 3. Mở Developer Console
- Chrome/Edge: Nhấn F12 hoặc Cmd+Option+I (Mac)
- Chuyển sang tab "Console"

### 4. Test với ví dụ cụ thể

#### Ví dụ 1: Tủy sống (Spinal Cord)
1. Chọn "Tủy sống (Spinal Cord)" từ dropdown
2. Các giá trị sẽ tự động điền:
   - Liều giới hạn chuẩn: 45 Gy
   - α/β: 2.0 Gy
3. Nhập liều/phân liều mới: 3.0 Gy
4. Click "Tính liều giới hạn mới"

**Kết quả mong đợi:**
- Phác đồ chuẩn (2 Gy/fx): 45 Gy, BED: 90 Gy
- Phác đồ mới (3 Gy/fx): ~36 Gy (12 phân liều)
- BED với phác đồ mới: 90 Gy
- Margin an toàn: ~0%

#### Ví dụ 2: Phổi (Lung)
1. Chọn "Phổi (Lung)" từ dropdown
2. Các giá trị tự động:
   - Liều giới hạn chuẩn: 20 Gy
   - α/β: 3.0 Gy
3. Nhập liều/phân liều mới: 2.5 Gy
4. Click "Tính liều giới hạn mới"

**Kết quả mong đợi:**
- Phác đồ chuẩn (2 Gy/fx): 20 Gy, BED: ~33.33 Gy
- Phác đồ mới (2.5 Gy/fx): ~19 Gy (7-8 phân liều)
- Margin an toàn: dương

### 5. Kiểm tra Console logs
Trong console bạn sẽ thấy:
```
Organ limit calculator loaded successfully
calculateOrganLimit called
Values: {standardLimit: 45, organAlphaBeta: 2, newDosePerFraction: 3}
Displaying results for: Tủy sống
```

### 6. Kiểm tra kết quả hiển thị
- Kết quả sẽ xuất hiện dưới form
- Có màu sắc cảnh báo phù hợp:
  - Xanh (✅): An toàn
  - Vàng (ℹ️): Cần thận trọng
  - Đỏ (⚠️): Vượt giới hạn
- Hiển thị đầy đủ thông tin:
  - Phác đồ chuẩn và BED
  - Phác đồ mới và số phân liều
  - BED mới và margin an toàn
  - Giải thích chi tiết

## Troubleshooting

### Nếu không hiện kết quả:
1. Kiểm tra Console có lỗi không
2. Đảm bảo đã nhập đầy đủ 3 trường bắt buộc
3. Thử hard refresh (Cmd+Shift+R hoặc Ctrl+Shift+R)
4. Xóa cache browser

### Nếu có lỗi JavaScript:
1. Kiểm tra file app.js đã được load chưa
2. Kiểm tra console log "Organ limit calculator loaded successfully"
3. Kiểm tra hàm calculateOrganLimit có tồn tại: `typeof calculateOrganLimit`

## Công thức tính toán

```
BED_standard = D_standard × (1 + d_standard/α/β)
BED_new = D_new × (1 + d_new/α/β)

Với BED_standard = BED_new:
D_new = BED_standard / (1 + d_new/α/β)
n_new = floor(D_new / d_new)
```

Ví dụ: Tủy sống, 45 Gy @ 2 Gy/fx, α/β = 2
- BED_standard = 45 × (1 + 2/2) = 45 × 2 = 90 Gy
- Với d_new = 3 Gy:
- D_new = 90 / (1 + 3/2) = 90 / 2.5 = 36 Gy
- n_new = 36 / 3 = 12 phân liều
