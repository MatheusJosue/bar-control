"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { ListItemSkeleton } from "@/components/ui/ListItemSkeleton";
import { PrepList } from "@/components/preps/PrepList";
import { apiFetch } from "@/lib/api";
import type { Prep } from "@/types/prep";

export default function PrepsPage() {
  const [preps, setPreps] = useState<Prep[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    apiFetch<Prep[]>("/api/preps")
      .then((data) => {
        if (isMounted) setPreps(data);
      })
      .catch(() => {
        if (isMounted) setError("Nao foi possivel carregar os preparos agora.");
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      <PageHeader
        eyebrow="Operacao"
        title="Preparos"
        description="Busque, filtre e acompanhe os preparos ativos do bar com status visual por validade."
      />
      {error ? (
        <EmptyState title="Erro ao carregar" description={error} />
      ) : isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <ListItemSkeleton key={index} withProgress />
          ))}
        </div>
      ) : (
        <PrepList preps={preps} />
      )}
    </div>
  );
}
