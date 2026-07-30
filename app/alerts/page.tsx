"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AlertItem } from "@/components/alerts/AlertItem";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { ListItemSkeleton } from "@/components/ui/ListItemSkeleton";
import { apiFetch } from "@/lib/api";
import type { Alert, PrepStatus } from "@/types/prep";

const sections: { title: string; status: PrepStatus }[] = [
  { title: "Vencidos", status: "expired" },
  { title: "Vencem hoje", status: "expires_today" },
  { title: "Vencem em breve", status: "expires_soon" },
];

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    apiFetch<Alert[]>("/api/alerts")
      .then((data) => {
        if (isMounted) setAlerts(data);
      })
      .catch(() => {
        if (isMounted) setError("Nao foi possivel carregar os alertas agora.");
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  async function handleDelete(id: string) {
    try {
      await apiFetch(`/api/preps/${id}`, { method: "DELETE" });
      setAlerts((current) => current.filter((alert) => alert.id !== id));
      toast.success("Preparo excluido.");
    } catch {
      toast.error("Nao foi possivel excluir o preparo.");
    }
  }

  return (
    <div>
      <PageHeader
        eyebrow="Validade"
        title="Alertas"
        description="Itens que precisam de verificacao antes do proximo turno."
      />
      {error ? (
        <EmptyState title="Erro ao carregar" description={error} />
      ) : isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <ListItemSkeleton key={index} />
          ))}
        </div>
      ) : alerts.length === 0 ? (
        <EmptyState title="Nenhum alerta" description="Nenhum preparo vencido ou proximo do vencimento." />
      ) : (
        <div className="space-y-6">
          {sections.map((section) => {
            const sectionAlerts = alerts.filter((alert) => alert.status === section.status);

            if (sectionAlerts.length === 0) {
              return null;
            }

            return (
              <section key={section.status} className="space-y-3">
                <h2 className="text-lg font-semibold text-zinc-100">{section.title}</h2>
                <div className="grid gap-3">
                  {sectionAlerts.map((alert) => (
                    <AlertItem key={alert.id} alert={alert} onDelete={handleDelete} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
