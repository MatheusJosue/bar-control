export function formatDaysRemaining(daysRemaining: number): string {
  if (daysRemaining < 0) {
    return "Vencido";
  }

  if (daysRemaining === 0) {
    return "Vence hoje";
  }

  if (daysRemaining === 1) {
    return "1 dia restante";
  }

  return `${daysRemaining} dias restantes`;
}
