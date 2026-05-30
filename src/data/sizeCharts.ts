// Size charts sourced from Nike/Adidas public size guides

export type SizeChartCategory = "sneakers" | "clothing_top" | "clothing_bottom";

export interface SneakersRow {
  cmRange: [number, number]; // foot length range [min, max)
  EU: number;
  UK: number;
  US_M: number;
  US_W: number;
}

export interface ClothingRow {
  label: string;
  measureRange: [number, number]; // cm [min, max)
  productSizeValue: number; // maps to Product.sizes numeric value
}

export const sneakersChart: SneakersRow[] = [
  { cmRange: [22.0, 22.5], EU: 35,   UK: 2.5, US_M: 4,    US_W: 5    },
  { cmRange: [22.5, 23.0], EU: 36,   UK: 3,   US_M: 4.5,  US_W: 5.5  },
  { cmRange: [23.0, 23.5], EU: 37,   UK: 4,   US_M: 5,    US_W: 6    },
  { cmRange: [23.5, 24.0], EU: 38,   UK: 5,   US_M: 6,    US_W: 7    },
  { cmRange: [24.0, 24.5], EU: 39,   UK: 5.5, US_M: 6.5,  US_W: 7.5  },
  { cmRange: [24.5, 25.0], EU: 40,   UK: 6,   US_M: 7,    US_W: 8    },
  { cmRange: [25.0, 25.5], EU: 40.5, UK: 6.5, US_M: 7.5,  US_W: 8.5  },
  { cmRange: [25.5, 26.0], EU: 41,   UK: 7,   US_M: 8,    US_W: 9    },
  { cmRange: [26.0, 26.5], EU: 42,   UK: 7.5, US_M: 8.5,  US_W: 9.5  },
  { cmRange: [26.5, 27.0], EU: 42.5, UK: 8,   US_M: 9,    US_W: 10   },
  { cmRange: [27.0, 27.5], EU: 43,   UK: 8.5, US_M: 9.5,  US_W: 10.5 },
  { cmRange: [27.5, 28.0], EU: 44,   UK: 9,   US_M: 10,   US_W: 11   },
  { cmRange: [28.0, 28.5], EU: 44.5, UK: 9.5, US_M: 10.5, US_W: 11.5 },
  { cmRange: [28.5, 29.0], EU: 45,   UK: 10,  US_M: 11,   US_W: 12   },
  { cmRange: [29.0, 29.5], EU: 45.5, UK: 10.5,US_M: 11.5, US_W: 12.5 },
  { cmRange: [29.5, 30.0], EU: 46,   UK: 11,  US_M: 12,   US_W: 13   },
  { cmRange: [30.0, 30.5], EU: 47,   UK: 12,  US_M: 13,   US_W: 14   },
  { cmRange: [30.5, 31.0], EU: 47.5, UK: 12.5,US_M: 13.5, US_W: 14.5 },
];

// Product.sizes for apparel use 1=XS, 2=S, 3=M, 4=L, 5=XL, 6=XXL
export const clothingTopChart: ClothingRow[] = [
  { label: "XS", measureRange: [76, 81],   productSizeValue: 1 },
  { label: "S",  measureRange: [81, 86],   productSizeValue: 2 },
  { label: "M",  measureRange: [86, 91],   productSizeValue: 3 },
  { label: "L",  measureRange: [91, 97],   productSizeValue: 4 },
  { label: "XL", measureRange: [97, 104],  productSizeValue: 5 },
  { label: "XXL",measureRange: [104, 112], productSizeValue: 6 },
];

export const clothingBottomChart: ClothingRow[] = [
  { label: "XS", measureRange: [60, 64],  productSizeValue: 1 },
  { label: "S",  measureRange: [64, 68],  productSizeValue: 2 },
  { label: "M",  measureRange: [68, 73],  productSizeValue: 3 },
  { label: "L",  measureRange: [73, 79],  productSizeValue: 4 },
  { label: "XL", measureRange: [79, 86],  productSizeValue: 5 },
  { label: "XXL",measureRange: [86, 94],  productSizeValue: 6 },
];

export function findSneakerRow(cm: number): SneakersRow | null {
  return sneakersChart.find(
    (row) => cm >= row.cmRange[0] && cm < row.cmRange[1]
  ) ?? null;
}

export function findClothingRow(chart: ClothingRow[], cm: number): ClothingRow | null {
  return chart.find(
    (row) => cm >= row.measureRange[0] && cm < row.measureRange[1]
  ) ?? null;
}
