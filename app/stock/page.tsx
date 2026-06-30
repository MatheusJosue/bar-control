import { Boxes, TrendingDown } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { stockItems } from "@/data/mockStock";

export default function StockPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Em breve"
        title="Controle de estoque em breve"
        description="Primeira visao mockada dos itens que futuramente entram no fluxo de reposicao."
      />
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {stockItems.map((item) => (
          <article key={item.id} className="rounded-md border border-[#2a4158] bg-[#0d1c2d] p-4 shadow-lg shadow-black/20">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-extrabold tracking-tight text-white">{item.name}</h2>
                <p className="mt-1 text-sm font-medium text-slate-400">{item.category}</p>
              </div>
              <span
                className={`flex size-10 items-center justify-center rounded-md ${
                  item.status === "low_stock"
                    ? "bg-[#fbbf24]/12 text-[#fbbf24]"
                    : "bg-[#42fbf2]/12 text-[#42fbf2]"
                }`}
              >
                {item.status === "low_stock" ? <TrendingDown size={20} /> : <Boxes size={20} />}
              </span>
            </div>
            <div className="mt-5 flex items-end justify-between border-t border-[#2a4158] pt-4">
              <div>
                <p className="text-2xl font-extrabold tracking-tight text-white">{item.currentQuantity}</p>
                <p className="text-sm font-medium text-slate-400">{item.unit} atuais</p>
              </div>
              <p className="text-sm font-bold text-slate-300">Minimo: {item.minimumQuantity}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
