"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AlertTriangle, Bell, CheckCircle2, Clock3, QrCode, Siren } from "lucide-react";
import { AlertItem } from "@/components/alerts/AlertItem";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { DashboardCardSkeleton } from "@/components/dashboard/DashboardCardSkeleton";
import { PrepItem } from "@/components/preps/PrepItem";
import { EmptyState } from "@/components/ui/EmptyState";
import { ListItemSkeleton } from "@/components/ui/ListItemSkeleton";
import { apiFetch } from "@/lib/api";
import { glassPanel } from "@/lib/glass";
import type { DashboardSummary } from "@/types/dashboard";
import type { Alert, Prep } from "@/types/prep";

export default function DashboardPage() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [preps, setPreps] = useState<Prep[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadDashboard() {
      try {
        const [summaryData, alertsData, prepsData] = await Promise.all([
          apiFetch<DashboardSummary>("/api/dashboard/summary"),
          apiFetch<Alert[]>("/api/alerts"),
          apiFetch<Prep[]>("/api/preps"),
        ]);

        if (!isMounted) return;

        setSummary(summaryData);
        setAlerts(alertsData);
        setPreps(prepsData);
      } catch {
        if (isMounted) {
          setError("Nao foi possivel carregar os dados do bar agora.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadDashboard();

    return () => {
      isMounted = false;
    };
  }, []);

  const activePreps = preps.filter((prep) => prep.status !== "consumed" && prep.status !== "discarded");

  return (
    <div className="space-y-6">
      <section className={`relative overflow-hidden p-5 sm:p-6 ${glassPanel}`}>
        <div className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-[#42fbf2]/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 bottom-0 size-40 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#42fbf2]">Bar Principal</p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Ola!</h1>
            <p className="mt-2 text-sm font-medium text-slate-300">Aqui esta o resumo do seu bar hoje.</p>
          </div>
          <Link
            href="/alerts"
            className="relative flex size-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white backdrop-blur-md transition hover:bg-white/10"
            aria-label="Alertas"
          >
            <Bell size={19} aria-hidden="true" />
            {alerts.length > 0 ? (
              <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-[#f87171] text-[11px] font-bold text-[#ffffff] ring-2 ring-[#071624] theme-light:ring-white">
                {alerts.length}
              </span>
            ) : null}
          </Link>
        </div>
      </section>

      {error ? (
        <EmptyState title="Erro ao carregar" description={error} />
      ) : isLoading || !summary ? (
        <>
          <section className="flex snap-x gap-3 overflow-x-auto pb-1 md:grid md:grid-cols-4 md:overflow-visible">
            {Array.from({ length: 4 }).map((_, index) => (
              <DashboardCardSkeleton key={index} />
            ))}
          </section>
          <section className="mt-6 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <ListItemSkeleton key={index} />
              ))}
            </div>
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <ListItemSkeleton key={index} withProgress />
              ))}
            </div>
          </section>
        </>
      ) : (
        <>
          <section className="flex snap-x gap-3 overflow-x-auto pb-1 md:grid md:grid-cols-4 md:overflow-visible">
            <DashboardCard title="Vencidos" value={summary.expired} description="Itens vencidos" tone="red" icon={Siren} />
            <DashboardCard title="Vencem hoje" value={summary.expiresToday} description="Itens vencem hoje" tone="orange" icon={AlertTriangle} />
            <DashboardCard title="Vencem em breve" value={summary.expiresSoon} description="Proximos 2 dias" tone="yellow" icon={Clock3} />
            <DashboardCard title="OK" value={summary.valid} description="Dentro da validade" tone="green" icon={CheckCircle2} />
          </section>

          <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="inline-flex items-center gap-2 text-xl font-extrabold tracking-tight text-white">
                  <span className="text-[#f87171]">!</span>
                  Alertas importantes
                </h2>
                <Link href="/alerts" className="text-sm font-bold text-[#42fbf2] transition hover:text-white">
                  Ver todos
                </Link>
              </div>
              <div className="grid max-h-[500px] gap-3 overflow-y-auto pr-1">
                {alerts.length > 0 ? (
                  alerts.slice(0, 5).map((alert) => <AlertItem key={alert.id} alert={alert} />)
                ) : (
                  <EmptyState title="Nenhum alerta" description="Nenhum preparo vencido ou proximo do vencimento." />
                )}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="inline-flex items-center gap-2 text-xl font-extrabold tracking-tight text-white">
                  <QrCode className="text-[#42fbf2]" size={20} aria-hidden="true" />
                  Preparos ativos
                </h2>
                <Link href="/preps" className="text-sm font-bold text-[#42fbf2] transition hover:text-white">
                  Ver todos
                </Link>
              </div>
              <div className="grid max-h-[500px] gap-3 overflow-y-auto pr-1">
                {activePreps.length > 0 ? (
                  activePreps.slice(0, 5).map((prep) => <PrepItem key={prep.id} prep={prep} />)
                ) : (
                  <EmptyState title="Nenhum preparo" description="Cadastre o primeiro preparo do bar." />
                )}
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
