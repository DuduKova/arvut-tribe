import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default async function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isHebrew = locale === "he";

  const t = await getTranslations("navigation");
  const tFooter = await getTranslations("footer");

  return (
    <div className="min-h-screen bg-gray-50">
      <div dir="ltr">
        <header className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href={`/${locale}`} className="flex items-center gap-3">
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
                <Link href={`/${locale}`} className="text-gray-600 hover:text-gray-900">
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

      <main>{children}</main>

      <div dir="ltr">
        <footer className="bg-gray-900 text-white py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div
                dir={isHebrew ? "rtl" : "ltr"}
                className={isHebrew ? "text-right" : "text-left"}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Image
                    src="/branding/tribeg-logo.svg"
                    alt={tFooter("organizationName")}
                    width={52}
                    height={52}
                  />
                  <h3 className="text-lg font-semibold">{tFooter("organizationName")}</h3>
                </div>
              </div>
              <div
                dir={isHebrew ? "rtl" : "ltr"}
                className={isHebrew ? "text-right" : "text-left"}
              >
                <h3 className="text-lg font-semibold mb-4">{tFooter("contact")}</h3>
                <p className="text-gray-300">{tFooter("email")}: thetribeguardians@gmail.com</p>
              </div>
              <div
                dir={isHebrew ? "rtl" : "ltr"}
                className={isHebrew ? "text-right" : "text-left"}
              >
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
  );
}
