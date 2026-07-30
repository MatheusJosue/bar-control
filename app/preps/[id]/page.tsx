"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  ArrowLeft,
  Beaker,
  CalendarDays,
  MapPin,
  Package,
  RotateCcw,
  StickyNote,
  Trash2,
  UserRound,
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { EmptyState } from "@/components/ui/EmptyState";
import { Skeleton } from "@/components/ui/Skeleton";
import { apiFetch } from "@/lib/api";
import { confirmDelete } from "@/lib/confirm";
import { glassCard, glassChip, glassPanel, glassTrack } from "@/lib/glass";
import { formatDaysRemaining } from "@/lib/dates";
import type { Prep, PrepStatus } from "@/types/prep";

type LifecycleStatus = "active" | "consumed" | "discarded";

function getProgress(prep: Prep): number {
  if (prep.status === "expired") return 4;
  return Math.max(8, Math.min(100, Math.round((prep.daysRemaining / 10) * 100)));
}

function getProgressClass(prep: Prep): string {
  if (prep.status === "expired" || prep.daysRemaining <= 0) return "bg-[#f87171]";
  if (prep.status === "expires_today" || prep.status === "expires_soon" || prep.daysRemaining <= 2) return "bg-[#fbbf24]";
  return "bg-[#42fbf2]";
}

