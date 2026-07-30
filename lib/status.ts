import type { PrepStatus } from "@/types/prep";

export function getStatusLabel(status: PrepStatus): string {
  switch (status) {
    case "expired":
      return "Vencido";
    case "expires_today":
      return "Vence hoje";
    case "expires_soon":
      return "Vence em breve";
    case "valid":
      return "OK";
    case "consumed":
      return "Consumido";
    case "discarded":
      return "Descartado";
    default:
      return "Desconhecido";
  }
}

export function getStatusShortLabel(status: PrepStatus): string {
  switch (status) {
    case "expired":
      return "VENCIDO";
    case "expires_today":
      return "VENCE HOJE";
    case "expires_soon":
      return "VENCE EM BREVE";
    case "valid":
      return "OK";
    case "consumed":
      return "CONSUMIDO";
    case "discarded":
      return "DESCARTADO";
    default:
      return "DESCONHECIDO";
  }
}

export function getStatusClass(status: PrepStatus): string {
  switch (status) {
    case "expired":
      return "border-[#f87171]/40 bg-[#f87171]/15 text-[#fecaca] theme-light:text-red-700";
    case "expires_today":
      return "border-[#fbbf24]/40 bg-[#fbbf24]/15 text-[#fde68a] theme-light:text-amber-700";
    case "expires_soon":
      return "border-[#fbbf24]/40 bg-[#fbbf24]/15 text-[#fde68a] theme-light:text-amber-700";
    case "valid":
      return "border-[#42fbf2]/40 bg-[#42fbf2]/15 text-[#bffffb] theme-light:text-cyan-700";
    case "consumed":
      return "border-[#42fbf2]/40 bg-[#42fbf2]/15 text-[#bffffb] theme-light:text-cyan-700";
    case "discarded":
      return "border-zinc-300/25 bg-zinc-300/10 text-zinc-200 theme-light:text-zinc-700";
    default:
      return "border-zinc-300/25 bg-zinc-300/10 text-zinc-200 theme-light:text-zinc-700";
  }
}

export function getStatusAccentClass(status: PrepStatus): string {
  switch (status) {
    case "expired":
      return "bg-[#f87171]";
    case "expires_today":
      return "bg-[#fbbf24]";
    case "expires_soon":
      return "bg-[#fbbf24]";
    case "valid":
      return "bg-[#42fbf2]";
    case "consumed":
      return "bg-[#42fbf2]";
    case "discarded":
      return "bg-zinc-300";
    default:
      return "bg-zinc-300";
  }
}
