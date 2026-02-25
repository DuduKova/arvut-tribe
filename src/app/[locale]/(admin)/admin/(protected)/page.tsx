import AdminQueue from "@/components/admin/AdminQueue";

export default async function AdminPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return <AdminQueue locale={locale} />;
}
