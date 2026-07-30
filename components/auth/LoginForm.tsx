"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { glassInput } from "@/lib/glass";

const inputClass = `h-11 w-full px-10 text-sm text-white outline-none ${glassInput}`;

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    setIsSubmitting(false);

    if (signInError) {
      toast.error("E-mail ou senha invalidos.");
      return;
    }

    toast.success("Login realizado com sucesso.");
    router.replace("/dashboard");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="grid gap-2 text-xs font-semibold text-slate-200">
        E-mail
        <span className="relative">
          <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#42fbf2]/70" size={17} />
          <input
            className={inputClass}
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="nome@barcontrol.pt"
            required
          />
        </span>
      </label>
      <label className="grid gap-2 text-xs font-semibold text-slate-200">
        Palavra-passe
        <span className="relative">
          <Lock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#42fbf2]/70" size={17} />
          <input
            className={`${inputClass} pr-10`}
            type={isPasswordVisible ? "text" : "password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setIsPasswordVisible((current) => !current)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300/70 transition hover:text-[#42fbf2]"
            aria-label={isPasswordVisible ? "Ocultar senha" : "Visualizar senha"}
            aria-pressed={isPasswordVisible}
          >
            {isPasswordVisible ? <EyeOff size={17} aria-hidden="true" /> : <Eye size={17} aria-hidden="true" />}
          </button>
        </span>
      </label>

      <div className="flex items-center justify-between gap-3 text-xs font-semibold">
        <label className="inline-flex items-center gap-2 text-slate-300">
          <input
            type="checkbox"
            className="size-4 rounded border border-white/15 bg-white/5 accent-[#42fbf2]"
          />
          Lembrar
        </label>
        <a href="#" className="text-[#42fbf2] transition hover:text-white">
          Esqueci a senha
        </a>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-[#42fbf2] px-4 text-sm font-bold text-[#03111f] shadow-[0_14px_34px_rgba(66,251,242,0.20)] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Entrando..." : "Entrar"}
        <ArrowRight size={18} aria-hidden="true" />
      </button>
    </form>
  );
}
