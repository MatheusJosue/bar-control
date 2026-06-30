import type { ReactNode } from "react";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function PageHeader({ eyebrow, title, description, action }: PageHeaderProps) {
  return (
    <header className="mb-6 flex flex-col gap-4 rounded-2xl border border-[#2a4158] bg-[#071624] p-4 shadow-xl shadow-black/20 sm:flex-row sm:items-end sm:justify-between">
      <div>
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
      {action}
    </header>
  );
}
