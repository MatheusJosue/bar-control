"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Boxes,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  CircleHelp,
  Home,
  LogOut,
  Settings,
  UserRound,
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { glassChrome } from "@/lib/glass";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/stock", label: "Estoque", icon: Boxes },
  { href: "/preps", label: "Preparos", icon: ClipboardList },
  { href: "/settings", label: "Configuracoes", icon: Settings },
  { href: "/support", label: "Suporte", icon: CircleHelp },
];

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

function CollapsedTooltip({ label }: { label: string }) {
  return (
    <span className="pointer-events-none absolute left-[calc(100%+0.75rem)] top-1/2 z-[999] hidden -translate-y-1/2 whitespace-nowrap rounded-xl border border-white/10 bg-[#0d1c2d]/90 px-3 py-2 text-xs font-bold text-[#42fbf2] opacity-0 shadow-xl shadow-black/40 backdrop-blur-xl transition group-hover:translate-x-1 group-hover:opacity-100 md:group-hover:block theme-light:bg-white/95">
      {label}
    </span>
  );
}

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/login");
  }

  return (
    <aside
      className={`fixed left-0 top-0 z-50 hidden h-screen border-r py-6 shadow-2xl shadow-black/50 transition-[width,padding] duration-300 md:flex md:flex-col ${glassChrome} ${
        isCollapsed ? "w-24 px-4" : "w-72 px-5"
      }`}
    >
      <div className={`mb-8 flex items-center gap-3 ${isCollapsed ? "justify-center" : "justify-between"}`}>
        {isCollapsed ? null : (
          <Link href="/dashboard" className="group relative flex min-w-0 items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#42fbf2] text-sm font-black text-[#03111f] shadow-lg shadow-[#42fbf2]/20">
              BC
            </span>
            <span className="min-w-0 transition-opacity duration-200">
              <span className="block truncate text-lg font-extrabold tracking-tight text-[#42fbf2]">Bar Control</span>
              <span className="block truncate text-xs text-slate-400">Validade e preparos</span>
            </span>
          </Link>
        )}

        <button
          type="button"
          onClick={onToggle}
          className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-200 backdrop-blur-md transition hover:border-[#42fbf2]/50 hover:text-[#42fbf2]"
          aria-label={isCollapsed ? "Abrir sidebar" : "Recolher sidebar"}
          title={isCollapsed ? "Abrir sidebar" : "Recolher sidebar"}
        >
          {isCollapsed ? <ChevronRight size={18} aria-hidden="true" /> : <ChevronLeft size={18} aria-hidden="true" />}
        </button>
      </div>

      {isCollapsed ? (
        <div className="mb-5 flex justify-center">
          <span
            className="group relative flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#42fbf2] backdrop-blur-md"
          >
            BP
            <CollapsedTooltip label="Bar Principal" />
          </span>
        </div>
      ) : (
        <div className="mb-5 rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-md">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#42fbf2]/65">Unidade</p>
          <p className="mt-1 text-sm font-medium text-white">Bar Principal</p>
        </div>
      )}

      <nav className="flex flex-1 flex-col gap-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group relative flex h-11 items-center rounded-xl text-sm transition ${
                isCollapsed ? "justify-center px-0" : "gap-3 px-3"
              } ${
                isActive
                  ? "bg-[#42fbf2] text-[#03111f] shadow-lg shadow-[#42fbf2]/20"
                  : "text-slate-300 hover:bg-white/5 hover:text-[#42fbf2]"
              }`}
            >
              <Icon size={18} aria-hidden="true" className="shrink-0" />
              <span className={isCollapsed ? "sr-only" : "truncate"}>{item.label}</span>
              {isCollapsed ? <CollapsedTooltip label={item.label} /> : null}
            </Link>
          );
        })}
      </nav>

      <div className={`rounded-xl border border-white/10 bg-white/5 backdrop-blur-md ${isCollapsed ? "p-2" : "p-3"}`}>
        <div className={`flex items-center ${isCollapsed ? "justify-center" : "gap-3"}`}>
          <div className="group relative flex size-9 items-center justify-center rounded-xl bg-[#13283d]/70 theme-light:bg-black/5 text-[#42fbf2] ring-1 ring-inset ring-white/10">
            <UserRound size={18} aria-hidden="true" />
            {isCollapsed ? <CollapsedTooltip label="Joao Pereira - Bar manager" /> : null}
          </div>
          <div className={isCollapsed ? "sr-only" : "min-w-0"}>
            <p className="text-sm font-medium">Joao Pereira</p>
            <p className="text-xs text-slate-400">Bar manager</p>
          </div>
        </div>
        {isCollapsed ? (
          <button
            type="button"
            onClick={handleLogout}
            className="group relative mt-2 flex size-9 w-full items-center justify-center rounded-xl border border-white/10 bg-[#13283d]/70 theme-light:bg-black/5 text-slate-200 transition hover:border-[#42fbf2]/50 hover:text-[#42fbf2]"
            aria-label="Sair"
          >
            <LogOut size={17} aria-hidden="true" />
            <CollapsedTooltip label="Sair" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleLogout}
            className="mt-3 inline-flex h-9 w-full items-center justify-center gap-2 rounded-xl bg-[#13283d]/70 theme-light:bg-black/5 text-sm font-bold text-white ring-1 ring-inset ring-white/10 transition hover:bg-[#42fbf2] hover:text-[#03111f]"
          >
            <LogOut size={16} aria-hidden="true" />
            Sair
          </button>
        )}
      </div>
    </aside>
  );
}
