import { diffInDays, todayIso, toDisplayDate } from "./formatDate.js";

export type LifecycleStatus = "active" | "consumed" | "discarded";
export type PrepStatus = "expired" | "expires_today" | "expires_soon" | "valid" | "consumed" | "discarded";

export function computeStatus(params: { lifecycleStatus: LifecycleStatus; expiresAt: string }): {
  status: PrepStatus;
  daysRemaining: number;
} {
  const daysRemaining = diffInDays(params.expiresAt, todayIso());

  if (params.lifecycleStatus === "consumed" || params.lifecycleStatus === "discarded") {
    return { status: params.lifecycleStatus, daysRemaining };
  }

  if (daysRemaining < 0) {
    return { status: "expired", daysRemaining };
  }

  if (daysRemaining === 0) {
    return { status: "expires_today", daysRemaining };
  }

  if (daysRemaining <= 2) {
    return { status: "expires_soon", daysRemaining };
  }

  return { status: "valid", daysRemaining };
}

export function buildAlertMessage(status: PrepStatus, daysRemaining: number, expiresAt: string): string {
  const displayDate = toDisplayDate(expiresAt);

  if (status === "expired") {
    return `Venceu em: ${displayDate}`;
  }

  if (status === "expires_today") {
    return `Vence hoje: ${displayDate}`;
  }

  if (daysRemaining === 1) {
    return `Vence amanha: ${displayDate}`;
  }

  return `Vence em ${daysRemaining} dias: ${displayDate}`;
}
