export type StockStatus = "low_stock" | "ok";

export interface StockItem {
  id: string;
  name: string;
  category: string;
  currentQuantity: number;
  minimumQuantity: number;
  unit: string;
  status: StockStatus;
}
