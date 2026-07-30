"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppLayout } from "@/components/layout/AppLayout";
import { PwaRegistrar } from "@/components/pwa/PwaRegistrar";
import { supabase } from "@/lib/supabaseClient";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/login";
  const [isCheckingSession, setIsCheckingSession] = useState(!isLoginPage);

  useEffect(() => {
    if (isLoginPage) {
      return;
    }

    let isMounted = true;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!isMounted) return;

      if (!session) {
        router.replace("/login");
        return;
      }

      setIsCheckingSession(false);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.replace("/login");
      }
    });

    return () => {
      isMounted = false;
      subscription.subscription.unsubscribe();
    };
  }, [isLoginPage, router]);

  if (isLoginPage) {
    return (
      <>
        {children}
        <PwaRegistrar />
        <ToastContainer position="bottom-right" theme="dark" newestOnTop closeOnClick pauseOnHover />
      </>
    );
  }

  if (isCheckingSession) {
    return null;
  }

  return (
    <>
      <AppLayout>{children}</AppLayout>
      <PwaRegistrar />
      <ToastContainer position="bottom-right" theme="dark" newestOnTop closeOnClick pauseOnHover />
    </>
  );
}
