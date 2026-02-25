import type { User } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export type AdminAuthState =
  | { kind: "authorized"; user: User }
  | { kind: "unauthenticated" }
  | { kind: "forbidden"; user: User };

const NO_STORE_HEADERS = {
  "Cache-Control": "no-store",
} as const;

export function getNoStoreHeaders(): Record<string, string> {
  return { ...NO_STORE_HEADERS };
}

export function jsonNoStore(
  data: unknown,
  init: Omit<ResponseInit, "headers"> & { headers?: HeadersInit } = {},
) {
  return NextResponse.json(data, {
    ...init,
    headers: {
      ...NO_STORE_HEADERS,
      ...(init.headers || {}),
    },
  });
}

export function getAdminEmailAllowlist(raw = process.env.ADMIN_EMAILS ?? "") {
  return raw
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function isAllowlistedAdmin(email: string | undefined | null): boolean {
  if (!email) {
    return false;
  }

  const normalizedEmail = email.trim().toLowerCase();
  const allowlist = getAdminEmailAllowlist();
  return allowlist.includes(normalizedEmail);
}

export async function getCurrentAdminUser(): Promise<AdminAuthState> {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return { kind: "unauthenticated" };
  }

  if (!isAllowlistedAdmin(user.email)) {
    return { kind: "forbidden", user };
  }

  return { kind: "authorized", user };
}

export async function requireAdminApiUser() {
  const authState = await getCurrentAdminUser();

  if (authState.kind === "authorized") {
    return { user: authState.user };
  }

  if (authState.kind === "unauthenticated") {
    return {
      response: jsonNoStore({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  return {
    response: jsonNoStore({ error: "Forbidden" }, { status: 403 }),
  };
}
