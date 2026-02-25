import { redirect } from "next/navigation";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import { getCurrentAdminUser } from "@/lib/admin/auth";

export default async function AdminLoginPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { locale } = await params;
  const { error } = await searchParams;

  const authState = await getCurrentAdminUser();
  if (authState.kind === "authorized") {
    redirect(`/${locale}/admin`);
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <AdminLoginForm
        locale={locale}
        initialError={error}
        showForbiddenNotice={authState.kind === "forbidden"}
      />
    </div>
  );
}
