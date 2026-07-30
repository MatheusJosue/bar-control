import { AlertTriangle, MapPin, Trash2, UserRound } from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { getStatusAccentClass } from "@/lib/status";
import { glassCardHover, glassChip } from "@/lib/glass";
import type { Alert } from "@/types/prep";

interface AlertItemProps {
  alert: Alert;
  onDelete?: (id: string) => void;
}

export function AlertItem({ alert, onDelete }: AlertItemProps) {
  return (
    <article className={`relative overflow-hidden p-4 ${glassCardHover}`}>
      <span className={`absolute inset-y-0 left-0 w-1 ${getStatusAccentClass(alert.status)}`} />
      <div className="flex items-start gap-3 pl-2">
        <div className={`mt-1 flex size-10 shrink-0 items-center justify-center rounded-xl text-[#fbbf24] ${glassChip}`}>
          <AlertTriangle size={18} aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-extrabold tracking-tight text-white">{alert.productName}</h3>
            <StatusBadge status={alert.status} />
            {onDelete ? (
              <button
                type="button"
                onClick={() => {
                  if (window.confirm(`Excluir "${alert.productName}"? Essa acao nao pode ser desfeita.`)) {
                    onDelete(alert.id);
                  }
                }}
                aria-label={`Excluir ${alert.productName}`}
                className="ml-auto flex size-7 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-[#f87171]/15 hover:text-[#f87171]"
              >
                <Trash2 size={15} aria-hidden="true" />
              </button>
            ) : null}
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
