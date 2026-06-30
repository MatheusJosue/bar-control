import type { PrepStatus } from "@/types/prep";
import { getStatusClass, getStatusShortLabel } from "@/lib/status";

export function StatusBadge({ status }: { status: PrepStatus }) {
  return (
    <span className={`inline-flex items-center rounded-md border px-2 py-1 text-[11px] font-bold uppercase ${getStatusClass(status)}`}>
      {getStatusShortLabel(status)}
    </span>
  );
}
