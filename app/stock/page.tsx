"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { SearchInput } from "@/components/ui/SearchInput";
import { EmptyState } from "@/components/ui/EmptyState";
import { Skeleton } from "@/components/ui/Skeleton";
import { StockItemCard } from "@/components/stock/StockItemCard";
import { apiFetch } from "@/lib/api";
import { glassCard } from "@/lib/glass";
import type { StockItem } from "@/types/stock";

function StockItemSkeleton() {
  return (
    <div className={`p-4 ${glassCard}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-20" />
        </div>
        <Skeleton className="size-10 rounded-xl" />
      </div>
      <div className="mt-5 flex items-end justify-between border-t border-white/10 pt-4">
        <Skeleton className="h-8 w-16" />
        <Skeleton className="h-9 w-24 rounded-xl" />
      </div>
    </div>
  );
}

export default function StockPage() {
  const [items, setItems] = useState<StockItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [pendingId, setPendingId] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    apiFetch<StockItem[]>("/api/stock")
      .then((data) => {
        if (isMounted) setItems(data);
      })
      .catch(() => {
        if (isMounted) setError("Nao foi possivel carregar o estoque agora.");
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (normalizedQuery.length === 0) {
      return items;
    }

    return items.filter((item) =>
      [item.name, item.category].join(" ").toLowerCase().includes(normalizedQuery),
    );
  }, [items, query]);

  async function adjustQuantity(id: string, delta: number) {
    setPendingId(id);

    try {
      const updated = await apiFetch<StockItem>(`/api/stock/${id}/quantity`, {
        method: "PATCH",
        body: JSON.stringify({ delta }),
      });
      setItems((current) => current.map((item) => (item.id === id ? updated : item)));
    } catch {
      toast.error("Nao foi possivel atualizar a quantidade.");
    } finally {
      setPendingId(null);
    }
  }

  return (
    <div>
      <PageHeader
        eyebrow="Operacao"
        title="Estoque"
        description="Controle manual: ajuste a quantidade sempre que um item entrar ou sair."
        action={
          <Link
            href="/stock/new"
            className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#42fbf2] px-4 text-sm font-bold text-[#03111f] shadow-lg shadow-[#42fbf2]/20 transition hover:bg-white"
          >
            <Plus size={16} aria-hidden="true" />
            Novo item
          </Link>
        }
      />
      <div className="mb-4 max-w-md">
        <SearchInput value={query} onChange={setQuery} placeholder="Buscar item ou categoria" />
      </div>

      {error ? (
        <EmptyState title="Erro ao carregar" description={error} />
      ) : isLoading ? (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <StockItemSkeleton key={index} />
          ))}
        </div>
      ) : filteredItems.length > 0 ? (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {filteredItems.map((item) => (
            <StockItemCard
              key={item.id}
              item={item}
              isPending={pendingId === item.id}
              onAdjust={adjustQuantity}
            />
          ))}
        </div>
      ) : (
        <EmptyState title="Nenhum item encontrado" description="Ajuste a busca ou cadastre um novo item." />
      )}
    </div>
  );
}
