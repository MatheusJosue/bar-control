"use client";

import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchInput({ value, onChange, placeholder = "Buscar" }: SearchInputProps) {
  return (
    <label className="relative block">
      <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#42fbf2]/70" size={18} />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-11 w-full rounded-md border border-[#2a4158] bg-[#0d1c2d] pl-10 pr-3 text-sm font-medium text-white outline-none transition placeholder:text-slate-500 focus:border-[#42fbf2] focus:shadow-[0_0_0_3px_rgba(66,251,242,0.10)]"
      />
    </label>
  );
}
