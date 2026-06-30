"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { usePathname } from "next/navigation";

export function FloatingActionButton() {
  const pathname = usePathname();

  if (pathname === "/preps/new") {
    return null;
  }

  return (
    <Link
      href="/preps/new"
      className="fixed bottom-24 right-4 z-20 flex size-14 items-center justify-center rounded-xl bg-[#42fbf2] text-[#03111f] shadow-xl shadow-[#42fbf2]/25 transition hover:bg-white md:hidden"
      aria-label="Novo preparo"
    >
      <Plus size={24} aria-hidden="true" />
    </Link>
  );
}
