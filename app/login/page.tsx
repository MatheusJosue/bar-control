import { Lock } from "lucide-react";
import { LoginForm } from "@/components/auth/LoginForm";
import { glassPanel } from "@/lib/glass";

export default function LoginPage() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-background px-4 py-4 text-foreground">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_12%,rgba(66,251,242,0.12),transparent_28%),radial-gradient(circle_at_85%_10%,rgba(139,92,246,0.09),transparent_30%),radial-gradient(circle_at_80%_80%,rgba(66,251,242,0.06),transparent_28%),linear-gradient(#ffffff0a_1px,transparent_1px),linear-gradient(90deg,#ffffff0a_1px,transparent_1px)] bg-[size:auto,auto,auto,18px_18px,18px_18px]" />

      <div className={`w-full max-w-sm p-6 sm:p-8 ${glassPanel}`}>
        <div className="mb-7 flex flex-col items-center text-center">
          <span className="mb-4 flex size-12 items-center justify-center rounded-xl bg-[#42fbf2]/15 text-[#42fbf2]">
            <Lock size={24} aria-hidden="true" />
          </span>
          <p className="text-xl font-extrabold tracking-tight text-[#42fbf2]">Bar Control</p>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight">Entrar</h1>
          <p className="mt-1 text-sm font-medium text-slate-400">Acesse o painel operacional do seu bar</p>
        </div>

        <LoginForm />

        <p className="mt-7 text-center text-xs leading-6 text-slate-500">
          © 2026 Bar Control Systems
        </p>
      </div>
    </main>
  );
}
