"use client";

import { useSyncExternalStore } from "react";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { Sidebar } from "@/components/layout/Sidebar";
import { FloatingActionButton } from "@/components/ui/FloatingActionButton";

const SIDEBAR_STORAGE_KEY = "bar-control-sidebar-collapsed";
const SIDEBAR_STORAGE_EVENT = "bar-control-sidebar-change";

function subscribeToSidebarState(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(SIDEBAR_STORAGE_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(SIDEBAR_STORAGE_EVENT, onStoreChange);
  };
}

function getSidebarSnapshot() {
  return window.localStorage.getItem(SIDEBAR_STORAGE_KEY) === "true";
}

function getServerSidebarSnapshot() {
  return false;
}

export function AppLayout({ children }: { children: React.ReactNode }) {
  const isSidebarCollapsed = useSyncExternalStore(
    subscribeToSidebarState,
    getSidebarSnapshot,
    getServerSidebarSnapshot,
  );

  function toggleSidebar() {
    window.localStorage.setItem(SIDEBAR_STORAGE_KEY, String(!isSidebarCollapsed));
    window.dispatchEvent(new Event(SIDEBAR_STORAGE_EVENT));
  }

  return (
    <div className="min-h-screen bg-[#051424] text-zinc-100">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_12%,rgba(66,251,242,0.10),transparent_28%),radial-gradient(circle_at_80%_80%,rgba(66,251,242,0.06),transparent_28%),linear-gradient(#ffffff0a_1px,transparent_1px),linear-gradient(90deg,#ffffff0a_1px,transparent_1px)] bg-[size:auto,auto,18px_18px,18px_18px]" />
      <Sidebar isCollapsed={isSidebarCollapsed} onToggle={toggleSidebar} />
      <main
        className={`min-h-screen px-4 pb-28 pt-5 transition-[margin] duration-300 md:px-10 md:pb-10 md:pt-8 ${
          isSidebarCollapsed ? "md:ml-24" : "md:ml-72"
        }`}
      >
        <div className="w-full">{children}</div>
      </main>
      <FloatingActionButton />
      <BottomNavigation />
    </div>
  );
}
