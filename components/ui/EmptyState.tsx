import type { ReactNode } from "react";

export function EmptyState({ title, description, action }: { title: string; description: string; action?: ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-white/15 bg-[#0d1c2d]/40 p-8 text-center shadow-lg shadow-black/20 backdrop-blur-xl theme-light:bg-white/50">
      <h2 className="text-lg font-extrabold tracking-tight text-white">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm font-medium text-slate-400">{description}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
