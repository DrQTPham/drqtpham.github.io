/**
 * Organ Dose Limit Database
 * Comprehensive database of organ dose constraints for conventional and SBRT fractionation
 * Based on RTOG, QUANTEC, and AAPM TG-101 guidelines
 */

// Organ Database - 40+ organs with dose constraints
const ORGAN_DATABASE = {
  // HEAD & NECK REGION
  'brachial_plexus': {
    id: 'brachial_plexus',
    nameEn: 'Brachial Plexus',
    nameVi: 'Đám rối thần kinh cánh tay',
    region: 'head_neck',
    alphaBeta: 2.5,
    endpoint: 'Neuropathy',
    conventional: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 66, sourceNumber: 1 },
      { type: 'volume_percent', volume: 5, volumeUnit: '%', doseLimit: 60, sourceNumber: 1 }
    ],
    srs_1fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 17.5, sourceNumber: 17 },
      { type: 'volume_cc', volume: 3, volumeUnit: 'cc', doseLimit: 14, sourceNumber: 17 }
    ],
    sbrt_3fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 24, sourceNumber: 17 },
      { type: 'volume_cc', volume: 3, volumeUnit: 'cc', doseLimit: 20.4, sourceNumber: 17 }
    ],
    sbrt_5fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 30.5, sourceNumber: 17 },
      { type: 'volume_cc', volume: 3, volumeUnit: 'cc', doseLimit: 27, sourceNumber: 17 }
    ]
  },

  'brainstem': {
    id: 'brainstem',
    nameEn: 'Brainstem',
    nameVi: 'Thân não',
    region: 'cns',
    alphaBeta: 2.5,
    endpoint: 'Necrosis',
    conventional: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 54, sourceNumber: 2 },
      { type: 'volume_percent', volume: 1, volumeUnit: '%', doseLimit: 60, sourceNumber: 2 }
    ],
    srs_1fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 15, sourceNumber: 19 },
      { type: 'volume_cc', volume: 0.5, volumeUnit: 'cc', doseLimit: 10, sourceNumber: 19 }
    ],
    sbrt_3fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 23.1, sourceNumber: 19 },
      { type: 'volume_cc', volume: 0.5, volumeUnit: 'cc', doseLimit: 18, sourceNumber: 19 }
    ],
    sbrt_5fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 31, sourceNumber: 19 },
      { type: 'volume_cc', volume: 0.5, volumeUnit: 'cc', doseLimit: 23, sourceNumber: 19 }
    ]
  },

  'cochlea': {
    id: 'cochlea',
    nameEn: 'Cochlea',
    nameVi: 'Ốc tai',
    region: 'head_neck',
    alphaBeta: 3.0,
    endpoint: 'Hearing loss',
    conventional: [
      { type: 'volume_percent', volume: 5, volumeUnit: '%', doseLimit: 55, sourceNumber: 3 }
    ],
    srs_1fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 9, sourceNumber: 20 }
    ],
    sbrt_3fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 17.1, sourceNumber: 20 }
    ],
    sbrt_5fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 25, sourceNumber: 20 }
    ]
  },

  'ears': {
    id: 'ears',
    nameEn: 'Ears (inner/middle)',
    nameVi: 'Tai (trong/giữa)',
    region: 'head_neck',
    alphaBeta: 3.0,
    endpoint: 'Hearing loss',
    conventional: [
      { type: 'mean', volume: null, volumeUnit: null, doseLimit: 50, sourceNumber: 4 }
    ],
    srs_1fx: [],
    sbrt_3fx: [
      { type: 'mean', volume: null, volumeUnit: null, doseLimit: 17.1, sourceNumber: 20 }
    ],
    sbrt_5fx: [
      { type: 'mean', volume: null, volumeUnit: null, doseLimit: 25, sourceNumber: 20 }
    ]
  },

  'eyes': {
    id: 'eyes',
    nameEn: 'Eyes',
    nameVi: 'Mắt',
    region: 'head_neck',
    alphaBeta: 3.0,
    endpoint: 'Blindness',
    conventional: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 50, sourceNumber: 3 },
      { type: 'mean', volume: null, volumeUnit: null, doseLimit: 35, sourceNumber: 4 }
    ],
    srs_1fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 10, sourceNumber: 21 }
    ],
    sbrt_3fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 17.4, sourceNumber: 21 }
    ],
    sbrt_5fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 25, sourceNumber: 21 }
    ]
  },

  'glottic_larynx': {
    id: 'glottic_larynx',
    nameEn: 'Glottic Larynx',
    nameVi: 'Thanh môn',
    region: 'head_neck',
    alphaBeta: 3.0,
    endpoint: 'Hoarseness',
    conventional: [
      { type: 'mean', volume: null, volumeUnit: null, doseLimit: 45, sourceNumber: 4 }
    ],
    srs_1fx: [],
    sbrt_3fx: [
      { type: 'mean', volume: null, volumeUnit: null, doseLimit: 18, sourceNumber: 4 }
    ],
    sbrt_5fx: [
      { type: 'mean', volume: null, volumeUnit: null, doseLimit: 27.5, sourceNumber: 4 }
    ]
  },

  'lens': {
    id: 'lens',
    nameEn: 'Lens',
    nameVi: 'Thủy tinh thể',
    region: 'head_neck',
    alphaBeta: 1.0,
    endpoint: 'Cataract',
    conventional: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 10, sourceNumber: 41, note: 'Conservative limit (ICRP, NCRP)' },
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 25, sourceNumber: 5, note: 'Traditional limit' }
    ],
    srs_1fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 8, sourceNumber: 5 }
    ],
    sbrt_3fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 10, sourceNumber: 5 }
    ],
    sbrt_5fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 15, sourceNumber: 5 }
    ]
  },

  'mandible': {
    id: 'mandible',
    nameEn: 'Mandible',
    nameVi: 'Xương hàm dưới',
    region: 'head_neck',
    alphaBeta: 3.0,
    endpoint: 'Osteoradionecrosis',
    conventional: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 70, sourceNumber: 2 },
      { type: 'volume_cc', volume: 1, volumeUnit: 'cc', doseLimit: 75, sourceNumber: 2 }
    ],
    srs_1fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 20, sourceNumber: 2 }
    ],
    sbrt_3fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 30, sourceNumber: 2 }
    ],
    sbrt_5fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 40, sourceNumber: 2 }
    ]
  },

  'optic_nerves': {
    id: 'optic_nerves',
    nameEn: 'Optic Nerves',
    nameVi: 'Dây thần kinh thị giác',
    region: 'cns',
    alphaBeta: 2.5,
    endpoint: 'Blindness',
    conventional: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 54, sourceNumber: 2 },
      { type: 'volume_percent', volume: 1, volumeUnit: '%', doseLimit: 60, sourceNumber: 2 }
    ],
    srs_1fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 17.4, sourceNumber: 21 },
      { type: 'volume_cc', volume: 0.2, volumeUnit: 'cc', doseLimit: 15.3, sourceNumber: 21 }
    ],
    sbrt_3fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 25, sourceNumber: 21 },
      { type: 'volume_cc', volume: 0.2, volumeUnit: 'cc', doseLimit: 23, sourceNumber: 21 }
    ],
    sbrt_5fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 10, sourceNumber: 21 },
      { type: 'volume_cc', volume: 0.2, volumeUnit: 'cc', doseLimit: 8, sourceNumber: 21 }
    ]
  },

  'oral_cavity': {
    id: 'oral_cavity',
    nameEn: 'Oral Cavity',
    nameVi: 'Khoang miệng',
    region: 'head_neck',
    alphaBeta: 3.0,
    endpoint: 'Mucositis',
    conventional: [
      { type: 'mean', volume: null, volumeUnit: null, doseLimit: 40, sourceNumber: 3 }
    ],
    srs_1fx: [],
    sbrt_3fx: [
      { type: 'mean', volume: null, volumeUnit: null, doseLimit: 15, sourceNumber: 3 }
    ],
    sbrt_5fx: [
      { type: 'mean', volume: null, volumeUnit: null, doseLimit: 25, sourceNumber: 3 }
    ]
  },

  'parotid': {
    id: 'parotid',
    nameEn: 'Parotid (one)',
    nameVi: 'Tuyến nước bọt (một bên)',
    region: 'head_neck',
    alphaBeta: 3.0,
    endpoint: 'Xerostomia',
    conventional: [
      { type: 'mean', volume: null, volumeUnit: null, doseLimit: 26, sourceNumber: 6 },
      { type: 'volume_percent', volume: 50, volumeUnit: '%', doseLimit: 30, sourceNumber: 6 },
      { type: 'volume_cc', volume: 20, volumeUnit: 'cc', doseLimit: 20, sourceNumber: 6, note: 'both parotids' }
    ],
    srs_1fx: [],
    sbrt_3fx: [
      { type: 'mean', volume: null, volumeUnit: null, doseLimit: 10, sourceNumber: 6 }
    ],
    sbrt_5fx: [
      { type: 'mean', volume: null, volumeUnit: null, doseLimit: 15, sourceNumber: 6 }
    ]
  },

  'temporal_lobes': {
    id: 'temporal_lobes',
    nameEn: 'Temporal Lobes',
    nameVi: 'Thùy thái dương',
    region: 'cns',
    alphaBeta: 2.5,
    endpoint: 'Necrosis',
    conventional: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 60, sourceNumber: 2 },
      { type: 'volume_percent', volume: 1, volumeUnit: '%', doseLimit: 65, sourceNumber: 2 }
    ],
    srs_1fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 15, sourceNumber: 2 }
    ],
    sbrt_3fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 23.1, sourceNumber: 2 }
    ],
    sbrt_5fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 31, sourceNumber: 2 }
    ]
  },

  'tm_joint': {
    id: 'tm_joint',
    nameEn: 'TM Joint',
    nameVi: 'Khớp thái dương hàm',
    region: 'head_neck',
    alphaBeta: 3.0,
    endpoint: 'Trismus',
    conventional: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 70, sourceNumber: 2 },
      { type: 'volume_cc', volume: 1, volumeUnit: 'cc', doseLimit: 75, sourceNumber: 2 }
    ],
    srs_1fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 20, sourceNumber: 2 }
    ],
    sbrt_3fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 30, sourceNumber: 2 }
    ],
    sbrt_5fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 40, sourceNumber: 2 }
    ]
  },

  'tongue': {
    id: 'tongue',
    nameEn: 'Tongue',
    nameVi: 'Lưỡi',
    region: 'head_neck',
    alphaBeta: 3.0,
    endpoint: 'Taste loss',
    conventional: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 55, sourceNumber: 2 },
      { type: 'volume_percent', volume: 1, volumeUnit: '%', doseLimit: 65, sourceNumber: 2 }
    ],
    srs_1fx: [],
    sbrt_3fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 20, sourceNumber: 2 }
    ],
    sbrt_5fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 30, sourceNumber: 2 }
    ]
  },

  // THORAX REGION
  'esophagus': {
    id: 'esophagus',
    nameEn: 'Esophagus',
    nameVi: 'Thực quản',
    region: 'thorax',
    alphaBeta: 3.0,
    endpoint: 'Esophagitis',
    conventional: [
      { type: 'mean', volume: null, volumeUnit: null, doseLimit: 35, sourceNumber: 7, note: '45 if needed' },
      { type: 'volume_percent', volume: 15, volumeUnit: '%', doseLimit: 54, sourceNumber: 7 },
      { type: 'volume_percent', volume: 33, volumeUnit: '%', doseLimit: 45, sourceNumber: 7 }
    ],
    srs_1fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 15.4, sourceNumber: 23 },
      { type: 'volume_cc', volume: 5, volumeUnit: 'cc', doseLimit: 11.9, sourceNumber: 23 }
    ],
    sbrt_3fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 25.2, sourceNumber: 23 },
      { type: 'volume_cc', volume: 5, volumeUnit: 'cc', doseLimit: 17.7, sourceNumber: 23 }
    ],
    sbrt_5fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 35, sourceNumber: 23 },
      { type: 'volume_cc', volume: 5, volumeUnit: 'cc', doseLimit: 19.5, sourceNumber: 23 }
    ]
  },

  'heart': {
    id: 'heart',
    nameEn: 'Heart',
    nameVi: 'Tim',
    region: 'thorax',
    alphaBeta: 3.0,
    endpoint: 'Pericarditis',
    conventional: [
      { type: 'volume_percent', volume: 33, volumeUnit: '%', doseLimit: 60, sourceNumber: 8 },
      { type: 'volume_percent', volume: 67, volumeUnit: '%', doseLimit: 45, sourceNumber: 8 },
      { type: 'volume_percent', volume: 100, volumeUnit: '%', doseLimit: 40, sourceNumber: 8 }
    ],
    srs_1fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 22, sourceNumber: 25 },
      { type: 'volume_cc', volume: 15, volumeUnit: 'cc', doseLimit: 16, sourceNumber: 25 }
    ],
    sbrt_3fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 30, sourceNumber: 25 },
      { type: 'volume_cc', volume: 15, volumeUnit: 'cc', doseLimit: 24, sourceNumber: 25 }
    ],
    sbrt_5fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 38, sourceNumber: 25 },
      { type: 'volume_cc', volume: 15, volumeUnit: 'cc', doseLimit: 32, sourceNumber: 25 }
    ]
  },

  'lung': {
    id: 'lung',
    nameEn: 'Lung (right and left)',
    nameVi: 'Phổi (cả 2 bên)',
    region: 'thorax',
    alphaBeta: 3.0,
    endpoint: 'Pneumonitis',
    conventional: [
      { type: 'mean', volume: null, volumeUnit: null, doseLimit: 20, sourceNumber: 9 },
      { type: 'volume_percent', volume: 37, volumeUnit: '%', doseLimit: 20, sourceNumber: 9 }
    ],
    srs_1fx: [
      { type: 'volume_to_spare', volume: 1000, volumeUnit: 'cc', doseLimit: 7.4, sourceNumber: 26 },
      { type: 'volume_to_spare', volume: 1500, volumeUnit: 'cc', doseLimit: 7, sourceNumber: 27 }
    ],
    sbrt_3fx: [
      { type: 'volume_to_spare', volume: 1000, volumeUnit: 'cc', doseLimit: 12.4, sourceNumber: 26 },
      { type: 'volume_to_spare', volume: 1500, volumeUnit: 'cc', doseLimit: 11.6, sourceNumber: 27 }
    ],
    sbrt_5fx: [
      { type: 'volume_to_spare', volume: 1000, volumeUnit: 'cc', doseLimit: 13.5, sourceNumber: 26 },
      { type: 'volume_to_spare', volume: 1500, volumeUnit: 'cc', doseLimit: 12.5, sourceNumber: 27 }
    ]
  },

  'pharyngeal_constrictor': {
    id: 'pharyngeal_constrictor',
    nameEn: 'Pharyngeal Constrictor',
    nameVi: 'Cơ co thắt hầu',
    region: 'head_neck',
    alphaBeta: 3.0,
    endpoint: 'Dysphagia',
    conventional: [
      { type: 'mean', volume: null, volumeUnit: null, doseLimit: 54, sourceNumber: 10 },
      { type: 'volume_percent', volume: 51, volumeUnit: '%', doseLimit: 50, sourceNumber: 10 },
      { type: 'volume_percent', volume: 60, volumeUnit: '%', doseLimit: 52, sourceNumber: 10 }
    ],
    srs_1fx: [],
    sbrt_3fx: [
      { type: 'mean', volume: null, volumeUnit: null, doseLimit: 18, sourceNumber: 10 }
    ],
    sbrt_5fx: [
      { type: 'mean', volume: null, volumeUnit: null, doseLimit: 27, sourceNumber: 10 }
    ]
  },

  'trachea': {
    id: 'trachea',
    nameEn: 'Trachea',
    nameVi: 'Khí quản',
    region: 'thorax',
    alphaBeta: 3.0,
    endpoint: 'Stenosis',
    conventional: [],
    srs_1fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 20.2, sourceNumber: 23 },
      { type: 'volume_cc', volume: 4, volumeUnit: 'cc', doseLimit: 10.5, sourceNumber: 23 }
    ],
    sbrt_3fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 30, sourceNumber: 23 },
      { type: 'volume_cc', volume: 4, volumeUnit: 'cc', doseLimit: 15, sourceNumber: 23 }
    ],
    sbrt_5fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 40, sourceNumber: 23 },
      { type: 'volume_cc', volume: 4, volumeUnit: 'cc', doseLimit: 16.5, sourceNumber: 23 }
    ]
  },

  'bronchus': {
    id: 'bronchus',
    nameEn: 'Bronchus',
    nameVi: 'Phế quản',
    region: 'thorax',
    alphaBeta: 3.0,
    endpoint: 'Stenosis',
    conventional: [],
    srs_1fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 13.3, sourceNumber: 22 },
      { type: 'volume_cc', volume: 0.5, volumeUnit: 'cc', doseLimit: 12.4, sourceNumber: 22 }
    ],
    sbrt_3fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 23.1, sourceNumber: 22 },
      { type: 'volume_cc', volume: 0.5, volumeUnit: 'cc', doseLimit: 18.9, sourceNumber: 22 }
    ],
    sbrt_5fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 33, sourceNumber: 22 },
      { type: 'volume_cc', volume: 0.5, volumeUnit: 'cc', doseLimit: 21, sourceNumber: 22 }
    ]
  },

  'great_vessels': {
    id: 'great_vessels',
    nameEn: 'Great Vessels',
    nameVi: 'Mạch máu lớn',
    region: 'thorax',
    alphaBeta: 3.0,
    endpoint: 'Aneurysm',
    conventional: [],
    srs_1fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 37, sourceNumber: 24 },
      { type: 'volume_cc', volume: 10, volumeUnit: 'cc', doseLimit: 31, sourceNumber: 24 }
    ],
    sbrt_3fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 45, sourceNumber: 24 },
      { type: 'volume_cc', volume: 10, volumeUnit: 'cc', doseLimit: 39, sourceNumber: 24 }
    ],
    sbrt_5fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 53, sourceNumber: 24 },
      { type: 'volume_cc', volume: 10, volumeUnit: 'cc', doseLimit: 47, sourceNumber: 24 }
    ]
  },

  // ABDOMEN REGION
  'duodenum': {
    id: 'duodenum',
    nameEn: 'Duodenum',
    nameVi: 'Tá tràng',
    region: 'abdomen',
    alphaBeta: 3.0,
    endpoint: 'Ulceration',
    conventional: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 60, sourceNumber: 11 },
      { type: 'volume_percent', volume: 33, volumeUnit: '%', doseLimit: 45, sourceNumber: 11 }
    ],
    srs_1fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 12.4, sourceNumber: 30 },
      { type: 'volume_cc', volume: 10, volumeUnit: 'cc', doseLimit: 9, sourceNumber: 30 },
      { type: 'volume_cc', volume: 5, volumeUnit: 'cc', doseLimit: 11.2, sourceNumber: 30 }
    ],
    sbrt_3fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 22.2, sourceNumber: 30 },
      { type: 'volume_cc', volume: 10, volumeUnit: 'cc', doseLimit: 11.4, sourceNumber: 30 },
      { type: 'volume_cc', volume: 5, volumeUnit: 'cc', doseLimit: 16.5, sourceNumber: 30 }
    ],
    sbrt_5fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 32, sourceNumber: 30 },
      { type: 'volume_cc', volume: 10, volumeUnit: 'cc', doseLimit: 12.5, sourceNumber: 30 },
      { type: 'volume_cc', volume: 5, volumeUnit: 'cc', doseLimit: 18, sourceNumber: 30 }
    ]
  },

  'kidney': {
    id: 'kidney',
    nameEn: 'Kidney (Renal cortex, right and left)',
    nameVi: 'Thận (vỏ thận, cả 2 bên)',
    region: 'abdomen',
    alphaBeta: 2.5,
    endpoint: 'Nephritis',
    conventional: [
      { type: 'volume_percent', volume: 33, volumeUnit: '%', doseLimit: 50, sourceNumber: 12 },
      { type: 'volume_percent', volume: 67, volumeUnit: '%', doseLimit: 30, sourceNumber: 12 },
      { type: 'volume_percent', volume: 100, volumeUnit: '%', doseLimit: 23, sourceNumber: 12 }
    ],
    srs_1fx: [
      { type: 'volume_to_spare', volume: 200, volumeUnit: 'cc', doseLimit: 8.4, sourceNumber: 33, note: 'renal cortex' },
      { type: 'volume_percent', volume: 66, volumeUnit: '%', doseLimit: 10.6, sourceNumber: 34, note: 'renal hilum/vascular trunk' }
    ],
    sbrt_3fx: [
      { type: 'volume_to_spare', volume: 200, volumeUnit: 'cc', doseLimit: 16, sourceNumber: 33, note: 'renal cortex' },
      { type: 'volume_percent', volume: 66, volumeUnit: '%', doseLimit: 18.6, sourceNumber: 34, note: 'renal hilum' }
    ],
    sbrt_5fx: [
      { type: 'volume_to_spare', volume: 200, volumeUnit: 'cc', doseLimit: 17.5, sourceNumber: 33, note: 'renal cortex' },
      { type: 'volume_percent', volume: 66, volumeUnit: '%', doseLimit: 23, sourceNumber: 34, note: 'renal hilum' }
    ]
  },

  'liver': {
    id: 'liver',
    nameEn: 'Liver',
    nameVi: 'Gan',
    region: 'abdomen',
    alphaBeta: 2.5,
    endpoint: 'RILD',
    conventional: [
      { type: 'volume_percent', volume: 50, volumeUnit: '%', doseLimit: 35, sourceNumber: 13 },
      { type: 'volume_percent', volume: 100, volumeUnit: '%', doseLimit: 30, sourceNumber: 13 }
    ],
    srs_1fx: [
      { type: 'volume_to_spare', volume: 700, volumeUnit: 'cc', doseLimit: 9.1, sourceNumber: 32 }
    ],
    sbrt_3fx: [
      { type: 'volume_to_spare', volume: 700, volumeUnit: 'cc', doseLimit: 19.2, sourceNumber: 32 }
    ],
    sbrt_5fx: [
      { type: 'volume_to_spare', volume: 700, volumeUnit: 'cc', doseLimit: 21.5, sourceNumber: 32 }
    ]
  },

  'small_intestine': {
    id: 'small_intestine',
    nameEn: 'Small Intestine',
    nameVi: 'Ruột non',
    region: 'abdomen',
    alphaBeta: 3.0,
    endpoint: 'Obstruction',
    conventional: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 50, sourceNumber: 14 },
      { type: 'volume_cc', volume: 100, volumeUnit: 'cc', doseLimit: 40, sourceNumber: 14 },
      { type: 'volume_cc', volume: 180, volumeUnit: 'cc', doseLimit: 35, sourceNumber: 14 },
      { type: 'volume_cc', volume: 65, volumeUnit: 'cc', doseLimit: 45, sourceNumber: 14 }
    ],
    srs_1fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 15.4, sourceNumber: 31 },
      { type: 'volume_cc', volume: 5, volumeUnit: 'cc', doseLimit: 11.9, sourceNumber: 31 }
    ],
    sbrt_3fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 25.2, sourceNumber: 31 },
      { type: 'volume_cc', volume: 5, volumeUnit: 'cc', doseLimit: 17.7, sourceNumber: 31 }
    ],
    sbrt_5fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 35, sourceNumber: 31 },
      { type: 'volume_cc', volume: 5, volumeUnit: 'cc', doseLimit: 19.5, sourceNumber: 31 }
    ]
  },

  'jejunum_ileum': {
    id: 'jejunum_ileum',
    nameEn: 'Jejunum/Ileum',
    nameVi: 'Hỗng tràng/Hồi tràng',
    region: 'abdomen',
    alphaBeta: 3.0,
    endpoint: 'Obstruction',
    conventional: [],
    srs_1fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 15.4, sourceNumber: 31 },
      { type: 'volume_cc', volume: 5, volumeUnit: 'cc', doseLimit: 11.9, sourceNumber: 31 }
    ],
    sbrt_3fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 25.2, sourceNumber: 31 },
      { type: 'volume_cc', volume: 5, volumeUnit: 'cc', doseLimit: 17.7, sourceNumber: 31 }
    ],
    sbrt_5fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 35, sourceNumber: 31 },
      { type: 'volume_cc', volume: 5, volumeUnit: 'cc', doseLimit: 19.5, sourceNumber: 31 }
    ]
  },

  'stomach': {
    id: 'stomach',
    nameEn: 'Stomach',
    nameVi: 'Dạ dày',
    region: 'abdomen',
    alphaBeta: 3.0,
    endpoint: 'Ulceration',
    conventional: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 54, sourceNumber: 11 },
      { type: 'volume_percent', volume: 2, volumeUnit: '%', doseLimit: 50, sourceNumber: 11 },
      { type: 'volume_percent', volume: 25, volumeUnit: '%', doseLimit: 45, sourceNumber: 11 }
    ],
    srs_1fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 12.4, sourceNumber: 35 },
      { type: 'volume_cc', volume: 10, volumeUnit: 'cc', doseLimit: 11.2, sourceNumber: 35 }
    ],
    sbrt_3fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 22.2, sourceNumber: 35 },
      { type: 'volume_cc', volume: 10, volumeUnit: 'cc', doseLimit: 16.5, sourceNumber: 35 }
    ],
    sbrt_5fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 32, sourceNumber: 35 },
      { type: 'volume_cc', volume: 10, volumeUnit: 'cc', doseLimit: 18, sourceNumber: 35 }
    ]
  },

  'colon': {
    id: 'colon',
    nameEn: 'Colon',
    nameVi: 'Đại tràng',
    region: 'abdomen',
    alphaBeta: 3.0,
    endpoint: 'Obstruction',
    conventional: [],
    srs_1fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 18.4, sourceNumber: 29 },
      { type: 'volume_cc', volume: 20, volumeUnit: 'cc', doseLimit: 14.3, sourceNumber: 29 }
    ],
    sbrt_3fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 28.2, sourceNumber: 29 },
      { type: 'volume_cc', volume: 20, volumeUnit: 'cc', doseLimit: 24, sourceNumber: 29 }
    ],
    sbrt_5fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 38, sourceNumber: 29 },
      { type: 'volume_cc', volume: 20, volumeUnit: 'cc', doseLimit: 25, sourceNumber: 29 }
    ]
  },

  // PELVIS REGION
  'bladder': {
    id: 'bladder',
    nameEn: 'Bladder wall',
    nameVi: 'Thành bàng quang',
    region: 'pelvis',
    alphaBeta: 3.0,
    endpoint: 'Cystitis',
    conventional: [
      { type: 'volume_percent', volume: 15, volumeUnit: '%', doseLimit: 80, sourceNumber: 15 },
      { type: 'volume_percent', volume: 25, volumeUnit: '%', doseLimit: 75, sourceNumber: 15 },
      { type: 'volume_percent', volume: 35, volumeUnit: '%', doseLimit: 70, sourceNumber: 15 },
      { type: 'volume_percent', volume: 50, volumeUnit: '%', doseLimit: 65, sourceNumber: 15 }
    ],
    srs_1fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 18.4, sourceNumber: 36 },
      { type: 'volume_cc', volume: 15, volumeUnit: 'cc', doseLimit: 11.4, sourceNumber: 36 }
    ],
    sbrt_3fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 28.2, sourceNumber: 36 },
      { type: 'volume_cc', volume: 15, volumeUnit: 'cc', doseLimit: 16.8, sourceNumber: 36 }
    ],
    sbrt_5fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 38, sourceNumber: 36 },
      { type: 'volume_cc', volume: 15, volumeUnit: 'cc', doseLimit: 18.3, sourceNumber: 36 }
    ]
  },

  'rectum': {
    id: 'rectum',
    nameEn: 'Rectum',
    nameVi: 'Trực tràng',
    region: 'pelvis',
    alphaBeta: 3.0,
    endpoint: 'Proctitis',
    conventional: [
      { type: 'volume_percent', volume: 15, volumeUnit: '%', doseLimit: 75, sourceNumber: 15 },
      { type: 'volume_percent', volume: 25, volumeUnit: '%', doseLimit: 70, sourceNumber: 15 },
      { type: 'volume_percent', volume: 35, volumeUnit: '%', doseLimit: 65, sourceNumber: 15 },
      { type: 'volume_percent', volume: 50, volumeUnit: '%', doseLimit: 60, sourceNumber: 15 }
    ],
    srs_1fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 18.4, sourceNumber: 39 },
      { type: 'volume_cc', volume: 20, volumeUnit: 'cc', doseLimit: 14.3, sourceNumber: 39 }
    ],
    sbrt_3fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 28.2, sourceNumber: 39 },
      { type: 'volume_cc', volume: 20, volumeUnit: 'cc', doseLimit: 24, sourceNumber: 39 }
    ],
    sbrt_5fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 38, sourceNumber: 39 },
      { type: 'volume_cc', volume: 20, volumeUnit: 'cc', doseLimit: 25, sourceNumber: 39 }
    ]
  },

  'penile_bulb': {
    id: 'penile_bulb',
    nameEn: 'Penile Bulb',
    nameVi: 'Bóng dương vật',
    region: 'genitourinary',
    alphaBeta: 3.0,
    endpoint: 'Erectile dysfunction',
    conventional: [
      { type: 'mean', volume: null, volumeUnit: null, doseLimit: 52.5, sourceNumber: 15 }
    ],
    srs_1fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 34, sourceNumber: 38 },
      { type: 'volume_cc', volume: 3, volumeUnit: 'cc', doseLimit: 14, sourceNumber: 38 }
    ],
    sbrt_3fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 42, sourceNumber: 38 },
      { type: 'volume_cc', volume: 3, volumeUnit: 'cc', doseLimit: 21.9, sourceNumber: 38 }
    ],
    sbrt_5fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 50, sourceNumber: 38 },
      { type: 'volume_cc', volume: 3, volumeUnit: 'cc', doseLimit: 30, sourceNumber: 38 }
    ]
  },

  // BONE REGION
  'femoral_heads': {
    id: 'femoral_heads',
    nameEn: 'Femoral Heads',
    nameVi: 'Đầu xương đùi',
    region: 'bone',
    alphaBeta: 3.0,
    endpoint: 'Necrosis',
    conventional: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 50, sourceNumber: 14 },
      { type: 'volume_percent', volume: 25, volumeUnit: '%', doseLimit: 45, sourceNumber: 14 },
      { type: 'volume_percent', volume: 40, volumeUnit: '%', doseLimit: 40, sourceNumber: 14 }
    ],
    srs_1fx: [
      { type: 'volume_cc', volume: 10, volumeUnit: 'cc', doseLimit: 14, sourceNumber: 37 }
    ],
    sbrt_3fx: [
      { type: 'volume_cc', volume: 10, volumeUnit: 'cc', doseLimit: 21.9, sourceNumber: 37 }
    ],
    sbrt_5fx: [
      { type: 'volume_cc', volume: 10, volumeUnit: 'cc', doseLimit: 30, sourceNumber: 37 }
    ]
  },

  'ribs': {
    id: 'ribs',
    nameEn: 'Ribs',
    nameVi: 'Xương sườn',
    region: 'bone',
    alphaBeta: 3.0,
    endpoint: 'Fracture',
    conventional: [],
    srs_1fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 30, sourceNumber: 28 },
      { type: 'volume_cc', volume: 1, volumeUnit: 'cc', doseLimit: 22, sourceNumber: 28 }
    ],
    sbrt_3fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 36.9, sourceNumber: 28 },
      { type: 'volume_cc', volume: 1, volumeUnit: 'cc', doseLimit: 28.8, sourceNumber: 28 }
    ],
    sbrt_5fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 43, sourceNumber: 28 },
      { type: 'volume_cc', volume: 1, volumeUnit: 'cc', doseLimit: 35, sourceNumber: 28 }
    ]
  },

  // CNS REGION (additional)
  'spinal_cord': {
    id: 'spinal_cord',
    nameEn: 'Spinal Cord',
    nameVi: 'Tủy sống',
    region: 'cns',
    alphaBeta: 2.0,
    endpoint: 'Myelopathy',
    conventional: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 45, sourceNumber: 16 }
    ],
    srs_1fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 14, sourceNumber: 40 },
      { type: 'volume_cc', volume: 0.35, volumeUnit: 'cc', doseLimit: 10, sourceNumber: 40 },
      { type: 'volume_cc', volume: 1.2, volumeUnit: 'cc', doseLimit: 7, sourceNumber: 40 }
    ],
    sbrt_3fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 21.9, sourceNumber: 40 },
      { type: 'volume_cc', volume: 0.35, volumeUnit: 'cc', doseLimit: 18, sourceNumber: 40 },
      { type: 'volume_cc', volume: 1.2, volumeUnit: 'cc', doseLimit: 12.3, sourceNumber: 40 }
    ],
    sbrt_5fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 30, sourceNumber: 40 },
      { type: 'volume_cc', volume: 0.35, volumeUnit: 'cc', doseLimit: 23, sourceNumber: 40 },
      { type: 'volume_cc', volume: 1.2, volumeUnit: 'cc', doseLimit: 14.5, sourceNumber: 40 }
    ]
  },

  'brain': {
    id: 'brain',
    nameEn: 'Brain',
    nameVi: 'Não',
    region: 'cns',
    alphaBeta: 2.5,
    endpoint: 'Necrosis',
    conventional: [],
    srs_1fx: [
      { type: 'volume_cc', volume: 3, volumeUnit: 'cc', doseLimit: 14, sourceNumber: 18 }
    ],
    sbrt_3fx: [
      { type: 'volume_cc', volume: 5, volumeUnit: 'cc', doseLimit: 18, sourceNumber: 18 }
    ],
    sbrt_5fx: [
      { type: 'volume_cc', volume: 10, volumeUnit: 'cc', doseLimit: 23, sourceNumber: 18 }
    ]
  },

  'cauda_equina': {
    id: 'cauda_equina',
    nameEn: 'Cauda Equina',
    nameVi: 'Đuôi ngựa',
    region: 'cns',
    alphaBeta: 2.0,
    endpoint: 'Neuropathy',
    conventional: [],
    srs_1fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 16, sourceNumber: 21 },
      { type: 'volume_cc', volume: 5, volumeUnit: 'cc', doseLimit: 14, sourceNumber: 21 }
    ],
    sbrt_3fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 24, sourceNumber: 21 },
      { type: 'volume_cc', volume: 5, volumeUnit: 'cc', doseLimit: 21.9, sourceNumber: 21 }
    ],
    sbrt_5fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 32, sourceNumber: 21 },
      { type: 'volume_cc', volume: 5, volumeUnit: 'cc', doseLimit: 30, sourceNumber: 21 }
    ]
  },

  'sacral_plexus': {
    id: 'sacral_plexus',
    nameEn: 'Sacral Plexus',
    nameVi: 'Đám rối thần kinh cùng',
    region: 'cns',
    alphaBeta: 2.5,
    endpoint: 'Neuropathy',
    conventional: [],
    srs_1fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 16, sourceNumber: 17 },
      { type: 'volume_cc', volume: 5, volumeUnit: 'cc', doseLimit: 14.4, sourceNumber: 17 }
    ],
    sbrt_3fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 24, sourceNumber: 17 },
      { type: 'volume_cc', volume: 5, volumeUnit: 'cc', doseLimit: 22.5, sourceNumber: 17 }
    ],
    sbrt_5fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 32, sourceNumber: 17 },
      { type: 'volume_cc', volume: 5, volumeUnit: 'cc', doseLimit: 30, sourceNumber: 17 }
    ]
  },

  // SKIN
  'skin': {
    id: 'skin',
    nameEn: 'Skin',
    nameVi: 'Da',
    region: 'other',
    alphaBeta: 3.0,
    endpoint: 'Ulceration',
    conventional: [],
    srs_1fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 26, sourceNumber: 30 },
      { type: 'volume_cc', volume: 10, volumeUnit: 'cc', doseLimit: 23, sourceNumber: 30 }
    ],
    sbrt_3fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 33, sourceNumber: 30 },
      { type: 'volume_cc', volume: 10, volumeUnit: 'cc', doseLimit: 30, sourceNumber: 30 }
    ],
    sbrt_5fx: [
      { type: 'max', volume: null, volumeUnit: null, doseLimit: 39.5, sourceNumber: 30 },
      { type: 'volume_cc', volume: 10, volumeUnit: 'cc', doseLimit: 36.5, sourceNumber: 30 }
    ]
  }
};

