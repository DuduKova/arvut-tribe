import Image, { getImageProps } from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  homepageContent,
  type HomepageIcon,
  type Phase,
  type PhaseItem,
  type Stat,
  type SupportedLocale,
} from "./homepageContent";

type PageProps = {
  params: Promise<{ locale: string }>;
};

const HERO_DESKTOP_IMAGE = "/tribe-guardians/hero-jungle-desktop.webp";
const HERO_MOBILE_IMAGE = "/tribe-guardians/hero-jungle-mobile.webp";

function HeroBackgroundImage({ alt }: { alt: string }) {
  const commonImageProps = {
    alt,
    sizes: "100vw",
    loading: "eager" as const,
    fetchPriority: "high" as const,
    className: "h-full w-full object-cover object-center",
  };

  const {
    props: { srcSet: mobileSrcSet },
  } = getImageProps({
    ...commonImageProps,
    src: HERO_MOBILE_IMAGE,
    width: 1200,
    height: 1500,
  });

  const { props: desktopProps } = getImageProps({
    ...commonImageProps,
    src: HERO_DESKTOP_IMAGE,
    width: 2400,
    height: 1340,
  });

  return (
    <picture className="absolute inset-0 block h-full w-full">
      <source media="(max-width: 767px)" sizes="100vw" srcSet={mobileSrcSet} />
      <img {...desktopProps} alt={alt} />
    </picture>
  );
}

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
      <div
        dir="ltr"
        className="mb-5 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#ede6d8] text-[#2d4a2d]"
      >
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
            alt={phase.imageAlt ?? phase.title}
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

