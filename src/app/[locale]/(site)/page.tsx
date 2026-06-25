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
        <strong className="block font-medium text-[#1e2518]">
          {item.title}
        </strong>
        <p className="mt-1 text-sm leading-7 text-[#6b6450]">
          {item.description}
        </p>
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
          phase.highlight
            ? "border-[#264126] bg-[#2d4a2d]"
            : "border-[#d8ceb8] bg-[#faf7f2]",
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
          isPrimary
            ? "bg-white/10 text-[#f4eedc]"
            : "bg-[#ede6d8] text-[#8b5e3c]",
        ].join(" ")}
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="font-primary text-xl font-bold">{title}</h3>
        <p
          className={[
            "mt-2 text-sm leading-7",
            isPrimary ? "text-[#e8dfc8]" : "text-[#6b6450]",
          ].join(" ")}
        >
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
              A healing journey for fighters and veterans, blending clinical
              care, community support, and Amazonian medicine. The journey
              begins about two months before departure to Peru, with intake
              interviews that help align expectations and a multidisciplinary
              team that works through the same holistic care model.
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
      </div>
    );
  }

  const stats: Stat[] = [
    {
      value: "87,000+",
      label:
        "פצועי נפש שטופלו על ידי משרד הביטחון, עלייה חדה מ-62,000 לפני שנה",
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
      label:
        "גידול במוכרים בביטוח לאומי בשל פציעות נפש: מ-6,400 לפני המלחמה לכ-69,000 כיום",
      highlight: true,
    },
  ];

  const pillars = [
    {
      title: "מיכל בטוח",
      description:
        "בהובלת פסיכולוגים קליניים ומרפאים מנוסים, בתוך מסגרת רציפה ותומכת.",
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="16" cy="16" r="14" />
          <path
            d="M16 8 C10 12, 8 18, 12 22 C14 24, 16 23, 16 20 C16 23, 18 24, 20 22 C24 18, 22 12, 16 8Z"
            fill="currentColor"
            opacity="0.7"
            stroke="none"
          />
        </svg>
      ),
    },
    {
      title: "מיקוד ארוך-טווח",
      description:
        "רצף טיפולי שמחבר הכנה, עבודה עמוקה בפרו והטמעה בחיי היום-יום.",
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M16 4 L28 26 L4 26 Z" />
          <circle cx="16" cy="17" r="4" />
        </svg>
      ),
    },
    {
      title: "קהילה ושבט",
      description:
        'יצירת "שבט" תמיכה שנמשך לכל החיים. אתם לא עושים את הדרך הזו לבד.',
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
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
        {
          title: "ראיונות אישיים",
          description: "הערכה קלינית עמוקה לבדיקת מועמדות ותיאום ציפיות.",
        },
        {
          title: "פגישות קבוצתיות",
          description: 'בניית אמון ואינטימיות "שבטית" לפני היציאה.',
        },
        {
          title: "ניקוי קמבו",
          description:
            "טקס אמזוני מסורתי לא-פסיכואקטיבי, המוצע רק לאחר בחינת התאמה ובהתאם לפרוטוקולי הבטיחות.",
          plant: true,
        },
        {
          title: "עבודת נשימה (ריברסינג)",
          description: "לוויסות סומטי וגישה לרגשות מודחקים.",
        },
        {
          title: "שיחות קבוצתיות ואישיות",
          description:
            "בהנחיית פסיכולוגים קליניים ליצירת מיכל בטוח ומגע ראשוני בתכנים נפשיים.",
        },
      ],
    },
    {
      number: "02",
      badge: "פרו · 14 יום",
      title: "ריטריט רפואה אמזונית בפרו",
      intro:
        "במשך שבועיים נצא מהרעש של העולם המודרני ונכנס לתוך יער האמזונס הפרואני. סביבה מאובטחת ומבודדת, עם תמיכה רציפה של הצוות.",
      image: "/tribe-guardians/img_maloka.jpg",
      highlight: true,
      items: [
        {
          title: "איוואסקה וצמחי רפואה אמזוניים",
          description:
            "המפגש עם איוואסקה וצמחים אמזוניים נוספים מתקיים כחלק מהמסגרת המסורתית של הריטריט, לאחר מיון והכנה ובליווי הצוות.",
          plant: true,
        },
        {
          title: "אינטגרציה יומית",
          description:
            "פגישות קבוצתיות ואישיות עם מטפלים קליניים לעיבוד התכנים העולים בתהליך.",
        },
        {
          title: "פעילויות הוליסטיות",
          description: "תנועה, בישול משותף, יצירה משותפת.",
        },
        {
          title: "טיפולי גוף אישיים",
          description: "תמיכה בשחרור פיזי ורגשי לאורך השהייה.",
        },
      ],
    },
    {
      number: "03",
      badge: "ישראל · 6 חודשים",
      title: "אינטגרציה וחזרה לחיים",
      intro:
        "העבודה ממשיכה בארץ, כדי לעבד את התובנות ולהטמיע אותן בחיי היום-יום.",
      items: [
        {
          title: "אינטגרציה אישית",
          description: "פגישות שבועיות אישיות לעיבוד וליווי תהליך האינטגרציה.",
        },
        {
          title: "מעגלי אינטגרציה קבוצתיים",
          description:
            "6 מפגשי אינטגרציה קבוצתיים עם חברי השבט לאורך תקופת האינטגרציה.",
        },
        {
          title: "מפגשי בוגרים קבוצתיים",
          description:
            "מפגשים עם בוגרי ריטריטים קודמים לשמירה על קשר, שיתוף וחיזוק הדדי לאורך זמן.",
        },
      ],
    },
  ];

  const foundationCards = [
    {
      title: "מסגרת משפטית",
      description:
        "הפעילות מתקיימת בפרו ובהתאם למסגרת המשפטית המקומית. הנהלים, האחריות והכיסוי הביטוחי מוצגים למועמדים בתהליך המיון.",
      icon: (
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <rect x="8" y="4" width="24" height="32" rx="3" />
          <path d="M14 14h12M14 20h12M14 26h8" />
          <path d="M24 2v5M16 2v5" />
        </svg>
      ),
    },
    {
      title: "בטיחות רפואית",
      description:
        "ספר פרוטוקולים מקיף מנחה את הצוות בכל שלב, לצד פסיכולוגים ומנטורים שעברו תהליך ריפוי דומה ושירתו ביחידות קרביות.",
      icon: (
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M20 4 L34 12 L34 22 C34 30, 20 36, 20 36 C20 36, 6 30, 6 22 L6 12 Z" />
          <path d="M14 20 l4 4 l8 -8" />
        </svg>
      ),
    },
    {
      title: "קוד אתיקה",
      description:
        "אנחנו פועלים לפי קוד התנהגות מקצועי שנועד לשמור על גבולות ברורים ולהגן על המשתתפים.",
      icon: (
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M20 4 C12 10, 6 18, 10 26 C13 32, 17 34, 20 34 C23 34, 27 32, 30 26 C34 18, 28 10, 20 4Z" />
          <circle cx="20" cy="20" r="5" />
        </svg>
      ),
    },
  ];

  return (
    <div className="bg-[#f5f0e8] text-[#1e2518]">
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
            קליני · חדשני · קהילתי
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
          <svg
            width="16"
            height="24"
            viewBox="0 0 16 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
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
            מספר המקומות מוגבל
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
              intro={
                'המלחמה שפרצה ב-7 באוקטובר 2023 חוללה בישראל "צונאמי של פצועי נפש" — כך מגדירים זאת המומחים הבכירים ביותר בתחום הטראומה בישראל.'
              }
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
              &quot;המספרים לא משאירים צל של ספק. ישראל במשבר לאומי. הנזקים
              שאנחנו רואים היום הם רק קצה הקרחון של מה שעוד יגיע.&quot;
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
              המשימה: להרחיב את אפשרויות התמיכה והריפוי עבור אחינו ואחיותינו
              המתמודדים עם טראומה.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#faf7f2] py-20 md:py-32">
        <div className="mx-auto w-full max-w-[860px] px-4 md:px-6">
          <SectionHeading
            label="הפער"
            title="לא כל טיפול מתאים לכל אדם"
            intro="טיפולים מבוססי ראיות מסייעים לרבים המתמודדים עם פוסט-טראומה. לצד זאת, יש לוחמים הזקוקים למעטפת נוספת שמחברת בין טיפול קליני, גוף, קהילה והטמעה בחיי היום-יום."
          />
        </div>
      </section>

      <section id="solution" className="py-20 md:py-32">
        <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6">
          <div className="mx-auto max-w-3xl">
            <SectionHeading
              label="הפתרון שלנו"
              title="שילוב מסורת אמזונית עם ליווי קליני"
              intro="החוויה בפרו היא חלק ממסגרת טיפולית רחבה יותר, הכוללת מיון, הכנה, ליווי מקצועי ותהליך אינטגרציה ממושך לאחר החזרה."
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
                הניתוק מהשגרה, מהעומס ומהרעש מאפשר למערכת העצבים להירגע, לגוף
                להשתחרר, ולתהליך הקליני לקבל עומק שהיום-יום פשוט לא מאפשר.
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
              intro="המסע שלנו מתחיל כחודשיים לפני היציאה לפרו, ונמשך חצי שנה אחריו. זוהי התחייבות ארוכת-טווח לריפוי עמוק."
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
              title="מסגרת אחת, מחיר שקוף"
              intro="תשלום אחד מרכז את כל שלבי המסע תחת מסגרת ברורה, מההכנה בישראל ועד האינטגרציה לאחר החזרה."
              align="start"
            />
          </div>

          <div className="mx-auto w-full max-w-[340px] rounded-[1.25rem] border-2 border-[#2d4a2d] bg-[#faf7f2] p-8 text-center shadow-[0_12px_40px_rgba(30,37,24,0.12)]">
            <div className="font-primary text-[clamp(2.5rem,5vw,3.5rem)] font-black leading-none tracking-[-0.04em] text-[#2d4a2d]">
              35,800 <span className="align-super text-[0.55em]">₪</span>
            </div>
            <div className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#6b6450]">
              לכל שלבי המסע
            </div>
            <ul className="mt-8 space-y-3 text-start text-sm text-[#1e2518]">
              <li className="border-b border-[#d8ceb8] pb-3">
                ✓ טיסות הלוך-חזור
              </li>
              <li className="border-b border-[#d8ceb8] pb-3">
                ✓ כל פגישות ההכנה
              </li>
              <li className="border-b border-[#d8ceb8] pb-3">
                ✓ ריטריט הכנה בישראל
              </li>
              <li className="border-b border-[#d8ceb8] pb-3">
                ✓ 14 ימי ריטריט בפרו
              </li>
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

          <div className="mx-auto mt-16 max-w-4xl overflow-hidden rounded-[1.75rem] border border-[#cec4a8] bg-[#f5f0e8] p-6 shadow-[0_10px_30px_rgba(30,37,24,0.08)] lg:p-8">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#8b5e3c]">
                מחקר ולמידה
              </p>
              <h3 className="font-primary text-3xl font-bold text-[#1e2518]">
                אנחנו לא רק מטפלים. אנחנו לומדים.
              </h3>
              <p className="mt-5 text-base leading-8 text-[#6b6450]">
                אנחנו מבצעים מחקר פנימי, ובהמשך שואפים לשיתופי פעולה עם חוקרים
                אקדמיים, כדי לבחון את המודל באופן שיטתי ולשפר אותו לאורך זמן.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  {
                    title: "כלים",
                    text: "עיצוב רב-מודאלי: פסיכולוגי, פיזי, ביולוגי וחברתי. כלים קליניים, חיישנים, סמנים ביולוגיים",
                  },
                  {
                    title: "מטרה",
                    text: "להעמיק את ההבנה של מה שעובד, ולאפשר לכמה שיותר מטופלים לקבל מענה שמשנה חיים",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl bg-[#faf7f2] p-5 shadow-sm"
                  >
                    <strong className="block font-medium text-[#1e2518]">
                      {item.title}
                    </strong>
                    <p className="mt-2 text-sm leading-7 text-[#6b6450]">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="apply"
        className="relative isolate overflow-hidden py-20 md:py-32 text-white"
      >
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
              בחרו את הטופס המתאים. המענה אישי וחסוי ואינו מחייב; לאחר השליחה
              נחזור אליכם להמשך תהליך ההיכרות ובחינת ההתאמה.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-4 lg:grid-cols-2">
            <ApplyCard
              href="/he/register-patient"
              tone="primary"
              title="שאלון למועמד"
              description="לחיילים ולוחמים המעוניינים להשתתף בתוכנית"
              icon={
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
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
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <circle cx="12" cy="10" r="4" />
                  <path d="M4 26 C4 21, 7.5 18, 12 18" />
                  <circle cx="22" cy="12" r="4" />
                  <path d="M22 18 C26.5 18, 28 21, 28 26" />
                  <path d="M14 22 L19 22 M16.5 19.5 L16.5 24.5" />
                </svg>
              }
            />
          </div>
        </div>
      </section>
    </div>
  );
}
