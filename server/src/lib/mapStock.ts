export interface StockItemRow {
  id: string;
  name: string;
  category: string;
  current_quantity: number;
  minimum_quantity: number;
  unit: string;
  created_at: string;
}

export type StockStatus = "low_stock" | "ok";

export interface StockItemResponse {
  id: string;
  name: string;
  category: string;
  currentQuantity: number;
  minimumQuantity: number;
  unit: string;
  status: StockStatus;
}

export function toStockItemResponse(row: StockItemRow): StockItemResponse {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    currentQuantity: row.current_quantity,
    minimumQuantity: row.minimum_quantity,
    unit: row.unit,
    status: row.current_quantity <= row.minimum_quantity ? "low_stock" : "ok",
  };
}
