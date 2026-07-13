"use client";

import Script from "next/script";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const CONSENT_STORAGE_KEY = "tribeGuardiansAnalyticsConsent";

type ConsentState = "accepted" | "declined" | "pending";

type GoogleAnalyticsConsentProps = {
  gaId?: string;
};

export default function GoogleAnalyticsConsent({
  gaId,
}: GoogleAnalyticsConsentProps) {
  const t = useTranslations("analyticsConsent");
  const [consent, setConsent] = useState<ConsentState | null>(null);

  useEffect(() => {
    if (!gaId) {
      setConsent("declined");
      return;
    }

    try {
      const storedConsent = window.localStorage.getItem(CONSENT_STORAGE_KEY);
      setConsent(
        storedConsent === "accepted" || storedConsent === "declined"
          ? storedConsent
          : "pending"
      );
    } catch {
      setConsent("pending");
    }
  }, [gaId]);

  function updateConsent(nextConsent: ConsentState) {
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, nextConsent);
    } catch {
      // Continue with the in-memory choice when browser storage is unavailable.
    }

    setConsent(nextConsent);
  }

  if (!gaId || consent === null || consent === "declined") {
    return null;
  }

  if (consent === "accepted") {
    return (
      <>
        <Script
          id="google-analytics"
          src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(
            gaId
          )}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', ${JSON.stringify(gaId)});
          `}
        </Script>
      </>
    );
  }

  return (
    <div
      aria-label={t("ariaLabel")}
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-3xl rounded-xl border border-[#d8cbb2] bg-[#fffaf0] p-4 text-[#1f2a1d] shadow-2xl md:bottom-5 md:p-5"
      role="region"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <p className="font-primary text-base font-bold">{t("title")}</p>
          <p className="mt-1 text-sm leading-6 text-[#4f5a45]">
            {t("description")}
          </p>
        </div>

        <div className="flex shrink-0 gap-2">
          <button
            className="rounded-md border border-[#b8a88b] px-4 py-2 text-sm font-semibold text-[#3f4b34] transition hover:bg-[#f3ead8] focus:outline-none focus:ring-2 focus:ring-[#8b5e3c] focus:ring-offset-2"
            type="button"
            onClick={() => updateConsent("declined")}
          >
            {t("decline")}
          </button>
          <button
            className="rounded-md bg-[#2d4a2d] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#243d24] focus:outline-none focus:ring-2 focus:ring-[#8b5e3c] focus:ring-offset-2"
            type="button"
            onClick={() => updateConsent("accepted")}
          >
            {t("accept")}
          </button>
        </div>
      </div>
    </div>
  );
}
