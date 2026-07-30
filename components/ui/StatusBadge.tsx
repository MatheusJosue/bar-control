import type { PrepStatus } from "@/types/prep";
import { getStatusClass, getStatusShortLabel } from "@/lib/status";

export function StatusBadge({ status }: { status: PrepStatus }) {
  return (
    <span className={`inline-flex items-center rounded-lg border px-2 py-1 text-[11px] font-bold uppercase backdrop-blur-sm ${getStatusClass(status)}`}>
      {getStatusShortLabel(status)}
    </span>
  );
}
