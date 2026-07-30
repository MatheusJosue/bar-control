import { toast } from "react-toastify";
import { supabase } from "@/lib/supabaseClient";

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export class ApiError extends Error {}

let isRedirectingToLogin = false;

function redirectToLogin(message: string) {
  if (isRedirectingToLogin) return;
  isRedirectingToLogin = true;
  toast.info(message);
  window.location.href = "/login";
}

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirectToLogin("Faca login para continuar.");
    throw new ApiError("Nao autenticado");
  }

  const response = await fetch(`${apiUrl}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.access_token}`,
      ...init?.headers,
    },
  });

  if (response.status === 401) {
    await supabase.auth.signOut();
    redirectToLogin("Sua sessao expirou. Faca login novamente.");
    throw new ApiError("Sessao expirada");
  }

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    const message = body?.error ? JSON.stringify(body.error) : `Erro ${response.status}`;
    throw new ApiError(message);
  }

  return response.json() as Promise<T>;
}
