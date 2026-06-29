"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";

type NavItem = {
  label: string;
  href: string;
};

type FooterLinks = {
  heading: string;
  links: NavItem[];
};

interface TribeGuardiansShellProps {
  locale: string;
  organizationName: string;
  footerOrganizationName: string;
  footerContact: string;
  footerEmailLabel: string;
  copyright: string;
  links: {
    primary: NavItem[];
    footer: FooterLinks[];
  };
  children: ReactNode;
}

export default function TribeGuardiansShell({
  locale,
  organizationName,
  footerOrganizationName,
  footerContact,
  footerEmailLabel,
  copyright,
  links,
  children,
}: TribeGuardiansShellProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-[#f5f0e8] text-[#1e2518]">
      <header className="sticky top-0 z-50 border-b border-[#d8ceb8]/80 bg-[#f5f0e8]/90 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-[1200px] items-center gap-4 px-4 py-3 md:gap-6 md:px-6">
          <Link href={`/${locale}`} className="flex items-center gap-3">
            <Image
              src="/tribe-guardians/logo.jpg"
              alt={organizationName}
              width={48}
              height={48}
              priority
              className="rounded-full object-cover shadow-sm"
            />
            <span className="font-primary text-lg font-bold tracking-tight text-[#2d4a2d] md:text-xl">
              {organizationName}
            </span>
          </Link>

          <nav className="ms-auto hidden items-center gap-2 lg:flex">
            {links.primary.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-[#6b6450] transition-colors hover:bg-[#ede6d8] hover:text-[#1e2518]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <LanguageSwitcher />
          </div>

          <button
            type="button"
            className="ms-auto inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#cec4a8] text-[#6b6450] transition-colors hover:bg-[#ede6d8] lg:hidden"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            <span className="sr-only">Toggle navigation</span>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-[#d8ceb8] bg-[#faf7f2] px-4 py-4 lg:hidden">
            <div className="mx-auto flex max-w-[1200px] flex-col gap-2">
              {links.primary.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-[#1e2518] transition-colors hover:bg-[#ede6d8]"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        )}
      </header>

      <main>{children}</main>

      <footer className="border-t border-[#2a3022] bg-[#191d14] text-[#ede8dc]">
        <div className="mx-auto grid w-full max-w-[1200px] gap-10 px-4 py-12 md:grid-cols-[1.1fr_1fr] md:px-6">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/tribe-guardians/logo.jpg"
                alt={footerOrganizationName}
                width={52}
                height={52}
                className="rounded-full object-cover"
              />
              <div>
                <p className="font-primary text-xl font-bold text-[#f4eedc]">
                  {footerOrganizationName}
                </p>
                <p className="text-sm tracking-wide text-[#c4b99e]">Tribe Guardians</p>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm leading-7 text-[#c4b99e]">
              {copyright}
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="font-primary text-lg font-bold text-[#e8dfc8]">
                {footerContact}
              </h3>
              <div className="mt-4 space-y-3 text-sm text-[#c4b99e]">
                <p>
                  {footerEmailLabel}:{" "}
                  <a className="text-[#f4eedc] underline decoration-[#7ab87a]/40 underline-offset-4" href="mailto:TheTribeGuardians@gmail.com">
                    TheTribeGuardians@gmail.com
                  </a>
                </p>
              </div>
            </div>

            {links.footer.map((group) => (
              <div key={group.heading}>
                <h3 className="font-primary text-lg font-bold text-[#e8dfc8]">
                  {group.heading}
                </h3>
                <div className="mt-4 space-y-3 text-sm">
                  {group.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block text-[#c4b99e] transition-colors hover:text-[#f4eedc]"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
