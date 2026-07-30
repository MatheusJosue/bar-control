import { Bell, Building2, Moon, UserRound } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { glassCard, glassCardHover } from "@/lib/glass";

const settings = [
  { title: "Perfil do usuario", value: "Joao Pereira - Bar manager", icon: UserRound },
  { title: "Area atual", value: "Bar Principal", icon: Building2 },
  { title: "Preferencias de notificacao", value: "Alertas de validade ativos", icon: Bell },
];

export default function SettingsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Ajustes"
        title="Configuracoes"
        description="Placeholder visual para perfil, unidade, tema e preferencias operacionais."
      />
      <div className="grid gap-3 md:grid-cols-2">
        <article className={`p-4 ${glassCardHover}`}>
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-[#42fbf2]/12 text-[#42fbf2] ring-1 ring-inset ring-white/10">
                <Moon size={20} aria-hidden="true" />
              </span>
              <div>
                <h2 className="font-extrabold tracking-tight text-white">Tema</h2>
                <p className="mt-1 text-sm font-medium text-slate-400">Escuro ou claro</p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </article>

        {settings.map((item) => {
          const Icon = item.icon;

          return (
            <article key={item.title} className={`p-4 ${glassCardHover}`}>
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl bg-[#42fbf2]/12 text-[#42fbf2] ring-1 ring-inset ring-white/10">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <div>
                  <h2 className="font-extrabold tracking-tight text-white">{item.title}</h2>
                  <p className="mt-1 text-sm font-medium text-slate-400">{item.value}</p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
      <section className={`mt-6 p-4 ${glassCard}`}>
        <h2 className="font-extrabold tracking-tight text-white">Dados da unidade</h2>
        <div className="mt-4 grid gap-3 border-t border-white/10 pt-4 text-sm font-medium text-slate-300 sm:grid-cols-3">
          <p>Unidade: Bar Control Demo</p>
          <p>Cidade: Sao Paulo</p>
          <p>Operacao: Bar e restaurante</p>
        </div>
      </section>
    </div>
  );
}