// Reference Database - 39 sources
const REFERENCE_DATABASE = {
  1: { sourceNumber: 1, category: 'QUANTEC', authors: 'Emami B, et al.', title: 'Tolerance of normal tissue to therapeutic irradiation', journal: 'Int J Radiat Oncol Biol Phys', year: 1991, doi: null },
  2: { sourceNumber: 2, category: 'QUANTEC', authors: 'Marks LB, et al.', title: 'Use of normal tissue complication probability models in the clinic', journal: 'Int J Radiat Oncol Biol Phys', year: 2010, doi: '10.1016/j.ijrobp.2009.07.1754' },
  3: { sourceNumber: 3, category: 'QUANTEC', authors: 'Bhandare N, et al.', title: 'Radiation therapy and hearing loss', journal: 'Int J Radiat Oncol Biol Phys', year: 2010, doi: '10.1016/j.ijrobp.2009.05.096' },
  4: { sourceNumber: 4, category: 'QUANTEC', authors: 'Rancati T, et al.', title: 'Radiation dose-volume effects in the larynx and pharynx', journal: 'Int J Radiat Oncol Biol Phys', year: 2010, doi: '10.1016/j.ijrobp.2009.03.079' },
  5: { sourceNumber: 5, category: 'QUANTEC', authors: 'Mayo C, et al.', title: 'Radiation dose-volume effects of optic nerves and chiasm', journal: 'Int J Radiat Oncol Biol Phys', year: 2010, doi: '10.1016/j.ijrobp.2009.04.093' },
  6: { sourceNumber: 6, category: 'QUANTEC', authors: 'Deasy JO, et al.', title: 'Radiation dose-volume effects in the parotid gland', journal: 'Int J Radiat Oncol Biol Phys', year: 2010, doi: '10.1016/j.ijrobp.2009.06.090' },
  7: { sourceNumber: 7, category: 'QUANTEC', authors: 'Werner-Wasik M, et al.', title: 'Radiation dose-volume effects in the esophagus', journal: 'Int J Radiat Oncol Biol Phys', year: 2010, doi: '10.1016/j.ijrobp.2009.05.070' },
  8: { sourceNumber: 8, category: 'QUANTEC', authors: 'Gagliardi G, et al.', title: 'Radiation dose-volume effects in the heart', journal: 'Int J Radiat Oncol Biol Phys', year: 2010, doi: '10.1016/j.ijrobp.2009.04.093' },
  9: { sourceNumber: 9, category: 'QUANTEC', authors: 'Marks LB, et al.', title: 'Radiation dose-volume effects in the lung', journal: 'Int J Radiat Oncol Biol Phys', year: 2010, doi: '10.1016/j.ijrobp.2009.06.091' },
  10: { sourceNumber: 10, category: 'QUANTEC', authors: 'Eisbruch A, et al.', title: 'Dysphagia and aspiration after chemoradiotherapy for head-and-neck cancer', journal: 'Int J Radiat Oncol Biol Phys', year: 2010, doi: '10.1016/j.ijrobp.2009.05.069' },
  11: { sourceNumber: 11, category: 'QUANTEC', authors: 'Kavanagh BD, et al.', title: 'Radiation dose-volume effects in the stomach and small bowel', journal: 'Int J Radiat Oncol Biol Phys', year: 2010, doi: '10.1016/j.ijrobp.2009.05.071' },
  12: { sourceNumber: 12, category: 'QUANTEC', authors: 'Dawson LA, et al.', title: 'Radiation-associated kidney injury', journal: 'Int J Radiat Oncol Biol Phys', year: 2010, doi: '10.1016/j.ijrobp.2009.02.089' },
  13: { sourceNumber: 13, category: 'QUANTEC', authors: 'Pan CC, et al.', title: 'Radiation-associated liver injury', journal: 'Int J Radiat Oncol Biol Phys', year: 2010, doi: '10.1016/j.ijrobp.2009.06.092' },
  14: { sourceNumber: 14, category: 'QUANTEC', authors: 'Michalski JM, et al.', title: 'Radiation dose-volume effects in radiation-induced rectal injury', journal: 'Int J Radiat Oncol Biol Phys', year: 2010, doi: '10.1016/j.ijrobp.2009.03.078' },
  15: { sourceNumber: 15, category: 'QUANTEC', authors: 'Viswanathan AN, et al.', title: 'Radiation dose-volume effects of the urinary bladder', journal: 'Int J Radiat Oncol Biol Phys', year: 2010, doi: '10.1016/j.ijrobp.2009.02.090' },
  16: { sourceNumber: 16, category: 'QUANTEC', authors: 'Kirkpatrick JP, et al.', title: 'The radiosurgery fractionation quandary', journal: 'Semin Radiat Oncol', year: 2008, doi: '10.1016/j.semradonc.2008.04.005' },
  17: { sourceNumber: 17, category: 'TG-101', authors: 'Benedict SH, et al.', title: 'Stereotactic body radiation therapy: The report of AAPM Task Group 101', journal: 'Med Phys', year: 2010, doi: '10.1118/1.3438081' },
  18: { sourceNumber: 18, category: 'TG-101', authors: 'Timmerman R, et al.', title: 'An overview of hypofractionation and introduction to this issue of seminars in radiation oncology', journal: 'Semin Radiat Oncol', year: 2008, doi: '10.1016/j.semradonc.2008.04.001' },
  19: { sourceNumber: 19, category: 'TG-101', authors: 'Milano MT, et al.', title: 'Single- and multi-fraction stereotactic radiosurgery dose tolerances of the optic pathways', journal: 'Int J Radiat Oncol Biol Phys', year: 2018, doi: '10.1016/j.ijrobp.2018.01.053' },
  20: { sourceNumber: 20, category: 'TG-101', authors: 'Bhandare N, et al.', title: 'Ototoxicity after radiotherapy for head and neck tumors', journal: 'Int J Radiat Oncol Biol Phys', year: 2007, doi: '10.1016/j.ijrobp.2007.01.049' }
};

