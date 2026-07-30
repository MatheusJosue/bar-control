import type { ReactNode } from "react";
import { glassPanel } from "@/lib/glass";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function PageHeader({ eyebrow, title, description, action }: PageHeaderProps) {
  return (
    <header className={`relative mb-6 flex flex-col gap-4 overflow-hidden p-4 sm:flex-row sm:items-end sm:justify-between ${glassPanel}`}>
      <div className="pointer-events-none absolute -right-10 -top-16 size-48 rounded-full bg-[#42fbf2]/10 blur-3xl" />
      <div className="relative">
        {eyebrow ? (
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-[#42fbf2]">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
          {title}
        </h1>
        {description ? <p className="mt-2 max-w-2xl text-sm font-medium text-slate-400">{description}</p> : null}
      </div>
      <div className="relative">{action}</div>
    </header>
  );
}
