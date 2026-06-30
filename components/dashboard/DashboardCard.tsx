import type { LucideIcon } from "lucide-react";

interface DashboardCardProps {
  title: string;
  value: number;
  description: string;
  tone: "red" | "orange" | "yellow" | "green";
  icon: LucideIcon;
}

const toneClasses = {
  red: {
    shell: "border-l-[#f87171]",
    icon: "bg-[#f87171]/12 text-[#f87171]",
    value: "text-[#f87171]",
  },
  orange: {
    shell: "border-l-[#fb923c]",
    icon: "bg-[#fb923c]/12 text-[#fb923c]",
    value: "text-[#fb923c]",
  },
  yellow: {
    shell: "border-l-[#fbbf24]",
    icon: "bg-[#fbbf24]/12 text-[#fbbf24]",
    value: "text-[#fbbf24]",
  },
  green: {
    shell: "border-l-[#42fbf2]",
    icon: "bg-[#42fbf2]/12 text-[#42fbf2]",
    value: "text-[#42fbf2]",
  },
};

export function DashboardCard({ title, value, description, tone, icon: Icon }: DashboardCardProps) {
  return (
    <article className={`relative min-w-[210px] snap-start rounded-md border border-[#2a4158] border-l-4 bg-[#0d1c2d] p-4 shadow-lg shadow-black/20 ${toneClasses[tone].shell}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold text-slate-300">{title}</p>
          <p className={`mt-2 text-3xl font-extrabold tracking-tight ${toneClasses[tone].value}`}>{value}</p>
        </div>
        <span className={`flex size-10 items-center justify-center rounded-md ${toneClasses[tone].icon}`}>
          <Icon size={20} aria-hidden="true" />
        </span>
      </div>
      <p className="mt-3 text-xs font-medium text-slate-400">{description}</p>
    </article>
  );
}
