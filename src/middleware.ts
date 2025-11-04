import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  // A list of all locales that are supported
  locales: ["he", "en"],

  // Used when no locale matches
  defaultLocale: "he",

  // Always show locale prefix in URL
  localePrefix: "always",
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
