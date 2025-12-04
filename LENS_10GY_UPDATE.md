# ✅ CẬP NHẬT GIỚI HẠN LIỀU LENS - 10 Gy

## 📅 Ngày cập nhật
**December 1, 2025**

---

## 🎯 Nội dung cập nhật

Đã thêm **giới hạn liều bảo thủ 10 Gy** cho thủy tinh thể (lens) vào database, dựa trên khuyến cáo của ICRP và NCRP.

---

## 📊 Chi tiết thay đổi

### Trước khi cập nhật:
```javascript
'lens': {
  conventional: [
    { type: 'max', doseLimit: 25, sourceNumber: 5 }
  ]
}
```

### Sau khi cập nhật:
```javascript
'lens': {
  conventional: [
    { type: 'max', doseLimit: 10, sourceNumber: 41, note: 'Conservative limit (ICRP, NCRP)' },
    { type: 'max', doseLimit: 25, sourceNumber: 5, note: 'Traditional limit' }
  ]
}
```

---

## 📚 Tài liệu tham khảo mới

**Reference #41:**
- **Tác giả**: ICRP Publication 118, NCRP Report 180
- **Tiêu đề**: ICRP Statement on Tissue Reactions and Early and Late Effects of Radiation in Normal Tissues and Organs - Threshold Doses for Tissue Reactions
- **Tạp chí**: Annals of ICRP
- **Năm**: 2012
- **DOI**: 10.1016/j.icrp.2012.02.001
- **Ghi chú**: Conservative 10 Gy limit for lens to prevent cataract formation

---

## 🔬 Giải thích khoa học

### Tại sao có 2 giới hạn?

1. **10 Gy (Bảo thủ - ICRP/NCRP 2012)**
   - Dựa trên nghiên cứu mới về ngưỡng gây đục thủy tinh thể
   - Khuyến cáo cho các trường hợp cần bảo vệ tối đa
   - Áp dụng cho bệnh nhân trẻ tuổi hoặc có tiền sử bệnh mắt

2. **25 Gy (Truyền thống - QUANTEC)**
   - Giới hạn truyền thống được sử dụng rộng rãi
   - Vẫn được chấp nhận trong nhiều giao thức lâm sàng
   - Áp dụng khi cần cân bằng giữa kiểm soát u và bảo vệ cơ quan

---

## 💡 Khuyến nghị lâm sàng

### Khi nào dùng giới hạn 10 Gy?
- ✅ Bệnh nhân trẻ tuổi (< 50 tuổi)
- ✅ Bệnh nhân có tiền sử đái tháo đường
- ✅ Bệnh nhân đã có tiền sử phẫu thuật mắt
- ✅ Khi có thể đạt được mà không ảnh hưởng kiểm soát u

### Khi nào có thể dùng giới hạn 25 Gy?
- ✅ Bệnh nhân cao tuổi với tiên lượng sống ngắn
- ✅ Khi giới hạn 10 Gy không khả thi về mặt kỹ thuật
- ✅ Khi lợi ích kiểm soát u vượt trội rủi ro đục thủy tinh thể

---

## 🖥️ Cách sử dụng trong phần mềm

Khi tra cứu **Lens** trong phần mềm, bạn sẽ thấy:

```
Cơ quan: Lens (Thủy tinh thể)
α/β: 1.0 Gy
Endpoint: Cataract

Conventional Fractionation:
  ✓ Dmax ≤ 10 Gy (Conservative - ICRP/NCRP) [Ref 41]
  ✓ Dmax ≤ 25 Gy (Traditional - QUANTEC) [Ref 5]
```

---

## 📖 Tài liệu tham khảo đầy đủ

1. **ICRP Publication 118** (2012). ICRP Statement on Tissue Reactions and Early and Late Effects of Radiation in Normal Tissues and Organs – Threshold Doses for Tissue Reactions. Ann ICRP 41(1-2).

2. **NCRP Report No. 180** (2016). Management of Exposure to Ionizing Radiation: NCRP Recommendations. National Council on Radiation Protection and Measurements.

3. **Mayo C, et al.** (2010). Radiation dose-volume effects of optic nerves and chiasm. Int J Radiat Oncol Biol Phys 76(3 Suppl):S28-35.

---

## ✅ Trạng thái

- [x] Đã cập nhật database
- [x] Đã thêm reference #41
- [x] Đã thêm ghi chú phân biệt 2 giới hạn
- [x] Đã tạo tài liệu hướng dẫn

---

**© 2025 EQD2 & BED Calculator**  
**Dr. Q.T. Phạm** 📧 qtphamhus@gmail.com
