"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import { FilterTabs, type FilterTab } from "@/components/ui/FilterTabs";
import { SearchInput } from "@/components/ui/SearchInput";
import { PrepItem } from "@/components/preps/PrepItem";
import type { Prep, PrepStatus } from "@/types/prep";

type PrepFilter = "all" | PrepStatus;

const tabs: FilterTab<PrepFilter>[] = [
  { label: "Todos", value: "all" },
  { label: "Vencidos", value: "expired" },
  { label: "Vencem hoje", value: "expires_today" },
  { label: "Vencem em breve", value: "expires_soon" },
  { label: "OK", value: "valid" },
  { label: "Consumidos", value: "consumed" },
  { label: "Descartados", value: "discarded" },
];

interface PrepListProps {
  preps: Prep[];
  onDelete?: (id: string) => void;
}

export function PrepList({ preps, onDelete }: PrepListProps) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<PrepFilter>("all");

  const filteredPreps = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return preps.filter((prep) => {
      const matchesStatus = filter === "all" || prep.status === filter;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        [prep.name, prep.category, prep.responsible, prep.area]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesStatus && matchesQuery;
    });
  }, [filter, preps, query]);

  return (
    <section className="space-y-4">
      <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
        <SearchInput value={query} onChange={setQuery} placeholder="Buscar preparo, responsavel ou area" />
        <Link
          href="/preps/new"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#42fbf2] px-4 text-sm font-extrabold text-[#03111f] shadow-lg shadow-[#42fbf2]/20 transition hover:bg-white"
        >
          <Plus size={18} aria-hidden="true" />
          Novo preparo
        </Link>
      </div>
      <FilterTabs tabs={tabs} value={filter} onChange={setFilter} />

      {filteredPreps.length > 0 ? (
        <div className="grid gap-3 xl:grid-cols-2">
          {filteredPreps.map((prep) => (
            <PrepItem key={prep.id} prep={prep} onDelete={onDelete} />
          ))}
        </div>
      ) : (
        <EmptyState title="Nenhum preparo encontrado" description="Ajuste a busca ou os filtros para visualizar outros itens." />
      )}
    </section>
  );
}
