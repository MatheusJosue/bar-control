import { CircleHelp, LifeBuoy, MessageCircle, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";

const supportItems = [
  {
    title: "Central de ajuda",
    description: "Guias rapidos para operacao, validade e cadastro de preparos.",
    icon: CircleHelp,
  },
  {
    title: "Contato com suporte",
    description: "Canal visual para abertura de chamados da unidade.",
    icon: MessageCircle,
  },
  {
    title: "Status do sistema",
    description: "Monitoramento futuro de API, PWA e notificacoes.",
    icon: ShieldCheck,
  },
];

export default function SupportPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Ajuda"
        title="Suporte"
        description="Espaco visual para documentacao, contato e acompanhamento operacional."
      />

      <div className="grid gap-3 md:grid-cols-3">
        {supportItems.map((item) => {
          const Icon = item.icon;

          return (
            <article key={item.title} className="rounded-md border border-[#2a4158] bg-[#0d1c2d] p-4 shadow-lg shadow-black/20">
              <span className="flex size-10 items-center justify-center rounded-md bg-[#42fbf2]/12 text-[#42fbf2]">
                <Icon size={20} aria-hidden="true" />
              </span>
              <h2 className="mt-4 font-extrabold tracking-tight text-white">{item.title}</h2>
              <p className="mt-2 text-sm font-medium leading-6 text-slate-400">{item.description}</p>
            </article>
          );
        })}
      </div>

      <section className="mt-6 rounded-md border border-[#2a4158] bg-[#0d1c2d] p-4 shadow-lg shadow-black/20">
        <div className="flex items-start gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-[#13283d] text-[#42fbf2]">
            <LifeBuoy size={20} aria-hidden="true" />
          </span>
          <div>
            <h2 className="font-extrabold tracking-tight text-white">Atendimento em breve</h2>
            <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-slate-400">
              Nesta fase MVP, esta pagina e apenas visual. Depois ela pode receber chat, base de conhecimento e abertura real de chamados.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
