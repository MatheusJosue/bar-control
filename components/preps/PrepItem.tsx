import Link from "next/link";
import { ArrowRight, Beaker, CalendarDays, MapPin, UserRound } from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatDaysRemaining } from "@/lib/dates";
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
    return "text-[#f87171]";
  }

  if (prep.status === "expires_today" || prep.status === "expires_soon" || prep.daysRemaining <= 2) {
    return "text-[#fbbf24]";
  }

  return "text-[#42fbf2]";
}

export function PrepItem({ prep }: { prep: Prep }) {
  const progress = getProgress(prep);

  return (
    <article className="rounded-md border border-[#2a4158] bg-[#0d1c2d] p-4 shadow-lg shadow-black/20 transition hover:border-[#42fbf2]/45">
      <div className="flex items-start gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-md bg-[#223146] text-[#42fbf2]">
          <Beaker size={20} aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="font-extrabold tracking-tight text-white">{prep.name}</h3>
              <p className="mt-1 text-sm font-medium text-slate-400">{prep.category}</p>
            </div>
            <StatusBadge status={prep.status} />
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

          <div className="mt-4 space-y-3 border-t border-[#2a4158] pt-3">
            <div className="flex items-center justify-between gap-3 text-xs font-bold">
              <p className={getDaysClass(prep)}>
                {formatDaysRemaining(prep.daysRemaining)}
              </p>
              <p className="text-slate-400">{progress}%</p>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-[#223146]">
              <div className={`h-full rounded-full ${getProgressClass(prep)}`} style={{ width: `${progress}%` }} />
            </div>
            <Link
              href={`/preps?id=${prep.id}`}
              className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-md bg-[#223146] px-3 text-sm font-bold text-white transition hover:bg-[#42fbf2] hover:text-[#03111f]"
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
