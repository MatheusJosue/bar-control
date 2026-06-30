import type { StockItem } from "@/types/stock";

export const stockItems: StockItem[] = [
  {
    id: "1",
    name: "Coca-Cola Zero",
    category: "Soft Drink",
    currentQuantity: 8,
    minimumQuantity: 12,
    unit: "garrafas",
    status: "low_stock",
  },
  {
    id: "2",
    name: "Gin Tanqueray",
    category: "Spirit",
    currentQuantity: 2,
    minimumQuantity: 3,
    unit: "garrafas",
    status: "low_stock",
  },
  {
    id: "3",
    name: "Agua Tonica",
    category: "Soft Drink",
    currentQuantity: 24,
    minimumQuantity: 10,
    unit: "unidades",
    status: "ok",
  },
];
