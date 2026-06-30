import { Bell, Building2, Moon, UserRound } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";

const settings = [
  { title: "Perfil do usuario", value: "Joao Pereira - Bar manager", icon: UserRound },
  { title: "Area atual", value: "Bar Principal", icon: Building2 },
  { title: "Tema", value: "Escuro", icon: Moon },
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
        {settings.map((item) => {
          const Icon = item.icon;

          return (
            <article key={item.title} className="rounded-md border border-[#2a4158] bg-[#0d1c2d] p-4 shadow-lg shadow-black/20">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-md bg-[#42fbf2]/12 text-[#42fbf2]">
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
      <section className="mt-6 rounded-md border border-[#2a4158] bg-[#0d1c2d] p-4 shadow-lg shadow-black/20">
        <h2 className="font-extrabold tracking-tight text-white">Dados da unidade</h2>
        <div className="mt-4 grid gap-3 text-sm font-medium text-slate-300 sm:grid-cols-3">
          <p>Unidade: Bar Control Demo</p>
          <p>Cidade: Sao Paulo</p>
          <p>Operacao: Bar e restaurante</p>
        </div>
      </section>
    </div>
  );
}
