import { computeStatus, type LifecycleStatus, type PrepStatus } from "./prepStatus.js";
import { toDisplayDate } from "./formatDate.js";

export interface PrepRow {
  id: string;
  name: string;
  category: string;
  area: string;
  responsible: string;
  made_at: string;
  expires_at: string;
  lifecycle_status: LifecycleStatus;
  quantity: number | null;
  unit: string | null;
  notes: string | null;
  created_at: string;
}

export interface PrepResponse {
  id: string;
  name: string;
  category: string;
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

export function toPrepResponse(row: PrepRow): PrepResponse {
  const { status, daysRemaining } = computeStatus({
    lifecycleStatus: row.lifecycle_status,
    expiresAt: row.expires_at,
  });

  return {
    id: row.id,
    name: row.name,
    category: row.category,
    madeAt: toDisplayDate(row.made_at),
    expiresAt: toDisplayDate(row.expires_at),
    responsible: row.responsible,
    area: row.area,
    status,
    daysRemaining,
    quantity: row.quantity ?? undefined,
    unit: row.unit ?? undefined,
    notes: row.notes ?? undefined,
  };
}
