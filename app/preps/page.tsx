import { PageHeader } from "@/components/ui/PageHeader";
import { PrepList } from "@/components/preps/PrepList";
import { activePreps } from "@/data/mockPreps";

export default function PrepsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Operacao"
        title="Preparos"
        description="Busque, filtre e acompanhe os preparos ativos do bar com status visual por validade."
      />
      <PrepList preps={activePreps} />
    </div>
  );
}
