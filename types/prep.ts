export type PrepStatus =
  | "expired"
  | "expires_today"
  | "expires_soon"
  | "valid"
  | "consumed"
  | "discarded";

export type PrepCategory =
  | "Syrup"
  | "Puree"
  | "Juice"
  | "Garnish"
  | "BatchCocktail"
  | "Other";

export interface Prep {
  id: string;
  name: string;
  category: PrepCategory;
  madeAt: string;
  expiresAt: string;
  responsible: string;
  area: string;
  status: PrepStatus;
  daysRemaining: number;
  quantity?: number;
  unit?: string;
  notes?: string;
}

export interface Alert {
  id: string;
  productName: string;
  message: string;
  area: string;
  status: PrepStatus;
  responsible?: string;
}
