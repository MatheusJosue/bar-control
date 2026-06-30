import Link from "next/link";
import { AlertTriangle, Bell, CheckCircle2, Clock3, QrCode, Siren, Zap } from "lucide-react";
import { AlertItem } from "@/components/alerts/AlertItem";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { PrepItem } from "@/components/preps/PrepItem";
import { dashboardSummary } from "@/data/mockDashboard";
import { alerts } from "@/data/mockAlerts";
import { activePreps } from "@/data/mockPreps";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-2xl border border-[#2a4158] bg-[#071624] p-5 shadow-2xl shadow-black/30 sm:p-6">
        <div className="absolute -right-10 -top-10 size-40 rounded-full bg-[#42fbf2]/10 blur-3xl" />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#42fbf2]">Bar Principal</p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Ola, Joao!
            </h1>
            <p className="mt-2 text-sm font-medium text-slate-300">Aqui esta o resumo do seu bar hoje.</p>
          </div>
          <div className="flex gap-2">
            <Link
              href="/alerts"
              className="relative flex size-11 items-center justify-center rounded-md bg-[#1a2b40] text-white transition hover:bg-[#223146]"
              aria-label="Alertas"
            >
              <Bell size={19} aria-hidden="true" />
              <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-[#f87171] text-[11px] font-bold text-white">
                3
              </span>
            </Link>
            <button className="inline-flex h-11 items-center gap-2 rounded-md bg-[#42fbf2] px-4 text-sm font-bold text-[#03111f] transition hover:bg-white">
              <Zap size={17} aria-hidden="true" />
              Acesso rapido
            </button>
          </div>
        </div>
      </section>

      <section className="flex snap-x gap-3 overflow-x-auto pb-1 md:grid md:grid-cols-4 md:overflow-visible">
        <DashboardCard title="Vencidos" value={dashboardSummary.expired} description="Itens vencidos" tone="red" icon={Siren} />
        <DashboardCard title="Vencem hoje" value={dashboardSummary.expiresToday} description="Itens vencem hoje" tone="orange" icon={AlertTriangle} />
        <DashboardCard title="Vencem em breve" value={dashboardSummary.expiresSoon} description="Proximos 2 dias" tone="yellow" icon={Clock3} />
        <DashboardCard title="OK" value={dashboardSummary.valid} description="Dentro da validade" tone="green" icon={CheckCircle2} />
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
            {alerts.map((alert) => (
              <AlertItem key={alert.id} alert={alert} />
            ))}
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
            {activePreps.slice(0, 5).map((prep) => (
              <PrepItem key={prep.id} prep={prep} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
