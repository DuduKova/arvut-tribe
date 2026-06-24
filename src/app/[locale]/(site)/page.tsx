import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type PageProps = {
  params: Promise<{ locale: string }>;
};

type Stat = {
  value: string;
  label: string;
  highlight?: boolean;
};

type PhaseItem = {
  title: string;
  description: string;
  plant?: boolean;
};

type Phase = {
  number: string;
  badge: string;
  title: string;
  intro?: string;
  image?: string;
  highlight?: boolean;
  items: PhaseItem[];
};

function SectionHeading({
  label,
  title,
  intro,
  align = "center",
}: {
  label: string;
  title: string;
  intro?: string;
  align?: "center" | "start";
}) {
  return (
    <div className={align === "center" ? "mx-auto text-center" : "text-start"}>
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#8b5e3c]">
        {label}
      </p>
      <h2 className="font-primary text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.08] tracking-[-0.03em] text-[#1e2518]">
        {title}
      </h2>
      {intro ? (
        <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-[#6b6450]">
          {intro}
        </p>
      ) : null}
    </div>
  );
}

function StatCard({ stat }: { stat: Stat }) {
  return (
    <div
      className={[
        "rounded-2xl border p-6 md:p-8 transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(30,37,24,0.12)]",
        stat.highlight
          ? "border-[#8b5e3c] bg-[#ede6d8]"
          : "border-[#cec4a8] bg-[#faf7f2]",
      ].join(" ")}
    >
      <div className="font-primary text-[clamp(2rem,3vw,3.5rem)] font-black leading-none tracking-[-0.04em] text-[#2d4a2d]">
        {stat.value}
      </div>
      <p className="mt-3 text-sm leading-7 text-[#6b6450]">{stat.label}</p>
    </div>
  );
}

function PillarCard({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-3xl border border-[#cec4a8] bg-[#faf7f2] p-8 shadow-[0_1px_3px_rgba(30,37,24,0.08)] transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(30,37,24,0.14)]">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ede6d8] text-[#2d4a2d]">
        {icon}
      </div>
      <h3 className="font-primary text-xl font-bold text-[#1e2518]">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-[#6b6450]">{description}</p>
    </div>
  );
}

function PhaseItemRow({ item }: { item: PhaseItem }) {
  return (
    <div className="flex items-start gap-4">
      <div
        className={[
          "mt-2 h-3 w-3 shrink-0 rounded-full",
          item.plant ? "bg-[#8b5e3c]" : "bg-[#2d4a2d]",
        ].join(" ")}
      />
      <div>
        <strong className="block font-medium text-[#1e2518]">{item.title}</strong>
        <p className="mt-1 text-sm leading-7 text-[#6b6450]">{item.description}</p>
      </div>
    </div>
  );
}

function PhaseCard({ phase }: { phase: Phase }) {
  return (
    <article
      className={[
        "group overflow-hidden rounded-3xl border bg-[#f5f0e8] shadow-[0_1px_3px_rgba(30,37,24,0.08)] transition-shadow duration-200 hover:shadow-[0_12px_40px_rgba(30,37,24,0.14)]",
        phase.highlight ? "border-[#2d4a2d]" : "border-[#cec4a8]",
      ].join(" ")}
    >
      <div
        className={[
          "flex flex-col gap-6 border-b p-8 md:flex-row md:items-center md:px-10 md:py-9",
          phase.highlight ? "border-[#264126] bg-[#2d4a2d]" : "border-[#d8ceb8] bg-[#faf7f2]",
        ].join(" ")}
      >
        <div
          className={[
            "font-primary text-[clamp(3rem,5vw,5rem)] font-black leading-none tracking-[-0.05em]",
            phase.highlight ? "text-white/25" : "text-[#cec4a8]",
          ].join(" ")}
        >
          {phase.number}
        </div>
        <div>
          <p
            className={[
              "mb-2 inline-flex rounded-full px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.15em]",
              phase.highlight
                ? "bg-white/10 text-[#f4eedc]"
                : "bg-[#8b5e3c]/10 text-[#8b5e3c]",
            ].join(" ")}
          >
            {phase.badge}
          </p>
          <h3
            className={[
              "font-primary text-2xl font-bold md:text-3xl",
              phase.highlight ? "text-[#f4eedc]" : "text-[#1e2518]",
            ].join(" ")}
          >
            {phase.title}
          </h3>
        </div>
      </div>

      {phase.image ? (
        <div className="relative h-64 overflow-hidden">
          <Image
            src={phase.image}
            alt={phase.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      ) : null}

      <div className="p-8 md:p-10">
        {phase.intro ? (
          <p className="mb-8 max-w-3xl text-base leading-8 text-[#6b6450]">
            {phase.intro}
          </p>
        ) : null}
        <div className="space-y-6">
          {phase.items.map((item) => (
            <PhaseItemRow key={item.title} item={item} />
          ))}
        </div>
      </div>
    </article>
  );
}

function ApplyCard({
  href,
  title,
  description,
  icon,
  tone = "primary",
}: {
  href: string;
  title: string;
  description: string;
  icon: ReactNode;
  tone?: "primary" | "secondary";
}) {
  const isPrimary = tone === "primary";

  return (
    <Link
      href={href}
      className={[
        "flex items-center gap-5 rounded-3xl border p-6 text-start shadow-[0_1px_3px_rgba(30,37,24,0.08)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(30,37,24,0.14)]",
        isPrimary
          ? "border-[#2d4a2d] bg-[#2d4a2d] text-[#f4eedc]"
          : "border-[#8b5e3c]/30 bg-[#faf7f2] text-[#1e2518]",
      ].join(" ")}
    >
      <div
        className={[
          "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl",
          isPrimary ? "bg-white/10 text-[#f4eedc]" : "bg-[#ede6d8] text-[#8b5e3c]",
        ].join(" ")}
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="font-primary text-xl font-bold">{title}</h3>
        <p className={["mt-2 text-sm leading-7", isPrimary ? "text-[#e8dfc8]" : "text-[#6b6450]"].join(" ")}>
          {description}
        </p>
      </div>
      <svg
        className={isPrimary ? "text-[#f4eedc]" : "text-[#8b5e3c]"}
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </Link>
  );
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;

  if (locale !== "he") {
    return (
      <div className="relative overflow-hidden">
        <section className="relative isolate min-h-[72vh] overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/tribe-guardians/hero.jpg"
              alt="Tribe Guardians hero"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,10,4,0.55)_0%,rgba(6,10,4,0.7)_55%,rgba(4,8,2,0.86)_100%)]" />
          </div>

          <div className="relative z-10 mx-auto flex min-h-[72vh] max-w-4xl flex-col items-center justify-center px-4 py-24 text-center text-white md:px-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/65">
              Clinically supported healing
            </p>
            <h1 className="mt-5 font-primary text-[clamp(3.5rem,9vw,6rem)] font-black leading-none tracking-[-0.05em]">
              Tribe Guardians
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-9 text-white/90 md:text-2xl">
              A healing journey for fighters and veterans, blending clinical care,
              community support, and Amazonian medicine.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href={`/${locale}/register-patient`}
                className="rounded-full border border-[#2d4a2d] bg-[#2d4a2d] px-8 py-3 text-sm font-bold text-[#f4eedc] transition-transform duration-200 hover:-translate-y-0.5"
              >
                Applicant Questionnaire
              </Link>
              <Link
                href={`/${locale}/volunteer-healer`}
                className="rounded-full border border-white/40 bg-white/10 px-8 py-3 text-sm font-bold text-white transition-transform duration-200 hover:-translate-y-0.5 hover:bg-white/15"
              >
                Facilitator Questionnaire
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 py-16 md:px-6">
          <div className="rounded-3xl border border-[#cec4a8] bg-[#faf7f2] p-8 md:p-10">
            <h2 className="font-primary text-3xl font-bold text-[#1e2518]">
              Start with the right form
            </h2>
            <p className="mt-4 text-base leading-8 text-[#6b6450]">
              Use the applicant form if you are seeking support, or the facilitator
              form if you want to join the care team.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <Link
                href={`/${locale}/register-patient`}
                className="rounded-2xl bg-[#c1a35f] px-6 py-5 text-center font-medium text-[#4b2e05] transition-all hover:-translate-y-0.5"
              >
                Applicant form
              </Link>
              <Link
                href={`/${locale}/volunteer-healer`}
                className="rounded-2xl bg-[#2d4a2d] px-6 py-5 text-center font-medium text-[#f4eedc] transition-all hover:-translate-y-0.5"
              >
                Facilitator form
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const stats: Stat[] = [
    {
      value: "87,000+",
      label: "פצועי נפש שטופלו על ידי משרד הביטחון, עלייה חדה מ-62,000 לפני שנה",
      highlight: true,
    },
    {
      value: "58%",
      label: "מהפצועים החדשים מאז 7 באוקטובר סובלים מפגיעה נפשית",
    },
    {
      value: "100,000",
      label: "פצועים צפויים עד 2028. לפחות מחציתם עם PTSD",
    },
    {
      value: "×10",
      label: "גידול במוכרים בביטוח לאומי בשל פציעות נפש: מ-6,400 לפני המלחמה לכ-69,000 כיום",
      highlight: true,
    },
  ];

  const pillars = [
    {
      title: "מיכל בטוח",
      description: "מנוהל על ידי פסיכולוגים קליניים ומרפאים מנוסים. יחס צוות-משתתפים של 1:1.5.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="16" cy="16" r="14" />
          <path d="M16 8 C10 12, 8 18, 12 22 C14 24, 16 23, 16 20 C16 23, 18 24, 20 22 C24 18, 22 12, 16 8Z" fill="currentColor" opacity="0.7" stroke="none" />
        </svg>
      ),
    },
    {
      title: "מיקוד ארוך-טווח",
      description: "המסע מתחיל בהכנה של חודשיים בישראל, ונמשך עם תוכנית אינטגרציה של 6 חודשים מלאים לאחר החזרה.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M16 4 L28 26 L4 26 Z" />
          <circle cx="16" cy="17" r="4" />
        </svg>
      ),
    },
    {
      title: "קהילה ושבט",
      description: "יצירת \"שבט\" תמיכה שנמשך לכל החיים. אתם לא עושים את הדרך הזו לבד.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="11" cy="11" r="6" />
          <circle cx="21" cy="11" r="6" />
          <circle cx="16" cy="21" r="6" />
        </svg>
      ),
    },
  ];

  const phases: Phase[] = [
    {
      number: "01",
      badge: "ישראל · 6 שבועות",
      title: "הכנה",
      items: [
        { title: "ראיונות אישיים", description: "הערכה קלינית עמוקה לבדיקת מועמדות ויישור ציפיות." },
        { title: "פגישות קבוצתיות", description: "בניית אמון ואינטימיות \"שבטית\" לפני היציאה." },
        { title: "ניקוי קמבו", description: "שיטה אמזונית לא-פסיכואקטיבית לניקוי פיזי ואנרגטי. מכינה את הגוף והנפש לעבודה העמוקה.", plant: true },
        { title: "עבודת נשימה (ריבורת'ינג)", description: "לוויסות סומטי וגישה לרגשות מגולמים." },
        { title: "שיחות קבוצתיות ואישיות", description: "בהנחיית פסיכולוגים קליניים ליצירת מיכל בטוח." },
      ],
    },
    {
      number: "02",
      badge: "פרו · 14 יום",
      title: "ריטריט רפואה אמזונית בפרו",
      intro: "במשך שבועיים נצא מהרעש של העולם המודרני ונכנס לתוך יער האמזונס הפרואני. סביבה מאובטחת ומבודדת, עם תמיכה רציפה של הצוות.",
      image: "/tribe-guardians/img_maloka.jpg",
      highlight: true,
      items: [
        { title: "איוואסקה וצמחי רפואה אמזוניים", description: "נפגוש את האיוואסקה לצד צמחים רפואיים נוספים מהאמזונס, שמטרתם ניקוי סומטי, המתקה רגשית ופתיחת הלב. תהליכים חזקים עם אפקט ריפוי עמוק.", plant: true },
        { title: "אינטגרציה יומית", description: "פגישות קבוצתיות ואישיות עם מטפלים קליניים לעיבוד מה שעולה בתהליך." },
        { title: "פעילויות הוליסטיות", description: "תנועה, בישול משותף, יצירה משותפת." },
        { title: "טיפולי גוף אישיים", description: "תמיכה בשחרור פיזי ורגשי לאורך השהייה." },
      ],
    },
    {
      number: "03",
      badge: "ישראל · 6 חודשים",
      title: "אינטגרציה וחזרה לחיים",
      intro: "העבודה ממשיכה בארץ. התהליך נפתח, התובנות ממשיכות להגיע, והתמיכה שלנו נמשכת 6 חודשים לאחר החזרה.",
      items: [
        { title: "אינטגרציה אישית", description: "פגישות שבועיות אישיות לעיבוד וליווי תהליך האינטגרציה." },
        { title: "מעגלי אינטגרציה קבוצתיים", description: "6 מפגשי אינטגרציה קבוצתיים עם חברי השבט לאורך תקופת האינטגרציה." },
        { title: "מפגשי בוגרים קבוצתיים", description: "מפגשים עם בוגרי ריטריטים קודמים לשמירה על קשר, שיתוף וחיזוק הדדי לאורך זמן." },
        { title: "קווי סיוע מקצועיים", description: "גישה לתמיכה טיפולית מקצועית בין הפגישות." },
        { title: "מעקב השפעה", description: "ניטור מדויק של שיפור בבריאות הנפש ואיכות החיים." },
      ],
    },
  ];

  const foundationCards = [
    {
      title: "מסגרת משפטית",
      description: "הפעילות מתקיימת בפרו, שם רפואת הצמחים חוקית, מוסדרת ומבוטחת במלואה. אנחנו פועלים בשקיפות מוחלטת.",
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="8" y="4" width="24" height="32" rx="3" />
          <path d="M14 14h12M14 20h12M14 26h8" />
          <path d="M24 2v5M16 2v5" />
        </svg>
      ),
    },
    {
      title: "בטיחות רפואית",
      description: "אנחנו מנהלים ספר פרוטוקולים ובטיחות מקיף המכסה כל תרחיש. יחס צוות-משתתפים של 1:1.5, הכולל פסיכולוגים ומנטורים שעברו תהליך ריפוי דומה ושירתו ביחידות קרביות.",
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M20 4 L34 12 L34 22 C34 30, 20 36, 20 36 C20 36, 6 30, 6 22 L6 12 Z" />
          <path d="M14 20 l4 4 l8 -8" />
        </svg>
      ),
    },
    {
      title: "קוד אתיקה",
      description: "אנחנו פועלים לפי קוד התנהגות מקצועי קפדני המונע פגיעה בגבולות ומבטיח את ההגנה הגבוהה ביותר על המשתתפים.",
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M20 4 C12 10, 6 18, 10 26 C13 32, 17 34, 20 34 C23 34, 27 32, 30 26 C34 18, 28 10, 20 4Z" />
          <circle cx="20" cy="20" r="5" />
        </svg>
      ),
    },
  ];

  return (
    <div className="bg-[#f5f0e8] text-[#1e2518]">
      <main>
        <section className="relative isolate min-h-[95vh] overflow-hidden text-center text-white">
          <div className="absolute inset-0">
            <Image
              src="/tribe-guardians/hero.jpg"
              alt="שומרי השבט"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,10,4,0.6)_0%,rgba(6,10,4,0.72)_55%,rgba(4,8,2,0.88)_100%)]" />
          </div>

          <div className="relative z-10 mx-auto flex min-h-[95vh] max-w-[820px] flex-col items-center justify-center px-4 py-24 md:px-6 lg:py-32">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/65">
              נתמך קלינית · חדשני · נתמך מחקרית
            </p>
            <h1 className="mt-5 font-primary text-[clamp(4rem,11vw,7rem)] font-black leading-none tracking-[-0.05em]">
              שומרי השבט
            </h1>
            <p className="mt-5 font-primary text-[clamp(1.5rem,3vw,2.25rem)] font-light leading-tight text-white/90">
              ריפוי פוסט-טראומה לחיילים וחיילות
              <br />
              נפגעי הלחימה
            </p>
            <p className="mt-5 max-w-2xl text-sm leading-7 tracking-[0.04em] text-white/60 md:text-base">
              חכמת האמזונס העתיקה · פסיכולוגיה קלינית מערבית · קהילה לכל החיים
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="#apply"
                className="rounded-full border-2 border-[#2d4a2d] bg-[#2d4a2d] px-8 py-3 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#3d6438]"
              >
                להגשת מועמדות
              </Link>
              <Link
                href="#program"
                className="rounded-full border-2 border-white/40 px-8 py-3 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/10"
              >
                למידע על התוכנית
              </Link>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 animate-bounce flex-col items-center gap-2 text-xs text-white/45">
            <span>גלול למטה</span>
            <svg width="16" height="24" viewBox="0 0 16 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="1" y="1" width="14" height="22" rx="7" />
              <circle cx="8" cy="6" r="2" fill="currentColor" />
            </svg>
          </div>
        </section>

        <div className="border-y border-[#d8ceb8] bg-[#2d4a2d] px-4 py-4 text-white">
          <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-3">
            <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em]">
              מיונים פתוחים עכשיו
            </span>
            <p className="text-sm leading-7 text-[#f4eedc]">
              <strong>המסע הקרוב יוצא לפרו: 15 לנובמבר 2026</strong>
              <span className="mx-2 opacity-60">·</span>
              תהליך המיון מתחיל עכשיו - מקומות מוגבלים
            </p>
            <Link
              href="#apply"
              className="rounded-full border border-white/40 bg-white/10 px-4 py-2 text-sm font-semibold text-[#f4eedc] transition-colors hover:bg-white/20"
            >
              הגישו מועמדות
            </Link>
          </div>
        </div>

        <section id="crisis" className="py-20 md:py-32">
          <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6">
            <div className="mx-auto max-w-3xl">
              <SectionHeading
                label="המשבר הלאומי"
                title="לוחמינו נלחמים במלחמה בלתי נראית בבית"
                intro={'המלחמה שפרצה ב-7 באוקטובר 2023 חוללה בישראל "צונאמי של פצועי נפש" — כך מגדירים זאת המומחים הבכירים ביותר בתחום הטראומה בישראל.'}
              />
            </div>

            <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => (
                <StatCard key={stat.value} stat={stat} />
              ))}
            </div>

            <div className="mx-auto mt-12 max-w-[1100px] overflow-hidden rounded-[1.6rem] shadow-[0_10px_40px_rgba(0,0,0,0.18)]">
              <Image
                src="/tribe-guardians/img_army.jpg"
                alt="חיילי צה״ל בפעולה"
                width={1600}
                height={900}
                className="h-[320px] w-full object-cover object-center md:h-[440px]"
              />
            </div>

            <blockquote className="mx-auto mt-12 max-w-[860px] rounded-[1.5rem] border-r-4 border-[#8b5e3c] bg-[#ede6d8] p-8 md:p-10">
              <p className="font-primary text-xl leading-8 text-[#1e2518] md:text-[1.6rem]">
                &quot;המספרים לא משאירים צל של ספק. ישראל במשבר לאומי. הנזקים שאנחנו רואים היום הם רק קצה הקרחון של מה שעוד יגיע.&quot;
              </p>
              <cite className="mt-4 block text-sm not-italic leading-7 text-[#6b6450]">
                — יו״ר המועצה הלאומית לפוסט-טראומה
                <br />
                <span className="text-[#8b5e3c] underline underline-offset-4">
                  מתוך כתבת הארץ, יוני 2026
                </span>
              </cite>
            </blockquote>

            <div className="mx-auto mt-12 max-w-[860px] rounded-[1.5rem] bg-[#2d4a2d] px-8 py-8 text-center shadow-[0_18px_40px_rgba(45,74,45,0.25)]">
              <p className="font-primary text-2xl font-bold leading-9 text-white md:text-[2rem]">
                המשימה: לרפא את אחינו ואחיותנו הסובלים, איפה שהמערכת קצרה מלהושיע.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#faf7f2] py-20 md:py-32">
          <div className="mx-auto grid w-full max-w-[1200px] gap-12 px-4 md:px-6 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <SectionHeading
                label="הפער"
                title="הטיפולים הקונבנציונליים לרוב אינם מגיעים לשורש"
                intro="הפסיכולוגיה המערבית המסורתית לרוב מנהלת סימפטומים אך מתקשה להגיע לטראומה השורשית המאוחסנת בגוף ובתת-המודע. התוצאה: לוחמים רבים נותרים במצב של ניהול כרוני של סימפטומים, ואינם מסוגלים לשוב לתפקד במלואם בחיים ובמשפחה."
                align="start"
              />
              <p className="mt-6 text-base leading-8 text-[#6b6450]">
                זו מגבלה של הכלים הזמינים.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-[#cec4a8] bg-[#f5f0e8] p-6 shadow-[0_10px_30px_rgba(30,37,24,0.08)]">
              <div className="flex items-center gap-0">
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-[#8b5e3c] font-primary text-xl font-black text-white">
                  טראומה
                </div>
                <div className="flex-1 px-4">
                  <div className="space-y-2">
                    <div className="rounded-lg border border-[#d8ceb8] bg-[#ede6d8] px-4 py-2 text-center text-xs text-[#6b6450] shadow-sm -rotate-1">
                      ניהול סימפטומים
                    </div>
                    <div className="rounded-lg border border-[#d8ceb8] bg-[#ede6d8] px-4 py-2 text-center text-xs text-[#6b6450] shadow-sm rotate-1">
                      תרופות בלבד
                    </div>
                    <div className="rounded-lg border border-[#d8ceb8] bg-[#ede6d8] px-4 py-2 text-center text-xs text-[#6b6450] shadow-sm -rotate-1">
                      שיחות טיפול לבד
                    </div>
                  </div>
                </div>
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-[#2d4a2d] font-primary text-xl font-black text-white">
                  ריפוי
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="solution" className="py-20 md:py-32">
          <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6">
            <div className="mx-auto max-w-3xl">
              <SectionHeading
                label="הפתרון שלנו"
                title="שילוב חכמת האמזונס עם המדע המודרני"
                intro={'אנחנו לא מציעים "טיול". אנחנו מציעים מסע ריפוי קליני. המודל שלנו משלב את עומק רפואת הצמחים האמזונית עם הבטיחות והמבנה של טיפול טראומה מודרני. זה לא רק החוויה. זה כל מה שסביבה.'}
              />
            </div>

            <div className="mx-auto mt-12 max-w-[1100px] overflow-hidden rounded-[1.6rem] shadow-[0_10px_40px_rgba(0,0,0,0.18)]">
              <Image
                src="/tribe-guardians/img_steps.jpg"
                alt="שביל המרכז ביער האמזונס"
                width={1600}
                height={900}
                className="h-[300px] w-full object-cover object-center md:h-[420px]"
              />
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {pillars.map((pillar) => (
                <PillarCard
                  key={pillar.title}
                  icon={pillar.icon}
                  title={pillar.title}
                  description={pillar.description}
                />
              ))}
            </div>

            <div className="mt-16 grid gap-6 overflow-hidden rounded-[1.75rem] border border-[#cec4a8] bg-[#faf7f2] p-6 shadow-[0_10px_30px_rgba(30,37,24,0.08)] lg:grid-cols-[1.05fr_.95fr] lg:p-8">
              <div className="overflow-hidden rounded-[1.25rem]">
                <Image
                  src="/tribe-guardians/img_peru.jpg"
                  alt="נוף בפרו"
                  width={1200}
                  height={900}
                  className="h-full min-h-[260px] w-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center p-2 lg:p-4">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#8b5e3c]">
                  מסע ללב האמזונס
                </p>
                <h3 className="font-primary text-3xl font-bold text-[#1e2518]">
                  פרו היא לא רק יעד. היא המרחב שמאפשר לעבודה להעמיק.
                </h3>
                <p className="mt-5 text-base leading-8 text-[#6b6450]">
                  הניתוק מהשגרה, מהעומס ומהרעש מאפשר למערכת העצבים להירגע, לגוף להשתחרר, ולתהליך הקליני לקבל עומק שהיום-יום פשוט לא מאפשר.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="program" className="bg-[#faf7f2] py-20 md:py-32">
          <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6">
            <div className="mx-auto max-w-3xl">
              <SectionHeading
                label="התוכנית"
                title="המסע הקליני: שלושה שלבים"
                intro="המסע שלנו מתחיל חודשים לפני הריטריט ונמשך חצי שנה אחריו. זוהי התחייבות ארוכת-טווח לריפוי עמוק."
              />
            </div>

            <div className="mt-12 space-y-8">
              {phases.map((phase) => (
                <PhaseCard key={phase.title} phase={phase} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32">
          <div className="mx-auto grid w-full max-w-[1200px] gap-12 px-4 md:px-6 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <SectionHeading
                label="עלות ומה כלול"
                title="השקעה אחת. הכל כלול."
                intro="35,800 ₪. מחיר כולל הכל: טיסות, כל פגישות ההכנה בישראל, ריטריט הכנה, 14 ימי המסע בפרו, וחצי שנת אינטגרציה לאחר החזרה."
                align="start"
              />
            </div>

            <div className="mx-auto w-full max-w-[340px] rounded-[1.25rem] border-2 border-[#2d4a2d] bg-[#faf7f2] p-8 text-center shadow-[0_12px_40px_rgba(30,37,24,0.12)]">
              <div className="font-primary text-[clamp(2.5rem,5vw,3.5rem)] font-black leading-none tracking-[-0.04em] text-[#2d4a2d]">
                35,800 <span className="align-super text-[0.55em]">₪</span>
              </div>
              <div className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#6b6450]">
                הכל כלול
              </div>
              <ul className="mt-8 space-y-3 text-start text-sm text-[#1e2518]">
                <li className="border-b border-[#d8ceb8] pb-3">✓ טיסות הלוך-חזור</li>
                <li className="border-b border-[#d8ceb8] pb-3">✓ כל פגישות ההכנה</li>
                <li className="border-b border-[#d8ceb8] pb-3">✓ ריטריט הכנה בישראל</li>
                <li className="border-b border-[#d8ceb8] pb-3">✓ 14 ימי ריטריט בפרו</li>
                <li>✓ 6 חודשי אינטגרציה</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="foundation" className="bg-[#faf7f2] py-20 md:py-32">
          <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6">
            <div className="mx-auto max-w-3xl">
              <SectionHeading label="הבסיס שלנו" title="אפס פשרות" />
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {foundationCards.map((card) => (
                <PillarCard
                  key={card.title}
                  icon={card.icon}
                  title={card.title}
                  description={card.description}
                />
              ))}
            </div>

            <div className="mt-16 grid gap-8 overflow-hidden rounded-[1.75rem] border border-[#cec4a8] bg-[#f5f0e8] p-6 shadow-[0_10px_30px_rgba(30,37,24,0.08)] lg:grid-cols-[1fr_.95fr] lg:p-8">
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#8b5e3c]">
                  מחקר ולמידה
                </p>
                <h3 className="font-primary text-3xl font-bold text-[#1e2518]">
                  אנחנו לא רק מטפלים. אנחנו לומדים.
                </h3>
                <p className="mt-5 text-base leading-8 text-[#6b6450]">
                  אנחנו מבצעים מחקר פנימי שיתפתח בהמשך לשיתופי פעולה עם חוקרים אקדמאיים. המטרה: ללמוד, לשפר, ולאפשר לחיילים נוספים ליהנות מהמודל הזה.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {[
                    {
                      title: "מדדים",
                      text: "מעקב מT0 (לפני הריטריט) עד T3 (שנה לאחר האינטגרציה)",
                    },
                    {
                      title: "כלים",
                      text: "עיצוב רב-מודאלי: פסיכולוגי, פיזי, ביולוגי וחברתי. כלים קליניים, חיישנים, סמנים ביולוגיים",
                    },
                    {
                      title: "מטרה",
                      text: "להעמיק את ההבנה של מה שעובד, ולאפשר לכמה שיותר חיילים לגשת לדרך ריפוי שמשנה חיים",
                    },
                  ].map((item) => (
                    <div key={item.title} className="rounded-2xl bg-[#faf7f2] p-5 shadow-sm">
                      <strong className="block font-medium text-[#1e2518]">{item.title}</strong>
                      <p className="mt-2 text-sm leading-7 text-[#6b6450]">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="overflow-hidden rounded-[1.25rem]">
                <Image
                  src="/tribe-guardians/img_peru.jpg"
                  alt="הדרך לפרו"
                  width={1200}
                  height={900}
                  className="h-full min-h-[320px] w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="apply" className="relative isolate overflow-hidden py-20 md:py-32 text-white">
          <div className="absolute inset-0">
            <Image
              src="/tribe-guardians/img_jungle_closing.jpg"
              alt="יער האמזונס"
              fill
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,8,2,0.5)_0%,rgba(4,8,2,0.82)_100%)]" />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-[1200px] px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-white/65">
                הגשת מועמדות
              </p>
              <h2 className="font-primary text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.04em]">
                מוכן לצעד הראשון?
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/85">
                לקראת תהליך ההיכרות, לפניכם טפסי הצטרפות ראשוניים. המענה אישי וחסוי - אין במילוי משום התחייבות.
              </p>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/70">
                <strong>שלב הבא:</strong> לאחר מילוי הטופס נחזור אליכם עם מידע נוסף ונמשיך לבחינת התאמתכם להשתתפות בתוכנית.
              </p>
            </div>

            <div className="mx-auto mt-12 grid max-w-5xl gap-4 lg:grid-cols-2">
              <ApplyCard
                href="/he/register-patient"
                tone="primary"
                title="שאלון למועמד"
                description="לחיילים ולוחמים המעוניינים להשתתף בתוכנית"
                icon={
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="16" cy="10" r="5" />
                    <path d="M6 28 C6 22, 10 18, 16 18 C22 18, 26 22, 26 28" />
                  </svg>
                }
              />
              <ApplyCard
                href="/he/volunteer-healer"
                tone="secondary"
                title="שאלון למטפל"
                description="לאנשי מקצוע בבריאות הנפש המעוניינים להצטרף לצוות"
                icon={
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="10" r="4" />
                    <path d="M4 26 C4 21, 7.5 18, 12 18" />
                    <circle cx="22" cy="12" r="4" />
                    <path d="M22 18 C26.5 18, 28 21, 28 26" />
                    <path d="M14 22 L19 22 M16.5 19.5 L16.5 24.5" />
                  </svg>
                }
              />
            </div>

            <p className="mt-10 text-center text-sm text-white/75">
              לשאלות ראשוניות:{" "}
              <a
                href="mailto:TheTribeGuardians@gmail.com"
                className="underline decoration-white/30 underline-offset-4 transition-colors hover:text-white"
              >
                TheTribeGuardians@gmail.com
              </a>
            </p>
          </div>
        </section>

        <section className="relative isolate overflow-hidden py-24 text-white md:py-32">
          <div className="absolute inset-0">
            <Image
              src="/tribe-guardians/img_jungle_closing.jpg"
              alt="סיום במסע"
              fill
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,9,3,0.25)_0%,rgba(5,9,3,0.82)_100%)]" />
          </div>

          <div className="relative z-10 mx-auto max-w-3xl px-4 text-center md:px-6">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white/10 p-3 shadow-[0_0_0_1px_rgba(255,255,255,0.14)] backdrop-blur-sm">
              <Image
                src="/tribe-guardians/logo.jpg"
                alt="שומרי השבט לוגו"
                width={90}
                height={90}
                className="rounded-full object-cover"
              />
            </div>
            <h2 className="font-primary text-[clamp(2.5rem,6vw,4rem)] font-bold tracking-[-0.04em]">
              הצטרפו לשומרי השבט.
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/85">
              הם נלחמו על הביטחון הפיזי שלנו.
              <br />
              עכשיו עלינו להילחם למען חירותם בבית.
            </p>
            <Link
              href="#apply"
              className="mt-10 inline-flex rounded-full border-2 border-white bg-white px-8 py-3 text-sm font-bold text-[#2d4a2d] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#f5f0e8]"
            >
              הצטרפו אלינו
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
