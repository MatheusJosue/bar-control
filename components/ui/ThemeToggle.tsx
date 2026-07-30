"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { applyTheme, getStoredTheme, THEME_CHANGE_EVENT, type Theme } from "@/lib/theme";

function subscribe(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(THEME_CHANGE_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(THEME_CHANGE_EVENT, onStoreChange);
  };
}

function getServerSnapshot(): Theme {
  return "dark";
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getStoredTheme, getServerSnapshot);
  const isLight = theme === "light";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isLight}
      onClick={() => applyTheme(isLight ? "dark" : "light")}
      className="inline-flex h-9 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 text-xs font-bold text-white backdrop-blur-md transition hover:bg-white/10 theme-light:border-black/10 theme-light:bg-black/5 theme-light:hover:bg-black/10"
    >
      {isLight ? <Sun size={15} aria-hidden="true" /> : <Moon size={15} aria-hidden="true" />}
      {isLight ? "Claro" : "Escuro"}
    </button>
  );
}
