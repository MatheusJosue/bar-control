"use client";

export interface FilterTab<T extends string> {
  label: string;
  value: T;
}

interface FilterTabsProps<T extends string> {
  tabs: FilterTab<T>[];
  value: T;
  onChange: (value: T) => void;
}

export function FilterTabs<T extends string>({ tabs, value, onChange }: FilterTabsProps<T>) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          type="button"
          onClick={() => onChange(tab.value)}
          className={`h-9 shrink-0 rounded-xl border px-3 text-sm font-medium backdrop-blur-md transition ${
            value === tab.value
              ? "border-[#42fbf2] bg-[#42fbf2] text-[#03111f] shadow-lg shadow-[#42fbf2]/20"
              : "border-white/10 bg-[#0d1c2d]/50 text-slate-300 hover:border-[#42fbf2]/50 hover:bg-[#0d1c2d]/70 hover:text-[#42fbf2] theme-light:bg-white/60 theme-light:hover:bg-white/85"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
