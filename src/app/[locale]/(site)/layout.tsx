import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import GoogleAnalyticsConsent from "@/components/GoogleAnalyticsConsent";
import TribeGuardiansShell from "@/components/TribeGuardiansShell";

export default async function SiteLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const t = await getTranslations("navigation");
  const tFooter = await getTranslations("footer");
  const gaId =
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || "G-9100MV6K3L";

  return (
    <>
      <TribeGuardiansShell
        locale={locale}
        organizationName={t("organizationName")}
        footerOrganizationName={tFooter("organizationName")}
        footerContact={tFooter("contact")}
        footerEmailLabel={tFooter("email")}
        copyright={tFooter("copyright")}
        links={{
          primary: [
            { label: t("home"), href: `/${locale}` },
            { label: t("donate"), href: `/${locale}/donate` },
            { label: t("register"), href: `/${locale}/register-patient` },
            { label: t("volunteer"), href: `/${locale}/volunteer-healer` },
          ],
          footer: [
            {
              heading: tFooter("quickLinks"),
              links: [
                { label: t("home"), href: `/${locale}` },
                { label: t("donate"), href: `/${locale}/donate` },
                { label: t("register"), href: `/${locale}/register-patient` },
                { label: t("volunteer"), href: `/${locale}/volunteer-healer` },
              ],
            },
          ],
        }}
      >
        {children}
      </TribeGuardiansShell>
      <GoogleAnalyticsConsent gaId={gaId} />
    </>
  );
}
