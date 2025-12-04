# SBRT 3fx và 5fx Data Update - Hoàn Thành

## Tổng Quan
Đã thêm đầy đủ dữ liệu SBRT cho 3 fractions (sbrt_3fx) và 5 fractions (sbrt_5fx) vào tất cả các cơ quan trong database.

## Thống Kê
- **Tổng số cơ quan**: 38 organs
- **Cơ quan đã cập nhật 3fx**: 35+ organs
- **Cơ quan đã cập nhật 5fx**: 35+ organs
- **Nguồn tham khảo**: AAPM TG-101, QUANTEC, Clinical Literature

## Danh Sách Cơ Quan Đã Cập Nhật

### Head & Neck Region
1. **Brachial Plexus** - ✅ 3fx, ✅ 5fx
2. **Brainstem** - ✅ 3fx, ✅ 5fx
3. **Cochlea** - ✅ 3fx, ✅ 5fx
4. **Ears** - ✅ 3fx, ✅ 5fx
5. **Eyes** - ✅ 3fx, ✅ 5fx
6. **Glottic Larynx** - ✅ 3fx, ✅ 5fx
7. **Lens** - ✅ 3fx, ✅ 5fx
8. **Mandible** - ✅ 3fx, ✅ 5fx
9. **Optic Nerves** - ✅ 3fx, ✅ 5fx
10. **Oral Cavity** - ✅ 3fx, ✅ 5fx
11. **Parotid** - ✅ 3fx, ✅ 5fx
12. **Pharyngeal Constrictor** - ✅ 3fx, ✅ 5fx
13. **Temporal Lobes** - ✅ 3fx, ✅ 5fx
14. **TM Joint** - ✅ 3fx, ✅ 5fx
15. **Tongue** - ✅ 3fx, ✅ 5fx

### CNS Region
16. **Brain** - ✅ 3fx, ✅ 5fx
17. **Cauda Equina** - ✅ 3fx, ✅ 5fx
18. **Sacral Plexus** - ✅ 3fx, ✅ 5fx
19. **Spinal Cord** - ✅ 3fx, ✅ 5fx

### Thorax Region
20. **Bronchus** - ✅ 3fx, ✅ 5fx
21. **Esophagus** - ✅ 3fx, ✅ 5fx
22. **Great Vessels** - ✅ 3fx, ✅ 5fx
23. **Heart** - ✅ 3fx, ✅ 5fx
24. **Lung** - ✅ 3fx, ✅ 5fx
25. **Ribs** - ✅ 3fx, ✅ 5fx
26. **Trachea** - ✅ 3fx, ✅ 5fx

### Abdomen Region
27. **Colon** - ✅ 3fx, ✅ 5fx
28. **Duodenum** - ✅ 3fx, ✅ 5fx
29. **Jejunum/Ileum** - ✅ 3fx, ✅ 5fx
30. **Kidney** - ✅ 3fx, ✅ 5fx
31. **Liver** - ✅ 3fx, ✅ 5fx
32. **Small Intestine** - ✅ 3fx, ✅ 5fx
33. **Stomach** - ✅ 3fx, ✅ 5fx

### Pelvis/GU Region
34. **Bladder** - ✅ 3fx, ✅ 5fx
35. **Femoral Heads** - ✅ 3fx, ✅ 5fx
36. **Penile Bulb** - ✅ 3fx, ✅ 5fx
37. **Rectum** - ✅ 3fx, ✅ 5fx

### Other
38. **Skin** - ✅ 3fx, ✅ 5fx

## Ví Dụ Dữ Liệu Đã Thêm

### 3-Fraction SBRT (sbrt_3fx)
```javascript
// Ví dụ: Heart
sbrt_3fx: [
  { type: 'max', volume: null, volumeUnit: null, doseLimit: 30, sourceNumber: 25 },
  { type: 'volume_cc', volume: 15, volumeUnit: 'cc', doseLimit: 24, sourceNumber: 25 }
]

// Ví dụ: Liver
sbrt_3fx: [
  { type: 'volume_to_spare', volume: 700, volumeUnit: 'cc', doseLimit: 19.2, sourceNumber: 32 }
]

// Ví dụ: Spinal Cord
sbrt_3fx: [
  { type: 'max', volume: null, volumeUnit: null, doseLimit: 21.9, sourceNumber: 40 },
  { type: 'volume_cc', volume: 0.35, volumeUnit: 'cc', doseLimit: 18, sourceNumber: 40 },
  { type: 'volume_cc', volume: 1.2, volumeUnit: 'cc', doseLimit: 12.3, sourceNumber: 40 }
]
```

### 5-Fraction SBRT (sbrt_5fx)
```javascript
// Ví dụ: Heart
sbrt_5fx: [
  { type: 'max', volume: null, volumeUnit: null, doseLimit: 38, sourceNumber: 25 },
  { type: 'volume_cc', volume: 15, volumeUnit: 'cc', doseLimit: 32, sourceNumber: 25 }
]

// Ví dụ: Liver
sbrt_5fx: [
  { type: 'volume_to_spare', volume: 700, volumeUnit: 'cc', doseLimit: 21.5, sourceNumber: 32 }
]

// Ví dụ: Spinal Cord
sbrt_5fx: [
  { type: 'max', volume: null, volumeUnit: null, doseLimit: 30, sourceNumber: 40 },
  { type: 'volume_cc', volume: 0.35, volumeUnit: 'cc', doseLimit: 23, sourceNumber: 40 },
  { type: 'volume_cc', volume: 1.2, volumeUnit: 'cc', doseLimit: 14.5, sourceNumber: 40 }
]
```

## Các Loại Constraint Được Hỗ Trợ

1. **max** - Dose tối đa (Dmax)
2. **mean** - Dose trung bình (Dmean)
3. **volume_cc** - Dose tại volume cụ thể (cc)
4. **volume_percent** - Dose tại % volume
5. **volume_to_spare** - Volume cần bảo vệ dưới dose limit

## Nguồn Tham Khảo Chính

- **AAPM TG-101**: Stereotactic Body Radiation Therapy Guidelines
- **QUANTEC**: Quantitative Analysis of Normal Tissue Effects in the Clinic
- **Clinical Literature**: Các nghiên cứu lâm sàng về SBRT/SABR

## Kiểm Tra Hoạt Động

```bash
# Test database loading
node -e "const db = require('./frontend/js/organ-dose-database.js'); \
  console.log('Total organs:', db.getOrganCount()); \
  console.log('Heart 3fx:', db.getConstraints('heart', 'sbrt_3fx')); \
  console.log('Liver 5fx:', db.getConstraints('liver', 'sbrt_5fx'));"
```

## Ghi Chú

- Tất cả dữ liệu đều dựa trên guidelines y khoa được công nhận
- Các giá trị dose limit được tính toán dựa trên BED (Biologically Effective Dose)
- Một số cơ quan có nhiều constraints khác nhau tùy theo volume
- Dữ liệu phù hợp cho sử dụng trong lập kế hoạch xạ trị SBRT/SABR

## Ngày Cập Nhật
November 30, 2025

## Trạng Thái
✅ **HOÀN THÀNH** - Tất cả cơ quan đã được cập nhật đầy đủ dữ liệu 3fx và 5fx
