"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AppLayout } from "@/components/layout/AppLayout";
import { PwaRegistrar } from "@/components/pwa/PwaRegistrar";
import { AUTH_STORAGE_KEY } from "@/lib/auth";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/login";

  useEffect(() => {
    if (isLoginPage || typeof window === "undefined") {
      return;
    }

    const session = window.localStorage.getItem(AUTH_STORAGE_KEY);

    if (!session) {
      router.replace("/login");
    }
  }, [isLoginPage, router]);

  if (isLoginPage) {
    return (
      <>
        {children}
        <PwaRegistrar />
      </>
    );
  }

  return (
    <>
      <AppLayout>{children}</AppLayout>
      <PwaRegistrar />
    </>
  );
}
