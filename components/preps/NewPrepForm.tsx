"use client";

import { useState } from "react";
import { Save } from "lucide-react";

const inputClass =
  "h-11 rounded-md border border-[#2a4158] bg-[#081a2d] px-3 text-sm font-medium text-white outline-none transition placeholder:text-slate-500 hover:border-[#42fbf2]/45 focus:border-[#42fbf2] focus:shadow-[0_0_0_3px_rgba(66,251,242,0.10)]";

export function NewPrepForm() {
  const [message, setMessage] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("Preparo criado com sucesso. Dados mockados por enquanto.");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-[#2a4158] bg-[#0d1c2d] p-4 shadow-xl shadow-black/25 sm:p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold text-slate-200">
          Produto/preparo
          <input className={inputClass} placeholder="Xarope de gengibre" required />
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-200">
          Categoria
          <select className={inputClass} defaultValue="Syrup">
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
          <input className={inputClass} defaultValue="Bar Principal" />
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-200">
          Responsavel
          <input className={inputClass} placeholder="Nome da pessoa" />
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-200">
          Data de preparo
          <input className={inputClass} type="date" defaultValue="2026-06-30" />
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-200">
          Validade em dias
          <input className={inputClass} type="number" min="1" defaultValue="7" />
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-200">
          Quantidade
          <input className={inputClass} type="number" min="0" step="0.1" placeholder="1.5" />
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-200">
          Unidade
          <select className={inputClass} defaultValue="L">
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
          className="min-h-28 rounded-md border border-[#2a4158] bg-[#081a2d] px-3 py-3 text-sm font-medium text-white outline-none transition placeholder:text-slate-500 hover:border-[#42fbf2]/45 focus:border-[#42fbf2] focus:shadow-[0_0_0_3px_rgba(66,251,242,0.10)]"
          placeholder="Lote, textura, ajustes de receita ou observacoes da equipe"
        />
      </label>

      {message ? (
        <div className="rounded-md border border-[#42fbf2]/25 bg-[#42fbf2]/10 p-3 text-sm font-medium text-[#bffffb]">
          {message}
        </div>
      ) : null}

      <button
        type="submit"
        className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-[#42fbf2] px-4 text-sm font-extrabold text-[#03111f] shadow-lg shadow-[#42fbf2]/20 transition hover:bg-white sm:w-auto"
      >
        <Save size={18} aria-hidden="true" />
        Salvar preparo
      </button>
    </form>
  );
}
