"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { createClient } from "@/lib/supabase/client";

interface AdminLoginFormProps {
  locale: string;
  initialError?: string;
  showForbiddenNotice: boolean;
}

export default function AdminLoginForm({
  locale,
  initialError,
  showForbiddenNotice,
}: AdminLoginFormProps) {
  const t = useTranslations("admin.login");
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(
    initialError === "auth_callback_failed" ? t("callbackError") : null,
  );
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSuccess(false);
    setIsSubmitting(true);

    const emailValue = email.trim().toLowerCase();

    try {
      const callbackUrl = new URL(`/${locale}/auth/callback`, window.location.origin);
      callbackUrl.searchParams.set("next", `/${locale}/admin`);

      const { error: signInError } = await supabase.auth.signInWithOtp({
        email: emailValue,
        options: {
          emailRedirectTo: callbackUrl.toString(),
        },
      });

      if (signInError) {
        throw signInError;
      }

      setIsSuccess(true);
    } catch (submitError) {
      const message =
        submitError instanceof Error ? submitError.message : t("errorGeneric");
      setError(message || t("errorGeneric"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <div className="w-full max-w-md rounded-xl border bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-semibold text-gray-900">{t("title")}</h1>
      <p className="mt-2 text-sm text-gray-600">{t("description")}</p>

      {showForbiddenNotice && (
        <div className="mt-4 rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
          <p>{t("forbiddenNotice")}</p>
          <button
            type="button"
            onClick={handleSignOut}
            className="mt-2 text-sm font-medium text-amber-900 underline"
          >
            {t("signOutCurrent")}
          </button>
        </div>
      )}

      {error && (
        <div className="mt-4 rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-800">
          {error}
        </div>
      )}

      {isSuccess && (
        <div className="mt-4 rounded-md border border-emerald-300 bg-emerald-50 p-3 text-sm text-emerald-800">
          {t("success")}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
            {t("emailLabel")}
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={t("emailPlaceholder")}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? t("sending") : t("submit")}
        </button>
      </form>
    </div>
  );
}