export default function PrepDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [prep, setPrep] = useState<Prep | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    let isMounted = true;

    apiFetch<Prep[]>("/api/preps")
      .then((preps) => {
        if (!isMounted) return;
        const found = preps.find((item) => item.id === params.id);
        if (!found) {
          setNotFound(true);
          return;
        }
        setPrep(found);
      })
      .catch(() => {
        if (isMounted) setNotFound(true);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [params.id]);

  async function updateStatus(lifecycleStatus: LifecycleStatus) {
    if (!prep) return;

    try {
      setIsUpdating(true);
      const updated = await apiFetch<Prep>(`/api/preps/${prep.id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ lifecycleStatus }),
      });
      setPrep(updated);
      toast.success(
        lifecycleStatus === "active"
          ? "Preparo reativado."
          : lifecycleStatus === "consumed"
            ? "Preparo marcado como consumido."
            : "Preparo marcado como descartado.",
      );
    } catch {
      toast.error("Nao foi possivel atualizar o status. Tente novamente.");
    } finally {
      setIsUpdating(false);
    }
  }

  async function handleDelete() {
    if (!prep) return;
    if (!(await confirmDelete(prep.name))) return;

    try {
      setIsUpdating(true);
      await apiFetch(`/api/preps/${prep.id}`, { method: "DELETE" });
      toast.success("Preparo excluido.");
      router.push("/preps");
    } catch {
      toast.error("Nao foi possivel excluir o preparo.");
      setIsUpdating(false);
    }
  }

  const terminalStatuses: PrepStatus[] = ["consumed", "discarded"];
  const isTerminal = prep ? terminalStatuses.includes(prep.status) : false;

  return (
    <div>
      <PageHeader
        eyebrow="Preparos"
        title={prep?.name ?? "Detalhes do preparo"}
        description="Veja os detalhes completos e atualize o status do preparo."
        action={
          <Link
            href="/preps"
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/10"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Voltar
          </Link>
        }
      />

      {isLoading ? (
        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div className={`space-y-5 p-5 sm:p-6 ${glassPanel}`}>
            <div className="flex items-start gap-4">
              <Skeleton className="size-14 shrink-0 rounded-2xl" />
              <div className="min-w-0 flex-1 space-y-2">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
            <div className="grid gap-4 border-t border-white/10 pt-5 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="space-y-2">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-4 w-28" />
                </div>
              ))}
            </div>
            <div className="space-y-2 border-t border-white/10 pt-5">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-2 w-full rounded-full" />
            </div>
          </div>
          <div className={`h-fit space-y-3 p-5 ${glassCard}`}>
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-11 w-full rounded-xl" />
            <Skeleton className="h-11 w-full rounded-xl" />
          </div>
        </div>
      ) : notFound || !prep ? (
        <EmptyState title="Preparo nao encontrado" description="Esse preparo pode ter sido removido." />
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div className={`space-y-5 p-5 sm:p-6 ${glassPanel}`}>
            <div className="flex items-start gap-4">
              <div className={`flex size-14 shrink-0 items-center justify-center rounded-2xl text-[#42fbf2] ${glassChip}`}>
                <Beaker size={26} aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-xl font-extrabold tracking-tight text-white">{prep.name}</h2>
                  <StatusBadge status={prep.status} />
                </div>
                <p className="mt-1 text-sm font-medium text-slate-400">{prep.category}</p>
              </div>
            </div>

            <div className="grid gap-4 border-t border-white/10 pt-5 sm:grid-cols-2">
              <div className="flex items-start gap-3 text-sm text-slate-300">
                <CalendarDays size={18} className="mt-0.5 shrink-0 text-[#42fbf2]/70" aria-hidden="true" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Feito em</p>
                  <p className="font-medium text-white">{prep.madeAt}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-sm text-slate-300">
                <CalendarDays size={18} className="mt-0.5 shrink-0 text-[#42fbf2]/70" aria-hidden="true" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Vence em</p>
                  <p className="font-medium text-white">{prep.expiresAt}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-sm text-slate-300">
                <UserRound size={18} className="mt-0.5 shrink-0 text-[#42fbf2]/70" aria-hidden="true" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Responsavel</p>
                  <p className="font-medium text-white">{prep.responsible}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-sm text-slate-300">
                <MapPin size={18} className="mt-0.5 shrink-0 text-[#42fbf2]/70" aria-hidden="true" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Area</p>
                  <p className="font-medium text-white">{prep.area}</p>
                </div>
              </div>
              {prep.quantity !== undefined ? (
                <div className="flex items-start gap-3 text-sm text-slate-300">
                  <Package size={18} className="mt-0.5 shrink-0 text-[#42fbf2]/70" aria-hidden="true" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Quantidade</p>
                    <p className="font-medium text-white">
                      {prep.quantity} {prep.unit}
                    </p>
                  </div>
                </div>
              ) : null}
            </div>

            {prep.notes ? (
              <div className="flex items-start gap-3 border-t border-white/10 pt-5 text-sm text-slate-300">
                <StickyNote size={18} className="mt-0.5 shrink-0 text-[#42fbf2]/70" aria-hidden="true" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Observacoes</p>
                  <p className="mt-1 font-medium text-white">{prep.notes}</p>
                </div>
              </div>
            ) : null}

            {!isTerminal ? (
              <div className="space-y-2 border-t border-white/10 pt-5">
                <div className="flex items-center justify-between text-xs font-bold">
                  <p className="text-slate-400">Tempo restante</p>
                  <p className="text-slate-400">{formatDaysRemaining(prep.daysRemaining)}</p>
                </div>
                <div className={`h-2 overflow-hidden rounded-full ${glassTrack}`}>
                  <div className={`h-full rounded-full ${getProgressClass(prep)}`} style={{ width: `${getProgress(prep)}%` }} />
                </div>
              </div>
            ) : null}
          </div>

          <div className={`h-fit space-y-3 p-5 ${glassCard}`}>
            <h3 className="text-sm font-extrabold uppercase tracking-wide text-slate-300">Acoes</h3>
            {isTerminal ? (
              <button
                type="button"
                disabled={isUpdating}
                onClick={() => updateStatus("active")}
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#42fbf2] px-4 text-sm font-bold text-[#03111f] shadow-lg shadow-[#42fbf2]/20 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                <RotateCcw size={17} aria-hidden="true" />
                Reativar preparo
              </button>
            ) : (
              <>
                <button
                  type="button"
                  disabled={isUpdating}
                  onClick={() => updateStatus("consumed")}
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#42fbf2]/40 bg-[#42fbf2]/10 px-4 text-sm font-bold text-[#bffffb] backdrop-blur-md transition hover:bg-[#42fbf2]/20 disabled:cursor-not-allowed disabled:opacity-60 theme-light:text-[#0e7490]"
                >
                  <Beaker size={17} aria-hidden="true" />
                  Marcar como consumido
                </button>
                <button
                  type="button"
                  disabled={isUpdating}
                  onClick={() => updateStatus("discarded")}
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#f87171]/40 bg-[#f87171]/10 px-4 text-sm font-bold text-[#fecaca] backdrop-blur-md transition hover:bg-[#f87171]/20 disabled:cursor-not-allowed disabled:opacity-60 theme-light:text-[#b91c1c]"
                >
                  <Trash2 size={17} aria-hidden="true" />
                  Marcar como descartado
                </button>
              </>
            )}
            <button
              type="button"
              onClick={() => router.push("/preps")}
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/10"
            >
              Ver todos os preparos
            </button>
            <button
              type="button"
              disabled={isUpdating}
              onClick={handleDelete}
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/10 px-4 text-sm font-bold text-slate-400 transition hover:border-[#f87171]/40 hover:bg-[#f87171]/10 hover:text-[#f87171] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Trash2 size={16} aria-hidden="true" />
              Excluir preparo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
