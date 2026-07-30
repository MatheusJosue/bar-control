import Link from "next/link";
import { ArrowRight, Beaker, CalendarDays, MapPin, Trash2, UserRound } from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatDaysRemaining } from "@/lib/dates";
import { glassCardHover, glassChip, glassTrack } from "@/lib/glass";
import type { Prep } from "@/types/prep";

function getProgress(prep: Prep): number {
  if (prep.status === "expired") {
    return 4;
  }

  return Math.max(8, Math.min(100, Math.round((prep.daysRemaining / 10) * 100)));
}

function getProgressClass(prep: Prep): string {
  if (prep.status === "expired" || prep.daysRemaining <= 0) {
    return "bg-[#f87171]";
  }

  if (prep.status === "expires_today" || prep.status === "expires_soon" || prep.daysRemaining <= 2) {
    return "bg-[#fbbf24]";
  }

  return "bg-[#42fbf2]";
}

function getDaysClass(prep: Prep): string {
  if (prep.status === "expired" || prep.daysRemaining <= 0) {
    return "text-[#f87171] theme-light:text-red-700";
  }

  if (prep.status === "expires_today" || prep.status === "expires_soon" || prep.daysRemaining <= 2) {
    return "text-[#fbbf24] theme-light:text-amber-700";
  }

  return "text-[#42fbf2] theme-light:text-cyan-700";
}

interface PrepItemProps {
  prep: Prep;
  onDelete?: (id: string) => void;
}

export function PrepItem({ prep, onDelete }: PrepItemProps) {
  const progress = getProgress(prep);

  return (
    <article className={`p-4 ${glassCardHover}`}>
      <div className="flex items-start gap-3">
        <div className={`flex size-11 shrink-0 items-center justify-center rounded-xl text-[#42fbf2] ${glassChip}`}>
          <Beaker size={20} aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="font-extrabold tracking-tight text-white">{prep.name}</h3>
              <p className="mt-1 text-sm font-medium text-slate-400">{prep.category}</p>
            </div>
            <div className="flex items-center gap-2">
              <StatusBadge status={prep.status} />
              {onDelete ? (
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm(`Excluir "${prep.name}"? Essa acao nao pode ser desfeita.`)) {
                      onDelete(prep.id);
                    }
                  }}
                  aria-label={`Excluir ${prep.name}`}
                  className="flex size-7 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-[#f87171]/15 hover:text-[#f87171]"
                >
                  <Trash2 size={15} aria-hidden="true" />
                </button>
              ) : null}
            </div>
          </div>

          <div className="mt-4 grid gap-2 text-sm font-medium text-slate-300 sm:grid-cols-2 lg:grid-cols-4">
            <span className="inline-flex items-center gap-2">
              <CalendarDays size={16} aria-hidden="true" />
              Feito em {prep.madeAt}
            </span>
            <span className="inline-flex items-center gap-2">
              <CalendarDays size={16} aria-hidden="true" />
              Vence {prep.expiresAt}
            </span>
            <span className="inline-flex items-center gap-2">
              <UserRound size={16} aria-hidden="true" />
              {prep.responsible}
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin size={16} aria-hidden="true" />
              {prep.area}
            </span>
          </div>

          <div className="mt-4 space-y-3 border-t border-white/10 pt-3">
            <div className="flex items-center justify-between gap-3 text-xs font-bold">
              <p className={getDaysClass(prep)}>
                {formatDaysRemaining(prep.daysRemaining)}
              </p>
              <p className="text-slate-400">{progress}%</p>
            </div>
            <div className={`h-2 overflow-hidden rounded-full ${glassTrack}`}>
              <div className={`h-full rounded-full ${getProgressClass(prep)}`} style={{ width: `${progress}%` }} />
            </div>
            <Link
              href={`/preps/${prep.id}`}
              className={`inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl px-3 text-sm font-bold text-white transition hover:bg-[#42fbf2] hover:text-[#03111f] hover:ring-[#42fbf2]/40 ${glassChip}`}
            >
              Abrir
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