function ContentIcon({
  name,
  size = 32,
}: {
  name: HomepageIcon;
  size?: 32 | 40;
}) {
  const solutionIconImages: Partial<Record<HomepageIcon, string>> = {
    safe: "/tribe-guardians/icons/safe-container.webp",
    longTerm: "/tribe-guardians/icons/long-term-focus.webp",
    community: "/tribe-guardians/icons/community-tribe.webp",
  };
  const solutionIconImage = solutionIconImages[name];

  if (solutionIconImage) {
    return (
      <Image
        src={solutionIconImage}
        alt=""
        aria-hidden="true"
        width={96}
        height={96}
        className={[
          "object-contain mix-blend-multiply contrast-125",
          size === 40 ? "h-[3.75rem] w-[3.75rem]" : "h-14 w-14",
        ].join(" ")}
      />
    );
  }

  const commonProps = {
    width: size,
    height: size,
    viewBox: size === 40 ? "0 0 40 40" : "0 0 32 32",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
  };

  switch (name) {
    case "safe":
      return (
        <svg {...commonProps}>
          <circle cx="16" cy="16" r="14" />
          <path
            d="M16 8 C10 12, 8 18, 12 22 C14 24, 16 23, 16 20 C16 23, 18 24, 20 22 C24 18, 22 12, 16 8Z"
            fill="currentColor"
            opacity="0.7"
            stroke="none"
          />
        </svg>
      );
    case "longTerm":
      return (
        <svg {...commonProps}>
          <path d="M16 4 L28 26 L4 26 Z" />
          <circle cx="16" cy="17" r="4" />
        </svg>
      );
    case "community":
      return (
        <svg {...commonProps}>
          <circle cx="11" cy="11" r="6" />
          <circle cx="21" cy="11" r="6" />
          <circle cx="16" cy="21" r="6" />
        </svg>
      );
    case "legal":
      return (
        <svg {...commonProps}>
          <rect x="8" y="4" width="24" height="32" rx="3" />
          <path d="M14 14h12M14 20h12M14 26h8" />
          <path d="M24 2v5M16 2v5" />
        </svg>
      );
    case "medical":
      return (
        <svg {...commonProps}>
          <path d="M20 4 L34 12 L34 22 C34 30, 20 36, 20 36 C20 36, 6 30, 6 22 L6 12 Z" />
          <path d="M14 20 l4 4 l8 -8" />
        </svg>
      );
    case "ethics":
      return (
        <svg {...commonProps}>
          <path d="M20 4 C12 10, 6 18, 10 26 C13 32, 17 34, 20 34 C23 34, 27 32, 30 26 C34 18, 28 10, 20 4Z" />
          <circle cx="20" cy="20" r="5" />
        </svg>
      );
    case "applicant":
      return (
        <svg {...commonProps}>
          <circle cx="16" cy="10" r="5" />
          <path d="M6 28 C6 22, 10 18, 16 18 C22 18, 26 22, 26 28" />
        </svg>
      );
    case "facilitator":
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="10" r="4" />
          <path d="M4 26 C4 21, 7.5 18, 12 18" />
          <circle cx="22" cy="12" r="4" />
          <path d="M22 18 C26.5 18, 28 21, 28 26" />
          <path d="M14 22 L19 22 M16.5 19.5 L16.5 24.5" />
        </svg>
      );
    case "donor":
      return (
        <svg {...commonProps}>
          <path d="M16 27 C9 22, 5 18, 5 13 C5 9.5, 7.5 7, 10.8 7 C13 7, 14.8 8.3, 16 10 C17.2 8.3, 19 7, 21.2 7 C24.5 7, 27 9.5, 27 13 C27 18, 23 22, 16 27Z" />
          <path d="M16 14 V21 M12.5 17.5 H19.5" />
        </svg>
      );
  }
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
  const supportedLocale: SupportedLocale = locale === "he" ? "he" : "en";
  const content = homepageContent[supportedLocale];
  const donateHref = `/${supportedLocale}/donate`;

  return (
    <div className="bg-[#f5f0e8] text-[#1e2518]">
      <section className="relative isolate min-h-[95vh] overflow-hidden text-center text-white">
        <div className="absolute inset-0">
          <HeroBackgroundImage alt={content.hero.imageAlt} />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,10,4,0.64)_0%,rgba(6,10,4,0.76)_55%,rgba(4,8,2,0.9)_100%)]" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[95vh] max-w-[820px] flex-col items-center justify-center px-4 py-24 md:px-6 lg:py-32">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/65">
            {content.hero.eyebrow}
          </p>
          <h1 className="mt-5 font-primary text-[clamp(4rem,11vw,7rem)] font-black leading-none tracking-[-0.05em]">
            {content.hero.title}
          </h1>
          <p className="mt-5 font-primary text-[clamp(1.5rem,3vw,2.25rem)] font-light leading-tight text-white/90">
            {content.hero.subtitleLines.map((line, index) => (
              <span key={line}>
                {line}
                {index < content.hero.subtitleLines.length - 1 ? <br /> : null}
              </span>
            ))}
          </p>
          <p className="mt-5 max-w-2xl text-sm leading-7 tracking-[0.04em] text-white/60 md:text-base">
            {content.hero.tagline}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="#apply"
              className="rounded-full border-2 border-[#2d4a2d] bg-[#2d4a2d] px-8 py-3 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#3d6438]"
            >
              {content.hero.applyCta}
            </Link>
            <Link
              href="#program"
              className="rounded-full border-2 border-white/40 px-8 py-3 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/10"
            >
              {content.hero.programCta}
            </Link>
            <Link
              href={donateHref}
              className="rounded-full border-2 border-[#8b5e3c] bg-[#8b5e3c] px-8 py-3 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#a87248]"
            >
              {content.hero.donateCta}
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 animate-bounce flex-col items-center gap-2 text-xs text-white/45">
          <span>{content.hero.scroll}</span>
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
            {content.announcement.badge}
          </span>
          <p className="text-sm leading-7 text-[#f4eedc]">
            <strong>{content.announcement.departure}</strong>
            <span className="mx-2 opacity-60">·</span>
            {content.announcement.availability}
          </p>
          <div className="flex flex-wrap gap-2">
            <Link
              href="#apply"
              className="rounded-full border border-white/40 bg-white/10 px-4 py-2 text-sm font-semibold text-[#f4eedc] transition-colors hover:bg-white/20"
            >
              {content.announcement.cta}
            </Link>
            <Link
              href={donateHref}
              className="rounded-full border border-[#f4eedc]/70 bg-[#f4eedc] px-4 py-2 text-sm font-semibold text-[#2d4a2d] transition-colors hover:bg-white"
            >
              {content.announcement.donateCta}
            </Link>
          </div>
        </div>
      </div>

      <section id="crisis" className="py-20 md:py-32">
        <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6">
          <div className="mx-auto max-w-3xl">
            <SectionHeading
              label={content.crisis.label}
              title={content.crisis.title}
              intro={content.crisis.intro}
            />
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {content.crisis.stats.map((stat) => (
              <StatCard key={stat.value} stat={stat} />
            ))}
          </div>

          <div className="mx-auto mt-12 max-w-[1100px] overflow-hidden rounded-[1.6rem] shadow-[0_10px_40px_rgba(0,0,0,0.18)]">
            {content.crisis.imageMobile ? (
              <>
                <Image
                  src={content.crisis.imageMobile}
                  alt={
                    content.crisis.imageMobileAlt ?? content.crisis.imageAlt
                  }
                  width={1600}
                  height={900}
                  className="h-[320px] w-full object-cover object-center md:hidden"
                />
                <Image
                  src="/tribe-guardians/img_army.jpg"
                  alt={content.crisis.imageAlt}
                  width={1600}
                  height={900}
                  className="hidden h-[440px] w-full object-cover object-center md:block"
                />
              </>
            ) : (
              <Image
                src="/tribe-guardians/img_army.jpg"
                alt={content.crisis.imageAlt}
                width={1600}
                height={900}
                className="h-[320px] w-full object-cover object-[15%_center] md:h-[440px] md:object-center"
              />
            )}
          </div>

          <blockquote
            className={[
              "mx-auto mt-12 max-w-[860px] rounded-[1.5rem] border-[#8b5e3c] bg-[#ede6d8] p-8 md:p-10",
              supportedLocale === "he" ? "border-r-4" : "border-l-4",
            ].join(" ")}
          >
            <p className="font-primary text-xl leading-8 text-[#1e2518] md:text-[1.6rem]">
              &quot;{content.crisis.quote}&quot;
            </p>
            <cite className="mt-4 block text-sm not-italic leading-7 text-[#6b6450]">
              {content.crisis.attribution}
              <br />
              <span className="text-[#8b5e3c] underline underline-offset-4">
                {content.crisis.source}
              </span>
            </cite>
          </blockquote>

          <div className="mx-auto mt-12 max-w-[860px] rounded-[1.5rem] bg-[#2d4a2d] px-8 py-8 text-center shadow-[0_18px_40px_rgba(45,74,45,0.25)]">
            <p className="font-primary text-2xl font-bold leading-9 text-white md:text-[2rem]">
              {content.crisis.mission}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#faf7f2] py-20 md:py-32">
        <div className="mx-auto w-full max-w-[860px] px-4 md:px-6">
          <SectionHeading
            label={content.gap.label}
            title={content.gap.title}
            intro={content.gap.intro}
          />
        </div>
      </section>

      <section id="solution" className="py-20 md:py-32">
        <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6">
          <div className="mx-auto max-w-3xl">
            <SectionHeading
              label={content.solution.label}
              title={content.solution.title}
              intro={content.solution.intro}
            />
          </div>

          <div className="mx-auto mt-12 max-w-[1100px] overflow-hidden rounded-[1.6rem] shadow-[0_10px_40px_rgba(0,0,0,0.18)]">
            <Image
              src="/tribe-guardians/img_steps.jpg"
              alt={content.solution.imageAlt}
              width={1600}
              height={900}
              className="h-[300px] w-full object-cover object-center md:h-[420px]"
            />
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {content.solution.pillars.map((pillar) => (
              <PillarCard
                key={pillar.title}
                icon={<ContentIcon name={pillar.icon} />}
                title={pillar.title}
                description={pillar.description}
              />
            ))}
          </div>

          <div className="mt-16 grid gap-6 overflow-hidden rounded-[1.75rem] border border-[#cec4a8] bg-[#faf7f2] p-6 shadow-[0_10px_30px_rgba(30,37,24,0.08)] lg:grid-cols-[1.05fr_.95fr] lg:p-8">
            <div className="overflow-hidden rounded-[1.25rem]">
              <Image
                src="/tribe-guardians/img_peru.jpg"
                alt={content.solution.peru.imageAlt}
                width={1200}
                height={900}
                className="h-full min-h-[260px] w-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center p-2 lg:p-4">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#8b5e3c]">
                {content.solution.peru.label}
              </p>
              <h3 className="font-primary text-3xl font-bold text-[#1e2518]">
                {content.solution.peru.title}
              </h3>
              <p className="mt-5 text-base leading-8 text-[#6b6450]">
                {content.solution.peru.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="program" className="bg-[#faf7f2] py-20 md:py-32">
        <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6">
          <div className="mx-auto max-w-3xl">
            <SectionHeading
              label={content.program.label}
              title={content.program.title}
              intro={content.program.intro}
            />
          </div>

          <div className="mt-12 space-y-8">
            {content.program.phases.map((phase) => (
              <PhaseCard key={phase.title} phase={phase} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32">
        <div className="mx-auto grid w-full max-w-[1200px] gap-12 px-4 md:px-6 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <SectionHeading
              label={content.pricing.label}
              title={content.pricing.title}
              intro={content.pricing.intro}
              align="start"
            />
          </div>

          <div className="mx-auto w-full max-w-[340px] rounded-[1.25rem] border-2 border-[#2d4a2d] bg-[#faf7f2] p-8 text-center shadow-[0_12px_40px_rgba(30,37,24,0.12)]">
            <div className="font-primary text-[clamp(2.5rem,5vw,3.5rem)] font-black leading-none tracking-[-0.04em] text-[#2d4a2d]">
              {content.pricing.amount}{" "}
              <span className="align-super text-[0.55em]">
                {content.pricing.currency}
              </span>
            </div>
            <div className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#6b6450]">
              {content.pricing.amountLabel}
            </div>
            <ul className="mt-8 space-y-3 text-start text-sm text-[#1e2518]">
              {content.pricing.included.map((item, index) => (
                <li
                  key={item}
                  className={
                    index < content.pricing.included.length - 1
                      ? "border-b border-[#d8ceb8] pb-3"
                      : undefined
                  }
                >
                  ✓ {item}
                </li>
              ))}
            </ul>
            <Link
              href={donateHref}
              className="mt-8 inline-flex rounded-full border border-[#2d4a2d] bg-[#2d4a2d] px-6 py-3 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#3d6438]"
            >
              {content.pricing.donateCta}
            </Link>
          </div>
        </div>
      </section>

      <section id="foundation" className="bg-[#faf7f2] py-20 md:py-32">
        <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6">
          <div className="mx-auto max-w-3xl">
            <SectionHeading
              label={content.foundation.label}
              title={content.foundation.title}
              intro={content.foundation.intro}
            />
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {content.foundation.cards.map((card) => (
              <PillarCard
                key={card.title}
                icon={<ContentIcon name={card.icon} size={40} />}
                title={card.title}
                description={card.description}
              />
            ))}
          </div>

          <div className="mx-auto mt-16 max-w-4xl overflow-hidden rounded-[1.75rem] border border-[#cec4a8] bg-[#f5f0e8] p-6 shadow-[0_10px_30px_rgba(30,37,24,0.08)] lg:p-8">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#8b5e3c]">
                {content.foundation.research.label}
              </p>
              <h3 className="font-primary text-3xl font-bold text-[#1e2518]">
                {content.foundation.research.title}
              </h3>
              <p className="mt-5 text-base leading-8 text-[#6b6450]">
                {content.foundation.research.description}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {content.foundation.research.items.map((item) => (
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
            alt={content.apply.imageAlt}
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,8,2,0.5)_0%,rgba(4,8,2,0.82)_100%)]" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1200px] px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-white/65">
              {content.apply.label}
            </p>
            <h2 className="font-primary text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.04em]">
              {content.apply.title}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/85">
              {content.apply.description}
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-6xl gap-4 lg:grid-cols-3">
            <ApplyCard
              href={`/${supportedLocale}/register-patient`}
              tone="primary"
              title={content.apply.applicant.title}
              description={content.apply.applicant.description}
              icon={<ContentIcon name={content.apply.applicant.icon} />}
            />
            <ApplyCard
              href={`/${supportedLocale}/volunteer-healer`}
              tone="secondary"
              title={content.apply.facilitator.title}
              description={content.apply.facilitator.description}
              icon={<ContentIcon name={content.apply.facilitator.icon} />}
            />
            <ApplyCard
              href={donateHref}
              tone="secondary"
              title={content.apply.donor.title}
              description={content.apply.donor.description}
              icon={<ContentIcon name={content.apply.donor.icon} />}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
