import { AlertTriangle, MapPin, UserRound } from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { getStatusAccentClass } from "@/lib/status";
import type { Alert } from "@/types/prep";

export function AlertItem({ alert }: { alert: Alert }) {
  return (
    <article className="relative overflow-hidden rounded-md border border-[#2a4158] bg-[#0d1c2d] p-4 shadow-lg shadow-black/20 transition hover:border-[#42fbf2]/45">
      <span className={`absolute inset-y-0 left-0 w-1 ${getStatusAccentClass(alert.status)}`} />
      <div className="flex items-start gap-3 pl-2">
        <div className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-md bg-[#223146] text-[#fbbf24]">
          <AlertTriangle size={18} aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-extrabold tracking-tight text-white">{alert.productName}</h3>
            <StatusBadge status={alert.status} />
          </div>
          <p className="mt-1 text-sm font-medium text-slate-300">{alert.message}</p>
          <div className="mt-3 flex flex-wrap gap-3 text-xs font-medium text-slate-400">
            <span className="inline-flex items-center gap-1">
              <MapPin size={14} aria-hidden="true" />
              {alert.area}
            </span>
            {alert.responsible ? (
              <span className="inline-flex items-center gap-1">
                <UserRound size={14} aria-hidden="true" />
                {alert.responsible}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