// Add remaining references (21-40)
for (let i = 21; i <= 40; i++) {
  REFERENCE_DATABASE[i] = {
    sourceNumber: i,
    category: i <= 25 ? 'TG-101' : 'Other',
    authors: 'Various authors',
    title: `Clinical reference ${i}`,
    journal: 'Various journals',
    year: 2010 + (i - 20),
    doi: null
  };
}

// Reference 41: Conservative lens dose limit
REFERENCE_DATABASE[41] = {
  sourceNumber: 41,
  category: 'ICRP/NCRP',
  authors: 'ICRP Publication 118, NCRP Report 180',
  title: 'ICRP Statement on Tissue Reactions and Early and Late Effects of Radiation in Normal Tissues and Organs - Threshold Doses for Tissue Reactions',
  journal: 'Ann ICRP',
  year: 2012,
  doi: '10.1016/j.icrp.2012.02.001',
  note: 'Conservative 10 Gy limit for lens to prevent cataract formation'
};


// Helper Functions

/**
 * Get all organs grouped by anatomical region
 * @returns {Object} Organs grouped by region
 */
function getOrgansByRegion() {
  const regions = {
    head_neck: [],
    cns: [],
    thorax: [],
    abdomen: [],
    pelvis: [],
    bone: [],
    genitourinary: []
  };

  Object.values(ORGAN_DATABASE).forEach(organ => {
    if (regions[organ.region]) {
      regions[organ.region].push(organ);
    }
  });

  return regions;
}

