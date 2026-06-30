"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { AUTH_STORAGE_KEY } from "@/lib/auth";

const inputClass =
  "h-11 w-full rounded-md border border-[#2a4158] bg-[#081a2d] px-10 text-sm text-white outline-none transition placeholder:text-slate-400/55 hover:border-[#42fbf2]/45 focus:border-[#42fbf2] focus:bg-[#092039] focus:shadow-[0_0_0_3px_rgba(66,251,242,0.10)]";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("joao@barcontrol.app");
  const [password, setPassword] = useState("barcontrol");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify({
        user: email,
        createdAt: new Date().toISOString(),
      }),
    );
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
            className="size-4 rounded border border-[#2a4158] bg-[#081a2d] accent-[#42fbf2]"
          />
          Lembrar
        </label>
        <a href="#" className="text-[#42fbf2] transition hover:text-white">
          Esqueci a senha
        </a>
      </div>

      <button
        type="submit"
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-[#42fbf2] px-4 text-sm font-bold text-[#03111f] shadow-[0_14px_34px_rgba(66,251,242,0.20)] transition hover:bg-white"
      >
        Entrar
        <ArrowRight size={18} aria-hidden="true" />
      </button>

      <div className="hidden pt-4 text-center lg:block">
        <p className="text-xs text-slate-400">Ainda nao tem conta no seu bar?</p>
        <a
          href="#"
          className="mt-3 inline-flex h-10 w-full items-center justify-center rounded-md border border-[#42fbf2]/35 text-xs font-bold text-white transition hover:border-[#42fbf2] hover:bg-[#42fbf2]/10"
        >
          Solicitar acesso a gerencia
        </a>
      </div>
    </form>
  );
}
