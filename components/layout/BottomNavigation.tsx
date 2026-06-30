"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AlertTriangle, Boxes, Home, Menu } from "lucide-react";

const items = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/alerts", label: "Alertas", icon: AlertTriangle },
  { href: "/stock", label: "Inventario", icon: Boxes },
  { href: "/settings", label: "Menu", icon: Menu },
];

export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-[#2a4158] bg-[#071624]/95 px-3 pb-[max(env(safe-area-inset-bottom),0.75rem)] pt-2 shadow-2xl shadow-black/60 backdrop-blur-xl md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-4 gap-2">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex h-14 flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-bold ${
                isActive
                  ? "bg-[#42fbf2] text-[#03111f] shadow-lg shadow-[#42fbf2]/20"
                  : "text-slate-300 hover:bg-[#0d1c2d]"
              }`}
            >
              <Icon size={20} aria-hidden="true" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
