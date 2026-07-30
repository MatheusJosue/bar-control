"use client";

import { useState } from "react";
import { Boxes, Check, Minus, Pencil, Plus, TrendingDown, Trash2, X } from "lucide-react";
import { glassCardHover, glassInput } from "@/lib/glass";
import type { StockItem } from "@/types/stock";

interface StockItemCardProps {
  item: StockItem;
  isPending: boolean;
  onAdjust: (id: string, delta: number) => void;
  onDelete: (id: string) => void;
}

export function StockItemCard({ item, isPending, onAdjust, onDelete }: StockItemCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftValue, setDraftValue] = useState(String(item.currentQuantity));

  function startEditing() {
    setDraftValue(String(item.currentQuantity));
    setIsEditing(true);
  }

  function commitEdit() {
    const parsed = Number(draftValue);

    if (Number.isFinite(parsed) && parsed >= 0) {
      const delta = parsed - item.currentQuantity;
      if (delta !== 0) {
        onAdjust(item.id, delta);
      }
    }

    setIsEditing(false);
  }

  return (
    <article className={`p-4 ${glassCardHover}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="font-extrabold tracking-tight text-white">{item.name}</h2>
          <p className="mt-1 text-sm font-medium text-slate-400">{item.category}</p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`flex size-10 items-center justify-center rounded-xl ring-1 ring-inset ring-white/10 ${
              item.status === "low_stock" ? "bg-[#fbbf24]/12 text-[#fbbf24]" : "bg-[#42fbf2]/12 text-[#42fbf2]"
            }`}
          >
            {item.status === "low_stock" ? <TrendingDown size={20} /> : <Boxes size={20} />}
          </span>
          <button
            type="button"
            onClick={() => {
              if (window.confirm(`Excluir "${item.name}"? Essa acao nao pode ser desfeita.`)) {
                onDelete(item.id);
              }
            }}
            aria-label={`Excluir ${item.name}`}
            className="flex size-7 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-[#f87171]/15 hover:text-[#f87171]"
          >
            <Trash2 size={15} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="mt-5 flex items-end justify-between border-t border-white/10 pt-4">
        {isEditing ? (
          <div className="flex items-center gap-1.5">
            <input
              type="number"
              min="0"
              step="1"
              autoFocus
              value={draftValue}
              onChange={(event) => setDraftValue(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") commitEdit();
                if (event.key === "Escape") setIsEditing(false);
              }}
              className={`h-10 w-20 px-2 text-lg font-extrabold text-white outline-none ${glassInput}`}
            />
            <button
              type="button"
              onClick={commitEdit}
              aria-label={`Confirmar quantidade de ${item.name}`}
              className="flex size-8 items-center justify-center rounded-lg bg-[#42fbf2] text-[#03111f] transition hover:bg-white"
            >
              <Check size={15} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              aria-label="Cancelar"
              className="flex size-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
            >
              <X size={15} aria-hidden="true" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={startEditing}
            disabled={isPending}
            className="group flex items-center gap-2 rounded-lg px-1 py-0.5 text-left transition hover:bg-white/5 disabled:cursor-not-allowed"
          >
            <div>
              <p className="text-2xl font-extrabold tracking-tight text-white">{item.currentQuantity}</p>
              <p className="text-sm font-medium text-slate-400">{item.unit} atuais</p>
            </div>
            <Pencil size={13} className="text-slate-500 opacity-0 transition group-hover:opacity-100" aria-hidden="true" />
          </button>
        )}
        <p className="text-sm font-bold text-slate-300">Minimo: {item.minimumQuantity}</p>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2 border-t border-white/10 pt-4">
        <button
          type="button"
          disabled={isPending || isEditing || item.currentQuantity <= 0}
          onClick={() => onAdjust(item.id, -1)}
          aria-label={`Diminuir quantidade de ${item.name} em 1`}
          className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white backdrop-blur-md transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Minus size={16} aria-hidden="true" />
        </button>
        <span className="w-10 text-center text-sm font-bold text-slate-300">
          {isPending ? "..." : "un."}
        </span>
        <button
          type="button"
          disabled={isPending || isEditing}
          onClick={() => onAdjust(item.id, 1)}
          aria-label={`Aumentar quantidade de ${item.name} em 1`}
          className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white backdrop-blur-md transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Plus size={16} aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}
