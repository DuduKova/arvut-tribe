import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import DonationEmbed from "@/components/DonationEmbed";
import type { SupportedLocale } from "../homepageContent";

type PageProps = {
  params: Promise<{ locale: string }>;
};

const DONATION_FORM_URL =
  "https://secured.israelgives.org/he/give/tribeguardians";

const donateContent: Record<
  SupportedLocale,
  {
    metaTitle: string;
    metaDescription: string;
    imageAlt: string;
    eyebrow: string;
    title: string;
    intro: string;
    impactTitle: string;
    impactItems: string[];
    trust: string;
    embedTitle: string;
    fallbackIntro: string;
    fallbackCta: string;
    returnHome: string;
  }
> = {
  he: {
    metaTitle: "תרומה לשומרי השבט",
    metaDescription:
      "תמכו בשומרי השבט ועזרו להרחיב מסע ריפוי קליני וקהילתי ללוחמים ולוחמות המתמודדים עם טראומה.",
    imageAlt: "מרחב הריטריט ביער האמזונס",
    eyebrow: "תמיכה בשומרי השבט",
    title: "עזרו לנו לפתוח את הדרך לעוד לוחמים ולוחמות",
    intro:
      "התרומה שלכם מאפשרת להרחיב את מעגל התמיכה, ההכנה, הליווי והאינטגרציה עבור מי שחוזרים מהמלחמה עם פציעות שאינן תמיד נראות לעין.",
    impactTitle: "התרומה תומכת ב",
    impactItems: [
      "הכנה וליווי קליני לפני היציאה למסע",
      "מלגות והנגשת התוכנית למועמדים מתאימים",
      "מעגלי אינטגרציה ותמיכה לאחר החזרה",
    ],
    trust: "התרומה מתבצעת בצורה מאובטחת דרך IsraelGives.",
    embedTitle: "תרומה מאובטחת לשומרי השבט",
    fallbackIntro: "מעדיפים לפתוח את הטופס בעמוד מאובטח נפרד?",
    fallbackCta: "פתחו את טופס התרומה",
    returnHome: "חזרה לעמוד הבית",
  },
  en: {
    metaTitle: "Donate to Tribe Guardians",
    metaDescription:
      "Support Tribe Guardians and help expand a clinical, community-based healing journey for soldiers and service members living with trauma.",
    imageAlt: "Amazon rainforest retreat space",
    eyebrow: "Support Tribe Guardians",
    title: "Help us open the path for more service members",
    intro:
      "Your donation helps expand the circle of preparation, clinical support, and integration for people returning from war with wounds that are not always visible.",
    impactTitle: "Your donation supports",
    impactItems: [
      "Clinical preparation and guidance before the journey",
      "Scholarships and access for suitable candidates",
      "Integration circles and support after returning home",
    ],
    trust: "Donations are processed securely through IsraelGives.",
    embedTitle: "Secure donation to Tribe Guardians",
    fallbackIntro: "Prefer to open the form in a separate secure page?",
    fallbackCta: "Open the donation form",
    returnHome: "Back to home",
  },
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const supportedLocale: SupportedLocale = locale === "he" ? "he" : "en";
  const content = donateContent[supportedLocale];

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      images: ["/tribe-guardians/logo.jpg"],
    },
    twitter: {
      card: "summary_large_image",
      title: content.metaTitle,
      description: content.metaDescription,
      images: ["/tribe-guardians/logo.jpg"],
    },
  };
}

export default async function DonatePage({ params }: PageProps) {
  const { locale } = await params;
  const supportedLocale: SupportedLocale = locale === "he" ? "he" : "en";
  const content = donateContent[supportedLocale];

  return (
    <div className="bg-[#f5f0e8] text-[#1e2518]">
      <section className="relative isolate overflow-hidden text-white">
        <div className="absolute inset-0">
          <Image
            src="/tribe-guardians/img_jungle_closing.jpg"
            alt={content.imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,10,4,0.65)_0%,rgba(6,10,4,0.78)_55%,rgba(4,8,2,0.94)_100%)]" />
        </div>

        <div className="relative z-10 mx-auto grid min-h-[58vh] w-full max-w-[1200px] gap-10 px-4 py-24 md:px-6 lg:grid-cols-[1fr_0.85fr] lg:items-end lg:py-32">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/65">
              {content.eyebrow}
            </p>
            <h1 className="mt-5 max-w-4xl font-primary text-[clamp(3rem,7vw,5.5rem)] font-black leading-[0.98]">
              {content.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/82">
              {content.intro}
            </p>
          </div>

          <div className="rounded-[1.25rem] border border-white/20 bg-white/10 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.22)] backdrop-blur-md">
            <h2 className="font-primary text-2xl font-bold text-[#f4eedc]">
              {content.impactTitle}
            </h2>
            <ul className="mt-5 space-y-4 text-sm leading-7 text-white/82">
              {content.impactItems.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#7ab87a]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-white/15 pt-5 text-sm leading-7 text-[#e8dfc8]">
              {content.trust}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto w-full max-w-[960px] px-4 md:px-6">
          <div className="overflow-hidden rounded-[1.5rem] border border-[#cec4a8] bg-white shadow-[0_18px_50px_rgba(30,37,24,0.14)]">
            <div className="border-b border-[#d8ceb8] bg-[#faf7f2] px-5 py-4 md:px-8">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <p className="font-primary text-xl font-bold text-[#1e2518]">
                  {content.embedTitle}
                </p>
                <Link
                  href={DONATION_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-[#2d4a2d] underline decoration-[#7ab87a]/50 underline-offset-4 transition-colors hover:text-[#1e2518]"
                >
                  {content.fallbackCta}
                </Link>
              </div>
            </div>

            <div className="p-3 md:p-6">
              <DonationEmbed
                formUrl={DONATION_FORM_URL}
                title={content.embedTitle}
              />
            </div>
          </div>

          <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-[1.25rem] border border-[#cec4a8] bg-[#faf7f2] p-5 md:flex-row md:items-center md:p-6">
            <p className="text-sm leading-7 text-[#6b6450]">
              {content.fallbackIntro}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={DONATION_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-[#2d4a2d] bg-[#2d4a2d] px-5 py-2.5 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#3d6438]"
              >
                {content.fallbackCta}
              </Link>
              <Link
                href={`/${supportedLocale}`}
                className="rounded-full border border-[#cec4a8] px-5 py-2.5 text-sm font-bold text-[#6b6450] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#ede6d8] hover:text-[#1e2518]"
              >
                {content.returnHome}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
