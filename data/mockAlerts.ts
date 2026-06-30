import type { Alert } from "@/types/prep";

export const alerts: Alert[] = [
  {
    id: "1",
    productName: "Pure de Morango",
    message: "Venceu em: 21/06/2026",
    area: "Bar Principal",
    status: "expired",
    responsible: "Ana",
  },
  {
    id: "2",
    productName: "Xarope de Gengibre",
    message: "Vence hoje: 30/06/2026",
    area: "Bar Principal",
    status: "expires_today",
    responsible: "Maria",
  },
  {
    id: "3",
    productName: "Suco de Limao",
    message: "Vence amanha: 01/07/2026",
    area: "Bar Principal",
    status: "expires_soon",
    responsible: "Joao",
  },
];