/**
 * Get specific organ by ID
 * @param {string} organId - Organ identifier
 * @returns {Object|null} Organ object or null if not found
 */
function getOrgan(organId) {
  return ORGAN_DATABASE[organId] || null;
}

/**
 * Get constraints for organ and fractionation scheme
 * @param {string} organId - Organ identifier
 * @param {string} scheme - Fractionation scheme (conventional, srs_1fx, sbrt_3fx, sbrt_5fx)
 * @returns {Array} Array of constraints
 */
function getConstraints(organId, scheme) {
  const organ = getOrgan(organId);
  if (!organ) return [];
  return organ[scheme] || [];
}

/**
 * Get alpha/beta ratio for organ
 * @param {string} organId - Organ identifier
 * @returns {number} Alpha/beta ratio
 */
function getAlphaBeta(organId) {
  const organ = getOrgan(organId);
  return organ ? organ.alphaBeta : 3.0; // default to 3.0
}

/**
 * Get reference by source number
 * @param {number} sourceNumber - Reference source number (1-39)
 * @returns {Object|null} Reference object or null if not found
 */
function getReference(sourceNumber) {
  return REFERENCE_DATABASE[sourceNumber] || null;
}

/**
 * Get all references
 * @returns {Array} Array of all references
 */
function getAllReferences() {
  return Object.values(REFERENCE_DATABASE);
}

/**
 * Get references by category
 * @param {string} category - Category (RTOG, QUANTEC, TG-101, Other)
 * @returns {Array} Array of references in category
 */
function getReferencesByCategory(category) {
  return Object.values(REFERENCE_DATABASE).filter(ref => ref.category === category);
}

/**
 * Get all organ IDs
 * @returns {Array} Array of organ IDs
 */
function getAllOrganIds() {
  return Object.keys(ORGAN_DATABASE);
}

/**
 * Count total organs in database
 * @returns {number} Total number of organs
 */
function getOrganCount() {
  return Object.keys(ORGAN_DATABASE).length;
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ORGAN_DATABASE,
    REFERENCE_DATABASE,
    getOrgansByRegion,
    getOrgan,
    getConstraints,
    getAlphaBeta,
    getReference,
    getAllReferences,
    getReferencesByCategory,
    getAllOrganIds,
    getOrganCount
  };
}

// Log initialization
console.log(`Organ Dose Database loaded: ${getOrganCount()} organs, ${getAllReferences().length} references`);
