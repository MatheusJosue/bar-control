import type { LucideIcon } from "lucide-react";
import { glassCardHover } from "@/lib/glass";

interface DashboardCardProps {
  title: string;
  value: number;
  description: string;
  tone: "red" | "orange" | "yellow" | "green";
  icon: LucideIcon;
}

const toneClasses = {
  red: {
    bar: "bg-[#f87171]",
    glow: "bg-[#f87171]",
    icon: "bg-[#f87171]/12 text-[#f87171]",
    value: "text-[#f87171]",
  },
  orange: {
    bar: "bg-[#fb923c]",
    glow: "bg-[#fb923c]",
    icon: "bg-[#fb923c]/12 text-[#fb923c]",
    value: "text-[#fb923c]",
  },
  yellow: {
    bar: "bg-[#fbbf24]",
    glow: "bg-[#fbbf24]",
    icon: "bg-[#fbbf24]/12 text-[#fbbf24]",
    value: "text-[#fbbf24]",
  },
  green: {
    bar: "bg-[#42fbf2]",
    glow: "bg-[#42fbf2]",
    icon: "bg-[#42fbf2]/12 text-[#42fbf2]",
    value: "text-[#42fbf2]",
  },
};

export function DashboardCard({ title, value, description, tone, icon: Icon }: DashboardCardProps) {
  const tones = toneClasses[tone];

  return (
    <article className={`relative min-w-[210px] snap-start overflow-hidden p-4 ${glassCardHover}`}>
      <span className={`absolute inset-x-0 top-0 h-0.5 ${tones.bar}`} />
      <span className={`pointer-events-none absolute -right-6 -top-8 size-24 rounded-full opacity-25 blur-2xl ${tones.glow}`} />
      <div className="relative flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold text-slate-300">{title}</p>
          <p className={`mt-2 text-3xl font-extrabold tracking-tight ${tones.value}`}>{value}</p>
        </div>
        <span className={`flex size-10 items-center justify-center rounded-xl ring-1 ring-inset ring-white/10 ${tones.icon}`}>
          <Icon size={20} aria-hidden="true" />
        </span>
      </div>
      <p className="relative mt-3 text-xs font-medium text-slate-400">{description}</p>
    </article>
  );
}
