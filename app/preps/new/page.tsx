import { NewPrepForm } from "@/components/preps/NewPrepForm";
import { PageHeader } from "@/components/ui/PageHeader";

export default function NewPrepPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Cadastro visual"
        title="Novo preparo"
        description="Formulario mockado para validar fluxo. A estrutura ja separa os campos para futura persistencia via API."
      />
      <NewPrepForm />
    </div>
  );
}
