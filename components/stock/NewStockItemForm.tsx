"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";
import { toast } from "react-toastify";
import { apiFetch } from "@/lib/api";
import { glassInput, glassPanel } from "@/lib/glass";
import type { StockItem } from "@/types/stock";

const inputClass = `h-11 px-3 text-sm font-medium text-white outline-none ${glassInput}`;

export function NewStockItemForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    try {
      setIsSubmitting(true);
      await apiFetch<StockItem>("/api/stock", {
        method: "POST",
        body: JSON.stringify({
          name: formData.get("name"),
          category: formData.get("category"),
          unit: formData.get("unit"),
          currentQuantity: formData.get("currentQuantity"),
          minimumQuantity: formData.get("minimumQuantity"),
        }),
      });

      toast.success("Item cadastrado no estoque.");
      router.push("/stock");
    } catch {
      toast.error("Nao foi possivel cadastrar o item. Verifique os campos e tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-5 p-4 sm:p-6 ${glassPanel}`}>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold text-slate-200">
          Item
          <input name="name" className={inputClass} placeholder="Gin Tanqueray" required />
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-200">
          Categoria
          <input name="category" className={inputClass} placeholder="Spirit" required />
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-200">
          Unidade
          <input name="unit" className={inputClass} placeholder="garrafas" required />
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-200">
          Quantidade atual
          <input name="currentQuantity" className={inputClass} type="number" min="0" step="1" defaultValue="0" required />
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-200">
          Quantidade minima
          <input name="minimumQuantity" className={inputClass} type="number" min="0" step="1" defaultValue="0" required />
        </label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#42fbf2] px-4 text-sm font-extrabold text-[#03111f] shadow-lg shadow-[#42fbf2]/20 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        <Save size={18} aria-hidden="true" />
        {isSubmitting ? "Salvando..." : "Salvar item"}
      </button>
    </form>
  );
}
