import Link from "next/link";
import { forbidden, redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { getCurrentAdminUser } from "@/lib/admin/auth";
import { createClient } from "@/lib/supabase/server";

export default async function ProtectedAdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const authState = await getCurrentAdminUser();

  if (authState.kind === "unauthenticated") {
    redirect(`/${locale}/admin/login`);
  }

  if (authState.kind === "forbidden") {
    forbidden();
  }

  const t = await getTranslations("admin.layout");

  async function signOutAction() {
    "use server";

    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect(`/${locale}/admin/login`);
  }

  return (
    <div className="min-h-screen bg-stone-100">
      <header className="border-b bg-white">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-4 px-4 py-4">
          <div>
            <Link href={`/${locale}/admin`} className="text-xl font-semibold text-gray-900">
              {t("title")}
            </Link>
            <p className="text-sm text-gray-600">{t("subtitle")}</p>
          </div>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <form action={signOutAction}>
              <button
                type="submit"
                className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {t("signOut")}
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">{children}</main>
    </div>
  );
}
