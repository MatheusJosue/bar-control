"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import { toast } from "react-toastify";
import { apiFetch } from "@/lib/api";
import { glassInput, glassPanel } from "@/lib/glass";
import type { Prep } from "@/types/prep";

const inputClass = `h-11 px-3 text-sm font-medium text-white outline-none ${glassInput}`;

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

export function NewPrepForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const quantity = formData.get("quantity");

    try {
      setIsSubmitting(true);
      await apiFetch<Prep>("/api/preps", {
        method: "POST",
        body: JSON.stringify({
          name: formData.get("name"),
          category: formData.get("category"),
          area: formData.get("area"),
          responsible: formData.get("responsible"),
          madeAt: formData.get("madeAt"),
          validityDays: formData.get("validityDays"),
          quantity: quantity ? quantity : undefined,
          unit: formData.get("unit"),
          notes: formData.get("notes") || undefined,
        }),
      });

      toast.success("Preparo criado com sucesso.");
      form.reset();
    } catch {
      toast.error("Nao foi possivel salvar o preparo. Verifique os campos e tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-5 p-4 sm:p-6 ${glassPanel}`}>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold text-slate-200">
          Produto/preparo
          <input name="name" className={inputClass} placeholder="Xarope de gengibre" required />
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-200">
          Categoria
          <select name="category" className={inputClass} defaultValue="Syrup">
            <option>Syrup</option>
            <option>Puree</option>
            <option>Juice</option>
            <option>Garnish</option>
            <option>BatchCocktail</option>
            <option>Other</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-200">
          Area
          <input name="area" className={inputClass} defaultValue="Bar Principal" required />
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-200">
          Responsavel
          <input name="responsible" className={inputClass} placeholder="Nome da pessoa" required />
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-200">
          Data de preparo
          <input name="madeAt" className={inputClass} type="date" defaultValue={todayIso()} required />
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-200">
          Validade em dias
          <input name="validityDays" className={inputClass} type="number" min="1" defaultValue="7" required />
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-200">
          Quantidade
          <input name="quantity" className={inputClass} type="number" min="0" step="0.1" placeholder="1.5" />
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-200">
          Unidade
          <select name="unit" className={inputClass} defaultValue="L">
            <option>L</option>
            <option>ml</option>
            <option>kg</option>
            <option>g</option>
            <option>unidades</option>
          </select>
        </label>
      </div>

      <label className="grid gap-2 text-sm font-bold text-slate-200">
        Observacoes
        <textarea
          name="notes"
          className={`min-h-28 px-3 py-3 text-sm font-medium text-white outline-none ${glassInput}`}
          placeholder="Lote, textura, ajustes de receita ou observacoes da equipe"
        />
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-[#42fbf2] px-4 text-sm font-extrabold text-[#03111f] shadow-lg shadow-[#42fbf2]/20 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        <Save size={18} aria-hidden="true" />
        {isSubmitting ? "Salvando..." : "Salvar preparo"}
      </button>
    </form>
  );
}
