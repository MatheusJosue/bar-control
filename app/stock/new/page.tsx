import { NewStockItemForm } from "@/components/stock/NewStockItemForm";
import { PageHeader } from "@/components/ui/PageHeader";

export default function NewStockItemPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Estoque"
        title="Novo item"
        description="Cadastre um item para acompanhar no controle manual de estoque."
      />
      <NewStockItemForm />
    </div>
  );
}
