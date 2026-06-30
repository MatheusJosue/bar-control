import type { ReactNode } from "react";

export function EmptyState({ title, description, action }: { title: string; description: string; action?: ReactNode }) {
  return (
    <div className="rounded-md border border-dashed border-[#2a4158] bg-[#0d1c2d] p-8 text-center shadow-lg shadow-black/20">
      <h2 className="text-lg font-extrabold tracking-tight text-white">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm font-medium text-slate-400">{description}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
