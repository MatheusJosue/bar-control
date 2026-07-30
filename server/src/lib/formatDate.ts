// Postgres `date` columns round-trip through supabase-js as "YYYY-MM-DD" strings.
// All math here uses Date.UTC so local server timezone never shifts the day.

function parseIso(isoDate: string): number {
  const [year, month, day] = isoDate.split("-").map(Number);
  return Date.UTC(year, month - 1, day);
}

export function todayIso(): string {
  const now = new Date();
  return toIso(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
}

function toIso(utcMillis: number): string {
  const date = new Date(utcMillis);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function addDaysIso(isoDate: string, days: number): string {
  const oneDayMs = 24 * 60 * 60 * 1000;
  return toIso(parseIso(isoDate) + days * oneDayMs);
}

export function diffInDays(fromIso: string, toIsoDate: string): number {
  const oneDayMs = 24 * 60 * 60 * 1000;
  return Math.round((parseIso(fromIso) - parseIso(toIsoDate)) / oneDayMs);
}

export function toDisplayDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-");
  return `${day}/${month}/${year}`;
}
