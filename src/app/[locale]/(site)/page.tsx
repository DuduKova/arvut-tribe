import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("homepage");

  return (
    <div className="min-h-screen bg-warm-cream">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-earth-brown mb-4">
              {t("hero.title")}
            </h1>
            <h2 className="text-xl md:text-2xl text-earth-brown/80 mb-8">
              {t("hero.subtitle")}
            </h2>
          </div>

          {/* Main Content Section */}
          <div className="bg-card border-2 border-jungle-green/20 rounded-lg shadow-lg p-6 md:p-10 mb-8 space-y-6">
            <div className="prose prose-lg max-w-none text-foreground space-y-4">
              <p className="text-base md:text-lg leading-relaxed">
                {t("intro.paragraph")}
              </p>

              <div className="bg-indigo-violet/10 border-r-4 border-indigo-violet p-4 rounded mt-6">
                <p className="text-sm md:text-base text-foreground mb-2">
                  <strong className="text-indigo-violet">
                    {t("intro.notice.title")}
                  </strong>
                </p>
                <p className="text-sm md:text-base text-foreground">
                  {t("intro.notice.text")}
                </p>
              </div>
            </div>
          </div>

          {/* Form Selection Section */}
          <div className="bg-card border-2 border-jungle-green/20 rounded-lg shadow-lg p-6 md:p-10">
            <h3 className="text-2xl font-semibold text-earth-brown mb-6 text-center">
              {t("formSelection.title")}
            </h3>

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <Link
                href={`/${locale}/register-patient`}
                className="bg-ancient-gold text-earth-brown px-6 py-6 rounded-lg text-lg font-medium hover:bg-ancient-gold/90 transition-all duration-200 shadow-md hover:shadow-lg text-center block"
              >
                {t("formSelection.patientForm")}
              </Link>

              <Link
                href={`/${locale}/volunteer-healer`}
                className="bg-jungle-green text-warm-cream px-6 py-6 rounded-lg text-lg font-medium hover:bg-jungle-green/90 transition-all duration-200 shadow-md hover:shadow-lg text-center block"
              >
                {t("formSelection.healerForm")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
