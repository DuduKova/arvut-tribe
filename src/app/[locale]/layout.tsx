import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "../globals.css";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-primary",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-secondary",
  display: "swap",
});

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
    ? "שומרי השבט - שליחת טפסים"
    : "Tribe Guardians - Submit Forms";
  const description = isHebrew
    ? "מסע ריפוי וצמיחה בתמיכה שבטית"
    : "A healing and growth journey with tribal support";

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
          url: "/branding/tribeg-logo.svg",
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
      images: ["/branding/tribeg-logo.svg"],
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
      <body
        className={`${playfairDisplay.variable} ${lato.variable} font-secondary`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
