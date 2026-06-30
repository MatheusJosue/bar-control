import { Lock, ShieldCheck, Smartphone, TimerReset } from "lucide-react";
import { LoginForm } from "@/components/auth/LoginForm";

const highlights = [
  {
    label: "Real-time validity",
    description: "Alertas automaticos de vencimento.",
    mobileLabel: "Validade",
    icon: TimerReset,
  },
  {
    label: "PWA ready",
    description: "Acesso rapido direto da sua home.",
    mobileLabel: "PWA App",
    icon: Smartphone,
  },
  {
    label: "Secure access",
    description: "Dados protegidos com criptografia.",
    mobileLabel: "Acesso",
    icon: ShieldCheck,
  },
];

export default function LoginPage() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-[#051424] px-4 py-4 text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_12%,rgba(66,251,242,0.10),transparent_28%),radial-gradient(circle_at_80%_80%,rgba(66,251,242,0.06),transparent_28%),linear-gradient(#ffffff0a_1px,transparent_1px),linear-gradient(90deg,#ffffff0a_1px,transparent_1px)] bg-[size:auto,auto,18px_18px,18px_18px]" />
      <div className="flex w-full max-w-7xl items-center justify-center">
        <div className="relative w-full overflow-hidden rounded-2xl border border-[#2a4158] bg-[#071624] shadow-2xl shadow-black/50">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_38%,rgba(66,251,242,0.08),transparent_28%)]" />

          <div className="relative grid min-h-full gap-0 lg:grid-cols-[1.25fr_0.75fr]">
            <section className="px-6 pb-5 pt-8 text-center sm:px-10 lg:px-12 lg:py-10 lg:text-left">
              <div className="mb-6 flex flex-col items-center gap-3 lg:mb-24 lg:flex-row">
                <span className="hidden size-11 items-center justify-center rounded-xl bg-[#42fbf2]/15 text-[#42fbf2] lg:flex">
                  <Lock size={22} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xl font-extrabold tracking-tight text-[#42fbf2]">Bar Control</p>
                  <p className="hidden text-xs text-slate-400 lg:block">Login operacional</p>
                </div>
              </div>

              <span className="mx-auto mb-4 flex size-14 items-center justify-center rounded-xl bg-[#42fbf2]/15 text-[#42fbf2] lg:hidden">
                <Lock size={27} aria-hidden="true" />
              </span>
              <h1 className="mx-auto max-w-2xl text-2xl font-extrabold tracking-tight text-white sm:text-4xl lg:mx-0 lg:text-5xl">
                Operacao do bar clara antes do proximo atendimento.
              </h1>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-300 lg:mx-0">
                Monitore validades em tempo real, receba alertas de estoque critico e garanta a seguranca operacional do seu estabelecimento.
              </p>

              <div className="mt-6 hidden grid-cols-3 gap-4 lg:grid">
                {highlights.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div key={item.label} className="rounded-md border border-[#2a4158] bg-white/[0.045] p-5">
                      <Icon className="mb-5 text-[#42fbf2]" size={24} aria-hidden="true" />
                      <p className="text-sm font-extrabold text-white">{item.label}</p>
                      <p className="mt-2 text-xs leading-5 text-slate-400">{item.description}</p>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="px-4 pb-8 sm:px-10 lg:flex lg:items-center lg:px-12 lg:py-10">
              <div className="mx-auto w-full max-w-sm rounded-2xl border border-[#2a4158] bg-[#0d1c2d] p-5 shadow-2xl shadow-black/30 sm:p-6">
                <div className="hidden lg:block">
                  <h2 className="text-2xl font-extrabold tracking-tight text-white">Entrar</h2>
                  <p className="mt-1 text-xs font-medium text-slate-300">Acesse o painel operacional do Bar Control</p>
                </div>
                <div className="mb-5 lg:mt-7">
                  <LoginForm />
                </div>
              </div>

              <div className="mx-auto mt-6 grid max-w-sm grid-cols-3 gap-2 lg:hidden">
                {highlights.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div key={item.mobileLabel} className="rounded-md border border-[#2a4158] bg-[#0d1c2d] p-3 text-center">
                      <Icon className="mx-auto text-[#42fbf2]" size={18} aria-hidden="true" />
                      <p className="mt-2 text-[10px] font-extrabold uppercase text-slate-200">{item.mobileLabel}</p>
                    </div>
                  );
                })}
              </div>

              <p className="mt-7 text-center text-xs leading-6 text-slate-500 lg:hidden">
                © 2026 Bar Control Systems
                <br />
                Versao v4.12.0 · Nocturnal Edition
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
