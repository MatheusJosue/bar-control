import { AlertItem } from "@/components/alerts/AlertItem";
import { PageHeader } from "@/components/ui/PageHeader";
import { alerts } from "@/data/mockAlerts";
import type { PrepStatus } from "@/types/prep";

const sections: { title: string; status: PrepStatus }[] = [
  { title: "Vencidos", status: "expired" },
  { title: "Vencem hoje", status: "expires_today" },
  { title: "Vencem em breve", status: "expires_soon" },
];

export default function AlertsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Validade"
        title="Alertas"
        description="Itens que precisam de verificacao antes do proximo turno."
      />
      <div className="space-y-6">
        {sections.map((section) => {
          const sectionAlerts = alerts.filter((alert) => alert.status === section.status);

          return (
            <section key={section.status} className="space-y-3">
              <h2 className="text-lg font-semibold text-zinc-100">{section.title}</h2>
              <div className="grid gap-3">
                {sectionAlerts.map((alert) => (
                  <AlertItem key={alert.id} alert={alert} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
