"use client";

import { Search } from "lucide-react";
import { glassInput } from "@/lib/glass";

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
        className={`h-11 w-full pl-10 pr-3 text-sm font-medium text-white outline-none ${glassInput}`}
      />
    </label>
  );
}
