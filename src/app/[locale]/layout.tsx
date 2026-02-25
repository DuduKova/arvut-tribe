import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "../globals.css";
import Link from "next/link";
import Image from "next/image";
import { getTranslations, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher";

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

const locales = ["he", "en"];

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
  // Validate that the incoming `locale` parameter is valid
  const { locale } = await params;
  const isHebrew = locale === "he";
  
  if (!locales.includes(locale as "he" | "en")) {
    return <div>Locale not found</div>;
  }

  // Get translations for the current locale
  const t = await getTranslations("navigation");
  const tFooter = await getTranslations("footer");
  const messages = await getMessages();

  return (
    <html lang={locale} dir={isHebrew ? "rtl" : "ltr"}>
      <body
        className={`${playfairDisplay.variable} ${lato.variable} font-secondary`}
      >
        <NextIntlClientProvider messages={messages}>
          <div className="min-h-screen bg-gray-50">
            {/* Header - Locked to LTR to prevent layout flip */}
            <div dir="ltr">
              <header className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-4">
                  <div className="flex items-center justify-between">
                    <Link
                      href={`/${locale}`}
                      className="flex items-center gap-3"
                    >
                      <Image
                        src="/branding/tribeg-logo.svg"
                        alt={t("organizationName")}
                        width={56}
                        height={56}
                        priority
                      />
                      <span className="text-lg md:text-2xl font-bold text-gray-900">
                        {t("organizationName")}
                      </span>
                    </Link>

                    <nav className="hidden md:flex items-center space-x-6">
                      <Link
                        href={`/${locale}`}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        {t("home")}
                      </Link>
                      <Link
                        href={`/${locale}/volunteer-healer`}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        {t("volunteer")}
                      </Link>
                      <Link
                        href={`/${locale}/register-patient`}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        {t("register")}
                      </Link>
                    </nav>

                    <LanguageSwitcher />
                  </div>
                </div>
              </header>
            </div>

            {/* Main Content */}
            <main>{children}</main>

            {/* Footer - Locked to LTR to prevent layout flip, but text aligns to language direction */}
            <div dir="ltr">
              <footer className="bg-gray-900 text-white py-8">
                <div className="container mx-auto px-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div dir={isHebrew ? "rtl" : "ltr"} className={isHebrew ? "text-right" : "text-left"}>
                      <div className="flex items-center gap-3 mb-4">
                        <Image
                          src="/branding/tribeg-logo.svg"
                          alt={tFooter("organizationName")}
                          width={52}
                          height={52}
                        />
                        <h3 className="text-lg font-semibold">{tFooter("organizationName")}</h3>
                      </div>
                      <p className="text-gray-300">
                        
                      </p>
                    </div>
                    <div dir={isHebrew ? "rtl" : "ltr"} className={isHebrew ? "text-right" : "text-left"}>
                      <h3 className="text-lg font-semibold mb-4">{tFooter("contact")}</h3>
                      <p className="text-gray-300">{tFooter("email")}: thetribeguardians@gmail.com</p>
                    </div>
                    <div dir={isHebrew ? "rtl" : "ltr"} className={isHebrew ? "text-right" : "text-left"}>
                      <h3 className="text-lg font-semibold mb-4">{tFooter("quickLinks")}</h3>
                      <div className="space-y-2">
                        <Link
                          href={`/${locale}/volunteer-healer`}
                          className="block text-gray-300 hover:text-white"
                        >
                          {t("volunteer")}
                        </Link>
                        <Link
                          href={`/${locale}/register-patient`}
                          className="block text-gray-300 hover:text-white"
                        >
                          {t("register")}
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
                    <p dir={isHebrew ? "rtl" : "ltr"}>{tFooter("copyright")}</p>
                  </div>
                </div>
              </footer>
            </div>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
