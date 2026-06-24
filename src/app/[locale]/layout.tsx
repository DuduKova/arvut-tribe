import type { Metadata } from "next";
import "../globals.css";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";

const locales = ["he", "en"] as const;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isHebrew = locale === "he";

  const title = isHebrew
    ? "שומרי השבט - מסע ריפוי משולב"
    : "Tribe Guardians - Integrated Healing Journey";
  const description = isHebrew
    ? "דרך ריפוי קלינית ומשולבת לחיילים וללוחמים"
    : "A clinically supported healing journey for fighters and veterans";

  // Use deployed project URL as default metadata base.
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://tribe-guardians.vercel.app";

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${locale}`,
      siteName: isHebrew ? "שומרי השבט" : "Tribe Guardians",
      images: [
        {
          url: "/tribe-guardians/logo.jpg",
          width: 1024,
          height: 1024,
          alt: title,
        },
      ],
      locale: isHebrew ? "he_IL" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/tribe-guardians/logo.jpg"],
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isHebrew = locale === "he";

  if (!locales.includes(locale as (typeof locales)[number])) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} dir={isHebrew ? "rtl" : "ltr"}>
      <body className="font-secondary">
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
