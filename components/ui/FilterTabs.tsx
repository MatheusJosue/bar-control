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
          className={`h-9 shrink-0 rounded-lg border px-3 text-sm font-medium transition ${
            value === tab.value
              ? "border-[#42fbf2] bg-[#42fbf2] text-[#03111f] shadow-lg shadow-[#42fbf2]/20"
              : "border-[#2a4158] bg-[#0d1c2d] text-slate-300 hover:border-[#42fbf2]/50 hover:text-[#42fbf2]"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
